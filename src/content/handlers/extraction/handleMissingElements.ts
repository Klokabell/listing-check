import { checkSourceRenderState } from "../../helpers/renderHelpers";
import { handleSourceRetrieval } from "./handleSourceRetrieval";
import { SourceElementStateProxy } from "../../../types/types";

export const handleMissingElements = async (
  sourceElementStateProxy: SourceElementStateProxy
) => {
  console.log("running handleMissingElements");
  while (!checkSourceRenderState()) {
    handleSourceRetrieval(sourceElementStateProxy);
    await new Promise((res) => setTimeout(res, 100));
  }
};
