// Lightweight Google Labs preflight checks.
async function checkCorrectWebsite() {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  const currentUrl = tab && tab.url ? tab.url.toLowerCase() : '';

  if (currentUrl.includes('labs.google') && currentUrl.includes('flow')) {
    return true;
  }

  showToast('⚠️ ผิดหน้า! กรุณาเข้าโปรเจกต์ Google Labs ก่อนเริ่มทำงาน', 'error');

  document.querySelectorAll('.btn-primary').forEach((button) => {
    button.classList.add('shake');
    setTimeout(() => button.classList.remove('shake'), 500);
  });

  return false;
}
