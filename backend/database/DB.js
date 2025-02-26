const mongoose = require('mongoose');
const seedPermissionData = require('../seeder/PermissionSeeder');
const adminRolePermissonSeeder = require('../seeder/AdminSeeder');
const dbConnection = async(req,res)=>{
    try{
     const conn = await mongoose.connect(process.env.MONGO_URL);
    // const conn = await mongoose.connect('mongodb://localhost:27017/manpowerstation')
     if(conn){
        console.log('mongoose connection successully'+' '+conn.connection.host);
        seedPermissionData();
        adminRolePermissonSeeder()
     }
    }
    catch(err){
        console.log('mongoose connection erros' + ' ' +  err.bgRed)
    }
}
module.exports = dbConnection;