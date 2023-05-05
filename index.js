import express from "express"
import bodyParser from "body-parser";
import conn from "./dbconnect.js";
import bookRouter from "./Routes/BookRouter.js";

const app = express()
conn.connect(function (err) {
    if (err) {
        throw err;
    }
    console.log("Connected to DB")
})

app.set('view engine', 'pug')
app.set('views', './view')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
app.use(express.static('public'))

app.use(bookRouter)

app.listen(3000)