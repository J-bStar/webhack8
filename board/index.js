var dotenv = require('dotenv');
dotenv.config();

// 각종 패키지를 불러옵니다 (bodyparser, express-session, connect-mongo 등)
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var flash = require('connect-flash');
var session = require('express-session');
var passport = require('./config/passport');
const util = require('./util');
var app = express();
var MongoStore = require('connect-mongo');

// DB 설정 관련 부분입니다.
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect(process.env.MONGO_DB);
var db = mongoose.connection;
db.once('open', function(){
  console.log('DB connected');
});
db.on('error', function(err){
  console.log('DB ERROR : ', err);
});

// Passport 설정입니다.
app.use(passport.initialize());
app.use(passport.session());

// 추가적인 middle ware 입니다 (로그인 판단 여부 확인)
app.use(function(req,res,next){
  res.locals.isAuthenticated = req.isAuthenticated();
  res.locals.currentUser = req.user;
  res.locals.util = util;
  next();
});

// Routes (Express middle ware)
app.use('/', require('./routes/home'));
app.use('/posts', require('./routes/posts'));
app.use('/users', require('./routes/users'));
app.use('/recipe', util.getPostQueryString, require('./routes/recipe'));
app.use('/comments', util.getPostQueryString, require('./routes/comments'));
app.use('/files', require('./routes/files'));
app.use('/admin', require('./routes/admin'));

// 그 외 설정입니다.
// MongoStore <-> Session Storage (session 을 db에 저장시켜 session을 유지합니다 = 서버 restart를 해도 로그인이 유지됩니다)
app.set('view engine', 'ejs');
app.use(express.static(__dirname+'/public'));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'));
app.use(flash());
app.use(session({
  secret: process.env.COOKIE_SECRET,
    cookie: {
      httpOnly: true,
      secure: false, 
    }, 
  resave:true, 
  saveUninitialized:true,
  store: MongoStore.create({
    mongoUrl: 'mongodb+srv://webtest8:webtest1234~@cluster0.cmale.mongodb.net/webtest8?retryWrites=true&w=majority',
    collection: 'users'
  })
}));


// Port 설정 ('http://localhost:3000' 주소를 open 합니다.)
var port = 3000;
app.listen(port, function(){
  console.log('server on! http://localhost:'+port);
});
