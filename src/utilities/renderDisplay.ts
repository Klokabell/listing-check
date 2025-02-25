import { DisplayResultsProps } from "../types/types";

export const renderDisplay = (data: DisplayResultsProps) => {
  let container = document.getElementById("extracted-job-data");
  if (!container) {
    container = document.createElement("div");
    container.id = "extracted-job-data";
    document.body.appendChild(container);
  }
  if (!data) return "no data to display";
  const title = data.title ?? "N/A";
  const company = data.company ?? "Unknown Company";
  const location = data.location;
  const languagesObject = data.languages;
  const languages = Object.keys(languagesObject);
  console.log("languages: ", languages);

  return ` 
   <style>
    #display {
      padding: 10px;
      background-color:rgb(27, 31, 35);
      border-radius: 5px;
      top: 0px;
      right: 0px;
      width: 20%;
      font-family: Arial, sans-serif;
      position: fixed;
      z-index: 999;
    }
    


    #display h3 {
      font-weight: bold;
      color:rgb(49, 130, 184)
    }
      
    #display ul {
      font-size: 0.65em;
    }

    .result-field#language_container span{
      display: block;
    }

    .result-value{
      font-size: 1vw;
      white-space: nowrap;
      color:rgba(255, 255, 255, 0.9);
    }

    .subfieldname {
      font-size: 0.8em;
    }

    #span_examples {
      color:rgba(255, 255, 255, 0.9);
      font-size: 0.8em;
      left: -10px;
    }

    li::marker {
      font-size: 0.65em;
    }



  </style>
    <div id="display">
      <h3 class="result-field">Job Title:
          <span class="result-value">${title}</span></h3>
      <h3 class="result-field">Company:
          <span class="result-value">${company}</span></h3>
      <h3 class="result-field">Location:
          <span class="result-value">${location}</span></h3>
      <h3 class="result-field" id="language_container">Languages:
          <span class="result-value">
                ${
                  languages
                    ? languages
                        .map(
                          (languageName) => ` 
                  ${languageName}:</span>
                  <span class="subfieldname">Examples:</span>
                    ${languagesObject[languageName]
                      .map(
                        (example) =>
                          `<li id="span_examples">"${example.trim()}"</li>`
                      )
                      .join("")}
                  `
                        )
                        .join("")
                    : "Unknown Language"
                }</span>
</h3>

    </div>
    `;
};
