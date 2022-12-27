const express=require('express')
const bodyParser=require('body-parser')
const app =express()
const PORT=5000


app.use(bodyParser.json())

require('./models/index')

const useCtrl=require('./controllers/userCtrl')
const bookCtrl=require('./controllers/bookCtrl')
const authorCtrl=require('./controllers/authorCtrl')


app.get('/',(req,res)=>{
    res.send("Hello world")
})



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
app.get('/users/books',useCtrl.getUserBook)


//author-books
app.get('/author/books',authorCtrl.getAuthorBook)

const server=app.listen(PORT,function(){
    console.log(`Server running at http:localhost:${PORT}`)
})