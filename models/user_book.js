module.exports=(sequelize,DataTypes,Model)=>{
    

  const userBook = sequelize.define('user_books', {
      
      
    },
   
    
    {
      sequelize,
      modelName:'user_books',
      paranoid:true,
      deletedAt:'deletedAt'
    });
    
    
    return userBook;
}