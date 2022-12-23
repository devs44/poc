const express=require('express')
const bodyParser=require('body-parser')
const app =express()
const PORT=5000


app.use(bodyParser.json())

require('./models/index')

const useCtrl=require('./controllers/userCtrl')
const bookCtrl=require('./controllers/bookCtrl')


app.get('/',(req,res)=>{
    res.send("Hello world")
})

//users
app.get('/users',useCtrl.getUsers)
app.post('/addUser',useCtrl.addUser)
app.patch('/updateUser',useCtrl.updateUser)
app.delete('/deleteUser/:id',useCtrl.deleteUser)

//books
app.get('/books',bookCtrl.getBooks)
app.post('/addBook',bookCtrl.addBook)
app.patch('/updateBook',bookCtrl.updateBook)
app.delete('/deleteBook/:id',bookCtrl.deleteBook)

//users-books
app.get('/users/books',useCtrl.getUserBook)

const server=app.listen(PORT,function(){
    console.log(`Server running at http:localhost:${PORT}`)
})