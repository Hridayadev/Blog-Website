import express from "express"
import bodyParser from "body-parser"

const port = 3000;
const app = express();

app.get("/", (req,res)=>{
    res.render("index.ejs");
})
app.get("/about",(req,res)=>{
    res.render("about.ejs")
})
app.get("/contact",(req,res)=>{
    res.render("contact.ejs")
})
app.listen(port,()=>{
    console.log(`Server is live at port ${port}`);
})