// 引入数据库
var mongoose = require('../configs/db_config.js');


// 建立数据库的骨架
var itemSchema = new mongoose.Schema({
	name: String,
	info:String,
	router:String,
	ctime:{
		type:Date,
		default: new Date()
	},
	order:Number
});

var itemModels = mongoose.model('item',itemSchema);


// 暴露端口
module.exports = itemModels;