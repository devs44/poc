const db=require('../models')

const User=db.user;
const Book=db.book;
const UserBook=db.userBooks;

const {Sequelize,Op,QueryTypes, ConnectionAcquireTimeoutError}=require('sequelize')

const getUserBook=async(req,res)=>{
    try
    {
        const data=await User.findAll({
                        attibutes:["firstName","lastName","id"],
                        include:{
                            model:Book,
                            attributes:['bookName']
                        }
                    })
        const bookData=await data.getBooks();
        res.status(200).json({data:data,bookData:bookData})
    }
        catch(e){
            res.status(400).send({success:false,message:"error"})
    }
}



const addUserBook=async(req,res)=>{
    try{
        const uid=req.body.uid;
        const bid=req.body.bid;
        console.log(req.body.bid,"DDDDDDDd")
        const checkUserId=await User.findOne({
            where:{
                UID:uid
            }
        })
        const checkBookId=await Book.findOne({
            where:{
                BID:bid
            }
        })
        console.log(checkBookId,'DDDDDDDDDDDddd')
    
    
        if(checkUserId==null && checkBookId==null){
            res.send("Data not found")
        }else{
            const data=await UserBook.create({
                UserUID:uid,
                BookBID:bid
            })
            res.status(200).send({success:true,message:"Book issued to user"})
        }
    }
        catch(error){
            res.status(400).send({success:false,message:"error"})
        }  
}


module.exports={
    getUserBook,
    addUserBook
}