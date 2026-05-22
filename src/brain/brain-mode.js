// UI state for Standard automation vs Premium Smart AI mode.
const BrainMode = (() => {
  const STORAGE_KEY = 'promptplay_brain_mode';

  function hasApiKey() {
    return Boolean((localStorage.getItem('gemini_api_key') || '').trim());
  }

  function getRequestedMode() {
    return localStorage.getItem(STORAGE_KEY) || 'standard';
  }

  function getMode() {
    const requested = getRequestedMode();
    if (requested !== 'smart') return 'standard';
    if (window.FeatureGate && !FeatureGate.can('smartAi')) return 'standard';
    if (!hasApiKey()) return 'standard';
    return 'smart';
  }

  function updateUI(mode = getRequestedMode()) {
    const requested = mode === 'smart' ? 'smart' : 'standard';
    const effective = getMode();
    const input = document.getElementById('brain-mode-select');
    const hint = document.getElementById('brain-mode-hint');
    const statusBadge = document.getElementById('brain-status-badge');
    let statusText = 'Standard Active';
    let statusClass = 'is-standard-status';

    if (input) input.value = requested;

    document.querySelectorAll('[data-brain-mode]').forEach((button) => {
      button.classList.toggle('active', button.dataset.brainMode === requested);
    });

    if (hint) {
      if (requested === 'smart' && effective !== 'smart') {
        hint.textContent = 'Smart AI จะพร้อมใช้เมื่อเป็น Premium และใส่ API Key แล้ว';
      } else if (effective === 'smart') {
        hint.textContent = 'Smart AI Brain พร้อมช่วยคิดภาพ ฉาก และบทต่อยอด';
      } else {
        hint.textContent = 'Standard ใช้ระบบเดิม ไม่ต้องใช้ API';
      }
    }

    if (window.FeatureGate && !FeatureGate.can('smartAi')) {
      statusText = 'Smart AI Locked';
      statusClass = 'is-locked-status';
    } else if (effective === 'smart') {
      statusText = 'Smart AI Ready';
      statusClass = 'is-ready-status';
    } else if (requested === 'smart' && !hasApiKey()) {
      statusText = 'Needs API Key';
      statusClass = 'is-warning-status';
    }

    if (statusBadge) {
      statusBadge.className = `brain-status-badge ${statusClass}`;
      statusBadge.textContent = statusText;
    }

    document.querySelectorAll('[data-brain-status-text]').forEach((node) => {
      node.textContent = statusText;
    });

    document.querySelectorAll('[data-brain-status-badge]').forEach((node) => {
      node.className = `brain-status-badge ${statusClass}`;
      node.textContent = statusText.replace('Smart AI ', '');
    });
  }

  function setMode(mode, options = {}) {
    const nextMode = mode === 'smart' ? 'smart' : 'standard';

    if (nextMode === 'smart' && window.FeatureGate && !FeatureGate.can('smartAi')) {
      if (!options.silent) showToast('Smart AI Brain ใช้ได้เฉพาะ Premium', 'warning');
      localStorage.setItem(STORAGE_KEY, 'standard');
      updateUI('standard');
      return 'standard';
    }

    localStorage.setItem(STORAGE_KEY, nextMode);
    updateUI(nextMode);

    if (nextMode === 'smart' && !hasApiKey() && !options.silent) {
      showToast('ใส่ API Key ใน Settings เพื่อเปิด Smart AI Brain', 'warning');
    }

    return getMode();
  }

  function init() {
    document.querySelectorAll('[data-brain-mode]').forEach((button) => {
      button.addEventListener('click', () => setMode(button.dataset.brainMode));
    });
    updateUI();
  }

  return {
    init,
    getMode,
    setMode,
    updateUI,
  };
})();

window.BrainMode = BrainMode;

document.addEventListener('DOMContentLoaded', () => {
  BrainMode.init();
});
