<!DOCTYPE html>
<html>
<head>
<title>ChatBot</title>
<style>
*{
  padding:0px;
  margin:0px;
}
html {
  height:100%;
}
body{
  background-color:#ECE5DD;
  display: flex;
  flex-direction:column;
  height:100%;
}
.top div{
  display:flex;
  align-items:center;
  background-color:#EF878A;
  padding:10px;
}
.usericon{
  width:40px;
  height:40px;
  background-color:#ECE5DD;
  color:#606060;
  border-radius:50%;
  font-size:20px;
  display:flex;
  justify-content:center;
  align-items:center;
  margin:0px;
  margin-left:10px;
  border:1px solid #ECE5DD;
  padding:3px;
  font-weight:bold;
}
.usericon:active{
  transform: scale(0.9);
}
.username{
  margin-left:7px;
  font-weight:bold;
  color:#FEFEFE;
}
.messagesdiv{
  width:100%;
  height:100%;
  overflow:scroll;
  flex-grow:1;
}
.bottom{
  width:100%;
  background-color:#EF878A;
  padding:13px 0px 13px 0px;
  display:flex;
  justify-content:center;
}
.inputtext{
  float:left;
  width:55%;
  padding:12px 10px 12px 10px;
  border:none;
  border-radius:15px;
  margin-right:15px;
  outline:none;
  background-color:#ECE5DD;
  color:#606060;
}
.send{
  padding:12px 15px 12px 15px;
  background-color:#ECE5DD;
  border:none;
  border-radius:16px;
  color:#606060;
}
.send:active{
  transform: scale(1.1);
}
.receiver-container{
  border-radius: 10px 10px 0px 10px;
  background-color:#EF878A;
  color: #fff;
  padding: 10px;
  max-width: 50vw;
  float: right;
  margin: 2px 5px 2px 50vw;
  font-family: calibri;
  word-wrap: break-word;
}
.receiver-container2{
  border-radius: 10px 10px 10px 0px;
  background-color:#ECA095;
  color: #fff;
  padding: 10px;
  max-width: 50vw;
  float: left;
  margin: 2px 50vw 2px 5px;
  font-family: calibri;
  word-wrap: break-word;
}
.starttext{
  width:70%;
  color:#606060;
  padding:10px 15% 10px 15%;
  font-size:14px;
}
</style>
</head>
<body>
<div class="top">
  <div>
    <p class="usericon" >C</p>
    <p class="username">chatbot.App<br><small><span id="spanonline" >Online</span></small></p>
  </div>
</div>

<div id="messagesdivid" class="messagesdiv" >
<p class="starttext" align="center">Hello chatbot.</p>
</div>

<div class="bottom" align="center" >
  <input type="text" class="inputtext" placeholder="Type your message..." id="message_box" >
  <button class="send" onclick="send_text()">Send</button>
</div>

<script>

//Answer array
var answerlist = [ "Hello", "Okay", "I'm sorry. I don't understand.", "How are you?", "Thanks", "Good morning", "Good night", "Sorry", "Yes", "No", "I'm fine. How are you?" ]

function send_text()
{
  var x = document.getElementById("message_box").value; /* gets the textbox VALUE */
  if(x!="")
  {
    var elem = document.createElement('div'); /* creates new div element */
    var text = document.createTextNode(x); /* creates the text to put into the element */
    elem.appendChild(text); /* adds the text to the element */
    elem.className = 'receiver-container'; /* adds the class to the element */
    document.getElementById("messagesdivid").appendChild(elem); /* adds element to the body */
    //Clear message box
    document.getElementById('message_box').value = "";
    //Scroll
    document.getElementById("messagesdivid").scrollTo(0,document.getElementById("messagesdivid").scrollHeight)
    document.getElementById("spanonline").innerHTML = "Typing...";
    setTimeout(answer, 2000)//Answer time (1000 = 1 seconds)
  }
  
function answer()
{
  randomanswer = answerlist[Math.round(Math.random()*10)]
  var elem = document.createElement('div'); /* creates new div element */
  var text = document.createTextNode(randomanswer); /* creates the text to put into the element */
  elem.appendChild(text); /* adds the text to the element */
  elem.className = 'receiver-container2'; /* adds the class to the element */
  document.getElementById("messagesdivid").appendChild(elem); /* adds element to the body */
  document.getElementById("messagesdivid").scrollTo(0,document.getElementById("messagesdivid").scrollHeight)
  document.getElementById("spanonline").innerHTML = "Online";
}
}

</script>
</body>
</html>


