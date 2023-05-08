const urlParams = new URLSearchParams(window.location.search);
const articleId = urlParams.get('id');

$(document).ready(function () {
    getArticle(articleId).then(article => {
        article = JSON.parse(article);
        let info = document.getElementById('info');
        let content = document.getElementById('content');

        const created = new Date(article['created']);
        info.innerHTML = `<div>
            <h4>${article['title']}</h4>
            <h6>${article['description']}</h6>
            <p>By&nbsp;<b>${article['author']}</b>&nbsp;•&nbsp;${created.toDateString()}</p>
        </div>`;

        const converter = new showdown.Converter();
        content.innerHTML = converter.makeHtml(article['content']);
    });

    loadComments();
});

function loadComments() {
    getComments(articleId).then(comments => {
        comments = JSON.parse(comments);
        console.log(comments);

        const commentsDiv = document.getElementById('comments');
        commentsDiv.innerHTML = '';

        if (comments == null || comments.length == 0) {
            commentsDiv.innerHTML = `<p class="text-center">No Comments</p>`;
        } else {
            for (const comment of comments) {
                const created = new Date(comment['created']);
                commentsDiv.innerHTML +=`<div class="my-2 px-2 mb-5">
                    <div style="font-size: 80%; display: flex">
                        By&nbsp;
                        <p class="font-weight-bold">
                            ${comment['author']}
                        </p>
                        &nbsp;•&nbsp;
                        ${created.toDateString()}
                    </div>
                    <p>
                        ${comment['comment']}
                    </p>
                </div>`;
            }
        }
    });
}

function contactResetColorAndText(id) {
    if (id == "name") {
        document.getElementById('nameLabel').innerHTML = "Name";
    } else if (id == "comment") {
        document.getElementById('commentLabel').innerHTML = "Comment";
    }
    $('#'.concat(id, 'Label')).removeClass('error');
}

function validateForm() {
    // Reset all the inputs error check
    const commentInputs = ['name', 'comment'];
    for (let i = 0; i < commentInputs.length; i++) {
        contactResetColorAndText(commentInputs[i]);
    }

    const name = document.getElementById('name');
    if (name.value == "") {
        document.getElementById('nameLabel').innerHTML = "Name cannot be empty";
        $('#nameLabel').addClass('error');
        return false;
    }
    const comment = document.getElementById('comment');
    if (comment.value == "") {
        document.getElementById('commentLabel').innerHTML = "Comment cannot be empty";
        $('#commentLabel').addClass('error');
        return false;
    }

    addComment(articleId, name.value, comment.value);

    // Reset form for another email
    $('#commentForm').closest('form').find("input[type=text], textarea").val("");
    name.focus();
    comment.focus();
    $(':focus').blur()
}

async function getArticle(id) {
    const httpRequest = new XMLHttpRequest();
    httpRequest.open("POST", './../php/articles.php', false);
    httpRequest.setRequestHeader("Accept", "application/json");
    httpRequest.setRequestHeader("Content-Type", "application/json");
    const body = JSON.stringify({
        path: '/article',
        id,
    });
    await httpRequest.send(body);
    if (httpRequest.readyState === 4) {
        console.log(httpRequest.responseText);
        return httpRequest.responseText;
    } else {
        console.log('Empty');
        return null;
    }
}

async function getComments(id) {
    const httpRequest = new XMLHttpRequest();
    httpRequest.open("POST", './../php/articles.php', false);
    httpRequest.setRequestHeader("Accept", "application/json");
    httpRequest.setRequestHeader("Content-Type", "application/json");
    const body = JSON.stringify({
        path: '/comments',
        id,
    });
    await httpRequest.send(body);
    if (httpRequest.readyState === 4) {
        console.log(httpRequest.responseText);
        return httpRequest.responseText;
    } else {
        console.log('Empty');
        return null;
    }
}

async function addComment(id, name, comment) {
    const httpRequest = new XMLHttpRequest();
    httpRequest.open("POST", './../php/articles.php', false);
    httpRequest.setRequestHeader("Accept", "application/json");
    httpRequest.setRequestHeader("Content-Type", "application/json");
    const body = JSON.stringify({
        path: '/add-comment',
        id,
        name,
        comment,
    });
    await httpRequest.send(body);
    console.log(httpRequest.responseText);
    loadComments();
}
