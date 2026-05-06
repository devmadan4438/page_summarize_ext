import { summarizeText } from "../helpers/summarize";

export default defineBackground(() => {
  browser.runtime.onMessage.addListener((msg, _, sendResponse) => {
    if (msg.type === 'SUMMARIZE') {
      summarizeText(msg.payload)
        .then((summary) => {
          sendResponse({ summary });
        });

      return true;
    }
  });
});