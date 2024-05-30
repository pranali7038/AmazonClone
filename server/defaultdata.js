const Products = require("./models/productSchema");
const Productsdata = require("./constant/productsdata");

const DefaultData = async()=>{
    try{

        await Products.deleteMany({});  //to avoid multipe storig of data

        const storeData = await Products.insertMany(Productsdata);
        console.log(storeData);
    }catch(error){
         console.log("errror"+ error.message);   
    }
}

module.exports = DefaultData;