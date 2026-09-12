document.addEventListener("yt-page-data-fetched", (evt) => {
  const renderer =
    evt.detail?.pageData?.response?.contents
      ?.twoColumnWatchNextResults?.conversationBar?.liveChatRenderer;
  if (!renderer) return;
  renderer.initialDisplayState = "LIVE_CHAT_DISPLAY_STATE_COLLAPSED";
  const toggle = renderer.showHideButton?.toggleButtonRenderer;
  if (toggle) toggle.isToggled = false;
});
