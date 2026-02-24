function copyCode(friendSpan) {
    var copySpan = document.getElementById(friendSpan);
    const copyText = copySpan.innerText
    navigator.clipboard.writeText(copyText)
        .then(() => {
            alert("Copied: " + copyText);
        })
        .catch(err => {
            alert("Could not copy code, please select by hand");
        });
    }