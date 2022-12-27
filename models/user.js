module.exports=(sequelize,DataTypes,Model)=>{
    

  const User = sequelize.define('Users', {
      
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
     
      },
      
      lastName: {
        type: DataTypes.STRING,
       
      },
      email:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: {
          msg: "Must be a valid email address",
        }
       }
      }
      // book_id:{
      //   type:DataTypes.INTEGER,
      //   validate:{
      //     isin
      //   }
      // }
    },
   
    
    {
      sequelize,
      modelName:'Users',
      paranoid:true,
      deletedAt:'deletedAt'
    });
    
    
    return User;
}