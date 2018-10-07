// 引入数据库
var mongoose = require('../configs/db_config.js');


// 建立数据库的骨架
var linkSchema = new mongoose.Schema({
	name: String,
	info:String,
	http:String,
	ctime:{
		type:Date,
		default: new Date()
	},
	order:Number
});

// 搭建数据库模型
var linkModels = mongoose.model('link',linkSchema);


// 暴露端口
module.exports = linkModels;