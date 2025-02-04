const Admin = require("../models/admin");


const adminRolePermissonSeeder = async () => {
  try {
    const findAdmin = await Admin.find();
    if(findAdmin?.length <= 0){
      await Admin.insertOne({
        name:'AsAdUL kHAan',
        email:'admin@gmail.com',
        password:'123',
        userType:'super-admin'
      });
      console.log("Admin Seeder data already exists, skipping seed.");
    }
 
  } catch (error) {
    console.error("Error seeding slider data:", error.message);
  }
};

module.exports = adminRolePermissonSeeder;
