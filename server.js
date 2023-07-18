const express = require("express")
const app = express();

app.set("view engine", "ejs")


app.get("/", (req,res) => {
    res.render("index", {text: "kenobi"})
})
const contactsRouter = require("./routes/contacts")
app.use("/contacts", contactsRouter)
app.listen(8000)
