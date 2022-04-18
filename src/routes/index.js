const path = require("path")
const express = require("express")
const { Router } = require("express");
const Container = require("../classContainer")

const router = express.Router();

const myFile = new Container (path.join(`${__dirname}/../../public/data.json`))

router
    .route("/")
    .get(
        (req, res) => myFile.getAll().then( data => res.json(data) )
    )
    .post(
        (req, res) => {
            myFile
                .save(req.body)
                .then( data => res.json( data ) )
        }
    )

router
    .route("/:id")
    .get(
        (req, res) => {
            myFile
                .getById( req.params.id )
                .then( data => res.json(data) )
        }
    )
    .put(
        (req, res) => {
            myFile
                .updateById( req.params.id, req.body )
                .then( data => res.json(data) )
        }
    )
    .delete(
        (req, res) => {
            myFile
                .removeById( req.params.id )
                .then( data => res.json(data) )
        }
    )

module.exports = router