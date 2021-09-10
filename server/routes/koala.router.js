const express = require('express');
const koalaRouter = express.Router();

// DB CONNECTION
const pg = require('pg');
const pool = new pg.Pool({
    database: 'koalas', //name of database to connect to 
    host: 'localhost', //where is the database running? 
    port: '5432',
    max: 10, //max number of connection in a pool
    idleTimeoutMillis: 30000, //30 seconds before time out 
});

pool.on('connect', () => {
    console.log('pg connected');
});

pool.on('error', (error) => {
    console.log('unable to connect to postgres', error)
});


// GET



// POST
router.post('/', (req, res) => {
    console.log(`SERVER SIDE POST`, req.body);
    const newKoala = req.body;
    const queryText = `
        INSERT INTO "koalas" ("name", "gender","age","ready_to_transfer", "notes")
        VALUES ($1,$2,$3,$4,$5)
    `;
    pool.query(queryText, [
        newKoala.name, //$1
        newKoala.gender, //$2
        newKoala.age, //$3
        newKoala.readyForTransfer, //$4
        newKoala.notes, //$5
    ]).then((result) => {
        res.sendStatus(200);
    }).catch((error) => {
        res.sendStatus(500);
    });
});

// PUT


// DELETE

module.exports = koalaRouter;