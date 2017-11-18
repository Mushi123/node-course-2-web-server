const express=require('express');
const hbs=require('hbs')
const fs=require('fs')
var app=express();
hbs.registerPartials(__dirname+'/views/partials')
app.set({
  'view engine':'hbs'
})
app.use((req,res,next) => {
  var now=new Date().toString();
  var log=`${now}: ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile('server.log',log+'\n',(err) => {
    if(err){
      console.log("Unable to append to server.log");
    }else{
      next();
    }
  });
})
app.use((req,res,next) => {
  res.render('maintenance.hbs');
})//we just need to concat the name of the folder inside our proj folder where the assets lie
app.use(express.static(__dirname+'/public'))//if you go to /help.html you will get html page
                                            //express.static specifies where our static assets lie like html pages. It takes in
                                            //absolute path from your hard drive so __dirname var holds that path to my project folder
hbs.registerHelper('getCurrentYear',()=>{
  return new Date().getFullYear();
});
hbs.registerHelper('screamIt',(text)=>{
  return text.toUpperCase();
})
app.get('/',(req,res)=>{
  //res.set({'Content-Type':'application/json'});
  //res.send("<h1>Hello Express</h1>")
  // res.status(200).json({
  //   title: "Sample"
  // })
  // res.send({
  //   title:'Sample',
  //   message: "test server"
  // })
  res.render('home.hbs',{name:"Home Page",welcomeMessage:"Welcome to website"})//views folder is default folder where express looks for templates
});
app.get('/about',(req,res)=>{
  res.render('about.hbs',{name:'About'})
})

app.get('/bad',(req,res,next)=>{
  res.send({
    errorMessage: "Bad route"
  })
})

app.listen(3000,()=>{
  console.log("Server is up");
})
