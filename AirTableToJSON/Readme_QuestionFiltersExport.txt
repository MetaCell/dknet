Readme for Question/Filters extraction

This app uses an export of the data from an Airtable with all of the questions, responses, and relevant data on each repository. 

This airtable will help evaluate and further hone the filters and questions used in the app.
There are the following rules.
    1) The first two entries will be considered as requirements i.e. mandatory
    2) If the question field is empty this will be considered as a filter only
    3) Multiple answers are separated by a semi-colon

The JSON output has the following fields...
    code: The repository field to filter on
    label: The string to use
    question: The question to use in the filtering assistant
    inputType: The type of input (e.g. Single, Multi-select, Boolean)
    options: The possible answers
        code: The value to search for
        label: The string to use for the answer
        icon: The icon to use in the filtering assistant (can be blank)

How to export
    If needed instal the node packet manager via a terminal
    'npm install -g npm@9.6.4'

    Then move to the directory you want and type
    'npm install request'

    You should be able to then run the script with
    'node QuestionFilters_AirTableConversionToJSON.js'

NB You will also need a personal token
To use a PAT to authenticate your requests, follow these steps:
    1) Generate a new PAT in your Airtable account settings. 
        To do this, go to your Account settings in Airtable, click on the "API" tab, and click the "Generate API key" button next to "Personal API key". 
    2) Give the key a name and click "Generate".
    3) In line 31 of the code replace the phrase 'Insert your Personal Access Token here' with your personal access token.

