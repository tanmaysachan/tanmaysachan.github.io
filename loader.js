window.onload = function() {
    if (window.location.pathname.split("/").pop() === "post.html") {
        function retrieveStorage() {
            var contentLink = null;
            if (localStorage.getItem('content_link') === null) {
                console.log('waiting');
                setTimeout(retrieveStorage, 500);
            } else {
                contentLink = localStorage.getItem('content_link')
                console.log(contentLink);
            }
            return contentLink;
        }
        var contentLink = retrieveStorage();

        if (contentLink === null) {
            console.log('failure to load');
            return;
        }

        var converter = new showdown.Converter();

        // fetch and inject html
        fetch(contentLink)
        .then(res => res.text())
        .then(data => {
            var htmlContent = converter.makeHtml(data);
            var postBlock = document.getElementById("post-block");
            postBlock.insertAdjacentHTML('beforeend', htmlContent);
            furtherFormat(postBlock);
        })

    } else {

        var myList = document.getElementById("listOfPosts");

        postsUrl = "https://api.github.com/repos/tanmaysachan/tanmaysachan.github.io/contents/posts"
        rawContentUrl = "https://raw.githubusercontent.com/tanmaysachan/tanmaysachan.github.io/master/posts/"


        fetch(postsUrl)
        .then( res => res.json() )
        .then( data => {
            data.forEach(element => {
                var newListItem = document.createElement("li");
                var newListItemText = document.createTextNode(element.name);
                var newListItemText = document.createElement("a");
                newListItemText.innerText = element.name.slice(0, -3);
                newListItemText.href = "post.html";
                var contentLink = rawContentUrl + element.name;
                newListItemText.onclick = function () {
                    localStorage.setItem('content_link', contentLink);
                    console.log(localStorage.getItem('content_link'));
                }
                newListItem.appendChild(newListItemText);
                myList.appendChild(newListItem);
            });
        });
    }
}

function furtherFormat(postBlock) {
    // Find the first h1 element and colour it blue
    var firstH1 = document.getElementsByTagName("h1")[0];
    firstH1.style = "color: #1b95e0;";

    // Run katex auto-render
    window.renderMathInElement(postBlock, {
        delimiters: [
            {left: "$$", right: "$$", display: true},
            {left: "$", right: "$", display: false},
            {left: "\\(", right: "\\)", display: false},
            {left: "\\[", right: "\\]", display: true}
        ]
    });
}