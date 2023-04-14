import app from "./server.js";
import mongodb from "mongodb";
import * as dotenv from "dotenv";
import ReviewsDAO from "./dao/ReviewsDAO.js";
dotenv.config()

const MongoClient = mongodb.MongoClient;
//const mongo_username = process.env.DB_USER;
//const mongo_password = process.env.DB_PASS;
const uri = `mongodb+srv://edelaney1992:5pzp112MTVrTCykJ@cluster0.qo1ssuk.mongodb.net/test`
const port = 8000;

MongoClient.connect(
    uri,
    {
        maxPoolSize: 50,
        wtimeoutMS: 2500,
        useNewUrlParser: true
    }
).catch(err => {
    console.error(err.stack);
    process.exit(1);
}).then(async client => {
    await ReviewsDAO.injectDB(client)
    app.listen(port, () => {
        console.log(`listening on port ${port}`)
    })
})

export default MongoClient