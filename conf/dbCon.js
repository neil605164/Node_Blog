var mysql = require('mysql');

var pool = mysql.createPool({
    // host : 'mysql-service',
    host : '127.0.0.1',
    port : '3307',
    user : 'root',
    password : 'qwe123',
    database : 'NodeBlog'
})

pool.getConnection(function(err, connection){
    if(err) throw err;
});

module.exports = pool;