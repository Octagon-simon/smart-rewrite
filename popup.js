document.addEventListener("DOMContentLoaded", () => {
	chrome.runtime.sendMessage({ action: "getResponse" }, (response) => {
		if (response && response.text) {
			document.getElementById("rewrittenText").textContent = response?.text;
			document.getElementById("resultsSection").style.display = "block";
		}
	});

	document.getElementById('copyText').addEventListener('click', () => {
		const text = document.getElementById('rewrittenText').textContent?.trim();
		navigator.clipboard.writeText(text).then(() => {
			alert('Text copied to clipboard');
		});
	});
});



