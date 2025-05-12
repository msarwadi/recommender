# Change - Nonprofit Donation

## Methodology
First, I decided to do some research into why a company might donate to a nonprofit. Before I started to program the features, I narrowed a few key assumptions I make from the research I conducted:

* Companies may want nonprofits that <u>**support their mission**</u>

* From a marketing perspective, companies are attempting to <u>**build their social image**</u>, so their decision may be based on **current news**

* A company may be looking for a <u>**specific tax credit**</u> or benefit

From this information, I decided to create a tool that utilizes AI to match your company's mission and goals from the search engine and output a nonprofit that best matches with your interests. 

For this, I also researched what other competitors were out there, which is where I found Charity Navigator. I took inspiration from existing nonprofit recommender systems and found that I wanted to combine their use of a search feature with my own feature of using AI to analyze the choice. The idea was to provide a detailed report on why it would benefit the company to choose each specific nonprofit with statistics like a percentage match and some detailed graphics.

I utilized Change's Existing Documentation of getting all the nonprofits and used the existing API documentation I found. 

## Objective
After inputting your company name and 

## Setup & Execution
1. Download the ZIP file:  
   ```
   bash
   git clone https://github.com/msarwadi/recommender.git
   cd recommender
   ```
2. Enter the directory where the local files exist
   ```
   cd recommender
   ```
3. Install dependencies:  
   ```
   npm install
   ```
4. Run the app:
   ```
   npm run dev
   ```
5. Open the link that pops up (https:localhost:XXXX) and navigate to this link in your browser of choice
6. Enter **Company Name**, **Industry**, **Location**, and **Causes/Missions** you would like to contribute
7. Click '''Generate Recommendation'''
8. Search the given recommendation in the Nonprofit Search Engine
