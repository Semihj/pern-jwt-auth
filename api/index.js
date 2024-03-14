const express = require('express');
const authRouter = require('./routes/auth.js');
const userRouter = require('./routes/user.js');
const cors = require('cors');
const morgan = require("morgan")
require("dotenv").config()




const app = express();
app.use(cors())
app.use(morgan())
app.use(express.json());

app.use("/api/auth",authRouter)
app.use("/api/user",userRouter)

app.listen(3000,() => {
    console.log("listening on port 3000")
})