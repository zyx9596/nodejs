var adminController = {};

// 引入item的数据库配置
var itemModels = require('../models/itemModels.js');

// 引入article的数据库
var articleModels = require('../models/articleModels.js');

// 引入友链的数据库配置信息
var linkModels = require('../models/linkModels.js');

// 引入添加管理员的数据库配置
var adminModels = require('../models/adminModels.js');


// admin的首页
adminController.index = function(req,res){
	// 检测有木有本地session 也就是记录状态的
	// if(!req.session.user) res.redirect('/admin/login');
	res.render('admin/index');
}

// admin添加栏目的页面
adminController.itemAdd = function(req,res){
	res.render('admin/itemAdd');
}

// amdin栏目列表
adminController.itemList = function(req,res){
	// 当前是第几页
	var page = req.query.page?req.query.page:1;
	// 每页显示多少条数据
	var pageSize = 3;
	// 一共有多少条数据
	itemModels.find({}).count(function(err,total){
		if(err){
			// 响应 报错模版
			res.render('admin/error',{errText:'数据查询失败'});			
		}else{
			// 一共多少页 ?
			var maxPage =  Math.ceil(total/pageSize);
			// 判断上一页的边界
			if(page<=1) page = 1;
			// 判断下一页的边界
			if(page>=maxPage) page = maxPage;
			// 偏移量
			var offsetPage = pageSize*(page-1);
			// 查询数据            //	分页查询					关联查询
			itemModels.find({}).sort({order:1}).exec(function(err,data){
				if(err){
					// 响应 报错模版
					res.render('admin/error',{errText:'数据查询失败'});
				}else{
					// 响应模版 分配数据
			    	res.render('admin/itemList',{items:data,page:page});	
				}
			})
		}
	})
}



// 添加栏目数据
adminController.itemInsert = function(req,res){
	// 吧数据添加到数据库中
	itemModels.create(req.body,function(err){
		if(err){
			// 数据添加失败
			console.log('数据添加失败');
		}else{
			// 添加成功
			res.render('admin/itemAdd');
		}
	})
}

// 编辑栏目数据
adminController.itemEdit = function(req,res){
	// 拿着传过来的隐藏数据到数据库中查找
	itemModels.findOne({_id:req.params._id},function(err,data){
		if(err){
			// 数据查询失败
			console.log('查询数据失败');
		}else{
			// 数据查询成功后打带着数据响应模板
			res.render('admin/itemEdit',{datas:data});
			// res.send(data);
		}
	})
}

// 编辑之后上传数据
adminController.itemUpdateInsert = function(req,res){
	// 到数据库中查询对应 的数据
	itemModels.update({_id:req.body._id},req.body,function(err){
		if(err){
			console.log('数据修改失败');
		}else{
			// 跳转到栏目列表
			res.redirect('/admin/itemList');
		}
	})
}


// 删除栏目数据
adminController.itemRemove = function(req,res){
	// 到数据库中删除相应的数据
	var page = req.query.page;
	itemModels.remove({_id:req.params._id},function(err){
		if(err){
			// 删除失败
			console.log('删除失败');
		}else{
			// 删除成功后跳转到栏目列表
			res.redirect('/admin/itemList?page='+page);

		}
	})
}


// 添加文章页面
adminController.articleAdd = function(req,res){
	// res.render('admin/articleAdd');
	itemModels.find({}).sort({order:1}).exec(function(err,data){
		if(err){
			console.log('err')
		}else{
			res.render('admin/articleAdd',{datas:data});
			// console.log(data);
		}
	})
	// res.send('ok');
}

// 添加文章内容到数据库
adminController.articleInsert = function(req,res){
	// 接收图片
	// 允许接收图片的类型
	var imgType = ['image/jpeg','image/png','image/gif'];
	// 文件的大小
	var fileSize = 1024 * 1024 * 5;
	// 文件保存的路径
	var imgPath = 'uploads';
	// 引入 图片上传 配置的模块
	var imgUpload = require('../configs/uploadImg_config.js');
	var upload = imgUpload(imgPath,imgType,fileSize).single('imgurl');
	// 图片上传
	upload(req,res,function(err){
		// console.log(req.file);
		// 如果用户没有上传图片的话，默认传一个
		if(req.file == null){
			// console.log('err');
			// return;
			req.file = {
				fieldname:'imgurl',
				originalname :'default.png',
				encoding:'7bit',
				mimetype:'image/jpeg',
				destination:'/uploads',
				filenam:'20180831-f6r2vxa.jpg',
				path:'uploads/20180831-f6r2vxa.jpg',
				size:8255
			}
			// 把图片的信息添加到 req.body 里
			// console.log(req.file)
			req.body.imgurl = req.file.originalname;
			// 添加数据到文章集合里
			articleModels.create(req.body,function(err){
				if(err){
					console.log(err);
				}else{
					// res.send('ok');
					res.redirect('/admin/articleAdd');
				}
			})
			// 走到这里已经到数据传到数据库去了，下面的代码就不需要执行了
			return;
		}
		if(err){
				res.send('图片上传失败');
		}else{
			// 把图片的信息添加到 req.body 里
			// console.log(req.file)
			req.body.imgurl = req.file.filename;
			// 添加数据到文章集合里
			articleModels.create(req.body,function(err){
				if(err){
					console.log(err);
				}else{
					// res.send('ok');
					res.redirect('/admin/articleAdd');
				}
			})
		}
		
		
	})
	
}

// 查询文章列表
adminController.articleList = function(req,res){
	// 当前是第几页
	var page = req.query.page?req.query.page:1;
	// 每页显示多少条数据
	var pageSize = 5;
	// 一共有多少条数据
	articleModels.find({}).count(function(err,total){
		if(err){
			// 响应 报错模版
			res.render('admin/error',{errText:'数据查询失败'});			
		}else{
			// 一共多少页 ? 最大页数
			var maxPage =  Math.ceil(total/pageSize);
			// 判断上一页的边界
			if(page<=1) page = 1;
			// 判断下一页的边界
			if(page>=maxPage) page = maxPage;
			// 偏移量
			var offsetPage = pageSize*(page-1);
			// itemModels.find({},function(err,data){
			// 	console.log(data);
			// })
			// 查询数据            //	分页查询					关联查询
			articleModels.find({}).limit(pageSize).skip(offsetPage).populate('itemId',{name:1}).exec(function(err,data1){
				if(err){
					// 响应 报错模版
					res.render('admin/error',{errText:'数据查询失败'});
				}else{
					// 响应模版 分配数据
					console.log(data1);
			    	res.render('admin/articleList',{articles:data1,maxPage:maxPage,page:page});	
				}

				
			})
		}
	})
}

// 响应编辑文章的页面
adminController.articleEdit =function(req,res){
	// 首先查询item数据库的所有栏目
	itemModels.find({}).sort({order:1}).exec(function(err,data){
		if(err){
			console.log('err')
		}else{
			// 查询article数据库的数据
			articleModels.findOne({_id:req.params._id},function(err,data1){
				if(err){
					console.log('err')
				}else{
					res.render('admin/articleEdit',{items:data,datas:data1});
					// console.log(req.body._id)
				}
			})
		}
	})
}

// 删除文章
adminController.articleRemove = function(req,res){
	// 查询对应的文章的id值
	// console.log(req.query.page);
	var page = req.query.page;
	articleModels.remove({_id:req.params._id},function(err){
		if(err){
			console.log(err)
		}else{
			res.redirect('/admin/articleList?page='+page);
		}
	})
}


// 修改文章的封面
adminController.articleImgUpdate = function(req,res){
	// 允许接收图片的类型
	var imgType = ['image/jpeg','image/png','image/gif'];
	// 文件的大小
	var fileSize = 1024 * 1024 * 5;
	// 文件保存的路径
	var imgPath = 'uploads';
	// 引入 图片上传 配置的模块
	var imgUpload = require('../configs/uploadImg_config.js');
	var upload = imgUpload(imgPath,imgType,fileSize).single('imgurl');
	// 图片上传
	upload(req,res,function(err){
		if(err){
			res.send('图片上传失败');
		}else{
			// console.log(req.body);
			// 添加数据到文章集合里
			articleModels.update({_id:req.body._id},{$set:{imgurl:req.file.filename}},function(err){
				if(err){
					// 响应 报错模版
					res.render('admin/error',{errText:'文章封面修改失败'});
				}else{
					// 跳转到文章列表
					res.redirect('/admin/articleList');
				}
			});
		}
	})
}

// 修改文章的内容
adminController.articleConUpdate = function(req,res){
	// console.log(req.body);
	articleModels.update({_id:req.body._id},{$set:req.body},function(err){
		if(err){
			console.log(err)
		}else{
			res.redirect('/admin/articleList');
		}
	})
}


// 友情链接添加
adminController.linkAdd = function(req,res){
	res.render('admin/linkAdd');
}

// 友链列表
adminController.linkList = function(req,res){
	linkModels.find({}).sort({order:1}).exec(function(err,data){
		if(err){
			console.log(err)
		}else{
			res.render('admin/linkList',{links:data});
		}
	})
	
}

// 友链信息插入到数据库中
adminController.linkInsert = function(req,res){
	linkModels.create(req.body,function(err){
		if(err){
			console.log(err)
		}else{
			res.redirect('/admin/linkAdd');
			// console.log(req.body);
		}
	})
}

// 跳转编辑友链页面
adminController.linkEdit = function(req,res){
	// 先去数据库查询数据
	// console.log(req.params._id);
	linkModels.findOne({_id:req.params._id},function(err,data){
		if(err){
			console.log(err)
		}else{
			res.render('admin/linkEdit',{links:data});
		}
	})
	
}


// 修改友链内容
adminController.linkUpload = function(req,res){
	linkModels.update({_id:req.body._id},{$set:req.body},function(err){
		if(err){
			console.log(err)
		}else{
			res.redirect('/admin/linkList');
		}
	})
}


// 删除友链
adminController.linkRemove = function(req,res){
	linkModels.remove({_id:req.params._id},function(err){
		if(err){
			console.log(err)
		}else{
			res.redirect('/admin/linkList');
		}
	})
}


// 验证码块
adminController.code = function(req,res){

	// 生成验证码数字
	var code = parseInt(Math.random()*9000+1000);
	// 把验证的数据储存 在 session 里
	
	req.session.code = code;

	console.log('---------');
	console.log(code);

	// 引入验证码模块
	var captchapng = require('captchapng');

	// 生成验证码
    var p = new captchapng(80,20,code); // width,height,numeric captcha
    p.color(0, 0, 0, 0);  // First color: background (red, green, blue, alpha)
    p.color(80, 80, 80, 255); // Second color: paint (red, green, blue, alpha)
    var img = p.getBase64();
    var imgbase64 = new Buffer(img,'base64');
    
    res.send(imgbase64);
}


// 跳转添加管理页面
adminController.adminAdd = function(req,res){
	res.render('admin/adminAdd');
}

// 插入管理员数据
adminController.adminInsert = function(req,res){
	console.log(req.session);
	console.log(req.body);
	console.log(req.session.code);
	// 判断验证码的值是否和上传的值一致
	if(req.body.code != req.session.code){
		res.send('验证码错误');
		return;
	}
	// 引入 md5 加密模块
	var md5 = require('md5'); 

	req.body.name = req.body.name.trim();
	req.body.password = md5(req.body.password.trim());
	req.body.repassword = md5(req.body.repassword.trim());

	// 把数据插入到数据库中
	adminModels.create(req.body,function(err){
		if(err){
			console.log(err)
		}else{
			res.redirect('/admin/adminAdd');
		}
	})
}

// 管理员列表
adminController.adminList = function(req,res){
	adminModels.find({},function(err,data){
		if(err){
			console.log(err)
		}else{
			res.render('admin/adminList',{datas:data});
		}
	})
}

// 跳转到编辑管理员的页面
adminController.adminEdit = function(req,res){
	adminModels.findOne({_id:req.params._id},function(err,data){
		if(err){
			console.log(err)
		}else{
			res.render('admin/adminEdit',{admins:data});
		}
	})
}

// 修改管理员的数据
adminController.adminUpdate = function(req,res){
	adminModels.update({_id:req.body._id},{$set:req.body},function(err){
		if(err){
			console.log('err')
		}else{
			res.redirect('/admin/adminList');
		}
	})
}


// 删除管理员账户
adminController.adminRemove = function(req,res){
	adminModels.remove({_id:req.params._id},function(err){
		if(err){
			console.log(err)
		}else{
			res.redirect('/admin/adminList');
		}
	})
}



// 管理员登录页面
adminController.adminLoginPage = function(req,res){
	res.render('admin/login');
	// res.send('ok');
}

// 管理员登录验证
// adminController.adminDoLogin = function(req,res){
// 	// res.send('ok');
// 	console.log(req.session);
// 	console.log(req.body);
// }
adminController.adminDoLogin = function(req,res){

	console.log('++++++++++++++==')
	console.log(req.session.code);
	console.log(req.body.code)

	// // 先判断code的值
	if(req.body.code != req.session.code){
		// console.log(req.session.code)
		// return;
		res.send('验证码不正确');
	}else{
		// res.send('ok');
		res.render('admin/index');
	}

	// 引入 md5 加密模块
	var md5 = require('md5');

}

// 管理员退出
adminController.adminOut = function(req,res){
	req.session.user = null;
	// 跳转到登录页面
	res.redirect('/admin/login');
}






// 暴露模块
module.exports = adminController;