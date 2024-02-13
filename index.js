const express = require("express")
const app = express()
const port = 3000
const dbJSON = require("./db.json")
const fs = require("fs")

app.set("view engine", "ejs")

app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.get("/", (req, res) => {
    // res.send("Hello App")
    res.render("index", {
        success:req.query.success || ""
    })
})

app.post("/contact", (req, res) => {
     dbJSON.push({
        ...req.body,
        id:dbJSON.length+1,
        isContacted:false

    })

    fs.writeFileSync("db.json", JSON.stringify(dbJSON))

    res.redirect(`/?success=true`)
   
})


app.listen(port, () => {
    console.log(`App is listening on ${port}.`);
})
