const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
require('dotenv').config()


app.use("/uploads", express.static("uploads"));


app.use(express.json());
app.use(cors());

// Routes

app.use("/auth", require("./routes/authRoutes"));
app.use("/", require("./routes/courseRoute"));
// app.use("/profile", require("./routes/profileRoute"));
// app.use("/users", require("./routes/userRoute"));
app.use("/enroll-course", require("./routes/enrollRoute"));

// Database and server created

const PORT = process.env.PORT || 8000;
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database connected...");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
    console.log("Error occurred");
  });