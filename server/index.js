const express = require("express");
const cors = require('cors');
const mongoose=require("mongoose")
const app = express();
app.use(cors());
app.use(express.json())

const PORT = process.env.PORT || 8000;

//scema
const schemaData=mongoose.Schema({
    name:String,
    email:String,
    mobile:String,
},{
    timestamp:true
})

const userModel=mongoose.model("user",schemaData)

//read
app.get('/',async (req, res) => {
    const data=await userModel.find({})
    res.json({success:true,data:data});
});

//create data/save
app.post("/create",async(req,res)=>{
    console.log(req.body)
    const data=new userModel(req.body)
    await data.save()
    res.send({success:true,message:"data save success ",data:data})
})

//update data
app.put("/update",async(req,res)=>{
    console.log(req.body)
    const{id,...rest}=req.body
    console.log(rest)
    const data=await userModel.updateOne({ _id:id},rest)
    res.send({success:true,message:"data update",data:data})
})

//delete api
app.delete("/delete/:id",async(req,res)=>{
    const id=req.params.id
    console.log(id)
    const data=await userModel.deleteOne({_id:id})
    res.send({success:true,message:"data delete",data:data})

})

mongoose.connect("mongodb://127.0.0.1:27017/curdopration")
.then(()=>{
    console.log("connect to db")
    app.listen(PORT, () => {
        console.log("Server is running on port " + PORT);
    });
})
.catch((err)=>console.log(err))

