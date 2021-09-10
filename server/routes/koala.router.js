const { Router, query } = require('express');
const express = require('express');
const koalaRouter = express.Router();

// DB CONNECTION


// GET anwar


// POST franck


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