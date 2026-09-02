(() => {
  let currentVideoId = null;
  let chatClosed = false;

  function getVideoId() {
    const params = new URLSearchParams(window.location.search);
    return params.get("v");
  }

  function queryShadow(root, selector) {
    let el = root.querySelector(selector);
    if (el) return el;
    for (const child of root.querySelectorAll("*")) {
      if (child.shadowRoot) {
        el = queryShadow(child.shadowRoot, selector);
        if (el) return el;
      }
    }
    return null;
  }

  function closeChat() {
    const container = queryShadow(document, "#close-button");
    if (container) {
      const btn = container.querySelector("button[aria-label='Close']");
      if (btn) {
        btn.click();
        return true;
      }
    }
    for (const iframe of document.querySelectorAll("iframe")) {
      try {
        const doc = iframe.contentDocument;
        if (!doc) continue;
        const ic = queryShadow(doc, "#close-button");
        if (ic) {
          const ib = ic.querySelector("button[aria-label='Close']");
          if (ib) {
            ib.click();
            return true;
          }
        }
      } catch (e) {}
    }
    return false;
  }

  function checkAndClose() {
    const videoId = getVideoId();
    if (videoId && videoId !== currentVideoId) {
      currentVideoId = videoId;
      chatClosed = false;
    }

    if (!chatClosed && closeChat()) {
      chatClosed = true;
    }
  }

  const observer = new MutationObserver(() => checkAndClose());
  observer.observe(document.body, { childList: true, subtree: true });

  checkAndClose();
})();
