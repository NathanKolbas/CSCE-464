<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Quiz 4-7-2023 - Nathan Kolbas</title>
</head>
<style>
    html,
    body,
    header {
        /*Fix for scroll bounce on Apple devices*/
        overscroll-behavior: none;
    }

    p {
        margin: 0;
    }
</style>
<body>
<form>
    <p>
        Please leave your message: <input id="message" type="text" name="message">
        <input type="button" value="Submit" onclick="sendMessage()">
    </p>
</form>
<div style="margin: 8px 0">
    <p>The total received messages are: <b id="counter">0</b></p>
</div>
<div id="messages"></div>
</body>
<script>
    let httpRequest = null;

    // Use a POST to increment the count
    function sendMessage() {
        const message = document.getElementById('message');

        // Change the URL
        const url = new URL(window.location.href);
        url.searchParams.set('message', message.value);
        window.history.replaceState(null, null, url);

        httpRequest = new XMLHttpRequest();
        httpRequest.open("POST", 'server.php', true);
        httpRequest.setRequestHeader("Accept", "application/json");
        httpRequest.setRequestHeader("Content-Type", "application/json");
        httpRequest.onreadystatechange = updatePage;
        const body = JSON.stringify({
            message: message.value.replaceAll(';', ''),
        });
        httpRequest.send(body);
    }

    // Use GET to just get the value
    function getMessages() {
        httpRequest = new XMLHttpRequest();
        httpRequest.open("GET", 'server.php', true);
        httpRequest.onreadystatechange = updatePage;
        httpRequest.send(null);
    }

    function updatePage() {
        if (httpRequest.readyState === 4) {
            const counter = document.getElementById('counter');
            const messages = document.getElementById('messages');
            messages.innerHTML = '';
            const phpMessages = httpRequest.responseText.split(';');
            counter.innerHTML = phpMessages.length.toString();
            for (const message of phpMessages) {
                messages.innerHTML += `<p>${message}</p>`;
            }
        }
    }

    setInterval('getMessages()', 100);
</script>
</html>
