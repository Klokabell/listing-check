type SuccessfulOutput = {
  [languageKey: string]: string[];
};

export type SourceElementStateProxy = {
  company: null | Element;
  title: null | Element;
  location: null | Element;
  languages: null | Element;
  skills: null | Element;
  [key: string]: null | Element;
};

export type LanguageErrorResult = {
  status: string;
  message: string;
};

export type LanguageSuccessResult = {
  status: string;
  data: SuccessfulOutput;
};

export type LanguageKey = string;
export type SentenceMap = Record<LanguageKey, string[]>;
export type OutputMap = Record<string, string[]>;
