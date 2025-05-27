import { fieldKeyArray } from "../sharedData/constants";
import { isRendered, accordionFields } from "../sharedData/stateObjects";
import { SourceElementStateProxy } from "../types/types";

export const removeStartAnds = (text: string) => {
  const regex = new RegExp(`^and\\b\\s*`, "i");
  let newText = text;
  if (regex.test(text)) {
    newText = text.replace(regex, "");
  }
  return newText;
};

export const createStringElement = (fieldText: string, field: string) => {
  let accordion = false;
  if (field == "languages" || field == "skills") {
    accordion = accordionFields[field];
    if (!accordion) {
      console.log(`${field} accordion state`, accordion);
      const anchor = document.getElementById(field + "_arrow");
      if (anchor) anchor.style.visibility = "hidden";
    }
  }
  return `
  ${
    accordion
      ? `<div class="accordion_content" id="${field}Accordion">`
      : `<div class="content" id="${field}">`
  }       <p class="result-value"><span>${fieldText}</span></p>
        </div>`;
};

export const createContainer = (fieldId: string) => {
  const div = document.createElement("div");
  div.id = `${fieldId}_container`;

  if (fieldId != "panel") {
    let containerHTML = "";
    if (fieldId == "languages" || fieldId == "skills") {
      containerHTML = `
                <label class="header persist" for="${fieldId}_input">
                    ${fieldId.charAt(0).toUpperCase() + fieldId.slice(1)}
                    <span class="label_arrow" id="${fieldId}_arrow">&#x3e;</span>
                </label>
                <input type="checkbox" class="accordion_checkbox persist" id="${fieldId}_input" checked>
                `;
    } else {
      containerHTML = `
        <h3 class="header persist">
        ${fieldId.charAt(0).toUpperCase() + fieldId.slice(1)}
      </h3>`;
    }
    div.className = "expansionField";
    div.innerHTML = containerHTML;
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
  let arrLength = array.length;
  if (arrLength === 1 && array[0].trim() === "") {
    return `<p class="no-data">${subFieldName}: No values found</p>`;
  }

  let gridClass = "two-col";
  let columns = 2;

  if (arrLength === 1) {
    gridClass = "one-col ";
    columns = 1;
  }
  if (arrLength > 8) {
    gridClass = "three-col";
    columns = 3;
  }

  const list = array
    .map((example, index) => {
      example = example.trim();
      if (index === arrLength - 1) {
        example = removeStartAnds(example);
      }
      return `<li class="span_examples" id="${field}_examples">${example}</li>`;
    })
    .join("");

  const remainder = arrLength % columns;
  const gridFillerCount = remainder === 0 ? 0 : columns - remainder;

  const fillers = new Array(gridFillerCount)
    .fill(`<li class="span_examples filler"></li>`)
    .join("");

  if (field === "languages" && subFieldName.includes("_")) {
    const regex = new RegExp("_", "g");
    subFieldName = subFieldName.replace(regex, ", ");
  }

  const listElement = `
  <div class="subList_container" id="${subFieldName}_sub-container">
      <span class="subheading" id="${subFieldName}">
        ${
          subFieldName.charAt(0).toUpperCase() + subFieldName.slice(1)
        } (${arrLength}):
      </span>
      <ul id="${subFieldName}_list" class="accordionList ${gridClass}">
          ${list}
          ${fillers}
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

export const insertElement = (field: string, innerHTMLString: string) => {
  const container = document.querySelector(`#${field}_container`);
  if (container) container.insertAdjacentHTML("beforeend", innerHTMLString);
  else return `${container} not found`;
};

export const clearRender = () => {
  const panelFieldsContainers = document.querySelectorAll(".expansionField");
  if (panelFieldsContainers) {
    panelFieldsContainers.forEach((container) => {
      Array.from(container.children).forEach((child) => {
        if (!child.classList.contains("persist")) container.removeChild(child);
      });
    });
  }
};

export const fillEmptyGridItems = (
  grid: Element,
  gridName: string,
  arrayLength: number
) => {
  let columns = 2;
  if (gridName == "three-col") columns = 3;

  const remainder = arrayLength % columns;
  if (remainder != 0) {
    const fillers = columns - arrayLength;
    for (let i = 0; i < fillers; i++) {
      const filler = document.createElement("div");
      filler.className = "span_examples filler";
      grid.appendChild(filler);
    }
  }
};
