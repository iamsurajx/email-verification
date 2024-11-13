import express from "express";
import dotenv from "dotenv";
import DB_Connect from "./config/db.js"; // Ensure .js extension is included
import AuthRoutes from "./routes/auth.routes.js";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json())

app.get("/", (req, res) => {
    res.send("Express JS");
});

app.use('/auth', AuthRoutes);

// Call the database connection function
DB_Connect();

app.listen(PORT, () => {
    console.log(`Live http://localhost:${PORT}`);
});