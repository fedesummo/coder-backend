const express = require("express")
const router = require("./src/routes/index.js")
const path = require("path")

const app = express()
app.set('json spaces', 4)
app.use(express.json())
app.use(express.static('./public'))
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 8080

try {
    app.listen(
        PORT,
        () => console.log(`Server running on port ${PORT}`)
    )
} catch (err) {
    console.log(err)
}

app.get(
    "/",
    (req, res) => res.sendFile( path.join(`${__dirname}/public/index.html`) )
)

app.use(
    "/api/products",
    router
)