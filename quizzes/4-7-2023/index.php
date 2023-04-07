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
</style>
<body>
<form>
    <p>
        Please leave your message: <input id="message" type="text" name="message">
        <input type="button" value="Submit" onclick="incrementCounter()">
    </p>
</form>
<p>The total received messages are: <b id="counter">0</b></p>
</body>
<script>
    let httpRequest = null;

    // Use a POST to increment the count
    function incrementCounter() {
        const message = document.getElementById('message');

        // Change the URL
        const url = new URL(window.location.href);
        url.searchParams.set('message', message.value);
        window.history.replaceState(null, null, url);

        httpRequest = new XMLHttpRequest();
        httpRequest.open("POST", 'counter.php', true);
        httpRequest.onreadystatechange = updatePage;
        httpRequest.send(null);
    }

    // Use GET to just get the value
    function getCounter() {
        httpRequest = new XMLHttpRequest();
        httpRequest.open("GET", 'counter.php', true);
        httpRequest.onreadystatechange = updatePage;
        httpRequest.send(null);
    }

    function updatePage() {
        if (httpRequest.readyState == 4) {
            const counter = document.getElementById('counter');
            counter.innerHTML = httpRequest.responseText;
        }
    }

    setInterval('getCounter()', 100);
</script>
</html>
