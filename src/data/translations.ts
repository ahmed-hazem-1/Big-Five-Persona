import { Language } from '../store/useI18nStore';

export const translations = {
  en: {
    startAssessment: "Start Assessment",
    oceanAi: "OCEAN",
    mapYourPersonality: "Map Your Personality",
    with: "with the",
    bigFiveModel: "Big Five Model",
    description: "The Big Five (OCEAN) traits are the most scientifically accepted framework for understanding personality differences. Discover your unique personas across the five domains.",
    questionCounter: "Question {{current}} / {{total}}",
    trait: "Trait",
    skipQuestion: "Skip Question \u2192",
    previous: "\u2190 Previous",
    options: {
      1: "Strongly Disagree",
      2: "Disagree",
      3: "Neutral",
      4: "Agree",
      5: "Strongly Agree"
    },
    resultsTitle: "Your Personality Profile",
    resultsSubtitle: "Based on the Big Five (OCEAN) model analysis.",
    resultsSummaryHigh: "Based on your responses, you appear distinctly high in {{subject}} ({{percentage}}%). People with similar profiles are often {{highText}}.",
    resultsSummaryLow: "Conversely, your results show lower alignment with {{subject}} ({{percentage}}%), suggesting that you tend to be more {{lowText}} in those situations.",
    traitBreakdown: "Trait Breakdown",
    retake: "Retake Assessment",
    highTexts: {
      O: "highly creative and open-minded",
      C: "very driven, focused, and reliable",
      E: "outgoing, talkative, and energetic",
      A: "warm, friendly, and tactful",
      N: "perceptive and emotionally sensitive"
    },
    lowTexts: {
        O: "practical and traditional",
        C: "flexible and spontaneous",
        E: "reserved and reflective",
        A: "analytical and direct",
        N: "calm and emotionally resilient"
    },
    personas: {
        O: { title: 'Openness', persona: 'The Visionary', desc: 'Imaginative, curious, and open to new experiences.' },
        C: { title: 'Conscientiousness', persona: 'The Organizer', desc: 'Competent, self-disciplined, and thoughtful.' },
        E: { title: 'Extraversion', persona: 'The Socialite', desc: 'Sociable, assertive, and energetic.' },
        A: { title: 'Agreeableness', persona: 'The Empath', desc: 'Cooperative, trustworthy, and good-natured.' },
        N: { title: 'Neuroticism', persona: 'The Guardian', desc: 'Sensitive, protective, and emotionally aware.' }
    },
    traitDescriptions: {
       high: {
          O: 'You are highly imaginative, curious, and appreciate art, emotion, and new ideas.',
          C: 'You are highly disciplined, organized, and plan ahead rather than acting spontaneously.',
          E: 'You are outgoing, energetic, and draw energy from being around others.',
          A: 'You are compassionate, cooperative, and highly value getting along with others.',
          N: 'You tend to experience negative emotions such as anxiety, anger, or depression easily.'
       },
       low: {
          O: 'You are more practical, traditional, and prefer routine over new experiences.',
          C: 'You are flexible, spontaneous, but may sometimes lack strict organization.',
          E: 'You are reserved, reflective, and draw energy from solitary activities.',
          A: 'You are analytical, direct, and more competitive than cooperative.',
          N: 'You are calm, emotionally stable, and resilient to stress.'
       }
    }
  },
  ar: {
    startAssessment: "ابدأ التقييم",
    oceanAi: "OCEAN",
    mapYourPersonality: "اكتشف شخصيتك",
    with: "من خلال",
    bigFiveModel: "نموذج العوامل الخمسة الكبرى",
    description: "نموذج العوامل الخمسة الكبرى (OCEAN) هو الإطار الأكثر قبولًا علميًا لفهم الاختلافات الشخصية. اكتشف شخصياتك الفريدة عبر هذه المجالات الخمسة.",
    questionCounter: "سؤال {{current}} / {{total}}",
    trait: "السمة",
    skipQuestion: "تخطي السؤال \u2190",
    previous: "السابق \u2192",
    options: {
      1: "أعارض بشدة",
      2: "أعارض",
      3: "محايد",
      4: "أوافق",
      5: "أوافق بشدة"
    },
    resultsTitle: "الملف الشخصي لشخصيتك",
    resultsSubtitle: "بناءً على تحليل نموذج العوامل الخمسة الكبرى.",
    resultsSummaryHigh: "بناءً على إجاباتك، تبدو مرتفعاً بشكل ملحوظ في {{subject}} ({{percentage}}%). الأشخاص الذين لديهم ملفات مشابهة غالباً ما يكونون {{highText}}.",
    resultsSummaryLow: "على العكس، تُظهر نتائجك توافقاً أقل مع {{subject}} ({{percentage}}%)، مما يشير إلى أنك تميل إلى أن تكون {{lowText}} في تلك المواقف.",
    traitBreakdown: "تحليل السمات",
    retake: "إعادة التقييم",
    highTexts: {
      O: "مبدع للغاية ومنفتح الذهن",
      C: "مدفوع للغاية ومركز وموثوق",
      E: "منطلق ومنفتح وحيوي",
      A: "ودود ولطيف ومراعي لمشاعر الآخرين",
      N: "سريع الانتباه وحساس عاطفياً"
    },
    lowTexts: {
        O: "عملي وتقليدي",
        C: "مرن وعفوي",
        E: "هادئ وعميق التفكير",
        A: "تحليلي ومباشر",
        N: "هادئ ومرن عاطفياً"
    },
    personas: {
        O: { title: 'الانفتاح', persona: 'صاحب الرؤية', desc: 'واسع الخيال، فضولي، ومنفتح على تجارب جديدة.' },
        C: { title: 'الضمير الحي', persona: 'المنظم', desc: 'قدوة، منضبط ذاتياً، وعميق التفكير.' },
        E: { title: 'الانبساطية', persona: 'الاجتماعي', desc: 'اجتماعي، حازم، وحيوي.' },
        A: { title: 'التوافق', persona: 'المتعاطف', desc: 'متعاون، جدير بالثقة، وطيب القلب.' },
        N: { title: 'العصابية', persona: 'الحارس', desc: 'حساس، حذر، وواعي عاطفياً.' }
    },
    traitDescriptions: {
       high: {
          O: 'أنت واسع الخيال، فضولي، وتقدر الفن والعواطف والأفكار الجديدة بقوة.',
          C: 'أنت منضبط للغاية، منظم، وتخطط للمستقبل بدلاً من التصرف بعفوية.',
          E: 'أنت منفتح، حيوي، وتستمد طاقتك من التواجد حول الآخرين.',
          A: 'أنت متعاطف، متعاون، وتقدر بشدة التوافق مع الآخرين.',
          N: 'أنت تميل لتجربة المشاعر السلبية مثل القلق أو الغضب بسهولة.'
       },
       low: {
          O: 'أنت عملي بطبعك، تقليدي، وتفضل الروتين على التجارب الجديدة.',
          C: 'أنت مرن وعفوي، لكنك قد تفتقر أحياناً للتنظيم الدقيق.',
          E: 'أنت متحفظ وهادئ، وتستمد طاقتك من الأنشطة الانفرادية.',
          A: 'أنت تحليلي ومباشر، وتفضل التنافسية على التعاون.',
          N: 'أنت هادئ ومستقر عاطفياً، وقادر على التعامل مع التوتر.'
       }
    }
  },
  'ar-EG': {
    startAssessment: "يلا نبدأ",
    oceanAi: "OCEAN",
    mapYourPersonality: "اعرف شخصيتك",
    with: "بطريقة",
    bigFiveModel: "الخمسة الكبار",
    description: "نموذج العوامل الخمسة (OCEAN) هو أكتر طريقة علمية معتمدة لفهم الشخصيات. اعرف شخصيتك وتفاصيلها في الخمس جوانب دول.",
    questionCounter: "سؤال {{current}} / {{total}}",
    trait: "الصفة",
    skipQuestion: "عدي السؤال \u2190",
    previous: "اللي فات \u2192",
    options: {
      1: "مش موافق خالص",
      2: "مش موافق",
      3: "محايد",
      4: "موافق",
      5: "موافق جداً"
    },
    resultsTitle: "تحليل شخصيتك",
    resultsSubtitle: "مبني على نموذج الخمسة الكبار.",
    resultsSummaryHigh: "من إجاباتك، باين جداً إنك عالي في {{subject}} ({{percentage}}%). الناس اللي زيك غالباً بيكونوا {{highText}}.",
    resultsSummaryLow: "على الناحية التانية، النتيجة مبينة إن نسبة الـ {{subject}} عندك قليلة شوية ({{percentage}}%)، وده معناه إنك بتميل أكتر إنك تكون {{lowText}} في المواقف دي.",
    traitBreakdown: "تفاصيل صفاتك",
    retake: "امتحن تاني",
    highTexts: {
      O: "مبدع جداً ومخك متفتح",
      C: "طموح ومركز ويُعتمد عليه",
      E: "بتاع ناس وإجتماعي وحيوي",
      A: "حنين وودود وعشري",
      N: "حساس جداً وبتأخد بالك من كل حاجة"
    },
    lowTexts: {
        O: "عملي وبتحب المضمون",
        C: "مرن وبتعمل الحاجات براحتك",
        E: "هادي وبتحب تقعد مع نفسك",
        A: "دغري وبتحلل الأمور بواقعية",
        N: "رايق وهادي وعصابك حديد"
    },
    personas: {
        O: { title: 'الانفتاح', persona: 'المبدع', desc: 'خيالك واسع وعندك فضول تجرب حاجات جديدة.' },
        C: { title: 'الضمير', persona: 'المنظم', desc: 'حد شاطر ومنظم وبتحب تفكر في الحاجة.' },
        E: { title: 'الانبساطية', persona: 'الاجتماعي', desc: 'أبو ضحكة جنان وصاحب كل الناس.' },
        A: { title: 'التوافق', persona: 'المتعاطف', desc: 'طيب القلب وبتتعاون وتثق في الناس.' },
        N: { title: 'العصابية', persona: 'الحارس', desc: 'حساس وبتخاف على اللي حواليك.' }
    },
    traitDescriptions: {
       high: {
          O: 'خيالك واسع وفضولي وبتقدر الفن والمشاعر والأفكار الجديدة جدًا.',
          C: 'أنت منظم فوق الوصف ومضبوط ودايماً بتخطط لقدام مش بتسيب الأمور للصدفة.',
          E: 'بتحب تخرج للناس وعندك طاقة بتزيد وأنت معاهم وبتكره القعدة لوحدك.',
          A: 'أنت حنين، متعاون، وأهم حاجة عندك أنك تبقى على علاقة حلوة مع اللي حواليك.',
          N: 'ممكن تتوتر بسهولة أو تتأثر بسرعة وتتضايق من أقل حاجة.'
       },
       low: {
          O: 'أنت عملي وبتحب الروتين والحاجات اللي متعود عليها أكتر من التغيير المجنون.',
          C: 'أنت مرن وعفوي بس ممكن مرات تبقى الحياة فوضى شوية حواليك.',
          E: 'أنت هادي وتفكيرك عميق وبترتاح أكتر لما بتكون في حالك أو في مكان هادي.',
          A: 'دغري وعملي وبتحب المنافسة وبتجيب من الآخر ومابتجاملش.',
          N: 'أنت رايق وأعصابك تلاجة ومابتهزش بسهولة في المواقف الصعبة.'
       }
    }
  }
};

export function getTranslation(lang: Language) {
  return translations[lang];
}
