from fastapi import FastAPI, HTTPException
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel
import joblib
import pandas as pd
import numpy as np
import os
import json
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="Big Five Persona API")

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Constants
API_DIR = os.path.dirname(os.path.abspath(__file__))
# If running from inside Models/api, project root is two levels up
if os.path.basename(API_DIR) == "api":
    ROOT_DIR = os.path.dirname(os.path.dirname(API_DIR))
else:
    ROOT_DIR = API_DIR

MODEL_DIR = os.path.join(ROOT_DIR, "Models")
QUESTIONS_CSV = os.path.join(ROOT_DIR, "questions.csv")
STATIC_DIR = os.path.join(ROOT_DIR, "static")

# Global variables for models
models = {}
preprocessors = {}
cluster_profiles_data = {}

class PredictionRequest(BaseModel):
    answers: dict # Map of question ID (str) to score (int 1-5)

def load_questions():
    return pd.read_csv(QUESTIONS_CSV)

def calculate_scores(answers: dict, questions_df: pd.DataFrame):
    # Map answers to traits
    trait_map = {
        'EXT': [], 'EST': [], 'AGR': [], 'CSN': [], 'OPN': []
    }
    
    for _, q in questions_df.iterrows():
        q_id = str(q['id'])
        if q_id in answers:
            val = answers[q_id]
            # Reverse score if needed
            if q['reverse'] == 1:
                val = 6 - val
            trait_map[q['trait']].append(val)
            
    # Calculate means
    scores = {
        'EXT_score': np.mean(trait_map['EXT']) if trait_map['EXT'] else 0,
        'EST_score': np.mean(trait_map['EST']) if trait_map['EST'] else 0,
        'AGR_score': np.mean(trait_map['AGR']) if trait_map['AGR'] else 0,
        'CSN_score': np.mean(trait_map['CSN']) if trait_map['CSN'] else 0,
        'OPN_score': np.mean(trait_map['OPN']) if trait_map['OPN'] else 0,
    }
    return scores

@app.on_event("startup")
def startup_event():
    # Load Cluster Profiles
    profiles_path = os.path.join(MODEL_DIR, "cluster_profiles.json")
    if os.path.exists(profiles_path):
        try:
            with open(profiles_path, "r") as f:
                global cluster_profiles_data
                cluster_profiles_data = json.load(f)
        except Exception as e:
            print(f"Error loading cluster profiles: {e}")

    # Load KMeans
    try:
        models['kmeans'] = joblib.load(os.path.join(MODEL_DIR, "kmeans_5_scores_model.joblib"))
    except Exception as e:
        print(f"Error loading KMeans: {e}")

    # Load GMM and Scaler
    try:
        models['gmm'] = joblib.load(os.path.join(MODEL_DIR, "gmm.joblib"))
        scaler_path = os.path.join(MODEL_DIR, "gmm_scaler.joblib")
        if os.path.exists(scaler_path):
            preprocessors['gmm_scaler'] = joblib.load(scaler_path)
    except Exception as e:
        print(f"Error loading GMM: {e}")

    # Load Hierarchical KNN
    try:
        knn_path = os.path.join(MODEL_DIR, "hier_knn.joblib")
        if os.path.exists(knn_path):
            models['hierarchical'] = joblib.load(knn_path)
    except Exception as e:
        print(f"Error loading Hierarchical: {e}")

@app.get("/health")
def health():
    return {"status": "ok", "models": list(models.keys())}

@app.post("/predict")
def predict(request: PredictionRequest):
    if not request.answers:
        raise HTTPException(status_code=400, detail="No answers provided")
        
    questions_df = load_questions()
    user_scores = calculate_scores(request.answers, questions_df)
    
    # Prepare input for models - Explicitly cast to float32 to match cluster_centers_
    X = pd.DataFrame([user_scores])
    trait_cols = ['EXT_score', 'EST_score', 'AGR_score', 'CSN_score', 'OPN_score']
    X = X[trait_cols].astype(np.float32)
    
    results = {}
    
    # Helper to get profile
    def get_trait_profile(model_name, cluster_id):
        if model_name in cluster_profiles_data:
            data = cluster_profiles_data[model_name]
            # Try key-based lookup first
            if isinstance(data, dict) and str(cluster_id) in data:
                p = data[str(cluster_id)]
                return {"E": p[0], "N": p[1], "A": p[2], "C": p[3], "O": p[4]}
            # Try index-based lookup
            elif isinstance(data, list) and cluster_id < len(data):
                p = data[cluster_id]
                return {"E": p[0], "N": p[1], "A": p[2], "C": p[3], "O": p[4]}
             
        return {"E": user_scores['EXT_score'], "N": user_scores['EST_score'], "A": user_scores['AGR_score'], "C": user_scores['CSN_score'], "O": user_scores['OPN_score']}

    # KMeans Prediction
    if 'kmeans' in models:
        cluster_id = int(models['kmeans'].predict(X)[0])
        results['kmeans'] = {
            "cluster": cluster_id,
            "profile": get_trait_profile('kmeans', cluster_id)
        }
        
    # GMM Prediction
    if 'gmm' in models:
        X_in = X
        if 'gmm_scaler' in preprocessors:
            X_in = preprocessors['gmm_scaler'].transform(X)
        cluster_id = int(models['gmm'].predict(X_in)[0])
        results['gmm'] = {
            "cluster": cluster_id,
            "profile": get_trait_profile('gmm', cluster_id)
        }
        
    # Hierarchical Prediction
    if 'hierarchical' in models:
        cluster_id = int(models['hierarchical'].predict(X)[0])
        results['hierarchical'] = {
            "cluster": cluster_id,
            "profile": get_trait_profile('hierarchical', cluster_id)
        }

    return {
        "user_scores": {
            "E": user_scores['EXT_score'],
            "N": user_scores['EST_score'],
            "A": user_scores['AGR_score'],
            "C": user_scores['CSN_score'],
            "O": user_scores['OPN_score']
        },
        "predictions": results
    }

# Serve Static Files
if os.path.exists(STATIC_DIR):
    app.mount("/assets", StaticFiles(directory=os.path.join(STATIC_DIR, "assets")), name="assets")

    @app.get("/{full_path:path}")
    async def serve_spa(full_path: str):
        file_path = os.path.join(STATIC_DIR, full_path)
        if os.path.isfile(file_path):
            return FileResponse(file_path)
        return FileResponse(os.path.join(STATIC_DIR, "index.html"))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=7860)
