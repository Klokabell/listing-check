const waitForSourceContainer = (selector) => {
  return new Promise((res, rej) => {
    const startTime = Date.now();
    const checkForContainer = () => {
      const container = document.querySelector(selector);
      if (container) {
        console.log("container found");
        res(container);
      } else if (Date.now() - startTime > 6e3) {
        rej(new Error(`Timed out waiting for ${selector}`));
      } else {
        console.log("rechecking for source container");
        setTimeout(checkForContainer, 100);
      }
    };
    checkForContainer();
  });
};
const fieldKeyArray = [
  "company",
  "title",
  "location",
  "skills",
  "languages"
];
const listingSelector = "#main > div > div.scaffold-layout__list-detail-inner.scaffold-layout__list-detail-inner--grow > div.scaffold-layout__detail.overflow-x-hidden.jobs-search__job-details > div > div.jobs-search__job-details--container > div > div.job-view-layout.jobs-details > div:nth-child(1) > div";
const sourceSelectors = {
  title: ".t-24.job-details-jobs-unified-top-card__job-title",
  company: ".job-details-jobs-unified-top-card__company-name a",
  location: ".t-black--light.mt2.job-details-jobs-unified-top-card__tertiary-description-container > span:nth-child(1)",
  languages: '#job-details .mt4 p[dir="ltr"]',
  skills: "#how-you-match-card-container"
};
const sourceElementState = {
  company: null,
  title: null,
  location: null,
  languages: null,
  skills: null
};
const isRendered = {
  company: false,
  title: false,
  location: false,
  languages: false,
  skills: false
};
const accordionFields = {
  languages: true,
  skills: true
};
const removeStartAnds = (text) => {
  const regex = new RegExp(`^and\\b\\s*`, "i");
  let newText = text;
  if (regex.test(text)) {
    newText = text.replace(regex, "");
  }
  return newText;
};
const createStringElement = (fieldText, field) => {
  let accordion = false;
  if (field == "languages" || field == "skills") {
    accordion = accordionFields[field];
    if (!accordion) {
      const anchor = document.getElementById(field + "_arrow");
      if (anchor) anchor.style.visibility = "hidden";
    }
  }
  return `
  ${accordion ? `<div class="accordion_content" id="${field}Accordion">` : `<div class="content" id="${field}">`}       <p class="result-value"><span>${fieldText}</span></p>
        </div>`;
};
const createContainer = (fieldId) => {
  const div = document.createElement("div");
  div.id = `${fieldId}_container`;
  if (fieldId != "panel") {
    let containerHTML = "";
    if (fieldId == "languages" || fieldId == "skills") {
      containerHTML = `
                <label class="header persist" for="${fieldId}_input">
                    ${fieldId.charAt(0).toUpperCase() + fieldId.slice(1)}<span class="subheading_span" id="${fieldId}-sub_span"></span>
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
const checkSourceRenderState = () => {
  const renderStateArray = Object.values(isRendered);
  return renderStateArray.every((isRendered2) => isRendered2 === true);
};
const resetStateObjects = (stateProxy, isRendered2) => {
  console.log("reseting state");
  fieldKeyArray.forEach((key) => {
    stateProxy[key] = null;
    isRendered2[key] = false;
  });
};
const insertElement = (field, innerHTMLString) => {
  const container = document.querySelector(`#${field}_container`);
  if (container) container.insertAdjacentHTML("beforeend", innerHTMLString);
  else return `${container} not found`;
};
const clearRender = () => {
  const panelFieldsContainers = document.querySelectorAll(".expansionField");
  if (panelFieldsContainers) {
    panelFieldsContainers.forEach((container) => {
      Array.from(container.children).forEach((child) => {
        if (!child.classList.contains("persist")) container.removeChild(child);
      });
    });
  }
};
const insertCollapseSpan = (text, target) => {
  const targetSpan = document.querySelector(target);
  if (targetSpan) targetSpan.innerHTML = text;
};
const removeCollapseSpanText = (target) => {
  const targetSpan = document.querySelector(target);
  if (targetSpan) targetSpan.innerHTML = "";
};
const downArrowIconNoLineRounded = `<svg class="arrow_icon" id="collapse-arrow" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" 
	 viewBox="0 0 55.751 55.751" xml:space="preserve">
<g>
	<path d="M31.836,43.006c0.282-0.281,0.518-0.59,0.725-0.912L54.17,20.485c2.107-2.109,2.109-5.528,0-7.638
		c-2.109-2.107-5.527-2.109-7.638,0l-18.608,18.61L9.217,12.753c-2.109-2.108-5.527-2.109-7.637,0
		C0.527,13.809-0.002,15.19,0,16.571c-0.002,1.382,0.527,2.764,1.582,3.816l21.703,21.706c0.207,0.323,0.445,0.631,0.729,0.913
		c1.078,1.078,2.496,1.597,3.91,1.572C29.336,44.604,30.758,44.084,31.836,43.006z"/>
</g>
</svg>`;
const collapseBtn = (id) => {
  const collapseBtn2 = document.createElement("button");
  collapseBtn2.type = "button";
  collapseBtn2.className = "collapse-btn closed";
  collapseBtn2.id = id;
  return collapseBtn2;
};
const initialiseDisplayContainer = async () => {
  const fieldContainer = createContainer("panel");
  fieldKeyArray.forEach((field) => {
    const subContainer = createContainer(field);
    fieldContainer.appendChild(subContainer);
  });
  const panelButton = collapseBtn("panel_collapse-btn");
  const panelWrapper = document.createElement("div");
  panelWrapper.id = "panel-wrapper";
  panelWrapper.appendChild(panelButton);
  panelWrapper.appendChild(fieldContainer);
  panelButton.addEventListener("click", () => {
    var _a;
    (_a = document.getElementById("panel_container")) == null ? void 0 : _a.classList.toggle("active");
    panelButton.classList.toggle("opened");
  });
  panelButton.innerHTML = downArrowIconNoLineRounded;
  document.body.appendChild(panelWrapper);
  return true;
};
const handleSourceRetrieval = (sourceElementStateProxy) => {
  fieldKeyArray.forEach((key) => {
    if (sourceElementStateProxy[key] == null) {
      const sourceElement = document.querySelector(sourceSelectors[key]);
      if (sourceElement) {
        sourceElementStateProxy[key] = sourceElement;
      } else return;
    }
  });
};
const handleMissingElements = async (sourceElementStateProxy) => {
  while (!checkSourceRenderState()) {
    handleSourceRetrieval(sourceElementStateProxy);
    await new Promise((res) => setTimeout(res, 100));
  }
};
const handleSimpleFields = (stringElement, field, isRendered2) => {
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
    isRendered2[field] = true;
  }
};
const messageSender = async (contentText, userLanguage) => {
  const maxRetries = 3;
  const delay = (ms) => new Promise((res) => setTimeout(res, ms));
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      if (attempt > 0) {
        console.log(`Retrying message send... attempt ${attempt + 1}`);
        await delay(100);
      }
      console.log("sending message");
      const response = await chrome.runtime.sendMessage({
        action: "checkLanguages",
        messageBody: { contentText, userLanguage }
      });
      if (response) {
        return response;
      } else {
        console.warn("No response from service worker");
      }
    } catch (error) {
      console.error("Error in messageSender:", error);
    }
  }
  console.error("All attempts to contact service worker failed");
  return null;
};
const createListElement = (field, subFieldName, array) => {
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
  const list = array.map((example, index) => {
    example = example.trim();
    if (index === arrLength - 1) {
      example = removeStartAnds(example);
    }
    return `<li class="span_examples" id="${field}_examples">${example}</li>`;
  }).join("");
  const remainder = arrLength % columns;
  const gridFillerCount = remainder === 0 ? 0 : columns - remainder;
  const fillers = new Array(gridFillerCount).fill(`<li class="span_examples filler"></li>`).join("");
  if (field === "languages" && subFieldName.includes("_")) {
    const regex = new RegExp("_", "g");
    subFieldName = subFieldName.replace(regex, ", ");
  }
  const listElement = `
  <div class="subList_container" id="${subFieldName}_sub-container">
      <span class="subheading" id="${subFieldName}">
        ${subFieldName.charAt(0).toUpperCase() + subFieldName.slice(1)} (${arrLength}):
      </span>
      <ul id="${subFieldName}_list" class="accordionList ${gridClass}">
          ${list}
          ${fillers}
      </ul>
      </div>
    `;
  return listElement;
};
const extractingListingText = (parentPElement) => {
  if (!parentPElement) return null;
  const punctuationRegex = /[.!?:;]$/;
  const spanList = parentPElement == null ? void 0 : parentPElement.querySelectorAll("span");
  const extractedTextArray = [];
  spanList == null ? void 0 : spanList.forEach((span) => {
    const paragraphChild = span.querySelector("p");
    const uListChild = span.querySelector("ul");
    if (paragraphChild) {
      let text = paragraphChild.innerText.trim();
      if (text.length === 0) return;
      if (!punctuationRegex.test(text.trim())) text += ".";
      extractedTextArray.push(text);
    } else if (uListChild) {
      const listItems = uListChild.querySelectorAll("li");
      listItems.forEach((item) => {
        let text = item.innerText.trim();
        if (text.length === 0) return;
        if (!punctuationRegex.test(text.trim())) text += ".";
        extractedTextArray.push(text);
      });
    }
  });
  return extractedTextArray.join(" ");
};
const handleLanguagesField = async (element, isRendered2) => {
  let langElementString;
  if (element == null) return;
  const languageSourceText = extractingListingText(element);
  if (languageSourceText) {
    const responseObject = await messageSender(languageSourceText, "english");
    if (responseObject.status == "error") {
      accordionFields.languages = false;
      const noLanguageElement = createStringElement(
        responseObject.message,
        "languages"
      );
      const langElement = document.querySelector("#languages_container");
      if (langElement)
        langElement.insertAdjacentHTML("beforeend", noLanguageElement);
      return;
    }
    const languageObject = responseObject.message;
    const languageFieldArray = Object.keys(responseObject.message);
    const languageElement = languageFieldArray.map((languageName) => {
      if (responseObject.status == "partial") {
        languageName = "Potentially " + languageName;
      }
      accordionFields.languages = true;
      return createListElement(
        "languages",
        languageName,
        languageObject[languageName]
      );
    }).join("");
    if (languageElement) {
      langElementString = `
        <div class="accordion_container" id="languageAccordion">
          ${languageElement}
        </div>
      `;
      insertElement("languages", langElementString);
      isRendered2.languages = true;
    }
  }
};
const checkSkillsType = (skillsContainer) => {
  const sortedSkills = skillsContainer.querySelectorAll(
    ".job-details-how-you-match__skills-item-wrapper"
  );
  if (sortedSkills && sortedSkills.length > 0) {
    console.log("sortedSkills", sortedSkills);
    return sortedSkills;
  } else {
    const unsortedSkillsNodeList = skillsContainer.querySelectorAll(
      'a[data-test-app-aware-link=""]'
    );
    if (unsortedSkillsNodeList) {
      let unsortedSkills = null;
      unsortedSkillsNodeList.forEach((node) => {
        console.log("unsortedSkillsNode", node);
        const parentEl = node.parentElement;
        if (parentEl == null) return;
        if (parentEl.tagName == "LI") return;
        const isCorrectAnchor = parentEl.querySelector("h3.t-16.t-bold");
        if (isCorrectAnchor) unsortedSkills = node;
      });
      console.log("unsortedSkills", unsortedSkills);
      return unsortedSkills;
    } else {
      console.log("no skills element");
      return null;
    }
  }
};
const renderSkills = (source) => {
  var _a, _b, _c;
  const subspanId = "#skills-sub_span";
  removeCollapseSpanText(subspanId);
  let skillsDisplayString = null;
  let skillsDisplayList = null;
  let subheadingSpanString = ``;
  let matchingNum;
  let missingNum;
  const anchorSelector = "a.job-details-how-you-match__skills-item-subtitle";
  const extractAnchorText = (el) => {
    var _a2;
    if (el == null) return ["No skills element found"];
    return ((_a2 = el.textContent) == null ? void 0 : _a2.trim().split(",")) ?? [];
  };
  if (source instanceof Element) {
    const text = (_a = source.textContent) == null ? void 0 : _a.trim().split(" · ");
    if (text) {
      skillsDisplayList = createListElement("skills", "general", text);
    }
  } else if (source instanceof NodeList) {
    const innerTextArray = [];
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
          matchingNum = anchorText == null ? void 0 : anchorText.length;
        }
        if (index == 1) {
          subField = "missing";
          missingNum = anchorText == null ? void 0 : anchorText.length;
        }
        if (anchorText && subField != null) {
          innerTextArray.push(
            createListElement("skills", subField, anchorText)
          );
        }
      });
      skillsDisplayList = innerTextArray.join("");
    } else if (source.length === 1) {
      let sortedItem = source.item(0);
      if (sortedItem instanceof HTMLElement) {
        const anchorText = extractAnchorText(
          sortedItem.querySelector(anchorSelector)
        );
        if (!anchorText) return false;
        let sortedTypeText = (_c = (_b = sortedItem.querySelector(".t-14.t-bold")) == null ? void 0 : _b.textContent) == null ? void 0 : _c.trim();
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
    subheadingSpanString = `<span class="collapsed_results ${matchingNum ? "" : "hideCollapse"} " id="check"><span class="collapsed-icon">&#10003;</span>${matchingNum}</span>  <span class="collapsed_results ${missingNum ? "" : "hideCollapse"}
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
const handleSkillsField = async (skillsContainer, isRendered2) => {
  if (skillsContainer == null) return;
  const skillsElement = checkSkillsType(skillsContainer);
  if (skillsElement === null) {
    createStringElement("No Skills Element Found", "skills");
  } else {
    const renderState = renderSkills(skillsElement);
    if (renderState) isRendered2.skills = true;
  }
};
const createSourceElementProxy = (initialState) => {
  let renderStateProxyHandler = {
    set: function(_target, prop, value) {
      if (!(prop in _target)) {
        throw new Error(
          `Error: not an existing property on proxy target: ${prop}`
        );
      }
      initialState[prop] = value;
      if (!isRendered[prop]) {
        switch (prop) {
          case "title":
          case "company":
          case "location":
            handleSimpleFields(value, prop, isRendered);
            break;
          case "skills":
            handleSkillsField(value, isRendered);
            break;
          case "languages":
            handleLanguagesField(value, isRendered);
            break;
        }
      }
      return true;
    }
  };
  return new Proxy(initialState, renderStateProxyHandler);
};
let sidebarListenerExists = false;
const sidebarListener = (stateObjectProxy, isRendered2) => {
  const handleClick = (event) => {
    const target = event.target;
    const jobElement = target.closest(".scaffold-layout__list-item");
    if (jobElement) {
      console.log("clearing current render");
      clearRender();
      resetStateObjects(stateObjectProxy, isRendered2);
      for (const key in stateObjectProxy) {
        isRendered2[key] = false;
        stateObjectProxy[key] = null;
      }
      handleMissingElements(stateObjectProxy);
    }
  };
  const sidebarContainer = document.querySelector(".scaffold-layout__list");
  console.log("running sidebarListener");
  if (sidebarContainer && !sidebarListenerExists) {
    sidebarContainer.addEventListener("click", handleClick);
    sidebarListenerExists = true;
  }
  if (!sidebarContainer) {
    console.log("Sidebar list container not found, retrying in 1 second");
    setTimeout(sidebarListener, 1e3);
  }
};
const runExtension = async () => {
  try {
    const sourceElement = await waitForSourceContainer(listingSelector);
    const sourceElementStateProxy = createSourceElementProxy(sourceElementState);
    if (sourceElement) {
      const panelContainer = document.getElementById("panel-wrapper");
      if (!panelContainer) {
        console.log("creating panel");
        await initialiseDisplayContainer();
      }
      sidebarListener(sourceElementStateProxy, isRendered);
      handleMissingElements(sourceElementStateProxy);
    }
  } catch (error) {
    console.log("Error:", error);
  }
};
console.log("content script loaded");
if (window.location.pathname.startsWith("/jobs/search")) {
  runExtension();
}
const handleMessage = (message, _sender, sendResponse) => {
  if (message.action == "listingPageEntered") {
    runExtension();
    sendResponse({ response: "extension running" });
  } else if (message.action === "removePanel") {
    const injectedElement = document.getElementById("panel-wrapper");
    if (injectedElement) {
      injectedElement.remove();
      sendResponse({ response: "panelRemoved" });
    } else sendResponse({ response: "no panel" });
  }
};
chrome.runtime.onMessage.addListener(handleMessage);
