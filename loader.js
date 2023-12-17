window.onload = function() {
    if (window.location.pathname.split("/").pop() != "index.html") {
        var postBlock = document.getElementById("post-block");
        var postPath = window.location.pathname;
        furtherFormat(postBlock, postPath);
    }
}

function furtherFormat(postBlock, postPath) {
    // Find the first h1 element and colour it blue
    try{
        var firstH1 = document.getElementsByTagName("h1")[0];
        firstH1.style = "color: #1b95e0;";
    } catch(err) {
    }

    // Prettify code blocks
    try{
        var codeBlocks = document.getElementsByTagName("pre");
        for (var i = 0; i < codeBlocks.length; i++) {
            codeBlocks[i].classList.add("prettyprint");
            codeBlocks[i].classList.add("code-block");
        }
        PR.prettyPrint();
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

    var shareable_tag = document.getElementById("shareable-link");
    shareable_tag.onclick = function () {
        try {
            navigator.clipboard.writeText(
                "https://tanmaysachan.github.io" + decodeURIComponent(postPath)
            );
            shareable_tag.innerText = "Copied to clipboard :)";
        } catch (err) {
            shareable_tag.innerText = "Could not copy to clipboard :(";
        }
    }
}
