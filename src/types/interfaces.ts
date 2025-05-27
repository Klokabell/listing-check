export interface FeatureState {
  sourceElementState: null | Element;
  isRendered: boolean;
}

export interface SourceElementState {
  company: null | Element;
  title: null | Element;
  location: null | Element;
  languages: null | Element;
  skills: null | Element;
  [key: string]: null | Element;
}

export interface StateObject {
  [key: string]: FeatureState;
  company: FeatureState;
  title: FeatureState;
  location: FeatureState;
  languages: FeatureState;
  skills: FeatureState;
}
