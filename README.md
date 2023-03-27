# dkNET

Dynamic form react application for researchers to select the optimal data repository to host their specific datasets based on a range of criteria/decision points.

## Airtable
This app uses an export of the data from an [Airtable](https://airtable.com/app8GwPKlzcZUj3lo/tbl1MlrNkhooEICAO/viwA2ojmLSzK6Rp9O?blocks=bipEsrvzj2eFyT1Dw) with all of the questions, responses, and relevant data on each repository. This airtable will help evaluate and further hone the question and answer choices that will be used in the questionnaire to most efficiently narrow down the data repository options for the end user. The airtable will also be used to identify any gaps (sets of answers that result in no matching data repositories).

## Frontend
The frontend will be a react app using json and json schema definitions to dynamically render the question&answer (assistant) page and the results grid with the filters

## Deployment with CloudHarnerss
see https://github.com/MetaCell/cloud-harness(https://github.com/MetaCell/cloud-harness) for more information about ClouodHarness
all ci/cd related info is stored in the dkNET cloudharness repo branch.
this is done to separate the application from it's deployment method/type
to use the CloudHarness deployment please switch to the cloudharness branch

### get the cloudharness code:
```bash
git clone https://github.com/MetaCell/cloud-harness.git
```

install the cloudharness tools
follow the instructions(https://github.com/MetaCell/cloud-harness)

### create namespace dknet
```bash
kubectl create ns dknet
```

### prepare the build and deploy
```bash
harness-deployment cloud-harness . -n dknet -e dev -dtls -i dknet
```

### deploy local with skaffold
```bash
skaffold dev --cleanup=false
```
