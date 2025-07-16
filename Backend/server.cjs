require("dotenv").config();
const express = require("express")
const cors = require("cors")
const path = require("path")
const connectDB = require("./config/db.cjs");
const authRoutes = require("./routes/authRoutes.cjs")
const incomeRoutes = require("./routes/incomeRoutes.cjs")
const expenseRoutes = require("./routes/expenseRoutes.cjs")

const app = express()

//Midddleware to handle CORS
app.use(
    cors({
        origin: process.env.CLIENT_URL || "*",
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"],
    })
);

app.use(express.json());

connectDB();

app.use("/api/v1/auth", authRoutes)
app.use("/api/v1/income", incomeRoutes)
app.use("/api/v1/expense", expenseRoutes)

//Server uploads folder
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=> console.log(`Server is running on port ${PORT}`));