import express from "express";
import pkg from "pg";
import dotenv from "dotenv";
import cors from "cors";
import bcrypt from "bcrypt";
import { jwt } from "jsonwebtoken";

const app = express();
const port = 3000;
const { Pool } = pkg;

dotenv.config();

const pg = new Pool({
    host: "localhost",
    port: process.env.DB_PORT,
    user: process.env.DB_USER_NAME,
    password: process.env.DB_PASS,
    database: process.env.DB_BASE,
});

pg.connect((err) => {
    if (err) {
        console.error("Database connection failed:", err.stack);
    } else {
        console.log("Connected to database");
    }
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const SECRET_KEY = process.env.SECRET_KEY;

app.post("/login", async (req, res) => {
    const {username, password} = req.body;

    try {
        const user = await pg.query("SELECT * FROM users WHERE username = $1", [username]);

        if (user.rows.length === 0) {
            return res.status(400).json({error: "Invalid Username or Password!!!"});
        }

        const match = await bcrypt.compare(password, user.rows[0].password);

        if (!match) {
            return res.status(400).send({error: "Invalid Username or Password!!!"});
        }

        const token = jwt.sign({username}, SECRET_KEY, {expiresIn: "1h"});

        res.status(200).json({message: "Login Successful", token, username});
        
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Server error" });
    }
})

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});