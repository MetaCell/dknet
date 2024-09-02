// Description: This file is used to get the repositories from Airtable and save them to a JSON file.
import axios from 'axios';

export default async function getRepositories() {
  // Set up Airtable API credentials
  const baseId = 'appwLXKayeTSQdcyL';
  const tableName = 'tbluLCfLFLZ6sP0y1';
  const pat = 'patof2ndlJELB9zEl.76eb0386f6f9e00230a330dcdc6960b846c0f5e7322d66d3912a4f45b7b3d583'

  // Set up Airtable API endpoint URL
  const url = `https://api.airtable.com/v0/${baseId}/${tableName}`;

  // Set up request headers with API key
  const headers = {
    'Authorization': `Bearer ${pat}`,
    'Content-Type': 'application/json'
  };

  // Define an empty array for repositories
  let repositories = [];

  const questions_list = [
    'q1',
    'q2',
    'q3',
    'q4',
    'q5',
    'q6',
    'q7',
    'q8',
    'q9',
    'q10',
    'q11',
    'acc (from Questions / Responses)',
    'HumanSubjectQuestion',
    'qContact (from Questions / Responses)',
  ];

  // Make a GET request to the Airtable API for the filters
  repositories = await axios.request({ url: url, method: 'get', headers: headers }).catch((error) =>
  {
    console.error(error);
    return;
  })
    .then((response) => {

      // Parse the response JSON
      //   const data = JSON.parse(body);

      // Map the records array to a new array of objects with only the fields data
      repositories = response.data.records.map((record) =>
      {
        const fields = record.fields;
        // Build metadata with the code, label, icon, and colour

        // Name of Repo
        let codename = '';
        let labelname = '';
        if (typeof fields['resourceName'] === 'string'){
          console.log(fields['resourceName'])
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
        for (const prefix of questions_list) {
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
            inputList.forEach((option, _index) => {
              const code = option.trim().toLowerCase().replace(/\s+/g, '-');
              if (code) {
                prefixAttributesList.push(code)
              }
            });
          }
          // FilterCode=fields[`${prefix}`]
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
      return repositories;
    });
  return repositories;
}
