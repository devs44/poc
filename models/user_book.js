module.exports=(sequelize,DataTypes,Model)=>{
    

  const User = sequelize.define('user_books', {
      
      user_id: {
        type: DataTypes.STRING,
        allowNull: false,
     
      },
      
      book_id: {
        type: DataTypes.STRING,
       
      }
    },
   
    
    {
      sequelize,
      modelName:'user_books'
      // paranoid:true,
      // deletedAt:'deletedAt'
    });
    
    
    return User;
}