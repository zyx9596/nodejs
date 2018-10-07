#一个简单的内容管理系统

## 用到的技术
	html  css  js
	Bootstrap 框架  
	Node.js    Express 框架  
	mongoDB		mongoose

##  后台(管理员的页面)
	
	添加管理员/登录管理员
	验证码校验
	对栏目 增 删 改 查
	对文章 增 删 改 查
	对友情链接的 增 删 改 查
	文件上传————文章的封面



### 栏目 items
		属性 		类型				描述
		_id			ObjectId		一条数据的唯一标记
		name 		String			栏目名称
		info 		String			栏目简介
		ctime		Date			栏目创建时间
		order		Number			排序


### 文章  articles
	属性 			类型				描述
	_id				ObjectId		一条数据的唯一标记
	itemId	 		ObjectId		所在栏目
	title 			String			标题
	author 			String			作者
	content 		String 			内容
	keywords		String			关键字
	description		String			描述
	imgurl			String 			封面路径
	ctime 			Date			栏目创建时间(包含默认时间)

### 友情链接 link
		属性			类型				描述
		name 		String			网站名称
		info 		String 			网站简介
		http 		String			网站地址
		order 		String			链接的地址
	
### 管理员的添加 admin
		属性			类型				描述
		name 		String			管理员的姓名
		password	String			管理员密码
		repassword	String			管理员重复密码
		info		String			管理员简介
		tel 		String			管理员电话


### 下载的模块
		1.文件上传模块
		2.监听者模块
		3.验证码模块
		4.数据库骨架(mongoose)模块
		5.百度富文本编辑器模块
		6.md5密码加密模块



## 前台(用户的页面)
	文章列表页
	详情页