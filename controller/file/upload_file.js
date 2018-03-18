var fs = require('fs');
var path = require('path');
var moment = require('moment');
// var formidable = require('formidable').IncomingForm();

function upload_file(req, res) {
    let file = req.body.file;
    let time = moment().valueOf();
  

    if(fs.existsSync(file)){
        let dirName = path.dirname(file);
        let extName = path.extname(file);
        let fileName = path.basename(file, extName);
        let newDirName = '/home/hsieh/Node_Blog/images/';
        let newFileName = 'New_' + fileName + '_' + time;
        let newFilePath = newDirName + newFileName + extName;

        fs.renameSync(file, newFilePath);

        res.send('upload img success');
      }else{
        console.log(file + ' 檔案不存在。');
      }
}

module.exports = upload_file