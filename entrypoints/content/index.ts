export default defineContentScript({
  matches: ['<all_urls>'],
  main() {
    browser.runtime.onMessage.addListener((msg, _, sendResponse) => {
      if (msg.type === 'GET_PAGE_CONTENT') {
        const text = document.body.innerText;

        sendResponse({
          title: document.title,
          content: text.slice(0, 10000),
        });
      }
    });
  },
});