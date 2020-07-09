const express = require('express')

const bodyParser = require('body-parser')
const compression = require('compression');
//import handlebars
const exphbs = require('express-handlebars');

const app = express();

//import search routes
const searchRoute = require('./routes/searchRouter');

const PORT = 8000;

app.use(compression());
app.use(bodyParser.json());
app.use(express.json())
app.use(express.urlencoded({extended : true}))

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.use('/search/',searchRoute);

app.listen(PORT,()=>{
    console.log(`Server is running on ${PORT}`);
})