# csi_post_fetcher
Fetches the posts from CSI NSIT page, displays the posts and Total likes & Shares
## Setting up Locally
### Step-1
cd into the cloned directory
```
npm install
```
### Step-2: Set Up Database
Run the following commands in mysql
```
create database csidb;
use csidb;
CREATE TABLE posts(myid integer auto_increment primary key , post_id varchar(200) , message varchar(20000), time varchar(100));
```
### Step-3: Configure the Files
Go to the route/db.js
Set the username and password in dbconfig.

### Step-4
```
node server
```
The site will run on
[CSI_post_fetcher](http://localhost:5000)

Hope you like it ! :)
