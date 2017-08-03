/**
 * Created by ParikanshAndAtikant on 01/08/2017.
 */
const router = require('express').Router();
const pathname = 'secure';
const sqll = require('./db');
const FBB = require('fb');
const path = require('path');
//CREATE TABLE posts(myid integer auto_increment primary key , post_id varchar(200) , message varchar(20000), time varchar(100))
// Check if passport has set the header or not
function checkUser(req,res, next) {
    if(req.user) {
        next();
    }
    else {
        res.redirect('/');
    }
}
router.use(checkUser);

router.get('/posts',function (req,res) {
            res.sendfile(path.join(__dirname+'\\../public_static/postdata.html'));
});

// USAGE OF FB.api
router.get('/postdata',function (req,res) {
    FBB.api("/126976547314225/posts?fields=message,full_picture,created_time,shares,likes",function (data,err) {
        if(err) throw err;
        var j=0,posts = [];
        for(j=0;j<data.data.length;j++)
        {
            var singlepost = [];
            singlepost.push(data.data[j].id);
            singlepost.push(data.data[j].message);
            singlepost.push(data.data[j].created_time);
            posts.push(singlepost);
        }
        var myquery = 'DELETE FROM posts';
        sqll.notification(myquery,function (mydata) {
            var query = 'INSERT INTO posts(post_id,message,time) VALUES ?';
            sqll.notification(query,function (dbdata) {
                res.send(data);
            },[posts]);
        });
    });
});

// Return the current user
router.get('/name',function (req,res) {
    res.send(req.user.displayName);
});

module.exports = router;