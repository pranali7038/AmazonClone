const express = require("express");
const router = new express.Router();
const Products = require("../models/productSchema");

//get productsdata api
router.get("/getproducts",async(req,res)=>{
    try{
        
        const productsdata = await Products.find();
        //console.log("Console the data "+productsdata);
        res.status(201).json(productsdata);

    }catch(error){
        console.log("error"+error.message);
    }
})



module.exports = router;