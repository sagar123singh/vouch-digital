const addressSchema=require('../models/addBookModel')

const createContact = async (req, res) => {
    try {
        const data = req.body;

        const requiredFields = ['name','phone', 'city', 'pinCode'];
        for (let i = 0; i < requiredFields.length; i++) {
            if (data[requiredFields[i]] === undefined) {
                return res.status(400).send({ status: false, message: `${requiredFields[i]} field is required` });
            }
            else if (data[requiredFields[i]] === "null" || data[requiredFields[i]] == '') {
                return res.status(400).send({ status: false, message: ` Please enter valid data` });
            }
        }

        if (!(/^[6789]\d{9}$/).test(data.phone)) {
            return res.status(400).send({ status: false, message: 'The mobile number must be 10 digits and should be only Indian number' });
        }


        if (!(/^\d{6}$/).test(data['pinCode'])) {
            return res.status(400).send({ status: false, message: 'Enter the valid Pincode of pincode' });
        }

        

        let duplicateMobile = await addressSchema.findOne({ phone: data.phone })
        if (duplicateMobile) {
            return res.status(400).send({ status: false, msg: "mobile number already exists" })
        }
       
        
        const dataRes = await addressSchema.create(data);
        console.log(dataRes)
        return res.status(201).send({ status: true, data: dataRes });

        
    } catch (err) {
        res.status(500).send({ status: false, error: err.message })
    }
}

const getContactDetail=async function (req,res){
    try{
        const name = req.query.name;
        const details = await addressSchema.find({ name: name,isDeleted:false});
        if (!details) {
            return res.status(404).send({ status: false,message: 'contact details is not available'});
        }
        return res.status(200).send({status: true, message: 'contact details', data: details});
    }catch (err) {
        return res.status(500).send({status: false,error: err.message});
    }
    
}


const getAllContactDetail=async function (req,res){
    try{
        
        const details = await addressSchema.find({ isDeleted:false});
        if (!details) {
            return res.status(404).send({ status: false,message: 'address book is empty'});
        }
        return res.status(200).send({status: true, message: 'contact details', data: details});
    }catch (err) {
        return res.status(500).send({status: false,error: err.message});
    }
    
}



const getAllContactDetailManual=async function (req,res){
    try{
        
        const details = await addressSchema.find({ isDeleted:false}).limit(2);
        if (!details) {
            return res.status(404).send({ status: false,message: 'address book is empty'});
        }
        return res.status(200).send({status: true, message: 'contact details', data: details});
    }catch (err) {
        return res.status(500).send({status: false,error: err.message});
    }
    
}


const updateContact=async function (req,res){
    try{
        const name = req.query.name;
        const body=req.body

        if(name==body.name){
          
        const details = await addressSchema.find({ name: name,isDeleted:false});
        if (!details) {
            return res.status(404).send({ status: false,message: 'contact details is not available'});
        }

        const updateCont = await addressSchema.findOneAndUpdate(name, body, { new: true });
        return res.status(200).send({status: true, message: 'contact details', data: updateCont});
    }
    else{
        return res.status(400).send({status: false,msg:"query and body name should be same"});
    }
    }catch (err) {
        return res.status(500).send({status: false,error: err.message});
    }
    
}


const deleteContact=async function (req,res){
    try{
        const name = req.query.name;
        
        const details = await addressSchema.find({ name: name,isDeleted:false});
        if (!details) {
            return res.status(404).send({ status: false,message: 'contact details is not available'});
        }

        const updateCont = await addressSchema.findOneAndUpdate({name,isDeleted:false },{isDeleted:true},{ new: true });
        return res.status(200).send({status: true, message: 'deleted contact details successfully'});
       
    }catch (err) {
        return res.status(500).send({status: false,error: err.message});
    }
    
}
module.exports.createContact=createContact
module.exports.getContactDetail=getContactDetail
module.exports.getAllContactDetail=getAllContactDetail
module.exports.getAllContactDetailManual=getAllContactDetailManual
module.exports.updateContact=updateContact
module.exports.deleteContact=deleteContact