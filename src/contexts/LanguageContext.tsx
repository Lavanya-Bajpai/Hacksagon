import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Language = 'en' | 'hi' | 'ta' | 'bn' | 'te' | 'mr' | 'gu' | 'kn' | 'ml' | 'pa';

export interface TranslationKeys {
  'app.title': string;
  'welcome': string;
  'welcome.back': string;
  'loading': string;
  'loading.dashboard': string;
  'login': string;
  'logout': string;
  'signup': string;
  'signin': string;
  'signingin': string;
  'or': string;
  'createaccount': string;
  'create_new_account': string;
  'sign_in_to_your_existing_account': string;
  'account_created_successfully': string;
  'you_will_be_redirected_to_the_main_page_shortly': string;
  'your.progress': string;
  'completed.chapters': string;
  'achievements': string;
  'continue.learning': string;
  'language': string;
  'change.language': string;
  'english': string;
  'hindi': string;
  'tamil': string;
  'bengali': string;
  'telugu': string;
  'marathi': string;
  'gujarati': string;
  'kannada': string;
  'malayalam': string;
  'punjabi': string;
  'email': string;
  'emailplaceholder': string;
  'email_address': string;
  'password': string;
  'passwordplaceholder': string;
  'rememberme': string;
  'forgotpassword': string;
  'backtohome': string;
  'full_name': string;
  'username': string;
  'confirm_password': string;
  'creating_account': string;
  'create_account': string;
  'landing.experience': string;
  'announcement.newFeature': string;
  'announcement.dailyQuiz': string;
  'announcement.maintenance': string;
  'announcement.maintenanceDetail': string;
  'announcement.welcome': string;
  'announcement.welcomeDetail': string;
  'auth.required': string;
  'auth.pleaseLogin': string;
  'user.default': string;
  'chapters.title': string;
  'chapters.subtitle': string;
}

export interface LanguageContextType {
  currentLanguage: Language;
  setLanguage: (language: Language) => void;
  t: (key: keyof TranslationKeys, params?: Record<string, string>) => string;
  availableLanguages: { code: Language; name: string; nativeName: string }[];
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const availableLanguages = [
  { code: 'en' as Language, name: 'English', nativeName: 'English' },
  { code: 'hi' as Language, name: 'Hindi', nativeName: 'हिंदी' },
  { code: 'ta' as Language, name: 'Tamil', nativeName: 'தமிழ்' },
  { code: 'bn' as Language, name: 'Bengali', nativeName: 'বাংলা' },
  { code: 'te' as Language, name: 'Telugu', nativeName: 'తెలుగు' },
  { code: 'mr' as Language, name: 'Marathi', nativeName: 'मराठी' },
  { code: 'gu' as Language, name: 'Gujarati', nativeName: 'ગુજરાતી' },
  { code: 'kn' as Language, name: 'Kannada', nativeName: 'ಕನ್ನಡ' },
  { code: 'ml' as Language, name: 'Malayalam', nativeName: 'മലയാളം' },
  { code: 'pa' as Language, name: 'Punjabi', nativeName: 'ਪੰਜਾਬੀ' },
];

const translations: Record<Language, Partial<TranslationKeys>> = {
  en: {
    'app.title': 'LexIQ - Constitution Learning',
    'welcome': 'Welcome, {{name}}!',
    'welcome.back': 'Glad to see you again!',
    'loading': 'Loading...',
    'loading.dashboard': 'Loading your dashboard...',
    'login': 'Login',
    'logout': 'Logout',
    'signup': 'Sign Up',
    'signin': 'Sign In',
    'signingin': 'Signing in...',
    'or': 'or',
    'createaccount': 'Create Account',
    'create_new_account': 'Create New Account',
    'sign_in_to_your_existing_account': 'Sign in to your existing account',
    'account_created_successfully': 'Account created successfully!',
    'you_will_be_redirected_to_the_main_page_shortly': 'You will be redirected to the main page shortly.',
    'your.progress': 'Your Progress',
    'completed.chapters': 'Completed chapters: {{completed}}/{{total}}',
    'achievements': 'Achievements',
    'continue.learning': 'Continue Learning',
    'language': 'Language',
    'change.language': 'Change Language',
    'english': 'English',
    'hindi': 'Hindi',
    'tamil': 'Tamil',
    'bengali': 'Bengali',
    'telugu': 'Telugu',
    'marathi': 'Marathi',
    'gujarati': 'Gujarati',
    'kannada': 'Kannada',
    'malayalam': 'Malayalam',
    'punjabi': 'Punjabi',
    'email': 'Email',
    'emailplaceholder': 'Enter your email',
    'email_address': 'Email Address',
    'password': 'Password',
    'passwordplaceholder': 'Enter your password',
    'rememberme': 'Remember me',
    'forgotpassword': 'Forgot password?',
    'backtohome': 'Back to Home',
    'full_name': 'Full Name',
    'username': 'Username',
    'confirm_password': 'Confirm Password',
    'creating_account': 'Creating account...',
    'create_account': 'Create Account',
    'landing.experience': 'Experience the Constitution like never before!',
    'announcement.newFeature': 'New Feature!',
    'announcement.dailyQuiz': 'Try the new daily quiz feature.',
    'announcement.maintenance': 'Scheduled Maintenance',
    'announcement.maintenanceDetail': 'The site will be down for maintenance tonight.',
    'announcement.welcome': 'Welcome!',
    'announcement.welcomeDetail': 'Thank you for joining LexIQ.',
    'auth.required': 'Authentication Required',
    'auth.pleaseLogin': 'Please log in to continue.',
    'user.default': 'User',
    'chapters.title': 'Chapters',
    'chapters.subtitle': 'Explore all chapters of the Constitution.',
  },
  hi: {
    'app.title': 'LexIQ - संविधान अध्ययन',
    'welcome': 'स्वागत है, {{name}}!',
    'loading': 'लोड हो रहा है...',
    'login': 'लॉगिन',
    'logout': 'लॉगआउट',
    'signup': 'साइन अप',
    'your.progress': 'आपकी प्रगति',
    'completed.chapters': 'पूर्ण अध्याय: {{completed}}/{{total}}',
    'achievements': 'उपलब्धियां',
    'continue.learning': 'अध्ययन जारी रखें',
    'language': 'भाषा',
    'change.language': 'भाषा बदलें',
    'english': 'अंग्रे़ी',
    'hindi': 'हिंदी',
    'tamil': 'तमिल',
    'bengali': 'बंगाली',
    'telugu': 'तेलुगु',
    'marathi': 'मराठी',
    'gujarati': 'गुजराती',
    'kannada': 'कन्नड़',
    'malayalam': 'मलयालम',
    'punjabi': 'पंजाबी',
  },
  ta: {
    'app.title': 'LexIQ - அரசியலமைப்பு கற்றல்',
    'welcome': 'வரவேற்கிறோம், {{name}}!',
    'loading': 'ஏற்றுகிறது...',
    'login': 'உள்நுழைவு',
    'logout': 'வெளியேறு',
    'signup': 'பதிவு செய்க',
    'your.progress': 'உங்கள் முன்னேற்றம்',
    'completed.chapters': 'முடிந்த அத்தியாயங்கள்: {{completed}}/{{total}}',
    'achievements': 'சாதனைகள்',
    'continue.learning': 'கற்றலைத் தொடரவும்',
    'language': 'மொழி',
    'change.language': 'மொழியை மாற்று',
    'english': 'ஆங்கிலம்',
    'hindi': 'இந்தி',
    'tamil': 'தமிழ்',
    'bengali': 'வங்காளம்',
    'telugu': 'தெலுங்கு',
    'marathi': 'மராத்தி',
    'gujarati': 'குஜராத்தி',
    'kannada': 'கன்னடம்',
    'malayalam': 'மலையாளம்',
    'punjabi': 'பஞ்சாபி',
  },
  bn: {
    'app.title': 'LexIQ - সংবিধান শিক্ষা',
    'welcome': 'স্বাগতম, {{name}}!',
    'loading': 'লোড হচ্ছে...',
    'login': 'লগইন',
    'logout': 'লগআউট',
    'signup': 'সাইন আপ',
    'your.progress': 'আপনার অগ্রগতি',
    'completed.chapters': 'সম্পূর্ণ অধ্যায়: {{completed}}/{{total}}',
    'achievements': 'অর্জন',
    'continue.learning': 'শিক্ষা চালিয়ে যান',
    'language': 'ভাষা',
    'change.language': 'ভাষা পরিবর্তন করুন',
    'english': 'ইংরেজি',
    'hindi': 'হিন্দি',
    'tamil': 'তামিল',
    'bengali': 'বাংলা',
    'telugu': 'তেলুগু',
    'marathi': 'মরাঠি',
    'gujarati': 'গੁজরাটি',
    'kannada': 'কন্নড়',
    'malayalam': 'মালয়ালম',
    'punjabi': 'পঞ্জাবি',
  },
  te: {
    'app.title': 'LexIQ - రాజ్యాంగ అధ్యయనం',
    'welcome': 'స్వాగతం, {{name}}!',
    'loading': 'లోడ్ అవుతోంది...',
    'login': 'లాగిన్',
    'logout': 'లాగ్అవుట్',
    'signup': 'సైన్ అప్',
    'your.progress': 'మీ పురోగతి',
    'completed.chapters': 'పూర్తయిన అధ్యాయాలు: {{completed}}/{{total}}',
    'achievements': 'సాధనలు',
    'continue.learning': 'నేర్చుకోవడం కొనసాగించండి',
    'language': 'భాష',
    'change.language': 'భాష మార్చండి',
    'english': 'ఆంగ్లం',
    'hindi': 'హిందీ',
    'tamil': 'తమిళం',
    'bengali': 'బంగ్లా',
    'telugu': 'తెలుగు',
    'marathi': 'మరాఠీ',
    'gujarati': 'గుజరాతీ',
    'kannada': 'కన్నడ',
    'malayalam': 'మలయాళం',
    'punjabi': 'పంజాబీ',
  },
  mr: {
    'app.title': 'LexIQ - राज्यघटना शिक्षण',
    'welcome': 'स्वागत आहे, {{name}}!',
    'loading': 'लोड होत आहे...',
    'login': 'लॉगिन',
    'logout': 'लॉगआउट',
    'signup': 'साइन अप',
    'your.progress': 'तुमची प्रगती',
    'completed.chapters': 'पूर्ण अध्याय: {{completed}}/{{total}}',
    'achievements': 'यशस्वी',
    'continue.learning': 'शिक्षण सुरू ठेवा',
    'language': 'भाषा',
    'change.language': 'भाषा बदला',
    'english': 'इंग्रजी',
    'hindi': 'हिंदी',
    'tamil': 'तमिळ',
    'bengali': 'बंगाली',
    'telugu': 'तेलुगू',
    'marathi': 'मराठी',
    'gujarati': 'गुजराती',
    'kannada': 'कन्नड',
    'malayalam': 'मल्याळम',
    'punjabi': 'पंजाबी',
  },
  gu: {
    'app.title': 'LexIQ - બંધારણ શિક્ષણ',
    'welcome': 'સ્વાગત છે, {{name}}!',
    'loading': 'લોડ થઈ રહ્યું છે...',
    'login': 'લૉગિન',
    'logout': 'લૉગઆઉટ',
    'signup': 'સાઇન અપ',
    'your.progress': 'તમારી પ્રગતિ',
    'completed.chapters': 'પૂર્ણ પ્રકરણો: {{completed}}/{{total}}',
    'achievements': 'પ્રાપ્તિઓ',
    'continue.learning': 'શિક્ષણ ચાલુ રાખો',
    'language': 'ભાષા',
    'change.language': 'ભાષા બદલો',
    'english': 'અંગ્રેજી',
    'hindi': 'હિન્દી',
    'tamil': 'તમિલ',
    'bengali': 'બંગાળી',
    'telugu': 'તેલુગુ',
    'marathi': 'મરાઠી',
    'gujarati': 'ગુજરાતી',
    'kannada': 'કન્નડ',
    'malayalam': 'મલયાળમ',
    'punjabi': 'પંજાબી',
  },
  kn: {
    'app.title': 'LexIQ - ಸಂವಿಧಾನ ಕಲಿಕೆ',
    'welcome': 'ಸುಸ್ವಾಗತ, {{name}}!',
    'loading': 'ಲೋಡ್ ಆಗುತ್ತಿದೆ...',
    'login': 'ಲಾಗಿನ್',
    'logout': 'ಲಾಗ್ಔಟ್',
    'signup': 'ಸೈನ್ ಅಪ್',
    'your.progress': 'ನಿಮ್ಮ ಪ್ರಗತಿ',
    'completed.chapters': 'ಪೂರ್ಣಗೊಂಡ ಅಧ್ಯಾಯಗಳು: {{completed}}/{{total}}',
    'achievements': 'ಸಾಧನೆಗಳು',
    'continue.learning': 'ಕಲಿಕೆಯನ್ನು ಮುಂದುವರಿಸಿ',
    'language': 'ಭಾಷೆ',
    'change.language': 'ಭಾಷೆ ಬದಲಾಯಿಸಿ',
    'english': 'ಇಂಗ್ಲಿಷ್',
    'hindi': 'ಹಿಂದಿ',
    'tamil': 'ತಮಿಳು',
    'bengali': 'ಬಂಗಾಳಿ',
    'telugu': 'ತೆಲುಗು',
    'marathi': 'ಮರಾಠಿ',
    'gujarati': 'ಗುಜರಾತಿ',
    'kannada': 'ಕನ್ನಡ',
    'malayalam': 'ಮಲಯಾಳಂ',
    'punjabi': 'ಪಂಜಾಬಿ',
  },
  ml: {
    'app.title': 'LexIQ - ഭരണഘടന പഠനം',
    'welcome': 'സ്വാഗതം, {{name}}!',
    'loading': 'ലോഡ് ചെയ്യുന്നു...',
    'login': 'ലോഗിൻ',
    'logout': 'ലോഗൗട്ട്',
    'signup': 'സൈൻ അപ്പ്',
    'your.progress': 'നിങ്ങളുടെ പുരോഗതി',
    'completed.chapters': 'പൂർത്തിയായ അധ്യായങ്ങൾ: {{completed}}/{{total}}',
    'achievements': 'സാധനകൾ',
    'continue.learning': 'പഠനം തുടരുക',
    'language': 'ഭാഷ',
    'change.language': 'ഭാഷ മാറ്റുക',
    'english': 'ഇംഗ്ലീഷ്',
    'hindi': 'ഹിന്ദി',
    'tamil': 'തമിഴ്',
    'bengali': 'ബംഗാളി',
    'telugu': 'തെലുങ്ക്',
    'marathi': 'മറാത്തി',
    'gujarati': 'ഗുജറാത്തി',
    'kannada': 'കന്നഡ',
    'malayalam': 'മലയാളം',
    'punjabi': 'പഞ്ചാബി',
  },
  pa: {
    'app.title': 'LexIQ - ਸੰਵਿਧਾਨ ਸਿੱਖਿਆ',
    'welcome': 'ਸਵਾਗਤ ਹੈ, {{name}}!',
    'loading': 'ਲੋਡ ਹੋ ਰਿਹਾ ਹੈ...',
    'login': 'ਲੌਗਿਨ',
    'logout': 'ਲੌਗਆਉਟ',
    'signup': 'ਸਾਈਨ ਅੱਪ',
    'your.progress': 'ਤੁਹਾਡੀ ਤਰੱਕੀ',
    'completed.chapters': 'ਪੂਰੇ ਅਧਿਆਏ: {{completed}}/{{total}}',
    'achievements': 'ਕਾਮਯਾਬੀਆਂ',
    'continue.learning': 'ਸਿੱਖਣਾ ਜਾਰੀ ਰੱਖੋ',
    'language': 'ਭਾਸ਼ਾ',
    'change.language': 'ਭਾਸ਼ਾ ਬਦਲੋ',
    'english': 'ਅੰਗਰੇਜ਼ੀ',
    'hindi': 'ਹਿੰਦੀ',
    'tamil': 'ਤਮਿਲ',
    'bengali': 'ਬੰਗਾਲੀ',
    'telugu': 'ਤੇਲਗੂ',
    'marathi': 'ਮਰਾਠੀ',
    'gujarati': 'ਗੁਜਰਾਤੀ',
    'kannada': 'ਕੰਨੜ',
    'malayalam': 'ਮਲਿਆਲਮ',
    'punjabi': 'ਪੰਜਾਬੀ',
  },
};

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('language');
    return (saved as Language) || 'en';
  });

  useEffect(() => {
    localStorage.setItem('language', currentLanguage);
  }, [currentLanguage]);

  const setLanguage = (language: Language) => {
    setCurrentLanguage(language);
  };

  const t = (key: keyof TranslationKeys, params?: Record<string, string>): string => {
    const translation = (translations[currentLanguage]?.[key] as string) || (translations.en[key] as string) || key;
    if (params) {
      return Object.entries(params).reduce((str, [param, value]) => {
        return str.replace(new RegExp(`{{${param}}}`, 'g'), value);
      }, translation);
    }
    return translation;
  };

  const value: LanguageContextType = {
    currentLanguage,
    setLanguage,
    t,
    availableLanguages,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}; 