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

// if(process.argv.length !== 3) {
//   console.log(`USAGE: node ${process.argv[1]} <PAT>`);
//   exit(1);
// }

const resourcesFolder = '../applications/dknet/frontend/src/resources'
// const fileName = `${resourcesFolder}/filters.json`
const fileName = `filters.json`

// Set up Airtable API credentials
const baseId = 'appwLXKayeTSQdcyL';
const tableName = 'tblCnjmhIzfP9sLtd';
const pat = 'patof2ndlJELB9zEl.76eb0386f6f9e00230a330dcdc6960b846c0f5e7322d66d3912a4f45b7b3d583'
// const pat = process.argv[2];

// Set up Airtable API endpoint URL
const url = `https://api.airtable.com/v0/${baseId}/${tableName}?sortField=FilterOrder&sortDirection=asc`;
// Set up request headers with API key
const headers = {
  'Authorization': `Bearer ${pat}`,
  'Content-Type': 'application/json'
};

// Make a GET request to the Airtable API for the filters
request.get({ url: url, headers: headers }, function (error, response, body)
{
  if (error)
  {
    console.error(error);
    return;
  }

  // Parse the response JSON
  const data = JSON.parse(body);

  // Extract the records array from the response
  const records = data.records;

  // Map the records array to a new array of objects with only the fields data
  const filters = data.records.map(function (record)
  {
    const fields = record.fields;
    // Split the answers string into an array if it's not undefined
    let inputOptionsArray = fields['InputOptions'] ? fields['InputOptions'].split(';'):[];
    let InputIconsArray = fields['InputIcons'] ? fields['InputIcons'].split(';'):[];
    let InputColorsArray = fields['InputColors'] ? fields['InputColors'].split(';'):[];
    let InputWeightsArray = fields['InputWeights'] ? fields['InputWeights'].split(';'):[];
    let answers = [];
    if (inputOptionsArray.length > 0){
      inputOptionsArray.forEach(function(inputOption,index)
      {
        const code = inputOption.toLowerCase().replace(/\s+/g, '-');
        const icon = InputIconsArray[index] || '';
        const colors = InputColorsArray[index] || '';
        const weighting = Number(InputWeightsArray[index]) || 1;
        answers.push({
          'code': code,
          'label': inputOption,
          'icon': icon.replace(/\s+/g, ''),
          'color': colors,
          'weighting': weighting
        });
      });
      };
  // Rename or re-word fields as necessary
  return {
    'code': fields['Code (Filter Name)'],
        'label': fields['Label (Filter Name)'],
        'question': fields['User question'],
        'resultText': fields['Result text'],
        'description': fields['Help text'], // check if this is tooltip or description
        'inputType':
            fields['InputType'],
            //'enum': ["SINGLE","MULTI","BOOLEAN","READONLY"],
            //'enumNames': ["Single select","Multi select","Boolean", "Read only"],
        'weighting': fields['Weighting'], // This is the weighting for the filter as a whole
        'options': answers
    };
});

// Write the data to a JSON file
  fs.writeFile(fileName, JSON.stringify(filters, null, 3), function (err) {
    if (err) {
      console.error(err);
      return;
    }
    console.log(`Data saved to ${fileName} `)
  });
});
