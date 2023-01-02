

module.exports=(sequelize,DataTypes,Model)=>{
  
  class Book extends Model{}
  Book.init({
    bookName: DataTypes.STRING,
    genre: DataTypes.STRING,
    authorName: DataTypes.STRING,
    language: DataTypes.STRING,
    price: DataTypes.INTEGER,
    publishDate: DataTypes.DATE,
    bookId:DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Book',
    paranoid:'true',
    deletedAt:'deletedAt'
  });
  return Book;
}