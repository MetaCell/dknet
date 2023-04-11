const fs = require('fs');
const request = require('request');

// Set up Airtable API credentials
const baseId = 'app8GwPKlzcZUj3lo';
const tableName = 'tblsgKKi5vQSBV5kW';
const pat = 'pat8Cf0G6nFuUHfhD.08c14f434abbb756f9834b044b07665dcac155f8a16efc1b60ff6e7298a0c5f3';

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
