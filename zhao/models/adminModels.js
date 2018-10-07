// 引入数据库
var mongoose = require('../configs/db_config.js');


// 建立数据库的骨架
var adminSchema = new mongoose.Schema({
	name: String,
	password:String,
	repassword:String,
	info:String,
	tel:String,
	ctime:{
		type:Date,
		default: new Date()
	}
});

// 数据库模型
var adminModels = mongoose.model('admin',adminSchema);


// 暴露端口
module.exports = adminModels;
