require('dotenv').config();

const URI = process.env.DB_URI;

const mongoose = require('mongoose');

module.exports.connectMongoose = async () => {
    try {
        // Connect to the MongoDB cluster
        mongoose.connect(
            URI,
            { useNewUrlParser: true, useUnifiedTopology: true },
            () => console.log("Mongoose is connected"),
        );
    } catch (e) {
        console.log("Cannot connect to DB!!");
    }

    const dbConnection = mongoose.connection;
    dbConnection.on("error", (err) => console.log(`Connection error ${err}`));
    dbConnection.once("open", () => console.log("Connect to DB..."));
}

