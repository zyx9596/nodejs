// 引入数据库配置
var	mongoose = require('../configs/db_config.js');

// 设置文章数据库的骨架
var articleSchema = new mongoose.Schema({
	itemId:{
		type :'ObjectId',
		// 查询关联的集合
		ref :'item'
	},
	// 标题
	title:String,
	// 作者
	author :String,
	// 关键字
	keywords	:String,
	//描述 
	description	:String,
	//封面路径 
	imgurl		:String, 
	// 内容	
	content 	:String, 
	ctime: {
		type: Date,		
		default: new Date()
	}
})


// 数据库模型
var articleModels = mongoose.model('article',articleSchema);


// 暴露端口
module.exports = articleModels;

