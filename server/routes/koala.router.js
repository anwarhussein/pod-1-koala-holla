const { Router, query } = require('express');
const express = require('express');
const koalaRouter = express.Router();

// DB CONNECTION
const pg = require('pg');
const pool = new pg.Pool({
    database: 'jazzy_sql', //name of database to connect to 
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
koalaRouter.post('/', (req, res) => {
    const newKoala = req.body;
    const queryText = `
        INSERT INTO "koalas" ("name", "gender","age","ready_to_transfer", "notes")
        VALUES ($1,$2,$3,$4,$5)
    `;
    pool.query(queryText, [
        newKoala.name, //$1
        newKoala.gender, //$2
        newKoala.age, //$3
        newKoala.ready_to_transfer, //$4
        newKoala.notes, //$5
    ]).then((result) => {
        res.sendStatus(200);
    }).catch((error) => {
        res.sendStatus(500);
    });
});

// PUT phaydara
/**
 * @api {put} /:id ready to transer true
 * @apiDescription set the ready to transfer to true
 * based on id that matches.
 * 
 * @apiParam {number} id, the id of the koala to transfer
 */
 koalaRouter.put('/:id', (req, res) => {
    console.log(req.params);
    const koalaId = req.params.id;
    const queryKoala = `UPDATE FROM "koalas" 
                            SET "ready_to_transfer" = TRUE 
                            WHERE "ready_to_transfer" = FALSE;`;
    pool.query(queryKoala, [koalaId]).then((result) => {
        res,sendStatus(200);
    }).catch((error) => {
        console.log('error PUT /koalas', error);
        res.sendStatus(500);  
    });   
});


// DELETE

module.exports = koalaRouter;