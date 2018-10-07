var express = require('express');
var router = express.Router();
// 引入index的控制器
var indexController = require('../controllers/indexController.js');


// 响应首页
router.get('/',indexController.index);

// 响应青春列表
router.get('/qingchun',indexController.qingchun);

// 响应臻美列表
router.get('/zhenmei',indexController.zhenmei);

// 响应友情列表
router.get('/lizhi',indexController.lizhi);

// 响应悬疑列表
router.get('/xuanyi',indexController.xuanyi);

// 响应都市列表
router.get('/dushi',indexController.dushi);

// 响应职场列表
router.get('/zhichang',indexController.zhichang);

// 响应古代列表
router.get('/gudai',indexController.gudai);

// 响应历史列表
router.get('/lishi',indexController.lishi);


// 交流论坛列表
// router.get('/jiaoliu',indexController.jiaoliu);



// 内容页
router.get('/details/:_id',indexController.details)









// 对外暴露模块
module.exports = router;
