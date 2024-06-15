import express from "express"
import bodyParser from "body-parser"
import fs from "fs";
import path from "path";
import { fileURLToPath } from 'url';


const port = 3000;
const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set('views', path.join(__dirname, 'views'));
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
    const code = Math.floor(1000+ Math.random()*9000);
    const post = {
        time: generateCurrentTime(),
        aurthor: req.body.postAuthor,
        heading: req.body.postHeading,
        content: req.body.postContent,
        code: code
    }
    posts.push(post);

    fs.appendFileSync('codes.txt', `Post: ${post.heading}, Code: ${code}\n`, 'utf-8');
    res.send(`<script>alert("You have to remember this code if you want to edit or delete the post in the future: ${code}"); window.location.href="/";</script>`);
    // here
   
})

app.get('/edit/:index', (req, res) => {
    const postIndex = req.params.index;
    const code = req.query.code;

    if (postIndex >= 0 && postIndex < posts.length) {
        if (posts[postIndex].code == code) {
            res.render('edit.ejs', { postIndex: postIndex, post: posts[postIndex], code: code });
        } else {
            res.send("<script>alert('Wrong code'); window.location.href='/';</script>");
        }
    } else {
        res.status(404).send("Post not found");
    }
});

app.post('/update/:index', (req, res) => {
    const postIndex = req.params.index;
    const code = req.body.code;

    if (postIndex >= 0 && postIndex < posts.length) {
        if (posts[postIndex].code == code) {
            // Update the post with new values
            posts[postIndex].aurthor = req.body.postAuthor;
            posts[postIndex].heading = req.body.postHeading;
            posts[postIndex].content = req.body.postContent;

            // Redirect to homepage
            res.redirect("/");
        } else {
            res.send("<script>alert('Wrong code'); window.location.href='/';</script>");
        }
    } else {
        res.status(404).send("Post not found");
    }
});

app.post('/delete/:index', (req, res) => {
    const postIndex = req.params.index;
    const code = req.body.code;
    if (postIndex >= 0 && postIndex < posts.length) {
        if(posts[postIndex].code==code){
            posts.splice(postIndex, 1);
            res.redirect("/");
        }else{
            res.send("<script>alert('Wrong code'); window.location.href='/';</script>");
        }
    } else {
        res.status(404).send("Post not found");
    }
});



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
