const express = require("express")
const router = express.Router()
const bcrypt = require("bcrypt");

const userModel = require("../models/user");


router.get("/getUsers", async(req, res)=>{
    await userModel.find().then((r)=>{
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
    }
})

router.put("/updateUser", async(req, res)=>{
    const id = req.body.id
    const data = req.body
    try{
        await userModel.findByIdAndUpdate(id, data)
    }catch(e){
        res.sendStatus(404)
    }
})


router.delete("/removeUser", async(req, res)=>{
    const id = req.body.id
    try{
      await userModel.findByIdAndDelete(id)
    }catch(e){
      res.sendStatus(404)
    }
})

module.exports = router