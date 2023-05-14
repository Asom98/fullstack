const express = require("express")
const router = express.Router()
const bcrypt = require("bcrypt");

const userModel = require("../models/user");
const adminModel = require("../models/admin")


router.get("/getUsers", async(req, res)=>{
    await userModel.find().then((r)=>{
      res.json(r)
    })
})

router.get("/getAdmins", async(req,res) => {
    await adminModel.find()
    .then(result => {
        res.json(result)
    })
})

router.delete("deleteAdmin", async (req, res) => {

})
router.get("/getUsersById", async(req, res)=>{
    id = req.body.id
    await userModel.findById(id).then((r)=>{
      res.json(r)
    })
})

router.post("/addUser", async (req, res) => {
    try {
        const userExists = await userModel.findOne({
            username: req.body.username
        })
        if (userExists) return res.status(400).send("User already exists");

        await bcrypt.hash(req.body.password, 10)
            .then(hashedPassword => {
                const newUser = new userModel({
                    email: req.body.email,
                    phoneNumber: req.body.phoneNumber,
                    username: req.body.username,
                    password: hashedPassword,
                    role: "user"
                })
                newUser.save()
                    .then(res.sendStatus(201))
            })
    } catch (error) {
        console.log(error)
        res.sendStatus(400)
    }
})

router.post("/addAdmin", async (req, res) => {
    const role = req.body.role
    try {
        const adminExists = await adminModel.findOne({
            username: req.body.username
        });
        if (adminExists) return res.status(400).send("Admin already exists");

        await bcrypt.hash(req.body.password, 10)
            .then(hashedPassword => {
                const newAdmin = new adminModel({
                    email: req.body.email,
                    username: req.body.username,
                    password: hashedPassword,
                    phoneNumber: req.body.phoneNumber,
                    role: "admin"
                })
                newAdmin.save()
                .then(res.sendStatus(201))
            })
    } catch (error) {
        console.log(error);
        res.sendStatus(400)
    }
})

router.put("/updateUser", async(req, res)=>{
    const id = req.body.id
    const data = req.body
    try {
        
        if (data.password && data.password !== "") {
          data.password = await bcrypt.hash(data.password, 10);
        }
        await userModel.findByIdAndUpdate(id, data);
        res.sendStatus(200);
    } catch (e) {
        res.sendStatus(404);
    }
})

router.delete("/removeUser", async(req, res)=>{
    const id = req.body.id
    try{
      await userModel.findByIdAndDelete(id).then(res.sendStatus(200))
    }catch(e){
      res.sendStatus(404)
    }
})

router.put("/updateAdmin", async(req, res)=>{
    const id = req.body.id
    const data = req.body
    try{
        await adminModel.findByIdAndUpdate(id, data)
        .then(res.sendStatus(200))
    }catch(e){
        res.sendStatus(404)
    }
})

router.delete("/removeAdmin", async (req, res) => {
    const id = req.body.id
    try{
      await adminModel.findByIdAndDelete(id)
      .then(res.sendStatus(200))
    }catch(e){
      res.sendStatus(404)
    }
})

module.exports = router