const {Sequelize,Op,QueryTypes, ConnectionAcquireTimeoutError}=require('sequelize');
const { sequelize, user } = require('../models');
const config=require("../config/config")
const bcrypt = require('bcrypt');
const nodemailer=require('nodemailer')
const randomString=require('randomstring')

const db=require('../models')
const User=db.user;

//reset password
const sendRestPasswordMail=async(name,email,token)=>{
    try{
        const transporter= await nodemailer.createTransport({
            host:'smtp.gmail.com',
            port:587,
            secure:false,
            service:'gmail',
            // requireTLS:true,
            auth:{
                user:config.emailUser,
                pass:config.emailPassword
            }
        }) 
        const mailOptions={
            from:config.emailUser,
            to:email,
            subject:"For reset password",
            html:'<p>Hi'+name+',Please copy the link<a href="http://localhost:5000/resetPassword?token='+token+'"></a> and reset your password</p>'

        }
        await transporter.sendMail(mailOptions,function(error,info){
            if(error){
                console.log(error)
                // res.send(400).send({success:false,message:"Unable to send"})
            }
            else{
                console.log("email has been sent")
                // res.send(200).send({success:true,message:"Email has been sent,kindly check your mail"})
            }
        })
    }
    catch(error){
        console.log(error)
        // res.send(400).json({success:false,message:"Error"})

    }
}
//get all users
const getUsers=async(req,res)=>{
    try{
        const data=await User.findAll({ });
        res.status(200).send({success:true,data:data});
    } catch(error){
        res.status(400).send({success:false,message:"Error"})
    }   
}
//add user
const addUser=async(req,res)=>{
    try{
        const firstName=req.body.firstName;
        const lastName=req.body.lastName;
        const email=req.body.email;
            const data=await User.create({
                firstName:firstName,
                lastName:lastName,
                email:email
            });
            res.status(200).send({success:true,data:data});
        }   
    catch(e){
        res.status(400).send({sucess:false,message:"error"});
    }
    
}
//update user
const updateUser=async(req,res)=>{
    try{
        const data=await User.update(req.body,{
            where:{
                UID:req.params.id
            }
        });
        console.log(data)
        
        res.status(200).send({success:true,message:"Data has been updated"});
    }
    catch(e){
        console.log(e)
        res.status(400).send({success:false,message:"error"})
    }
}
//delete user
const deleteUser=async(req,res)=>{
    try{
        const data=await User.destroy({
            where:{
                UID:req.params.id
            }
        });
        res.status(200).send({success:true,message:"User has been deleted"});
    } catch (error){
        res.status(400).send({success:false,message:"error"})
    }
}
//search user
const searchUser=async(req,res)=>{
    const search=req.params.key
    try{
        const data=await User.findOne({
            where:{
                firstName:{
                    [Op.like]: `%${search}%`
                }
            } 
        })
        res.status(200).send({success:true,data:data})
    }
    catch(e){
        res.status(400).send({success:false,message:"error"})
    }
}

//register user
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
        // return res.render('register',{
        //     message:'Email is already in use'
        // })
        res.status(400).send({success:false,message:"Email is already in use"})
       }
       else if(password!=confirm_password){
        // return res.render('register',{
        //     message:'Passwords donot match!'
        // })
        res.status(400).send({success:false,message:"Passwords doesnot match"})
       }
       let hashedPassword=await bcrypt.hash(password,8)
       const data=await User.create({
        firstName:firstName,
        lastName:lastName,
        email:email,
        password:hashedPassword
       })
    //    res.render('login',{
    //     message:'User registered'
    //    })
       res.status(200).send({success:true,message:"user registered"})
    }
    catch(error){
        res.status(400).send({success:false,message:"Error"})
    } 
}
//login user
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
                const token=randomString.generate()
                user.token=token
                user.save()
                req.session.isLoggedIn=1; 
                // res.render("index",{userExits:req.session.isLoggedIn==1})
                res.status(400).send({success:true,msg:"You are logged in"})

            }
            else{
                const currentDate=new Date()
                const currentTime=currentDate.getTime()
                if(user.count==3 && user.pwdTimeStamp==null){
                    user.pwdTimeStamp=currentTime+(30*60000)
                    user.save()
                    // res.render("login",{
                    //     message:"You  have been blocked for 30 minutes"
                    // })
                    res.status(200).send({success:false,msg:"You have been blocked for 30minutes"})

                }
                else if(user.count==3 && currentTime>=user.pwdTimeStamp){
                    user.pwdTimeStamp=null,
                    user.count=0
                    user.save()
                    // res.render("login",{
                    //     message:"Password not valid"
                    // })
                    res.status(200).send({success:false,msg:"Password not valid"})
                }
                else if(user.count==3 && currentTime<user.pwdTimeStamp){
                    console.log("you have been blocked,try after 30minutes")
                    // res.render("login",{
                    //     message:"You have been blocked,try after 30 minutes"
                    // })
                    res.status(200).send({success:false,msg:"You have been blocked for 30minutes"})

                }
                else{
                    user.count+=1
                    user.save()
                    // res.render("login",{
                    //     message:"Password is not valid"
                    // })
                    res.status(200).send({success:false,msg:"Password not valid"})

                }
            }
        }
        
    }
    catch(error){
        res.status(400).send({success:false,msg:"error"})
    }
}
//forgot password
const forgotPassword=async(req,res)=>{
    try{
        const email=req.body.email
        const data=await User.findOne({
            where:{ 
                email:email
            }
    })
    if(data!=null){
        const token=randomString.generate()
        data.token=token
        data.save()
        sendRestPasswordMail(data.firstName,data.email,randomString)
        // console.log(sendRestPasswordMail)
        // res.render("login",{
        //     message:"Link have been sent in you mail"
        // })
        res.status(200).json({success:true,message:"Check your email"});

    }else{
        res.status(200).json({success:false,message:"email not registered"});

    }
    }
    catch(e){
        console.log("error: ",e.message)
    }
}
//update password
const updatePassword=async(req,res)=>{
    try{
        // if(req.session.isLoggedIn){
            const email=req.body.email
            const oldPassword=req.body.oldPassword
            const newPassword=req.body.newPassword
            const data=await User.findOne({
                where:{
                    email:email
                }
            })
            if(oldPassword==data.password){
                let hashedPassword=await bcrypt.hash(newPassword,8)
                data.password=hashedPassword
                data.save()
                res.status(200).send({success:true,msg:"Your password have been updated"})
            }
            else{
                res.status(200).send({success:false,msg:"Your old password is not correct"})
            }
            
    }
    catch(error){
        console.log(error)
        res.status(400).send({msg:"Error"})
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
    forgotPassword,
    updatePassword   
}