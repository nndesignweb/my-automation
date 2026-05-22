// Plan and feature access helpers for Basic / Premium.
const FeatureGate = (() => {
  const PLAN_STORAGE_KEY = 'promptplay_plan';
  const PREMIUM_LOCK_TEXT = 'Premium เท่านั้น';

  const FEATURE_MESSAGES = {
    imageToVideo: 'Image-to-Video Auto ใช้ได้เฉพาะ Premium',
    smartAi: 'Smart AI Brain ใช้ได้เฉพาะ Premium',
    advancedRounds: 'รอบขั้นสูงใช้ได้เฉพาะ Premium',
    advancedVideo: 'วิดีโอขั้นสูงใช้ได้เฉพาะ Premium',
    mascotMode: 'ระบบมาสคอตใช้ได้เฉพาะ Premium',
    customCharacter: 'ตัวละครระบุเองใช้ได้เฉพาะ Premium',
    customScene: 'ฉากระบุเองใช้ได้เฉพาะ Premium',
    customOutfit: 'ชุดระบุเองใช้ได้เฉพาะ Premium',
  };

  const PLANS = {
    basic: {
      label: 'Basic',
      badge: 'Basic',
      features: {
        imageToVideo: false,
        smartAi: false,
        advancedRounds: false,
        advancedVideo: false,
        mascotMode: false,
        customCharacter: false,
        customScene: false,
        customOutfit: false,
      },
    },
    vip: {
      label: 'Premium',
      badge: 'Premium',
      features: {
        imageToVideo: true,
        smartAi: true,
        advancedRounds: true,
        advancedVideo: true,
        mascotMode: true,
        customCharacter: true,
        customScene: true,
        customOutfit: true,
      },
    },
  };

  function normalizePlan(value, licenseKey = '') {
    const raw = String(value || '').toLowerCase();
    const key = String(licenseKey || '').toLowerCase();
    const source = `${raw} ${key}`;

    if (source.includes('basic')) return 'basic';
    if (source.includes('vip') || source.includes('new') || source.includes('pro')) return 'vip';

    // Keep old licenses fully usable until the server starts returning plan data.
    return 'vip';
  }

  function getPlan() {
    return normalizePlan(localStorage.getItem(PLAN_STORAGE_KEY));
  }

  function getPlanLabel(plan = getPlan()) {
    return PLANS[normalizePlan(plan)].label;
  }

  function can(featureName, plan = getPlan()) {
    const normalizedPlan = normalizePlan(plan);
    return Boolean(PLANS[normalizedPlan]?.features?.[featureName]);
  }

  function updatePlanLabels(plan) {
    const normalizedPlan = normalizePlan(plan);
    const planLabel = getPlanLabel(normalizedPlan);
    const planBadge = document.getElementById('plan-badge');
    const settingsPlanLabel = document.getElementById('settings-plan-label');
    const settingsPlanDesc = document.getElementById('settings-plan-desc');
    const summaryCards = document.querySelectorAll('[data-plan-summary]');

    if (planBadge) {
      planBadge.textContent = planLabel;
      planBadge.dataset.plan = normalizedPlan;
    }

    if (settingsPlanLabel) settingsPlanLabel.textContent = planLabel;
    if (settingsPlanDesc) {
      settingsPlanDesc.textContent = normalizedPlan === 'vip'
        ? 'ปลดล็อก Image-to-Video, Smart AI, Custom Script และรอบขั้นสูง'
        : 'รุ่นพื้นฐานตลอดชีพ จำกัดรอบสูงสุด 3 และล็อกฟีเจอร์ Premium';
    }

    if (settingsPlanDesc) {
      settingsPlanDesc.textContent = normalizedPlan === 'vip'
        ? 'ปลดล็อก Image-to-Video, Mascot, Smart AI, Custom Script และรอบขั้นสูง'
        : 'รุ่นพื้นฐานตลอดชีพ จำกัดรอบสูงสุด 3 และล็อกฟีเจอร์ Premium';
    }

    summaryCards.forEach((card) => {
      const isActive = card.dataset.planSummary === normalizedPlan;
      card.classList.toggle('active', isActive);
      card.setAttribute('aria-current', String(isActive));
    });
  }

  function disableFeatureNode(node, enabled) {
    if ('disabled' in node && node.type !== 'hidden') {
      node.disabled = !enabled;
    }

    node.querySelectorAll('input, select, textarea, button').forEach((control) => {
      if (control.type === 'hidden') return;
      control.disabled = !enabled;
    });
  }

  function shouldAddLockNote(node) {
    if (node.querySelector('.feature-lock-note')) return false;
    return !node.matches('button, input, select, textarea, option, .char-card, .config-option, .segment-opt, .mascot-card, .mascot-bg, .mascot-outfit');
  }

  function syncLockMessage(node, featureName, enabled) {
    const message = FEATURE_MESSAGES[featureName] || 'ฟีเจอร์นี้ใช้ได้เฉพาะ Premium';
    node.dataset.lockLabel = PREMIUM_LOCK_TEXT;
    node.title = enabled ? '' : message;

    if (shouldAddLockNote(node)) {
      const note = document.createElement('div');
      note.className = 'feature-lock-note feature-lock-note-auto';
      note.textContent = message;
      node.appendChild(note);
    }

    const autoNote = node.querySelector(':scope > .feature-lock-note-auto');
    if (autoNote) autoNote.textContent = message;
  }

  function enforceBasicRoundLimit() {
    ['banana', 'video'].forEach((scope) => {
      const select = document.getElementById(`${scope}-round-count`);
      const customInput = document.getElementById(`${scope}-custom-round-input`);
      const segmentRoot = document.getElementById(scope === 'banana' ? 'seg-rounds' : 'video-seg-rounds');
      const roundDropdown = document.getElementById(scope === 'banana' ? 'banana-round-dropdown' : 'video-round-dropdown');

      if (!select) return;

      const selectedValue = select.value;
      const customValue = customInput ? parseInt(customInput.value, 10) : 1;
      const shouldReset = selectedValue === 'custom'
        || parseInt(selectedValue, 10) > 3
        || (customInput && customInput.style.display === 'block' && customValue > 3);

      if (!shouldReset) return;

      select.value = '3';
      if (customInput) {
        customInput.value = '';
        customInput.classList.add('hidden');
        customInput.style.display = 'none';
      }

      if (segmentRoot) {
        segmentRoot.querySelectorAll('.segment-opt').forEach((button) => {
          button.classList.toggle('active', button.dataset.value === '3');
        });
      }

      if (roundDropdown) {
        roundDropdown.value = '3';
      }
    });
  }

  function syncRoundDropdownAccess(plan) {
    const normalizedPlan = normalizePlan(plan);
    const isBasic = normalizedPlan === 'basic';
    document.querySelectorAll('#banana-round-dropdown option[data-premium-option="advancedRounds"], #video-round-dropdown option[data-premium-option="advancedRounds"]').forEach((option) => {
      option.disabled = isBasic;
    });
  }

  function clearInputValue(id) {
    const input = document.getElementById(id);
    if (input) input.value = '';
  }

  function enforceBasicCreativeLimits() {
    const modeInput = document.getElementById('current-app-mode');
    if (modeInput && modeInput.value === 'mascot' && typeof window.switchAppMode === 'function') {
      window.switchAppMode('human');
    }

    const characterSelect = document.getElementById('banana-character-select');
    if (characterSelect && (characterSelect.value === 'auto' || characterSelect.value === 'custom')) {
      characterSelect.value = 'office_lady';
    }

    const bgSelect = document.getElementById('banana-bg-select');
    if (bgSelect && bgSelect.value === 'custom') bgSelect.value = 'living_room';

    const outfitSelect = document.getElementById('banana-outfit-select');
    if (outfitSelect && outfitSelect.value === 'custom') outfitSelect.value = 'casual';

    [
      'banana-custom-character-input',
      'banana-custom-bg-input',
      'banana-custom-outfit-input',
      'mascot-custom-input',
      'mascot-custom-bg-input',
      'mascot-custom-outfit-input',
    ].forEach(clearInputValue);

    const videoStyleSelect = document.getElementById('video-style-select');
    const videoRandomStyle = document.getElementById('video-random-style-switch');
    const allowedBasicVideoStyles = new Set([
      'talk_ugc',
      'talk_excited',
      'talk_cheerful',
      'talk_sassy',
      'talk_sincere',
      'hook_comparison',
      'hook_secret',
      'rant_expert',
    ]);

    if (videoRandomStyle) videoRandomStyle.checked = false;

    if (videoStyleSelect && !allowedBasicVideoStyles.has(videoStyleSelect.value)) {
      videoStyleSelect.value = 'talk_ugc';
    }

    document.querySelectorAll('.config-option[data-type="vstyle"]').forEach((option) => {
      const shouldBeActive = option.dataset.value === (videoStyleSelect?.value || 'talk_ugc');
      option.classList.toggle('active', shouldBeActive);
    });
  }

  function applyFeatureLocks(plan) {
    const normalizedPlan = normalizePlan(plan);

    document.querySelectorAll('[data-feature]').forEach((node) => {
      const featureName = node.dataset.feature;
      const enabled = can(featureName, normalizedPlan);
      node.classList.toggle('is-locked', !enabled);
      node.setAttribute('aria-disabled', String(!enabled));
      syncLockMessage(node, featureName, enabled);
      disableFeatureNode(node, enabled);
    });

    const toVideoCheckbox = document.getElementById('banana-to-video-checkbox');
    if (toVideoCheckbox && !can('imageToVideo', normalizedPlan)) {
      toVideoCheckbox.checked = false;
    }

    if (window.BrainMode && !can('smartAi', normalizedPlan)) {
      window.BrainMode.setMode('standard', { silent: true });
    }

    if (normalizedPlan === 'basic') {
      enforceBasicRoundLimit();
      enforceBasicCreativeLimits();
    }
    syncRoundDropdownAccess(normalizedPlan);
  }

  function applyPlan(plan = getPlan()) {
    const normalizedPlan = normalizePlan(plan);
    localStorage.setItem(PLAN_STORAGE_KEY, normalizedPlan);
    document.body.dataset.plan = normalizedPlan;
    updatePlanLabels(normalizedPlan);
    applyFeatureLocks(normalizedPlan);
    if (window.BrainMode) {
      window.BrainMode.updateUI();
    }
  }

  return {
    normalizePlan,
    getPlan,
    getPlanLabel,
    can,
    applyPlan,
    enforceBasicRoundLimit,
    enforceBasicCreativeLimits,
  };
})();

window.FeatureGate = FeatureGate;

document.addEventListener('DOMContentLoaded', () => {
  FeatureGate.applyPlan();
});
