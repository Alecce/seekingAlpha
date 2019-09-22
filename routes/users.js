var USER_ID = 1;

var express = require('express');
var router = express.Router();
var cookieParser = require('cookie-parser');
const config = require('config');
var mysql      = require('mysql');
var connection = mysql.createConnection(config.get("db"));


router.use(cookieParser());

/* GET users listing. */
router.get('/', function(req, res, next) {

    let user_id = req.cookies['user_id'];

    let query = "SELECT \n" +
        "    users.id,\n" +
        "    users.name,\n" +
        "    seeking_alpha_db.groups.name AS group_name,\n" +
        "    if(!ifnull(id_follow, 0), 0, count(*)) as follower_number,\n" +
        "    if(id_follower = " + user_id + ", 1, 0) as my_follow\n" +
        "FROM\n" +
        "    ((users\n" +
        "    INNER JOIN seeking_alpha_db.groups ON users.id_group = seeking_alpha_db.groups.id)\n" +
        "    left JOIN followers ON users.id = followers.id_follow)\n" +
        "\tGROUP BY users.id\n" +
        "ORDER BY users.name;"
    connection.query(query, function (error, results, fields) {
        if (error) {
            res.status(500).send('');
        } else{
            res.send(results);
        }

    });
});

// logging - you get user with id = USER_ID
router.get('/cookie', function(req, res, next) {

    res.cookie('user_id', USER_ID);
    res.send('');
});


router.post('/follow', function(req, res, next) {

    let follower = req.cookies['user_id'];
    let user = req.body.follow;

    let query = "INSERT IGNORE INTO `followers`(id_follower, id_follow) VALUES ('" + follower + "', '" + user + "');" +
        "SELECT COUNT(*) as follower_number FROM followers WHERE id_follow='" + user + "';";
    connection.query(query, function (error, results, fields) {
        if (error) {
            res.status(500).send('');
        } else{
            res.send(results[1][0]);
        }
    });
});

router.post('/unfollow', function(req, res, next) {

    let follower = req.cookies['user_id'];
    let user = req.body.unfollow;

    let query = "DELETE FROM `followers` WHERE id_follower='" + follower + "' AND id_follow='" + user + "';" +
        "SELECT COUNT(*) as follower_number FROM followers WHERE id_follow='" + user + "';";
    connection.query(query, function (error, results, fields) {
        if (error) {
            res.status(500).send('');
        } else{
            res.send(results[1][0]);
        }
    });
});

module.exports = router;
