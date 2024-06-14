import express from "express"
import bodyParser from "body-parser"

const port = 3000;
const app = express();

app.set('view engine', 'ejs');
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/", (req,res)=>{
    res.render("index.ejs",{posts:posts});
})

const posts = [];

app.get("/create",(req,res)=>{
    res.render("create.ejs");
})

app.post('/create',(req,res)=>{
    const post = {
        time: generateCurrentTime(),
        aurthor: req.body.postAuthor,
        heading: req.body.postHeading,
        content: req.body.postContent,
    }
    posts.push(post);
    res.redirect("/");
})

app.get("/about",(req,res)=>{
    res.render("about.ejs")
})
app.listen(port,()=>{
    console.log(`Server is live at port ${port}`);
})

function generateCurrentTime(){
    var currentdate = new Date();
    var year = String(currentdate.getFullYear()).slice(-2); 
    var month = ("0" + (currentdate.getMonth() + 1)).slice(-2); 
    var day = ("0" + currentdate.getDate()).slice(-2); 
    return "Date: " + year + "/" + month + "/" + day + " @ " 
    + ("0" + currentdate.getHours()).slice(-2) + ":" 
    + ("0" + currentdate.getMinutes()).slice(-2) + ":" 
    + ("0" + currentdate.getSeconds()).slice(-2);
}
