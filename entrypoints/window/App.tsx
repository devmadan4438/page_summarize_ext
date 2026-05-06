import { useState } from 'react';
import './App.css';

function App() {
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const summarize = async () => {
    try {
      setLoading(true);
      setSummary('');

      const [tab] = await browser.tabs.query({
        active: true
      });

      const response = await browser.tabs.sendMessage(tab.id!, {
        type: 'GET_PAGE_CONTENT',
      });

      const result = await browser.runtime.sendMessage({
        type: 'SUMMARIZE',
        payload: response.content,
      });

      setSummary(result.summary);

      await browser.notifications.create({
        type: 'basic',
        iconUrl: browser.runtime.getURL('/icon/128.png'),
        title: 'Summary Ready 🚀',
        message: 'AI summary generated successfully.',
      });
    } catch (error) {
      console.error(error);

      await browser.notifications.create({
        type: 'basic',
        iconUrl: browser.runtime.getURL('/icon/128.png'),
        title: 'Error',
        message: 'Failed to generate summary.',
      });
    } finally {
      setLoading(false);
    }
  };

  const copySummary = async () => {
    await navigator.clipboard.writeText(summary);

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <div className="container">
      <div className="header">
        <div className="logo">✨</div>

        <div>
          <h1>AI Page Summarizer</h1>
          <p>Summarize webpages instantly using AI</p>
        </div>
      </div>

      <button
        className="summarize-btn"
        onClick={summarize}
        disabled={loading}
      >
        {loading ? 'Generating Summary...' : 'Summarize Page'}
      </button>

      {!summary && !loading && (
        <div className="empty-state">
          <div className="empty-icon">📄</div>

          <h2>No Summary Yet</h2>

          <p>
            Open any webpage and click
            "Summarize Page"
          </p>
        </div>
      )}

      {summary && (
        <div className="summary-card">
          <div className="summary-header">
            <h2>AI Summary</h2>

            <button
              className="copy-btn"
              onClick={copySummary}
            >
              {copied ? 'Copied ✓' : 'Copy'}
            </button>
          </div>

          <div className="summary-content">
            {summary}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;