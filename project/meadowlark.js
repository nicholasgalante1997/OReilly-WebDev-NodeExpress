const express = require('express');
const expressHandlebars = require('express-handlebars');

const app = express();
const port = process.env.PORT || 3000;

const fortunes = [
    "Vini Vidi Vici",
    "C'est La Vie",
    "Pura Vida"
]

// configure handlebars view engine
app.engine('handlebars', expressHandlebars({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => res.render('Home'));
app.get('/about', (req, res) => {
    const fortuna = fortunes[Math.floor(Math.random() * fortunes.length)];
    res.render('About', { fortune: fortuna });
});

// custom 404 page
app.use((req, res) => {
  res.status(404);
  res.render('404');
});

app.use((err, req, res, next) => {
    console.log(err.message);
    res.status(500);
    res.render('500');
})

app.listen(port, () => console.log(
    `Express Started on http://localhost:${port} ` + 
    `\npress Ctrl C to terminate;`
));