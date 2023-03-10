const {Sequelize,DataTypes,Model}=require('sequelize')

const sequelize = new Sequelize('practice_db', 'postgres', 'devi', {
  host: 'localhost',
  logging:true,
  pool: {
    max: 100,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  dialect: 'postgres'
});

try {
    sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }

const db={};
db.Sequelize=Sequelize;
db.sequelize=sequelize;

db.user=require('./user')(sequelize,DataTypes,Model)
db.book=require('./book')(sequelize,DataTypes,Model)
db.author=require('./author')(sequelize,DataTypes,Model)
db.userBooks=require('./user_book')(sequelize,DataTypes,db.user,db.book)


//user,book-many to many
db.user.belongsToMany(db.book,{through:db.userBooks});
db.book.belongsToMany(db.user,{through:db.userBooks});

//author,book-one to many
db.author.hasMany(db.book,{"targetKey":"authorId"});
db.book.belongsTo(db.author,{"targetKey":"authorId"});


db.DataTypes=DataTypes;
db.sequelize.sync({force:false})
module.exports=db