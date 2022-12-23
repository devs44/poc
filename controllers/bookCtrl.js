const db=require('../models')

const Book=db.book;


const {Sequelize,Op,QueryTypes}=require('sequelize')


const getBooks=async(req,res)=>{
    try{
        const data=await Book.findAll({ });
        res.status(200).json({data:data});
    }
    catch(e){
        res.send(500)
        console.log(e)
    }
    
}

const addBook=async(req,res)=>{
    try{
        var addbookName=req.body.bookName;
        var addgenre=req.body.genre;
        var addauthorName=req.body.authorName;
        var addlanguage=req.body.language;
        var addprice=req.body.price;
        var addDate=new Date();
        var addedDate=addDate.toString();
        const data=await Book.create({
            bookName:addbookName,
            genre:addgenre,
            authorName:addauthorName,
            language:addlanguage,
            price:addprice,
            publishDate:addedDate
        });
        res.status(200).json({data:data});
        
    } catch(e){
        res.status(500)
        console.log(e)
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
        res.status(500)
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
        res.status(500)
        console.log(e)

    }
}



module.exports={
    getBooks,
    addBook,
    updateBook,
    deleteBook
}