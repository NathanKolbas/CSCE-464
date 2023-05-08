$(document).ready(function () {
    // Setup the most recent article
    getArticles().then(articles => {
        articles = JSON.parse(articles);
        let root = document.getElementById('root');

        for (const article of articles) {
            const created = new Date(article['created']);
            root.innerHTML +=`<div class="card">
                <a href="./../article/index.html?id=${article['id']}">
                    <div class="mask waves-effect rgba-white-slight">
                        <div class="text-black d-flex align-items-center py-2 px-3">
                            <div>
                                <h4 class="mb-0 mt-2 font-weight-bold">
                                    ${article['title']}
                                </h4>
                                <div class="mt-3 px-2">
                                    ${article['description']}
                                </div>
                                <div class="mt-3 px-2">
                                    <div style="font-size: 80%; display: flex">
                                        By&nbsp;
                                        <p class="font-weight-bold">
                                            ${article['author']}
                                        </p>
                                        &nbsp;•&nbsp;
                                        ${created.toDateString()}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </a>
            </div>`;
        }
    });
});

async function getArticles() {
    httpRequest = new XMLHttpRequest();
    httpRequest.open("POST", './../php/articles.php', false);
    httpRequest.setRequestHeader("Accept", "application/json");
    httpRequest.setRequestHeader("Content-Type", "application/json");
    const body = JSON.stringify({
        path: '/articles',
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
