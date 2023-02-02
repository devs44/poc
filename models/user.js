
const {Sequelize,DataTypes,Model}=require('sequelize')
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
      },
      token:{
        type:DataTypes.STRING,
        defaultValue:null
      },
      UID:{
        type:DataTypes.UUID,
        allowNull:false,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
      },
    }, 
    {
      sequelize,
      modelName:'Users',
      paranoid:true,
      deletedAt:'deletedAt'
    });
    
    
    return User;
}