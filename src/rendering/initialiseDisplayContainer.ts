import { createContainer } from "./renderHelpers";
import { fieldKeyArray } from "../sharedData/constants";

export const initialiseDisplayContainer = async () => {
  const panelContainer = createContainer("panel");

  fieldKeyArray.forEach((field) => {
    const subContainer = createContainer(field);
    panelContainer.appendChild(subContainer);
  });

  //const panelDrawer = `<button id="panel_btn" class="collapsible_btn"></btn>`;
  document.body.appendChild(panelContainer);

  return true;
};
