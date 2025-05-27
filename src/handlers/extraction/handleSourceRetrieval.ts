import { fieldKeyArray, sourceSelectors } from "../../sharedData/constants";
import { SourceElementStateProxy } from "../../types/types";

export const handleSourceRetrieval = (
  sourceElementStateProxy: SourceElementStateProxy
) => {
  fieldKeyArray.forEach((key) => {
    if (sourceElementStateProxy[key] == null) {
      const sourceElement = document.querySelector(sourceSelectors[key]);
      if (sourceElement) {
        sourceElementStateProxy[key] = sourceElement;
      } else return;
    }
  });
};
