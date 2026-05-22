// Side panel settings helpers.
function getSettingsElements() {
  return {
    btnSettings: document.getElementById('btn-settings'),
    settingsModal: document.getElementById('settings-modal'),
    closeSettingsBtn: document.getElementById('close-settings'),
    cancelSettingsBtn: document.getElementById('btn-cancel-settings'),
    saveSettingsBtn: document.getElementById('btn-save-settings'),
    geminiApiKeyInput: document.getElementById('gemini-api-key'),
    veo3AspectRatioSelect: document.getElementById('veo3-aspect-ratio'),
  };
}

function setupSettingsModal() {
  const {
    btnSettings,
    settingsModal,
    closeSettingsBtn,
    cancelSettingsBtn,
    saveSettingsBtn,
  } = getSettingsElements();

  if (btnSettings) btnSettings.addEventListener('click', openSettingsModal);
  if (closeSettingsBtn) closeSettingsBtn.addEventListener('click', closeSettingsModal);
  if (cancelSettingsBtn) cancelSettingsBtn.addEventListener('click', closeSettingsModal);
  if (saveSettingsBtn) saveSettingsBtn.addEventListener('click', saveSettings);

  if (settingsModal) {
    settingsModal.addEventListener('click', (event) => {
      if (event.target === settingsModal) {
        closeSettingsModal();
      }
    });
  }
}

function openSettingsModal() {
  const { settingsModal, geminiApiKeyInput, veo3AspectRatioSelect } = getSettingsElements();

  if (geminiApiKeyInput) {
    geminiApiKeyInput.value = getGeminiApiKey();
  }

  if (veo3AspectRatioSelect) {
    veo3AspectRatioSelect.value = getVeo3AspectRatio();
  }

  if (window.FeatureGate) {
    FeatureGate.applyPlan();
  }

  if (settingsModal) {
    settingsModal.classList.add('show');
  }
}

function closeSettingsModal() {
  const { settingsModal } = getSettingsElements();
  if (settingsModal) {
    settingsModal.classList.remove('show');
  }
}

function saveSettings() {
  const { geminiApiKeyInput, veo3AspectRatioSelect } = getSettingsElements();

  if (geminiApiKeyInput) {
    localStorage.setItem('gemini_api_key', geminiApiKeyInput.value.trim());
  }

  if (veo3AspectRatioSelect) {
    localStorage.setItem('veo3_aspect_ratio', veo3AspectRatioSelect.value);
  }

  if (window.BrainMode) {
    BrainMode.updateUI();
  }

  closeSettingsModal();
  showToast('บันทึกการตั้งค่าสำเร็จ!', 'success');
}

function getGeminiApiKey() {
  return localStorage.getItem('gemini_api_key') || '';
}

function getVeo3AspectRatio() {
  return localStorage.getItem('veo3_aspect_ratio') || '9:16';
}
