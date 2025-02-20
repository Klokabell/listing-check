export type DisplayResultsProps = {
  company: string;
  title: string;
  languages: { language: string; examples: string[] };
  location: string;
};
export type RegexObject = Record<string, RegExp>;

export type RequirementObject = {
  matches: string[];
  possible?: string[];
};
