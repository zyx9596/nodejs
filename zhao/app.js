
// 引入模块
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');


// session存储
var session = require('express-session');

//指定路由路径 
var indexRouter = require('./routes/index');
var adminRouter = require('./routes/admin');

var app = express();

// 视图引擎设置
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cookieParser());

app.use(session({
	resave: true,  
	saveUninitialized: true, 
	secret : 'suiji',
	cookie:{
		maxAge:1000*60*30
	}
}))
// 多页面记录状态
app.use(function(req,res,next){
	// res.locals 本地存储信息的对象
	// 设置默认信息 
	res.locals.user = '';
	if(req.session.user){
		res.locals.user = req.session.user;
	}
	next();
})

// 设置静态资源库
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'uploads')));

app.use('/', indexRouter);

app.use('/admin', adminRouter);
app.use('/list', adminRouter);
app.use('/details', adminRouter);

// 404
app.use(function(req, res, next) {
  next(createError(404));
});

// 错误头
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // 响应错误页面
  res.status(err.status || 500);
  res.render('error');
});

// 对外暴露模块
module.exports = app;
