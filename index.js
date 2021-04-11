const express = require('express');
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const app = express();
app.use(express.json());
const port = 4837;

const adapter = new FileSync('db.json');
const db = low(adapter);

app.use(express.static('public'));

let clickCounter = 0;

app.post('/setkey', (req, res) => {
    // Set value in DB

    let json = req.body;

    let key = json["key"];
    let value = json["value"];

    db.set(key, value)
        .write();

    res.send(db.getState());
});

app.get('/getstate', (req, res) => {
    // Get value from DB

    res.json(db.getState());
});

app.get('/click', (req, res) => {
    // Set value in DB

    clickCounter++;
    db.set('clicks', clickCounter)
        .write();

    res.send(db.getState());
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});