var express=require('express')
var bodyParser=require('body-parser')
var csrf=require('csurf')
var session=require('express-session')
var app =express()
var PORT=5000
const SequelizeStore=require("connect-session-sequelize")(session.Store);
const db = require('./models/index')
const csrfProtection=csrf()

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

// app.use(csrfProtection)

app.set('view engine','hbs')

require('./models/index')

const indexCtrl=require('./controllers/indexCtrl')
const useCtrl=require('./controllers/userCtrl')
const bookCtrl=require('./controllers/bookCtrl')
const authorCtrl=require('./controllers/authorCtrl')
const userBookCtrl=require('./controllers/userBookCtrl')




app.get('/',indexCtrl.index)
app.get('/register',indexCtrl.register)
app.get('/login',indexCtrl.login)
app.get('/logout',indexCtrl.logout)
app.get('/forgotPassword',indexCtrl.forgotPassword)


app.post("/auth/register", useCtrl.registerUser)
app.post("/auth/login",useCtrl.loginUser)
app.post("/auth/forgotPassword",useCtrl.forgotPassword)

//users
app.get('/users',useCtrl.getUsers)
app.post('/addUser',useCtrl.addUser)
app.patch('/updateUser',useCtrl.updateUser)
app.delete('/deleteUser/:id',useCtrl.deleteUser)

app.get('/searchUser/:key',useCtrl.searchUser)

//books
app.get('/books',bookCtrl.getBooks)
app.post('/addBook',bookCtrl.addBook)
app.patch('/updateBook',bookCtrl.updateBook)
app.delete('/deleteBook/:id',bookCtrl.deleteBook)

app.get('/searchBook/:key',bookCtrl.searchBook)


//authors
app.get('/authors',authorCtrl.getAuthors)
app.post('/addAuthor',authorCtrl.addAuthor)
app.patch('/updateAuthor',authorCtrl.updateAuthor)
app.delete('/deleteAuthor/:id',authorCtrl.deleteAuthor)

app.get('/searchAuthors/:key',authorCtrl.searchAuthor)

//users-books
app.get('/users/books',userBookCtrl.getUserBook)
app.get('/user/book',userBookCtrl.addUserBook)


//author-books
app.get('/author/books',authorCtrl.getAuthorBook)

const server=app.listen(PORT,function(){
    console.log(`Server running at http:localhost:${PORT}`)
})

