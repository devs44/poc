const db=require('../models')

const Author=db.author;
const Book=db.book;


const {Sequelize,QueryTypes}=require('sequelize')

const Op=Sequelize.Op;



const getAuthors=async(req,res)=>{
    try{
        const data=await Author.findAll({ });
        res.status(200).json({data:data});
    }
    catch(e){
        console.log('error: ',e.message)
    }
    
}

const addAuthor=async(req,res)=>{
    try{
        var addauthorName=req.body.authorName;
        var addbookName=req.body.bookName;
        var addauthorId=req.body.authorId;
        const data=await Author.create({
            authorName:addauthorName,
            bookName:addbookName,
            authorId:addauthorId
        });
        res.status(200).json({data:data});
        
    } catch(e){
        console.log('error: ',e.message)
    }
    
}

const updateAuthor=async(req,res)=>{
    try{
        var updatedData=req.body;
        const data=await Author.update({updatedData},{
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

const deleteAuthor=async(req,res)=>{
    try{
        const data=await Author.destroy({
            where:{
                id:req.params.id
            }
        });
        res.status(200).json({data:data});
    } catch (e){
        console.log('error: ',e.message)

    }
}

const getAuthorBook=async(req,res)=>{
    try{
        const data=await Author.findAll({
            attributes:['authorName','bookName'],
            include:[{
                model:Book,
                attributes:['bookName']
            }]
        })
        res.status(200).json({data:data});
    }
    catch(e){
        console.log('error: ',e.message)
    }

}

const searchAuthor=async(req,res)=>{
    
    const search=await req.params.key
    console.log(search)
    try{
        const data=await Author.findAll({
            where:{
                [Op.like]: `${search}`
                    }
            })
                
        res.status(200).json({data:data});
    }
    catch(e){
        console.log('error: ',e.message)
    }
}

module.exports={
    getAuthors,
    addAuthor,
    updateAuthor,
    deleteAuthor,

    getAuthorBook,
    searchAuthor
}