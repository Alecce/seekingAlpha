var express = require('express');
var router = express.Router();

var cookieParser = require('cookie-parser');
var faker = require('faker');
const config = require('config');
var mysql      = require('mysql');
var connection = mysql.createConnection(config.get("db"));



router.get('/', function(req, res, next) {

    clearTables();
    generateGroups();
    generateUsers();
    generateFollows();

    res.send('DB fulfilled with 10 users and 5 groups');

});

function clearTables() {

    connection.query("DELETE from `followers`;", function (error, results, fields) {
        if (error) throw error;
    });

    connection.query("DELETE from \`users\`;", function (error, results, fields) {
        if (error) throw error;
    });

    connection.query("DELETE from \`groups\`;", function (error, results, fields) {
        if (error) throw error;
    });

}

function generateGroups() {

    for (let i = 0; i < 5; i++){
        let name = faker.random.word();
        let query = "INSERT INTO \`groups\`(id, name) VALUES ('" + (i + 1) + "', '" + name + "');";
        connection.query(query, function (error, results, fields) {
            if (error) throw error;
        });

    }
}

function generateUsers() {

    for (let i = 0; i < 10; i++){
        let name = faker.name.firstName();
        let id_group = Math.random() * 5;
        let query = "INSERT INTO \`users\`(id, name, id_group) VALUES ('" + (i + 1) + "', '" + name + "', '" + Math.ceil(id_group) + "');";
        connection.query(query, function (error, results, fields) {
            if (error) throw error;
        });

    }
}

function generateFollows() {

    for (let i = 0; i < 10; i++){
        let id_follow = Math.ceil(Math.random() * 10);
        let query = "INSERT INTO `followers`(id_follower, id_follow) VALUES ('" + (i + 1) + "', '" + id_follow + "');";
        connection.query(query, function (error, results, fields) {
            if (error) throw error;
        });

    }
}
module.exports = router;
