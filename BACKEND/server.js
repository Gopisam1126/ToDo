import express from "express";
import pkg from "pg";
import dotenv from "dotenv";
import cors from "cors";
import bcrypt from "bcrypt";
import jwt  from "jsonwebtoken";

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

app.post("/register", async (req, res) => {
    const {firstname, lastname, setusername, setpass} = req.body;

    try {
        const userExists = await pg.query("SELECT username FROM users WHERE username = $1", [setusername]);

        if (userExists.rows.length > 0) {
            return res.status(400).json({error: "User Already Exists, Please Login!"});
        }

        const hashPass = await bcrypt.hash(setpass, 10);

        const insertQ = await pg.query("INSERT INTO users (username, password, firstname, lastname) VALUES ($1, $2, $3, $4)", [setusername, hashPass, firstname, lastname]);

        if (!insertQ) {
            console.log("Error Registering user!");
        }

        const createTableQ = `
            CREATE TABLE ${setusername} (
                id SERIAL PRIMARY KEY,
                task_head VARCHAR(500),
                task_desc TEXT,
                start_date DATE,
                end_date DATE,
                priority VARCHAR(50),
                status VARCHAR(50),
                timestamp TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
            )
        `;
        const userTableQ = await pg.query(createTableQ);

        if (!userTableQ) {
            console.log("Error creating user Table!");
        }

        res.status(201).json({ message: "User registered successfully" });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
})

app.post("/login", async (req, res) => {
    console.log("req.body : ", req.body);
    const {username, pass} = req.body;

    console.log("username : ", username);
    
    console.log("pass : ", pass);
    

    try {
        const user = await pg.query("SELECT username, password FROM users WHERE username = $1", [username]);

        console.log("user : ", user);
        

        if (user.rows.length === 0) {
            return res.status(400).json({error: "Invalid Username!!!"});
        }

        const match = await bcrypt.compare(pass, user.rows[0].password);

        if (!match) {
            return res.status(400).send({error: "Incorrect Password!!!"});
        }

        const token = jwt.sign({username}, SECRET_KEY, {expiresIn: "3h"});

        res.status(200).json({message: "Login Successful", token, username});

    } catch (error) {
        console.log("An error occured",error);
        res.status(500).json({ error: "Server error" });
    }
})

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});