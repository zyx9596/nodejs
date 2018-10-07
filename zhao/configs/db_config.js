// 引入mogoose模块
var mongoose = require('mongoose'); 

// 数据库地址
var dburl = 'mongodb://localhost:27017/jiner';

// 连接数据库
mongoose.connect(dburl,function(err){
	if(err){
		console.log('连接数据库失败');
	}else{
		console.log('数据连接成功');
	}
})



// 暴露数据库端口
module.exports = mongoose;

