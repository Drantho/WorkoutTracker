// const bcrypt = require("bcrypt");
const express = require("express");
const router = express.Router();

require('dotenv').config()

function ensureAuthenticated(req, res, next) {

    if (req.session.user) {
        return next();
    }
    else {
        res.redirect("/signin")
    }

}

module.exports = router;