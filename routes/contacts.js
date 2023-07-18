"use strict"
const express = require("express")
const router = express.Router()

router.use(express.urlencoded({extended: true})); 
router.use(express.json());
let contacts = [
    {first: "John", last: "Wick", email: "johnwick@hitman.com", id: 1},
    {first: "Peter", last: "Griffin", email: "petahgrif1234@griffy.com", id: 2}
]

let nextId = contacts.length+1
router.get("/", (req,res) => {
    res.render("contacts", {contacts: contacts})
    //console.log(contacts)
})

router.get("/addContact", (req,res,next) =>{
    const contact = false
    res.render("addContact",{
    title: "Add Contact",
    contact,
    partials: { content: "addContact"}
    })
})

router.post("/addContact",(req,res,next) =>{
    //console.log("called", req.body)
    req.body.id = nextId++
    contacts.push(req.body)
    res.writeHead(301,{location: "/contacts"})
    res.end()
})

router.get("/deleteContact/:id", (req,res) =>{
    contacts = contacts.filter(c => c.id !== +req.params.id);
    res.writeHead(301, {location: "/contacts"})
    console.log(req.params.id)
    res.end()
})

router.get("/editContact/:id", (req,res) =>{
    const contact = contacts.find(c => c.id === +req.params.id)
    res.render("addContact",{
        title: "Edit Contact",
        contact,
        partials: { content: "addContact"}
        })
})

router.post("/editContact/:id", (req,res)=>{
    contacts[req.params.id - 1].first = req.body.first
    contacts[req.params.id - 1].last = req.body.last
    contacts[req.params.id - 1].email = req.body.email
    res.writeHead(301, {location: "/contacts"})
    res.end()
})
module.exports = router