
const {Sequelize,DataTypes,Model}=require('sequelize')
module.exports=(sequelize,DataTypes,Model)=>{
    

  const Book = sequelize.define('Books', {
      
      bookName: {
        type: DataTypes.STRING,
        allowNull: false,
     
      },
      
      genre: {
        type: DataTypes.STRING,
       
      },
      authorName:{
        type: DataTypes.STRING,
        
      },
      
      language:{
        type:DataTypes.STRING,
        
      },
      price:{
        type:DataTypes.INTEGER,

      },
      publishDate:{
        type:DataTypes.DATE,

      },
      BID:{
        type:DataTypes.UUID,
        allowNull:false,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
      },
    },
   
    
    {
      sequelize,
      modelName:'Books',
      paranoid:true,
      deletedAt:'deletedAt'
    });
    
    
    return Book;
}