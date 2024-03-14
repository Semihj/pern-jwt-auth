const express = require("express");
const pool = require("../db.js");


const router = express.Router();


router.get("/get/:id",async (req,res) => {
    
    const id = req.params.id;
    try {
        const user = await pool.query(
            "SELECT * FROM users WHERE id = $1 ",
            [id]
        )
        if(user.rows.length === 0) return res.status(404).json("User Not Found");
        const {user_password:pass,...rest} = user.rows[0];
        res.status(200).json(rest);
    } catch (error) {
        res.status(500).json(error)
    }
})
router.delete("/delete/:id",async (req,res) => {
    
    const id = req.params.id;
    try {
        const user = await pool.query(
            "DELETE FROM users WHERE id = $1 ",
            [id]
        )
        if(user.rowCount === 0 || !user ) return res.status(404).json("There is no user to delete")
        
        res.status(200).json("User successfully deleted");
    } catch (error) {
        res.status(500).json(error)
    }
})

module.exports = router;