const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
var app = express();

const port = process.env.PORT || 3000;

hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));

app.use((req, res, next)=>{
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}` ;
  fs.appendFile('server.log', log +'\n' , (error)=>{
    console.log(error);
  });
  next();
});

// app.use((req, res, next)=>{
//   res.render('maintainance.hbs',{
//     welcomeMessage: 'I have completed the challenge',
//     currentYear: new Date().getFullYear()
//   })
// })

app.get('/',(req, res) =>{
  //res.send('<h1>Hello Express!</h1>');
  res.render('home.hbs',{
    pageTitle: 'Home Page',
    welcomeMessage: 'I have completed the challenge',
    currentYear: new Date().getFullYear()
  });
});
app.get('/about', (req,res)=>{
  res.render('about.hbs',{
    pageTitle: 'About Page',
    currentYear: new Date().getFullYear()
  });
});

app.get('/bad', (req,res) =>{
  res.send({
    errorMessage: 'Unable to handle request'
  })
});

app.listen(port);
