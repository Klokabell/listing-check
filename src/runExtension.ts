import { waitForSourceContainer } from "./content/helpers/waitForContainer";
import { listingSelector } from "./sharedData/constants";
import { initialiseDisplayContainer } from "./content/rendering/initialiseDisplayContainer";
import { handleMissingElements } from "./content/handlers/extraction/handleMissingElements";
import { createSourceElementProxy } from "./content/proxy/createSourceElementProxy";
import { sidebarListener } from "./content/helpers/sidebarListener";
import { isRendered, sourceElementState } from "./sharedData/stateObjects";

export const runExtension = async () => {
  try {
    const sourceElement = await waitForSourceContainer(listingSelector);
    const sourceElementStateProxy =
      createSourceElementProxy(sourceElementState);
    if (sourceElement) {
      const panelContainer = document.getElementById("panel-wrapper");
      if (!panelContainer) {
        console.log("creating panel");
        await initialiseDisplayContainer();
      }
      sidebarListener(sourceElementStateProxy, isRendered);
      handleMissingElements(sourceElementStateProxy);
    }
  } catch (error) {
    console.log("Error:", error);
  }
};
