require("dotenv").config();
const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");
const logger = require("./middleware/logger");
const errorHandler = require("./middleware/errorHandler");

const alertRoutes = require("./routes/alertRoutes");

const app = express();

connectDB();

app.use(cors());
app.use(express.json());
app.use(logger);

app.use("/alerts", alertRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
