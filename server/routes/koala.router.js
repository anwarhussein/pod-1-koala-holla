const { Router, query } = require('express');
const express = require('express');
const koalaRouter = express.Router();

// DB CONNECTION
const pg = require('pg');
const pool = new pg.Pool({
    user:'postgres',
    password:'2353',
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
koalaRouter.get('/', (req, res) => {
    let queryText = 'SELECT * FROM "koalas";';
    pool.query(queryText).then(result => {
      // Sends back the results in an object
      res.send(result.rows);
    })
    .catch(error => {
      console.log('error getting koalas', error);
      res.sendStatus(500);
    });
  });

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
    const queryKoala = `UPDATE "koalas" 
                            SET "ready_to_transfer" = TRUE 
                            WHERE "id" = $1;`;
    pool.query(queryKoala, [koalaId]).then((result) => {
        res.sendStatus(200);
    }).catch((error) => {
        console.log('error PUT /koalas', error);
        res.sendStatus(500);  
    });   
});


// DELETE phaydara
/**
 * @api {delete} /koalas/:id deletes koala
 * @apiDescription this will delete a specific koala from the DB
 * 
 * @apiParam {number} id, the id of the koala to be deleted
 */
koalaRouter.delete('/:id', (req, res) => {
    console.log(req.params);
    const koalaId = req.params.id;
    console.log('in DELETE /koalas');
    const queryKoala = `DELETE FROM "koalas" WHERE "id" = $1;`;
    pool.query(queryKoala, [koalaId]).then((result) => {
        res.sendStatus(200);
    }).catch((error) => {
        console.log('error in DELETE /koalas', error);
        res.sendStatus(500)
    });    
});


module.exports = koalaRouter;