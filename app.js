const express=require('express')
const bodyParser=require('body-parser')
const path=require('path')
const fs=require('fs')
const app =express()
const PORT=5000


app.use(bodyParser.json())
app.use(express.urlencoded({extended:'false'}))
app.use(express.static(__dirname + '/public'));
app.set('view engine','hbs')

require('./models/index')

const useCtrl=require('./controllers/userCtrl')
const bookCtrl=require('./controllers/bookCtrl')
const authorCtrl=require('./controllers/authorCtrl')
const userBookCtrl=require('./controllers/userBookCtrl')




app.get('/',(req,res)=>{
    res.render("index")
})

app.get('/register',(req,res)=>{
    res.render("register")
})

app.get('/login',(req,res)=>{
    res.render("login")
})

app.post("/auth/register", useCtrl.registerUser)

app.post("/auth/login",useCtrl.loginUser)


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

