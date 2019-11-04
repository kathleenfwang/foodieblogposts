var express = require('express'), 
    app = express(), 
    bodyparser = require('body-parser'),
    mongoose = require('mongoose'),
    methodOverride = require('method-override'),
    passport =require('passport'),
    User = require('./models/user'),
    secret = require('./secret'),
    LocalStrategy = require('passport-local').Strategy;

//APP CONFIG  
//mongoose.connect("mongodb://localhost/restfulblogapp"); local host only! 
mongoose.connect('mongodb://' + secret.user + ':' + secret.password + ' @ds257752.mlab.com:57752/foodieblogpost');
app.set('view engine','ejs')
app.use(express.static('public'))
app.use(bodyparser.urlencoded({extended:true}))
app.use(methodOverride("_method"))

// PASSPORT CONFIG 
app.use(require('express-session')({
    secret: "hello world",
    resave: false,
    saveUnitialize: false
}))
app.use(passport.initialize());
app.use(passport.session())
passport.use(new LocalStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

// LETTING EVERYONE USE THE USER VARIABLE. 

app.use(function(req,res,next) {
    res.locals.currentUser = req.user;
    next() // NEED THIS SO WE CAN MOVE ON TO NEXT. 
})
//MONGOOSE CONFIG 
var blogSchema = new mongoose.Schema({
    title: String,
    image: String, 
    body: String,
    created: {type:Date, default: Date.now},
    location: String, 
    desc: String,
})

var Blog = mongoose.model('Blog', blogSchema)

 

//ROUTES CONFIG

//Index: 
app.get('/', function(req,res) {
    res.render('landing')
})

app.get('/blogs', function(req,res) {
    
    Blog.find({}, function(err,blogs){
        if (err) { console.log(err) } 
        else {
            res.render('index', {blogs:blogs, currentUser: req.user})
        }
    })
    
})

//NEW
app.get('/blogs/new',isLoggedIn, function(req,res) {
    res.render('new')
    
})

//CREATE 
app.post('/blogs', isLoggedIn, function(req,res){
    Blog.create(req.body.blog, function(err,newBlog){
        if (err) { console.log(err) } 
        else {
            res.redirect('/blogs')
        }
    })
})

//SHOW 
app.get('/blogs/:id', function(req,res){
    
   Blog.findById(req.params.id, function(err,foundBlog){
       if (err) { res.redirect('/') }
       else {
           res.render('show', {blog:foundBlog})
       }
   })
})

//EDIT
app.get('/blogs/:id/edit', function(req,res){
    
    //first get the blog post to edit by id: 
    Blog.findById(req.params.id, function(err,foundBlog){
        if (err) { res.redirect('/blogs') } 
        else {
             res.render('edit', {blog:foundBlog})
        }
    })
   
})

app.put('/blogs/:id', function(req,res){
    Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err,updatedBlog){
        if (err) { console.log(err) }
        else {
            res.redirect('/blogs/' + req.params.id)
        }
    })
})

//DELETE
app.delete('/blogs/:id', function(req,res){
    Blog.findByIdAndRemove(req.params.id, function(err){
        if (err) {console.log(err) } 
        else {
            res.redirect('/blogs')
        }
    })
})

// AUTH ROUTES 
//show register form
app.get('/register', function(req,res){
    res.render('register')
})
//sign up logic 
app.post('/register', function(req,res){
    var newUser = new User({username: req.body.username})
   User.register(newUser, req.body.password, function(err,user){
       if (err) { console.log(err.message);
                     res.render('error', {message:err.message}) } 
    else {
        passport.authenticate('local')(req,res, function(){
            res.redirect('/blogs')
        })
    }
   })
})
//login
app.get('/login', function(req,res){
    res.render('login')
})
//app.post('/login', middleware, callback)
app.post('/login', passport.authenticate("local", {
    successRedirect: "/blogs", 
    failureRedirect: "/login"
}), function( req,res){
    
})

//LOGOUT 
app.get('/logout', function(req,res){
    req.logout();
    res.redirect('/blogs')
})
// CHECK IF USER IS LOGGED IN 

function isLoggedIn(req,res,next){
    if(req.isAuthenticated()) {
        return next()
    }
    else {
    res.redirect('/login')
    }
}
app.listen(process.env.PORT, process.env.IP, function() {
console.log("Starting!")
});
