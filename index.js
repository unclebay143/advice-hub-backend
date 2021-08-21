const express = require("express");
const cors = require("cors");
const app = express();

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// Import Routes
const adviceRoutes = require("./routes/adviceRoute");
const bookmarkRoutes = require("./routes/bookmarkRoute");
const userRoutes = require("./routes/userRoute");

// Use routes
app.use("/users", userRoutes);
app.use("/advice", adviceRoutes);
app.use("/bookmark", bookmarkRoutes);

// Handle unknown route
app.use((req, res, next) => {
  const error = new Error(
    `Sorry can't find ${req.originalUrl} on the server 😫😫`
  );
  throw error;
});

// const port = process.env.PORT || 3020;

app.listen(1111, () => {
  // console.log(`Server is 🏃‍♂️ on port ${port}
  console.log(`Server is 🏃‍♂️ on port 1111
    `);
});
