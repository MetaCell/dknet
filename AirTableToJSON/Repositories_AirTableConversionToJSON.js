/**
 * This script fetches data from an Airtable table using the Airtable API,
 * processes the data, and saves it to a JSON file. The script uses the
 * `request` module to make a GET request to the Airtable API, and then
 * extracts the relevant data from the response. The data is then transformed
 * into a new data structure that is more suitable for use in an application.
 * 
 * NB the prefixes_list contains the airtable fields we are interested in. The field names correspond to the label we want to use
 *
 * Parameters:
 * - `baseId`: string - the ID of the Airtable base to query
 * - `tableName`: string - the name of the table in the Airtable base to query
 * - `pat`: string - the Personal Access Token to use for authentication. Remember to input this as an argument in the terminal
 *
 * Returns:
 * None
 * 
 * Outputs:
 * file: repositories.json
 *
 * Example usage:
 * ```
 * node Repositories_AirTableCoversionToJSON.js PersonalAccessToken
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
const tableName = 'tblZcO1YqPXGfX6YH';
const pat = process.argv[2];

// Set up Airtable API endpoint URL
const url = `https://api.airtable.com/v0/${baseId}/${tableName}`;

// Set up request headers with API key
const headers = {
  'Authorization': `Bearer ${pat}`,
  'Content-Type': 'application/json'
};
// Define an empty array for repositories
let repositories = [];
// Preparing each Repository attribute (List of Columns)
prefixes_list = [
  'qDataTypeList (from Questions / Responses)',
  'qDomainList (from Questions / Responses)',
  'qSize (from Questions / Responses)',
  'qFundingSource (from Questions / Responses)',
  'qCitationMetadata (from Questions / Responses)',
  'qVersioning (from Questions / Responses)',
  'acc (from Questions / Responses)',
  'qCost (from Questions / Responses)',
  'qPhi (from Questions / Responses)',
  'qHIPAA (from Questions / Responses)',
  'qApplication (from Questions / Responses)',
  'qContact (from Questions / Responses)',
  'DataTypeQuestion',
  'DomainQuestion',
  'HumanSubjectQuestion',
  'PhiHippa',
  'CitationsQuestion',
  'FundingSourceQuestion',
  'qPublished (from Questions / Responses',
  'PIDQuestion'
];


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
  repositories = data.records.map(function (record) 
  {
    const fields = record.fields;
    // Build metadata with the code, label, icon, and colour

    // Name of Repo
    let codename = '';
    let labelname = '';
    if (typeof fields['resourceName'] === 'string'){
      codename = fields['resourceName'].toLowerCase().replace(/\s+/g, '-');
      labelname = fields['resourceName'];
    } else if (Array.isArray(fields['resourceName'])){
        // Define codename
        codename = fields['resourceName']
        .filter((value) => value !== null)
        .map((value) => value.toString())
        .join('-')
        .toLowerCase().replace(/\s+/g, '-');
        //Define labelname
        labelname = fields['resourceName']
        .filter((value) => value !== null)
        .map((value) => value.toString())
        .join('-');
    }

    // Create attribute to hold all attributes for all prefixes
    //const prefixAttributes = {};
    let attributes = {};
    // Loop through repo options
    let prefixAttributes = {};
    for (prefix of prefixes_list) {
            let inputList = [];
            if (typeof fields[prefix] === 'string'){
              inputList = fields[prefix] ? fields[prefix].split(';') : [];
            } else if (Array.isArray(fields[prefix])){
              inputList = fields[prefix]
              .filter((value) => value !== null)
              .map((value) => value.toString());
            }
            let prefixAttributesList = [];
            if (inputList.length > 0) {
              
              const fieldIcon = `${prefix}_icon` in fields ? fields[`${prefix}_icon`].split(';') : [];
              const fieldColor = `${prefix}_color` in fields ? fields[`${prefix}_color`].split(';') : [];
              

              inputList.forEach(function (option, index) {
                const code = option.toLowerCase().replace(/\s+/g, '-');
                const icon = `${prefix}_icon` in fields ? (fieldIcon[index] || '') : '';
                const color = `${prefix}_color` in fields ? (fieldColor[index] || 'INFO') : 'INFO';

                //prefixAttributesList.push({
                  //'code': code,
                  //'label': option,
                  //'icon': icon,
                  //'color': color
                //});
                prefixAttributesList.push(code)
              }); 
            }
        prefixAttributes[prefix] = prefixAttributesList;
    }

    // Return fields
    return {
      'code': codename,
      'label': labelname,
      'url': fields['URL'],
      'attributes': prefixAttributes
    };
  });
  // Write the data to a JSON file
  fs.writeFile('repositories.json', JSON.stringify(repositories), function (err) {
  if (err) {
    console.error(err);
    return;
  }
  console.log('Data saved to repositories.json');
  });
});

