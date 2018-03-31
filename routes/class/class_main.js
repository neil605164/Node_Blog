var db = require('../../conf/dbCon.js');

module.exports = {
    basic_response: basic_response,
    getQueryResult: getQueryResult,
}

function basic_response() {
    return {
        status: 'N',
        message: '',
        data: [],
    }
}

function getQueryResult(query, parameter, callback) {
    let result = {};
    if(parameter) {
        db.query(query, parameter, function(err, rows) {
            if(err) {
                result = {
                    status: 'error',
                    result: rows
                }
                return callback(result);
            }
            if(rows.length == 0) {
                result = {
                    status: 'empty',
                    result: rows
                }
                return callback(result);
            }
            result = {
                status: 'ok',
                result: rows
            }
            return callback(result);
        })
    }else{
        db.query(query, function(err, rows) {
            if(err) {
                result = {
                    status: 'error',
                    result: rows
                }
                return callback(result);
            }
            if(rows.length == 0) {
                result = {
                    status: 'empty',
                    result: rows
                }
                return callback(result);
            }
            result = {
                status: 'ok',
                result: rows
            }
            return callback(result);
        })
    }
}