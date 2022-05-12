var template = require('./template.js');
var db = require('./db.js');
var url = require('url');
var qs = require('querystring');



exports.add=function(request,response){
    let _url = request.url;
    let queryData = url.parse(_url, true).query;

    db.query(`SELECT * FROM playlist`, function(error,playlists){
        if(error){
            throw error;
        }
        db.query(`SELECT * FROM song`,function(error2, songs){
          if(error2){
              throw error2;
          }
          
       

          let title = 'Create';
          let list = template.list(playlists);
         // var author=template.authorSelect(authors);
          var html = template.HTML(title, list,
            `
            <form action="/song/add_process/?id=${queryData.id}" method="post">
              <p><input type="text" autocomplete="off" name="title" placeholder="title">
                 <input type="text" autocomplete="off" name="singer" placeholder="singer">
                 </p>
                 <p>
                 <textarea name="description" placeholder="description" rows="10" cols="30"></textarea>
               </p>
                <p>
                <input type="submit">
                </p>
            </form>
            `,
            ``
          );
          response.writeHead(200);
          response.end(html);
        })
    
      });
}


exports.add_process=function(request,response){
    let _url = request.url;
    let queryData = url.parse(_url, true).query;

    var body = '';
    request.on('data', function(data){
        body = body + data;
    });
    request.on('end', function(){
        var post = qs.parse(body);
        if(post.title){ //title이 공백이 아닌경우만 입력한다
        db.query(`UPDATE playlist SET songcount=songcount+1 WHERE id=?`,[queryData.id]);
        db.query(`
          INSERT INTO song (title, singer, description, playlist_id) 
            VALUES(?, ?, ?, ?)`,
          [post.title, post.singer, post.description, queryData.id], 
          function(error, result){
            if(error){
              throw error;
            }
            response.writeHead(302, {Location: `/?id=${queryData.id}`});
            response.end();
          }
        )
        
        }
        else{   //title이 공백인경우
            response.writeHead(302, {Location: `/?id=${queryData.id}`});
            response.end();
        }
    });
    
}


exports.delete_process = function(request, response){
  
  var body = '';
    request.on('data', function(data){
        body = body + data;
    });
    
    request.on('end', function(){
        var post = qs.parse(body);
        
        db.query(
          `DELETE FROM song WHERE id=?`,
          [post.songid], 
          function(error1, result1){
              if(error1){
                  throw error1;
              }
      
              db.query(`UPDATE playlist SET songcount=songcount-1 WHERE id=?
                  `,
                  [post.playlistid], 
                  function(error2, result2){
                      if(error2){
                          throw error2;
                      }
                      response.writeHead(302, {Location: `/?id=${post.playlistid}`});
                      response.end();
                  }
              )
          }
      );
    });
}


exports.update = function(request, response){
  var _url = request.url;
  var queryData = url.parse(_url, true).query;
  let body = '';
  request.on('data', function(data){
      body = body + data;
  });
  request.on('end', function(){
    let post=qs.parse(body);

    db.query('SELECT * FROM playlist', function(error, playlists){
      if(error){
        throw error;
      }
      db.query(`SELECT * FROM playlist WHERE id=?`,[post.playlistid], function(error2, playlist){
        if(error2){
          throw error2;
        }
    
        db.query('SELECT * FROM song WHERE id=?',[post.songid], function(error3, song){
          if(error3){
            throw error3;
          }
          
          var list = template.list(playlists);
          var html = template.HTML(playlist[0].name, list,
            `
            <form action="/song/update_process/" method="post">
              <p><input type="text" autocomplete="off" name="title" placeholder="title" value="${song[0].title}">
                 <input type="text" autocomplete="off" name="singer" placeholder="singer" value="${song[0].singer}">
                 </p>
                 <p>
                 <textarea name="description" placeholder="description" rows="10" cols="30">${song[0].description}</textarea>
               </p>
               <input type="hidden" name="songid" value="${post.songid}">
               <input type="hidden" name="playlistid" value="${post.playlistid}">
                <p>
                <input type="submit">
                </p>
            </form>`
          );
          response.writeHead(200);
          response.end(html);
        });

      });
    });
  });

}

exports.update_process=function(request,response){
  let body='';
  request.on('data', function(data){
    body=body+data;
  });

  request.on('end', function(){
    let post=qs.parse(body);
    
    db.query('SELECT * FROM playlist', function(error, playlists){
      if(error){
        throw error;
      }
      db.query(`SELECT * FROM playlist WHERE id=?`,[post.playlistid], function(error2, playlist){
        if(error2){
          throw error2;
        }
        if(post.title){   //title 공백이 아니면 변경해줌
        db.query('UPDATE song SET title=?, singer=?, description=? WHERE id=?',
        [post.title,post.singer,post.description,post.songid], function(error3, song){
          if(error3){
            throw error3;
          }
          response.writeHead(302, {Location:`/?id=${post.playlistid}`});
          response.end();
        });
      }
      else{
          response.writeHead(404);
          response.end(`<script>alert('please insert title')</script>`);
      }
      });
    });


  });
}