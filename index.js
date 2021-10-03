const express = require("express");
const sequelize = require('./models');
const cors = require("cors");
const models = require('./models/models');
const router = require('./routes');
const path = require("path");
const PORT = process.env.PORT || 5000;
const app = express();
// ** MIDDLEWARE ** //
const whitelist = ['http://localhost:3000', 'http://localhost:5000',
    'https://course-project-task-management.herokuapp.com'
]
const corsOptions = {
    origin: function (origin, callback) {
        console.log("** Origin of request " + origin)
        if (whitelist.indexOf(origin) !== -1 || !origin) {
            console.log("Origin acceptable")
            callback(null, true)
        } else {
            console.log("Origin rejected")
            callback(new Error('Not allowed by CORS'))
        }
    }
}
app.use(cors(/*corsOptions*/))

app.use(express.json());
app.use('/api', router);

app.get('/port', (req, res) => {
        res.send("Server is on! Port - " + PORT);
    }
);

if (process.env.NODE_ENV === 'production') {
    // Serve any static files
    app.use(express.static(path.join(__dirname, 'client/build')));
// Handle React routing, return all requests to React app
    app.get('*', function(req, res) {
        res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
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