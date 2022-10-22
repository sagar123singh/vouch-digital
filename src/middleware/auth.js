
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const userController= require('../controllers/userController')

const isValidObjectId = (ObjectId) => {
    return mongoose.Types.ObjectId.isValid(ObjectId)

}

const authenticate = function (req, res, next) {
    try {

        const token = req.headers["x-auth-token"];
        if (!token) return res.status(404).send({ status: false, msg: "token must be present" });
        


        let decodedToken = jwt.verify(token, "vouchDigital");
        if (!decodedToken) return res.status(400).send({ status: false, msg: "invalid token" })
        req.decodedToken = decodedToken
         next()
    }
    catch (err) {
        res.status(500).send({ status: false, error: err.message })
    }
}

module.exports.authenticate = authenticate