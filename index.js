import express from "express"
import bodyParser from "body-parser"

const port = 3000;
const app = express();

app.use(express.static("public"));

app.get("/", (req,res)=>{
    res.render("index.ejs");
})
app.get("/create",(req,res)=>{
    var datetime= currentTime;;
    res.render("create.ejs",{datetime:datetime})
})
app.get("/about",(req,res)=>{
    res.render("about.ejs")
})
app.listen(port,()=>{
    console.log(`Server is live at port ${port}`);
})

var currentdate = new Date();
    var year = String(currentdate.getFullYear()).slice(-2); 
    var month = ("0" + (currentdate.getMonth() + 1)).slice(-2); 
    var day = ("0" + currentdate.getDate()).slice(-2); 
    var currentTime = "Date: " + year + "/" + month + "/" + day + " @ " 
    + ("0" + currentdate.getHours()).slice(-2) + ":" 
    + ("0" + currentdate.getMinutes()).slice(-2) + ":" 
    + ("0" + currentdate.getSeconds()).slice(-2);
    