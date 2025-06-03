import {
  insertCollapseSpan,
  insertElement,
  removeCollapseSpanText,
} from "../helpers/renderHelpers";
import { createListElement } from "./elements/createListElement";
import { accordionFields } from "../../sharedData/stateObjects";

export const renderSkills = (source: Element | NodeList) => {
  const subspanId = "#skills-sub_span";

  let skillsDisplayString = null;
  let skillsDisplayList = null;

  let subheadingSpanString = ``;
  let matchingNum;
  let missingNum;
  removeCollapseSpanText(subspanId);
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
        const anchorElement = node.querySelector(
          "a.job-details-how-you-match__skills-item-subtitle"
        );
        const anchorText = anchorElement?.textContent?.trim().split(",");
        let subField = null;
        if (index == 0) {
          subField = "matching";
          matchingNum = anchorText?.length;
        }
        if (index == 1) {
          subField = "missing";
          missingNum = anchorText?.length;
        }
        if (anchorText && subField != null) {
          innerTextArray.push(
            createListElement("skills", subField, anchorText)
          );
        }
      });
      skillsDisplayList = innerTextArray.join("");
    }
    subheadingSpanString = `<span class="collapsed_results" id="check"><span class="collapsed-icon">&#10003;</span>${matchingNum}</span>  <span class="collapsed_results" id="cross"><span class="collapsed-icon">&#10539;</span>${missingNum}</span>`;
    insertCollapseSpan(subheadingSpanString, subspanId);
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
    console.log("skillsDisplayString: ", skillsDisplayString);
    insertElement("skills", skillsDisplayString);
    return true;
  } else return false;
};
