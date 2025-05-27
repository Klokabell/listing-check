import { waitForSourceContainer } from "./helpers/waitForContainer";
import { listingSelector } from "./sharedData/constants";
import { initialiseDisplayContainer } from "./rendering/initialiseDisplayContainer";
import { handleMissingElements } from "./handlers/extraction/handleMissingElements";
import { createSourceElementProxy } from "./proxy/createSourceElementProxy";
import { sidebarListener } from "./helpers/sidebarListener";
import { isRendered, sourceElementState } from "./sharedData/stateObjects";

export const runExtension = async () => {
  try {
    const sourceElement = await waitForSourceContainer(listingSelector);
    const sourceElementStateProxy = createSourceElementProxy(sourceElementState);
    if (sourceElement) {
      const panelContainer = document.getElementById("panel_container");
      if (!panelContainer) {
        console.log("creating panel container");
        await initialiseDisplayContainer();
      }
      sidebarListener(sourceElementStateProxy, isRendered);
      handleMissingElements(sourceElementStateProxy);
    }
  } catch (error) {
    console.log("Error:", error);
  }
};
