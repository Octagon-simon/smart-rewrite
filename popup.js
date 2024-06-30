document.getElementById('copyText').addEventListener('click', () => {
    const text = document.getElementById('rewrittenText').textContent;
    navigator.clipboard.writeText(text).then(() => {
        alert('Text copied to clipboard');
    });
});
