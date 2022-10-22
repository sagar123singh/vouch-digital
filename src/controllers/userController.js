const userSchema= require('../models/userModel')
const mongoose=require('mongoose')
const jwt=require('jsonwebtoken')


const register = async (req, res) => {
    try {
        const data = req.body;

        const requiredFields = ['fullName','email', 'phone', 'password'];
        for (let i = 0; i < requiredFields.length; i++) {
            if (data[requiredFields[i]] === undefined) {
                return res.status(400).send({ status: false, message: `${requiredFields[i]} field is required` });
            }
            else if (data[requiredFields[i]] === "null" || data[requiredFields[i]] == '') {
                return res.status(400).send({ status: false, message: ` Please enter valid data` });
            }
        }

        if (!(/^\w+([\.-]?\w+)@\w+([\. -]?\w+)(\.\w{2,3})+$/).test(data.email.trim())) {
            return res.status(400).send({ status: false, message: 'Enter a valid Email Id' });
        }

        let isDuplicateEmail = await userSchema.findOne({ email: data.email })
        if (isDuplicateEmail) {
            return res.status(400).send({ status: false, msg: "email already exists" })
        }


        if (!(/^[6789]\d{9}$/).test(data.phone)) {
            return res.status(400).send({ status: false, message: 'The mobile number must be 10 digits and should be only Indian number' });
        }

        let duplicateMobile = await userSchema.findOne({ phone: data.phone })
        if (duplicateMobile) {
            return res.status(400).send({ status: false, msg: "mobile number already exists" })
        }
        if (!(data.password.length > 8 && data.password.length <= 15)) {
            return res.status(400).send({status: false,message: 'Minimum password should be 8 and maximum will be 15'});
        }
        
        const dataRes = await userSchema.create(data);
        console.log(dataRes)
        return res.status(201).send({ status: true, message: "User created successfully", data: dataRes });

        
    } catch (err) {
        res.status(500).send({ status: false, error: err.message })
    }
}
module.exports.register=register

const login = async (req, res) => {
    try {
        const data = req.body;
        const { email, password } = data;

        if (Object.keys(data).length == 0) {return res.status(400).send({status: false,message: 'Email and Password fields are required'});
        }

        if (email===undefined || email.trim() == '') {
            return res.status(400).send({status: false,message: 'Email field is required ' });
        }

        if (password===undefined|| password.trim() == '') {
             return res.status(400).send({status: false,message: 'Password field is required '});
        }

        if (!(/^\w+([\.-]?\w+)@\w+([\. -]?\w+)(\.\w{2,3})+$/).test(data.email.trim())) {
            return res.status(400).send({ status: false, message: 'Enter a valid Email Id' });
        }
    

         

      let user = await userSchema.findOne({ email, password });
      if (!user){
        res.status(400).send({ status: false, msg: "invalid login credentials" });
        return
    }

            // creating JWT
            const userID=user._id
            const payLoad= {userID};
            const secretKey = "vouchDigital";
            const token = jwt.sign(payLoad, secretKey, { expiresIn: "20hr" })

            res.header(token,"x-auth-token")

            res.status(200).send({ status: true, message: " user login successful", data: { userId: payLoad.userId, token: token } })

            
    } catch (err) {
        return res.status(500).send({status: false,error: err.message});
    }
}


module.exports.login=login