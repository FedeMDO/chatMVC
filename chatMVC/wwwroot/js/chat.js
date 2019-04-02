"use strict";

var connection = new signalR.HubConnectionBuilder().withUrl("/chatHub").build();

//Disable send button until connection is established
document.getElementById("sendButton").disabled = true;

connection.on("ReceiveMessage", function (user, message) {
    // Catch clean message.
    var msg = message.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

    // Initializes
    var div1 = document.createElement('div');
    user.toLowerCase() == "me" ? div1.setAttribute('class', 'direct-chat-msg right') : div1.setAttribute('class', 'direct-chat-msg');

    var div2 = document.createElement('div');
    div2.setAttribute('class', 'direct-chat-info clearfix');

    var spanName = document.createElement('span');
    user.toLowerCase() == "me" ? spanName.setAttribute('class', 'direct-chat-name pull-right') : spanName.setAttribute('class', 'direct-chat-name pull-left');
    spanName.innerText = user;

    var spanTime = document.createElement('span');
    user.toLowerCase() == "me" ? spanTime.setAttribute('class', 'direct-chat-timestamp pull-right') : spanTime.setAttribute('class', 'direct-chat-timestamp pull-left');
    spanTime.innerText = moment().format('D MMMM YYYY, h:mm a');

    var img = document.createElement('img'); img.setAttribute('class', 'direct-chat-img');
    img.setAttribute('src', 'https://bootdey.com/img/Content/user_1.jpg');

    var div3 = document.createElement('div');
    div3.setAttribute('class', 'direct-chat-text');
    div3.innerText = msg;

    // Childs
    div1.appendChild(div2); div2.appendChild(spanName); div2.appendChild(spanTime);
    div1.appendChild(img);
    div1.appendChild(div3);

    // Clean imput
    document.getElementById("messageInput").value = "";

    // Append the parent child to chatbox node.
    document.getElementById("chatbox").appendChild(div1);

    // Reproduces sound notification
    document.getElementById("audio").play();
});

connection.start().then(function () {
    document.getElementById("sendButton").disabled = false;
}).catch(function (err) {
    return console.error(err.toString());
});

document.getElementById("sendButton").addEventListener("click", function (event) {
    var user = document.getElementById("userInput").value;
    var message = document.getElementById("messageInput").value;
    connection.invoke("SendMessage", user, message).catch(function (err) {
        return console.error(err.toString());
    });
    event.preventDefault();
});