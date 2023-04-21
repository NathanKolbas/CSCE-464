<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Quiz 4-21-2023 - Nathan Kolbas</title>
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

    label {
        padding-right: 16px;
    }

    input {
        width: 100%;
    }

    td {
        padding-right: 16px;
    }
</style>
<body>
<h1>Register</h1>
<form>
    <table>
        <tr>
            <td>
                <label for="email">Email:</label>
                <input id="email" type="email" name="email">
            </td>
        </tr>
        <tr>
            <td>
                <label for="first">First:</label>
                <input id="first" type="text" name="first">
            </td>
            <td>
                <label for="last">Last:</label>
                <input id="last" type="text" name="last">
            </td>
        </tr>
        <tr>
            <td>
                <label for="phone">Phone:</label>
                <input id="phone" type="text" name="phone">
            </td>
            <td>
                <label for="address">Address:</label>
                <input id="address" type="text" name="address">
            </td>
        </tr>
    </table>
    <input style="width: auto" type="button" value="Submit" onclick="sendMessage()">
</form>
<div id="messages"></div>
</body>
<script>
    let httpRequest = null;

    function sendMessage() {
        const email = document.getElementById('email');
        const first = document.getElementById('first');
        const last = document.getElementById('last');
        const phone = document.getElementById('phone');
        const address = document.getElementById('address');

        // Change the URL
        const url = new URL(window.location.href);
        url.searchParams.set('email', email.value);
        url.searchParams.set('first', first.value);
        url.searchParams.set('last', last.value);
        url.searchParams.set('phone', phone.value);
        url.searchParams.set('address', address.value);
        window.history.replaceState(null, null, url);

        httpRequest = new XMLHttpRequest();
        httpRequest.open("POST", 'server.php', true);
        httpRequest.setRequestHeader("Accept", "application/json");
        httpRequest.setRequestHeader("Content-Type", "application/json");
        httpRequest.onreadystatechange = updatePage;
        const body = JSON.stringify({
            email: email.value,
            first: first.value,
            last: last.value,
            phone: phone.value,
            address: address.value,
        });
        httpRequest.send(body);
    }

    function updatePage() {
        if (httpRequest.readyState === 4) {
            const messages = document.getElementById('messages');
            const response = httpRequest.responseText;
            messages.innerHTML = response.toString();
        }
    }
</script>
</html>
