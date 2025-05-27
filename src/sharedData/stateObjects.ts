import { SourceElementStateProxy } from "../types/types";

// existence state of source containers, handled by observer
export const sourceElementState: SourceElementStateProxy = {
  company: null,
  title: null,
  location: null,
  languages: null,
  skills: null,
};

// which fields of current listing are rendered
export const isRendered: { [key: string]: boolean } = {
  company: false,
  title: false,
  location: false,
  languages: false,
  skills: false,
};

export const accordionFields: { [key: string]: boolean } = {
  languages: true,
  skills: true,
};
