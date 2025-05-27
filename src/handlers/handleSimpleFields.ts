import { createStringElement } from "../helpers/renderHelpers";

export const handleSimpleFields = (
  stringElement: Element,
  field: string,
  isRendered: { [key: string]: boolean }
) => {
  if (stringElement == null) return;
  const targetContainer = document.querySelector(`#${field}_container`);
  let sourceText = stringElement.textContent;

  if (targetContainer && sourceText != null) {
    if (field == "location") {
      const dotIndex = sourceText.indexOf(" · ");
      if (dotIndex !== -1) sourceText = sourceText.slice(0, dotIndex);
    }
    const fieldElement = createStringElement(sourceText, field);
    targetContainer.insertAdjacentHTML("beforeend", fieldElement);
    isRendered[field] = true;
  }
};
