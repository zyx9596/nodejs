// 引入框架模块
var express = require('express');
// 定义路由
var router = express.Router();

// 引入管理员的控制器
var adminController = require('../controllers/adminController.js');



// 响应后台首页
router.get('/',adminController.index);
// 响应添加栏目的页面
router.get('/itemAdd',adminController.itemAdd);
// 栏目列表
router.get('/itemList',adminController.itemList);

// 添加栏目数据
router.post('/itemInsert',adminController.itemInsert);
// 编辑栏目数据
router.get('/itemEdit/:_id',adminController.itemEdit);
// 编辑栏目上传数据到数据库
router.post('/itemUpdateInsert',adminController.itemUpdateInsert);
// 删除栏目
router.get('/itemRemove/:_id',adminController.itemRemove);


// 添加文章页面
router.get('/articleAdd',adminController.articleAdd);
// 添加文章内容到数据库
router.post('/articleInsert',adminController.articleInsert);
// 查看文章列表
router.get('/articleList',adminController.articleList);
// 删除文章
router.get('/articleRemove/:_id',adminController.articleRemove);
// 编辑文章
router.get('/articleEdit/:_id',adminController.articleEdit);

// 修改文章封面
router.post('/articleImgUpdate',adminController.articleImgUpdate);
// 修改文章内容
router.post('/articleConUpdate',adminController.articleConUpdate);



// 友情链接
router.get('/linkAdd',adminController.linkAdd);
// 链接列表
router.get('/linkList',adminController.linkList);
// 链接信息插入数据库中
router.post('/linkInsert',adminController.linkInsert);
// 编辑友情链接
router.get('/linkEdit/:_id',adminController.linkEdit);
// 编辑链接内容
router.post('/linkUpload',adminController.linkUpload);
// 删除链接
router.get('/linkRemove/:_id',adminController.linkRemove);



// 添加管理员列表
router.get('/adminAdd',adminController.adminAdd);
// 添加管理员到数据库中
router.post('/adminInsert',adminController.adminInsert);
// 管理员列表
router.get('/adminList',adminController.adminList);
// 编辑管理员
router.get('/adminEdit/:_id',adminController.adminEdit);
// 修改管理员数据
router.post('/adminUpdate',adminController.adminUpdate);
// 删除管理员
router.get('/adminRemove/:_id',adminController.adminRemove);



// 添加管理员的验证码块
router.get('/code',adminController.code);


// 管理员登录页面
router.get('/login',adminController.adminLoginPage);
// 登录验证
router.post('/adminDoLogin',adminController.adminDoLogin);

// 管理员退出
router.get('/adminOut',adminController.adminOut);




// 管理员登录时的验证码


// 暴露路由模块
module.exports = router;
