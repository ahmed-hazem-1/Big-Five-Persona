import joblib
import os
MODEL_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
kmeans = joblib.load(os.path.join(MODEL_DIR, "kmeans_5_scores_model.joblib"))
print("cluster_centers_ dtype:", kmeans.cluster_centers_.dtype)


