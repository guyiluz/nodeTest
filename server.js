const express =require('express');
const hbs =require('hbs');
const fs =require('fs')
var app = express();

hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'))

app.use((req, res, next)=>{

  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`
  fs.appendFile ('server.log', log + '/n', (err) =>{
console.log("Unable to append to server.log")

  })
  console.log(log);
next()

})

app.use((req, res)=>{
res.render('mt.hbs')

})
hbs.registerHelper('getYear', ()=>{

return new Date().getFullYear()

})
hbs.registerHelper('screamIt', (text)=>{

return  text.toUpperCase()

})


app.get('/', (req,res)=>{
  res.render('home.hbs', {
      pageTitle: 'Home Page',
      welcomeMessage: 'Welcome to my website'
    });
  });


app.get('/about', (req,res)=>{

  res.render('about.hbs', {
      pageTitle: 'about Page',
      welcomeMessage: 'Welcome to my website'
    });
  });

app.listen(8080, ()=>{

  console.log("Let's go")
});
