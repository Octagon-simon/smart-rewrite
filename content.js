function injectCSS() {
  const style = document.createElement('style');
  style.textContent = `
      @keyframes spinner {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
  
      .spinner-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(255, 255, 255, 0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 9999;
      }
  
      .spinner {
        width: 50px;
        height: 50px;
        border: 8px solid rgba(0, 0, 0, 0.1);
        border-top: 8px solid #000;
        border-radius: 50%;
        animation: spinner 1s linear infinite;
      }
    `;
  document.head.append(style);
}

function showSpinner() {
  // injectCSS();

  const spinnerOverlay = document.createElement('div');
  spinnerOverlay.className = 'spinner-overlay';
  const spinner = document.createElement('div');
  spinner.className = 'spinner';
  spinnerOverlay.appendChild(spinner);
  document.body.appendChild(spinnerOverlay);
}

function hideSpinner() {
  const spinnerOverlay = document.querySelector('.spinner-overlay');
  if (spinnerOverlay) {
    spinnerOverlay.remove();
  }
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "showSpinner") {
    showSpinner();
  } else if (request.action === "hideSpinner") {
    hideSpinner();
  } else if (request.action === "replaceText") {
    const selection = window.getSelection();
    if (!selection.rangeCount) return;

    const range = selection.getRangeAt(0);
    range.deleteContents();

    const textNode = document.createTextNode(request.newText);
    range.insertNode(textNode);
  }
});
