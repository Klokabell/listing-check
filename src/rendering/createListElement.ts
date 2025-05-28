import { removeStartAnds } from "./renderHelpers";

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
