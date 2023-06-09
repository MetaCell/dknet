const fs = require('fs');
const { exit } = require('process');
const request = require('request');

if(process.argv.length !== 3) {
  console.log(`USAGE: node ${process.argv[1]} <PAT>`);
  exit(1);
}

const resourcesFolder = '../applications/dknet/frontend/src/resources'
const fileName = `${resourcesFolder}/repositories.json`
 
// Set up Airtable API credentials
const baseId = 'app8GwPKlzcZUj3lo';
const tableName = 'tblaJilQIzivkkeiF';
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
  'DataType',
  'DomainList',
  'qSize (from Questions / Responses)',
  'Funding Sources Supported',
  'Citation Support',
  'Versioning Supported',
  'acc (from Questions / Responses)',
  'qCost (from Questions / Responses)',
  'HumanSubjectQuestion',
  'PhiHippa',
  'Published',
  'PIDQuestion',
  'qContact (from Questions / Responses)',
  'SpeciesSpecificData'
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
            // Make sure it is a string
            if (typeof fields[prefix] === 'string'){
              inputList = fields[prefix] ? fields[prefix].split(';') : [];
            } else if (Array.isArray(fields[prefix])){
              inputList = fields[prefix]
              .filter((value) => value !== null)
              .map((value) => value.toString());
            }
            //Now add to the array
            let prefixAttributesList = [];
            if (inputList.length > 0) {
              inputList.forEach(function (option, index) {
                const code = option.toLowerCase().replace(/\s+/g, '-');
                prefixAttributesList.push(code)
              }); 
            }
            FilterCode=fields[`${prefix}_FilterCode`]        
            prefixAttributes[FilterCode] = prefixAttributesList;
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
  fs.writeFile(fileName, JSON.stringify(repositories, null, 5), function (err) {
  if (err) {
    console.error(err);
    return;
  }
  console.log(`Data saved to ${fileName} `)
});
});

