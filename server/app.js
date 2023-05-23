const express = require('express');
const app = express();
const signUp = require('./routes/signUp');
const login = require('./routes/login');
const forgotPassword = require('./routes/forgotPassword');
const config = require('config');
const token = require('./routes/token');

if(!config.get('jwtPrivateKey')){
    console.log('mada0245_jwtPrivateKey is not defined.');
    process.exit(1);
}

if(!process.env.NODEMAILER_USERNAME){
    console.log('NODEMAILER_USERNAME is not defined.');
    process.exit(1);
}

if(!process.env.NODEMAILER_PASSWORD){
    console.log('NODEMAILER_PASSWORD is not defined.');
    process.exit(1);
}

app.use(express.static("../cliente/public"));
app.use('/api/signup', signUp);
app.use('/api/login', login);
app.use('/api/forgotPassword', forgotPassword);
app.use('/api/token', token);



/*PORT*/
const PORT = 8000;
app.listen(PORT, (error) => {

    if (error) {
        console.log(error);
        return;
        
    }
    console.log("Server is running on port", PORT);
});