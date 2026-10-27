import dotenv from 'dotenv';
dotenv.config({
    path: './.env',
})
let name = process.env.username;
console.log('hello',name);
