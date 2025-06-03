import { clearRender, resetStateObjects } from "./renderHelpers";
import { handleMissingElements } from "../handlers/extraction/handleMissingElements";
import { SourceElementStateProxy } from "../../types/types";
let sidebarListenerExists = false;

export const sidebarListener = (
  stateObjectProxy: SourceElementStateProxy,
  isRendered: { [key: string]: boolean }
) => {
  const handleClick = (event: Event) => {
    const target = event.target as HTMLElement;
    const jobElement = target.closest(".scaffold-layout__list-item");

    if (jobElement) {
      console.log("clearing current render");
      clearRender();
      resetStateObjects(stateObjectProxy, isRendered);
      for (const key in stateObjectProxy) {
        isRendered[key] = false;
        stateObjectProxy[key] = null;
      }
      handleMissingElements(stateObjectProxy);
    }
  };

  const sidebarContainer = document.querySelector(".scaffold-layout__list");
  console.log("running sidebarListener");

  if (sidebarContainer && !sidebarListenerExists) {
    sidebarContainer.addEventListener("click", handleClick);
    sidebarListenerExists = true;
  }
  if (!sidebarContainer) {
    console.log("Sidebar list container not found, retrying in 1 second");
    setTimeout(sidebarListener, 1000); // try again after delay
  }
};
