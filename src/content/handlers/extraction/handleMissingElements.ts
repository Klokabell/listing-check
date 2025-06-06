import { checkSourceRenderState } from "../../helpers/renderHelpers";
import { handleSourceRetrieval } from "./handleSourceRetrieval";
import { SourceElementStateProxy } from "../../../types/types";

export const handleMissingElements = async (
  sourceElementStateProxy: SourceElementStateProxy
) => {
  while (!checkSourceRenderState()) {
    handleSourceRetrieval(sourceElementStateProxy);
    await new Promise((res) => setTimeout(res, 100));
  }
};
