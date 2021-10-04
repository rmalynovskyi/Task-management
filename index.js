const express = require("express");
const sequelize = require('./models');
const cors = require("cors");
const models = require('./models/models');
const router = require('./routes');
const path = require("path");
const PORT = process.env.PORT || 5000;
const app = express();

app.use(cors())
app.use(express.json());
app.use('/api', router);

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "client", "build")))
    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "client", "build", "index.html"));
    });
}

const start = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync();
        app.listen(PORT, (req, res) => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (e) {
        console.log(e);
    }
}

start().then();