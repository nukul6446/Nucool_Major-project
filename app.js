const express = require('express');
const port = 8080;
const app = express();
const mongoose = require("mongoose");
const path = require('path');
const Listing = require('./models/listing.js');

 const methodOverride = require('method-override');
 const ejsMate = require("ejs-mate");
const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust2";


main().then(()=>{
    console.log("connected to DB");
})
.catch((err)=>{
    console.log(err); 
});
async function main() {
    await mongoose.connect(MONGO_URL);
}
app.set("view engine","ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({extended : true}));
app.use(methodOverride("_method"))
app.engine("ejs",ejsMate);
app.use(express.static(path.join(__dirname ,"/public")));
app.get("/hi",(req,res)=>{ 
    res.send("i am root");
})  

//INDEX ROUTE
app.get("/listings", async (req, res) => {
    
    const allListings = await Listing.find({ name: { $exists: true, $ne: "" } });
   
      res.render("listings/index.ejs", {allListings });
});
 //new routes  
 app.get("/listings/new",(req,res)=>{
    res.render("listings/new.ejs");//directory path
 });

//create post
app.post("/listings",async(req,res)=>{ 
    const newlisting = new Listing(req.body.listing);// taking var here which is inside body
  await newlisting.save();//here we save inputs
    res.redirect("/listings");
    
})
//edit route
app.get("/listings/:id/edit",async(req,res)=>{
    let {id} = req.params;
 const listing = await Listing.findById(id);
    res.render("listings/edit.ejs",{listing});
})
//update route
 app.put("/listings/:id",async(req,res)=>{
    let {id} = req.params;
    console.log('Image URL:', listing.image);
    await Listing.findByIdAndUpdate(id,{...req.body.listing});
    res.redirect("/listings");
 })
//delete here
app.delete("/listings/:id",async(req,res)=>{
    let {id} = req.params;
    const delet =await Listing.findByIdAndDelete(id);
    console.log(delet);
    res.redirect("/listings")
})


//show routes 
app.get("/listings/:id",async(req,res)=>{
 let {id} = req.params;
 const listing = await Listing.findById(id);
 res.render("listings/show.ejs",{listing});
})
 
app.listen(port,()=>{
   console.log( `app is listing on port ${port}`);
})
 