import express from "express";
import pkg from "pg";
import dotenv from "dotenv";
import cors from "cors";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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

app.get("/getuser", async (req, res) => {
    const token = req.headers.authorization?.split(" ")[1];
    
    if (!token) {
        return res.status(401).json({ error: "No token provided" });
    }

    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        const username = decoded.username;
        res.status(200).json({ username });
    } catch (error) {
        console.error("Error verifying token:", error);
        res.status(401).json({ error: "Invalid token" });
    }
});

app.get("/groupdetails", async (req, res) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        return res.status(401).json({message: "Error Accessing token!!!"})
    }

    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        const username = decoded.username;
        const user_id = decoded.user_id

        if (username) {
            const grpResQ = `SELECT id, group_head, group_desc, group_priority, group_timestamp FROM groups WHERE user_id = ${user_id}`;
            const grpRes = await pg.query(grpResQ);
    
            if (grpRes.rows.length > 0) {
                const groups = await Promise.all(grpRes.rows.map((group) => {
                    let {id, group_head, group_desc, group_priority, group_timestamp} = group;
    
                    return {
                        id,
                        group_head,
                        group_desc,
                        group_priority,
                        group_timestamp
                    }
                }));
                res.json(groups);
            } else {
                res.status(500).json({ message: "cannot fetch group details😑, Please try again😊" });
            }
        } else {
            res.status(401).json({message : "Unauthorized user!!!"})
        }


    } catch (error) {
        res.status(500).json({ error: "An error occurred. Please try again later." });
    }
});

app.get("/taskdetails", async (req, res) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        return res.status(401).json({message: "Authentication Error⚠️ - No token provided🙄"})
    }

    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        const username = decoded.username;
        const user_id = decoded.user_id

        if (username) {
            const taskResQ = `SELECT id, task_head, task_desc, start_date, end_date, priority, status, timestamp FROM tasks WHERE user_id = ${user_id}`;
            const taskRes = await pg.query(taskResQ);
    
            if (taskRes.rows.length > 0) {
                const tasks = await Promise.all(taskRes.rows.map((task) => {
                    let {id, task_head, task_desc, start_date, end_date, priority, status, timestamp} = task;
    
                    return {
                        id,
                        task_head,
                        task_desc,
                        start_date,
                        end_date,
                        priority,
                        status,
                        timestamp
                    }
                }));
                res.json(tasks);
            } else {
                res.status(500).json({ message: "cannot fetch task details😑, Please try again😊" });
            }
        } else {
            res.status(401).json({message: "Unauthorized user!!!"})
        }


    } catch (error) {
        res.status(500).json({ error: "An error occurred. Please try again later." });
    }
})

app.get("/check-task-in-group/:taskId", async (req, res) => {
    const { task_id} = req.params;

    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        res.status(401).json({message: "Authorization Error"});
    }

    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        const username = decoded.username;
        const user_id = decoded.user_id;

        if (!username) {
            res.status(401).json({message: "Unauthorized user"})
        }

        const checkQ = `
            SELECT * FROM tasks WHERE group_id IS NULL AND user_id = $1 AND id = $2;
        `
        const checkRes = await pg.query(checkQ, [user_id, task_id]);

        if (checkRes.rows.length === 0) {
            res.json({exists: true})
        } else {
            res.json({exists: false})
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Error checking for existing tasks in group!"})
    }
})

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

        res.status(201).json({ message: "User registered successfully😎" });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Cannot register Account. PLease try again!😑" });
    }
})

app.post("/login", async (req, res) => {
    const {username, pass} = req.body;

    try {
        const user = await pg.query("SELECT id, username, password FROM users WHERE username = $1", [username]);

        

        if (user.rows.length === 0) {
            return res.status(400).json({error: "Invalid Username!!!🙄"});
        }

        const match = await bcrypt.compare(pass, user.rows[0].password);

        if (!match) {
            return res.status(400).send({error: "Incorrect Password!!!🙄"});
        }

        const token = jwt.sign({username: user.rows[0].username, user_id: user.rows[0].id}, SECRET_KEY);

        res.status(200).json({message: "Login Successful😎", token, username});

    } catch (error) {
        res.status(500).json({ message: "Error Logging in😑. PLease try again" });
    }
});

app.post("/newgroup", async (req, res) => {
    const { group_head, group_desc, group_priority } = req.body;
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        return res.status(401).json({ error: "No token provided" });
    }

    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        const username = decoded.username;
        const user_id = decoded.user_id;
        console.log(user_id);
        

        if (!username || !user_id) {
            return res.status(401).json({ error: "Unauthorized access" });
        }

        const insertGroupQuery = `
            INSERT INTO groups (user_id, group_head, group_desc, group_priority, group_timestamp)
            VALUES ($1, $2, $3, $4, CURRENT_TIMESTAMP)
        `;
        await pg.query(insertGroupQuery, [user_id, group_head, group_desc, group_priority]);

        res.status(201).json({ message: "New group added successfully! 😎" });
    } catch (error) {
        console.error("Error adding group:", error);
        res.status(500).json({ message: "Unable to add group, please try again! 😑" });
    }
});

app.post("/newtask", async (req, res) => {
    const {task_head, task_desc, priority, startdate, enddate, group_id} = req.body;
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        return res.status(401).json({message: "Authorization Failed- No token provided⚠️"});
    }

    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        const username = decoded.username;
        const user_id = decoded.user_id;

        if (!username || !user_id) {
            return res.status(401).json({message: "Access Denied - Unauthorized user⚠️"});
        }

        const insertTaskQuery = `
        INSERT INTO tasks (user_id, group_id, task_head, task_desc, priority, start_date, end_date, status, timestamp)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, CURRENT_TIMESTAMP)
        `;
        await pg.query(insertTaskQuery, [user_id, group_id || null, task_head, task_desc, priority, startdate, enddate, "pending"]);

        res.status(200).json({message: "New Task creation successful😊"});

    } catch (error) {
        console.error("Error adding task:", error);
        res.status(500).json({ message: "Unable to add task, please try again! 😑" });
    }
});

app.post("/tasklist/search", async (req, res) => {
    const token = req.headers.authorization?.split(" ")[1];
    const {query} = req.body;

    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        const username = decoded.username;
        const user_id = decoded.user_id;

        if (username) {
            const searchQ = `
                SELECT task_head FROM tasks
                WHERE LOWER(task_head) LIKE $1 AND user_id = $2
            `;
    
            const values = [`%${query.toLowerCase()}%`];
    
            const searchRes = await pg.query(searchQ, [values, user_id]);
    
            res.status(200).json(searchRes.rows);
        } else {
            res.status(401).json({message: "Unauthorized user!!!"})
        }


    } catch (error) {
        res.status(500).json({message: "Server Error😑, Error searching!!!"});
    }

});

app.post("/grouplist/search", async (req, res) => {

    const {query} = req.body;
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        res.status(401).json({message: "Authorization Error😑"});
    }

    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        const username = decoded.username;
        const user_id = decoded.user_id;

        if (username) {
            const searchQ = `
                SELECT group_head FROM groups
                WHERE LOWER(group_head) LIKE $1 AND user_id = $2
            `;
    
            const values = [`%${query.toLowerCase()}%`];
    
            const searchRes = await pg.query(searchQ, [values, user_id]);
    
            res.status(200).json(searchRes.rows);
        } else {
            res.status(401).json({message: "Unauthorized user!!!"});
        }


    } catch (error) {
        res.status(500).json({message: "Server Error😑, Error searching!!!"});
    }
});

app.post("/add-task-to-group", async (req, res) => {
    const { group_id, task_id } = req.body;
    
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        res.status(401).json({message: "Authorization Error!, No Token provided!"});
    }

    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        const username = decoded.username;
        const user_id = decoded.user_id;

        if (username) {
            const insertQ = `
                UPDATE tasks
                SET group_id = $1
                WHERE id = $2
                AND user_id = $3
                RETURNING *
            `;

            const result = await pg.query(insertQ, [group_id, task_id, user_id]);

            if (result.rowCount === 0) {
                res.status(401).json({message: "Task not Found or Unauthorized"})
            }

            res.status(200).json({message: "Task assigned to group.", task: result.rows[0]})
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to assign task to group' });
    }
})

app.delete("/groupdetails/:id", async (req, res) => {
    const {id} = req.params;
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        return res.status(401).json({message: "Error : No token provided"});
    }

    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        const username = decoded.username;
        const user_id = decoded.user_id;

        if (username) {
            await pg.query('BEGIN');
    
            await pg.query(`DELETE FROM groups WHERE id = $1 AND user_id = ${user_id}`, [id]);
    
            // await pg.query(`
            //     WITH updated_rows AS (
            //         SELECT id AS old_id, ROW_NUMBER() OVER (ORDER BY id) AS new_id FROM ${username}
            //     )
            //     UPDATE ${username}
            //     SET id = updated_rows.new_id
            //     FROM updated_rows
            //     WHERE ${username}.id = updated_rows.old_id
            // `);
    
            // await pg.query(`
            //     SELECT SETVAL(
            //         pg_get_serial_sequence('${username}', 'id'),
            //         (SELECT COALESCE(MAX(id), 1) FROM ${username}) + 1
            //     );
            // `);        
    
            await pg.query("COMMIT");
    
            res.status(200).json({message: "Group deletion Successful😊"});
        } else {
            return res.status(401).json({message: "You sneaky Bast*red you are not Authorized🫠"});
        }

    } catch (error) {
        await pg.query("ROLLBACK");
        res.status(500).json({message: "Error Deleting Group🫠"});
    }
});

app.delete("/taskdetails/:id", async (req, res) => {
    const {id} = req.params;
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        return res.status(401).json({message: "Error : No token provided"});
    }

    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        const username = decoded.username;
        const user_id = decoded.user_id;

        if (username) {
            await pg.query('BEGIN');
    
            await pg.query(`DELETE FROM tasks WHERE id = $1 AND user_id = ${user_id}`, [id]);
    
            // await pg.query(`
            //     WITH updated_rows AS (
            //         SELECT id AS old_id, ROW_NUMBER() OVER (ORDER BY id) AS new_id FROM ${username}
            //     )
            //     UPDATE ${username}
            //     SET id = updated_rows.new_id
            //     FROM updated_rows
            //     WHERE ${username}.id = updated_rows.old_id
            // `);
    
            // await pg.query(`
            //     SELECT SETVAL(
            //         pg_get_serial_sequence('${username}', 'id'),
            //         (SELECT COALESCE(MAX(id), 1) FROM ${username}) + 1
            //     );
            // `);        
    
            await pg.query("COMMIT");
    
            res.status(200).json({message: "Group deletion Successful😊"});
        } else {
            return res.status(401).json({message: "You sneaky Bast*red you are not Authorized🫠"});
        }

    } catch (error) {
        await pg.query("ROLLBACK");
        res.status(500).json({message: "Error Deleting Group🫠"});
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});