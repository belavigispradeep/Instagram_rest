const express=require("express");
const app=express();
const port=8080;
const path=require("path");

const { v4: uuidv4 } = require('uuid');

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({extended:true}));


let instagram=[
    {
        id: uuidv4(),
        username: "anu",
        image:'https://images.unsplash.com/photo-1606814893907-c2e42943c91f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Z2lybHxlbnwwfHwwfHx8MA%3D%3D',
        comment: "Elegance with an edge"
    },
    {
        id:uuidv4(),
        username:"pradeep",
        image: 'https://images.unsplash.com/photo-1519456264917-42d0aa2e0625?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        comment:"Born to stand out"
    }
];



app.get("/instagram",(req,res)=>{
    res.render("index.ejs",{instagram});
});
app.get("/instagram/new",(req,res)=>{
    res.render("new.ejs");
});
app.post("/instagram",(req,res)=>{
    let {username,image,comment}=req.body;
    let newPost={id:uuidv4(),username,image,comment};
    instagram.push(newPost);
    res.redirect("/instagram");
});
app.get("/instagram/:id",(req,res)=>{
    let {id}=req.params;
    let insta=instagram.find((insta)=>{
        return id===insta.id;
    });
    res.render("show.ejs",{insta});
});
app.patch("/instagram/:id",(req,res)=>{
    let {id}=req.params;
    let newImage = req.body.image;
    let newComment=req.body.comment;
    let insta = instagram.find((insta)=>{ return id===insta.id});
    insta.image=newImage;
    insta.comment=newComment;
    res.redirect("/instagram");
});
app.get("/instagram/:id/edit",(req,res)=>{
    let {id}=req.params;
    let insta = instagram.find((insta)=>{ return id===insta.id});
    res.render("edit.ejs",{insta});
});
app.delete("/instagram/:id",(req,res)=>{
    let {id}=req.params;
    let insta=instagram.filter((insta)=>{
        return id!==insta.id;
    });
    res.redirect("/instagram");
})


app.listen(port,()=>{
    console.log(`server is running on port ${port}`);
});