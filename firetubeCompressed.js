var myApp=angular.module("firetube",["firebase"]);myApp.constant("FIREBASE_URL","https://angular-projectapp.firebaseio.com/");function mainController(c,e,f){var b=new Firebase(f+"todo/");c.todos=e(b);c.addTodo=function(){var g=new Date().valueOf();var h=new Firebase(f+"todo/"+g);var i=({deadline:c.todoDeadline,done:false,estimate:c.todoTime,id:g,name:c.todoMember.fname,text:c.todoText,timestamp:new Date(c.todoDeadline).getTime()/1000});e(h).$set(i);c.todoDeadline="";c.todoText="";c.todoTime="";c.todoMember=""};c.updateTodo=function(g){var h=new Firebase(f+"todo/"+g.id);e(h).$set({deadline:g.deadline,done:g.done,estimate:g.estimate,id:g.id,name:g.name,text:g.text,timestamp:g.timestamp});if(g.done==true){console.log("Its true")}else{console.log("Its false")}};c.removeTodo=function(g){if(g.id==undefined){return}c.todos.$remove(g.id)};var a=new Firebase(f+"message/");c.messages=e(a);c.addMessage=function(){var m=new Date().valueOf();var g=new Firebase(f+"message/"+m);var o=new Date();var j=o.getFullYear();var i=o.getMonth()+1;var p=o.getDate();var h=o.getHours();var k=o.getMinutes();var l=o.getSeconds();if(i<10){i="0"+i}if(p<10){p="0"+p}if(h<10){h="0"+h}if(k<10){k="0"+k}if(l<10){l="0"+l}var n=j+"-"+i+"-"+p+"  "+h+":"+k+":"+l;if(c.newMessage!=""&&c.member!=""){e(g).$set({id:m,body:c.newMessage,date:n,from:c.MemberDiscussion.fname});c.newMessage="";c.MemberDiscussion=""}};c.removeMessage=function(g){if(g.id==undefined){return}c.messages.$remove(g.id)};var d=new Firebase(f+"member/");c.members=e(d);c.addMember=function(){var i=new Date().valueOf();var h=new Firebase(f+"member/"+i);var g=({id:i,fname:c.fname,lname:c.lname,username:c.username,password:c.password});c.fname="";c.lname="";c.username="";c.password="";e(h).$set(g)};c.removeMember=function(g){if(g.id==undefined){return}c.members.$remove(g.id)}};