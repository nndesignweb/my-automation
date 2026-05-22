// DOM actions that run against the active Google Labs tab.
async function smartClick(tabId, selector, textMatch = null) {
  return await chrome.scripting.executeScript({
    target: { tabId },
    func: (sel, txt) => {
      const heavyClick = (element) => {
        if (!element) return false;
        ['mousedown', 'click', 'mouseup'].forEach((eventName) => {
          element.dispatchEvent(new MouseEvent(eventName, {
            bubbles: true,
            cancelable: true,
            view: window,
          }));
        });
        return true;
      };

      let target = null;
      if (txt) {
        const candidates = Array.from(document.querySelectorAll(
          'button, div[role="button"], [role="menuitem"]'
        ));
        target = candidates.find((candidate) => (candidate.textContent || '').includes(txt));
      } else {
        target = document.querySelector(sel);
      }

      if (!target) return false;

      target.scrollIntoView({ behavior: 'instant', block: 'center' });
      return heavyClick(target);
    },
    args: [selector, textMatch],
  });
}

async function toggleWebPageLock(shouldLock) {
  try {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    if (!tab || !tab.url || !tab.url.startsWith('http')) return;

    await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: (locked) => {
        const lockId = 'promptplay-lock-overlay';
        const existingLock = document.getElementById(lockId);

        if (locked) {
          if (existingLock) return;

          const overlay = document.createElement('div');
          overlay.id = lockId;
          overlay.style.cssText = `
            position: fixed;
            top: 0; left: 0; width: 100vw; height: 100vh;
            background: rgba(0, 0, 0, 0.5);
            backdrop-filter: blur(2px);
            z-index: 2147483647;
            cursor: not-allowed;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #fff;
            font-family: sans-serif;
            opacity: 0;
            transition: opacity 0.3s ease;
          `;

          overlay.innerHTML = `
            <div style="background: #18181b; padding: 30px 50px; border-radius: 16px; border: 1px solid #6366f1; text-align: center; box-shadow: 0 20px 50px rgba(0,0,0,0.5);">
              <div style="font-size: 40px; margin-bottom: 15px;">🔒</div>
              <h2 style="margin: 0 0 10px 0; color: #fff; font-size: 20px;">SYSTEM WORKING</h2>
              <p style="margin: 0; color: #aaa; font-size: 14px;">กรุณาอย่าคลิกใดๆ บนหน้าจอขณะนี้</p>
            </div>
          `;

          const blockEvent = (event) => {
            event.preventDefault();
            event.stopPropagation();
          };
          ['click', 'mousedown', 'mouseup', 'keydown', 'wheel'].forEach((eventName) => {
            overlay.addEventListener(eventName, blockEvent, true);
          });

          document.body.appendChild(overlay);
          setTimeout(() => { overlay.style.opacity = '1'; }, 10);
          return;
        }

        if (existingLock) {
          existingLock.style.opacity = '0';
          setTimeout(() => existingLock.remove(), 300);
        }
      },
      args: [shouldLock],
    });
  } catch (error) {
    console.error('Lock error prevented:', error);
  }
}
