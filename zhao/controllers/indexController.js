var indexController = {};

// 引入item的数据库配置
var itemModels = require('../models/itemModels.js');

// 引入article的数据库
var articleModels = require('../models/articleModels.js');

// 引入友链的数据库配置信息
var linkModels = require('../models/linkModels.js');

// 引入添加管理员的数据库配置
var adminModels = require('../models/adminModels.js');


// 响应首页
indexController.index = function(req,res){
	itemModels.find({}).sort({order:1}).exec(function(err,data){
		if(err){
			console.log('err')
		}else{
			// 同步函数
			getArticles(0);
			function getArticles(i){
				// limit的意思是查询几条也就是显示几条
				articleModels.find({itemId:data[i]._id}).limit(3).exec(function(err,data1){
					if(err){
						console.log(err)
					}else{
						// 把查到的数据插入到前面的数组中
						data[i].articleList = data1;
						if(i<data.length-1){
							getArticles(++i);
						}else{
							linkModels.find({},function(err,links){
								if(err){
									console.log(err)
								}else{
									res.render('index',{items:data,links:links});
								}
							})
							
						}
					}
				})
			}
		}
	})
	
}


// 青春列表
indexController.qingchun = function(req,res){
	// console.log(req.params);
	// console.log(req.query);
	// itemModels.find({},function(err,data){
	// 	console.log(data)
	// 	getdata(0);
	// 	function	getdata(i){
	// 		articleModels.find({itemId:data[i]._id}).exec(function(err,data1){
	// 			console.log(data1);
	// 			res.render('list',{articles:data1})
	// 		})
	// 	}
	// })
	itemModels.find({},function(err,data){
		if(err){
			console.log(err)
		}else{
			getdata(0);
			function	getdata(i){
				articleModels.find({itemId:data[i]._id}).populate('itemId',{name:1}).exec(function(err,data1){
					console.log(data[i]._id);
					console.log(data);
					if(err){
						console.log(err)
					}else{
						
						linkModels.find({},function(err,links){
							if(err){
								console.log(err)
							}else{
								res.render('list',{items:data,articles:data1,links:links});
							}
						})
					}
					
				})
			}
		}
	})
	// itemModels.findOne({router:aiqing}).sort({order:1}).exec(function(err,data){
	// 	if(err){
	// 		console.log(err)
	// 	}else{
	// 		getArticles(0);
	// 		function getArticles(i){
	// 			articleModels.find({}).limit(1).populate('router',{aiqing:1}).exec(function(err,data1){
	// 				if(err){
	// 					console.log(err)
	// 				}else{
	// 					data[i].articleList = data1;
	// 					if(i<data.length-1){
	// 						getArticles(++i);
	// 					}else{
	// 						linkModels.find({},function(err,links){
	// 							if(err){
	// 								console.log(err)
	// 							}else{
	// 								res.render('list',{items:data,links:links});
	// 							}
	// 						})
	// 					}
	// 				}
	// 			})
	// 		}
	// 	}
	// })
}

// 臻美列表
indexController.zhenmei = function(req,res){
	console.log(req.query);
	itemModels.find({},function(err,data){
		if(err){
			console.log(err)
		}else{
			console.log('----------------------------');
			console.log(req.query.page);
			var page = req.query.page
			getdata(1);
			function getdata(i){
				articleModels.find({itemId:data[i]._id}).populate('itemId',{name:1}).exec(function(err,data1){
					// console.log(data1);
					if(err){
						console.log(err)
					}else{
						
						linkModels.find({},function(err,links){
							if(err){
								console.log(err)
							}else{
								res.render('list',{items:data,articles:data1,links:links});
							}
						})
					}
					
				})
			}
		}
	})
}


// 励志列表
indexController.lizhi = function(req,res){
	itemModels.find({},function(err,data){
		if(err){
			console.log(err)
		}else{
			console.log(data);
			getdata(2);
			function	getdata(i){
				articleModels.find({itemId:data[i]._id}).populate('itemId',{name:1}).exec(function(err,data1){
					// console.log(data1);
					if(err){
						console.log(err)
					}else{
						
						linkModels.find({},function(err,links){
							if(err){
								console.log(err)
							}else{
								res.render('list',{items:data,articles:data1,links:links});
							}
						})
					}
					
				})
			}
		}
	})
}

// 悬疑列表
indexController.xuanyi = function(req,res){
	itemModels.find({},function(err,data){
		if(err){
			console.log(err)
		}else{
			console.log(data);
			getdata(3);
			function	getdata(i){
				articleModels.find({itemId:data[i]._id}).populate('itemId',{name:1}).exec(function(err,data1){
					// console.log(data1);
					if(err){
						console.log(err)
					}else{
						
						linkModels.find({},function(err,links){
							if(err){
								console.log(err)
							}else{
								res.render('list',{items:data,articles:data1,links:links});
							}
						})
					}
					
				})
			}
		}
	})
}

// 都市列表
indexController.dushi = function(req,res){
	itemModels.find({},function(err,data){
		if(err){
			console.log(err)
		}else{
			console.log(data);
			getdata(4);
			function	getdata(i){
				articleModels.find({itemId:data[i]._id}).populate('itemId',{name:1}).exec(function(err,data1){
					// console.log(data1);
					if(err){
						console.log(err)
					}else{
						
						linkModels.find({},function(err,links){
							if(err){
								console.log(err)
							}else{
								res.render('list',{items:data,articles:data1,links:links});
							}
						})
					}
					
				})
			}
		}
	})
}

// 职场列表
indexController.zhichang = function(req,res){
	itemModels.find({},function(err,data){
		if(err){
			console.log(err)
		}else{
			console.log(data);
			getdata(5);
			function	getdata(i){
				articleModels.find({itemId:data[i]._id}).populate('itemId',{name:1}).exec(function(err,data1){
					// console.log(data1);
					if(err){
						console.log(err)
					}else{
						
						linkModels.find({},function(err,links){
							if(err){
								console.log(err)
							}else{
								res.render('list',{items:data,articles:data1,links:links});
							}
						})
					}
					
				})
			}
		}
	})
}

// 古代列表
indexController.gudai = function(req,res){
	itemModels.find({},function(err,data){
		if(err){
			console.log(err)
		}else{
			console.log(data);
			getdata(6);
			function	getdata(i){
				articleModels.find({itemId:data[i]._id}).populate('itemId',{name:1}).exec(function(err,data1){
					// console.log(data1);
					if(err){
						console.log(err)
					}else{
						
						linkModels.find({},function(err,links){
							if(err){
								console.log(err)
							}else{
								res.render('list',{items:data,articles:data1,links:links});
							}
						})
					}
					
				})
			}
		}
	})
}

// 历史列表
indexController.lishi = function(req,res){
	itemModels.find({},function(err,data){
		if(err){
			console.log(err)
		}else{
			console.log(data);
			getdata(7);
			function	getdata(i){
				articleModels.find({itemId:data[i]._id}).populate('itemId',{name:1}).exec(function(err,data1){
					// console.log(data1);
					if(err){
						console.log(err)
					}else{
						
						linkModels.find({},function(err,links){
							if(err){
								console.log(err)
							}else{
								res.render('list',{items:data,articles:data1,links:links});
							}
						})
					}
					
				})
			}
		}
	})
}


// 列表
// indexController.jiaoliu = function(req,res){
// 	itemModels.find({},function(err,data){
// 		if(err){
// 			console.log(err)
// 		}else{
// 			console.log(data);
// 			getdata(10);
// 			function	getdata(i){
// 				articleModels.find({itemId:data[i]._id}).populate('itemId',{name:1}).exec(function(err,data1){
// 					// console.log(data1);
// 					if(err){
// 						console.log(err)
// 					}else{
						
// 						linkModels.find({},function(err,links){
// 							if(err){
// 								console.log(err)
// 							}else{
// 								res.render('list',{items:data,articles:data1,links:links});
// 							}
// 						})
// 					}
					
// 				})
// 			}
// 		}
// 	})
// }


// 内容页
indexController.details = function(req,res){
	itemModels.find({},function(err,data){
		if(err){
			console.log(err)
		}else{
			linkModels.find({},function(err,links){
				if(err){
					console.log(err)
				}else{
					articleModels.findOne({_id:req.params._id},function(err,data1){
						if(err){
							console.log(err)
						}else{
							// console.log(req.params._id);
							// console.log(req.body._id);
							// console.log(data1)
							// console.log(data);
							res.render('details',{items:data,links:links,articles:data1});
							// res.send(data1);
						}
					})
				}
			})
		}
	})
	
}







// 暴露端口
module.exports = indexController;