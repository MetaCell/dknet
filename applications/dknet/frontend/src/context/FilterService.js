// Description: This file is used to get the repositories from Airtable and save them to a JSON file.
import axios from 'axios';

export default async function getFilters() {
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

  let filters = [];

  // Make a GET request to the Airtable API for the filters
  filters = await axios.request({ url: url, method: 'get', headers: headers }).catch((error) =>
  {
    console.error(error);
    return;
  })
    .then((response) => {
    // Parse the response JSON
    // const data = JSON.parse(body);

      // Map the records array to a new array of objects with only the fields data
      filters = response.data.records.map((record) =>
      {
        const fields = record.fields;
        // Split the answers string into an array if it's not undefined
        let inputOptionsArray = fields['InputOptions'] ? fields['InputOptions'].split(';'):[];
        let InputIconsArray = fields['InputIcons'] ? fields['InputIcons'].split(';'):[];
        let InputColorsArray = fields['InputColors'] ? fields['InputColors'].split(';'):[];
        let InputWeightsArray = fields['InputWeights'] ? fields['InputWeights'].split(';'):[];
        let answers = [];
        if (inputOptionsArray.length > 0){
          inputOptionsArray.forEach((inputOption,index) =>
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
        }
        // Rename or re-word fields as necessary
        return {
          'code': fields['Code (Filter Name)'],
          'label': fields['Label (Filter Name)'],
          'question': fields['User question'],
          'questionTitle': fields['Question title'],
          'questionSubtitle': fields['Question subtitle'],
          'resultText': fields['Result text'],
          'description': fields['Help text'], // check if this is tooltip or description
          'inputType':
            fields['InputType'],
          //'enum': ["SINGLE","MULTI","BOOLEAN","READONLY"],
          //'enumNames': ["Single select","Multi select","Boolean", "Read only"],
          'weighting': fields['Weighting'], // This is the weighting for the filter as a whole
          'options': answers,
          'cardText': fields['Card Text'],
        };
      });
      return filters;
    });
  return filters;
}
