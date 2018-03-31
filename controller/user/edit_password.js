let classUser = require('../../routes/class/class_user');
let classMain = require('../../routes/class/class_main');
let errorCode = require('../../conf/errorcode');

function edit_password(req, res) {
    let data = {};
    let vaild = '';
    let response = classMain.basic_response();

    data.username = req.body.username;
    data.password = req.body.password;
    vaild = classUser.vaild_username(data.username);
    if(vaild) {
        response.message = errorCode[vaild];
        return res.json(response);
    }

    vaild = classUser.vaild_password(data.password);
    if(vaild) {
        response.message = errorCode[vaild];
        return res.json(response);
    }

    classUser.editPassword(data, function(err, result) {
        if(err) {
            response.message = errorCode[err];
            return res.json(response);
        }
        response.status = "Y";
        response.message = "修改密碼成功";
        res.json(response);
    })
    
}

module.exports = edit_password;