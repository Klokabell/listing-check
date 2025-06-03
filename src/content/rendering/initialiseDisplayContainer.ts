import { createContainer } from "../helpers/renderHelpers";
import { fieldKeyArray } from "../../sharedData/constants";
import { downArrowIconNoLineRounded } from "../../sharedData/iconConstants";
import { collapseBtn } from "./elements/collapseBtn";

export const initialiseDisplayContainer = async () => {
  const fieldContainer = createContainer("panel");

  fieldKeyArray.forEach((field) => {
    const subContainer = createContainer(field);
    fieldContainer.appendChild(subContainer);
  });
  const panelButton = collapseBtn("panel_collapse-btn");
  const panelWrapper = document.createElement("div");
  panelWrapper.className = "panel-wrapper";
  panelWrapper.appendChild(panelButton);
  panelWrapper.appendChild(fieldContainer);
  panelButton.addEventListener("click", () => {
    document.getElementById("panel_container")?.classList.toggle("active");
    panelButton.classList.toggle("opened");
  });
  panelButton.innerHTML = downArrowIconNoLineRounded;
  document.body.appendChild(panelWrapper);

  return true;
};
