
const db=require('../models')

const User=db.user;
const Book=db.book;

const {Sequelize,Op,QueryTypes}=require('sequelize')


const getUsers=async(req,res)=>{
    try{
        const data=await User.findAll({ });
        res.status(200).json({data:data});
    } catch(e){
        res.status(500)
    }
    
}

const addUser=async(req,res)=>{
    try{
        var addfirstName=req.body.firstName;
        var addlastName=req.body.lastName;
        var addemail=req.body.email;
        var addbook_id=req.body.book_id;
        const data=await User.create({
            firstName:addfirstName,
            lastName:addlastName,
            email:addemail,
            book_id:addbook_id,
        });
        res.status(200).json({data:data});
        
    } catch(e){
        let message;
        e.errors.forEach(error=>{
            switch(error.validatorKey){
                case 'isEmail':
                    message='unvalid email'
                    break;
            }
        })
        res.status(200).json({message:message});
    }
    
}

const updateUser=async(req,res)=>{
    try{
        var updatedData=req.body;
        const data=await User.update({updatedData},{
            where:{
                id:req.params.id
            }
        });
        console.log(updatedData)
        res.status(200).json({data:data});
    }
    catch(e){
        let message;
        e.errors.forEach(error=>{
            switch(error.validatorKey){
                case 'isEmail':
                    message='unvalid email'
                    break;
            }
        })
        res.status(200).json({message:message});
    }
}

const deleteUser=async(req,res)=>{
    try{
        const data=await User.destroy({
            where:{
                id:req.params.id
            }
        });
        res.status(200).json({data:data});
    } catch (e){
        res.status(500)
    }
}

const getUserBook=async(req,res)=>{
    try
    {const data=await User.findAll({
                        attibutes:["firstName","lastName"],
                        include:[{
                            model:Book,
                            attibutes:["bookName"]
                        }],
                        where:{id:req.params.id}
                    })
    res.status(200).json({data:data})}
    catch(e){
        res.status(500)
    }
}

module.exports={
    getUsers,
    addUser,
    updateUser,
    deleteUser,

    getUserBook
}