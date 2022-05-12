var sanitizeHtml = require('sanitize-html');

module.exports = {
  HTML:function(title, list, body, control){
    return `
    <!doctype html>
    <html>
    <head>
      <title>mudi - ${title}</title>
      <meta charset="utf-8">
    </head>
    <body>
      <h1><a href="/">mudi</a></h1>
      playlist
      ${list}
      ${control}
      ${body}
    </body>
    </html>
    `;
  },list:function(playlists){
    var list = '<ul>';
    var i = 0;
    while(i < playlists.length){
      list = list + `<li><a href="/?id=${playlists[i].id}">
      ${sanitizeHtml(playlists[i].name)}(${sanitizeHtml(playlists[i].songcount)}곡)</a>
      <form style="display : inline;" method="post" action="delete_process">
      <input type="hidden" name="playlistid" value="${playlists[i].id}">
      <input type="submit" value="delete">
      </form>
      <form style="display : inline;" method="post" action="update">
      <input type="hidden" name="playlistid" value="${playlists[i].id}">
      <input type="submit" value="update">
      </form>
      </li>`;
      i = i + 1;
    }
    list = list+'</ul>';
    return list;
  },authorSelect:function(authors, author_id){
    var tag = '';
    var i = 0;
    while(i < authors.length){
      var selected = '';
      if(authors[i].id === author_id) {
        selected = ' selected';
      }
      tag += `<option value="${authors[i].id}"${selected}>${sanitizeHtml(authors[i].name)}</option>`;
      i++;
    }
    return `
      <select name="author">
        ${tag}
      </select>
    `
  },authorTable:function(authors){
    var tag = '<table>';
    var i = 0;
    while(i < authors.length){
        tag += `
            <tr>
                <td>${sanitizeHtml(authors[i].name)}</td>
                <td>${sanitizeHtml(authors[i].profile)}</td>
                <td><a href="/author/update?id=${authors[i].id}">update</a></td>
                <td>
                  <form action="/author/delete_process" method="post">
                    <input type="hidden" name="id" value="${authors[i].id}">
                    <input type="submit" value="delete">
                  </form>
                </td>
            </tr>
            `
        i++;
    }
    tag += '</table>';
    return tag;
  },

  songlist : function(song,playlist){
    let i=0;
         let body=`${playlist[0].name}<hr>`;    //플레이리스트 제목 입력
         let title,description,singer,songid,playlistid;
        
         while(i<song.length){      //song목록 불러오는과정
            if(!song[i].title)     //곡목록중에 title이 없으면 곡이 하나도 없다는 의미(title은 not null이기때문에)
            break;
            title=song[i].title;
            description=song[i].description;
            singer=song[i].singer;
            songid=song[i].id;
            playlistid=song[i].playlist_id;
            body=body+`${title}-${singer}<form method="post" style="display :inline" action="song/delete_process"> 
            <input type="hidden" name="songid" value="${songid}">
            <input type="hidden" name="playlistid" value="${playlistid}">
            <input type="submit" value="delete">
            </form> 
            <form method="post" style="display :inline" action="song/update">
            <input type="hidden" name="songid" value="${songid}">
            <input type="hidden" name="playlistid" value="${playlistid}">
            <input type="submit" value="update">
            </form>
            <p>${description}</p><hr>`;
             i++;
         }
         return body;
 }
}