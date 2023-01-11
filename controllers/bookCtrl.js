const db=require('../models')

const Book=db.book;
const User=db.user;

const {Sequelize,Op,QueryTypes}=require('sequelize');
const { user } = require('../models');


const getBooks=async(req,res)=>{
    try{
        const data=await Book.findAll({ });
        res.status(200).json({data:data});
    }
    catch(e){
        console.log('error: ',e.message)
    }
    
}

const addBook=async(req,res)=>{
    try{
        const bookName=req.body.bookName;
        const genre=req.body.genre;
        const authorName=req.body.authorName;
        const language=req.body.language;
        const price=req.body.price;
        const addDate=new Date();
        const addedDate=addDate.toString();
        // const bookId=req.body.bookId;

        const data=await Book.create({
            bookName:bookName,
            genre:genre,
            authorName:authorName,
            language:language,
            price:price,
            publishDate:addedDate
            // bookId:bookId
        });
        res.status(200).json({data:data});
        
    } catch(e){
        console.log('error: ',e.message)
    }
    
}

const updateBook=async(req,res)=>{
    try{
        var updatedData=req.body;
        const data=await Book.update({updatedData},{
            where:{
                id:req.params.id
            }
        });
        console.log(updatedData)
        res.status(200).json({data:data});
    }
    catch(e){
        console.log('error: ',e.message)
    }
}

const deleteBook=async(req,res)=>{
    try{
        const data=await Book.destroy({
            where:{
                id:req.params.id
            }
        });
        res.status(200).json({data:data});
    } catch (e){
        console.log('error: ',e.message)

    }
}

const searchBook=async(req,res)=>{
    console.log(req.params.key)
    const search=await req.params.key
    try{
        const data=await Book.findAll({
            where:{
                bookName:{
                    [Op.like]: `%${search}%`
                }         
                }
            })
                
        res.status(200).json({data:data});
    }
    catch(e){
        console.log('error: ',e.message)
    }
}



module.exports={
    getBooks,
    addBook,
    updateBook,
    deleteBook,

    searchBook
}