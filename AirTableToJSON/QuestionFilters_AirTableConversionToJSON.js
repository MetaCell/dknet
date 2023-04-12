/**
 * This script fetches data from an Airtable table using the Airtable API,
 * processes the data, and saves it to a JSON file. The script uses the
 * `request` module to make a GET request to the Airtable API, and then
 * extracts the relevant data from the response. The data is then transformed
 * into a new data structure that is more suitable for use in an application.
 *
 * Parameters:
 * - `baseId`: string - the ID of the Airtable base to query
 * - `tableName`: string - the name of the table in the Airtable base to query
 * - `pat`: string - the Personal Access Token to use for authentication
 *
 * Returns:
 * None
 * 
 * Outputs:
 * file: filters.json
 *
 * Example usage:
 * ```
 * node QuestionFilters_AirTableCoversionToJSON.js
 * ```
 */

const fs = require('fs');
const { exit } = require('process');
const request = require('request');

if(process.argv.length !== 3) {
  console.log(`USAGE: node ${process.argv[1]} <PAT>`);
  exit(1);
}

// Set up Airtable API credentials
const baseId = 'app8GwPKlzcZUj3lo';
const tableName = 'tblsgKKi5vQSBV5kW';
const pat = process.argv[2];

// Set up Airtable API endpoint URL
const url = `https://api.airtable.com/v0/${baseId}/${tableName}?sortField=FilterOrder&sortDirection=asc`;
// Set up request headers with API key
const headers = {
  'Authorization': `Bearer ${pat}`,
  'Content-Type': 'application/json'
};

// Make a GET request to the Airtable API
request.get({ url: url, headers: headers }, function (error, response, body) {
  if (error) {
    console.error(error);
    return;
  }

  // Parse the response JSON
  const data = JSON.parse(body);

  // Extract the records array from the response
  const records = data.records;

  // Map the records array to a new array of objects with only the fields data
  const dataToSave = data.records.map(function (record) {
    const fields = record.fields;
    console.log('Working hard')
    
    // Split the answers string into an array if it's not undefined
    let inputOptionsArray = fields['InputOptions'] ? fields['InputOptions'].split(';'):[];
    let InputIconsArray = fields['InputIcons'] ? fields['InputIcons'].split(';'):[];
    let answers = [];

    if (inputOptionsArray.length > 0){
      inputOptionsArray.forEach(function(inputOption,index){
        const code = inputOption.toLowerCase().replace(/\s+/g, '-');
        const icon = InputIconsArray[index] || '';
        answers.push({'code': code, 'label': inputOption, 'icon': icon }); 
      });               
      };
  

    // Rename or re-word fields as necessary
    return {
        'code': fields['Code (Column Name)'],
        'label': fields['Label (Name)'],
        'question': fields['User question'],
        'inputType': fields['InputType'],
        'options': answers
    };   
  });

  // Write the data to a JSON file
  fs.writeFile('filters.json', JSON.stringify(dataToSave), function (err) {
    if (err) {
      console.error(err);
      return;
    }
    console.log('Data saved to filters.json');
  });
});
