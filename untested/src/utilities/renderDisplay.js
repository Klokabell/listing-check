"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.renderDisplay = void 0;
const renderDisplay = (data) => {
    let container = document.getElementById("extracted-job-data");
    if (!container) {
        container = document.createElement("div");
        container.id = "extracted-job-data";
        document.body.appendChild(container);
    }
    if (!data)
        return "no data to display";
    const title = data.title ?? "N/A";
    const company = data.company ?? "Unknown Company";
    const location = data.location;
    let language;
    let displayExamples = false;
    const examples = data.languages.examples;
    if (examples[0] == "None") {
        language = `Possibly ${data.languages.language}`;
    }
    else {
        language = "English";
        displayExamples = true;
    }
    return ` 
   <style>
    #my-extension-data {
      padding: 10px;
      background-color:rgb(36, 36, 36);
      border-radius: 5px;
      top: 0px;
      right: 0px;
      width: 20%;
      font-family: Arial, sans-serif;
      position: fixed;
      z-index: 999;
    }
    

    #my-extension-data .ext-listing{
      color:rgb(141, 198, 236)
    }   
    #my-extension-data span {
      font-weight: bold;
      color:rgb(49, 130, 184)
    }
      
    #my-extension-data ul {
      font-size: 0.65em;
      list-style-position: inside;
    }
  </style>
    <div id="my-extension-data">
      <h3 class="ext-listing"><span>Job Title:</span> ${title}</h3>
      <h3 class="ext-listing"><span>Company:</span> ${company}</h3>
      <h3 class="ext-listing"><span>Languages:</span> ${language}</p>
      <h3 class="ext-listing"><span>Location:</span> ${location}</p>
      ${displayExamples
        ? `
          <h3 class="ext-listing">
          <span>Examples:</span>
          <ul>
              ${examples.map((example) => `<li>"${example}"</li>`).join("")}
          </ul>
          </h3>`
        : ""}
    </div>
    `;
};
exports.renderDisplay = renderDisplay;
