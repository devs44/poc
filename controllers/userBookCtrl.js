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
            res.status(500)
    }
}




const addUserBook=async(req,res)=>{
    const user_id=req.body.user_id;
    const book_id=req.body.book_id;
    const checkUserId=await User.findOne({
        where:{
            userId:user_id
        }
    })
    // if(checkUserId==Null){
    //     res.send("Data not found")
    // }else{
    //     const checkBookId=await Book.findOne({
    //         where:{
    //             bookId:book_id
    //         }
    //     })
    //     for(var count=0;count<=3;count++){

    //     }
    // }






    const checkBookId=await Book.findOne({
        where:{
            bookId:book_id
        }
    })
    // console.log(checkUserId)
    // console.log(checkBookId)
    
    if(checkUserId==null && checkBookId==null){
        res.send("Data not found")
    }else{
        const data=await UserBook.create({
            UserId:user_id,
            BookId:book_id
        })
        res.status(200).json({data:data})
        console.log("data found")
    }   
}


module.exports={
    getUserBook,
    addUserBook
}