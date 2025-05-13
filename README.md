# Change - Nonprofit Donation

## Methodology
First, I decided to do some research into why a company might donate to a nonprofit. Before I started to program the features, I narrowed a few key assumptions I make from the research I conducted:

* Companies may want nonprofits that <u>**support their mission**</u>

* From a marketing perspective, companies are attempting to <u>**build their social image**</u>, so their decision may be based on **current news**

* A company may be looking for a <u>**specific tax credit**</u> or benefit

From this information, I decided to create a tool that utilizes AI to match your company's mission and goals from the search engine and output a nonprofit that best matches with your interests, which is why I decided to implement a location and industry based option. There is also a goals/causes text box where you can input all the information you want to be utilized in making the decision to select the nonprofit.

For this, I also researched what other competitors were out there, which is where I found Charity Navigator. I took inspiration from existing nonprofit recommender systems and found that I wanted to combine their use of a search feature with my own feature of using AI to analyze the choice. The idea was to provide a detailed report on why it would benefit the company to choose each specific nonprofit with statistics like a percentage match and some detailed graphics.

I utilized Change's Existing Documentation of getting all the nonprofits and used the existing API documentation I found. 

## Objective
To provide your company with the best nonprofit it should donate to based on <u>YOUR</u> goals. This recommender system utilizes GeminiAPI to create a prompt and generate the best nonprofit that matches your interests

## Setup & Execution
1. Download the ZIP file:  

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
5. Open the link that pops up `https:localhost:XXXX` and navigate to this link in your browser of choice

6. Enter `Company Name`, `Industry`, `Location`, and `Causes/Missions` you would like to contribute to

7. Click `Generate Recommendation`. The following results should show up.

![Shown is what the webpage of the recommender system should look like.](/images/webpage.png "Webpage Sample Image.")

8. Search the given recommendation in the Nonprofit Search Engine (This is where the Change API is utilized)

![Shown is what the search results page of the recommender system should look like.](/images/search_result.png "Search Result Image.")


## Future Iterations

1. **Security Improvement**: My first priority would be to actually make the application secure as the API keys can be easily accessible through Dev Tools, even though it is hidden in a .env file. However, due to time constraints, I wasn't able to actually focus on the security aspect of the application as the app currently has basic functionality for production purposes, but would not be able to be deployed.

2. **Nonprofit Selector**: This is the biggest thing I would like to improve on if I worked on this project. I had ideas to implement manual algorithms combined with AI, but I didn't have the time to fully flesh out this idea. In my head, the idea was use AI to generate the report and breakdown rather than completely make the decision for you. It would have been fun to experiment by using ML or Natural Language Processing to parse the text of the user. Then, you could actually weight the options and determine the best match algorithmically by maybe using a Decision Tree or some sort of Scoring based algorithm. You can also see that I tried to use OpenAI API, but I maxxed the quota, so I would love to use a better model. Right now, the model is Gemini-2.0-Flash, which I think can be improved upon.

3. **Front-End**: I would probably design this with a much more user-friendly design in mind, but that would probably be something I work towards at the end once the app is fully functional