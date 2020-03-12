const {google} = require('googleapis');
const spreadsheetId = '1dG_Bxm2UfnpMCvtbscuY-NnvNnOQ7izLzPvFstXyPiM'
const sheets = google.sheets('v4');
const credentials = require('./credentials.json');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();


app.use(bodyParser.json())
app.use(cors())

const auth = new google.auth.JWT (
    credentials.client_email,
    null,
    credentials.private_key,
    ['https://www.googleapis.com/auth/spreadsheets'],
    null
)

google.options({auth})

app.get('/all', (req, res) => {
    sheets.spreadsheets.values.get({
        spreadsheetId,
        range: 'Sheet1',  
    }, (err, response) => {
        if(err) {
            console.log(err);
        } else {
            
            console.log(response.data.values.map(([text, key, checked]) => ({text, key, checked})))
        }
    });
})

app.post('/data', (req, res) => {
    console.log(req.body)
    sheets.spreadsheets.values.append({
        spreadsheetId,
        range: `Sheet1`,
        valueInputOption: 'USER_ENTERED',
        includeValuesInResponse: true,
        resource: {
            values: [[req.body.task.text, req.body.task.key, req.body.task.checked]]
        }
    }, (err, response) => {
        if(err) {
            console.log(err);
        } else {
            res.send(response.data.updates)
        }
    });
})

app.delete('/data/:key', (req, res) => {
    let row = req.params.key
    sheets.spreadsheets.values.clear({
        spreadsheetId,
        range: `${row}:${row}`,
    },  (err, response) => {
        if(err) {
            console.log(err);
        } else {
            res.send(response.data.updates)
        }
    });
})

app.listen(3001)

