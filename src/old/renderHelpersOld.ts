/* import { fieldKeyArray } from "../sharedData/constants";
import { isRendered } from "../sharedData/stateObjects";
import { SourceElementStateProxy } from "../types/types";

export const createStringElement = (fieldText: string, field: string) => {
  return `
        <input type="checkbox" class="accordion" id="${field}_input" checked>
        <div class="accordion_content" id="${field}Accordion">
          <p><span class="result-value">${fieldText}</span></p>
        </div>
        `;
};
export const removeStartAnds = (text: string) => {
  const regex = new RegExp(`^and\\b\\s*`, "i");
  let newText = text;
  if (regex.test(text)) {
    newText = text.replace(regex, "");
  }
  return newText;
};

export const createContainer = (fieldId: string) => {
  const div = document.createElement("div");
  div.id = `${fieldId}_container`;
  if (fieldId != "panel") {
    div.innerHTML = `<label class="header" for="${fieldId}_input"> ${
      fieldId.charAt(0).toUpperCase() + fieldId.slice(1)
    } <span class="label_arrow">&#x3e;</span></label>`;
    div.className = "expansionField";
  }
  return div;
};

export const checkSourceRenderState = () => {
  const renderStateArray = Object.values(isRendered);
  return renderStateArray.every((isRendered) => isRendered === true);
};

export const createListElement = (
  field: string,
  subFieldName: string,
  array: string[]
) => {
  if (array.length === 1 && array[0].trim() === "") {
    return `<p class="no-data">${subFieldName}: No values found</p>`;
  }
  const list = array
    .map((example, index) => {
      example = example.trim();
      if (index === array.length - 1) {
        console.log("last item: ", example);
        example = removeStartAnds(example);
        console.log("formatted last item: ", example);
      }
      return `<li class="span_examples" id="${field}_examples">${example}</li>`;
    })
    .join("");

  if (field === "languages" && subFieldName.includes("_")) {
    const regex = new RegExp("_", "g");
    subFieldName = subFieldName.replace(regex, ", ");
  }

  const listElement = `
  <div class="subList_container">
      <span class="subheading" id="${subFieldName}">
        ${subFieldName.charAt(0).toUpperCase() + subFieldName.slice(1)} (${
    array.length
  }):
      </span>
      <ul id="${field}_list" class="accordionList">
          ${list}
      </ul>
      </div>
    `;
  return listElement;
};

export const resetStateObjects = (
  stateProxy: SourceElementStateProxy,
  isRendered: { [key: string]: boolean }
) => {
  console.log("reseting state");
  fieldKeyArray.forEach((key) => {
    stateProxy[key] = null;
    isRendered[key] = false;
  });
};

export const renderElement = (field: string, innerHTMLString: string) => {
  const container = document.querySelector(`#${field}_container`);
  if (container) container.insertAdjacentHTML("beforeend", innerHTMLString);
  else return `${container} not found`;
};

export const clearRender = () => {
  const panelFieldsContainers = document.querySelectorAll(".expansionField");
  if (panelFieldsContainers) {
    panelFieldsContainers.forEach((container) => {
      Array.from(container.children).forEach((child) => {
        console.log("child", child);
        if (child.className !== "header") container.removeChild(child);
      });
    });
  }
};
 */