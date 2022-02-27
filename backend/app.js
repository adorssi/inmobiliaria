const express = require('express');
const app = express();
const methodOverride = require('method-override');
const session = require('express-session')
require('dotenv').config();
const conectarDB = require('./DB/config/mongoose');

// RUTAS
const mainRoutes = require('./routes/main');
const loginRoute = require('./routes/login');
const propertyRoute = require('./routes/property');
const adminDashRoute = require('./routes/adminDash');
const userRoute = require('./routes/user');

conectarDB();

app.use(methodOverride('_method'));
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));


app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(express.static(__dirname + '/public'));

app.set('view engine', 'ejs');

app.use('/', mainRoutes);

app.use('/api/user', userRoute);

// app.use('/user', userRoute);

app.use('/properties', propertyRoute);

app.use('/adminDash', adminDashRoute);

app.use((req, res, next) => {
    res.status(404).render('404');
   })
   


app.listen(process.env.PORT || 4000, () =>{
    console.log('servidor corriendo en el puerto 4000')
})