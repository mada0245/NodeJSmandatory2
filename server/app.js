const express = require('express');
const app = express();
const signUp = require('./routes/signUp');
const login = require('./routes/login');
const forgotPassword = require('./routes/forgotPassword');
const config = require('config');
const token = require('./routes/token');
const helmet = require('helmet');

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

if(!process.env.MADA0245_ADMIN_PASS){
    console.log('MADA0245_ADMIN_PASS is not defined.');
    process.exit(1);
}

app.use('/api/signup', signUp);
app.use('/api/login', login);
app.use('/api/forgotPassword', forgotPassword);
app.use('/api/token', token);
app.use(helmet);



/*PORT*/
const PORT = 8000;
app.listen(PORT, (error) => {

    if (error) {
        console.log(error);
        return;
        
    }
    console.log("Server is running on port", PORT);
});