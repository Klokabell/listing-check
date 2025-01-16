# LinkedIn Job Summariser Extension

This is a solo project to build a simple extension that can evaluate job listings on the LinkedIn job's page and extract the necessary information regarding the role without having to read through the entire text. 


## Overview
I was tired of reading endless job descriptions on LinkedIn, getting through the text only to find out my profile didn't match for some key reason. To save time I built this early prototype of a Chrome extension (also my first ever extension) in order to gather all the values I would need regarding the job and whether I should read the description fully or simply move on to the next listing. 


## Instructions
1. Download the project, extract (if necessary) and store it somewhere suitable.
2. Open Chrome, click the extensions button in the top right and choose "Manage Extensions"
3. In the "chrome://extensions/" page select "Load Unpacked" in the top left.
4. In the popup window find the downloaded project folder, navigate to the dist folder and select it.
5. The extension only runs on the linkedin jobs domain and should appear in the top right as a fixed element. 


## Current Features
This initial, very basic, iteration only contains the means to select the job title, company name and extract any sentence containing the term "English" for display.

## Future Plans
As the project progresses the aim is to add:
 - listed skill requirements
 - education level requirement
 - user profile creation 
   - receive user input to determine the values searchd for in each category
   - they will also be able provide their personal own values to compare with the listing's

With more, less concrete concepts being considered when the existing extension is more fleshed out.
