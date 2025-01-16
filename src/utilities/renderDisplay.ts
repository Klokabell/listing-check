import { DisplayResultsProps } from "../types/types";

export const renderDisplay = (data: DisplayResultsProps) => {
  console.log("data", data);
  let container = document.getElementById("extracted-job-data");
  if (!container) {
    container = document.createElement("div");
    container.id = "extracted-job-data";
    document.body.appendChild(container);
  }
  if (!data) return "no data to display";
  const title = data.title ?? "N/A";
  const company = data.company ?? "Unknown Company";
  const languages = data.languages;
  return ` 
   <style>
    #my-extension-data {
      padding: 10px;
      background-color:rgb(36, 36, 36);
      border-radius: 5px;
      top: 0px;
      right: 0px;
      width: 15%;
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
  </style>
    <div id="my-extension-data">
      <h3 class="ext-listing"><span>Job Title:</span> ${title}</h3>
      <h3 class="ext-listing"><span>Company:</span> ${company}</h3>
      <p class="ext-listing"><span>Languages:</span> ${languages}</p>
    </div>
    `;
};
