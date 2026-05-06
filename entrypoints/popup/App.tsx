import { useEffect } from 'react';

function App() {
  useEffect(() => {
    const openWindow = async () => {
      await browser.windows.create({
        url: browser.runtime.getURL('/window.html'),
        type: 'popup',
        width: 520,
        height: 750,
      });

      window.close();
    };

    openWindow();
  }, []);

  return null;
}

export default App;