
var session=require('express-session')

var db=require('../models')

var User=db.user;
var Book=db.book;

var {Sequelize,Op,QueryTypes, ConnectionAcquireTimeoutError}=require('sequelize');
var { sequelize } = require('../models');
var bcrypt = require('bcrypt');

const getUsers=async(req,res)=>{
    try{
        const data=await User.findAll({ });
        res.status(200).json({data:data});
    } catch(error){
        console.log('error: ',error.message)
    }   
}

const addUser=async(req,res)=>{
    try{
        const firstName=req.body.firstName;
        const lastName=req.body.lastName;
        const email=req.body.email;
        const userId=req.body.userId;
            const data=await User.create({
                firstName:firstName,
                lastName:lastName,
                email:email,
                userId:userId
            });
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
    } catch (error){
        console.log('error: ',error.message)
    }
}

const searchUser=async(req,res)=>{
    const search=req.params.key
    console.log(search)
    try{
        const data=await User.findAll({
            where:{
                firstName:{
                    [Op.like]: `%${search}%`
                }
            } 
        })
        res.status(200).json({data:data})
    }
    catch(e){
        console.log('error: ',e.message)
    }
}

const registerUser=async(req,res)=>{
    try{
       const firstName=req.body.firstName
       const lastName=req.body.lastName
       const email=req.body.email
       const password=req.body.password
       const confirm_password=req.body.confirm_password
       const check_email=await User.findOne({
            where:{
                email:email
            }
       })
       if(check_email!=null){
        return res.render('register',{
            message:'Email is already in use'
        })
       }
       else if(password!=confirm_password){
        return res.render('register',{
            message:'Passwords donot match!'
        })
       }
       let hashedPassword=await bcrypt.hash(password,8)
       const data=await User.create({
        firstName:firstName,
        lastName:lastName,
        email:email,
        password:hashedPassword
       })
       res.render('login',{
        message:'User registered'
       })
    }
    catch(error){
        console.log('error',error.message)
    } 
}

const loginUser=async(req,res)=>{
    try{
        const user=await User.findOne({
            where:{
                email:req.body.email
            }
        })
        if(user){
            let password_valid=await bcrypt.compare(req.body.password,user.password)
            if(password_valid){
                req.session.isLoggedIn=1; 
                res.render("index",{userExits:req.session.isLoggedIn==1})
            }
            else{
                const currentDate=new Date()
                const currentTime=currentDate.getTime()
                if(user.count==3 && user.pwdTimeStamp==null){
                    user.pwdTimeStamp=currentTime+(30*60000)
                    user.save()
                    console.log("you have been blocked for 30minutes")
                    res.render("login",{
                        message:"You  have been blocked for 30 minutes"
                    })
                }
                else if(user.count==3 && currentTime>=user.pwdTimeStamp){
                    user.pwdTimeStamp=null,
                    user.count=0
                    user.save()
                    res.render("login",{
                        message:"Password not valid"
                    })
                }
                else if(user.count==3 && currentTime<user.pwdTimeStamp){
                    console.log("you have been blocked,try after 30minutes")
                    res.render("login",{
                        message:"You have been blocked,try after 30 minutes"
                    })
                }
                else{
                    user.count+=1
                    user.save()
                    res.render("login",{
                        message:"Password is not valid"
                    })
                }
            }
        }
        
    }
    catch(error){
        console.log('error',error.message)
    }
}

const forgotPassword=async(req,res)=>{
    const email=req.body.email
    const checkEmail=await User.findOne({
        where:{
            email:email
        }
    })
    if(checkEmail!=null){
        console.log("Email exists")
    }else{
        console.log("Email doesnot exists")
    }
}




module.exports={
    getUsers,
    addUser,
    updateUser,
    deleteUser,
    searchUser,

    registerUser,
    loginUser,
    forgotPassword
    // getUserBook,
    // addUserBook
    
}