const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials')

app.set('view engine', 'hbs');

app.use((request, response, next) => {
  var now = new Date().toString();
  var log = `${now}: ${request.method} ${request.url}`;
  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) => {
    if(err){
      console.log('Unable to append to server.log');
    }
  })
  next();
});
// //maintenance:
// app.use((request, response, next) => {
//   response.render('maintenance.hbs');
// });
app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
  // return 'SG';
});

hbs.registerHelper('screamIT', (text) => {
  return text.toUpperCase();
});

app.get('/', (request, response) => {
response.render('home.hbs', {
  pageTitle: 'Home Page',
  welcomeMessage: 'Welcome to our Website! :)'
});

  // response.send('<h1>Hello Express!</h1>');

  // response.send({
  //   name: 'Lana',
  //   likes: [
  //     'cars',
  //     'basketball',
  //     'photos',
  //     'books'
  //   ]
  // })
});

app.get('/about', (request, response) => {
  // response.send('About Page');
  response.render('about.hbs', {
    pageTitle: 'About Page'
    // currentYear: new Date().getFullYear()
  });
});

app.get('/bad', (request, response) => {
  response.send({
    errorMessage:'Unable to handle request!'
  });
});

app.get('/projects', (request, response) => {
  response.render('projects.hbs', {
    pageTitle: 'Projects'
  });
});

app.listen(3000, () => {
  console.log('Server is up on port 3000');
});
