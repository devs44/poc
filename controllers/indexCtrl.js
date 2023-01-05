

const index=async(req,res)=>{
    try{  
            res.render('index')
        }
    catch(error){
        res.send("error: ",error.message)
    }
}

const register=async(req,res)=>{
    try{
        res.render("register")
    }
    catch(error){
        res.send("error: ",error.message)
    }
}

const login=async(req,res)=>{
    try{
          
        res.render("login",{ 
            isAuthenticated:false
        })
    } 
    catch(error){
        res.send("error: ",error.message)
    }
}
 
const logout=async(req,res)=>{
    try{
          
        res.render("index")
    } 
    catch(error){
        res.send("error: ",error.message)
    }
}


const forgotPassword=async(req,res)=>{
    try{
        res.render('forgot-password')
    }
    catch(error){
        console.log("error: ",error.message)
    }
}
module.exports={
    index,
    register,
    login,
    logout,
    forgotPassword
}