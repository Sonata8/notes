document.addEventListener("DOMContentLoaded", function() {
    renderMathInElement(document.body, {
        // 匹配行内公式 $...$，块级公式 $$...$$
        delimiters: [
            {left: "$$", right: "$$", display: true},
            {left: "$", right: "$", display: false}
        ]
    });
});
