window.onload = function() {
    if (window.location.pathname.split("/").pop() === "post.html") {
        function retrieveStorage() {
            var contentLink = null;
            if (localStorage.getItem('content_link') === null) {
                console.log('waiting');
                setTimeout(retrieveStorage, 500);
            } else {
                contentLink = localStorage.getItem('content_link')
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
            furtherFormat(postBlock, contentLink.split('/').at(-1));
        })

    } else {

        var myList = document.getElementById("listOfPosts");

        postsUrl = "https://api.github.com/repos/tanmaysachan/tanmaysachan.github.io/contents/posts"
        rawContentUrl = "https://raw.githubusercontent.com/tanmaysachan/tanmaysachan.github.io/master/posts/"


        fetch(postsUrl)
        .then( res => res.json() )
        .then( data => {
            for (var i = 0; i < data.length; i++) {
                data[i].rank = parseInt(data[i].name.split('.')[0]);
            }
            // Sort by rank
            // TODO: find a better way to do this lol
            data.sort(function(a, b) {
                return b.rank - a.rank;
            });
            data.forEach(element => {
                var newListItem = document.createElement("li");
                var newListItemText = document.createTextNode(element.name);
                var newListItemText = document.createElement("a");
                // Remove the suffix and the number from the front
                newListItemText.innerText = element.name.slice(0, -3).split('.').slice(1).join('.');
                newListItemText.href = "post.html";
                var contentLink = rawContentUrl + encodeURIComponent(element.name);
                newListItemText.onclick = function () {
                    localStorage.setItem('content_link', contentLink);
                }
                newListItem.appendChild(newListItemText);
                myList.appendChild(newListItem);
            });
        });
    }
}

function furtherFormat(postBlock, postName) {
    // Find the first h1 element and colour it blue
    try{
        var firstH1 = document.getElementsByTagName("h1")[0];
        firstH1.style = "color: #1b95e0;";
    } catch(err) {
    }

    // Run katex auto-render
    try {
        window.renderMathInElement(postBlock, {
            delimiters: [
                {left: "$$", right: "$$", display: true},
                {left: "$", right: "$", display: false},
                {left: "\\(", right: "\\)", display: false},
                {left: "\\[", right: "\\]", display: true}
            ]
        });
    } catch(err) {
        console.log(err);
        console.log("Could not render math through katex");
    }

    shareable_link = "https://github.com/tanmaysachan/tanmaysachan.github.io/blob/master/posts/" + encodeURIComponent(postName);
    var shareable_tag = document.getElementById("shareable-link");
    shareable_tag.onclick = function () {
        try {
            navigator.clipboard.writeText(shareable_link);
            shareable_tag.innerText = "Copied to clipboard :)";
        } catch (err) {
            shareable_tag.innerText = "Could not copy to clipboard :(";
        }
    }
}