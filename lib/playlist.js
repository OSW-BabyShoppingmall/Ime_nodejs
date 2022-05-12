var template = require('./template.js');
var db = require('./db.js');
var url = require('url');
var qs = require('querystring');

exports.home=function(request,response){
db.query(`SELECT * FROM playlist`, function(error,playlists){
    if(error){
        throw error;
    }
    
    var title = 'Welcome';
    var description = 'Hello, It is mudi';
    var list = template.list(playlists);
    var html = template.HTML(title, list,
      `<h2>${title}</h2>${description}`,
      `<a href="/create">Create playlist</a>`
    );
    response.writeHead(200);
    response.end(html);
  });
}


exports.page=function(request,response){
    var _url = request.url;
    var queryData = url.parse(_url, true).query;

    db.query(`SELECT * FROM playlist`,function(error,playlists){
      if(error){
        throw error;
      }
      db.query(`SELECT * FROM playlist WHERE id=?`,[queryData.id],function(error2,playlist){
        if(error2){
          throw error2;
        }

        db.query(`SELECT * FROM song WHERE playlist_id=?`,[queryData.id], function(error3, song){
          if(error3){
            throw error3;
          }
         let title=playlist[0].name;
         let body;   //플레이리스트 제목 입력
         body=template.songlist(song,playlist);
         
        
         var list = template.list(playlists);
         var html = template.HTML(title, list,
           //`<h2>${title}</h2>${description} <p>by ${playlist[0].singer}</p>`,
           `${body}`,
           ` <a href="/song/add/?id=${queryData.id}">Add song</a>
              <p></p>`
         );
         response.writeHead(200);
         response.end(html);
        });
      })
    });

     
}


exports.create=function(request,response){
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

          let html = template.HTML(title, list,
            `
            <form action="/create_process" method="post">
              <p><input type="text" autocomplete="off" name="name" placeholder="name"></p>
              <p>
                <input type="submit">
              </p>
            </form>
            `,
            `<a href="/create">Create playlist</a>`
          );
          response.writeHead(200);
          response.end(html);
        })
    
      });
}


exports.create_process=function(request,response){
    var body = '';
    request.on('data', function(data){
        body = body + data;
    });
    request.on('end', function(){
        var post = qs.parse(body);
        if(post.name.length<=30){   //name최대길이 30
        db.query(`
          INSERT INTO playlist (name) 
            VALUES(?)`,
          [post.name], 
          function(error, result){
            if(error){
              throw error;
            }
            response.writeHead(302, {Location: `/?id=${result.insertId}`});
            response.end();
          }
        )
        }
        else{
          response.writeHead(404);
          response.end(`<script>alert('please insert less than 30 letters')</script>`);
        }
    });
}


exports.update = function(request, response){
    var _url = request.url;
    var queryData = url.parse(_url, true).query;
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
            
              var list = template.list(playlists);
              var html = template.HTML(playlist[0].name, list,
                `
                <form action="/update_process" method="post">
                <p><input type="text" autocomplete="off" name="name" placeholder="name" value="${playlist[0].name}"></p>
                <p>
                <input type="hidden" name="playlistid" value="${post.playlistid}">
                <input type="submit">
                </p>
                </form>`,
                ``
              );
              response.writeHead(200);
              response.end(html);
          });
        });
    });
    
}


exports.update_process=function(request,response){
    var body = '';
      request.on('data', function(data){
          body = body + data;
      });
      request.on('end', function(){
        var post=qs.parse(body);
        if(post.name.length<=30){   //길이 제한
        db.query(`UPDATE playlist SET name=? WHERE id=?`,
        [post.name, post.playlistid],
        function(error,result){
          if(error){
            throw error;
          }
          response.writeHead(302, {Location: `/`});
          response.end();
        })
      }
      else{
        response.writeHead(404);
        response.end(`<script>alert('please insert less than 30 letters')</script>`);
      }
      });
}


exports.delete_process=function(request,response){
    var body = '';
      request.on('data', function(data){
          body = body + data;
      });
      
      request.on('end', function(){
          var post = qs.parse(body);
          db.query(`DELETE FROM playlist WHERE id=?`, [post.playlistid], function(error,result){
            if(error){
              throw error;
            }
            db.query(`DELETE FROM song WHERE playlist_id=?`,[post.playlistid],function(error2, result2){
              if(error2){
                throw error2;
              }
            });
            response.writeHead(302, {Location: `/`});
            response.end();
          })
      });
}