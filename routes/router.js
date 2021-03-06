var express = require('express');
var router = express.Router();

var include = require('./include');

// 1. 取檔案路徑
// 2. 檢查檔案是否存在
// 3. 取檔案名稱 + 更改檔案名稱
// 4. 定義新路徑（存放心檔案）
// 5. 寫入新路徑
router.get('/', function (req,res) { res.render('index.pug') });
router.post('/register_member', include.register_member);
router.post('/upload_file', include.upload_file);
router.post('/edit_password', include.edit_password);

module.exports = router;