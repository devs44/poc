var express=require('express')
var bodyParser=require('body-parser')
var csrf=require('csurf')
var session=require('express-session')
var app =express()
var PORT=5000
const SequelizeStore=require("connect-session-sequelize")(session.Store);
const db = require('./models/index')


const auth=require("./middleware/auth")

app.use(bodyParser.json())
app.use(express.urlencoded({extended:'true'}))
app.use(session({
    store:new SequelizeStore({
        db:db.sequelize,
    }),
    secret:"secret",
    resave:false,
    saveUninitialized:false 
}))



app.set('view engine','hbs')

require('./models/index')

//controllers
const index=require('./controllers/index')
const user=require('./controllers/user')
const book=require('./controllers/book')
const author=require('./controllers/author')
const userBook=require('./controllers/userBook')




app.get('/',index.index)
app.get('/register',index.register)
app.get('/login',index.login)
app.get('/logout',index.logout)
app.get('/forgotPassword',index.forgotPassword)
app.get('/updatePassword',index.updatePassword)

app.post("/auth/register", user.registerUser)
app.post("/auth/login",user.loginUser)
app.post("/auth/forgotPassword",user.forgotPassword)
app.post("/auth/updatePassword",user.updatePassword)



//users
app.get('/users',user.getUsers)
app.post('/addUser',user.addUser)
app.patch('/updateUser/:id',user.updateUser)
app.delete('/deleteUser/:id',user.deleteUser)
app.get('/searchUser/:key',user.searchUser)

//books
app.get('/books',book.getBooks)
app.post('/addBook',book.addBook)
app.patch('/updateBook',book.updateBook)
app.delete('/deleteBook/:id',book.deleteBook)
app.get('/searchBook/:key',book.searchBook)


//authors
app.get('/authors',author.getAuthors)
app.post('/addAuthor',author.addAuthor)
app.patch('/updateAuthor',author.updateAuthor)
app.delete('/deleteAuthor/:id',author.deleteAuthor)
app.get('/searchAuthors/:key',author.searchAuthor)


//users-books
app.get('/users/books',userBook.getUserBook)
app.post('/user/book',userBook.addUserBook)


//author-books
app.get('/author/books',author.getAuthorBook)


//test
app.get('/test',auth,function(req,res){
    res.status(200).send({success:true,msg:"Authenticated"})
})

const server=app.listen(PORT,function(){
    console.log(`Server running at http:localhost:${PORT}`)
})

