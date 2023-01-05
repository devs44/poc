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
      },
      userId:{
        type:DataTypes.INTEGER,
        allowNull:true,
        unique:true
      },
      password:{
        type:DataTypes.STRING,
        
      },
      count:{
        type:DataTypes.INTEGER,
        defaultValue:0
      },
      pwdTimeStamp:{
        type:DataTypes.DATE,
        defaultValue:null
      }
    },
   
    
    {
      sequelize,
      modelName:'Users',
      paranoid:true,
      deletedAt:'deletedAt'
    });
    
    
    return User;
}