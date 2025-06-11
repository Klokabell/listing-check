import {
  insertCollapseSpan,
  insertElement,
  removeCollapseSpanText,
} from "../helpers/renderHelpers";
import { createListElement } from "./elements/createListElement";
import { accordionFields } from "../../sharedData/stateObjects";

export const renderSkills = (source: Element | NodeList) => {
  const subspanId = "#skills-sub_span";
  removeCollapseSpanText(subspanId);
  let skillsDisplayString = null;
  let skillsDisplayList = null;
  let subheadingSpanString = ``;
  let matchingNum;
  let missingNum;
  const anchorSelector = "a.job-details-how-you-match__skills-item-subtitle";
  const extractAnchorText = (el: Element | null) => {
    if (el == null) return ["No skills element found"];
    return el.textContent?.trim().split(",") ?? [];
  };
  // unsorted skills
  if (source instanceof Element) {
    const text = source.textContent?.trim().split(" · ");
    if (text) {
      skillsDisplayList = createListElement("skills", "general", text);
    }
  }
  // sorted skills
  else if (source instanceof NodeList) {
    const innerTextArray: string[] = [];
    if (source.length > 1) {
      source.forEach((node, index) => {
        if (node instanceof HTMLElement === false) return null;
        const anchorText = extractAnchorText(
          node.querySelector(anchorSelector)
        );
        if (!anchorText.length) return;
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
    // single matching skills field
    else if (source.length === 1) {
      let sortedItem = source.item(0);
      if (sortedItem instanceof HTMLElement) {
        const anchorText = extractAnchorText(
          sortedItem.querySelector(anchorSelector)
        );
        if (!anchorText) return false;
        let sortedTypeText = sortedItem
          .querySelector(".t-14.t-bold")
          ?.textContent?.trim();
        if (sortedTypeText) {
          const splitText = sortedTypeText.split(" ", 2);
          const skillNum = parseInt(splitText[0]);
          const matchingRegex = new RegExp(`matching`);
          if (matchingRegex.test(splitText[1])) {
            matchingNum = skillNum;
            missingNum = 0;
            innerTextArray.push(
              createListElement("skills", "matching", anchorText)
            );
          } else {
            missingNum = skillNum;
            innerTextArray.push(
              createListElement("skills", "missing", anchorText)
            );
          }
        }
      }
      skillsDisplayList = innerTextArray;
    }
    subheadingSpanString = `<span class="collapsed_results ${
      matchingNum ? "" : "hideCollapse"
    } " id="check"><span class="collapsed-icon">&#10003;</span>${matchingNum}</span>  <span class="collapsed_results ${
      missingNum ? "" : "hideCollapse"
    }
" id="cross"><span class="collapsed-icon">&#10539;</span>${missingNum}</span>`;
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
    insertElement("skills", skillsDisplayString);
    return true;
  } else return false;
};
