/**
 * Created by ParikanshAndAtikant on 01/08/2017.
 */
var mysql = require('mysql');

var dbconfig = {
    host : 'localhost',
    user : 'username',
    password : 'password',
    database: 'csidb'
};

function Notifications(query,cb,param) {
    var connection = mysql.createConnection(dbconfig);
    connection.connect();
    connection.query(query,param,function (err,data) {
        if(err) throw err;
        cb(data);
        console.log(data);
        connection.end();
    });
}
module.exports =   {
    notification : Notifications
};
