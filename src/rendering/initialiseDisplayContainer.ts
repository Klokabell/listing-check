import { createContainer } from "../helpers/renderHelpers";
import { fieldKeyArray } from "../sharedData/constants";

export const initialiseDisplayContainer = async () => {
  const panelContainer = createContainer("panel");

  fieldKeyArray.forEach((field) => {
    const subContainer = createContainer(field);
    panelContainer.appendChild(subContainer);
  });
  document.body.appendChild(panelContainer);

  return true;
};
