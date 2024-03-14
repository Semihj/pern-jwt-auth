const pool = require('../db.js');
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const router = express.Router();

router.post("/register", async (req,res) => {
   const {name,email,password} = req.body; 
   try {
        const user = await pool.query("SELECT * FROM users WHERE user_email = $1 ",
        [
            email
        ])

        if(user.rows.length > 0) return res.status(403).json("User already exists");
        const bcryptedPassword = bcrypt.hashSync(password,10);
        const newUser = await pool.query(
            "INSERT INTO users (user_name,user_email,user_password) VALUES ($1 , $2 , $3 ) RETURNING *",
            [name,email,bcryptedPassword]
        )
        
        res.status(200).json("User created successfully")
    } catch (error) {
        res.status(500).json(error)
    }
})
router.post("/login", async (req,res) => {
   const {email,password} = req.body; 
   try {
        const user = await pool.query("SELECT * FROM users WHERE user_email = $1 ",
        [
            email
        ])

        if(user.rows.length === 0) return res.status(403).json("Invalid credentials");
        const validPassword = bcrypt.compareSync(password,user.rows[0].user_password)
        if(!validPassword) return res.status(403).json("Wrong Password");
        const token = jwt.sign({user:user.rows[0].id},process.env.JWT_SECRET)
        res.cookie("user",token)
        const {user_password:pass,...rest} = user.rows[0];
        res.status(200).json(rest)
    } catch (error) {
        res.status(500).json(error)
    }
})

module.exports = router