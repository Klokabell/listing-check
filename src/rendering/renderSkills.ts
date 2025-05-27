import { createListElement, insertElement } from "../helpers/renderHelpers";
import { accordionFields } from "../sharedData/stateObjects";

export const renderSkills = (source: Element | NodeList) => {
  let skillsDisplayString = null;
  let skillsDisplayList = null;

  // unsorted skills
  if (source instanceof Element) {
    const text = source.textContent?.trim().split(" · ");
    if (text) {
      console.log(`general text: ${text}`);
      skillsDisplayList = createListElement("skills", "general", text);
    }
  }
  // sorted skills
  else if (source instanceof NodeList) {
    const innerTextArray: string[] = [];
    if (source.length > 1) {
      source.forEach((node, index) => {
        if (node instanceof HTMLElement === false) return null;
        const anchorELement = node.querySelector(
          "a.job-details-how-you-match__skills-item-subtitle"
        );
        const anchorText = anchorELement?.textContent?.trim().split(",");
        let subField = null;
        if (index == 0) subField = "matching";
        if (index == 1) subField = "missing";
        if (anchorText && subField != null) {
          console.log(`${subField} anchorText: ${anchorText}`);
          innerTextArray.push(
            createListElement("skills", subField, anchorText)
          );
        }
      });
      skillsDisplayList = innerTextArray.join("");
    }
  }
  if (skillsDisplayList) {
    accordionFields.skills = true;
    skillsDisplayString = `
      <div class="accordion_container" id="skillsAccordion">
        ${skillsDisplayList}
      </div>
    `;
  }
  if (skillsDisplayString) {
    insertElement("skills", skillsDisplayString);
    return true;
  } else return false;
};
