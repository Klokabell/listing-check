# LinkedIn Job Listing Check Chrome Extension


## In Brief
A chrome extension that parses job listings on LinkedIn and extracts the key pieces of information about the role.
<br>
<br>
## Languages & Tools
### Languages
Bootstrapped with Vite <br>
TypeScript

### Packages
franc <br>
langs 

<br>


## Overview
When active, it will run on LinkedIn.com's job postings and extract information regarding title, location, company, skills required, and outline any language requirements of the job (provided it is written in English) of the selected position. 
It runs entirely within the browser, no data is collected or stored, no sign in information is currently utilised. A service worker is used to process the language check in order to prevent blocking. 
The values are extracted from the corresponding elements in the display and placed inside a container element inserted in the top right of the screen, styled as an accordion.  
Sometimes the LinkedIn skills component will either not render or will have no values within it, in which case the container's skills value will be empty.

> LinkedIn has seemingly removed the listed skills component from the elements, so currently this field is unavailable

<br>

## Setup

First download the zip from the repo, currently only the development build exists (feel free to make changes/improvements) and extract to to wherever you choose.
Then open the chrome menu -> select "Extensions" from the dropdown -> click "Manage Extensions"
<br>
<img width="260" height="300" alt="Manage Extensions Screen" src="https://github.com/user-attachments/assets/5022a4be-dfea-43b5-b789-ad51607da0ce" />

<br>
 
Inside the "Manage Extensions Menu" select "Load Unpacked" from the top left and find the folder with the extracted zip file. Select the "dist" folder of the extracted file
<br>

<img width="320" height="300" alt="Selecting Load Unpacked" src="https://github.com/user-attachments/assets/08c9f6b8-84e9-44ed-9899-92505d767b05" />

> ### For Developers
>
>  Access the project using whatever IDE you use, type "npm run build" into the terminal from the root folder and then go nuts

<br>

## Troubleshooting

- Most issues are resolved by refreshing the tab. If that doesn't work, close any linkedin tabs and then go in through the landing page again. 
- The extension triggers on LinkedIn.com and its subdomains but sometimes doesn't activate for the initial job listing if you go straight into the "https://www.linkedin.com/jobs/search/" url
- Only have one tab running the jobs endpoint at a time, more than one causes issues with communication to the service worker

## Screenshots

<br>

The extension closed

<img width="600" height="500" src="https://github.com/user-attachments/assets/01c2e705-5e8d-42e8-b513-45b4f8b7d1ca" />

<br>
<br>
<br>

The extension opened

<img width="600" height="500"  src="https://github.com/user-attachments/assets/89b4bf08-4b84-474a-a8fa-b3013421f967" />

<br>
<br>
<br>

Open and zoomed in

<img width="382" height="632" alt="extension open zoomed jpg " src="https://github.com/user-attachments/assets/dd4a6df9-a58b-47ea-9a7e-c30c718ebf62" />



