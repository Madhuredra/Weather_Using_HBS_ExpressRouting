const express = require('express');
const path = require('path');
const hbs = require('hbs');
const app = express();

const static_path = path.join(__dirname, '../public');
const template_path = path.join(__dirname, '../templates/views');
const partial_path = path.join(__dirname, '../templates/partials');


app.set('view engine','hbs');
app.use(express.static(static_path));
app.set('views', template_path);
hbs.registerPartials(partial_path);


const port = process.env.PORT || 3000;

app.get('', (req, res) => {
  res.render('index');
});

app.get('/about', (req, res) => {
  res.render('about');
});

app.get('/weather', (req, res) => {
  res.render('weather');
});

app.use('*', (req, res) => {
  res.render('404');
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});

