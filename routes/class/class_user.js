var db = require('../../conf/dbCon.js');
var classMain = require('./class_main');

var async = require('async');
var crypto = require('crypto');
var moment = require('moment');
var mysql = require('mysql');

module.exports = {
    register_member: register_member,
    vaild_username: vaild_username,
    vaild_password: vaild_password,
}

/**
 * 註冊會員
 * @param {} data 前傳傳遞的值
 * @param {*} callback 回傳錯誤代碼，或正確結果
 */
function register_member(data, callback) {
    let password = data.password;
    let account = data.username;
    let token = createNewToken(password);
    
    let query = "INSERT INTO `userss` SET ?";
    let parameter = {
        username: account,
        password: password,
        serverkey: token
    }

    classMain.getQueryResult(query, '', function(result) {
        if(result.status === 'error'){
            return callback('10004')
        }
        callback(null);
    })
};

/**
 * 檢查會員帳號
 * @param {*} username 會員帳號
 */
function vaild_username(username) {
    if(!username) {
        return '10001';
    }

    let regex = /^[\d|\w|_]+$/;
    if(!username.match(regex)) {
        return '10003';
    }
    return;
}

/**
 * 檢查會員密碼
 * @param {*} password 會員密碼
 */
function vaild_password(password) {
    if(!password) {
        return '10002';
    }

    let regex = /^[\d|\w|_]+$/;
    if(!password.match(regex)) {
        return '10003';
    }
    return;
}

/**
 * 加密
 * @param {*} data 須加密的值
 */
function createNewToken(data) {
    let buf = crypto.randomBytes(64).toString('base64');
    let milliseconds = moment().milliseconds();
    let new_string = buf + data + milliseconds;
    let token = crypto.createHash('sha256').update(new_string).digest('hex');

    return token;
}