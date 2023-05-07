const express=require("express");
const mongoose=require("mongoose");
const dbConfig=require("./config/db.config");
const app=express();

// Middleware For applying ------------------>
app.use(express.json());

// Plugging The Routes----------------------->
require("./routes/userRoute")(app);

app.listen(5678,()=>{
    console.log("Server Started at Port Number 5678");
})


// To connect to the databse
const connectionOptions = { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false };
mongoose.connect(dbConfig.DB_URL || process.env.MONGODB_URI);

const DB=mongoose.connection;

DB.on("error", () => {
    console.log("Error while connecting to the database");
  });
  DB.once("open", () => {
    console.log("Successfully connected to the database");
  });