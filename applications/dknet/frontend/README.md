# Frontend React Application for dkNET repository filter

## the application

A big parts of the application will be dynamically rendered based on the files in the resource folder
the filter-schema.json file describes the structure of the filter and repository entities

### sample files
in the resource folder there is an example json with repositories and an example json with filters.
the repositories json is self explaining and refers to the filters.json (optionCodes and filterCode)

### explanation of resources/filters.json 

when a filter from the filter.json file contains 
* a question then show it on the assistent page
* a label then show it on the filter (results page as filter)

if a filter has a label (thus shown on the results page) and the inputType == "SINGLE" then show it as a switch
the first option of the filter will be the "on" state, the second option will be the "off" state

all filters will be shown in the same order as they are configured in the filters.json (so first filter in the filter.json will be on top)

if a filter option has an icon then show the icon behind the filter option label text. all icons can be found here: https://fonts.google.com/icons
the value of the Icon attribute will be the name of the icon from the font
