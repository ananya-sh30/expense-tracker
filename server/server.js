const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { Client } = require('pg');

const app = express();
app.use(cors());

const port = process.env.PORT || 3002;
app.use(bodyParser.json());

const db = new Client({
    user: "postgres",
    host: "localhost",
    database: "expense",
    password: "me@postgres30",
    port: 5432,
});
db.connect();

app.post("/register", async(req, res)=>{
    const {name, email, password} = req.body;
    if (!email || !password) {
        return res.status(400).json({ error: "Email and password are required." });
    }
    try{
        const result = await db.query("SELECT * FROM users WHERE email = $1", [email]);
        if (result.rows.length > 0) {
            return res.status(400).json({ error: "User already exists." });
        }
        await db.query("INSERT INTO users (email, password, name) VALUES ($1, $2, $3)", [email, password, name]);
        res.status(200).json({ message: "User registered successfully!" });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: "An error occurred while registering the user." });
    }
    
});

app.post("/sign", async(req, res)=>{
    const {email, password} = req.body;
    if (!email || !password) {
        return res.status(400).json({ error: "Email and password are required." });
    }
    try{
        const result = await db.query("SELECT * FROM users WHERE email = $1", [email]);
        if (result.rows.length > 0) {
            if(result.rows[0].password === password){
                const user = result.rows[0].name;
                return res.status(200).json({ 
                    message: "User logged in successfully!" ,
                    user: user
                });
            }
        }
        else{
            return res.status(500).json({ message: "Incorrect email/password! Please Try Again" });
        }
        
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ error: "An error occurred while registering the user." });
    }
    
});
app.post("/addExpense", async(req, res)=>{
    const {formData, userEmail} = req.body;
    const {amount, category, date, area, location, description} = formData;
    if (!formData || !userEmail) {
        return res.status(400).json({ error: "All fields are required." });
    }
    try{
        const result = await db.query("SELECT email FROM users WHERE email = $1", [userEmail]);
        if (result.rows.length === 0) {
            return res.status(400).json({ error: "User does not exists." });
        }
        const locationResult = await db.query(
            "SELECT latitude, longitude FROM ncr WHERE area = $1 AND location ILIKE $2",
            [area, `%${location}%`] 
        );
        if (locationResult.rows.length === 0) {
            return res.status(400).json({ error: "Invalid area or location provided." });
        }
        const { latitude, longitude } = locationResult.rows[0];

         await db.query(
            `INSERT INTO expenses (email, amount, category, date, location, description, area, latitude, longitude) 
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
            [userEmail, amount, category, date, location, description, area, latitude, longitude]
        );
        res.status(200).json({ message: "Expense Registered Successfully" });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: "An error occurred while registering the expense. Try Again." });
    }
    
});
app.get('/locations', async (req, res) => {
    const { email } = req.query;  
  
    try {
      const query = 'SELECT latitude, longitude, area, description, location, date FROM expenses WHERE email = $1';
      const values = [email];
      const result = await db.query(query, values);
      res.json(result.rows);
    } catch (err) {
      console.error(err);
      res.status(500).send('Error querying database');
    }
  });
  app.get('/getInfo', async (req, res) => {
    const { email } = req.query;  
    try {
      const query = 'SELECT amount, date, area, description, location FROM expenses WHERE email = $1';
      const values = [email];
      const result = await db.query(query, values);
      res.json(result.rows);
    } catch (err) {
      console.error(err);
      res.status(500).send('Error querying database');
    }
  });
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
  