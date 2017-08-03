/**
 * Created by Parikansh on 02/08/2017.
 */
var globaldata;
$(function () {
    $.get('/secure/name',function (data) {
        $('#head h1').append(data);
    });
   $.get('/secure/postdata',function (mydata) {
       var i = 0,sum=0,sumshare=0;
       globaldata = mydata;

       // RENDERING THE POSTS USING jQuery

       for(i in mydata.data) {
           var j = parseInt(parseInt(i) + 1);
           if(mydata.data[i].full_picture)
               $('#left').append('<div class="post"><p class="post_heading">CSI_Post #'+j+'</p> <p class="message">'+mydata.data[i].message+'</p><center><img class="post_image" src="'+mydata.data[i].full_picture+'"> </center> <p class="likeandshare"><span id="like'+i+'" class="likes" onclick="showlikes(this)">Likes</span><span id="share'+i+'" onclick="showshares(this)" class="shares">Shares</span></p> </div>');
           else
               $('#left').append('<div class="post"><p class="post_heading">CSI_Post #'+j+'</p> <p class="message">'+mydata.data[i].message+'</p> <p class="likeandshare"><span id="like'+i+'" class="likes" onclick="showlikes(this)">Likes</span><span id="share'+i+'" onclick="showshares(this)" class="shares">Shares</span></p> </div>');
           if(mydata.data[i].likes)
            sum += mydata.data[i].likes.data.length;
           else
               $('#like'+i).css("display","none");

           if(mydata.data[i].shares)
            sumshare += mydata.data[i].shares.count;
           else
               $('#share'+i).css("display","none");
       }

        $('#stats').append('TOTAL LIKES : <span class="number">' + sum + '</span><br> TOTAL SHARES: <span class="number">'+sumshare+'</span><br>');

   });
});

function showlikes(obj) {
    var x = obj.id.replace("like",'');

    $('#stats').html('People Who liked this post: ');

    for(i=0;i<globaldata.data[x].likes.data.length;i++)
    {
        $('#stats').append('<p>'+globaldata.data[i].likes.data[i].name+'</p>');
    }
}

function showshares(obj) {
    var x = obj.id.replace("share",'');

    $('#stats').html('');
    $('#stats').append("No of Shares: " + globaldata.data[x].shares.count);
}