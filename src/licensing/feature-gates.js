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
    advancedStyle: 'สไตล์ขั้นสูงใช้ได้เฉพาะ Premium',
    advancedScene: 'ฉากอื่นๆ ใช้ได้เฉพาะ Premium',
    advancedOutfit: 'ชุดทั้งหมดใช้ได้เฉพาะ Premium',
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
        advancedStyle: false,
        advancedScene: false,
        advancedOutfit: false,
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
        advancedStyle: true,
        advancedScene: true,
        advancedOutfit: true,
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

  function activateConfigOption(type, value) {
    const container = document.getElementById(`config-content-${type}`);
    if (!container) return;

    container.querySelectorAll('.config-option').forEach((option) => {
      option.classList.toggle('active', option.dataset.value === value);
    });
  }

  function activateConfigTab(type, groupName) {
    const container = document.getElementById(`config-content-${type}`);
    if (!container) return;

    container.querySelectorAll('.config-tab-btn').forEach((button) => {
      button.classList.toggle('active', button.dataset.group === groupName);
    });

    container.querySelectorAll(`[id^="${type}-group-"]`).forEach((group) => {
      group.style.display = group.id === `${type}-group-${groupName}`
        ? (groupName === 'custom' ? 'block' : 'grid')
        : 'none';
    });
  }

  function enforceBasicCreativeLimits() {
    const modeInput = document.getElementById('current-app-mode');
    if (modeInput && modeInput.value === 'mascot' && typeof window.switchAppMode === 'function') {
      window.switchAppMode('human');
    }

    const characterSelect = document.getElementById('banana-character-select');
    const allowedBasicCharacters = new Set([
      'teen_girl', 'thai_guy', 'office_lady', 'smart_man', 'seller_woman', 'seller_man',
      'human_paa', 'human_lung', 'villager_girl', 'villager_boy', 'oppa', 'net_idol',
      'warrior', 'princess', 'detective', 'mafia_boss', 'cyber_girl', 'traveler'
    ]);
    if (characterSelect && !allowedBasicCharacters.has(characterSelect.value)) {
      characterSelect.value = 'teen_girl';
    }
    if (typeof window.switchCharTab === 'function') {
      window.switchCharTab('preset');
    }
    document.querySelectorAll('#character-source-human .char-group .char-card:not(.config-option), #workspace-human .char-group .char-card:not(.config-option)').forEach((card) => {
      card.classList.toggle('active', card.dataset.value === (characterSelect?.value || 'teen_girl'));
    });

    const bgSelect = document.getElementById('banana-bg-select');
    const allowedBasicScenes = new Set(['ai_match', 'living_room', 'kitchen', 'studio', 'cafe', 'garden', 'night_market', 'live_warehouse']);
    if (bgSelect && !allowedBasicScenes.has(bgSelect.value)) bgSelect.value = 'ai_match';
    if (bgSelect) {
      activateConfigTab('bg', 'popular');
      activateConfigOption('bg', bgSelect.value);
    }

    const outfitSelect = document.getElementById('banana-outfit-select');
    const allowedBasicOutfits = new Set(['ai_match', 'casual', 'sport', 'homewear', 'sleepwear', 'polo']);
    if (outfitSelect && !allowedBasicOutfits.has(outfitSelect.value)) outfitSelect.value = 'ai_match';
    if (outfitSelect) {
      activateConfigTab('outfit', 'recommended');
      activateConfigOption('outfit', outfitSelect.value);
    }

    const styleSelect = document.getElementById('banana-style-select');
    const allowedBasicStyles = new Set(['ugc_basic', 'studio', 'live', 'fashion', 'usage', 'funny', 'sony_product', 'shop_review', 'natural_light', 'real_ads']);
    if (styleSelect && !allowedBasicStyles.has(styleSelect.value)) styleSelect.value = 'ugc_basic';
    if (styleSelect) {
      activateConfigTab('style', 'recommended');
      activateConfigOption('style', styleSelect.value);
    }

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
