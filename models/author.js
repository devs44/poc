module.exports=(sequelize,DataTypes,Model)=>{
    

  const Author = sequelize.define('authors', {
      
      authorName: {
        type: DataTypes.STRING,
        allowNull: false,
     
      },
      
      bookName: {
        type: DataTypes.STRING,
        allowNull:false
       
      }
    },  
    {
      sequelize,
      modelName:'authors',
      paranoid:true,
      deletedAt:'deletedAt'
    });
    
    
    return Author;
}