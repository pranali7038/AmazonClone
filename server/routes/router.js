const express = require("express");
const router = new express.Router();
const Products = require("../models/productSchema");
const USER = require("../models/userSchema");
const bcrypt = require("bcryptjs");
const athenticate = require("../middleware/athenticate");

//get productsdata api
router.get("/getproducts", async (req, res) => {
    try {

        const productsdata = await Products.find();
        //console.log("Console the data "+productsdata);
        res.status(201).json(productsdata);

    } catch (error) {
        console.log("error" + error.message);
    }
});

//get individual data
router.get("/getproductsone/:id", async (req, res) => {
    try {
        const { id } = req.params;
        //console.log(id);
        const individualdata = await Products.findOne({ id: id });
        //console.log(individualdata+ "individual data");
        res.status(201).json(individualdata);

    } catch (error) {
        res.status(400).json(individualdata);
        console.log("error" + error.message);
    }
});


// User Account creation
router.post("/register", async (req, res) => {
    console.log(req.body); // Log the request body to check data being sent

    const { fname, email, mobile, password, cpassword } = req.body;

    if (!fname || !email || !mobile || !password || !cpassword) {
        return res.status(422).json({ error: "Fill in all data" });
    }

    try {
        const preuser = await USER.findOne({ email: email });

        if (preuser) {
            return res.status(422).json({ error: "This user already exists" });
        } else if (password !== cpassword) {
            return res.status(422).json({ error: "Passwords do not match" });
        } else {
            const finalUser = new USER({
                fname, email, mobile, password, cpassword
            });

            // Password hashing process
            await finalUser.save();
            console.log("User registered successfully");

            return res.status(201).json({ message: "User registered successfully" });
        }

    } catch (error) {
        //console.error(error.message); // Log any caught errors
        return res.status(500).json({ error: "Internal server error" });
    }
});

//login user api
router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        res.status(400).json({ error: "fill all the details" })
    }
    try {
        const userLogin = await USER.findOne({ email: email });
        //console.log(userLogin+"user value");

        if (userLogin) {
            const isMatch = await bcrypt.compare(password, userLogin.password);
            //console.log(isMatch);

            //token generation 


            if (!isMatch) {
                res.status(400).json({ error: "Invalid details" });
            } else {
                const token = await userLogin.generateAuthToken();
                //console.log(token);

                res.cookie("Amazonweb", token, {
                    expires: new Date(Date.now() + 9000000),
                    httpOnly: true
                })
                res.status(201).json({ message: "Password match" });
            }
        } else {
            res.status(400).json({ message: "Invalid Details" });
        }

    } catch (error) {
        res.status(400).json({ json: "Invalid details" });
    }
})

//adding data to cart api

router.post("/addcart/:id", athenticate, async (req, res) => {
    try {
        const { id } = req.params;
        const cart = await Products.findOne({ id: id });
        console.log(cart + "cart value");

        const userContact = await USER.findOne({ _id: req.userID });
        console.log(userContact);

        if (userContact) {
            const cartData = await userContact.addcartdata(cart);
            await userContact.save();
            console.log(cartData);
            res.status(201).json(userContact);
        }

    } catch (error) {
        res.status(401).json({ error: "Invalid User" });
    }
});

//get carts details
router.get("/cartdetails", athenticate, async (req, res) => {
    try {
        const buyuser = await USER.findOne({ _id: req.userID });
        res.status(201).json(buyuser);
    } catch (error) {
        console.log("error" + error)
    }
})

//get valid user
router.get("/validuser", athenticate, async (req, res) => {
    try {
        const validuserone = await USER.findOne({ _id: req.userID });
        res.status(201).json(validuserone);
    } catch (error) {
        console.log("error" + error)
    }
})

//remove items from cart
router.delete("/remove/:id", athenticate, async (req, res) => {
    try {
        const { id } = req.params;
        // Ensure you log the ID and check if it's correctly received
        console.log("ID to be removed:", id);

        // Update user's cart by filtering out the item
        req.rootUser.carts = req.rootUser.carts.filter((curval) => curval.id != id);
        await req.rootUser.save();

        res.status(201).json(req.rootUser);
        console.log("Item removed");
    } catch (error) {
        console.log("Error:", error);  // More informative logging
        res.status(400).json({ message: "Failed to remove item", error });
    }
});


//for user logout

router.get("/logout", athenticate, (req, res) => {
    try {
        req.rootUser.tokens = req.rootUser.tokens.filter((curelem) => {
            return curelem.token !== req.token
        });


        res.clearCookie("Amazonweb", { path: "/" });

        req.rootUser.save();
        res.status(201).json(req.rootUser.tokens);
        console.log("user logout");

    } catch (error) {
        console.log("error for user logout");
    }
})




module.exports = router;
