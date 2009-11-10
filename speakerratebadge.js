/*
  Speakerrate badge by Christian Heilmann
  Homepage: http://github.com/codepo8/speakerrate-badge
  Copyright (c) 2009, Christian Heilmann
  Code licensed under the BSD License:
  http://wait-till-i.com/license.txt
*/
speakerratebadge = function(){
  var config = {
    badgeID:'speakerratebadge',
    linkID:'speakerratelink',
    headerText:'Latest Comments',
    amount:10,
    styled:true
  }
  var badge = document.getElementById(config.badgeID);
  var link = document.getElementById(config.linkID);
  function init(o){
    console.log(o);
    if(o && o.headerText){
      config.headerText = o.headerText;
    }
    if(o && o.amount){
      config.amount = o.amount;
    }
    if(o && typeof o.styled != undefined){
      config.styled = o.styled;
    }
    if(badge && link){
      var speakerurl = link.getAttribute('href');
      var url ='http://query.yahooapis.com/v1/public/yql?q=select%20comment.comment%2Ccomment.talk.id%2Ccomment.talk.title%2Ccomment.commenter.name%2Ccomment.comment%20from%20xml%20where%20url%3D%22'+encodeURIComponent(speakerurl)+'%2Fcomments.xml%22&format=json&diagnostics=false&callback=speakerratebadge.seed';
      var s = document.createElement('script');
      s.setAttribute('src',url);
      document.getElementsByTagName('head')[0].appendChild(s);
      if(config.styled){
        var st = document.createElement('link');
        st.setAttribute('type','text/css');
        st.setAttribute('rel','stylesheet');
        st.setAttribute('href','http://github.com/codepo8/speakerrate-badge/raw/master/speakerrate-badge.css');
        document.getElementsByTagName('head')[0].appendChild(st);
      }
      
    }
  };
  function seed(o){
    var out = '<h4>'+config.headerText+'</h4><ul>';
    if(o.query && o.query.results && o.query.results.comments){
      var all = Math.min(o.query.results.comments.length,config.amount);
      for(var i=0,j=all;i<j;i++){
        var cur = o.query.results.comments[i];
        out += '<li><strong>'+cur.comment.commenter.name+'</strong>: '+cur.comment.comment+'<span> (about <a href="http://speakerrate.com/talks/'+cur.comment.talk.id.content+'-'+cur.comment.talk.title.toLowerCase().replace(/ /g,'-')+'">'+cur.comment.talk.title+'</a>)</span></li>';
      }
    }
    out += '</ul>';
    badge.innerHTML += out;
  };
  return{seed:seed,init:init}
}();
