'use client';

import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

export type SupportedLanguage = 'en' | 'ar';

interface Translations {
  [key: string]: {
    en: string;
    ar: string;
  };
}

const translations: Translations = {
  // Navbar
  'navbar.logout': { en: 'Logout', ar: 'تسجيل الخروج' },
  'navbar.lang_en': { en: 'EN', ar: 'إنج' },
  'navbar.lang_ar': { en: 'AR', ar: 'عر' },

  // Login
  'login.username': { en: 'Username', ar: 'اسم المستخدم' },
  'login.username_placeholder': { en: 'Enter your username', ar: 'أدخل اسم المستخدم' },
  'login.password': { en: 'Password', ar: 'كلمة المرور' },
  'login.password_placeholder': { en: 'Enter your password', ar: 'أدخل كلمة المرور' },
  'login.signin': { en: 'Sign In', ar: 'تسجيل الدخول' },
  'login.error': { en: 'Invalid username or password', ar: 'اسم المستخدم أو كلمة المرور غير صحيحة' },
  'login.footer': { en: 'All rights reserved.', ar: 'جميع الحقوق محفوظة.' },

  // Search
  'search.placeholder': { en: 'Search tools, documents...', ar: 'ابحث عن الأدوات والوثائق...' },
  'search.alert': { en: 'Searching for', ar: 'جارٍ البحث عن' },

  // Hero
  'hero.title': { en: 'Empowering Your Business with Connected Intelligence', ar: 'تمكين عملك بالذكاء المتصل' },
  'hero.desc': {
    en: 'Access all your AI-powered business solutions in one unified dashboard. Quickly summarize documents, generate proposals, interact with an intelligent chatbot, and gain actionable insights — all in a few clicks.',
    ar: 'الوصول إلى جميع حلول الأعمال المدعومة بالذكاء الاصطناعي في لوحة تحكم موحدة. لخّص المستندات بسرعة، وأنشئ المقترحات، وتفاعل مع روبوت دردشة ذكي، واحصل على رؤى قابلة للتنفيذ — بكل سهولة.'
  },
  'hero.features.title': { en: 'Key Features:', ar: 'أهم المزايا:' },
  'hero.features.1': { en: 'All-in-one platform for AI-driven business solutions', ar: 'منصة شاملة لحلول الأعمال المعتمدة على الذكاء الاصطناعي' },
  'hero.features.2': { en: 'Fast, accurate, and automated outputs', ar: 'مخرجات سريعة ودقيقة ومؤتمتة' },
  'hero.features.3': { en: 'No complex setup required', ar: 'لا حاجة لإعدادات معقدة' },
  'hero.features.4': { en: 'Seamless integration across tools', ar: 'تكامل سلس بين الأدوات' },
  'hero.features.5': { en: 'Customizable and white-label ready', ar: 'قابل للتخصيص وجاهز للعلامة البيضاء' },
  'hero.cta': { en: 'Get Started', ar: 'ابدأ الآن' },

  // FAQs
  'faqs.heading': { en: 'Frequently Asked Questions', ar: 'الأسئلة الشائعة' },
  'faqs.subtitle': { en: 'Answered all frequently asked questions. Still confused? Feel free to contact us.', ar: 'أجبنا على جميع الأسئلة الشائعة. ما زلت محتارًا؟ لا تتردد في التواصل معنا.' },
  // FAQ Items
  'faq.item1.q': { en: 'What can the AI Summarizer do?', ar: 'ماذا يمكن لملخص الذكاء الاصطناعي أن يفعل؟' },
  'faq.item1.a': { en: 'The AI Summarizer condenses lengthy documents—including PDFs, Word files, and plain text—into short, medium, or detailed summaries. It supports industry-specific content like legal or financial documents and ensures your data remains secure and private.', ar: 'يقوم الملخص الذكي بتكثيف المستندات الطويلة — بما في ذلك PDF وWord والنصوص — إلى ملخصات قصيرة أو متوسطة أو مفصلة. يدعم المحتوى الخاص بالقطاعات مثل القانونية أو المالية، ويضمن بقاء بياناتك آمنة وخاصة.' },
  'faq.item2.q': { en: 'How does the RAG Chatbot help businesses?', ar: 'كيف يساعد روبوت الدردشة RAG الشركات؟' },
  'faq.item2.a': { en: 'The RAG Chatbot is a 24/7 multilingual assistant that retrieves accurate answers from internal and external sources. It integrates with company data, supports global teams, and can be customized to match your specific content, workflows, and business needs.', ar: 'روبوت الدردشة RAG هو مساعد متعدد اللغات يعمل على مدار الساعة، يسترجع إجابات دقيقة من مصادر داخلية وخارجية. يندمج مع بيانات الشركة، ويدعم الفرق العالمية، ويمكن تخصيصه ليتوافق مع محتواك وتدفقات عملك واحتياجات عملك.' },
  'faq.item3.q': { en: 'What is Insight Connect used for?', ar: 'لِمَ يُستخدم Insight Connect؟' },
  'faq.item3.a': { en: 'Insight Connect is a centralized platform for real-time, collaborative business intelligence. It integrates with tools like Power BI and Tableau, provides continuously updated dashboards, and is designed to be accessible to both technical and non-technical users.', ar: 'Insight Connect هو منصة مركزية لذكاء الأعمال بشكل فوري وتعاوني. يندمج مع أدوات مثل Power BI وTableau، ويوفر لوحات معلومات محدثة باستمرار، ومصمم ليكون مناسبًا لكل من المستخدمين التقنيين وغير التقنيين.' },
  'faq.item4.q': { en: 'How does the Proposal Generator save time?', ar: 'كيف يوفر مُنشئ المقترحات الوقت؟' },
  'faq.item4.a': { en: 'The Proposal Generator creates professional, branded proposals in minutes using customizable templates. It integrates with your CRM to auto-fill key data, significantly reducing manual effort while ensuring consistency and high quality.', ar: 'يقوم مُنشئ المقترحات بإنشاء مقترحات احترافية تحمل علامتك التجارية خلال دقائق باستخدام قوالب قابلة للتخصيص. يندمج مع نظام إدارة علاقات العملاء لملء البيانات تلقائيًا، مما يقلل الجهد اليدوي مع الحفاظ على الاتساق والجودة.' },
};

interface LanguageContextValue {
  language: SupportedLanguage;
  setLanguage: (lang: SupportedLanguage) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<SupportedLanguage>('en');

  useEffect(() => {
    const saved = typeof window !== 'undefined' ? (localStorage.getItem('language') as SupportedLanguage | null) : null;
    if (saved === 'en' || saved === 'ar') {
      setLanguageState(saved);
    }
  }, []);

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = language === 'ar' ? 'ar' : 'en';
      document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    }
  }, [language]);

  const setLanguage = (lang: SupportedLanguage) => {
    setLanguageState(lang);
    if (typeof window !== 'undefined') {
      localStorage.setItem('language', lang);
    }
  };

  const t = useMemo(() => {
    return (key: string) => {
      const entry = translations[key];
      if (!entry) return key;
      return language === 'ar' ? entry.ar : entry.en;
    };
  }, [language]);

  const value = useMemo<LanguageContextValue>(() => ({ language, setLanguage, t }), [language, t]);

  return (
    <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider');
  return ctx;
}
