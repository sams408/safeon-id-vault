
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { LanguageCode, translations } from "./index";

type LanguageContextType = {
  language: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
  t: (key: string, params?: Record<string, string | number>) => string;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider = ({ children }: LanguageProviderProps) => {
  // Get language from localStorage or use default
  const [language, setLanguageState] = useState<LanguageCode>(() => {
    const storedLanguage = localStorage.getItem("language") as LanguageCode;
    return storedLanguage && (storedLanguage === "en" || storedLanguage === "es") 
      ? storedLanguage 
      : "es";
  });

  // Save language preference to localStorage when it changes
  useEffect(() => {
    localStorage.setItem("language", language);
  }, [language]);

  // Function to set language
  const setLanguage = (lang: LanguageCode) => {
    setLanguageState(lang);
  };

  // Translation function with parameter interpolation
  const t = (key: string, params?: Record<string, string | number>) => {
    const keys = key.split(".");
    let translation: any = translations[language];
    
    for (const k of keys) {
      if (translation && translation[k]) {
        translation = translation[k];
      } else {
        // Fallback to English if key not found
        let fallback = translations.en;
        for (const fk of keys) {
          if (fallback && fallback[fk]) {
            fallback = fallback[fk];
          } else {
            return key; // Return the key itself if not found
          }
        }
        return typeof fallback === "string" ? interpolateString(fallback, params) : key;
      }
    }
    
    return typeof translation === "string" ? interpolateString(translation, params) : key;
  };

  // Helper function to replace parameters in translation strings
  const interpolateString = (str: string, params?: Record<string, string | number>): string => {
    if (!params) return str;
    
    return Object.entries(params).reduce((result, [key, value]) => {
      const regex = new RegExp(`{{\\s*${key}\\s*}}`, 'g');
      return result.replace(regex, String(value));
    }, str);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};
