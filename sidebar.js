// ============================================
// ðŸ›¡ï¸ SECURITY CORE: TAMPER PROTECTION SYSTEM
// ============================================
// à¸•à¸±à¸§à¹à¸›à¸£à¸¥à¸±à¸šà¸ªà¸³à¸«à¸£à¸±à¸šà¹€à¸Šà¹‡à¸„à¸ªà¸–à¸²à¸™à¸° (à¸«à¹‰à¸²à¸¡à¸¥à¸š)
let _0x99f = false; 

function _secureCheck() {
    // 1. à¹€à¸Šà¹‡à¸„à¸§à¹ˆà¸²à¸¡à¸µà¹„à¸Ÿà¸¥à¹Œ auth.js à¹‚à¸«à¸¥à¸”à¹€à¸‚à¹‰à¸²à¸¡à¸²à¹„à¸«à¸¡
    if (typeof AUTH === 'undefined') {
        _selfDestruct("E01: Missing Core Library");
        return false;
    }
    
    // 2. à¹€à¸Šà¹‡à¸„à¸§à¹ˆà¸²à¸«à¸™à¹‰à¸² HTML à¸¡à¸µà¸à¸¥à¹ˆà¸­à¸‡ Login à¸«à¸£à¸·à¸­à¹„à¸¡à¹ˆ (à¸›à¹‰à¸­à¸‡à¸à¸±à¸™à¸à¸²à¸£à¸¥à¸š Element)
    const overlay = document.getElementById('auth-overlay');
    const keyInput = document.getElementById('license-key-input');
    
    if (!overlay || !keyInput) {
        _selfDestruct("E02: UI Integrity Violation");
        return false;
    }
    
    _0x99f = true; // à¸œà¹ˆà¸²à¸™à¸à¸²à¸£à¸•à¸£à¸§à¸ˆà¸ªà¸­à¸š
    return true;
}

function _selfDestruct(reason) {
    // ðŸ’£ à¸£à¸°à¹€à¸šà¸´à¸”à¹‚à¸›à¸£à¹à¸à¸£à¸¡: à¸¥à¹‰à¸²à¸‡à¸«à¸™à¹‰à¸²à¸ˆà¸­à¸—à¸´à¹‰à¸‡à¸—à¸±à¹‰à¸‡à¸«à¸¡à¸”
    document.body.innerHTML = `
        <div style="background:black; color:red; height:100vh; display:flex; flex-direction:column; justify-content:center; align-items:center; font-family:monospace; text-align:center;">
            <h1 style="font-size:40px;">âš ï¸ SYSTEM CORRUPTED</h1>
            <p style="color:#fff;">${reason}</p>
            <p style="color:#555; margin-top:20px;">Unauthorized modification detected.</p>
        </div>
    `;
    // à¸—à¸³à¸¥à¸²à¸¢à¸•à¸±à¸§à¹à¸›à¸£à¸—à¸´à¹‰à¸‡
    window.bananaHandleAutomation = null;
    window.videoRunAutomation = null;
    throw new Error("Security Violation: " + reason);
}

// à¹€à¸Šà¹‡à¸„à¸„à¸§à¸²à¸¡à¸›à¸¥à¸­à¸”à¸ à¸±à¸¢à¸—à¸±à¸™à¸—à¸µà¸—à¸µà¹ˆà¹‚à¸«à¸¥à¸”à¹„à¸Ÿà¸¥à¹Œ
_secureCheck();

// à¹€à¸Šà¹‡à¸„à¸‹à¹‰à¸³à¸—à¸¸à¸à¹† 2 à¸§à¸´à¸™à¸²à¸—à¸µ (Watchdog) - à¸à¸±à¸™à¸„à¸™à¹à¸­à¸šà¸¥à¸šà¸—à¸µà¸«à¸¥à¸±à¸‡à¸œà¹ˆà¸²à¸™ Inspect Element
setInterval(() => {
    _secureCheck();
}, 2000);


// ============================================
// ðŸŸ¢ à¸ªà¹ˆà¸§à¸™à¸—à¸µà¹ˆà¹€à¸žà¸´à¹ˆà¸¡à¹ƒà¸«à¸¡à¹ˆ 1: à¸£à¸°à¸šà¸šà¸ªà¸¥à¸±à¸šà¹‚à¸«à¸¡à¸” (à¸§à¸²à¸‡à¸•à¹ˆà¸­à¸ˆà¸²à¸ _secureCheck)
// ============================================

// à¸Ÿà¸±à¸‡à¸à¹Œà¸Šà¸±à¸™à¸ªà¸¥à¸±à¸šà¹‚à¸«à¸¡à¸” Human / Mascot (à¸‰à¸šà¸±à¸šà¸›à¸£à¸±à¸šà¸›à¸£à¸¸à¸‡: à¹€à¸žà¸´à¹ˆà¸¡à¸£à¸°à¸šà¸š Refresh UI à¸—à¸±à¸™à¸—à¸µ)
function switchAppMode(mode) {
    if (mode === 'mascot' && window.FeatureGate && !FeatureGate.can('mascotMode')) {
        mode = 'human';
    }

    const modeInput = document.getElementById('current-app-mode');
    if(modeInput) modeInput.value = mode;

    const humanZone = document.getElementById('workspace-human');
    const mascotZone = document.getElementById('workspace-mascot');
    const btnHuman = document.getElementById('btn-mode-human');
    const btnMascot = document.getElementById('btn-mode-mascot');
    const humanSource = document.getElementById('character-source-human');
    const mascotSource = document.getElementById('character-source-mascot');

    if (mode === 'human') {
        if(humanZone) humanZone.style.display = 'block';
        if(mascotZone) mascotZone.style.display = 'none';
        if(humanSource) humanSource.style.display = 'block';
        if(mascotSource) mascotSource.style.display = 'none';
        
        // ðŸŒ¸ à¹ƒà¸Šà¹‰ Class à¹à¸—à¸™à¸à¸²à¸£à¸à¸±à¸‡à¸ªà¸µ
        if(btnHuman) btnHuman.classList.add('active');
        if(btnMascot) btnMascot.classList.remove('active');
    } else {
        if(humanZone) humanZone.style.display = 'none';
        if(mascotZone) mascotZone.style.display = 'block';
        if(humanSource) humanSource.style.display = 'none';
        if(mascotSource) mascotSource.style.display = 'block';
        
        // ðŸŒ¸ à¹ƒà¸Šà¹‰ Class à¹à¸—à¸™à¸à¸²à¸£à¸à¸±à¸‡à¸ªà¸µ
        if(btnHuman) btnHuman.classList.remove('active');
        if(btnMascot) btnMascot.classList.add('active');
    }

    if (typeof modelUpdateUI === 'function') {
        modelUpdateUI(); 
    }
}

window.switchAppMode = switchAppMode;

function organizeCharacterSourcePanel() {
    const panel = document.getElementById('character-source-panel');
    if (!panel || panel.dataset.ready === 'true') return;

    const modeSlot = document.getElementById('character-source-mode-slot');
    const humanSlot = document.getElementById('character-source-human');
    const mascotSlot = document.getElementById('character-source-mascot');

    const modeBox = document.getElementById('btn-mode-human')?.closest('.input-group');
    if (modeSlot && modeBox) {
        modeBox.classList.add('character-mode-switch');
        modeSlot.appendChild(modeBox);
    }

    const humanPicker = document.querySelector('#workspace-human > .input-group');
    if (humanSlot && humanPicker) {
        humanPicker.classList.add('character-picker-box');
        humanSlot.appendChild(humanPicker);
    }

    const mascotPicker = document.querySelector('#workspace-mascot > .input-group.mascot-theme-box');
    if (mascotSlot && mascotPicker) {
        mascotPicker.classList.add('character-picker-box');
        mascotSlot.appendChild(mascotPicker);
    }

    const uploadSlot = document.querySelector('#char-group-upload .character-upload-slot');
    const modelUploadZone = document.getElementById('model-upload-zone');
    const modelFileInput = document.getElementById('model-file-input');
    const modelPreview = document.getElementById('model-preview-container');
    if (uploadSlot && modelUploadZone) uploadSlot.appendChild(modelUploadZone);
    if (uploadSlot && modelFileInput) uploadSlot.appendChild(modelFileInput);
    if (uploadSlot && modelPreview) uploadSlot.appendChild(modelPreview);

    panel.dataset.ready = 'true';
}

// ============================================
// ðŸŸ¢ [DEBUGGED VERSION] à¸Ÿà¸±à¸‡à¸à¹Œà¸Šà¸±à¸™à¸ˆà¸±à¸”à¸à¸²à¸£à¸›à¸¸à¹ˆà¸¡à¸à¸”à¸«à¸™à¹‰à¸² Mascot
// ============================================
function setupMascotEvents() {
    console.log("ðŸ§¸ Setup Mascot Events (Starting)...");

    // à¸Ÿà¸±à¸‡à¸à¹Œà¸Šà¸±à¸™à¸Šà¹ˆà¸§à¸¢à¸œà¸¹à¸à¸›à¸¸à¹ˆà¸¡ (à¸‰à¸šà¸±à¸šà¹à¸à¹‰à¹„à¸‚: à¸£à¸­à¸‡à¸£à¸±à¸šà¸›à¸¸à¹ˆà¸¡à¸—à¸µà¹ˆà¹„à¸¡à¹ˆà¸¡à¸µà¸à¸¥à¹ˆà¸­à¸‡ Custom à¹€à¸Šà¹ˆà¸™ à¸ªà¸µà¸«à¸™à¹‰à¸²)
    function setupCustomToggle(btnClass, wrapperId, inputId, hiddenInputId) {
        const buttons = document.querySelectorAll(btnClass);
        const wrapper = wrapperId ? document.getElementById(wrapperId) : null;
        const input = inputId ? document.getElementById(inputId) : null;
        const hiddenInput = document.getElementById(hiddenInputId);

        // [à¸ˆà¸¸à¸”à¸—à¸µà¹ˆà¹à¸à¹‰à¹„à¸‚]: à¹„à¸¡à¹ˆà¸ªà¸±à¹ˆà¸‡ return à¸—à¸±à¸™à¸—à¸µ à¹à¸•à¹ˆà¸ˆà¸°à¹€à¸Šà¹‡à¸„à¹€à¸‰à¸žà¸²à¸°à¹€à¸¡à¸·à¹ˆà¸­à¸¡à¸µà¸à¸²à¸£à¸ªà¹ˆà¸‡ ID à¸¡à¸²à¹€à¸—à¹ˆà¸²à¸™à¸±à¹‰à¸™
        if (wrapperId && !wrapper) { console.warn(`âš ï¸ à¹„à¸¡à¹ˆà¸žà¸š Wrapper: ${wrapperId}`); }
        if (inputId && !input) { console.warn(`âš ï¸ à¹„à¸¡à¹ˆà¸žà¸š Input: ${inputId}`); }

        buttons.forEach(btn => {
            // Clone à¹€à¸žà¸·à¹ˆà¸­à¸¥à¹‰à¸²à¸‡ Event à¹€à¸à¹ˆà¸² à¸›à¹‰à¸­à¸‡à¸à¸±à¸™à¸à¸²à¸£à¸‹à¹‰à¸­à¸™à¸—à¸±à¸š
            const newBtn = btn.cloneNode(true);
            btn.parentNode.replaceChild(newBtn, btn);

            newBtn.addEventListener('click', () => {
                if (newBtn.disabled || newBtn.classList.contains('is-locked')) {
                    return;
                }
                console.log(`ðŸ–±ï¸ Clicked: ${btnClass} -> Value: ${newBtn.dataset.value}`);

                // 1. à¸ˆà¸±à¸”à¸à¸²à¸£à¸ªà¸–à¸²à¸™à¸° Active à¸šà¸™ UI
                document.querySelectorAll(btnClass).forEach(b => b.classList.remove('active'));
                newBtn.classList.add('active');

                const value = newBtn.dataset.value;

                // 2. à¸­à¸±à¸›à¹€à¸”à¸•à¸„à¹ˆà¸²à¸¥à¸‡ Hidden Input à¸‚à¸­à¸‡à¸£à¸°à¸šà¸š
                if (hiddenInput) {
                    hiddenInput.value = value;
                    hiddenInput.dispatchEvent(new Event('change', { bubbles: true }));
                }

                // 3. à¸ˆà¸±à¸”à¸à¸²à¸£à¹€à¸›à¸´à¸”/à¸›à¸´à¸”à¸à¸¥à¹ˆà¸­à¸‡à¸£à¸°à¸šà¸¸à¹€à¸­à¸‡ (Custom Wrapper) à¹€à¸‰à¸žà¸²à¸°à¸–à¹‰à¸²à¸¡à¸µ Element à¸­à¸¢à¸¹à¹ˆà¸ˆà¸£à¸´à¸‡
                if (wrapper && input) {
                    if (value === 'custom') {
                        wrapper.style.display = 'block';
                        wrapper.classList.remove('hidden');
                        setTimeout(() => input.focus(), 100);
                    } else {
                        wrapper.style.display = 'none';
                        wrapper.classList.add('hidden');
                        input.value = "";
                    }
                }
            });
        });
    }

    // 1. à¸•à¸±à¸§à¸¥à¸°à¸„à¸£ (Character)
    setupCustomToggle('.mascot-card', 'mascot-custom-wrapper', 'mascot-custom-input', null);

    // 2. à¸‰à¸²à¸ (Scene)
    setupCustomToggle('.mascot-bg', 'mascot-custom-bg-wrapper', 'mascot-custom-bg-input', 'mascot-bg-select');

    // 3. à¸Šà¸¸à¸” (Outfit)
    setupCustomToggle('.mascot-outfit', 'mascot-custom-outfit-wrapper', 'mascot-custom-outfit-input', 'mascot-outfit-select');

    // ðŸŸ¢ [à¹à¸à¹‰à¹„à¸‚à¹à¸¥à¹‰à¸§]: à¸•à¸­à¸™à¸™à¸µà¹‰à¸›à¸¸à¹ˆà¸¡à¸ªà¸µà¸«à¸™à¹‰à¸²à¸ˆà¸°à¸—à¸³à¸‡à¸²à¸™à¹„à¸”à¹‰à¹à¸¥à¹‰à¸§à¹à¸¡à¹‰à¹„à¸¡à¹ˆà¸¡à¸µà¸à¸¥à¹ˆà¸­à¸‡à¸‚à¹‰à¸­à¸„à¸§à¸²à¸¡
    setupCustomToggle('.mascot-expression', null, null, 'mascot-expression-select');
}


// ============================================
// 1. SYSTEM: VISUAL UI CONTROLLER
// ============================================

// A. à¹€à¸›à¸¥à¸µà¹ˆà¸¢à¸™à¹à¸—à¹‡à¸šà¸„à¸²à¹à¸£à¸„à¹€à¸•à¸­à¸£à¹Œ (à¹à¸à¹‰à¹„à¸‚: à¸£à¸­à¸‡à¸£à¸±à¸š data-target="auto" à¸‚à¸­à¸‡à¸›à¸¸à¹ˆà¸¡à¸£à¸°à¸šà¸¸à¹€à¸­à¸‡)
function switchCharTab(tabName) {
    if ((tabName === 'auto' || tabName === 'custom') && window.FeatureGate && !FeatureGate.can('customCharacter')) {
        tabName = 'preset';
    }

    const tabs = document.querySelectorAll('#character-source-human .char-tab-btn:not(.config-tab-btn), #workspace-human .char-tab-btn:not(.config-tab-btn)');
    const groups = document.querySelectorAll('#character-source-human .char-group, #workspace-human .char-group');
    
    // 1. à¹€à¸›à¸¥à¸µà¹ˆà¸¢à¸™à¸ªà¸µà¸›à¸¸à¹ˆà¸¡ Tab à¹ƒà¸«à¹‰ Active
    tabs.forEach(btn => {
        const target = btn.dataset.target || btn.getAttribute('data-target');
        if (target === tabName) btn.classList.add('active');
        else btn.classList.remove('active');
    });
    
    // 2. à¸ªà¸¥à¸±à¸šà¸à¸²à¸£à¹à¸ªà¸”à¸‡à¸œà¸¥ Grid à¸£à¸¹à¸›à¸ à¸²à¸ž (à¸«à¸à¸´à¸‡/à¸Šà¸²à¸¢/à¸­à¸²à¸Šà¸µà¸ž)
    groups.forEach(group => group.style.display = 'none');
    const targetGroup = document.getElementById(`char-group-${tabName}`);
    if (targetGroup) targetGroup.style.display = 'block';

    const characterInput = document.getElementById('banana-character-select');
    if (characterInput && (tabName === 'custom' || tabName === 'auto')) {
        characterInput.value = 'custom';
    } else if (characterInput && tabName === 'preset' && (characterInput.value === 'custom' || characterInput.value === 'auto')) {
        characterInput.value = 'teen_girl';
        const defaultCard = document.querySelector('#char-group-preset .char-card[data-value="teen_girl"]');
        if (defaultCard) selectCharacter(defaultCard, 'teen_girl');
    }

    // ðŸŸ¢ 3. à¸ˆà¸±à¸”à¸à¸²à¸£à¸Šà¹ˆà¸­à¸‡ "à¸£à¸°à¸šà¸¸à¹€à¸­à¸‡" (à¹à¸à¹‰à¸šà¸±à¹Šà¸: à¹€à¸Šà¹‡à¸„ 'auto' à¹ƒà¸«à¹‰à¸•à¸£à¸‡à¸à¸±à¸š HTML)
    const customInput = document.getElementById('banana-custom-character-input');
    if (customInput) {
        // à¸«à¸²à¸•à¸±à¸§à¸„à¸£à¸­à¸š (Wrapper) à¹€à¸žà¸·à¹ˆà¸­à¸‹à¹ˆà¸­à¸™à¸—à¸±à¹‰à¸‡ Label à¹à¸¥à¸° Input à¸žà¸£à¹‰à¸­à¸¡à¸à¸±à¸™
        const wrapper = customInput.closest('#char-group-custom') || customInput.closest('.custom-character-box'); 
        
        // âœ… à¹à¸à¹‰à¹„à¸‚à¹€à¸‡à¸·à¹ˆà¸­à¸™à¹„à¸‚: à¸–à¹‰à¸²à¹€à¸›à¹‡à¸™ 'auto' (à¸›à¸¸à¹ˆà¸¡à¸£à¸°à¸šà¸¸à¹€à¸­à¸‡) à¸«à¸£à¸·à¸­ 'custom' à¹ƒà¸«à¹‰à¹à¸ªà¸”à¸‡à¸Šà¹ˆà¸­à¸‡à¸à¸£à¸­à¸
        if (tabName === 'auto' || tabName === 'custom') {
            if (wrapper && wrapper.id !== 'char-group-custom') wrapper.style.display = 'block';
            else customInput.style.display = 'block';
            
            // à¹‚à¸Ÿà¸à¸±à¸ªà¹„à¸›à¸—à¸µà¹ˆà¸Šà¹ˆà¸­à¸‡à¸žà¸´à¸¡à¸žà¹Œà¸—à¸±à¸™à¸—à¸µ
            setTimeout(() => customInput.focus(), 100);
        } else {
            // âŒ à¸–à¹‰à¸²à¹€à¸¥à¸·à¸­à¸à¹à¸—à¹‡à¸šà¸­à¸·à¹ˆà¸™ (à¸«à¸à¸´à¸‡/à¸Šà¸²à¸¢/à¸­à¸²à¸Šà¸µà¸ž) -> à¹ƒà¸«à¹‰à¸‹à¹ˆà¸­à¸™
            if (wrapper && wrapper.id !== 'char-group-custom') wrapper.style.display = 'none';
            else customInput.style.display = 'none';
        }
    }
}

window.switchCharTab = switchCharTab;



// B. à¹€à¸¥à¸·à¸­à¸à¸„à¸²à¹à¸£à¸„à¹€à¸•à¸­à¸£à¹Œ (à¸‰à¸šà¸±à¸šà¸­à¸±à¸›à¹€à¸”à¸•: à¸¥à¹‡à¸­à¸„à¸Šà¸¸à¸”à¹ƒà¸«à¹‰ Job à¹à¸¥à¸° Senior)
function selectCharacter(element, value) {
    if (element.disabled || element.classList.contains('is-locked')) {
        showToast('à¸•à¸±à¸§à¹€à¸¥à¸·à¸­à¸à¸™à¸µà¹‰à¹ƒà¸Šà¹‰à¹„à¸”à¹‰à¹€à¸‰à¸žà¸²à¸° Premium', 'warning');
        return;
    }

    // 1. à¹€à¸à¹‡à¸šà¸„à¹ˆà¸²à¸¥à¸‡ Input à¸«à¸¥à¸±à¸
    const hiddenInput = document.getElementById('banana-character-select');
    if (hiddenInput) hiddenInput.value = value;

    // 2. à¹€à¸›à¸¥à¸µà¹ˆà¸¢à¸™à¸ªà¸µà¸›à¸¸à¹ˆà¸¡ Active
    document.querySelectorAll('#character-source-human .char-group .char-card:not(.config-option), #workspace-human .char-group .char-card:not(.config-option)').forEach(card => card.classList.remove('active'));
    element.classList.add('active');

    // ========================================================
    // ðŸŸ¢ [à¸­à¸±à¸›à¹€à¸”à¸•] Logic à¸¥à¹‡à¸­à¸„à¸Šà¹ˆà¸­à¸‡à¹€à¸¥à¸·à¸­à¸à¸Šà¸¸à¸” (Job + Senior)
    // ========================================================
    
    // 1. à¹€à¸Šà¹‡à¸„à¸§à¹ˆà¸²à¹€à¸›à¹‡à¸™à¸«à¸¡à¸§à¸” "à¸­à¸²à¸Šà¸µà¸ž" à¸«à¸£à¸·à¸­à¹„à¸¡à¹ˆ?
    const outfitLockedCharacters = new Set([
        'seller_woman', 'seller_man', 'doctor_female', 'doctor_male', 'nurse_female', 'nurse_male',
        'chef_female', 'chef_male', 'rider_male', 'farmer_female', 'warrior', 'princess',
        'detective', 'mafia_boss', 'cyber_girl', 'traveler'
    ]);
    const isOutfitLockedCharacter = outfitLockedCharacters.has(value) || element.classList.contains('costume-locked');
    
    // 2. à¹€à¸Šà¹‡à¸„à¸§à¹ˆà¸²à¹€à¸›à¹‡à¸™à¸«à¸¡à¸§à¸” "à¸ªà¸¹à¸‡à¸§à¸±à¸¢" (à¸¡à¸™à¸¸à¸©à¸¢à¹Œà¸›à¹‰à¸²/à¸¥à¸¸à¸‡/à¸¢à¸²à¸¢/à¸•à¸²) à¸«à¸£à¸·à¸­à¹„à¸¡à¹ˆ?  <-- à¹€à¸žà¸´à¹ˆà¸¡à¸•à¸£à¸‡à¸™à¸µà¹‰
    const isSeniorGroup = false;
    
    // à¸«à¸² Wrapper à¸‚à¸­à¸‡à¸ªà¹ˆà¸§à¸™à¹€à¸¥à¸·à¸­à¸à¸Šà¸¸à¸”
    const outfitContent = document.getElementById('config-content-outfit');
    const outfitWrapper = outfitContent ? outfitContent.closest('.input-group') : null;

    if (outfitWrapper) {
        // ðŸ”’ à¸–à¹‰à¸²à¹€à¸›à¹‡à¸™ "à¸­à¸²à¸Šà¸µà¸ž" à¸«à¸£à¸·à¸­ "à¸ªà¸¹à¸‡à¸§à¸±à¸¢" -> à¹ƒà¸«à¹‰à¸¥à¹‡à¸­à¸„à¸Šà¹ˆà¸­à¸‡à¸Šà¸¸à¸”à¸—à¸±à¸™à¸—à¸µ!
        if (isOutfitLockedCharacter || isSeniorGroup) {
            outfitWrapper.classList.add('disabled-section');
            
            // à¸£à¸µà¹€à¸‹à¹‡à¸•à¸›à¸¸à¹ˆà¸¡à¸Šà¸¸à¸”à¹ƒà¸«à¹‰à¸à¸¥à¸±à¸šà¹„à¸›à¹€à¸›à¹‡à¸™ "à¸ªà¸¸à¹ˆà¸¡" (Auto) à¹€à¸žà¸·à¹ˆà¸­à¸„à¸§à¸²à¸¡à¹€à¸£à¸µà¸¢à¸šà¸£à¹‰à¸­à¸¢
            const outfitAutoBtn = document.querySelector('#config-content-outfit .config-option[data-value="ai_match"]');
            if (outfitAutoBtn) outfitAutoBtn.click(); 
            
        } else {
            // ðŸ”“ à¸–à¹‰à¸²à¹€à¸›à¹‡à¸™à¸«à¸¡à¸§à¸”à¸­à¸·à¹ˆà¸™ (à¸§à¸±à¸¢à¸£à¸¸à¹ˆà¸™, à¹„à¸®à¹‚à¸‹) -> à¸›à¸¥à¸”à¸¥à¹‡à¸­à¸„à¹ƒà¸«à¹‰à¹€à¸¥à¸·à¸­à¸à¸Šà¸¸à¸”à¹„à¸”à¹‰à¸›à¸à¸•à¸´
            outfitWrapper.classList.remove('disabled-section');
        }
    }

    // 3. Logic à¹€à¸”à¸´à¸¡: à¹€à¸„à¸¥à¸µà¸¢à¸£à¹Œà¸£à¸¹à¸›à¸™à¸²à¸‡à¹à¸šà¸šà¸–à¹‰à¸²à¹€à¸¥à¸·à¸­à¸à¸„à¸²à¹à¸£à¸„à¹€à¸•à¸­à¸£à¹Œ
    if (typeof modelUploadedImages !== 'undefined' && modelUploadedImages.length > 0 && value !== 'auto') {
        try {
            modelUploadedImages = [];
            if (typeof modelUpdateUI === 'function') modelUpdateUI();
        } catch(e) {}
    }
}

function syncCharacterOutfitLock() {
    const characterValue = document.getElementById('banana-character-select')?.value || '';
    const outfitWrapper = document.getElementById('config-content-outfit')?.closest('.input-group');
    if (!outfitWrapper) return;

    const outfitLockedCharacters = new Set([
        'seller_woman', 'seller_man', 'doctor_female', 'doctor_male', 'nurse_female', 'nurse_male',
        'chef_female', 'chef_male', 'rider_male', 'farmer_female', 'warrior', 'princess',
        'detective', 'mafia_boss', 'cyber_girl', 'traveler'
    ]);

    if (!outfitLockedCharacters.has(characterValue)) return;

    outfitWrapper.classList.add('disabled-section');
    const outfitInput = document.getElementById('banana-outfit-select');
    if (outfitInput) outfitInput.value = 'ai_match';
    document.querySelectorAll('#config-content-outfit .config-option').forEach((option) => {
        option.classList.toggle('active', option.dataset.value === 'ai_match');
    });
}



// C. Toggle Config
function toggleConfig(id) {
    const content = document.getElementById(`config-content-${id}`);
    const header = document.getElementById(`header-${id}`);
    if(!content) return;

    document.querySelectorAll('.config-content').forEach(el => {
        if(el !== content && el.classList.contains('show')) {
            el.classList.remove('show');
            const otherId = el.id.replace('config-content-', '');
            const otherHeader = document.getElementById(`header-${otherId}`);
            if(otherHeader) otherHeader.classList.remove('open');
        }
    });

    content.classList.toggle('show');
    if(header) header.classList.toggle('open');
}

// D. Select Config Option (à¸‰à¸šà¸±à¸šà¸­à¸±à¸›à¹€à¸”à¸•: à¸›à¸´à¸”à¸Šà¸¸à¸”à¹ƒà¸«à¹‰ Fashion à¹à¸¥à¸°à¸à¸¥à¸¸à¹ˆà¸¡ Close-up)
function enableManualConfigMode(type) {
    const randomSwitchMap = {
        style: 'banana-random-style-switch',
        bg: 'banana-random-bg-switch',
        outfit: 'banana-random-outfit-switch'
    };
    const switchEl = document.getElementById(randomSwitchMap[type]);
    const container = document.getElementById(`config-content-${type}`);

    if (switchEl && switchEl.checked) {
        switchEl.checked = false;
        switchEl.dispatchEvent(new Event('change'));
    }

    if (container && container.classList.contains('disabled-section')) {
        container.classList.remove('disabled-section');
    }
}

function selectConfigOption(element) {
    if (element.disabled || element.classList.contains('is-locked')) {
        showToast('à¸•à¸±à¸§à¹€à¸¥à¸·à¸­à¸à¸™à¸µà¹‰à¹ƒà¸Šà¹‰à¹„à¸”à¹‰à¹€à¸‰à¸žà¸²à¸° Premium', 'warning');
        return;
    }

    const type = element.dataset.type;
    const value = element.dataset.value;
    const label = element.dataset.label;
    enableManualConfigMode(type);

    // 1. à¸­à¸±à¸›à¹€à¸”à¸•à¸„à¹ˆà¸²à¸¥à¸‡ Input
    let input = document.getElementById(`banana-${type}-select`);
    if (!input && type === 'vstyle') {
        input = document.getElementById('video-style-select');
    }
    if(input) input.value = value;

    // 2. à¸­à¸±à¸›à¹€à¸”à¸•à¸‚à¹‰à¸­à¸„à¸§à¸²à¸¡à¸—à¸µà¹ˆà¹à¸ªà¸”à¸‡
    const display = document.getElementById(`display-${type}`);
    if(display) {
        let cleanLabel = label;
        if(label.includes(' ')) cleanLabel = label.split(' ').slice(1).join(' ');
        display.innerHTML = label; 
    }

    // 3. à¹€à¸›à¸¥à¸µà¹ˆà¸¢à¸™à¸ªà¸µà¸›à¸¸à¹ˆà¸¡
    const container = document.getElementById(`config-content-${type}`);
    if(container) {
        container.querySelectorAll('.config-option').forEach(opt => opt.classList.remove('active'));
    }
    element.classList.add('active');
    
    if (type !== 'vstyle') {
        toggleConfig(type);
    }

// ============================================================
    // ðŸŸ¢ LOGIC: à¸¥à¹‡à¸­à¸„ "à¸„à¸²à¹à¸£à¸„à¹€à¸•à¸­à¸£à¹Œ", "à¸‰à¸²à¸" à¹à¸¥à¸° "à¸Šà¸¸à¸”" à¸­à¸±à¸•à¹‚à¸™à¸¡à¸±à¸•à¸´à¹€à¸¡à¸·à¹ˆà¸­à¹€à¸›à¸¥à¸µà¹ˆà¸¢à¸™à¸ªà¹„à¸•à¸¥à¹Œà¸ à¸²à¸ž
    // ============================================================
    if (type === 'style') {
        const outfitWrapper = document.getElementById('config-content-outfit')?.closest('.input-group');
        const bgWrapper = document.getElementById('config-content-bg')?.closest('.input-group');
        const charWrapper = document.getElementById('banana-character-select')?.closest('.input-group'); 
        
        const bgRandomSwitch = document.getElementById('banana-random-bg-switch');
        const outfitRandomSwitch = document.getElementById('banana-random-outfit-switch');

        // 1. à¸ˆà¸±à¸”à¸à¸¥à¸¸à¹ˆà¸¡à¸ªà¹„à¸•à¸¥à¹Œà¸—à¸µà¹ˆà¸•à¹‰à¸­à¸‡à¸¥à¹‡à¸­à¸„
     // ðŸŸ¢ à¸­à¸±à¸›à¹€à¸”à¸•: à¸¢à¹‰à¸²à¸¢à¹‚à¸«à¸¡à¸”à¸¡à¸·à¸­à¹à¸¥à¸°à¹€à¸—à¹‰à¸² à¸¡à¸²à¸£à¸§à¸¡à¹ƒà¸™à¸à¸¥à¸¸à¹ˆà¸¡à¸—à¸µà¹ˆà¸•à¹‰à¸­à¸‡à¸¥à¹‡à¸­à¸à¸—à¸±à¹‰à¸‡à¸„à¸™à¹à¸¥à¸°à¸Šà¸¸à¸”
        const noHumanStyles = ['showcase', 'decor', 'texture', 'unboxing', 'hands', 'shoes']; 
        const noOutfitStyles = ['fashion']; // à¹€à¸«à¸¥à¸·à¸­à¹à¸„à¹ˆà¹à¸Ÿà¸Šà¸±à¹ˆà¸™à¸—à¸µà¹ˆà¸¥à¹‡à¸­à¸à¹€à¸‰à¸žà¸²à¸°à¸Šà¸¸à¸” (à¹à¸•à¹ˆà¸¢à¸±à¸‡à¹ƒà¸«à¹‰à¹€à¸¥à¸·à¸­à¸à¸«à¸™à¹‰à¸²à¸„à¸™à¹„à¸”à¹‰)
        const fixedBgStyles = ['mirror']; // ðŸŸ¢ à¸šà¸±à¸‡à¸„à¸±à¸šà¸‰à¸²à¸à¹ƒà¸™à¸£à¹ˆà¸¡ (à¸«à¸™à¹‰à¸²à¸à¸£à¸°à¸ˆà¸) -> à¸¥à¹‡à¸­à¸„à¸‰à¸²à¸

        if (value === 'miniature') {
            // ðŸ™ï¸ à¸ªà¹„à¸•à¸¥à¹Œà¹€à¸¡à¸·à¸­à¸‡à¸ˆà¸´à¹‹à¸§: à¸•à¸±à¹‰à¸‡à¸„à¹ˆà¸²à¹€à¸£à¸´à¹ˆà¸¡à¸•à¹‰à¸™à¹ƒà¸«à¹‰ à¹à¸•à¹ˆà¸¢à¸±à¸‡à¹ƒà¸«à¹‰à¹€à¸¥à¸·à¸­à¸à¸‰à¸²à¸à¹à¸¥à¸°à¸Šà¸¸à¸”à¹€à¸­à¸‡à¹„à¸”à¹‰
            if (bgWrapper) bgWrapper.classList.remove('disabled-section');
            if (outfitWrapper) outfitWrapper.classList.remove('disabled-section');
            if (charWrapper && typeof modelUploadedImages !== 'undefined' && modelUploadedImages.length > 0) {
                charWrapper.classList.add('disabled-section');
            } else if (charWrapper) {
                charWrapper.classList.remove('disabled-section');
            }

            if (bgRandomSwitch) { bgRandomSwitch.checked = false; bgRandomSwitch.disabled = false; }
            if (outfitRandomSwitch) { outfitRandomSwitch.checked = false; outfitRandomSwitch.disabled = false; }

            const bgAutoBtn = document.querySelector('#config-content-bg .config-option[data-value="ai_match"]');
            const outfitAutoBtn = document.querySelector('#config-content-outfit .config-option[data-value="ai_match"]');
            const characterInput = document.getElementById('banana-character-select');
            
            if (bgAutoBtn) bgAutoBtn.click();
            if (outfitAutoBtn) outfitAutoBtn.click();
            if (characterInput) characterInput.value = 'office_lady';
            if (typeof switchCharTab === 'function') switchCharTab('preset');
            
            const charCustomInput = document.getElementById('banana-custom-character-input');
            if (charCustomInput) charCustomInput.value = '';

        } else if (noHumanStyles.includes(value)) {
            // ðŸ–¼ï¸ à¸ªà¹„à¸•à¸¥à¹Œà¹„à¸£à¹‰à¸„à¸™: à¸¥à¹‡à¸­à¸„ à¸„à¸²à¹à¸£à¸„à¹€à¸•à¸­à¸£à¹Œ + à¸Šà¸¸à¸” (à¹à¸•à¹ˆà¸¢à¸±à¸‡à¹ƒà¸«à¹‰à¹€à¸¥à¸·à¸­à¸à¸‰à¸²à¸à¹„à¸”à¹‰à¸­à¸´à¸ªà¸£à¸°)
            if (bgWrapper) bgWrapper.classList.remove('disabled-section');
            if (bgRandomSwitch) bgRandomSwitch.disabled = false;

            if (outfitWrapper) outfitWrapper.classList.add('disabled-section');
            if (charWrapper && typeof modelUploadedImages !== 'undefined' && modelUploadedImages.length > 0) {
                charWrapper.classList.add('disabled-section');
            } else if (charWrapper) {
                charWrapper.classList.remove('disabled-section');
            }

            if (outfitRandomSwitch) { outfitRandomSwitch.checked = false; outfitRandomSwitch.disabled = true; }

            const outfitAutoBtn = document.querySelector('#config-content-outfit .config-option[data-value="ai_match"]');
            const characterInput = document.getElementById('banana-character-select');
            
            if (outfitAutoBtn) outfitAutoBtn.click();
            if (characterInput) characterInput.value = 'office_lady';
            if (typeof switchCharTab === 'function') switchCharTab('preset');
            
            const charCustomInput = document.getElementById('banana-custom-character-input');
            if (charCustomInput) charCustomInput.value = '';

        } else {
            // ðŸ”“ à¸ªà¹„à¸•à¸¥à¹Œà¸­à¸·à¹ˆà¸™à¹†: à¸›à¸¥à¸”à¸¥à¹‡à¸­à¸„à¸„à¸²à¹à¸£à¸„à¹€à¸•à¸­à¸£à¹Œà¹€à¸ªà¸¡à¸­
            if (charWrapper) charWrapper.classList.remove('disabled-section');
            
            // ðŸŸ¢ à¸•à¸£à¸§à¸ˆà¸ªà¸­à¸šà¸§à¹ˆà¸²à¸ˆà¸°à¸•à¹‰à¸­à¸‡à¸¥à¹‡à¸­à¸„ "à¸‰à¸²à¸" à¸«à¸£à¸·à¸­à¹„à¸¡à¹ˆ (à¸ªà¸³à¸«à¸£à¸±à¸šà¸«à¸™à¹‰à¸²à¸à¸£à¸°à¸ˆà¸)
            if (bgWrapper) {
                if (fixedBgStyles.includes(value)) {
                    bgWrapper.classList.add('disabled-section'); // à¸¥à¹‡à¸­à¸à¸‰à¸²à¸à¹ƒà¸«à¹‰à¸¡à¸·à¸”
                    if (bgRandomSwitch) { bgRandomSwitch.checked = false; bgRandomSwitch.disabled = true; } // à¸›à¸´à¸”à¸ªà¸¸à¹ˆà¸¡à¸‰à¸²à¸
                    
                    // à¹à¸­à¸šà¸à¸”à¹€à¸¥à¸·à¸­à¸à¸‰à¸²à¸ "à¸«à¹‰à¸­à¸‡à¸™à¸­à¸™ (bedroom)" à¹ƒà¸«à¹‰à¸­à¸±à¸•à¹‚à¸™à¸¡à¸±à¸•à¸´ à¹€à¸žà¸·à¹ˆà¸­à¹ƒà¸«à¹‰à¸ªà¸¡à¸ˆà¸£à¸´à¸‡
                    const bedroomBtn = document.querySelector('#config-content-bg .config-option[data-value="bedroom"]');
                    if (bedroomBtn) bedroomBtn.click();
                } else {
                    bgWrapper.classList.remove('disabled-section'); // à¸›à¸¥à¸”à¸¥à¹‡à¸­à¸à¸‰à¸²à¸
                    if (bgRandomSwitch) bgRandomSwitch.disabled = false;
                }
            }

            // à¸•à¸£à¸§à¸ˆà¸ªà¸­à¸šà¸§à¹ˆà¸²à¸ˆà¸°à¸•à¹‰à¸­à¸‡à¸¥à¹‡à¸­à¸„ "à¸Šà¸¸à¸”" à¸«à¸£à¸·à¸­à¹„à¸¡à¹ˆ
            if (outfitWrapper) {
                if (noOutfitStyles.includes(value)) {
                    outfitWrapper.classList.add('disabled-section');
                    if (outfitRandomSwitch) { outfitRandomSwitch.checked = false; outfitRandomSwitch.disabled = true; }
                    const outfitAutoBtn = document.querySelector('#config-content-outfit .config-option[data-value="ai_match"]');
                    if (outfitAutoBtn) outfitAutoBtn.click();
                } else {
                    outfitWrapper.classList.remove('disabled-section');
                    if (outfitRandomSwitch) outfitRandomSwitch.disabled = false;
                }
            }
        }
    }
	
	
	// ðŸŸ¢ à¹€à¸žà¸´à¹ˆà¸¡: à¸–à¹‰à¸²à¹€à¸›à¹‡à¸™à¸à¸²à¸£à¹€à¸¥à¸·à¸­à¸ Video Style à¹ƒà¸«à¹‰à¹€à¸Šà¹‡à¸„à¸§à¹ˆà¸²à¸ˆà¸°à¸›à¸´à¸”à¸à¸¥à¹ˆà¸­à¸‡à¹€à¸ªà¸µà¸¢à¸‡à¹„à¸«à¸¡
    if (type === 'vstyle') {
        if (typeof checkVideoVoiceState === 'function') checkVideoVoiceState();
    }
    syncCharacterOutfitLock();
	
}


// E. Switch Config Tab (à¸‰à¸šà¸±à¸šà¹à¸à¹‰à¹„à¸‚: à¸£à¸­à¸‡à¸£à¸±à¸š Custom Tab + Auto Focus)
function switchConfigTab(element) {
    if (element.disabled || element.classList.contains('is-locked')) {
        showToast('à¸•à¸±à¸§à¹€à¸¥à¸·à¸­à¸à¸™à¸µà¹‰à¹ƒà¸Šà¹‰à¹„à¸”à¹‰à¹€à¸‰à¸žà¸²à¸° Premium', 'warning');
        return;
    }

    const type = element.dataset.type; // 'style', 'bg', 'outfit', 'vstyle'
    const groupName = element.dataset.group;
    enableManualConfigMode(type);

    if (groupName === 'custom' && window.FeatureGate) {
        const featureName = type === 'bg' ? 'customScene' : (type === 'outfit' ? 'customOutfit' : null);
        if (featureName && !FeatureGate.can(featureName)) {
            showToast('à¹‚à¸«à¸¡à¸”à¸£à¸°à¸šà¸¸à¹€à¸­à¸‡à¹ƒà¸Šà¹‰à¹„à¸”à¹‰à¹€à¸‰à¸žà¸²à¸° Premium', 'warning');
            return;
        }
    }
    
    const container = document.getElementById(`config-content-${type}`);
    if(!container) return;

    // 1. à¹€à¸›à¸¥à¸µà¹ˆà¸¢à¸™à¸ªà¸–à¸²à¸™à¸°à¸›à¸¸à¹ˆà¸¡ Tab à¹ƒà¸«à¹‰ Active
    container.querySelectorAll('.config-tab-btn').forEach(btn => btn.classList.remove('active'));
    element.classList.add('active');

   // 2. à¸à¸³à¸«à¸™à¸”à¸£à¸²à¸¢à¸à¸²à¸£à¸à¸¥à¸¸à¹ˆà¸¡à¸‚à¸­à¸‡à¹à¸•à¹ˆà¸¥à¸°à¸›à¸£à¸°à¹€à¸ à¸— (à¸­à¸±à¸›à¹€à¸”à¸•à¹ƒà¸«à¹‰à¹€à¸«à¸¥à¸·à¸­ 4 à¸à¸¥à¸¸à¹ˆà¸¡)
    let groups = [];
    if(type === 'style') {
       groups = ['recommended', 'human', 'product', 'other'];
    } else if (type === 'bg') {
       groups = ['popular', 'other', 'custom']; 
    } else if (type === 'outfit') {
       groups = ['recommended', 'all', 'custom']; 
    } else if (type === 'vstyle') { 
       groups = ['promo', 'review', 'demo', 'fun', 'voiceover', 'broll'];
    }

    // 3. à¸§à¸™à¸¥à¸¹à¸›à¹€à¸›à¸´à¸”/à¸›à¸´à¸” Group à¹à¸¥à¸° Auto Select
    groups.forEach(g => {
        const groupId = `${type}-group-${g}`;
        const el = document.getElementById(groupId);
        
        if(el) {
            if (g === groupName) {
                // à¹€à¸›à¸´à¸”à¹à¸ªà¸”à¸‡à¸œà¸¥ Group à¸™à¸µà¹‰
                // à¸«à¸¡à¸²à¸¢à¹€à¸«à¸•à¸¸: à¸–à¹‰à¸²à¹€à¸›à¹‡à¸™ 'custom' à¸«à¸£à¸·à¸­ 'auto' à¹ƒà¸«à¹‰à¹ƒà¸Šà¹‰ display: block (à¹„à¸¡à¹ˆà¹ƒà¸Šà¹ˆ grid)
                el.style.display = (g === 'auto' || g === 'custom') ? 'block' : 'grid';

                // Auto Select: à¸–à¹‰à¸²à¸¡à¸µà¸•à¸±à¸§à¹€à¸¥à¸·à¸­à¸à¹à¸„à¹ˆ 1 à¸­à¸±à¸™ à¸«à¸£à¸·à¸­à¹€à¸›à¹‡à¸™à¹‚à¸«à¸¡à¸” auto -> à¸à¸”à¹ƒà¸«à¹‰à¹€à¸¥à¸¢
                const options = el.querySelectorAll('.config-option');
                if (options.length > 0) {
                    if (options.length === 1 || g === 'auto') {
                        setTimeout(() => {
                            options[0].click();
                        }, 50);
                    }
                }

            } else {
                // à¸›à¸´à¸” Group à¸­à¸·à¹ˆà¸™
                el.style.display = 'none';
            }
        }
    });

    // ðŸŸ¢ [Logic à¸žà¸´à¹€à¸¨à¸©] à¸–à¹‰à¸²à¹€à¸¥à¸·à¸­à¸à¹à¸—à¹‡à¸š custom à¹ƒà¸«à¹‰à¹‚à¸Ÿà¸à¸±à¸ªà¸Šà¹ˆà¸­à¸‡à¸žà¸´à¸¡à¸žà¹Œà¸—à¸±à¸™à¸—à¸µ
    if (groupName === 'custom') {
        const inputId = `banana-custom-${type}-input`; // à¸ªà¸£à¹‰à¸²à¸‡ ID à¸­à¸±à¸•à¹‚à¸™à¸¡à¸±à¸•à¸´ à¹€à¸Šà¹ˆà¸™ banana-custom-bg-input
        const input = document.getElementById(inputId);
        if(input) {
            setTimeout(() => input.focus(), 100);
        }
    }
}




// F. Select Segment (Rounds & Clips) - à¹à¸à¹‰à¹„à¸‚à¸£à¸­à¸‡à¸£à¸±à¸šà¸—à¸±à¹‰à¸‡ Video à¹à¸¥à¸° Banana
function selectSegment(element) {
    if (element.disabled || element.classList.contains('is-locked')) {
        showToast('à¸•à¸±à¸§à¹€à¸¥à¸·à¸­à¸à¸™à¸µà¹‰à¹ƒà¸Šà¹‰à¹„à¸”à¹‰à¹€à¸‰à¸žà¸²à¸° Premium', 'warning');
        return;
    }
    const type = element.dataset.type;   // 'rounds' à¸«à¸£à¸·à¸­ 'clips'
    const value = element.dataset.value; // '1', '3', '5', 'custom'

    // 1. à¹€à¸Šà¹‡à¸„à¸§à¹ˆà¸²à¸à¸”à¸¡à¸²à¸ˆà¸²à¸à¸«à¸™à¹‰à¸²à¹„à¸«à¸™? (Video à¸«à¸£à¸·à¸­ Banana)
    const isVideoTab = element.closest('#tab-content-video') !== null;
    const isBasicPlan = window.FeatureGate && FeatureGate.getPlan && FeatureGate.getPlan() === 'basic';
    if (isBasicPlan && type === 'rounds' && (value === '5' || value === 'custom')) {
        showToast('Basic à¸ˆà¸³à¸à¸±à¸”à¸£à¸­à¸šà¸ªà¸¹à¸‡à¸ªà¸¸à¸” 3 à¸£à¸­à¸š', 'warning');
        if (window.FeatureGate) FeatureGate.enforceBasicRoundLimit();
        return;
    }
    
    // 2. à¸à¸³à¸«à¸™à¸” ID à¹€à¸›à¹‰à¸²à¸«à¸¡à¸²à¸¢à¹ƒà¸«à¹‰à¸–à¸¹à¸à¸à¸±à¹ˆà¸‡
    let mainInputId, customInputId;

    if (isVideoTab) {
        // à¸à¸±à¹ˆà¸‡ Video
        mainInputId = (type === 'rounds') ? 'video-round-count' : 'video-download-count-auto';
        customInputId = 'video-custom-round-input';
    } else {
        // à¸à¸±à¹ˆà¸‡ Banana
        mainInputId = (type === 'rounds') ? 'banana-round-count' : 'banana-download-count';
        customInputId = 'banana-custom-round-input';
    }

    // 3. à¸ˆà¸±à¸”à¸à¸²à¸£à¸à¸£à¸“à¸µà¹€à¸¥à¸·à¸­à¸ 'custom' (+)
    if (value === 'custom') {
        const customInput = document.getElementById(customInputId);
        if (customInput) {
            customInput.classList.remove('hidden'); // à¹€à¸›à¸´à¸”à¸Šà¹ˆà¸­à¸‡à¸à¸£à¸­à¸
            customInput.style.display = 'block';    // à¸šà¸±à¸‡à¸„à¸±à¸šà¹‚à¸Šà¸§à¹Œ
            customInput.focus();
        }
        
        // à¸­à¸±à¸›à¹€à¸”à¸• UI à¸›à¸¸à¹ˆà¸¡
        const parent = element.parentElement;
        parent.querySelectorAll('.segment-opt').forEach(b => b.classList.remove('active'));
        element.classList.add('active');
        
        // à¸šà¸­à¸ input à¸«à¸¥à¸±à¸à¸§à¹ˆà¸²à¹€à¸›à¹‡à¸™ custom
        const mainInput = document.getElementById(mainInputId);
        if (mainInput) mainInput.value = 'custom';
        
        return; // à¸ˆà¸šà¸‡à¸²à¸™
    }

    // 4. à¸ˆà¸±à¸”à¸à¸²à¸£à¸à¸£à¸“à¸µà¹€à¸¥à¸·à¸­à¸à¸•à¸±à¸§à¹€à¸¥à¸‚à¸›à¸à¸•à¸´ (1, 3, 5)
    // à¸‹à¹ˆà¸­à¸™à¸Šà¹ˆà¸­à¸‡ custom à¸à¸¥à¸±à¸šà¹„à¸›
    const customInput = document.getElementById(customInputId);
    if (customInput) {
        customInput.classList.add('hidden');
        customInput.style.display = 'none';
    }

    // à¸­à¸±à¸›à¹€à¸”à¸•à¸„à¹ˆà¸²à¸¥à¸‡ Input à¸«à¸¥à¸±à¸
    const mainInput = document.getElementById(mainInputId);
    if (mainInput) {
        mainInput.value = value;
        
        // à¸­à¸±à¸›à¹€à¸”à¸• UI à¸›à¸¸à¹ˆà¸¡ active
        const parent = element.parentElement;
        parent.querySelectorAll('.segment-opt').forEach(b => b.classList.remove('active'));
        element.classList.add('active');

        // à¸ªà¸±à¹ˆà¸‡à¸­à¸±à¸›à¹€à¸”à¸•à¸‚à¹‰à¸­à¸„à¸§à¸²à¸¡à¸ªà¸£à¸¸à¸›à¸—à¸±à¸™à¸—à¸µ
        if (isVideoTab && typeof videoUpdateRoundInfo === 'function') videoUpdateRoundInfo();
        if (!isVideoTab && typeof bananaUpdateRoundInfo === 'function') bananaUpdateRoundInfo();
    }
}

// G. Setup Visual UI
function setupAllVisualUI() {
    console.log("ðŸ› ï¸ Setting up Visual UI...");
    function addSafeClick(selector, callback) {
        const elements = document.querySelectorAll(selector);
        elements.forEach(el => {
            const newEl = el.cloneNode(true);
            el.parentNode.replaceChild(newEl, el);
            newEl.addEventListener('click', (e) => callback(newEl, e));
        });
    }

    addSafeClick('.char-tab-btn:not(.config-tab-btn)', (btn) => switchCharTab(btn.dataset.target || btn.getAttribute('data-target')));
    
    // ðŸŸ¢ [à¸ˆà¸¸à¸”à¸—à¸µà¹ˆà¹à¸à¹‰à¹„à¸‚]: à¹€à¸žà¸´à¹ˆà¸¡ :not(.mascot-expression) à¹€à¸žà¸·à¹ˆà¸­à¸ªà¸±à¹ˆà¸‡à¹ƒà¸«à¹‰à¸£à¸°à¸šà¸š "à¸«à¹‰à¸²à¸¡à¸¥à¹‰à¸²à¸‡à¸£à¸¹à¸›à¸™à¸²à¸‡à¹à¸šà¸š" à¹€à¸¡à¸·à¹ˆà¸­à¸¡à¸µà¸à¸²à¸£à¹€à¸›à¸¥à¸µà¹ˆà¸¢à¸™à¸ªà¸µà¸«à¸™à¹‰à¸²à¸¡à¸²à¸ªà¸„à¸­à¸•
    addSafeClick('.char-card:not(.mascot-card):not(.mascot-bg):not(.mascot-outfit):not(.mascot-expression)', (card) => selectCharacter(card, card.dataset.value));
	
    addSafeClick('.config-header', (header) => toggleConfig(header.dataset.target));
    addSafeClick('.config-option', (opt) => selectConfigOption(opt));
    addSafeClick('.config-tab-btn', (btn) => switchConfigTab(btn));
    addSafeClick('.segment-opt', (seg) => selectSegment(seg));
}

function fixThaiRuntimeText() {
    const styleLabel = document.querySelector('#manual-config-container .input-group label');
    if (styleLabel) styleLabel.textContent = 'สไตล์ภาพ (Style)';

    const randomStyleLabel = document.querySelector('#style-random-wrapper span');
    if (randomStyleLabel) randomStyleLabel.textContent = '🎲 สุ่มสไตล์ (Random Style)';

    const tabLabels = {
        'style:recommended': '⭐ สไตล์แนะนำ',
        'style:human': '👤 คน+สินค้า',
        'style:product': '🖼️ สินค้า+ฉาก',
        'style:other': '🧩 อื่นๆ',
        'angle:recommended': '📷 มุมกล้อง',
        'bg:popular': '⭐ ยอดนิยม',
        'bg:other': '🧩 ฉากทั้งหมด',
        'bg:custom': '✏️ ระบุเอง',
        'outfit:recommended': '⭐ ชุดแนะนำ',
        'outfit:all': '🧥 ชุดทั้งหมด',
        'outfit:custom': '✏️ ระบุเอง',
    };
    document.querySelectorAll('.config-tab-btn').forEach((button) => {
        const key = `${button.dataset.type}:${button.dataset.group}`;
        if (tabLabels[key]) button.textContent = tabLabels[key];
    });

    const styleLabels = {
        ugc_basic: '💬 UGC Basic Cute',
        studio: '🔥 โปรโมทขั้นสุด',
        live: '🔴 ไลฟ์สด',
        fashion: '👗 แฟชั่น (สวมใส่)',
        usage: '📸 ไลฟ์สไตล์',
        funny: '🤪 หัวโต',
        sony_product: '📷 Sony Product',
        shop_review: '🏪 รีวิวหน้าร้าน',
        natural_light: '🌤️ แสงธรรมชาติ',
        real_ads: '🎯 โฆษณาเรียล',
        model: '💃 นายแบบ (เต็มตัว)',
        influencer: '🤳 อินฟลูฯ (Vlog)',
        beauty: '💄 บิวตี้ (หน้าชัด)',
        review: '✋ ถือสินค้า (รีวิว)',
        mirror: '🪞 หน้ากระจก (สวมใส่)',
        sony_portrait: '📸 Sony Portrait Ads',
        lifestyle_review: '☕ Lifestyle Review',
        texture: '💧 เนื้อสัมผัส (ซูม)',
        unboxing: '📦 แกะกล่อง (POV)',
        shoes: '👟 รองเท้า (เห็นเท้า)',
        hands: '🛠️ สาธิต (เห็นมือ)',
        decor: '🛋️ ของชิ้นใหญ่',
        showcase: '🖼️ สินค้าล้วน',
        catalog: '🧾 Studio Catalog',
        counter_display: '🛒 Counter Display',
        premium_closeup: '🔎 Premium Close-up',
        fancy: '✨ แฟนซี (ของลอย)',
        cgi: '🪐 CGI สินค้ายักษ์',
        miniature: '🏙️ เมืองจิ๋ว',
        outdoor_market: '⛱️ Outdoor Market',
    };
    Object.entries(styleLabels).forEach(([value, text]) => {
        document.querySelectorAll(`.config-option[data-type="style"][data-value="${value}"]`).forEach((item) => {
            item.innerHTML = `<span class="char-icon">${text.split(' ')[0]}</span> ${text.replace(/^\S+\s*/, '')}`;
            item.dataset.label = text;
        });
    });

    const angleLabel = document.querySelector('#config-content-angle')?.closest('.input-group')?.querySelector('label');
    if (angleLabel) angleLabel.textContent = 'มุมกล้อง (Camera Angle)';
    const angleGroup = document.getElementById('config-content-angle')?.closest('.input-group');
    if (angleGroup) angleGroup.style.display = 'none';

    const bgLabel = document.querySelector('#config-content-bg')?.closest('.input-group')?.querySelector('label');
    if (bgLabel) bgLabel.textContent = 'ฉากหลัง (Background)';

    const outfitLabel = document.querySelector('#config-content-outfit')?.closest('.input-group')?.querySelector('label');
    if (outfitLabel) outfitLabel.textContent = 'ชุด (Outfit)';

    const roundLabel = document.querySelector('label[for="banana-round-dropdown"]');
    if (roundLabel) roundLabel.textContent = 'จำนวนรอบต่อสินค้า';

    const saveLabel = document.querySelector('.output-save-field .output-label');
    if (saveLabel) saveLabel.innerHTML = 'บันทึกรูป<span class="output-save-hint">ปิดไว้จะทำงานเร็วขึ้น</span>';

    const pipelineLabel = document.querySelector('label[for="banana-to-video-style-select"]');
    if (pipelineLabel) pipelineLabel.textContent = 'สไตล์วิดีโอหลังสร้างภาพ';

    const pipelineDesc = document.querySelector('.pipeline-desc');
    if (pipelineDesc) pipelineDesc.textContent = 'สร้างภาพเสร็จแล้วส่งต่อไปทำวิดีโออัตโนมัติ';

    const customRoundInput = document.getElementById('banana-custom-round-input');
    if (customRoundInput) customRoundInput.placeholder = 'จำนวนรอบ...';
}

// ============================================
// 2. MAIN INITIALIZATION
// ============================================

document.addEventListener('DOMContentLoaded', () => {
	
	// ============================================
    // ðŸŸ¢ à¸ªà¹ˆà¸§à¸™à¸—à¸µà¹ˆà¹€à¸žà¸´à¹ˆà¸¡à¹ƒà¸«à¸¡à¹ˆ 2: à¸ªà¸±à¹ˆà¸‡à¹ƒà¸«à¹‰à¸›à¸¸à¹ˆà¸¡à¸—à¸³à¸‡à¸²à¸™ (à¸§à¸²à¸‡à¸šà¸£à¸£à¸—à¸±à¸”à¹à¸£à¸à¹ƒà¸™ DOMContentLoaded)
    // ============================================
    
    // 1. à¸œà¸¹à¸à¸›à¸¸à¹ˆà¸¡à¸ªà¸¥à¸±à¸šà¹‚à¸«à¸¡à¸” Human/Mascot à¹ƒà¸«à¹‰à¸à¸”à¹„à¸”à¹‰
    const btnHuman = document.getElementById('btn-mode-human');
    const btnMascot = document.getElementById('btn-mode-mascot');
    
    if (btnHuman) {
        btnHuman.addEventListener('click', (e) => {
            e.preventDefault();
            switchAppMode('human');
        });
    }
    if (btnMascot) {
        btnMascot.addEventListener('click', (e) => {
            e.preventDefault();
            switchAppMode('mascot');
        });
    }

    // 2. à¹€à¸£à¸µà¸¢à¸à¹ƒà¸Šà¹‰à¸Ÿà¸±à¸‡à¸à¹Œà¸Šà¸±à¸™à¸ˆà¸±à¸”à¸à¸²à¸£à¸›à¸¸à¹ˆà¸¡à¸«à¸™à¹‰à¸² Mascot
    setupMascotEvents();
    
    // ============================================
    // (à¸ˆà¸šà¸ªà¹ˆà¸§à¸™à¸—à¸µà¹ˆà¹€à¸žà¸´à¹ˆà¸¡à¹ƒà¸«à¸¡à¹ˆ - à¹‚à¸„à¹‰à¸”à¹€à¸”à¸´à¸¡à¸•à¹ˆà¸­à¸ˆà¸²à¸à¸™à¸µà¹‰à¸«à¹‰à¸²à¸¡à¸¥à¸š)
    // ============================================
	

	
	
    organizeCharacterSourcePanel();
    fixThaiRuntimeText();
    setupAllVisualUI();
    if (window.FeatureGate && FeatureGate.applyPlan) {
        FeatureGate.applyPlan(FeatureGate.getPlan ? FeatureGate.getPlan() : undefined);
    }

    if(typeof setupSettingsModal === 'function') setupSettingsModal();
    const overlay = document.getElementById('login-overlay');
    if (overlay) overlay.style.display = 'none';
    
    if(document.getElementById('banana-upload-zone')) {
        bananaSetupUploadZone();
        bananaSetupEventListeners();
        bananaUpdateImageCount();
    }
    if(document.getElementById('model-upload-zone')) {
        modelSetupUploadZone();
    }
    if(document.getElementById('video-upload-zone')) {
        videoSetupUploadZone();
        videoSetupEventListeners();
        videoUpdateImageCount();
	// ðŸŸ¢ à¹€à¸žà¸´à¹ˆà¸¡: à¹€à¸Šà¹‡à¸„à¸ªà¸–à¸²à¸™à¸°à¸à¸¥à¹ˆà¸­à¸‡à¹€à¸ªà¸µà¸¢à¸‡à¸—à¸±à¸™à¸—à¸µà¸—à¸µà¹ˆà¹‚à¸«à¸¥à¸”à¹€à¸ªà¸£à¹‡à¸ˆ
        if (typeof checkVideoVoiceState === 'function') checkVideoVoiceState();
    }
// ðŸŸ¢ Tab Switching Logic
    const tabButtons = document.querySelectorAll('.segment-btn');
    const tabContents = document.querySelectorAll('.tab-pane');
    const setActiveModeTheme = (mode) => {
      document.body.dataset.activeMode = mode === 'video' ? 'video' : 'image';
    };

    const initialActiveTab = document.querySelector('.segment-btn.active')?.dataset.tab || 'banana';
    setActiveModeTheme(initialActiveTab);

    tabButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        if (btn.disabled || btn.classList.contains('is-locked')) {
          return;
        }
        setActiveModeTheme(btn.dataset.tab);
        tabButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        tabContents.forEach(content => {
           content.classList.remove('active');
           if (content.id === `tab-content-${btn.dataset.tab}`) {
               content.classList.add('active');
           }
        });
      });
    });
    
    console.log("System Ready: V4.0.9 (Duplicate Fixed)"); 
});




// ============================================
// ðŸ› ï¸ ROBUST CLICK SYSTEM (à¹€à¸žà¸´à¹ˆà¸¡à¹€à¸žà¸·à¹ˆà¸­à¸„à¸§à¸²à¸¡à¹€à¸ªà¸–à¸µà¸¢à¸£)
// ============================================
async function legacySmartClick(tabId, selector, textMatch = null) {
  return await chrome.scripting.executeScript({
    target: { tabId: tabId },
    func: (sel, txt) => {
      const sleep = (ms) => new Promise(r => setTimeout(r, ms));
      const heavyClick = (el) => {
        if (!el) return false;
        ['mousedown', 'click', 'mouseup'].forEach(evt => {
          el.dispatchEvent(new MouseEvent(evt, { bubbles: true, cancelable: true, view: window }));
        });
        return true;
      };

      let target = null;
      if (txt) {
        const allBtns = Array.from(document.querySelectorAll('button, div[role="button"], [role="menuitem"]'));
        target = allBtns.find(b => (b.textContent || "").includes(txt));
      } else {
        target = document.querySelector(sel);
      }

      if (target) {
        target.scrollIntoView({ behavior: 'instant', block: 'center' });
        return heavyClick(target);
      }
      return false;
    },
    args: [selector, textMatch]
  });
}








// ============================================
// SHARED UTILITIES
// ============================================


//function getAutomationDelay(key) {
   // const defaults = { actionMin: 2000, actionMax: 4000, afterUploadImage: 3000, afterFillPrompt: 2000, betweenDownloads: 2000 };
  //  return defaults[key] || 3000;
//}

function inferRunProgress(message, isRunning = false) {
  const text = String(message || '').toLowerCase();

  if (!message || text.includes('ready')) return { percent: 0, step: 'assets' };
  if (text.includes('à¹€à¸ªà¸£à¹‡à¸ˆ') || text.includes('complete') || text.includes('mission complete')) {
    return { percent: 100, step: 'run' };
  }
  if (text.includes('error') || text.includes('à¸«à¸¢à¸¸à¸”') || text.includes('stop')) {
    return { percent: isRunning ? 55 : 0, step: 'run' };
  }
  if (text.includes('download') || text.includes('à¸”à¸²à¸§à¸™à¹Œà¹‚à¸«à¸¥à¸”') || text.includes('à¸”à¸¹à¸”à¹„à¸Ÿà¸¥à¹Œ') || text.includes('à¸šà¸±à¸™à¸—à¸¶à¸')) {
    return { percent: 88, step: 'run' };
  }
  if (text.includes('à¸£à¸­') || text.includes('generat') || text.includes('render') || text.includes('create') || text.includes('à¸ªà¸£à¹‰à¸²à¸‡')) {
    return { percent: 68, step: 'run' };
  }
  if (text.includes('upload') || text.includes('à¸­à¸±à¸žà¹‚à¸«à¸¥à¸”') || text.includes('à¹€à¸žà¸´à¹ˆà¸¡à¸¥à¸‡à¸žà¸£à¸­à¸¡à¸•à¹Œ')) {
    return { percent: 38, step: 'assets' };
  }
  if (text.includes('prompt') || text.includes('à¸žà¸£à¸­à¸¡à¸•à¹Œ') || text.includes('keyword') || text.includes('fill')) {
    return { percent: 24, step: 'prompt' };
  }
  if (text.includes('style') || text.includes('à¹€à¸ªà¸µà¸¢à¸‡') || text.includes('à¸•à¸±à¹‰à¸‡à¸„à¹ˆà¸²') || text.includes('mode')) {
    return { percent: 12, step: 'creative' };
  }

  return { percent: isRunning ? 12 : 0, step: isRunning ? 'run' : 'assets' };
}

function updateRunProgress(scope, percent, stepName) {
  const safePercent = Math.max(0, Math.min(100, Number(percent) || 0));
  const bar = document.getElementById(`${scope}-progress-bar`);
  const text = document.getElementById(`${scope}-progress-text`);
  const stepText = document.getElementById(`${scope}-step-text`);
  const stepLabels = {
    assets: 'à¹€à¸•à¸£à¸µà¸¢à¸¡à¸‚à¹‰à¸­à¸¡à¸¹à¸¥à¹à¸¥à¸°à¸£à¸¹à¸›à¸ à¸²à¸ž',
    prompt: 'à¸à¸³à¸¥à¸±à¸‡à¸ªà¸£à¹‰à¸²à¸‡ Prompt',
    creative: 'à¸à¸³à¸¥à¸±à¸‡à¸•à¸±à¹‰à¸‡à¸„à¹ˆà¸²à¸ªà¹„à¸•à¸¥à¹Œ',
    run: 'à¸à¸³à¸¥à¸±à¸‡à¸£à¸±à¸™à¸‡à¸²à¸™',
  };

  if (bar) bar.style.width = `${safePercent}%`;
  if (text) text.textContent = `${Math.round(safePercent)}%`;
  if (stepText) stepText.textContent = `à¸‚à¸±à¹‰à¸™à¸•à¸­à¸™: ${stepLabels[stepName] || stepLabels.assets}`;

  updateWorkflowTimeline(stepName, safePercent);
}

function updateWorkflowTimeline(activeStep = 'assets', percent = 0) {
  const order = ['assets', 'prompt', 'creative', 'run'];
  const activeIndex = Math.max(0, order.indexOf(activeStep));

  document.querySelectorAll('.workflow-step').forEach((step) => {
    const stepIndex = Math.max(0, order.indexOf(step.dataset.step));
    step.classList.toggle('active', stepIndex === activeIndex);
    step.classList.toggle('done', percent >= 100 || stepIndex < activeIndex);
  });
}

// ============================================
// ðŸ›¡ï¸ ANTI-BOT PROMPT RANDOMIZER
// ============================================
function getAntiBotSeed() {
    // à¸ªà¸¸à¹ˆà¸¡à¸„à¸³à¸„à¸¸à¸“à¸¨à¸±à¸žà¸—à¹Œà¹à¸¥à¸°à¸£à¸«à¸±à¸ª à¹€à¸žà¸·à¹ˆà¸­à¹ƒà¸«à¹‰ Prompt à¹à¸•à¹ˆà¸¥à¸°à¸£à¸­à¸šà¸¡à¸µ Hash à¹„à¸¡à¹ˆà¸‹à¹‰à¸³à¸à¸±à¸™
    const adjs = ['vivid', 'clear', 'sharp', 'detailed', 'crisp', 'clean', 'fine'];
    const randAdj = adjs[Math.floor(Math.random() * adjs.length)];
    const randHash = Math.random().toString(36).substring(2, 6);
    return ` (Render: ${randAdj}-${randHash})`;
}





// ============================================
// VIDEO Prompt & Play Studio MODULE
// ============================================

// DOM Elements (Video Tab - prefix: video-)
const videoUploadZone = document.getElementById('video-upload-zone');
const videoFileInput = document.getElementById('video-file-input');
const videoImageCount = document.getElementById('video-image-count');
const videoClearImagesBtn = document.getElementById('video-clear-images');
const videoStatusText = document.getElementById('video-status-text');
const videoBtnAutomation = document.getElementById('video-btn-automation');
const videoDownloadCountAuto = document.getElementById('video-download-count-auto');
const videoBtnStop = document.getElementById('video-btn-stop');
const videoPromptStatus = document.getElementById('video-prompt-status');
const videoRoundCountSelect = document.getElementById('video-round-count');
const videoCustomRoundInput = document.getElementById('video-custom-round-input');
const videoRoundInfo = document.getElementById('video-round-info');
const videoProductNameInput = document.getElementById('video-product-name');
const videoBtnGeneratePrompt = document.getElementById('video-btn-generate-prompt');
const videoPromptResultContainer = document.getElementById('video-prompt-result-container');
const videoPromptResult = document.getElementById('video-prompt-result');
const videoBtnCopyPrompt = document.getElementById('video-btn-copy-prompt');
const videoLogContainer = document.getElementById('video-log-container');
const videoLogClearBtn = document.getElementById('video-log-clear');
// [à¸ªà¹ˆà¸§à¸™à¹€à¸žà¸´à¹ˆà¸¡à¹ƒà¸«à¸¡à¹ˆ] à¸•à¸±à¸§à¹à¸›à¸£à¸ªà¸³à¸«à¸£à¸±à¸šà¹€à¸¥à¸·à¸­à¸à¹€à¸ªà¸µà¸¢à¸‡/à¸ªà¸³à¹€à¸™à¸µà¸¢à¸‡
const videoVoiceStyleSelect = document.getElementById('video-voice-style-select');
const videoRandomVoiceCheckbox = document.getElementById('video-random-voice-checkbox');

// Store uploaded images (Video)
let videoUploadedImages = [];
let videoCurrentImageIndex = 0;
let videoIsAutomationRunning = false;
let videoShouldStopAutomation = false;
let videoStatusTimeoutId = null;
let videoLogs = [];


// Video Prompt & Play Studio: Setup upload zone events
function videoSetupUploadZone() {
  videoUploadZone.addEventListener('click', () => {
    videoFileInput.click();
  });

  videoFileInput.addEventListener('change', (e) => {
    videoHandleFiles(e.target.files);
  });

  videoUploadZone.addEventListener('dragover', (e) => {
    e.preventDefault();
    videoUploadZone.classList.add('dragover');
  });

  videoUploadZone.addEventListener('dragleave', (e) => {
    e.preventDefault();
    videoUploadZone.classList.remove('dragover');
  });

  videoUploadZone.addEventListener('drop', (e) => {
    e.preventDefault();
    videoUploadZone.classList.remove('dragover');
    videoHandleFiles(e.dataTransfer.files);
  });
}

// ============================================
// VIDEO IMAGE PREVIEW SYSTEM (à¹€à¸žà¸´à¹ˆà¸¡à¹ƒà¸«à¸¡à¹ˆ)
// ============================================
const videoPreviewContainer = document.getElementById('video-preview-container');

// à¸Ÿà¸±à¸‡à¸à¹Œà¸Šà¸±à¸™à¸ˆà¸±à¸”à¸à¸²à¸£à¹„à¸Ÿà¸¥à¹Œà¸—à¸µà¹ˆà¸­à¸±à¸›à¹‚à¸«à¸¥à¸” (Video)
function videoHandleFiles(files) {
  const imageFiles = Array.from(files).filter(file => file.type.startsWith('image/'));

  imageFiles.forEach(file => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const imageData = {
        id: Date.now() + Math.random(),
        name: file.name,
        size: file.size,
        type: file.type,
        dataUrl: e.target.result
      };
      videoUploadedImages.push(imageData);
      videoUpdateImageCount(); // à¹€à¸£à¸µà¸¢à¸à¸­à¸±à¸›à¹€à¸”à¸•à¸«à¸™à¹‰à¸²à¸ˆà¸­
    };
    reader.readAsDataURL(file);
  });

  videoFileInput.value = '';
}

// à¸Ÿà¸±à¸‡à¸à¹Œà¸Šà¸±à¸™à¸¥à¸šà¸£à¸¹à¸›à¸—à¸±à¹‰à¸‡à¸«à¸¡à¸” (Video)
function videoClearAllImages() {
  videoUploadedImages = [];
  videoUpdateImageCount();
  videoUpdateStatus('All images cleared');
}

// à¸Ÿà¸±à¸‡à¸à¹Œà¸Šà¸±à¸™à¸¥à¸šà¸—à¸µà¸¥à¸°à¸£à¸¹à¸› (Video)
function videoRemoveOneImage(index) {
  videoUploadedImages.splice(index, 1);
  videoUpdateImageCount();
}

// à¸Ÿà¸±à¸‡à¸à¹Œà¸Šà¸±à¸™à¸­à¸±à¸›à¹€à¸”à¸•à¸«à¸™à¹‰à¸²à¸ˆà¸­à¹à¸¥à¸°à¹à¸ªà¸”à¸‡à¸£à¸¹à¸›à¸•à¸±à¸§à¸­à¸¢à¹ˆà¸²à¸‡ (Video)
function videoUpdateImageCount() {
  // 1. à¸­à¸±à¸›à¹€à¸”à¸•à¸•à¸±à¸§à¹€à¸¥à¸‚
  videoImageCount.textContent = videoUploadedImages.length;

  // 2. à¸ˆà¸±à¸”à¸à¸²à¸£à¸›à¸¸à¹ˆà¸¡ Clear All
  if (videoUploadedImages.length > 0) {
    if(videoClearImagesBtn) videoClearImagesBtn.style.display = 'flex';
  } else {
    if(videoClearImagesBtn) videoClearImagesBtn.style.display = 'none';
  }

  // 3. à¸­à¸±à¸›à¹€à¸”à¸•à¸‚à¹‰à¸­à¸¡à¸¹à¸¥à¸£à¸­à¸š
  videoUpdateRoundInfo();

  // 4. à¸ªà¸£à¹‰à¸²à¸‡à¸£à¸¹à¸›à¸•à¸±à¸§à¸­à¸¢à¹ˆà¸²à¸‡ (Render Previews)
  if (videoPreviewContainer) {
    videoPreviewContainer.innerHTML = ''; // à¹€à¸„à¸¥à¸µà¸¢à¸£à¹Œà¸‚à¸­à¸‡à¹€à¸à¹ˆà¸²

    videoUploadedImages.forEach((img, index) => {
      const item = document.createElement('div');
      item.className = 'preview-item'; // à¹ƒà¸Šà¹‰ Style à¹€à¸”à¸µà¸¢à¸§à¸à¸±à¸šà¸«à¸™à¹‰à¸² Banana

      const imgEl = document.createElement('img');
      imgEl.src = img.dataUrl;
      imgEl.title = img.name;

      // à¸›à¸¸à¹ˆà¸¡à¸¥à¸š
      const delBtn = document.createElement('button');
      delBtn.className = 'preview-remove-btn';
      delBtn.innerHTML = 'âœ•';
      delBtn.onclick = () => videoRemoveOneImage(index);

      item.appendChild(imgEl);
      item.appendChild(delBtn);
      videoPreviewContainer.appendChild(item);
    });
  }
}

// Video Prompt & Play Studio: Update round info display
function videoUpdateRoundInfo() {
  const select = document.getElementById('video-round-count');
  const customInput = document.getElementById('video-custom-round-input');
  const roundInfo = document.getElementById('video-round-info');

  if (!select) return;

  const imageTotal = videoUploadedImages.length;
  const selectValue = select.value;

  if (selectValue === 'custom') {
    if (customInput) customInput.style.display = 'block';
  } else {
    if (customInput) customInput.style.display = 'none';
  }

  // à¹à¸à¹‰à¹„à¸‚: à¸›à¸¥à¸”à¸¥à¹‡à¸­à¸„à¹‚à¸Šà¸§à¹Œ Text à¹€à¸ªà¸¡à¸­ (à¸‚à¸­à¸‡à¹€à¸”à¸´à¸¡à¸‹à¹ˆà¸­à¸™à¹„à¸§à¹‰)
  if (roundInfo) {
      roundInfo.style.display = 'block';
      const roundsPerImage = videoGetRoundsPerImage();
      const totalRounds = imageTotal * roundsPerImage;

      if (imageTotal === 0) {
        roundInfo.textContent = `à¸•à¸±à¹‰à¸‡à¸„à¹ˆà¸²: ${roundsPerImage} à¸£à¸­à¸šà¸•à¹ˆà¸­à¸ à¸²à¸ž`;
      } else {
        roundInfo.textContent = `à¸„à¸´à¸§à¸£à¸§à¸¡: ${imageTotal} à¸ à¸²à¸ž Ã— ${roundsPerImage} à¸£à¸­à¸š = à¸£à¸±à¸™à¸—à¸±à¹‰à¸‡à¸«à¸¡à¸” ${totalRounds} à¸„à¸¥à¸´à¸›`;
      }
  }
}

// Video Prompt & Play Studio: Get rounds per image
function videoGetRoundsPerImage() {
  const select = document.getElementById('video-round-count');
  const customInput = document.getElementById('video-custom-round-input');

  if (!select) return 1;
  const isBasicPlan = window.FeatureGate && FeatureGate.getPlan && FeatureGate.getPlan() === 'basic';

  if (select.value === 'custom' || (customInput && customInput.style.display === 'block')) {
      if (customInput) {
          const val = parseInt(customInput.value);
          // à¹à¸à¹‰à¹„à¸‚: à¸”à¸±à¸à¸ˆà¸±à¸šà¸à¸£à¸“à¸µà¸žà¸´à¸¡à¸žà¹Œà¸•à¸±à¸§à¸­à¸±à¸à¸©à¸£ (NaN) à¸«à¸£à¸·à¸­à¸•à¸´à¸”à¸¥à¸š à¹ƒà¸«à¹‰à¸„à¸·à¸™à¸„à¹ˆà¸² 1 à¹€à¸ªà¸¡à¸­
          const safeVal = (!isNaN(val) && val > 0) ? val : 1;
          return isBasicPlan ? Math.min(safeVal, 3) : safeVal;
      }
  }

  const rounds = parseInt(select.value);
  const safeRounds = (!isNaN(rounds) && rounds > 0) ? rounds : 1;
  return isBasicPlan ? Math.min(safeRounds, 3) : safeRounds;
}



// Video Prompt & Play Studio: Add log entry
function videoAddLog(message, type = 'info') {
  const timestamp = new Date().toLocaleTimeString('th-TH');
  const logEntry = {
    time: timestamp,
    message: message,
    type: type
  };
  
  videoLogs.push(logEntry);
  
  // Keep only last 500 logs
  if (videoLogs.length > 500) {
    videoLogs = videoLogs.slice(-500);
  }
  
  // Update UI
  videoUpdateLogDisplay();
  
  // Also log to console
  const consoleMethod = type === 'error' ? 'error' : type === 'warning' ? 'warn' : 'log';
  console[consoleMethod](`[${timestamp}] ${message}`);
}

// Video Prompt & Play Studio: Update log display
function videoUpdateLogDisplay() {
  if (!videoLogContainer) return;
  
  if (videoLogs.length === 0) {
    videoLogContainer.innerHTML = '<div class="log-empty">à¸¢à¸±à¸‡à¹„à¸¡à¹ˆà¸¡à¸µ log</div>';
    return;
  }
  
  const logHTML = videoLogs.map(log => {
    let typeClass = 'log-entry-info';
    if (log.type === 'error') typeClass = 'log-entry-error';
    else if (log.type === 'success') typeClass = 'log-entry-success';
    else if (log.type === 'warning') typeClass = 'log-entry-warning';
    else if (log.type === 'step') typeClass = 'log-entry-step';
    
    return `<div class="log-entry ${typeClass}">
      <span class="log-entry-time">[${log.time}]</span>
      <span class="log-entry-message">${log.message}</span>
    </div>`;
  }).join('');
  
  videoLogContainer.innerHTML = logHTML;
  
  // Auto scroll to bottom
  videoLogContainer.scrollTop = videoLogContainer.scrollHeight;
}

// Video NPrompt & Play Studio: Clear logs
function videoClearLogs() {
  videoLogs = [];
  videoUpdateLogDisplay();
}

// Video Prompt & Play Studio: Update status
function videoUpdateStatus(message, persistent = false) {
  if (videoStatusTimeoutId) {
    clearTimeout(videoStatusTimeoutId);
    videoStatusTimeoutId = null;
  }

  videoStatusText.textContent = message;
  const videoProgress = inferRunProgress(message, videoIsAutomationRunning);
  updateRunProgress('video', videoProgress.percent, videoProgress.step);
  
  // Add to log
  videoAddLog(message, persistent ? 'step' : 'info');

  if (!videoIsAutomationRunning && !persistent) {
    videoStatusTimeoutId = setTimeout(() => {
      videoStatusText.textContent = 'Ready to use';
      updateRunProgress('video', 0, 'assets');
    }, 3000);
  }
}

// Video Prompt & Play Studio: Setup event listeners (Fix: à¹à¸¢à¸à¸à¸¥à¸¸à¹ˆà¸¡à¸›à¸¸à¹ˆà¸¡à¹€à¸ªà¸µà¸¢à¸‡à¹ƒà¸«à¹‰à¸à¸”à¸žà¸£à¹‰à¸­à¸¡à¸à¸±à¸™à¹„à¸”à¹‰)
function videoSetupEventListeners() {
    if (videoClearImagesBtn) videoClearImagesBtn.addEventListener('click', videoClearAllImages);
    if (videoBtnAutomation) videoBtnAutomation.addEventListener('click', videoRunAutomation);
    if (videoBtnStop) videoBtnStop.addEventListener('click', videoStopAutomation);
    if (videoLogClearBtn) {
        videoLogClearBtn.addEventListener('click', (event) => {
            event.preventDefault();
            event.stopPropagation();
            videoClearLogs();
        });
    }
    
    // à¹à¸à¹‰à¹„à¸‚ Logic à¸•à¸£à¸‡à¸™à¸µà¹‰à¹€à¸žà¸·à¹ˆà¸­à¹ƒà¸«à¹‰à¹à¸ªà¸”à¸‡à¸œà¸¥à¸ªà¹„à¸•à¸¥à¹Œà¸•à¸¥à¸­à¸”à¹€à¸§à¸¥à¸² à¹à¸•à¹ˆà¸ˆà¸²à¸‡à¸¥à¸‡à¹€à¸¡à¸·à¹ˆà¸­à¹€à¸¥à¸·à¸­à¸à¸ªà¸¸à¹ˆà¸¡
    const randomVStyleSwitch = document.getElementById('video-random-style-switch');
    const vStyleContainer = document.getElementById('config-content-vstyle');
    
    if (randomVStyleSwitch && vStyleContainer) {
        randomVStyleSwitch.addEventListener('change', (e) => {
            if (e.target.checked) {
                vStyleContainer.style.opacity = "0.5";
                vStyleContainer.style.pointerEvents = "none";
                videoAddLog("ðŸŽ² à¹‚à¸«à¸¡à¸”à¸§à¸´à¸”à¸µà¹‚à¸­: à¸ªà¸¸à¹ˆà¸¡à¸ªà¹„à¸•à¸¥à¹Œà¹€à¸›à¸´à¸”à¹ƒà¸Šà¹‰à¸‡à¸²à¸™", "info");
            } else {
                vStyleContainer.style.opacity = "1";
                vStyleContainer.style.pointerEvents = "auto";
                videoAddLog("ðŸ–±ï¸ à¹‚à¸«à¸¡à¸”à¸§à¸´à¸”à¸µà¹‚à¸­: à¹€à¸¥à¸·à¸­à¸à¸ªà¹„à¸•à¸¥à¹Œà¹€à¸­à¸‡", "info");
            }
        });
        // à¹„à¸¡à¹ˆà¸ªà¸±à¹ˆà¸‡ dispatch event à¸—à¸±à¸™à¸—à¸µ à¹€à¸žà¸·à¹ˆà¸­à¹ƒà¸«à¹‰ UI à¹à¸ªà¸”à¸‡à¸œà¸¥à¸à¹ˆà¸­à¸™
    }
  
  // ðŸŸ¢ 4. à¹à¸à¹‰à¹„à¸‚ Logic à¸›à¸¸à¹ˆà¸¡à¹€à¸¥à¸·à¸­à¸à¹€à¸ªà¸µà¸¢à¸‡ (Voice Buttons) à¹ƒà¸«à¹‰à¹à¸¢à¸à¸à¸¥à¸¸à¹ˆà¸¡à¸à¸±à¸™
  const allVoiceBtns = document.querySelectorAll('.voice-btn');
  
  if (allVoiceBtns.length > 0) {
      allVoiceBtns.forEach(btn => {
          btn.addEventListener('click', (e) => {
              // à¸”à¸¶à¸‡à¸›à¸¸à¹ˆà¸¡à¸—à¸µà¹ˆà¸–à¸¹à¸à¸à¸”à¸ˆà¸£à¸´à¸‡ (à¹€à¸œà¸·à¹ˆà¸­à¹‚à¸”à¸™à¹„à¸­à¸„à¸­à¸™à¸‚à¹‰à¸²à¸‡à¹ƒà¸™)
              const clickedBtn = e.target.closest('.voice-btn');
              if (!clickedBtn) return;

              // à¹€à¸Šà¹‡à¸„à¸§à¹ˆà¸²à¹€à¸›à¹‡à¸™à¸›à¸¸à¹ˆà¸¡à¸›à¸£à¸°à¹€à¸ à¸—à¹„à¸«à¸™ (gender à¸«à¸£à¸·à¸­ dialect)
              const type = clickedBtn.getAttribute('data-type');     // 'gender' à¸«à¸£à¸·à¸­ 'dialect'
              const value = clickedBtn.getAttribute('data-value');

              // ðŸŸ¢ Key Logic: à¸¥à¹‰à¸²à¸‡ Active à¹€à¸‰à¸žà¸²à¸°à¹€à¸žà¸·à¹ˆà¸­à¸™à¸£à¹ˆà¸§à¸¡à¸à¸¥à¸¸à¹ˆà¸¡ (Type à¹€à¸”à¸µà¸¢à¸§à¸à¸±à¸™)
              const siblings = document.querySelectorAll(`.voice-btn[data-type="${type}"]`);
              siblings.forEach(b => b.classList.remove('active'));

              // à¹ƒà¸ªà¹ˆ Active à¹ƒà¸«à¹‰à¸›à¸¸à¹ˆà¸¡à¸—à¸µà¹ˆà¸à¸”
              clickedBtn.classList.add('active');

              // à¸­à¸±à¸›à¹€à¸”à¸•à¸„à¹ˆà¸²à¸¥à¸‡ Input à¸•à¸²à¸¡à¸›à¸£à¸°à¹€à¸ à¸—
              if (type === 'gender') {
                  const genderInput = document.getElementById('video-voice-gender-select');
                  if (genderInput) genderInput.value = value;
                  
                  // UX: à¹€à¸›à¸¥à¸µà¹ˆà¸¢à¸™à¸ªà¸µà¸›à¸¸à¹ˆà¸¡à¸•à¸²à¸¡à¹€à¸žà¸¨
                  if (value === 'male' || value === 'teen_boy' || value === 'boy' || value.includes('male')) {
                      clickedBtn.style.borderColor = '#60a5fa'; // à¸Ÿà¹‰à¸²
                  } else {
                      clickedBtn.style.borderColor = '#f472b6'; // à¸Šà¸¡à¸žà¸¹
                  }
                  // à¸£à¸µà¹€à¸‹à¹‡à¸•à¸ªà¸µà¸›à¸¸à¹ˆà¸¡à¸—à¸µà¹ˆà¹„à¸¡à¹ˆà¹„à¸”à¹‰à¹€à¸¥à¸·à¸­à¸à¹ƒà¸™à¸à¸¥à¸¸à¹ˆà¸¡à¹€à¸”à¸µà¸¢à¸§à¸à¸±à¸™
                  siblings.forEach(b => {
                      if(!b.classList.contains('active')) b.style.borderColor = '#3f3f46';
                  });

              } else if (type === 'dialect') {
                  const dialectInput = document.getElementById('video-voice-select');
                  if (dialectInput) dialectInput.value = value;
              }
          });
      });
  }
  
  // 5. Smart UI: à¸šà¸—à¸žà¸¹à¸”
  const customScriptInput = document.getElementById('video-custom-script');
  if (customScriptInput) {
      customScriptInput.addEventListener('input', () => {
          const hasText = customScriptInput.value.trim() !== "";
          const brollBtn = document.querySelector('.char-tab-btn[data-type="vstyle"][data-group="broll"]');
          
          if (brollBtn) {
              if (hasText) {
                  brollBtn.classList.add('disabled-section');
                  brollBtn.style.pointerEvents = 'none';
                  if (brollBtn.classList.contains('active')) {
                      const promoBtn = document.querySelector('.char-tab-btn[data-type="vstyle"][data-group="promo"]');
                      if (promoBtn) {
                          promoBtn.click();
                          showToast('âš ï¸ à¸¡à¸µà¸šà¸—à¸žà¸¹à¸”: à¹€à¸›à¸¥à¸µà¹ˆà¸¢à¸™à¹€à¸›à¹‡à¸™à¹‚à¸«à¸¡à¸”à¸„à¸™à¸žà¸¹à¸”à¹ƒà¸«à¹‰à¸­à¸±à¸•à¹‚à¸™à¸¡à¸±à¸•à¸´', 'warning');
                      }
                  }
              } else {
                  brollBtn.classList.remove('disabled-section');
                  brollBtn.style.pointerEvents = 'auto';
              }
          }
      });
  }
}

// Video Prompt & Play Studio: Handle test fill - fills prompt result into target element
async function videoHandleTestFill() {
  const generatedPrompt = videoPromptResult.textContent;

  if (!generatedPrompt || generatedPrompt.includes('à¸à¸³à¸¥à¸±à¸‡à¸§à¸´à¹€à¸„à¸£à¸²à¸°à¸«à¹Œ') || generatedPrompt.startsWith('Error:')) {
    showToast('à¸à¸£à¸¸à¸“à¸²à¸ªà¸£à¹‰à¸²à¸‡ Prompt à¸à¹ˆà¸­à¸™', 'error');
    return;
  }

  // Parse YAML to extract only values (without field names)
  const parsedPrompt = parseYAMLToPlainText(generatedPrompt, true);

  videoUpdateStatus('Filling prompt...');

  try {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    const result = await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: (textToFill) => {
        const targetElement = document.getElementById('PINHOLE_TEXT_AREA_ELEMENT_ID');

        if (targetElement) {
          targetElement.focus();

          if (targetElement.tagName === 'INPUT' || targetElement.tagName === 'TEXTAREA') {
            targetElement.value = textToFill;
            targetElement.dispatchEvent(new Event('input', { bubbles: true }));
            targetElement.dispatchEvent(new Event('change', { bubbles: true }));
          } else if (targetElement.isContentEditable) {
            targetElement.textContent = textToFill;
            targetElement.dispatchEvent(new Event('input', { bubbles: true }));
          } else {
            targetElement.textContent = textToFill;
          }

          return { success: true, message: 'Prompt filled successfully!' };
        } else {
          return { success: false, message: 'Element #PINHOLE_TEXT_AREA_ELEMENT_ID not found' };
        }
      },
      args: [parsedPrompt]
    });

    if (result && result[0]) {
      const { success, message } = result[0].result;
      videoUpdateStatus(message);
      showToast(message, success ? 'success' : 'error');
    }
  } catch (error) {
    videoUpdateStatus(`Error: ${error.message}`);
    showToast('Failed to fill text', 'error');
  }
}

// Video Prompt & Play Studio: Handle test upload - uploads images to target element
async function videoHandleTestUpload() {
  if (videoUploadedImages.length === 0) {
    videoUpdateStatus('No images to upload');
    showToast('Please add images first', 'error');
    return;
  }

  videoUpdateStatus('Uploading images...');

  try {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    const imagesData = videoUploadedImages.map(img => ({
      name: img.name,
      type: img.type,
      dataUrl: img.dataUrl
    }));

    // Get delay settings from config
    const actionDelay = getActionDelay();
    const confirmDelay = getActionDelay();
    const afterConfirmDelay = getAfterConfirmDelay();

    const aspectRatio = getVeo3AspectRatio();
    const result = await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: (images, delays, aspectRatio) => {
        // Helper function to get random delay
        function getRandomDelay(min, max) {
          return Math.floor(Math.random() * (max - min + 1)) + min;
        }

        return new Promise((resolve) => {
          // Upload button selector (directly click the button)
          const uploadBtnSelector = '#__next > div.sc-c7ee1759-1.crzReP > div > div > div.sc-b0c0bd7-1.kvzLFA > div > div.sc-897c0dbb-0.eHacXb > div.sc-77366d4e-0.eaiEre > div > div > div.sc-408537d4-0.eBSqXt > div:nth-child(1) > div > div:nth-child(1) > button';
          const uploadBtn = document.querySelector(uploadBtnSelector);

          if (!uploadBtn) {
            resolve({ success: false, message: 'Upload button not found' });
            return;
          }

          // Click upload button
          uploadBtn.click();

          // Wait for file input to appear (2-3 seconds random)
          const fileInputDelay = getRandomDelay(delays.actionMin, delays.actionMax);
          setTimeout(() => {
            const fileInputs = document.querySelectorAll('input[type="file"]');
            let targetInput = null;

            // Find file input that accepts images
            for (const input of fileInputs) {
              if (input.accept && input.accept.includes('image')) {
                targetInput = input;
                break;
              }
            }

            if (!targetInput && fileInputs.length > 0) {
              targetInput = fileInputs[fileInputs.length - 1];
            }

            if (targetInput) {
              // Convert base64 images to File objects
              const dataTransfer = new DataTransfer();

              images.forEach((img) => {
                const byteString = atob(img.dataUrl.split(',')[1]);
                const mimeType = img.type;
                const ab = new ArrayBuffer(byteString.length);
                const ia = new Uint8Array(ab);
                for (let i = 0; i < byteString.length; i++) {
                  ia[i] = byteString.charCodeAt(i);
                }
                const blob = new Blob([ab], { type: mimeType });
                const file = new File([blob], img.name, { type: mimeType });
                dataTransfer.items.add(file);
              });

              targetInput.files = dataTransfer.files;

              // Trigger events
              targetInput.dispatchEvent(new Event('change', { bubbles: true }));
              targetInput.dispatchEvent(new Event('input', { bubbles: true }));

              // Wait for upload to process, then open orientation dropdown (2-3 seconds random)
              const orientationClickDelay = getRandomDelay(delays.actionMin, delays.actionMax);
              setTimeout(() => {
                // Determine which orientation to select based on aspect ratio
                const isPortrait = aspectRatio === '9:16';
                const targetOrientation = isPortrait ? 'Portrait' : 'Landscape';
                const targetCropIcon = isPortrait ? 'crop_9_16' : 'crop_16_9';

                // Step 2.5: Click orientation dropdown button (find current orientation button)
                let orientationBtn = null;
                const allButtons = document.querySelectorAll('button');

                // Find the button that matches the current orientation (usually Landscape button is shown by default)
                for (const btn of allButtons) {
                  const text = btn.textContent || '';
                  const hasLandscape = text.includes('Landscape');
                  const hasCropIcon = btn.querySelector('i[class*="crop_16_9"]') || text.includes('crop_16_9');

                  if (hasLandscape && hasCropIcon && btn.getAttribute('role') !== 'combobox') {
                    orientationBtn = btn;
                    break;
                  }
                }

                // If not found, try to find button near "Crop and Save"
                if (!orientationBtn) {
                  const cropAndSaveBtn = Array.from(allButtons).find(btn => btn.textContent.includes('Crop and Save'));
                  if (cropAndSaveBtn) {
                    const parent = cropAndSaveBtn.parentElement;
                    if (parent) {
                      const siblingBtns = parent.querySelectorAll('button');
                      for (const btn of siblingBtns) {
                        if ((btn.textContent.includes('Landscape') || btn.textContent.includes('Portrait')) && btn !== cropAndSaveBtn) {
                          orientationBtn = btn;
                          break;
                        }
                      }
                    }
                  }
                }

                if (orientationBtn) {
                  orientationBtn.click();
                  console.log('Orientation dropdown opened');
                } else {
                  console.log('Orientation button not found');
                }

                // Wait for dropdown to open, then select target orientation (2-3 seconds random)
                const selectOrientationDelay = getRandomDelay(delays.actionMin, delays.actionMax);
                setTimeout(() => {
                  let targetOption = null;

                  // Method 1: Find any clickable element with target orientation text
                  const allElements = document.querySelectorAll('div, button, span, li, a');
                  for (const el of allElements) {
                    const text = el.textContent || '';
                    // Check if this element directly contains target orientation (not nested)
                    if (text.trim() === targetOrientation || (text.includes(targetOrientation) && !text.includes(isPortrait ? 'Landscape' : 'Portrait') && text.length < 20)) {
                      const rect = el.getBoundingClientRect();
                      if (rect.width > 0 && rect.height > 0) {
                        targetOption = el;
                        break;
                      }
                    }
                  }

                  // Method 2: Find by crop icon in dropdown
                  if (!targetOption) {
                    const cropIcons = document.querySelectorAll('i');
                    for (const icon of cropIcons) {
                      if (icon.textContent && icon.textContent.includes(targetCropIcon)) {
                        targetOption = icon.closest('button') || icon.closest('div[role]') || icon.parentElement;
                        if (targetOption) break;
                      }
                    }
                  }

                  if (targetOption) {
                    targetOption.click();
                    console.log(targetOrientation + ' selected');
                  } else {
                    console.log(targetOrientation + ' option not found in dropdown');
                  }

                  // Wait then click "Crop and Save" button (2-3 seconds random)
                  const confirmClickDelay = getRandomDelay(delays.actionMin, delays.actionMax);
                  setTimeout(() => {
                    // Try multiple selectors for Crop and Save button
                        const confirmSelectors = [
                          '#radix-\\:r1k\\: > div.sc-19de2353-4.boKhUT > div > button.sc-c177465c-1.gdArnN.sc-19de2353-7.jcyPCc',
                          '#radix-\\:r1d\\: > div.sc-5983bb27-4.hUNtLL > div > button.sc-c177465c-1.gdArnN.sc-5983bb27-7.csgOts',
                          'button.sc-19de2353-7.jcyPCc',
                          'button.sc-5983bb27-7.csgOts'
                        ];

                        let confirmBtn = null;
                        for (const sel of confirmSelectors) {
                          try {
                            confirmBtn = document.querySelector(sel);
                            if (confirmBtn) break;
                          } catch(e) {}
                        }

                        // Fallback: find button with text (Crop/Save/à¸šà¸±à¸™à¸—à¸¶à¸/à¹€à¸ªà¸£à¹‡à¸ˆ/à¸•à¹ˆà¸­à¹„à¸›)
                        if (!confirmBtn) {
                          const allButtons = document.querySelectorAll('button');
                          const textCandidates = ['Crop and Save', 'à¸šà¸±à¸™à¸—à¸¶à¸', 'à¸•à¹ˆà¸­à¹„à¸›', 'à¹€à¸ªà¸£à¹‡à¸ˆ', 'Save', 'Confirm'];
                          for (const btn of allButtons) {
                            const text = (btn.textContent || '').trim();
                            if (!text) continue;
                            if (textCandidates.some(t => text.includes(t))) {
                              const rect = btn.getBoundingClientRect();
                              if (rect.width > 0 && rect.height > 0) {
                                confirmBtn = btn;
                                break;
                              }
                            }
                          }
                        }

                        // Final fallback: pick any visible primary button in modal footer
                        if (!confirmBtn) {
                          const candidateBtns = document.querySelectorAll('button');
                          for (const btn of candidateBtns) {
                            const rect = btn.getBoundingClientRect();
                            if (rect.width > 80 && rect.height > 24 && rect.left >= 0 && rect.top >= 0) {
                              confirmBtn = btn;
                              break;
                            }
                          }
                        }

                    if (confirmBtn) {
                      confirmBtn.click();

                      // Wait after confirm (5-8 seconds random)
                      const afterConfirmWait = getRandomDelay(delays.afterConfirmMin, delays.afterConfirmMax);
                      setTimeout(() => {
                        resolve({ success: true, message: `Uploaded ${images.length} image(s) and confirmed!` });
                      }, afterConfirmWait);
                    } else {
                      resolve({ success: true, message: `Uploaded ${images.length} image(s)! (Crop and Save button not found)` });
                    }
                  }, confirmClickDelay);
                }, selectPortraitDelay);
              }, orientationClickDelay);
            } else {
              resolve({ success: false, message: 'File input not found' });
            }
          }, fileInputDelay);
        });
      },
      args: [imagesData, CONFIG.delays, aspectRatio]
    });

    if (result && result[0] && result[0].result) {
      const { success, message } = result[0].result;
      videoUpdateStatus(message);
      showToast(message, success ? 'success' : 'error');
    }
  } catch (error) {
    videoUpdateStatus(`Error: ${error.message}`);
    showToast('Failed to upload images', 'error');
  }
}

// Video Prompt & Play Studio: Handle test create - clicks create button with retry
async function videoHandleTestCreate() {
  videoUpdateStatus('Clicking create button...');

  try {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    const maxRetries = 3;
    const retryDelay = 5000; // 5 seconds

    const result = await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: (maxRetries, retryDelay) => {
        return new Promise((resolve) => {
          const createBtnSelector = '#__next > div.sc-c7ee1759-1.crzReP > div > div > div.sc-b0c0bd7-1.kvzLFA > div > div.sc-897c0dbb-0.eHacXb > div.sc-77366d4e-0.eaiEre > div > div > div.sc-408537d4-0.eBSqXt > div.sc-408537d4-1.eiHkev > button';

          let attempts = 0;

          function tryClickCreate() {
            attempts++;
            const createBtn = document.querySelector(createBtnSelector);

            if (createBtn && !createBtn.disabled) {
              createBtn.click();
              resolve({ success: true, message: `Create button clicked! (attempt ${attempts})` });
            } else if (attempts < maxRetries) {
              // Button not ready, wait and retry
              console.log(`Create button not ready, retrying in 5s... (attempt ${attempts}/${maxRetries})`);
              setTimeout(tryClickCreate, retryDelay);
            } else {
              // Max retries reached
              resolve({ success: false, message: `Create button not clickable after ${maxRetries} attempts` });
            }
          }

          tryClickCreate();
        });
      },
      args: [maxRetries, retryDelay]
    });

    if (result && result[0] && result[0].result) {
      const { success, message } = result[0].result;
      videoUpdateStatus(message);
      showToast(message, success ? 'success' : 'error');
    }
  } catch (error) {
    videoUpdateStatus(`Error: ${error.message}`);
    showToast('Failed to click create button', 'error');
  }
}

// Video Prompt & Play Studio: Handle test download - hover video, click download button, then select 720p
async function videoHandleTestDownload() {
  videoUpdateStatus('Finding video...');

  try {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    const result = await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: (delays) => {
        function getRandomDelay(min, max) {
          return Math.floor(Math.random() * (max - min + 1)) + min;
        }

        return new Promise((resolve) => {
          // Step 1: Find video card to hover
          let videoCard = null;

          // Find container with video element
          const videos = document.querySelectorAll('video');
          if (videos.length > 0) {
            // Get parent container of video
            videoCard = videos[0].closest('div[class*="sc-"]');
            if (!videoCard) {
              videoCard = videos[0].parentElement.parentElement.parentElement;
            }
          }

          if (!videoCard) {
            resolve({ success: false, message: 'Video not found' });
            return;
          }

          // Step 2: Hover on video card to show buttons
          videoCard.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
          videoCard.dispatchEvent(new MouseEvent('mouseover', { bubbles: true }));

          // Wait for hover buttons to appear
          setTimeout(() => {
            // Step 3: Find and click download button
            const allButtons = document.querySelectorAll('button');
            let downloadBtn = null;

            for (const btn of allButtons) {
              const icon = btn.querySelector('i');
              if (icon && icon.textContent && icon.textContent.trim() === 'download') {
                const rect = btn.getBoundingClientRect();
                if (rect.width > 0 && rect.height > 0) {
                  downloadBtn = btn;
                  break;
                }
              }
            }

            if (!downloadBtn) {
              resolve({ success: false, message: 'Download button not found' });
              return;
            }

            // Click download button
            downloadBtn.click();

            // Step 4: Wait for menu, then click 720p
            const menuDelay = getRandomDelay(delays.actionMin, delays.actionMax);
            setTimeout(() => {
              let option720p = null;

              // Find menuitem with "720p" text
              const menuItems = document.querySelectorAll('[role="menuitem"]');
              for (const item of menuItems) {
                const text = item.textContent || '';
                if (text.includes('720p')) {
                  option720p = item;
                  break;
                }
              }

              if (option720p) {
                option720p.click();
                resolve({ success: true, message: 'Download 720p started!' });
              } else {
                resolve({ success: true, message: 'Download clicked! (720p not found)' });
              }
            }, menuDelay);
          }, 500); // Wait 500ms for hover buttons
        });
      },
      args: [CONFIG.delays]
    });

    if (result && result[0] && result[0].result) {
      const { success, message } = result[0].result;
      videoUpdateStatus(message);
      showToast(message, success ? 'success' : 'error');
    }
  } catch (error) {
    videoUpdateStatus(`Error: ${error.message}`);
    showToast('Failed to click download', 'error');
  }
}

// Video Prompt & Play Studio: Handle test download multi - download selected number of videos
async function videoHandleTestDownloadMulti() {
  const maxDownloads = parseInt(videoDownloadCountAuto?.value || '1');
  videoUpdateStatus(`à¸à¸³à¸¥à¸±à¸‡à¹€à¸•à¸£à¸µà¸¢à¸¡à¸”à¸¹à¸”à¹„à¸Ÿà¸¥à¹Œ ${maxDownloads} à¸„à¸¥à¸´à¸›...`);

  try {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    const downloadResult = await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: async (maxDl) => {
        const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));
        
        // à¹€à¸”à¹‰à¸‡à¸‚à¸¶à¹‰à¸™à¸šà¸™à¸ªà¸¸à¸”à¸‚à¸­à¸‡à¸ˆà¸­
        window.scrollTo(0, 0);
        await sleep(1000);

        // ðŸš¨ à¸„à¹‰à¸™à¸«à¸²à¹à¸—à¹‡à¸ <video> à¸—à¸±à¹‰à¸‡à¸«à¸¡à¸”à¸šà¸™à¸«à¸™à¹‰à¸²à¸ˆà¸­
        const allVideos = Array.from(document.querySelectorAll('video'));
        
        // à¸à¸£à¸­à¸‡à¹€à¸­à¸²à¹€à¸‰à¸žà¸²à¸°à¸§à¸´à¸”à¸µà¹‚à¸­à¸—à¸µà¹ˆà¹€à¸›à¹‡à¸™à¸à¸²à¸£à¹Œà¸”à¸ˆà¸£à¸´à¸‡à¹† (à¹ƒà¸«à¸à¹ˆà¸à¸§à¹ˆà¸² 150px) à¹„à¸¡à¹ˆà¹ƒà¸Šà¹ˆà¹„à¸­à¸„à¸­à¸™à¸ˆà¸´à¹‹à¸§
        const validVideos = allVideos.filter(vid => {
            const rect = vid.getBoundingClientRect();
            return rect.width > 150;
        });

        if (validVideos.length === 0) {
            return { success: false, message: 'à¹„à¸¡à¹ˆà¸žà¸šà¸§à¸´à¸”à¸µà¹‚à¸­à¸«à¸¥à¸±à¸à¸šà¸™à¸«à¸™à¹‰à¸²à¸ˆà¸­' };
        }

        const toDownload = Math.min(maxDl, validVideos.length);
        let downloadedCount = 0;

        // ðŸš€ à¸§à¸™à¸¥à¸¹à¸›à¸”à¸¹à¸”à¹„à¸Ÿà¸¥à¹Œà¸—à¸µà¸¥à¸°à¸„à¸¥à¸´à¸›
        for (let i = 0; i < toDownload; i++) {
            const targetVideo = validVideos[i];
            
            // à¹€à¸¥à¸·à¹ˆà¸­à¸™à¸ˆà¸­à¹ƒà¸«à¹‰à¹€à¸«à¹‡à¸™à¸§à¸´à¸”à¸µà¹‚à¸­à¸™à¸´à¸”à¸™à¸¶à¸‡ (à¹€à¸žà¸·à¹ˆà¸­à¸„à¸§à¸²à¸¡à¸ªà¸§à¸¢à¸‡à¸²à¸¡à¸•à¸­à¸™à¸£à¸±à¸™à¸šà¸­à¸—)
            targetVideo.scrollIntoView({ behavior: 'smooth', block: 'center' });
            await sleep(800);

          // ðŸŒŸ 1. à¸‚à¹‚à¸¡à¸¢à¸¥à¸´à¸‡à¸à¹Œà¸§à¸´à¸”à¸µà¹‚à¸­à¸•à¸£à¸‡à¹† à¸ˆà¸²à¸à¹à¸—à¹‡à¸ <video> à¸«à¸£à¸·à¸­ <source>
            let vidSrc = targetVideo.getAttribute('src') || targetVideo.currentSrc || targetVideo.src;
            if (!vidSrc) {
                const sourceTag = targetVideo.querySelector('source');
                if (sourceTag) vidSrc = sourceTag.getAttribute('src') || sourceTag.src;
            }

            // ðŸŒŸ à¸›à¸¥à¸”à¸¥à¹‡à¸­à¸„à¹€à¸‡à¸·à¹ˆà¸­à¸™à¹„à¸‚ http à¸­à¸­à¸à¹„à¸›! à¸¡à¸µà¸¥à¸´à¸‡à¸à¹Œà¸›à¸¸à¹Šà¸šà¸”à¸¹à¸”à¸›à¸±à¹Šà¸š
            if (vidSrc) {
                try {
                    // ðŸ”¥ à¹à¸›à¸¥à¸‡à¸¥à¸´à¸‡à¸à¹Œà¹à¸šà¸šà¸¢à¹ˆà¸­ (/fx/api/...) à¹ƒà¸«à¹‰à¹€à¸›à¹‡à¸™à¸¥à¸´à¸‡à¸à¹Œà¹€à¸•à¹‡à¸¡ (https://...)
                    const absoluteUrl = new URL(vidSrc, window.location.origin).href;

                    // ðŸ”¥ 2. à¸—à¹ˆà¸²à¹„à¸¡à¹‰à¸•à¸²à¸¢à¹à¸®à¸à¹€à¸à¸­à¸£à¹Œ: à¸”à¸¶à¸‡à¹„à¸Ÿà¸¥à¹Œ MP4 à¸ˆà¸²à¸à¹€à¸‹à¸´à¸£à¹Œà¸Ÿà¹€à¸§à¸­à¸£à¹Œà¹‚à¸”à¸¢à¸•à¸£à¸‡
                    const response = await fetch(absoluteUrl);
                    
                    if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);
                    
                    const blob = await response.blob(); 
                    const blobUrl = window.URL.createObjectURL(blob);

                    // ðŸŒŸ 3. à¸ªà¸£à¹‰à¸²à¸‡ "à¸›à¸¸à¹ˆà¸¡à¸”à¸²à¸§à¸™à¹Œà¹‚à¸«à¸¥à¸”à¸¥à¹ˆà¸­à¸‡à¸«à¸™" à¸‚à¸­à¸‡à¹€à¸£à¸²à¹€à¸­à¸‡
                    const a = document.createElement('a');
                    a.style.display = 'none';
                    a.href = blobUrl;
                    a.download = `Banana_Video_${Date.now()}_${i+1}.mp4`; 
                    
                    document.body.appendChild(a);
                    a.click(); // à¸ªà¸±à¹ˆà¸‡à¹€à¸‹à¸Ÿà¸¥à¸‡à¹€à¸„à¸£à¸·à¹ˆà¸­à¸‡
                    await sleep(500);

                    // à¹€à¸à¹‡à¸šà¸à¸§à¸²à¸”à¸›à¸¸à¹ˆà¸¡à¸¥à¹ˆà¸­à¸‡à¸«à¸™à¸—à¸´à¹‰à¸‡
                    document.body.removeChild(a);
                    window.URL.revokeObjectURL(blobUrl);

                    downloadedCount++;
                    await sleep(1500); // â³ à¸£à¸­à¹à¸›à¸šà¸™à¸¶à¸‡à¹ƒà¸«à¹‰à¹„à¸Ÿà¸¥à¹Œà¹„à¸«à¸¥à¹€à¸‚à¹‰à¸²à¹€à¸„à¸£à¸·à¹ˆà¸­à¸‡à¸à¹ˆà¸­à¸™à¸”à¸¹à¸”à¸„à¸¥à¸´à¸›à¸–à¸±à¸”à¹„à¸›

                } catch (fetchErr) {
                    console.log(`à¸”à¸¹à¸”à¸§à¸´à¸”à¸µà¹‚à¸­à¸—à¸µà¹ˆ ${i+1} à¸¥à¹‰à¸¡à¹€à¸«à¸¥à¸§:`, fetchErr);
                }
            } else {
                console.log(`à¸‚à¹‰à¸²à¸¡à¸§à¸´à¸”à¸µà¹‚à¸­à¸—à¸µà¹ˆ ${i+1}: à¸«à¸²à¸¥à¸´à¸‡à¸à¹Œ (src) à¹„à¸¡à¹ˆà¹€à¸ˆà¸­`);
            }
        }

        return { 
            success: downloadedCount > 0, 
            downloaded: downloadedCount, 
            total: toDownload,
            message: downloadedCount > 0 ? `à¸”à¸²à¸§à¸™à¹Œà¹‚à¸«à¸¥à¸”à¹€à¸ªà¸£à¹‡à¸ˆ ${downloadedCount}/${toDownload} à¸„à¸¥à¸´à¸›!` : 'à¸”à¸¶à¸‡à¹„à¸Ÿà¸¥à¹Œà¹„à¸¡à¹ˆà¸ªà¸³à¹€à¸£à¹‡à¸ˆ'
        };
      },
      args: [maxDownloads]
    });

    const res = downloadResult[0]?.result;
    
    if (res && res.success) {
        videoUpdateStatus(res.message);
        showToast(res.message, 'success');
    } else {
        videoUpdateStatus(`Error: ${res?.message || 'à¹„à¸¡à¹ˆà¸ªà¸²à¸¡à¸²à¸£à¸–à¸”à¸¶à¸‡à¸§à¸´à¸”à¸µà¹‚à¸­à¹„à¸”à¹‰'}`);
        showToast('Failed to download videos', 'error');
    }

  } catch (error) {
    videoUpdateStatus(`Error: ${error.message}`);
    showToast('Failed to execute script', 'error');
  }
}

// Parse YAML prompt to extract only values (without field names)
function parseYAMLToPlainText(yamlText, isVideo = true) {
  if (!yamlText || typeof yamlText !== 'string') {
    return yamlText;
  }

  const lines = yamlText.split('\n');
  const values = [];
  let currentField = null;
  let currentValue = [];

  // Fields to extract for video prompt
  const videoFields = ['dialogue', 'emotion', 'voice_type', 'action', 'character', 'setting', 'camera'];
  // Fields to extract for image prompt
  const imageFields = ['emotion', 'action', 'character', 'setting', 'camera', 'style'];
  
  const fieldsToExtract = isVideo ? videoFields : imageFields;

  function finishCurrentField() {
    if (currentField && currentValue.length > 0) {
      const value = currentValue.join(' ').trim();
      // Remove quotes if present
      const cleanValue = value.replace(/^["']|["']$/g, '');
      if (cleanValue) {
        values.push(cleanValue);
      }
      currentValue = [];
      currentField = null;
    }
  }

  for (const line of lines) {
    const trimmedLine = line.trim();
    
    // Skip empty lines and comments
    if (!trimmedLine || trimmedLine.startsWith('#')) {
      if (currentField) {
        // Continue multiline value
        continue;
      }
      continue;
    }

    // Check if line starts with a new field
    let foundField = false;
    for (const field of fieldsToExtract) {
      const fieldRegex = new RegExp(`^${field}\\s*:\\s*(.*)$`, 'i');
      const match = trimmedLine.match(fieldRegex);
      
      if (match) {
        // Finish previous field if any
        finishCurrentField();
        
        // Start new field
        currentField = field;
        const valuePart = match[1].trim();
        if (valuePart) {
          currentValue.push(valuePart);
        }
        foundField = true;
        break;
      }
    }

    // If not a field start, check if it's a continuation of current field
    if (!foundField && currentField) {
      // Check if line is indented (continuation) or starts a new field
      if (trimmedLine.match(/^\s+/) || !trimmedLine.includes(':')) {
        // Continuation of multiline value
        currentValue.push(trimmedLine);
      } else {
        // New field or end of current field
        finishCurrentField();
      }
    }
  }

  // Finish last field
  finishCurrentField();

  // If no values extracted, return original text (fallback)
  if (values.length === 0) {
    return yamlText;
  }

  // Join values with spaces
  return values.join(' ');
}



// Video Prompt & Play Studio: Handle Copy Prompt
function videoHandleCopyPrompt() {
  const text = videoPromptResult.textContent;
  if (!text || text.includes('à¸à¸³à¸¥à¸±à¸‡à¸§à¸´à¹€à¸„à¸£à¸²à¸°à¸«à¹Œ')) {
    showToast('à¹„à¸¡à¹ˆà¸¡à¸µ Prompt à¹ƒà¸«à¹‰à¸„à¸±à¸”à¸¥à¸­à¸', 'error');
    return;
  }

  navigator.clipboard.writeText(text).then(() => {
    showToast('à¸„à¸±à¸”à¸¥à¸­à¸ Prompt à¹à¸¥à¹‰à¸§!', 'success');
    videoBtnCopyPrompt.textContent = 'âœ…';
    setTimeout(() => {
      videoBtnCopyPrompt.textContent = 'ðŸ“‹';
    }, 2000);
  }).catch(() => {
    showToast('à¹„à¸¡à¹ˆà¸ªà¸²à¸¡à¸²à¸£à¸–à¸„à¸±à¸”à¸¥à¸­à¸à¹„à¸”à¹‰', 'error');
  });
}

// ============================================
// AUTOMATION FUNCTIONS
// ============================================

// Video Prompt & Play Studio: Sleep helper (à¸‰à¸šà¸±à¸šà¹à¸à¹‰: à¸•à¸·à¹ˆà¸™à¸—à¸±à¸™à¸—à¸µà¸—à¸µà¹ˆà¸à¸” Stop)
function videoSleep(ms) {
  return new Promise((resolve, reject) => {
    // à¹€à¸Šà¹‡à¸„à¸à¹ˆà¸­à¸™à¹€à¸¥à¸¢ à¸–à¹‰à¸²à¸à¸”à¸«à¸¢à¸¸à¸”à¹à¸¥à¹‰à¸§ à¹ƒà¸«à¹‰ Reject à¸—à¸±à¸™à¸—à¸µ
    if (videoShouldStopAutomation) {
        return reject(new Error('STOPPED'));
    }

    const checkInterval = 100; // à¹€à¸Šà¹‡à¸„à¸—à¸¸à¸ 0.1 à¸§à¸´à¸™à¸²à¸—à¸µ
    let elapsed = 0;

    const intervalId = setInterval(() => {
      // à¹€à¸Šà¹‡à¸„à¸›à¸¸à¹ˆà¸¡ Stop à¸—à¸¸à¸à¹† 0.1 à¸§à¸´
      if (videoShouldStopAutomation) {
        clearInterval(intervalId);
        reject(new Error('STOPPED')); // ðŸ”´ à¸ªà¸±à¹ˆà¸‡à¸«à¸¢à¸¸à¸”à¸—à¸±à¸™à¸—à¸µ!
      } else if (elapsed >= ms) {
        clearInterval(intervalId);
        resolve(); // à¸„à¸£à¸šà¹€à¸§à¸¥à¸²
      }
      elapsed += checkInterval;
    }, checkInterval);
  });
}

// Video Prompt & Play Studio: Stop automation
function videoStopAutomation() {
  if (videoIsAutomationRunning) {
    videoShouldStopAutomation = true;
    videoUpdateStatus('à¸à¸³à¸¥à¸±à¸‡à¸«à¸¢à¸¸à¸”...');
    showToast('à¸à¸³à¸¥à¸±à¸‡à¸«à¸¢à¸¸à¸” Automation...', 'error');
  }
}




// ============================================
// ðŸŽ¬ VIDEO Prompt & Play Studio: Run Automation (Standalone Version)
// ============================================
async function videoRunAutomation() {
  if (!_0x99f || typeof AUTH === 'undefined') { _selfDestruct("E03: Illegal Execution"); return; }
  const isCorrect = await checkCorrectWebsite(); 
  if (!isCorrect) return;

  if (videoIsAutomationRunning) {
    showToast('à¸à¸³à¸¥à¸±à¸‡à¸£à¸±à¸™à¸­à¸¢à¸¹à¹ˆà¹à¸¥à¹‰à¸§ à¸à¸£à¸¸à¸“à¸²à¸£à¸­à¸ªà¸±à¸à¸„à¸£à¸¹à¹ˆ', 'error');
    return;
  }

  const productName = videoProductNameInput.value.trim();
  if (videoUploadedImages.length === 0) {
    showToast('à¸à¸£à¸¸à¸“à¸²à¸­à¸±à¸žà¹‚à¸«à¸¥à¸”à¸ à¸²à¸žà¸•à¸±à¹‰à¸‡à¸•à¹‰à¸™à¸à¹ˆà¸­à¸™', 'error');
    return;
  }

  videoIsAutomationRunning = true;
  videoShouldStopAutomation = false;
  videoBtnAutomation.disabled = true;
  await toggleWebPageLock(true); 
  
  videoBtnAutomation.innerHTML = '<span class="loading"></span> <span>à¸à¸³à¸¥à¸±à¸‡à¸£à¸±à¸™ Video...</span>';
  if (videoBtnStop) videoBtnStop.style.display = 'flex';
  if (videoPromptStatus) videoPromptStatus.style.display = 'none';

  const totalImages = videoUploadedImages.length;
  const roundsPerImage = videoGetRoundsPerImage();
  const totalRounds = totalImages * roundsPerImage;
  let completedRounds = 0;
  let totalDownloaded = 0;
  
  try {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
	
	
	// ============================================
          // ðŸŸ¢ STEP 1: à¸•à¸±à¹‰à¸‡à¸„à¹ˆà¸²à¹‚à¸«à¸¡à¸” Video (à¸­à¸±à¸›à¹€à¸à¸£à¸” V13: Blacklist à¹€à¸¡à¸™à¸¹à¸‹à¹‰à¸²à¸¢à¸¡à¸·à¸­ & à¸•à¸£à¸§à¸ˆà¸ˆà¸±à¸š role="tab")
          // ============================================
          videoUpdateStatus(`âš™ï¸ Step 1/4: à¸à¸³à¸¥à¸±à¸‡à¸•à¸±à¹‰à¸‡à¸„à¹ˆà¸²à¹‚à¸«à¸¡à¸” Video...`);
          
          const setupVideoMode = await chrome.scripting.executeScript({
            target: { tabId: tab.id },
            func: (ratio) => {
              return new Promise(async (resolve) => {
                try {
                    const sleep = (ms) => new Promise(r => setTimeout(r, ms));
                    
                    function heavyClick(el) {
                        if (!el) return false;
                        el.scrollIntoView({ behavior: 'instant', block: 'center' });
                        el.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true }));
                        el.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));
                        el.click();
                        el.dispatchEvent(new MouseEvent('mouseup', { bubbles: true }));
                        el.dispatchEvent(new PointerEvent('pointerup', { bubbles: true }));
                        return true;
                    }

                    // ðŸ›‘ à¸Ÿà¸±à¸‡à¸à¹Œà¸Šà¸±à¸™à¸„à¹‰à¸™à¸«à¸²à¸›à¸¸à¹ˆà¸¡à¹à¸šà¸šà¹€à¸ˆà¸²à¸°à¸ˆà¸‡à¸‚à¸±à¹‰à¸™à¸ªà¸¸à¸” (Geofencing + Blacklist)
                    function findSafeSettingsButton(iconNames, textKeywords = [], blacklist = []) {
                        const allBtns = Array.from(document.querySelectorAll('button, [role="tab"]'));
                        
                        return allBtns.find(btn => {
                            const rect = btn.getBoundingClientRect();
                            // 1. à¸à¸£à¸­à¸‡à¸—à¸´à¹‰à¸‡: à¸›à¸¸à¹ˆà¸¡à¸—à¸µà¹ˆà¸­à¸¢à¸¹à¹ˆà¸Šà¸´à¸”à¸‹à¹‰à¸²à¸¢à¸‚à¸­à¸‡à¸«à¸™à¹‰à¸²à¸ˆà¸­à¹€à¸à¸´à¸™à¹„à¸› (à¹€à¸žà¸´à¹ˆà¸¡à¸£à¸°à¸¢à¸°à¹€à¸›à¹‡à¸™ 200px)
                            if (rect.left < 200) return false; 
                            
                            // 2. à¸à¸£à¸­à¸‡à¸—à¸´à¹‰à¸‡: à¹à¸—à¹‡à¸à¹€à¸¡à¸™à¸¹à¸‚à¸­à¸‡à¹‚à¸„à¸£à¸‡à¸ªà¸£à¹‰à¸²à¸‡à¹€à¸§à¹‡à¸š
                            if (btn.closest('nav, aside')) return false;

                            const icon = btn.querySelector('i');
                            const iconText = icon ? icon.textContent.trim().toLowerCase() : "";
                            const btnText = (btn.textContent || "").trim().toLowerCase();

                            // 3. ðŸš¨ à¸à¸£à¸­à¸‡à¸—à¸´à¹‰à¸‡ (Blacklist): à¸–à¹‰à¸²à¸¡à¸µà¸„à¸³à¸•à¹‰à¸­à¸‡à¸«à¹‰à¸²à¸¡ à¹ƒà¸«à¹‰à¹‚à¸¢à¸™à¸—à¸´à¹‰à¸‡à¸—à¸±à¸™à¸—à¸µ
                            const isBad = blacklist.some(word => btnText.includes(word.toLowerCase()));
                            if (isBad) return false;

                            // 4. à¸•à¸£à¸§à¸ˆà¸ªà¸­à¸šà¸„à¸§à¸²à¸¡à¸•à¸£à¸‡à¸à¸±à¸™
                            const matchIcon = iconNames.some(name => iconText === name.toLowerCase());
                            const matchText = textKeywords.some(keyword => btnText.includes(keyword.toLowerCase()));

                            return (matchIcon || matchText) && btn.offsetParent !== null;
                        });
                    }

                    // 1. à¸«à¸²à¸›à¸¸à¹ˆà¸¡à¹€à¸¡à¸™à¸¹à¸•à¸±à¹‰à¸‡à¸„à¹ˆà¸²
                    let settingsBtn = null;
                    const allBtns = Array.from(document.querySelectorAll('button'));
                    const submitBtn = [...allBtns].reverse().find(b => (b.querySelector('i')?.textContent || "").trim() === 'arrow_forward');
                    if (submitBtn && submitBtn.previousElementSibling) {
                        settingsBtn = submitBtn.previousElementSibling;
                    }
                    if (!settingsBtn) {
                        settingsBtn = findSafeSettingsButton(['tune', 'settings'], ['à¸•à¸±à¹‰à¸‡à¸„à¹ˆà¸²']);
                    }
                    
                    if (!settingsBtn) return resolve({ success: false, msg: 'âŒ à¸«à¸²à¸›à¸¸à¹ˆà¸¡à¹€à¸¡à¸™à¸¹à¸•à¸±à¹‰à¸‡à¸„à¹ˆà¸²à¹„à¸¡à¹ˆà¹€à¸ˆà¸­' });
                    
                    heavyClick(settingsBtn);
                    await sleep(800);
                    
                    // 2. ðŸŽ¯ à¸«à¸²à¹à¸—à¹‡à¸š Video (à¸­à¸±à¸›à¹€à¸à¸£à¸”: à¹ƒà¸ªà¹ˆ Blacklist à¸„à¸³à¸§à¹ˆà¸² "à¸”à¸¹à¸§à¸´à¸”à¸µà¹‚à¸­", "à¹€à¸„à¸£à¸·à¹ˆà¸­à¸‡à¸¡à¸·à¸­à¸ªà¸£à¹‰à¸²à¸‡à¸‰à¸²à¸")
                    let videoTab = null;
                    for (let check = 0; check < 20; check++) {
                        await sleep(500);
                        videoTab = findSafeSettingsButton(
                            ['videocam', 'play_circle'], 
                            ['à¸§à¸´à¸”à¸µà¹‚à¸­', 'video'], 
                            ['à¸”à¸¹à¸§à¸´à¸”à¸µà¹‚à¸­', 'à¹€à¸„à¸£à¸·à¹ˆà¸­à¸‡à¸¡à¸·à¸­à¸ªà¸£à¹‰à¸²à¸‡à¸‰à¸²à¸', 'scene'] // ðŸš¨ à¸›à¹‰à¸­à¸‡à¸à¸±à¸™à¸à¸²à¸£à¸à¸”à¹€à¸¡à¸™à¸¹à¸‹à¹‰à¸²à¸¢à¹à¸¥à¸°à¹€à¸¡à¸™à¸¹à¹€à¸„à¸£à¸·à¹ˆà¸­à¸‡à¸¡à¸·à¸­
                        );
                        if (videoTab) break;
                    }

                    if (videoTab) { 
                        heavyClick(videoTab); 
                        await sleep(1000); 
                    } else { 
                        document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', keyCode: 27, bubbles: true }));
                        return resolve({ success: false, msg: 'âŒ à¸«à¸²à¹à¸—à¹‡à¸š Video à¹„à¸¡à¹ˆà¹€à¸ˆà¸­ (à¹€à¸§à¹‡à¸šà¹‚à¸«à¸¥à¸”à¸Šà¹‰à¸²)' }); 
                    }

                    // 3. ðŸŽ¯ à¸«à¸²à¹à¸—à¹‡à¸š Frames
                    let framesTab = null;
                    for (let check = 0; check < 5; check++) {
                        await sleep(300);
                        framesTab = findSafeSettingsButton(['crop_free'], ['à¹€à¸Ÿà¸£à¸¡', 'frames']);
                        if (framesTab) break;
                    }
                    if (framesTab) { 
                        heavyClick(framesTab); 
                        await sleep(1000); 
                    }

                    // 4. ðŸŽ¯ à¸«à¸²à¹à¸—à¹‡à¸š à¸ªà¸±à¸”à¸ªà¹ˆà¸§à¸™
                    const targetIcon = (ratio === '9:16') ? 'crop_9_16' : 'crop_16_9';
                    const targetText = (ratio === '9:16') ? '9:16' : '16:9';
                    let ratioTab = null;
                    for (let check = 0; check < 10; check++) {
                        await sleep(300);
                        ratioTab = findSafeSettingsButton([targetIcon], [targetText]);
                        if (ratioTab) break;
                    }

                    if (ratioTab) { 
                        heavyClick(ratioTab); 
                        await sleep(1000); 
                    }

                    // à¸à¸” ESC à¹€à¸žà¸·à¹ˆà¸­à¸›à¸´à¸”à¹€à¸¡à¸™à¸¹
                    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', keyCode: 27, bubbles: true }));
                    await sleep(800);
                    resolve({ success: true, msg: `âœ… à¸•à¸±à¹‰à¸‡à¸„à¹ˆà¸² Video + Frames + ${ratio} à¸ªà¸³à¹€à¸£à¹‡à¸ˆ` });
             
                } catch (err) { resolve({ success: false, msg: 'Error: ' + err.message }); }
              });
            },
            args: [getVeo3AspectRatio()]
          });

         if (!setupVideoMode[0]?.result?.success) {
              videoAddLog(`${setupVideoMode[0]?.result?.msg}`, 'warning');
              throw new Error("à¸•à¸±à¹‰à¸‡à¸„à¹ˆà¸²à¹‚à¸«à¸¡à¸”à¸§à¸´à¸”à¸µà¹‚à¸­à¹„à¸¡à¹ˆà¸ªà¸³à¹€à¸£à¹‡à¸ˆ"); 
          } else {
              videoAddLog(`${setupVideoMode[0]?.result?.msg}`, 'success');
          }
          await videoSleep(1000);
	

    for (let imgIndex = 0; imgIndex < totalImages; imgIndex++) {
      const currentImage = videoUploadedImages[imgIndex]; 

      for (let round = 0; round < roundsPerImage; round++) {
        const currentRound = imgIndex * roundsPerImage + round + 1;
        const roundLabel = `[à¸£à¸­à¸š ${currentRound}/${totalRounds}]`;

        try {
          if (videoShouldStopAutomation) throw new Error('STOPPED');

       // ============================================
          // ðŸ§  PREPARE PROMPT (à¸­à¸±à¸›à¹€à¸”à¸•à¸ªà¹„à¸•à¸¥à¹Œà¹ƒà¸«à¹‰à¹€à¸›à¹‡à¸™à¹€à¸¥à¸‚à¸„à¸¹à¹ˆ à¸ˆà¸±à¸”à¸à¸£à¸´à¸”à¸ªà¸§à¸¢à¸‡à¸²à¸¡)
          // ============================================
          videoUpdateStatus(`${roundLabel} à¸à¸³à¸¥à¸±à¸‡à¹€à¸•à¸£à¸µà¸¢à¸¡ Prompt...`);

          const styleSelect = document.getElementById('video-style-select');
          
          // ðŸ›‘ à¸à¸Žà¹€à¸«à¸¥à¹‡à¸à¸£à¸°à¸”à¸±à¸šà¸§à¸´à¸à¸¤à¸•: à¸¥à¹‡à¸­à¸à¸„à¸­ AI à¸«à¹‰à¸²à¸¡à¹€à¸›à¸¥à¸µà¹ˆà¸¢à¸™à¸£à¸¹à¸›à¸—à¸£à¸‡ à¸›à¹‰à¸²à¸¢à¸ªà¸´à¸™à¸„à¹‰à¸² à¹à¸¥à¸° "à¹à¸Šà¹ˆà¹à¸‚à¹‡à¸‡à¸•à¸±à¸§à¸«à¸™à¸±à¸‡à¸ªà¸·à¸­" à¸‚à¸±à¹‰à¸™à¹€à¸”à¹‡à¸”à¸‚à¸²à¸”!
          const textProtection = " [CRITICAL TEXT RULE: Any Thai text, typography, or product labels in the image MUST remain 100% FROZEN, STATIC, and UNCHANGED throughout the entire video. DO NOT morph, distort, translate, animate, or hallucinate new text.]";
          const strictFidelity = " [Maintain 100% exact fidelity to the source image. DO NOT alter the product's shape, product label, typography, or background elements. Only animate the intended subject or camera movement.]" + textProtection;
          const tiktokSafetyRules = " (Rules: NO floating text, NO subtitles. Focus on natural mouth movements and minimal, realistic head gestures)." + strictFidelity;
          const productOnlySafetyRules = " (Rules: PRODUCT-ONLY video. NO people, NO human, NO face, NO presenter, NO talking character, NO mouth movement, NO lip sync, NO dialogue, NO subtitles, NO floating text. Use only subtle camera movement, light movement, product detail motion, or background ambience.)" + strictFidelity;
          const voiceoverSafetyRules = " (Rules: NARRATOR VOICEOVER ONLY. NO people, NO human presenter, NO talking character, NO mouth movement, NO lip sync, NO visible speaker, NO subtitles, NO floating text. Show only the product or the original source image with subtle product/camera motion.)" + strictFidelity;
		  
        // ðŸŒŸ [ULTRA NATURAL VERSION] à¸„à¸¥à¸±à¸‡à¸ªà¹„à¸•à¸¥à¹Œà¹ƒà¸Šà¹‰à¸‡à¸²à¸™à¸ˆà¸£à¸´à¸‡ (à¸­à¸±à¸›à¹€à¸”à¸•à¸£à¸°à¸šà¸š Tough Love & à¹€à¸žà¸´à¹ˆà¸¡à¸ªà¹„à¸•à¸¥à¹Œ)
          const videoTemplates = {
              // ðŸ—£ï¸ à¸à¸¥à¸¸à¹ˆà¸¡ 1: à¸£à¸µà¸§à¸´à¸§à¹à¸¥à¸°à¸”à¸¶à¸‡à¸”à¸¹à¸”à¸„à¸§à¸²à¸¡à¸ªà¸™à¹ƒà¸ˆ (Talking Head & Hook)
              'talk_ugc': "Cinematic smartphone selfie-style video. An authentic, unscripted UGC review of [product]. The character looks directly into the lens like a real everyday customer sharing a genuine 'after-use' experience. The character is speaking in Thai with a highly natural, word-of-mouth tone. " + tiktokSafetyRules,
              'talk_excited': "Bright aesthetic lighting. The character is enthusiastically presenting [product] to the viewer. High energy, friendly influencer vibe, sharing a great deal. The character is speaking in Thai with a lively, natural tone. " + tiktokSafetyRules,
              'talk_cheerful': "The character is lighthearted and smiling naturally while talking about [product]. A relaxed, feel-good vibe (no fake loud laughing). The character is speaking in Thai with a joyful, friendly banter tone. " + tiktokSafetyRules,
              'talk_sassy': "The character speaks with a self-assured, slightly playful charm about [product]. Confident but approachable. The character is speaking in Thai with a sassy, confident, but highly natural tone. " + tiktokSafetyRules,
             'talk_sincere': "The character recommends [product] with a warm, heart-to-heart expression. Like advising a close family member. The character is speaking in Thai with a soft, sincere, but normal conversational speed tone. No dramatic pauses. " + tiktokSafetyRules,
              'rant_expert': "Professional portrait framing. The character acts as a friendly expert explaining the benefits of [product]. Calm and trustworthy body language. The character is speaking in Thai with an authoritative yet highly helpful tone. " + tiktokSafetyRules,
              'hook_secret': "The character leans in slightly with an intimate, conversational vibe, holding [product]. They have a 'real talk' expression, sharing a valuable secret. The character is speaking in Thai with a quick, engaging, and mysterious tone. Speak continuously. " + tiktokSafetyRules,
              'hook_comparison': "The character is analyzing [product] logically, making a conversational comparison. Slight head tilt. The character is speaking in Thai with an analytical, 'let me explain' tone. " + tiktokSafetyRules,

             // ðŸ›‘ à¸à¸¥à¸¸à¹ˆà¸¡ 1.5: à¸ªà¸²à¸¢à¸šà¹ˆà¸™à¹€à¸•à¸·à¸­à¸™à¸ªà¸•à¸´ (Tough Love)
              'rant': "The character is delivering a passionate 'tough love' rant. Acting like a caring best friend scolding the viewer for neglecting their own well-being, before forcefully recommending [product] as the ultimate solution. The character is speaking in Thai with a fast, urgent, scolding, yet deeply caring tone. " + tiktokSafetyRules,
              'hook_mistake': "The character gives a caring but strict warning, slightly shaking their head in disbelief at a common mistake the viewer is making. It feels like a mother scolding out of love before offering [product] to help. The character is speaking in Thai with a concerned, slightly strict, but highly helpful warning tone. " + tiktokSafetyRules,
              'rant_skeptical': "The character gives a serious, concerned wake-up call. They show slight frustration about a bad habit the viewer is doing, then their expression turns highly supportive as they introduce [product] to fix it. The character is speaking in Thai with an honest, tough-love realization tone. " + tiktokSafetyRules,
              'rant_partner': "The character acts like a caring but frustrated partner, playfully scolding the viewer for not taking care of themselves, then handing them [product] as the perfect solution. The character is speaking in Thai with a passionate, slightly annoyed but deeply loving tone. " + tiktokSafetyRules,
			  
              // ðŸ’° à¸à¸¥à¸¸à¹ˆà¸¡ 2: à¸›à¸´à¸”à¸à¸²à¸£à¸‚à¸²à¸¢ (Closing)
              'closing_urgency': "The character expresses a natural sense of urgency about [product]. Fast-paced, dynamic energy, subtly gesturing downwards. The character is speaking in Thai with a fast-paced, FOMO-driven tone. " + tiktokSafetyRules,
              'closing_sincere': "The character gives a warm, reassuring sign-off with [product] in hand. A gentle smile indicating 'trust me on this one'. The character is speaking in Thai with a comforting, caring, but fluent and continuous tone. " + tiktokSafetyRules,
              'closing_challenge': "The character holds [product] confidently, giving a friendly, playful nod. They project a bold vibe, daring the viewer to try it. The character is speaking in Thai with a bold, confident, and challenging tone. " + tiktokSafetyRules,
              'closing_cta': "The character delivers a direct but friendly Call-To-Action about [product], subtly pointing or looking down to indicate the shopping basket. The character is speaking in Thai with a clear, inviting CTA tone. " + tiktokSafetyRules,

              // ðŸ“¸ à¸à¸¥à¸¸à¹ˆà¸¡ 3: à¹€à¸™à¹‰à¸™à¸ªà¸´à¸™à¸„à¹‰à¸² (B-Roll)
              'broll_hero': "Professional commercial Hero Shot. The [product] stands perfectly still. Very subtle light reflection movement on the surface to show realism. NO rotation. Keep original image 100%. " + productOnlySafetyRules,
              'broll_pan': "Slow and smooth cinematic camera pan over [product]. Keep the product and background exactly as the original image. " + productOnlySafetyRules,
              'broll_zoom': "Camera slowly zooms in on [product] texture. Highlighting micro-details without changing them. " + productOnlySafetyRules,
              'broll_cinematic': "Cinematic lighting setup showcasing [product]. Elegant, slow-motion feel with a premium aesthetic. Keep original image completely unmodified. " + productOnlySafetyRules,
              'broll_motion_detail': "Product motion-detail B-roll. Use a gentle camera drift, subtle focus pull, tiny reflection movement, and micro-detail emphasis on [product]. Do NOT change the main lighting, scene, color mood, product shape, label, or background. Keep the original image identity intact. " + productOnlySafetyRules,
              'miniature_vdo': `Cinematic miniature product world animation. The giant [product] remains static while tiny non-human props, packaging pieces, lights, and display elements move in a stepped stop-motion style. Tilt-shift macro zoom. ${productOnlySafetyRules}`,

              // ðŸŽ™ï¸ à¸à¸¥à¸¸à¹ˆà¸¡ 4: à¸žà¸²à¸à¸¢à¹Œà¹€à¸ªà¸µà¸¢à¸‡ (Voiceover)
              'voice_promo': "Fast cuts commercial style. Energetic camera movement showing [product]. Keep original image details. Voice Tone: High-energy, fast-paced commercial narrator. " + voiceoverSafetyRules,
              'voice_soft': "Gentle camera movement showing [product]. Soft vibe. Keep original colors. Voice Tone: Soothing and calm narrator, but speaking at a normal, continuous commercial pace. NOT slow ASMR. " + voiceoverSafetyRules,
             'voice_docu': "Cinematic product documentary style. Elegant pans detailing the premium quality of [product]. Voice Tone: Professional and sophisticated product narrator explaining features continuously at a standard commercial speed. NOT slow. " + voiceoverSafetyRules,
              'voice_rant': "Dramatic and urgent commercial style. High contrast lighting showing [product]. Voice Tone: Strict, deeply concerned, and urgent warning narrator. " + voiceoverSafetyRules,
              'voice_miniature': "Cinematic miniature product world animation. The giant [product] remains static while tiny non-human props, lights, packaging pieces, and display elements move in a stepped stop-motion style. Script Style: A highly engaging TikTok-style narrative. Start with a cinematic hook, explain REAL benefits, end with CTA. Voice Tone: Magical, premium documentary narrator. " + voiceoverSafetyRules,
              'cartoon': "Magical and highly expressive commercial style. Playful camera angles showing [product] with a vibrant, animated vibe. Voice Tone: Classic Disney-style cartoon narrator, theatrical, highly expressive, magical, and bouncy. " + voiceoverSafetyRules,
			'voice_news': "Professional news broadcast style. Camera framing [product] as the subject of a breaking news or exclusive feature story. Clean, objective, and high-quality presentation. Voice Tone: Authoritative, clear, and professional news anchor narrator reporting breaking news and formally presenting the key details about [product]. " + voiceoverSafetyRules,
              'voice_movie': "Epic Hollywood movie trailer style. Dramatic lighting showcasing [product]. Voice Tone: Deep, resonant movie trailer narrator speaking continuously and powerfully without long dramatic pauses. " + voiceoverSafetyRules
		 

		 };

          const randomVStyleSwitch = document.getElementById('video-random-style-switch');
          const customScriptInput = document.getElementById('video-custom-script');
          const customScriptValue = customScriptInput ? customScriptInput.value.trim() : "";
          const isRandomVStyle = randomVStyleSwitch ? randomVStyleSwitch.checked : false;
          let selectedId = "talk_ugc";

          const noVoiceModes = ['broll_hero', 'broll_pan', 'broll_zoom', 'broll_cinematic', 'broll_motion_detail', 'miniature_vdo'];
          const voiceoverModes = ['voice_promo', 'voice_soft', 'voice_docu', 'voice_rant', 'voice_miniature', 'cartoon', 'voice_news', 'voice_movie'];
		  
          if (isRandomVStyle) {
              let keys = Object.keys(videoTemplates);
              if (customScriptValue !== "") {
                  keys = keys.filter(k => !noVoiceModes.includes(k));
              }
              selectedId = keys[Math.floor(Math.random() * keys.length)];
          } else {
              selectedId = styleSelect ? styleSelect.value : 'talk_ugc';
          }
          
          let finalPrompt = videoTemplates[selectedId] || videoTemplates['talk_ugc'];
          finalPrompt = finalPrompt.replace(/\[product\]/g, productName || 'the product');

          // --- Voice & Gender Logic ---
          const voiceOptions = ['central', 'isan', 'northern']; 
          let videoVoiceInput = document.getElementById('video-voice-select');
          let selectedVoice = (videoVoiceInput && videoVoiceInput.value !== 'auto') ? videoVoiceInput.value : voiceOptions[Math.floor(Math.random() * 3)];
          
          const genderInput = document.getElementById('video-voice-gender-select');
          let selectedGender = (genderInput && genderInput.value !== 'auto') ? genderInput.value : ''; 
          
          if (!voiceoverModes.includes(selectedId)) {
              selectedGender = '';
          }

        const genderMap = { 'female': 'adult female', 'male': 'adult male', 'teen_girl': 'teenage girl', 'teen_boy': 'teenage boy', 'girl': 'young girl', 'boy': 'young boy', 'grandma': 'elderly female', 'grandpa': 'elderly male' };
          let genderTerm = genderMap[selectedGender] || '';

        let speakerRef = "The character is";

          // ðŸ—£ï¸ à¸à¸±à¸‡à¸„à¸³à¸ªà¸±à¹ˆà¸‡à¹à¸‹à¸™à¸”à¹Œà¸§à¸´à¸Š: à¸•à¸µà¸à¸£à¸­à¸šà¸«à¸™à¹‰à¸²-à¸«à¸¥à¸±à¸‡ à¸šà¸±à¸‡à¸„à¸±à¸šà¸žà¸¹à¸”à¹„à¸—à¸¢ 100% à¸«à¹‰à¸²à¸¡à¸«à¸¥à¸¸à¸”à¹€à¸”à¹‡à¸”à¸‚à¸²à¸”!
          let thaiHeader = "[CRITICAL LANGUAGE OVERRIDE: 100% THAI AUDIO ONLY. NO ENGLISH.] ";
          let thaiFooter = " [STRICT ENFORCEMENT: The character MUST speak exclusively in fluent Thai language. Absolutely NO English words, NO foreign languages, NO English accents. Must speak with a natural, continuous conversational pace. NO unnaturally slow talking, NO awkward pauses.]";
          
          let dialectPhrase = "";
          
          if (selectedVoice === 'isan') {
              dialectPhrase = `${thaiHeader}[DIALECT: Isan Thai] ${speakerRef} speaking in Isan Thai dialect. [CRITICAL RULE: This is a product review, NOT food. DO NOT use food words like "Saep". Use words like "Dee E-lee" or "Ngam" instead]${thaiFooter}`;
          } else if (selectedVoice === 'northern') {
              dialectPhrase = `${thaiHeader}[DIALECT: Northern Thai] ${speakerRef} speaking in Northern Thai dialect with a modern conversational pace. Strictly speaking ONLY, NO singing, NO traditional music${thaiFooter}`;
          } else {
              // à¸ªà¸³à¸«à¸£à¸±à¸šà¸ à¸²à¸©à¸²à¸à¸¥à¸²à¸‡
              dialectPhrase = `${thaiHeader}[DIALECT: Standard Thai] ${speakerRef} speaking in standard Thai${thaiFooter}`;
          }

          // --- Audio Injection Logic ---
          if (noVoiceModes.includes(selectedId)) {
              // à¸›à¸´à¸”à¹€à¸ªà¸µà¸¢à¸‡ (B-Roll) à¸¥à¸šà¸„à¸³à¸ªà¸±à¹ˆà¸‡à¸žà¸¹à¸”à¸­à¸­à¸à¹ƒà¸«à¹‰à¸«à¸¡à¸”
              finalPrompt = finalPrompt.replace(/The character is speaking in Thai/gi, ''); 
              finalPrompt = finalPrompt.replace(/speaking in thai/gi, ''); 
              videoAddLog(`ðŸ”‡ B-Roll: à¸›à¸´à¸”à¹€à¸ªà¸µà¸¢à¸‡`, 'info');
          } else if (voiceoverModes.includes(selectedId)) {
              let genderLabel = genderTerm ? `${genderTerm} ` : "";
              let voPhrase = dialectPhrase.replace(/The character is/gi, 'The narrator voiceover is');
              finalPrompt += ` (Audio Note: A professional ${genderLabel}narrator voiceover. ${voPhrase}).`;
              videoAddLog(`ðŸŽ™ï¸ Voiceover: ${genderTerm || 'à¹„à¸¡à¹ˆà¸£à¸°à¸šà¸¸à¹€à¸žà¸¨'} (${selectedVoice})`, 'info');
          } else {
              // ðŸ› ï¸ FIX 3: à¹€à¸›à¸¥à¸µà¹ˆà¸¢à¸™à¸ˆà¸²à¸à¸à¸²à¸£à¹ƒà¸Šà¹‰ .replace() à¹à¸—à¸£à¸à¸à¸¥à¸²à¸‡à¸›à¸£à¸°à¹‚à¸¢à¸„ à¹€à¸›à¹‡à¸™à¸à¸²à¸£à¸•à¹ˆà¸­à¸—à¹‰à¸²à¸¢ (Append) à¹€à¸žà¸·à¹ˆà¸­à¹ƒà¸«à¹‰ Prompt à¸ªà¸¡à¸šà¸¹à¸£à¸“à¹Œ
              finalPrompt += ` ${dialectPhrase}`;
          }

          // --- Custom Script Injection ---
          if (customScriptValue && !noVoiceModes.includes(selectedId)) {
              // ðŸ› ï¸ FIX 4: à¸šà¸±à¸‡à¸„à¸±à¸šà¸„à¸³à¸§à¹ˆà¸² "exactly in Thai language" à¹„à¸§à¹‰à¸«à¸™à¹‰à¸²à¸šà¸—à¸žà¸¹à¸” à¹€à¸žà¸·à¹ˆà¸­à¹„à¸¡à¹ˆà¹ƒà¸«à¹‰ AI à¸‚à¹‰à¸²à¸¡à¹„à¸›à¹ƒà¸Šà¹‰à¸ à¸²à¸©à¸²à¸­à¸·à¹ˆà¸™
              if (voiceoverModes.includes(selectedId)) {
                  finalPrompt += ` The narrator voiceover is saying exactly in Thai language: "${customScriptValue}".`;
              } else {
                  finalPrompt += ` The character is talking to the camera, saying exactly in Thai language: "${customScriptValue}".`;
              }
              videoAddLog(`ðŸ—£ï¸ à¹ƒà¸Šà¹‰à¸šà¸—à¸žà¸¹à¸”à¸—à¸µà¹ˆà¸£à¸°à¸šà¸¸: "${customScriptValue}"`, 'info');
          }

          // ðŸ› ï¸ FIX 5: à¹€à¸žà¸´à¹ˆà¸¡à¸„à¸³à¹à¸šà¸™à¸ à¸²à¸©à¸²à¸•à¹ˆà¸²à¸‡à¸Šà¸²à¸•à¸´ (foreign language, english language) à¹ƒà¸™ Negative Prompt
          if (voiceoverModes.includes(selectedId)) {
              finalPrompt += ` [STRICT VISUAL VOICEOVER RULE: The voice is off-screen narration only. Do not create a presenter, talking face, lips, mouth movement, or any new human. If the source image already contains a person, keep that person visually static and do not make them speak.]`;
          }
          finalPrompt += ` Product label and text must be 100% FROZEN. ${getAntiBotSeed()} Negative Prompt: "foreign language, english language, english audio, other languages, text morphing, changing text, distorted letters, gibberish, alien language, moving text, floating letters, bad text, slow talking, slow speaking, long pauses, awkward silence, short speech, whispering"`;
          
      // ============================================
          // ðŸŸ¢ STEP 2: à¸­à¸±à¸žà¹‚à¸«à¸¥à¸”à¸£à¸¹à¸›à¹à¸¥à¸°à¸à¸” [à¹€à¸žà¸´à¹ˆà¸¡à¹„à¸›à¸¢à¸±à¸‡à¸žà¸£à¸­à¸¡à¸•à¹Œ] (à¸­à¸±à¸›à¹€à¸à¸£à¸” V14: à¹€à¸ˆà¸²à¸°à¹€à¸à¸£à¸²à¸° Radix UI Menu)
          // ============================================
          videoUpdateStatus(`${roundLabel} Step 2/4: à¸à¸³à¸¥à¸±à¸‡à¸­à¸±à¸žà¹‚à¸«à¸¥à¸”à¹à¸¥à¸°à¹€à¸žà¸´à¹ˆà¸¡à¸¥à¸‡à¸žà¸£à¸­à¸¡à¸•à¹Œ...`);

          const singleImageData = [{
            name: currentImage.name, type: currentImage.type, dataUrl: currentImage.dataUrl
          }];

          const uploadResult = await chrome.scripting.executeScript({
            target: { tabId: tab.id },
            func: (images) => {
              return new Promise(async (resolve) => {
                  try {
                      const sleep = (ms) => new Promise(r => setTimeout(r, ms));
                      
                      // ðŸŽ¯ à¸Ÿà¸±à¸‡à¸à¹Œà¸Šà¸±à¸™à¸—à¸µà¹ˆ 1: à¸ªà¸³à¸«à¸£à¸±à¸šà¸à¸”à¹€à¸›à¸´à¸”à¹€à¸¡à¸™à¸¹ 3 à¸ˆà¸¸à¸” (Hover + MouseDown)
                      async function triggerClick(el) {
                          if (!el) return;
                          el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                          await sleep(300);
                          el.dispatchEvent(new MouseEvent('mouseover', { bubbles: true }));
                          el.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
                          el.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true }));
                          el.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));
                          await sleep(100); 
                          el.dispatchEvent(new PointerEvent('pointerup', { bubbles: true }));
                          el.dispatchEvent(new MouseEvent('mouseup', { bubbles: true }));
                          el.click(); // à¸¢à¹‰à¸³à¸”à¹‰à¸§à¸¢ click à¹€à¸œà¸·à¹ˆà¸­à¹„à¸§à¹‰
                      }

                      // ðŸŽ¯ à¸Ÿà¸±à¸‡à¸à¹Œà¸Šà¸±à¸™à¸—à¸µà¹ˆ 2: à¸ªà¸³à¸«à¸£à¸±à¸šà¸à¸”à¸„à¸³à¸ªà¸±à¹ˆà¸‡à¹ƒà¸™à¹€à¸¡à¸™à¸¹ Radix UI 
                      async function actionClick(el) {
                          if (!el) return;
                          el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                          await sleep(300);
                          el.dispatchEvent(new MouseEvent('mouseover', { bubbles: true }));
                          el.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true }));
                          el.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));
                          await sleep(100);
                          el.dispatchEvent(new PointerEvent('pointerup', { bubbles: true }));
                          el.dispatchEvent(new MouseEvent('mouseup', { bubbles: true }));
                          el.click(); 
                      }

                      // 1. à¸ˆà¸³à¸£à¸¹à¸›à¹€à¸à¹ˆà¸²à¸šà¸™à¸«à¸™à¹‰à¸²à¸ˆà¸­à¸—à¸±à¹‰à¸‡à¸«à¸¡à¸”à¹„à¸§à¹‰à¸à¹ˆà¸­à¸™
                      const getFeedImgs = () => Array.from(document.querySelectorAll('img')).filter(img => {
                          const rect = img.getBoundingClientRect();
                          const isHeader = img.closest('header, nav, [role="banner"]');
                          return rect.width > 40 && rect.height > 40 && !isHeader; // à¹ƒà¸Šà¹‰ 40px à¹€à¸œà¸·à¹ˆà¸­à¹€à¸›à¹‡à¸™ Thumbnail à¹€à¸¥à¹‡à¸à¹†
                      });
                      const initialImagesSrc = getFeedImgs().map(img => img.src);

                      // 2. à¸™à¸³à¸£à¸¹à¸›à¹„à¸›à¸§à¸²à¸‡ (Paste) à¹ƒà¸™à¸Šà¹ˆà¸­à¸‡à¹à¸Šà¸—à¸«à¸¥à¸±à¸
                      const editor = document.querySelector('[data-slate-editor="true"]') || document.querySelector('[role="textbox"]');
                      if (!editor) return resolve({ success: false, msg: 'âŒ à¹„à¸¡à¹ˆà¸žà¸šà¸Šà¹ˆà¸­à¸‡à¹à¸Šà¸—à¹€à¸žà¸·à¹ˆà¸­à¸§à¸²à¸‡à¸£à¸¹à¸›' });

                      editor.focus();
                      editor.click();
                      await sleep(500);

                      const dataTransfer = new DataTransfer();
                      images.forEach((img) => {
                          const byteString = atob(img.dataUrl.split(',')[1]);
                          const ab = new ArrayBuffer(byteString.length);
                          const ia = new Uint8Array(ab);
                          for (let i = 0; i < byteString.length; i++) ia[i] = byteString.charCodeAt(i);
                          const file = new File([new Blob([ab], { type: img.type })], img.name, { type: img.type });
                          dataTransfer.items.add(file);
                      });

                     const pasteEvent = new ClipboardEvent('paste', {
                          clipboardData: dataTransfer, bubbles: true, cancelable: true
                      });
                      editor.dispatchEvent(pasteEvent);

                      // ðŸŸ¢ à¸£à¸­à¸à¸¥à¸·à¸™à¹„à¸Ÿà¸¥à¹Œà¸à¸±à¹ˆà¸‡à¸§à¸´à¸”à¸µà¹‚à¸­ (4 à¸§à¸´à¸™à¸²à¸—à¸µ)
                      await sleep(4000); 
                      
                      // à¸£à¸­à¸à¸”à¸›à¸¸à¹ˆà¸¡ Save/Crop (à¸–à¹‰à¸²à¸¡à¸µ)
                      let confirmBtn = null;
                      const confirmTexts = ['Save', 'Confirm', 'Crop and Save', 'à¸šà¸±à¸™à¸—à¸¶à¸', 'à¸¢à¸·à¸™à¸¢à¸±à¸™', 'à¹€à¸ªà¸£à¹‡à¸ˆà¸ªà¸´à¹‰à¸™', 'à¸•à¹ˆà¸­à¹„à¸›'];
                      for (let check = 0; check < 20; check++) {
                          const currentButtons = document.querySelectorAll('button');
                          confirmBtn = Array.from(currentButtons).find(btn =>
                              confirmTexts.some(t => (btn.textContent || '').includes(t)) && btn.offsetParent !== null
                          );
                          if (confirmBtn) break;
                          await sleep(500);
                      }
                      
                      if (confirmBtn) {
                          confirmBtn.click(); 
                          // ðŸŸ¢ à¸£à¸­à¸«à¸™à¹‰à¸²à¸•à¹ˆà¸²à¸‡à¸›à¸´à¸” (4 à¸§à¸´à¸™à¸²à¸—à¸µ)
                          await sleep(4000); 
                      }

                      // 3. ðŸŽ¯ à¸£à¸°à¸šà¸šà¹€à¸¥à¹‡à¸‡à¹€à¸›à¹‰à¸²à¹à¸¥à¸°à¸à¸” 3 à¸ˆà¸¸à¸”
                      let isSuccess = false;

                      for (let w = 0; w < 40; w++) { 
                          await sleep(1500); // à¸£à¸­à¸£à¸¹à¸›à¸­à¸±à¸›à¹‚à¸«à¸¥à¸”à¹€à¸‚à¹‰à¸² Feed
                          
                          const currentImgs = getFeedImgs();
                          let newImg = currentImgs.find(img => !initialImagesSrc.includes(img.src));

                          // à¸—à¹ˆà¸²à¹„à¸¡à¹‰à¸•à¸²à¸¢: à¸–à¹‰à¸²à¸«à¸²à¸ˆà¸²à¸ src à¹„à¸¡à¹ˆà¹€à¸ˆà¸­ à¹ƒà¸«à¹‰à¸«à¸²à¸›à¹‰à¸²à¸¢à¸„à¸³à¸§à¹ˆà¸² "à¸£à¸¹à¸›à¸ à¸²à¸žà¸—à¸µà¹ˆà¸­à¸±à¸›à¹‚à¸«à¸¥à¸”" 
                          if (!newImg) {
                              const uploadLabels = Array.from(document.querySelectorAll('span, div, p')).filter(el => 
                                  el.innerText && (el.innerText.includes('à¸£à¸¹à¸›à¸ à¸²à¸žà¸—à¸µà¹ˆà¸­à¸±à¸›à¹‚à¸«à¸¥à¸”') || el.innerText.includes('Uploaded'))
                              );
                              if (uploadLabels.length > 0) {
                                  let container = uploadLabels[0].closest('div[class*="card"], div:has(img)') || uploadLabels[0].parentElement.parentElement;
                                  if (container) newImg = container.querySelector('img');
                              }
                          }

                          if (newImg) {
                              newImg.scrollIntoView({ behavior: 'smooth', block: 'center' });
                              await sleep(1000); 

                              // à¹€à¸­à¸²à¹€à¸¡à¸²à¸ªà¹Œà¸–à¸¹à¹† à¸—à¸µà¹ˆà¸à¸²à¸£à¹Œà¸”à¸£à¸¹à¸› à¹€à¸žà¸·à¹ˆà¸­à¹€à¸£à¸µà¸¢à¸à¸›à¸¸à¹ˆà¸¡ 3 à¸ˆà¸¸à¸”à¸­à¸­à¸à¸¡à¸²
                              newImg.dispatchEvent(new MouseEvent('mouseover', {bubbles: true}));
                              newImg.dispatchEvent(new MouseEvent('mouseenter', {bubbles: true}));
                              await sleep(1000);

                              let dotBtn = null;
                              let container = newImg.parentElement;
                              
                              for (let i = 0; i < 15; i++) {
                                  if (!container || container === document.body) break;
                                  const btns = Array.from(container.querySelectorAll('button'));
                                  dotBtn = btns.find(b => {
                                      // à¸«à¸²à¸œà¹ˆà¸²à¸™ Native JS à¹‚à¸”à¸¢à¸«à¸¥à¸µà¸à¹€à¸¥à¸µà¹ˆà¸¢à¸‡ :contains à¸‚à¸­à¸‡ jQuery
                                      const icon = b.querySelector('i, svg');
                                      const text = (b.innerText || '').toLowerCase();
                                      const ariaLabel = (b.getAttribute('aria-label') || '').toLowerCase();
                                      const isMenu = b.getAttribute('aria-haspopup') === 'menu';
                                      
                                      return isMenu || ariaLabel.includes('more') || ariaLabel.includes('à¸•à¸±à¸§à¹€à¸¥à¸·à¸­à¸') || (icon && (text.includes('more') || text.includes('vert') || text.includes('horiz')));
                                  });
                                  if (dotBtn) break;
                                  container = container.parentElement;
                              }

                              if (!dotBtn) {
                                  // à¹à¸ªà¸à¸™à¸—à¸±à¹‰à¸‡à¸ˆà¸­à¸«à¸²à¸£à¸­à¸šà¹† à¸£à¸¹à¸›
                                  const allBtns = Array.from(document.querySelectorAll('button'));
                                  const validDotBtns = allBtns.filter(b => {
                                      const isMenu = b.getAttribute('aria-haspopup') === 'menu';
                                      const icon = b.querySelector('i, svg');
                                      const text = (b.innerText || '').toLowerCase();
                                      const rect = b.getBoundingClientRect();
                                      return (isMenu || (icon && text.includes('more'))) && rect.width > 0; 
                                  });
                                  if (validDotBtns.length > 0) {
                                      const imgRect = newImg.getBoundingClientRect();
                                      validDotBtns.sort((a, b) => Math.abs(a.getBoundingClientRect().top - imgRect.top) - Math.abs(b.getBoundingClientRect().top - imgRect.top));
                                      dotBtn = validDotBtns[0];
                                  }
                              }

                              if (dotBtn) {
                                  // ðŸ”¥ 1. à¹€à¸›à¸´à¸”à¹€à¸¡à¸™à¸¹
                                  await triggerClick(dotBtn); 
                                  await sleep(1500); // à¸£à¸­à¹€à¸¡à¸™à¸¹à¸à¸²à¸‡à¸­à¸­à¸à¹à¸šà¸šà¸™à¸´à¹ˆà¸‡à¹†

                                 // ðŸŒ à¸­à¸±à¸›à¹€à¸à¸£à¸” V14: à¹€à¸ˆà¸²à¸°à¹€à¸à¸£à¸²à¸°à¹€à¸¡à¸™à¸¹à¸•à¸²à¸¡ HTML à¸—à¸µà¹ˆà¸£à¸°à¸šà¸¸ (Radix UI)
                                  const menuItems = Array.from(document.querySelectorAll('[role="menuitem"], button')).reverse();
                                  const addPromptBtn = menuItems.find(m => {
                                      const rect = m.getBoundingClientRect();
                                      if (rect.width === 0 || rect.height === 0) return false; // à¸‚à¹‰à¸²à¸¡à¸›à¸¸à¹ˆà¸¡à¸—à¸µà¹ˆà¸‹à¹ˆà¸­à¸™à¸­à¸¢à¸¹à¹ˆ

                                      // à¸à¸§à¸²à¸” Text à¸—à¸±à¹‰à¸‡à¸«à¸¡à¸”à¸‚à¹‰à¸²à¸‡à¹ƒà¸™à¸›à¸¸à¹ˆà¸¡ à¸£à¸§à¸¡à¸–à¸¶à¸‡à¹„à¸­à¸„à¸­à¸™
                                      const text = (m.textContent || "").replace(/\s+/g, ''); 
                                      return text.includes('à¹€à¸žà¸´à¹ˆà¸¡à¹„à¸›à¸¢à¸±à¸‡à¸žà¸£à¸­à¸¡à¸•à¹Œ') || text.includes('addtoprompt') || text.includes('à¹€à¸žà¸´à¹ˆà¸¡à¸¥à¸‡à¹ƒà¸™à¸žà¸£à¸­à¸¡à¸•à¹Œ');
                                  });

                                  if (addPromptBtn) {
                                      // ðŸ”¥ 2. à¸„à¸¥à¸´à¸à¸›à¸¸à¹ˆà¸¡à¹€à¸¡à¸™à¸¹ "à¹€à¸žà¸´à¹ˆà¸¡à¹„à¸›à¸¢à¸±à¸‡à¸žà¸£à¸­à¸¡à¸•à¹Œ"
                                      await actionClick(addPromptBtn); 
                                      await sleep(800);
                                      
                                      // à¸›à¸´à¸”à¹€à¸¡à¸™à¸¹à¹€à¸œà¸·à¹ˆà¸­à¸„à¹‰à¸²à¸‡
                                      document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', keyCode: 27, bubbles: true }));
                                      isSuccess = true;
                                      break; 
                                  } else {
                                      // à¸–à¹‰à¸²à¹„à¸¡à¹ˆà¸¡à¸µà¹€à¸¡à¸™à¸¹ à¹à¸ªà¸”à¸‡à¸§à¹ˆà¸²à¸£à¸¹à¸›à¸¢à¸±à¸‡à¸›à¸£à¸°à¸¡à¸§à¸¥à¸œà¸¥à¹„à¸¡à¹ˆà¹€à¸ªà¸£à¹‡à¸ˆ à¹ƒà¸«à¹‰à¸›à¸´à¸”à¸«à¸™à¹‰à¸²à¸•à¹ˆà¸²à¸‡à¸—à¸´à¹‰à¸‡à¹à¸¥à¹‰à¸§à¸£à¸­à¸§à¸™à¸¥à¸¹à¸›à¹ƒà¸«à¸¡à¹ˆ
                                      document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', keyCode: 27, bubbles: true }));
                                  }
                              } else {
                                  // à¸—à¹ˆà¸²à¹„à¸¡à¹‰à¸•à¸²à¸¢à¸ªà¸¸à¸”à¸—à¹‰à¸²à¸¢: à¸„à¸¥à¸´à¸à¸‚à¸§à¸²à¸—à¸µà¹ˆà¸£à¸¹à¸›
                                  newImg.dispatchEvent(new MouseEvent('contextmenu', { bubbles: true, cancelable: true, view: window, button: 2 }));
                                  await sleep(1500);
                              }
                          }
                      } 

                      if (isSuccess) {
                          return resolve({ success: true, msg: 'âœ… à¸à¸” [à¹€à¸žà¸´à¹ˆà¸¡à¹„à¸›à¸¢à¸±à¸‡à¸žà¸£à¸­à¸¡à¸•à¹Œ] à¸ªà¸³à¹€à¸£à¹‡à¸ˆà¹à¸¥à¹‰à¸§!' });
                      } else {
                          return resolve({ success: false, msg: 'âŒ à¸«à¸¡à¸”à¹€à¸§à¸¥à¸²à¸£à¸­ à¸«à¸£à¸·à¸­à¸à¸”à¹€à¸¡à¸™à¸¹à¹„à¸¡à¹ˆà¸•à¸´à¸”' });
                      }

                  } catch (e) { resolve({ success: false, msg: 'Error: ' + e.message }); }
              });
            },
            args: [singleImageData]
          });

          if (!uploadResult[0]?.result?.success) {
              videoAddLog(`âš ï¸ ${uploadResult[0]?.result?.msg} -> à¸‚à¹‰à¸²à¸¡à¸£à¸­à¸šà¸™à¸µà¹‰`, 'warning');
              throw new Error("à¸™à¸³à¸£à¸¹à¸›à¹€à¸‚à¹‰à¸²à¸à¸¥à¹ˆà¸­à¸‡à¹€à¸£à¸´à¹ˆà¸¡à¹„à¸¡à¹ˆà¸ªà¸³à¹€à¸£à¹‡à¸ˆ"); 
          } else {
              videoAddLog(`${uploadResult[0]?.result?.msg}`, 'success');
          }
          await videoSleep(3000);

          // ============================================
          // ðŸŸ¢ STEP 3: à¸à¸£à¸­à¸ Prompt à¸§à¸´à¸”à¸µà¹‚à¸­
          // ============================================
          videoUpdateStatus(`${roundLabel} Step 3/4: à¸à¸³à¸¥à¸±à¸‡à¸›à¹‰à¸­à¸™à¸„à¸³à¸ªà¸±à¹ˆà¸‡à¸ªà¸£à¹‰à¸²à¸‡à¸§à¸´à¸”à¸µà¹‚à¸­...`);

          await chrome.scripting.executeScript({
            target: { tabId: tab.id },
            func: async (text) => {
                const sleep = (ms) => new Promise(r => setTimeout(r, ms));
                const editor = document.querySelector('[data-slate-editor="true"]') || document.querySelector('[role="textbox"]');

                if (editor) {
                    editor.blur(); await sleep(100);
                    editor.focus(); editor.click(); await sleep(300);

                    editor.dispatchEvent(new KeyboardEvent('keydown', { key: 'a', ctrlKey: true, bubbles: true }));
                    document.execCommand('selectAll', false, null);
                    await sleep(100);
                    editor.dispatchEvent(new KeyboardEvent('keydown', { key: 'Backspace', keyCode: 8, bubbles: true }));
                    document.execCommand('delete', false, null);
                    await sleep(300);

                    editor.dispatchEvent(new InputEvent('beforeinput', { inputType: 'insertText', data: text, bubbles: true, cancelable: true }));

                    const dt = new DataTransfer();
                    dt.setData('text/plain', text);
                    dt.setData('text/html', `<p>${text}</p>`); 
                   
				   const pasteEvent = new ClipboardEvent('paste', { clipboardData: dt, bubbles: true, cancelable: true, composed: true });
                    editor.dispatchEvent(pasteEvent);
                    await sleep(500);

                    if (!editor.textContent.includes(text.substring(0, 10))) {
                        document.execCommand('insertText', false, text);
                    }

                    editor.dispatchEvent(new InputEvent('input', { inputType: 'insertText', data: text, bubbles: true, composed: true }));

                    editor.dispatchEvent(new KeyboardEvent('keydown', { key: ' ', code: 'Space', keyCode: 32, bubbles: true }));
                    document.execCommand('insertText', false, ' ');
                    editor.dispatchEvent(new InputEvent('input', { inputType: 'insertText', data: ' ', bubbles: true }));
                    editor.dispatchEvent(new KeyboardEvent('keyup', { key: ' ', code: 'Space', keyCode: 32, bubbles: true }));

                    editor.blur(); await sleep(150); editor.focus();
                }
            },
            args: [finalPrompt]
          });
          await videoSleep(4500);

          // ============================================
          // ðŸŸ¢ STEP 4: à¸à¸”à¸›à¸¸à¹ˆà¸¡à¸ªà¹ˆà¸‡à¸„à¸³à¸ªà¸±à¹ˆà¸‡à¸ªà¸£à¹‰à¸²à¸‡à¸§à¸´à¸”à¸µà¹‚à¸­ [ULTIMATE GOD MODE]
          // ============================================
          videoUpdateStatus(`${roundLabel} Step 4/4: à¸à¸³à¸¥à¸±à¸‡à¸à¸”à¸ªà¸£à¹‰à¸²à¸‡à¸§à¸´à¸”à¸µà¹‚à¸­...`);
          
          const createResult = await chrome.scripting.executeScript({
            target: { tabId: tab.id },
            world: 'MAIN', // à¸—à¸°à¸¥à¸§à¸‡à¹€à¸‚à¹‰à¸²à¸«à¸™à¹‰à¸²à¹€à¸§à¹‡à¸šà¸«à¸¥à¸±à¸
            func: (timeoutMs) => {
              return new Promise((resolve) => {
                  const sleep = (ms) => new Promise(r => setTimeout(r, ms));
                  
                  async function trySubmit() {
                      let attempts = 0;
                      const maxAttempts = Math.floor(timeoutMs / 1000);

                      while (attempts < maxAttempts) {
                          attempts++;
                          
                          const allBtns = Array.from(document.querySelectorAll('button'));
                          let targetBtn = null;

                          for (let i = allBtns.length - 1; i >= 0; i--) {
                              const btn = allBtns[i];
                              const html = (btn.innerHTML || "").toLowerCase();
                              const text = (btn.textContent || "").toLowerCase().trim();

                              const style = window.getComputedStyle(btn);
                              // à¹€à¸Šà¹‡à¸„à¹ƒà¸«à¹‰à¸Šà¸±à¸§à¸£à¹Œà¸§à¹ˆà¸²à¸›à¸¸à¹ˆà¸¡à¸žà¸£à¹‰à¸­à¸¡à¹ƒà¸Šà¹‰à¸‡à¸²à¸™à¸ˆà¸£à¸´à¸‡à¹† à¹„à¸¡à¹ˆà¹„à¸”à¹‰à¹à¸­à¸šà¹€à¸—à¸²à¸­à¸¢à¸¹à¹ˆ
                              if (btn.disabled || style.pointerEvents === 'none' || style.opacity === '0' || btn.getAttribute('aria-disabled') === 'true') continue;

                              if (text.includes('nano') || text.includes('pro') || text.includes('à¸­à¸±à¸›à¹€à¸à¸£à¸”')) continue;
                              if (html.includes('add_circle') || html.includes('add ')) continue;

                              if (html.includes('arrow_forward') || html.includes('send') || text === 'à¸ªà¸£à¹‰à¸²à¸‡' || text === 'create') {
                                  targetBtn = btn;
                                  break;
                              }
                          }

                          if (targetBtn) {
                              // à¹€à¸¥à¸·à¹ˆà¸­à¸™à¸ˆà¸­à¹ƒà¸«à¹‰à¸›à¸¸à¹ˆà¸¡à¸­à¸¢à¸¹à¹ˆà¸•à¸£à¸‡à¸à¸¥à¸²à¸‡à¹€à¸›à¹Šà¸°à¹† à¸«à¸¥à¸šà¸žà¸§à¸à¹à¸–à¸šà¹€à¸¡à¸™à¸¹à¸šà¸±à¸‡
                              targetBtn.scrollIntoView({ behavior: 'smooth', block: 'center' });
                              await sleep(500);

                              let success = false;
                              try {
                                  // ðŸ”¥ à¸—à¹ˆà¸²à¸—à¸µà¹ˆ 1: à¹à¸®à¹‡à¸ React (à¹€à¸„à¸£à¸·à¹ˆà¸­à¸‡ Chrome à¹ƒà¸«à¸¡à¹ˆà¹† à¸ˆà¸°à¸œà¹ˆà¸²à¸™à¸—à¹ˆà¸²à¸™à¸µà¹‰)
                                  const reactKey = Object.keys(targetBtn).find(k => k.startsWith('__reactProps'));
                                  if (reactKey && targetBtn[reactKey].onClick) {
                                      targetBtn[reactKey].onClick({ preventDefault: () => {}, stopPropagation: () => {}, nativeEvent: { isTrusted: true }, type: 'click' });
                                      success = true;
                                  } else {
                                      const icon = targetBtn.querySelector('i');
                                      if (icon) {
                                          const iconKey = Object.keys(icon).find(k => k.startsWith('__reactProps'));
                                          if (iconKey && icon[iconKey].onClick) {
                                              icon[iconKey].onClick({ preventDefault: () => {}, stopPropagation: () => {}, nativeEvent: { isTrusted: true }, type: 'click' });
                                              success = true;
                                          }
                                      }
                                  }
                              } catch(e) {}

                              // ðŸ”¥ à¸—à¹ˆà¸²à¸—à¸µà¹ˆ 2: à¸ˆà¸³à¸¥à¸­à¸‡à¹€à¸¡à¸²à¸ªà¹Œà¸¢à¸´à¸‡à¸žà¸´à¸à¸±à¸” X, Y à¸•à¸£à¸‡à¸à¸¥à¸²à¸‡à¸›à¸¸à¹ˆà¸¡ (à¸—à¸°à¸¥à¸¸à¸à¸³à¹à¸žà¸‡à¸šà¸±à¸‡)
                              const rect = targetBtn.getBoundingClientRect();
                              const x = rect.left + (rect.width / 2);
                              const y = rect.top + (rect.height / 2);
                              const mouseOpts = { bubbles: true, cancelable: true, view: window, clientX: x, clientY: y };
                              
                              targetBtn.dispatchEvent(new PointerEvent('pointerdown', mouseOpts));
                              targetBtn.dispatchEvent(new MouseEvent('mousedown', mouseOpts));
                              targetBtn.dispatchEvent(new PointerEvent('pointerup', mouseOpts));
                              targetBtn.dispatchEvent(new MouseEvent('mouseup', mouseOpts));
                              targetBtn.click(); // à¸—à¹ˆà¸²à¹€à¸šà¸ªà¸´à¸„

                              // ðŸ”¥ à¸—à¹ˆà¸²à¸—à¸µà¹ˆ 3: à¸à¸£à¸°à¸«à¸™à¹ˆà¸³à¸›à¸¸à¹ˆà¸¡ Enter à¸‹à¹‰à¸³
                              targetBtn.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', code: 'Enter', keyCode: 13, bubbles: true }));
                              
                              const editor = document.querySelector('[data-slate-editor="true"]') || document.querySelector('[role="textbox"]');
                              if (editor) {
                                  editor.focus();
                                  editor.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', code: 'Enter', keyCode: 13, which: 13, bubbles: true }));
                              }

                              return resolve({ success: true, msg: 'à¸à¸”à¸›à¸¸à¹ˆà¸¡à¸ªà¹ˆà¸‡à¸„à¸³à¸ªà¸±à¹ˆà¸‡à¸ªà¸³à¹€à¸£à¹‡à¸ˆ!' });
                          }
                          
                          await sleep(1000);
                      }
                      
                      resolve({ success: false, msg: 'à¸«à¸²à¸›à¸¸à¹ˆà¸¡à¸ªà¹ˆà¸‡à¸„à¸³à¸ªà¸±à¹ˆà¸‡à¹„à¸¡à¹ˆà¹€à¸ˆà¸­ à¸«à¸£à¸·à¸­à¸›à¸¸à¹ˆà¸¡à¸¢à¸±à¸‡à¹‚à¸«à¸¥à¸”à¹„à¸¡à¹ˆà¹€à¸ªà¸£à¹‡à¸ˆ' });
                  }
                  
                  trySubmit();
              });
            },
            args: [30000]
          });

          if (!createResult[0]?.result?.success) throw new Error(createResult[0]?.result?.msg);
          videoAddLog(`ðŸ–±ï¸ ${roundLabel} à¸ªà¹ˆà¸‡à¸„à¸³à¸ªà¸±à¹ˆà¸‡à¸ªà¸£à¹‰à¸²à¸‡à¸§à¸´à¸”à¸µà¹‚à¸­à¹€à¸£à¸µà¸¢à¸šà¸£à¹‰à¸­à¸¢`, 'success');
          await videoSleep(3000);

         // ============================================
          // ðŸŸ¢ STEP 5: à¸£à¸­à¸œà¸¥à¸¥à¸±à¸žà¸˜à¹Œ (à¸£à¸­à¸‡à¸£à¸±à¸š Turbo Mode)
          // ============================================
          const checkboxEl = document.getElementById('video-download-count-auto');
          const isDownloadEnabled = checkboxEl ? checkboxEl.checked : true;

       if (!isDownloadEnabled) {
              // ðŸš€ à¸­à¸±à¸›à¹€à¸à¸£à¸” Turbo Mode: à¸ªà¸¸à¹ˆà¸¡à¸£à¸­ 45-60 à¸§à¸´à¸™à¸²à¸—à¸µ (à¹€à¸žà¸·à¹ˆà¸­à¹ƒà¸«à¹‰à¸„à¸¥à¸´à¸›à¹€à¸”à¸´à¸¡à¸£à¸±à¸™à¹„à¸›à¸–à¸¶à¸‡ 70-80% à¸à¹ˆà¸­à¸™à¹€à¸£à¸´à¹ˆà¸¡à¸„à¸´à¸§à¹ƒà¸«à¸¡à¹ˆ)
              const turboWait = Math.floor(Math.random() * 15000) + 45000; 
              videoUpdateStatus(`ðŸš€ ${roundLabel} Turbo Mode: à¸žà¸±à¸à¸£à¸­ ${Math.floor(turboWait/1000)} à¸§à¸´ à¸›à¹‰à¸­à¸‡à¸à¸±à¸™à¹€à¸§à¹‡à¸šà¸„à¹‰à¸²à¸‡...`);
              await videoSleep(turboWait);
              videoAddLog(`â­ï¸ à¸ªà¹ˆà¸‡à¸„à¸´à¸§à¹ƒà¸«à¸¡à¹ˆ (à¸§à¸´à¸”à¸µà¹‚à¸­à¹€à¸”à¸´à¸¡à¸™à¹ˆà¸²à¸ˆà¸°à¹€à¸ªà¸£à¹‡à¸ˆà¹„à¸›à¹à¸¥à¹‰à¸§ 80%)`, 'info');
          } else {
              videoUpdateStatus(`â³ ${roundLabel} à¸£à¸­ AI à¹€à¸£à¸™à¹€à¸”à¸­à¸£à¹Œà¸§à¸´à¸”à¸µà¹‚à¸­ (à¸­à¸²à¸ˆà¹ƒà¸Šà¹‰à¹€à¸§à¸¥à¸² 1-3 à¸™à¸²à¸—à¸µ)...`);
              
              // ðŸ“¸ à¸–à¹ˆà¸²à¸¢ Snapshot à¸ˆà¸”à¸ˆà¸³à¸£à¸«à¸±à¸ªà¸§à¸´à¸”à¸µà¹‚à¸­à¹€à¸à¹ˆà¸²à¸—à¸±à¹‰à¸‡à¸«à¸¡à¸”à¸šà¸™à¸«à¸™à¹‰à¸²à¸ˆà¸­à¹„à¸§à¹‰! (à¸«à¸±à¸§à¹ƒà¸ˆà¸«à¸¥à¸±à¸à¸‚à¸­à¸‡à¸à¸²à¸£à¸à¸±à¸™à¸„à¸¥à¸´à¸›à¹€à¸à¹ˆà¸²)
              const getOldVids = await chrome.scripting.executeScript({
                  target: { tabId: tab.id },
                  func: () => {
                      return Array.from(document.querySelectorAll('video')).map(v => {
                          return v.getAttribute('src') || v.currentSrc || v.src || '';
                      }).filter(src => src !== '');
                  }
              });
              const oldVideoSrcs = getOldVids[0]?.result || [];
              let isFinished = false;

              for(let w=0; w<240; w++) { // à¸£à¸­à¸ªà¸¹à¸‡à¸ªà¸¸à¸” 4 à¸™à¸²à¸—à¸µ
                  if (videoShouldStopAutomation) throw new Error('STOPPED');
                  
                  const checkProgress = await chrome.scripting.executeScript({
                      target: { tabId: tab.id },
                      func: (oldSrcs) => {
                          const currentVids = Array.from(document.querySelectorAll('video'));
                          // à¸™à¸±à¸šà¹€à¸‰à¸žà¸²à¸°à¸§à¸´à¸”à¸µà¹‚à¸­à¸—à¸µà¹ˆà¸¡à¸µà¸¥à¸´à¸‡à¸à¹Œ (src) à¹€à¸›à¹‡à¸™à¸‚à¸­à¸‡à¹ƒà¸«à¸¡à¹ˆ à¸—à¸µà¹ˆà¹„à¸¡à¹ˆà¹€à¸„à¸¢à¸¡à¸µà¹ƒà¸™à¸„à¸§à¸²à¸¡à¸—à¸£à¸‡à¸ˆà¸³
                          let newCount = 0;
                          for (const v of currentVids) {
                              const src = v.getAttribute('src') || v.currentSrc || v.src || '';
                              if (src && !oldSrcs.includes(src)) newCount++;
                          }
                          
                          // ðŸš¨ à¸­à¸±à¸›à¹€à¸à¸£à¸”à¹€à¸£à¸”à¸²à¸£à¹Œ: à¸•à¸£à¸§à¸ˆà¸ˆà¸±à¸š "à¸ªà¸–à¸²à¸™à¸°à¸à¸³à¸¥à¸±à¸‡à¹‚à¸«à¸¥à¸”" à¸—à¸¸à¸à¸£à¸¹à¸›à¹à¸šà¸šà¸šà¸™à¸«à¸™à¹‰à¸²à¹€à¸§à¹‡à¸š (à¸«à¸¥à¸­à¸”à¹‚à¸«à¸¥à¸”, à¹€à¸›à¸­à¸£à¹Œà¹€à¸‹à¹‡à¸™à¸•à¹Œ, à¸›à¸¸à¹ˆà¸¡à¸à¸³à¸¥à¸±à¸‡à¸ªà¸£à¹‰à¸²à¸‡)
                          const hasProgressBar = document.querySelector('[role="progressbar"]') !== null;
                          const hasLoadingText = Array.from(document.querySelectorAll('button, span, div')).some(el => {
                              const txt = (el.textContent || '').trim();
                              return txt.includes('à¸à¸³à¸¥à¸±à¸‡à¸ªà¸£à¹‰à¸²à¸‡') || txt.includes('Generating') || /^(\d+%)|(\d+\s*%)$/.test(txt);
                          });
                          const hasLoadingClass = document.querySelector('[class*="loading"], [class*="progress"]') !== null;
                          
                          const isLoading = hasProgressBar || hasLoadingText || hasLoadingClass;
                          return { newVids: newCount, loading: isLoading };
                      },
                      args: [oldVideoSrcs]
                  });
                  
                  const status = checkProgress[0]?.result;
                  
                  // ðŸŒŸ à¸•à¹‰à¸­à¸‡à¹€à¸ˆà¸­à¸§à¸´à¸”à¸µà¹‚à¸­à¹ƒà¸«à¸¡à¹ˆ à¹à¸¥à¸° "à¸ªà¸–à¸²à¸™à¸°à¸à¸³à¸¥à¸±à¸‡à¹‚à¸«à¸¥à¸”à¸—à¸±à¹‰à¸‡à¸«à¸¡à¸”à¸šà¸™à¸ˆà¸­à¸•à¹‰à¸­à¸‡à¸«à¸²à¸¢à¹„à¸› 100%" à¸–à¸¶à¸‡à¸ˆà¸°à¹„à¸›à¸•à¹ˆà¸­!
                  if (status && status.newVids > 0 && !status.loading) {
                      videoUpdateStatus(`âœ… à¹€à¸ˆà¸­à¸§à¸´à¸”à¸µà¹‚à¸­à¹ƒà¸«à¸¡à¹ˆ ${status.newVids} à¸„à¸¥à¸´à¸›! à¸£à¸­à¸£à¸°à¸šà¸šà¸›à¸£à¸°à¸¡à¸§à¸¥à¸œà¸¥à¹ƒà¸«à¹‰à¸ªà¸¡à¸šà¸¹à¸£à¸“à¹Œà¸­à¸µà¸ 8 à¸§à¸´à¸™à¸²à¸—à¸µ...`);
                      await videoSleep(8000); // â³ à¸«à¸™à¹ˆà¸§à¸‡à¹€à¸§à¸¥à¸² 8 à¸§à¸´ à¹€à¸žà¸·à¹ˆà¸­à¹ƒà¸«à¹‰à¸„à¸¥à¸´à¸›à¸ªà¸¸à¸”à¸—à¹‰à¸²à¸¢à¹‚à¸«à¸¥à¸”à¹€à¸‚à¹‰à¸²à¸—à¸µà¹ˆ
                      isFinished = true; 
                      break;
                  }
                  
                  if (w % 10 === 0) videoUpdateStatus(`â³ à¸à¸³à¸¥à¸±à¸‡à¹€à¸£à¸™à¹€à¸”à¸­à¸£à¹Œ... (${w}s)`);
                  await videoSleep(1000);
              }

              if (isFinished) {
                  videoUpdateStatus(`âœ… à¸ªà¸£à¹‰à¸²à¸‡à¸§à¸´à¸”à¸µà¹‚à¸­à¹€à¸ªà¸£à¹‡à¸ˆà¸ªà¸´à¹‰à¸™!`);
                  videoAddLog(`${roundLabel} à¹€à¸£à¸™à¹€à¸”à¸­à¸£à¹Œà¸§à¸´à¸”à¸µà¹‚à¸­à¸ªà¸³à¹€à¸£à¹‡à¸ˆ`, 'success');

                  // =====================================================================
                  // ðŸ“¥ à¸£à¸°à¸šà¸šà¸”à¸²à¸§à¸™à¹Œà¹‚à¸«à¸¥à¸”à¸§à¸´à¸”à¸µà¹‚à¸­à¸­à¸±à¸•à¹‚à¸™à¸¡à¸±à¸•à¸´ (à¹‚à¸«à¸¥à¸”à¹€à¸‰à¸žà¸²à¸°à¸‚à¸­à¸‡à¹ƒà¸«à¸¡à¹ˆà¸—à¸±à¹‰à¸‡à¸«à¸¡à¸”à¸—à¸µà¹ˆà¸ªà¸£à¹‰à¸²à¸‡à¹€à¸ªà¸£à¹‡à¸ˆ)
                  // =====================================================================
                  videoUpdateStatus(`ðŸ“¥ à¸à¸³à¸¥à¸±à¸‡à¹€à¸•à¸£à¸µà¸¢à¸¡à¸”à¸¹à¸”à¹„à¸Ÿà¸¥à¹Œà¸§à¸´à¸”à¸µà¹‚à¸­à¸—à¸µà¹ˆà¹€à¸žà¸´à¹ˆà¸‡à¸ªà¸£à¹‰à¸²à¸‡à¹€à¸ªà¸£à¹‡à¸ˆ...`);
                  
                  const downloadResult = await chrome.scripting.executeScript({
                      target: { tabId: tab.id },
                      func: (oldSrcs) => {
                          return new Promise(async (resolve) => {
                              try {
                                  const sleep = (ms) => new Promise(r => setTimeout(r, ms));
                                  
                                  // à¸”à¸±à¸™à¸ˆà¸­à¸‚à¸¶à¹‰à¸™à¸šà¸™à¸ªà¸¸à¸”
                                  window.scrollTo({ top: 0, behavior: 'smooth' });
                                  await sleep(1500); 
                                  
                                  // à¸à¸§à¸²à¸”à¸«à¸²à¸§à¸´à¸”à¸µà¹‚à¸­à¹ƒà¸™à¸Ÿà¸µà¸”
                                  const allVideos = Array.from(document.querySelectorAll('video'));
                                  const feedVideos = allVideos.filter(vid => !vid.closest('header, nav, [role="textbox"]'));

                                  // ðŸŒŸ à¸„à¸±à¸”à¸à¸£à¸­à¸‡à¹€à¸­à¸²à¹€à¸‰à¸žà¸²à¸°à¸§à¸´à¸”à¸µà¹‚à¸­ "à¹ƒà¸«à¸¡à¹ˆà¹€à¸­à¸µà¹ˆà¸¢à¸¡" à¸—à¸µà¹ˆà¹„à¸¡à¹ˆà¸¡à¸µà¹ƒà¸™à¸„à¸§à¸²à¸¡à¸—à¸£à¸‡à¸ˆà¸³à¹€à¸à¹ˆà¸²à¹€à¸—à¹ˆà¸²à¸™à¸±à¹‰à¸™!
                                  const newVideos = feedVideos.filter(vid => {
                                      const src = vid.getAttribute('src') || vid.currentSrc || vid.src || '';
                                      return src && !oldSrcs.includes(src);
                                  });

                                  if (newVideos.length === 0) {
                                      return resolve({ success: false, msg: 'à¹„à¸¡à¹ˆà¸žà¸šà¸§à¸´à¸”à¸µà¹‚à¸­à¹ƒà¸«à¸¡à¹ˆ (à¸­à¸²à¸ˆà¸ˆà¸°à¹€à¸£à¸™à¹€à¸”à¸­à¸£à¹Œà¸¥à¹‰à¸¡à¹€à¸«à¸¥à¸§)' });
                                  }

                                  // à¹€à¸£à¸µà¸¢à¸‡à¸ˆà¸²à¸à¸‹à¹‰à¸²à¸¢à¹„à¸›à¸‚à¸§à¸²
                                  newVideos.sort((a, b) => a.getBoundingClientRect().left - b.getBoundingClientRect().left);

                                  // ðŸ”¥ à¹‚à¸«à¸¥à¸”à¸—à¸¸à¸à¸„à¸¥à¸´à¸›à¸—à¸µà¹ˆà¹€à¸›à¹‡à¸™à¸‚à¸­à¸‡à¹ƒà¸«à¸¡à¹ˆ (à¸ªà¸¹à¸‡à¸ªà¸¸à¸” 4 à¸„à¸¥à¸´à¸›à¹€à¸œà¸·à¹ˆà¸­à¹„à¸§à¹‰)
                                  const targetVideos = newVideos.slice(0, 4);
                                  let downloadedCount = 0;

                                  for (let i = 0; i < targetVideos.length; i++) {
                                      const targetVideo = targetVideos[i];
                                      
                                      let vidSrc = targetVideo.getAttribute('src') || targetVideo.currentSrc || targetVideo.src;

                                      if (vidSrc) {
                                          const absoluteUrl = new URL(vidSrc, window.location.origin).href;
                                          
                                          const response = await fetch(absoluteUrl);
                                          if (!response.ok) continue;
                                          
                                          const blob = await response.blob(); 
                                          const blobUrl = window.URL.createObjectURL(blob);

                                          const a = document.createElement('a');
                                          a.style.display = 'none';
                                          a.href = blobUrl;
                                          a.download = `Banana_Video_Auto_${Date.now()}_${i+1}.mp4`; 
                                          
                                          document.body.appendChild(a);
                                          a.click();
                                          await sleep(500);

                                          document.body.removeChild(a);
                                          window.URL.revokeObjectURL(blobUrl);

                                          downloadedCount++;
                                          await sleep(1500); // â³ à¸£à¸­à¹„à¸Ÿà¸¥à¹Œà¹‚à¸«à¸¥à¸”à¹€à¸‚à¹‰à¸²à¹€à¸„à¸£à¸·à¹ˆà¸­à¸‡
                                      }
                                  }
                                  
                                  if (downloadedCount > 0) {
                                      resolve({ success: true, msg: `à¸”à¸¹à¸”à¹„à¸Ÿà¸¥à¹Œà¸§à¸´à¸”à¸µà¹‚à¸­à¹ƒà¸«à¸¡à¹ˆà¸ªà¸³à¹€à¸£à¹‡à¸ˆ ${downloadedCount} à¸„à¸¥à¸´à¸›!` });
                                  } else {
                                      resolve({ success: false, msg: `à¸«à¸²à¸¥à¸´à¸‡à¸à¹Œà¸‚à¸­à¸‡à¸§à¸´à¸”à¸µà¹‚à¸­à¹ƒà¸«à¸¡à¹ˆà¹„à¸¡à¹ˆà¹€à¸ˆà¸­ (à¸­à¸²à¸ˆà¸ˆà¸°à¹‚à¸«à¸¥à¸”à¹„à¸¡à¹ˆà¸‚à¸¶à¹‰à¸™)` });
                                  }
                              } catch (err) {
                                  resolve({ success: false, msg: 'Error: ' + err.message });
                              }
                          });
                      },
                      args: [ oldVideoSrcs ]
                  });

                  if (downloadResult[0]?.result?.success) {
                      videoAddLog(`ðŸ“¥ ${downloadResult[0].result.msg}`, 'success');
                  } else {
                      videoAddLog(`âš ï¸ à¹‚à¸«à¸¥à¸”à¸­à¸±à¸•à¹‚à¸™à¸¡à¸±à¸•à¸´à¹„à¸¡à¹ˆà¸ªà¸³à¹€à¸£à¹‡à¸ˆ: ${downloadResult[0]?.result?.msg}`, 'warning');
                  }

              } else {
                  videoUpdateStatus(`âš ï¸ à¸«à¸¡à¸”à¹€à¸§à¸¥à¸²à¸£à¸­à¸§à¸´à¸”à¸µà¹‚à¸­ (à¸§à¸´à¸”à¸µà¹‚à¸­à¸­à¸²à¸ˆà¸ˆà¸°à¸¢à¸±à¸‡à¹€à¸£à¸™à¹€à¸”à¸­à¸£à¹Œà¹„à¸¡à¹ˆà¹€à¸ªà¸£à¹‡à¸ˆ)`);
              }
          }

          completedRounds++;
          
          // ðŸŸ¢ [à¹‚à¸„à¹‰à¸”à¸—à¸µà¹ˆà¹€à¸žà¸´à¹ˆà¸¡à¹ƒà¸«à¸¡à¹ˆ] COOLDOWN: à¸žà¸±à¸à¸«à¸²à¸¢à¹ƒà¸ˆà¸à¹ˆà¸­à¸™à¹€à¸£à¸´à¹ˆà¸¡à¸§à¸´à¸”à¸µà¹‚à¸­à¸„à¸¥à¸´à¸›à¸•à¹ˆà¸­à¹„à¸› 
          // (à¸§à¸´à¸”à¸µà¹‚à¸­à¸à¸´à¸™à¸—à¸£à¸±à¸žà¸¢à¸²à¸à¸£à¸«à¸™à¸±à¸ à¸•à¹‰à¸­à¸‡à¸žà¸±à¸à¸™à¸²à¸™à¸à¸§à¹ˆà¸²à¸£à¸¹à¸›à¸™à¸´à¸”à¸™à¸¶à¸‡ à¸ªà¸¸à¹ˆà¸¡à¸žà¸±à¸ 7-10 à¸§à¸´à¸™à¸²à¸—à¸µ)
          if (currentRound < totalRounds) {
              const cooldownTime = Math.floor(Math.random() * 3000) + 7000; 
              videoUpdateStatus(`â³ à¸žà¸±à¸à¸£à¸°à¸šà¸š ${cooldownTime/1000} à¸§à¸´à¸™à¸²à¸—à¸µà¸à¹ˆà¸­à¸™à¹€à¸£à¸´à¹ˆà¸¡à¸„à¸¥à¸´à¸›à¸–à¸±à¸”à¹„à¸›...`);
              await videoSleep(cooldownTime);
          }
		  
        } catch (roundError) {
            const errMsg = roundError.message || "";
            if (errMsg === 'STOPPED') {
                videoShouldStopAutomation = true;
                videoIsAutomationRunning = false;
                throw new Error('STOPPED');
            }
            videoUpdateStatus(`âš ï¸ à¸žà¸šà¸›à¸±à¸à¸«à¸²: ${errMsg} -> à¸‚à¹‰à¸²à¸¡à¹„à¸›à¸£à¸­à¸šà¸–à¸±à¸”à¹„à¸›`);
            await videoSleep(2000);
        }
      }
    }
    
    videoUpdateStatus(`ðŸŽ‰ à¸—à¸³à¸‡à¸²à¸™à¹€à¸ªà¸£à¹‡à¸ˆà¸ªà¸´à¹‰à¸™à¸—à¸±à¹‰à¸‡à¸«à¸¡à¸”!`);
    showToast('Mission Complete!', 'success');

  } catch (error) {
    if (error.message !== 'STOPPED') videoAddLog(`âŒ Error: ${error.message}`, 'error');
  } finally {
    videoIsAutomationRunning = false;
    videoShouldStopAutomation = false;
    videoBtnAutomation.disabled = false;
    videoBtnAutomation.innerHTML = '<span>START VIDEO</span>'; 
    videoBtnStop.style.display = 'none';
    try { await toggleWebPageLock(false); } catch (e) {}
  }
}

// Video Prompt & Play Studio: Call Gemini API with retry for overloaded errors


// ============================================
// BANANA Prompt & Play Studio MODULE
// ============================================

// DOM Elements (Banana Tab - prefix: banana-)
const bananaUploadZone = document.getElementById('banana-upload-zone');
const bananaFileInput = document.getElementById('banana-file-input');
const bananaImageCount = document.getElementById('banana-image-count');
const bananaClearImagesBtn = document.getElementById('banana-clear-images');
const bananaStatusText = document.getElementById('banana-status-text');
const bananaBtnAutomation = document.getElementById('banana-btn-automation');
const bananaToVideoCheckbox = document.getElementById('banana-to-video-checkbox');
const bananaToVideoStyleSelect = document.getElementById('banana-to-video-style-select');
const bananaToVideoSummary = document.getElementById('banana-to-video-summary');
const bananaDownloadCount = document.getElementById('banana-download-count');
const bananaBtnStop = document.getElementById('banana-btn-stop');
const bananaPromptStatus = document.getElementById('banana-prompt-status');
const bananaRoundCountSelect = document.getElementById('banana-round-count');
const bananaRoundDropdown = document.getElementById('banana-round-dropdown');
const bananaCustomRoundInput = document.getElementById('banana-custom-round-input');
const bananaRoundInfo = document.getElementById('banana-round-info');
const bananaProductNameInput = document.getElementById('banana-product-name');
const bananaStyleSelect = document.getElementById('banana-style-select');
const bananaRandomStyleCheckbox = document.getElementById('banana-random-style-checkbox');
const bananaBtnGeneratePrompt = document.getElementById('banana-btn-generate-prompt');
const bananaPromptResultContainer = document.getElementById('banana-prompt-result-container');
const bananaPromptResult = document.getElementById('banana-prompt-result');
const bananaBtnCopyPrompt = document.getElementById('banana-btn-copy-prompt');
const bananaLogContainer = document.getElementById('banana-log-container');
const bananaLogClearBtn = document.getElementById('banana-log-clear');

// [à¸ªà¹ˆà¸§à¸™à¹€à¸žà¸´à¹ˆà¸¡à¹ƒà¸«à¸¡à¹ˆ] à¸•à¸±à¸§à¹à¸›à¸£à¸ªà¸³à¸«à¸£à¸±à¸šà¹€à¸¥à¸·à¸­à¸à¸‰à¸²à¸à¸«à¸¥à¸±à¸‡ (Banana)
const bananaBgSelect = document.getElementById('banana-bg-select');
const bananaRandomBgCheckbox = document.getElementById('banana-random-bg-checkbox');

// Store uploaded images (Banana)
let bananaUploadedImages = [];
let bananaCurrentImageIndex = 0;
let modelUploadedImages = []; // à¸•à¸±à¸§à¹à¸›à¸£à¹€à¸à¹‡à¸šà¸£à¸¹à¸›à¸™à¸²à¸‡à¹à¸šà¸š
let bananaIsAutomationRunning = false;
let bananaShouldStopAutomation = false;
let bananaStatusTimeoutId = null;
let bananaLogs = [];

// Banana Prompt & Play Studio: Setup upload zone events
function bananaSetupUploadZone() {
  bananaUploadZone.addEventListener('click', () => {
    bananaFileInput.click();
  });

  bananaFileInput.addEventListener('change', (e) => {
    bananaHandleFiles(e.target.files);
  });

  bananaUploadZone.addEventListener('dragover', (e) => {
    e.preventDefault();
    bananaUploadZone.classList.add('dragover');
  });

  bananaUploadZone.addEventListener('dragleave', (e) => {
    e.preventDefault();
    bananaUploadZone.classList.remove('dragover');
  });

  bananaUploadZone.addEventListener('drop', (e) => {
    e.preventDefault();
    bananaUploadZone.classList.remove('dragover');
    bananaHandleFiles(e.dataTransfer.files);
  });
}

// ============================================
// IMAGE MANAGEMENT (à¹à¸à¹‰à¹„à¸‚: à¹à¸ªà¸”à¸‡à¸£à¸¹à¸› + à¸¥à¸šà¸—à¸µà¸¥à¸°à¸£à¸¹à¸›)
// ============================================
const bananaPreviewContainer = document.getElementById('banana-preview-container');

// à¸Ÿà¸±à¸‡à¸à¹Œà¸Šà¸±à¸™à¸­à¸±à¸›à¹€à¸”à¸•à¸«à¸™à¹‰à¸²à¸ˆà¸­ (à¹€à¸£à¸µà¸¢à¸à¹ƒà¸Šà¹‰à¹€à¸¡à¸·à¹ˆà¸­à¸¡à¸µà¸à¸²à¸£à¹€à¸žà¸´à¹ˆà¸¡à¸«à¸£à¸·à¸­à¸¥à¸šà¸£à¸¹à¸›)
function bananaUpdateImageCount() {
  // 1. à¸­à¸±à¸›à¹€à¸”à¸•à¸•à¸±à¸§à¹€à¸¥à¸‚
  bananaImageCount.textContent = bananaUploadedImages.length;

  // 2. à¸ˆà¸±à¸”à¸à¸²à¸£à¸›à¸¸à¹ˆà¸¡ Clear All
  if (bananaUploadedImages.length > 0) {
    bananaClearImagesBtn.style.display = 'flex';
  } else {
    bananaClearImagesBtn.style.display = 'none';
  }

  bananaUpdateRoundInfo(); // à¸­à¸±à¸›à¹€à¸”à¸•à¸ˆà¸³à¸™à¸§à¸™à¸£à¸­à¸š

  // 3. à¸ªà¸£à¹‰à¸²à¸‡à¸£à¸¹à¸›à¸•à¸±à¸§à¸­à¸¢à¹ˆà¸²à¸‡ (Render Previews)
  renderBananaPreviews();
}

// à¸Ÿà¸±à¸‡à¸à¹Œà¸Šà¸±à¸™à¸§à¸²à¸”à¸£à¸¹à¸›à¸•à¸±à¸§à¸­à¸¢à¹ˆà¸²à¸‡
function renderBananaPreviews() {
  if (!bananaPreviewContainer) return;
  bananaPreviewContainer.innerHTML = ''; // à¹€à¸„à¸¥à¸µà¸¢à¸£à¹Œà¸‚à¸­à¸‡à¹€à¸à¹ˆà¸²

  bananaUploadedImages.forEach((img, index) => {
    const item = document.createElement('div');
    item.className = 'preview-item';

    // à¸ªà¸£à¹‰à¸²à¸‡à¸£à¸¹à¸›à¸ à¸²à¸ž
    const imgEl = document.createElement('img');
    imgEl.src = img.dataUrl;
    imgEl.title = img.name;

    // à¸ªà¸£à¹‰à¸²à¸‡à¸›à¸¸à¹ˆà¸¡à¸¥à¸š (X)
    const delBtn = document.createElement('button');
    delBtn.className = 'preview-remove-btn';
    delBtn.innerHTML = 'âœ•';
    delBtn.onclick = () => bananaRemoveOneImage(index); // à¹€à¸£à¸µà¸¢à¸à¸Ÿà¸±à¸‡à¸à¹Œà¸Šà¸±à¸™à¸¥à¸š

    item.appendChild(imgEl);
    item.appendChild(delBtn);
    bananaPreviewContainer.appendChild(item);
  });
}

// à¸Ÿà¸±à¸‡à¸à¹Œà¸Šà¸±à¸™à¸¥à¸šà¸—à¸µà¸¥à¸°à¸£à¸¹à¸›
function bananaRemoveOneImage(index) {
  // à¸¥à¸šà¸­à¸­à¸à¸ˆà¸²à¸ Array à¸•à¸²à¸¡à¸•à¸³à¹à¸«à¸™à¹ˆà¸‡ index
  bananaUploadedImages.splice(index, 1);
  // à¸­à¸±à¸›à¹€à¸”à¸•à¸«à¸™à¹‰à¸²à¸ˆà¸­à¹ƒà¸«à¸¡à¹ˆ
  bananaUpdateImageCount();
}

// à¸Ÿà¸±à¸‡à¸à¹Œà¸Šà¸±à¸™à¸ˆà¸±à¸”à¸à¸²à¸£à¹„à¸Ÿà¸¥à¹Œà¸—à¸µà¹ˆà¸­à¸±à¸›à¹‚à¸«à¸¥à¸”
function bananaHandleFiles(files) {
  const imageFiles = Array.from(files).filter(file => file.type.startsWith('image/'));

  imageFiles.forEach(file => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const imageData = {
        id: Date.now() + Math.random(),
        name: file.name,
        size: file.size,
        type: file.type,
        dataUrl: e.target.result
      };
      bananaUploadedImages.push(imageData);
      // à¹€à¸£à¸µà¸¢à¸à¸Ÿà¸±à¸‡à¸à¹Œà¸Šà¸±à¸™à¸­à¸±à¸›à¹€à¸”à¸• (à¸‹à¸¶à¹ˆà¸‡à¸ˆà¸°à¹„à¸›à¸§à¸²à¸”à¸£à¸¹à¸›à¹ƒà¸«à¹‰à¹€à¸­à¸‡)
      bananaUpdateImageCount();
    };
    reader.readAsDataURL(file);
  });

  bananaFileInput.value = '';
}

// à¸Ÿà¸±à¸‡à¸à¹Œà¸Šà¸±à¸™à¸¥à¸šà¸£à¸¹à¸›à¸—à¸±à¹‰à¸‡à¸«à¸¡à¸”
function bananaClearAllImages() {
  bananaUploadedImages = [];
  bananaUpdateImageCount(); // à¸«à¸™à¹‰à¸²à¸ˆà¸­à¸ˆà¸°à¹€à¸„à¸¥à¸µà¸¢à¸£à¹Œà¸£à¸¹à¸›à¸­à¸­à¸à¸«à¸¡à¸”à¹€à¸­à¸‡
  bananaUpdateStatus('All images cleared');
}


// ==========================================
// MODEL UPLOAD FUNCTIONS (à¹€à¸žà¸´à¹ˆà¸¡à¹ƒà¸«à¸¡à¹ˆ)
// ==========================================
const modelUploadZone = document.getElementById('model-upload-zone');
const modelFileInput = document.getElementById('model-file-input');
const modelImageCount = document.getElementById('model-image-count');
const modelCounterDiv = document.getElementById('model-image-counter');
const modelClearBtn = document.getElementById('model-clear-images');

function modelSetupUploadZone() {
  if(!modelUploadZone) return;

  modelUploadZone.addEventListener('click', () => modelFileInput.click());

  modelFileInput.addEventListener('change', (e) => {
    modelHandleFiles(e.target.files);
  });

  // Drag & Drop Effect
  modelUploadZone.addEventListener('dragover', (e) => {
    e.preventDefault();
    modelUploadZone.style.borderColor = '#e65100';
    modelUploadZone.style.backgroundColor = '#fff3e0';
  });

  modelUploadZone.addEventListener('dragleave', (e) => {
    e.preventDefault();
    modelUploadZone.style.borderColor = '#ff9800';
    modelUploadZone.style.backgroundColor = '';
  });

  modelUploadZone.addEventListener('drop', (e) => {
    e.preventDefault();
    modelUploadZone.style.borderColor = '#ff9800';
    modelUploadZone.style.backgroundColor = '';
    modelHandleFiles(e.dataTransfer.files);
  });
  
  if(modelClearBtn) {
      modelClearBtn.addEventListener('click', () => {
          modelUploadedImages = [];
          modelUpdateUI();
      });
  }
}

function modelHandleFiles(files) {
  const imageFiles = Array.from(files).filter(file => file.type.startsWith('image/'));
  if(imageFiles.length > 0) {
      const file = imageFiles[0]; // à¸£à¸±à¸šà¹à¸„à¹ˆà¸£à¸¹à¸›à¹€à¸”à¸µà¸¢à¸§à¸¥à¹ˆà¸²à¸ªà¸¸à¸”
      const reader = new FileReader();
      reader.onload = (e) => {
        modelUploadedImages = [{
          name: file.name,
          type: file.type,
          dataUrl: e.target.result
        }];
        modelUpdateUI();
      };
      reader.readAsDataURL(file);
  }
  modelFileInput.value = '';
}


// ============================================
// MODEL PREVIEW SYSTEM (à¸£à¸°à¸šà¸šà¹à¸ªà¸”à¸‡à¸£à¸¹à¸›à¸™à¸²à¸‡à¹à¸šà¸š)
// ============================================
const modelPreviewContainer = document.getElementById('model-preview-container');



// ============================================
// [UPDATED] MODEL UPDATE UI: à¸£à¸­à¸‡à¸£à¸±à¸šà¸à¸²à¸£à¸¥à¹‡à¸­à¸„à¸—à¸±à¹‰à¸‡ Human à¹à¸¥à¸° Mascot
// ============================================
function modelUpdateUI() {
    const container = document.getElementById('model-preview-container');
    const countBadge = document.getElementById('model-image-count');
    const uploadText = document.querySelector('#model-upload-zone .upload-text');
    const clearBtn = document.getElementById('model-clear-images');

    if (!container) return;
    container.innerHTML = ''; 

    if (modelUploadedImages.length > 0) {
        if(countBadge) { countBadge.textContent = '1'; countBadge.style.display = 'inline-block'; }
        if(uploadText) uploadText.textContent = "à¹€à¸›à¸¥à¸µà¹ˆà¸¢à¸™à¸£à¸¹à¸›à¸™à¸²à¸‡à¹à¸šà¸š";
        if(clearBtn) clearBtn.classList.remove('hidden');

        const item = document.createElement('div');
        item.className = 'preview-item'; 

        const img = document.createElement('img');
        img.src = modelUploadedImages[0].dataUrl;

        const delBtn = document.createElement('button');
        delBtn.className = 'preview-remove-btn';
        delBtn.innerHTML = 'âœ•';
        delBtn.onclick = () => {
            modelUploadedImages = [];
            modelUpdateUI();
        };

        item.appendChild(img);
        item.appendChild(delBtn);
        container.appendChild(item);

    } else {
        if(countBadge) countBadge.style.display = 'none';
        if(uploadText) uploadText.textContent = "à¹€à¸žà¸´à¹ˆà¸¡à¸£à¸¹à¸›à¸™à¸²à¸‡à¹à¸šà¸š (Ref)";
        if(clearBtn) clearBtn.classList.add('hidden');
    }

    // -------------------------------------------------------
    // [NEW] Logic à¸¥à¹‡à¸­à¸„à¸ªà¹ˆà¸§à¸™à¹€à¸¥à¸·à¸­à¸à¸•à¸±à¸§à¸¥à¸°à¸„à¸£ (à¸—à¸±à¹‰à¸‡ 2 à¹‚à¸«à¸¡à¸”)
    // -------------------------------------------------------
    const hasImage = modelUploadedImages.length > 0;
    const currentMode = document.getElementById('current-app-mode')?.value || 'human';

    // 1. à¸¥à¹‡à¸­à¸„à¸à¸±à¹ˆà¸‡ Human
    const presetGroup = document.getElementById('char-group-preset');
    const customGroup = document.getElementById('char-group-custom');
    [presetGroup, customGroup].forEach((group) => {
        if (!group) return;
        if (hasImage && currentMode === 'human') {
            group.classList.add('disabled-section');
            group.classList.add('model-ref-locked');
        } else {
            group.classList.remove('disabled-section');
            group.classList.remove('model-ref-locked');
        }
    });

    // 2. à¸¥à¹‡à¸­à¸„à¸à¸±à¹ˆà¸‡ Mascot (Grid à¹€à¸¥à¸·à¸­à¸à¸•à¸±à¸§à¸¥à¸°à¸„à¸£)
    const mascotGrid = document.getElementById('mascot-grid');
    const mascotCustomInput = document.getElementById('mascot-custom-input');
    
    if (mascotGrid) {
        if (hasImage && currentMode === 'mascot') {
            mascotGrid.classList.add('disabled-section');
            if(mascotCustomInput) mascotCustomInput.disabled = true;
            bananaAddLog('ðŸ“¸ Mascot Mode: à¸•à¸£à¸§à¸ˆà¸žà¸šà¸£à¸¹à¸›à¸ à¸²à¸ž Ref - à¸›à¸´à¸”à¸à¸²à¸£à¹€à¸¥à¸·à¸­à¸à¸•à¸±à¸§à¸¥à¸°à¸„à¸£à¸Šà¸±à¹ˆà¸§à¸„à¸£à¸²à¸§', 'info');
        } else {
            mascotGrid.classList.remove('disabled-section');
            if(mascotCustomInput) mascotCustomInput.disabled = false;
        }
    }
}




// Banana Prompt & Play Studio: Update round info display
function bananaUpdateRoundInfo() {
  const select = document.getElementById('banana-round-count');
  const dropdown = document.getElementById('banana-round-dropdown');
  const customInput = document.getElementById('banana-custom-round-input');
  const roundInfo = document.getElementById('banana-round-info');

  if (!select) return;

  if (dropdown && dropdown.value !== select.value) {
    dropdown.value = select.value;
  }

  const imageTotal = bananaUploadedImages.length;
  const selectValue = select.value;

  if (selectValue === 'custom') {
    if (customInput) customInput.style.display = 'block';
  } else {
    if (customInput) customInput.style.display = 'none';
  }

  // à¹à¸à¹‰à¹„à¸‚: à¹‚à¸Šà¸§à¹Œ Text à¹ƒà¸«à¹‰à¸œà¸¹à¹‰à¹ƒà¸Šà¹‰à¸—à¸£à¸²à¸šà¸„à¸´à¸§à¸—à¸µà¹ˆà¸£à¸°à¸šà¸šà¸ˆà¸°à¸£à¸±à¸™
  if (roundInfo) {
      roundInfo.style.display = 'block';
      const roundsPerImage = bananaGetRoundsPerImage();
      const totalRounds = imageTotal * roundsPerImage;

      if (imageTotal === 0) {
        roundInfo.textContent = `ตั้งค่า: ${roundsPerImage} รอบต่อภาพ`;
      } else {
        roundInfo.textContent = `คิวรวม: ${imageTotal} ภาพ × ${roundsPerImage} รอบ = รันทั้งหมด ${totalRounds} รูป`;
      }
  }
}

// Banana Prompt & Play Studio: Get rounds per image
function bananaGetRoundsPerImage() {
  const select = document.getElementById('banana-round-count');
  const customInput = document.getElementById('banana-custom-round-input');

  if (!select) return 1;
  const isBasicPlan = window.FeatureGate && FeatureGate.getPlan && FeatureGate.getPlan() === 'basic';

  if (select.value === 'custom' || (customInput && customInput.style.display === 'block')) {
      if (customInput) {
          const val = parseInt(customInput.value);
          // à¹à¸à¹‰à¹„à¸‚: à¸”à¸±à¸à¸ˆà¸±à¸šà¸„à¸§à¸²à¸¡à¸›à¸¥à¸­à¸”à¸ à¸±à¸¢à¸‚à¸­à¸‡à¸‚à¹‰à¸­à¸¡à¸¹à¸¥
          const safeVal = (!isNaN(val) && val > 0) ? val : 1;
          return isBasicPlan ? Math.min(safeVal, 3) : safeVal;
      }
  }

  const rounds = parseInt(select.value);
  const safeRounds = (!isNaN(rounds) && rounds > 0) ? rounds : 1;
  return isBasicPlan ? Math.min(safeRounds, 3) : safeRounds;
}

function bananaSyncRoundDropdown() {
  const hiddenSelect = document.getElementById('banana-round-count');
  const dropdown = document.getElementById('banana-round-dropdown');
  const segmentRoot = document.getElementById('seg-rounds');
  if (!hiddenSelect || !dropdown) return;

  const selectedValue = dropdown.value;
  const isBasicPlan = window.FeatureGate && FeatureGate.getPlan && FeatureGate.getPlan() === 'basic';
  if (isBasicPlan && (selectedValue === '5' || selectedValue === 'custom')) {
    dropdown.value = '3';
    hiddenSelect.value = '3';
    showToast('Basic à¸ˆà¸³à¸à¸±à¸”à¸£à¸­à¸šà¸ªà¸¹à¸‡à¸ªà¸¸à¸” 3 à¸£à¸­à¸š', 'warning');
  } else {
    hiddenSelect.value = selectedValue;
  }

  if (segmentRoot) {
    segmentRoot.querySelectorAll('.segment-opt').forEach((button) => {
      button.classList.toggle('active', button.dataset.value === hiddenSelect.value);
    });
  }

  bananaUpdateRoundInfo();
  bananaUpdateToVideoSummary();
}

// Banana Prompt & Play Studio: Add log entry
function bananaAddLog(message, type = 'info') {
  const timestamp = new Date().toLocaleTimeString('th-TH');
  const logEntry = {
    time: timestamp,
    message: message,
    type: type
  };
  
  bananaLogs.push(logEntry);
  
  // Keep only last 500 logs
  if (bananaLogs.length > 500) {
    bananaLogs = bananaLogs.slice(-500);
  }
  
  // Update UI
  bananaUpdateLogDisplay();
  
  // Also log to console
  const consoleMethod = type === 'error' ? 'error' : type === 'warning' ? 'warn' : 'log';
  console[consoleMethod](`[${timestamp}] ${message}`);
}

// Banana Prompt & Play Studio: Update log display
function bananaUpdateLogDisplay() {
  if (!bananaLogContainer) return;
  
  if (bananaLogs.length === 0) {
    bananaLogContainer.innerHTML = '<div class="log-empty">à¸¢à¸±à¸‡à¹„à¸¡à¹ˆà¸¡à¸µ log</div>';
    return;
  }
  
  const logHTML = bananaLogs.map(log => {
    let typeClass = 'log-entry-info';
    if (log.type === 'error') typeClass = 'log-entry-error';
    else if (log.type === 'success') typeClass = 'log-entry-success';
    else if (log.type === 'warning') typeClass = 'log-entry-warning';
    else if (log.type === 'step') typeClass = 'log-entry-step';
    
    return `<div class="log-entry ${typeClass}">
      <span class="log-entry-time">[${log.time}]</span>
      <span class="log-entry-message">${log.message}</span>
    </div>`;
  }).join('');
  
  bananaLogContainer.innerHTML = logHTML;
  
  // Auto scroll to bottom
  bananaLogContainer.scrollTop = bananaLogContainer.scrollHeight;
}

// Banana Prompt & Play Studio: Clear logs
function bananaClearLogs() {
  bananaLogs = [];
  bananaUpdateLogDisplay();
}

// Banana Prompt & Play Studio: Update status
function bananaUpdateStatus(message) {
  if (bananaStatusTimeoutId) {
    clearTimeout(bananaStatusTimeoutId);
    bananaStatusTimeoutId = null;
  }

  bananaStatusText.textContent = message;
  const bananaProgress = inferRunProgress(message, bananaIsAutomationRunning);
  updateRunProgress('banana', bananaProgress.percent, bananaProgress.step);
  
  // Add to log
  bananaAddLog(message, 'info');

  if (!bananaIsAutomationRunning) {
    bananaStatusTimeoutId = setTimeout(() => {
      bananaStatusText.textContent = 'Ready to use';
      updateRunProgress('banana', 0, 'assets');
    }, 3000);
  }
}

// Banana Prompt & Play Studio: Get Style Prompts


// Banana Prompt & Play Studio: Get Random Style ID


// Banana Prompt & Play Studio: Get UGC System Prompt (Image Prompt)


// Banana Prompt & Play Studio: Call Gemini API with retry for overloaded errors


// Banana Prompt & Play Studio: Call Gemini API


// Banana Prompt & Play Studio: Handle Copy Prompt
function bananaHandleCopyPrompt() {
  const text = bananaPromptResult.textContent;
  if (!text || text.includes('à¸à¸³à¸¥à¸±à¸‡à¸§à¸´à¹€à¸„à¸£à¸²à¸°à¸«à¹Œ')) {
    showToast('à¹„à¸¡à¹ˆà¸¡à¸µ Prompt à¹ƒà¸«à¹‰à¸„à¸±à¸”à¸¥à¸­à¸', 'error');
    return;
  }

  navigator.clipboard.writeText(text).then(() => {
    showToast('à¸„à¸±à¸”à¸¥à¸­à¸ Prompt à¹à¸¥à¹‰à¸§!', 'success');
    bananaBtnCopyPrompt.textContent = 'âœ…';
    setTimeout(() => {
      bananaBtnCopyPrompt.textContent = 'ðŸ“‹';
    }, 2000);
  }).catch(() => {
    showToast('à¹„à¸¡à¹ˆà¸ªà¸²à¸¡à¸²à¸£à¸–à¸„à¸±à¸”à¸¥à¸­à¸à¹„à¸”à¹‰', 'error');
  });
}

// Banana Prompt & Play Studio: Sleep helper (à¸‰à¸šà¸±à¸šà¹à¸à¹‰: à¸•à¸·à¹ˆà¸™à¸—à¸±à¸™à¸—à¸µà¸—à¸µà¹ˆà¸à¸” Stop)
function bananaSleep(ms) {
  return new Promise((resolve, reject) => {
    if (bananaShouldStopAutomation) {
        return reject(new Error('STOPPED'));
    }

    const checkInterval = 100;
    let elapsed = 0;

    const intervalId = setInterval(() => {
      if (bananaShouldStopAutomation) {
        clearInterval(intervalId);
        reject(new Error('STOPPED'));
      } else if (elapsed >= ms) {
        clearInterval(intervalId);
        resolve();
      }
      elapsed += checkInterval;
    }, checkInterval);
  });
}

// Banana Prompt & Play Studio: Stop automation
function bananaStopAutomation() {
  if (bananaIsAutomationRunning) {
    bananaShouldStopAutomation = true;
    bananaUpdateStatus('à¸à¸³à¸¥à¸±à¸‡à¸«à¸¢à¸¸à¸”...');
    showToast('à¸à¸³à¸¥à¸±à¸‡à¸«à¸¢à¸¸à¸” Automation...', 'error');
  }
}

// Banana Prompt & Play Studio: Get generated images from page (à¹à¸à¹‰à¹„à¸‚: à¸”à¸¶à¸‡à¸—à¸±à¹‰à¸‡à¸«à¸¡à¸” + Scroll)
async function bananaGetGeneratedImages() {
  try {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    
    const result = await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: async () => { // ðŸŸ¢ à¹€à¸žà¸´à¹ˆà¸¡ async à¹€à¸žà¸·à¹ˆà¸­à¸£à¸­à¸‡à¸£à¸±à¸šà¸à¸²à¸£à¸£à¸­
        
        // 1. à¸ªà¸±à¹ˆà¸‡ Scroll à¸¥à¸‡à¸¥à¹ˆà¸²à¸‡à¸ªà¸¸à¸”à¹€à¸žà¸·à¹ˆà¸­à¹ƒà¸«à¹‰à¸£à¸¹à¸› Lazy Load à¹‚à¸«à¸¥à¸”à¸‚à¸¶à¹‰à¸™à¸¡à¸²à¹ƒà¸«à¹‰à¸„à¸£à¸š
        window.scrollTo(0, document.body.scrollHeight);
        await new Promise(r => setTimeout(r, 1000)); // à¸£à¸­ 1 à¸§à¸´à¸™à¸²à¸—à¸µà¹ƒà¸«à¹‰à¹‚à¸«à¸¥à¸”

        const images = [];
        
        // Method: à¸à¸§à¸²à¸”à¸«à¸²à¸—à¸¸à¸à¸£à¸¹à¸›à¹ƒà¸™à¸«à¸™à¹‰à¸²à¸ˆà¸­à¸—à¸µà¹ˆà¸¡à¸µà¸‚à¸™à¸²à¸”à¹ƒà¸«à¸à¹ˆà¸žà¸­
        const allImgs = document.querySelectorAll('img');
        for (const img of allImgs) {
          const rect = img.getBoundingClientRect();
          // à¹€à¸‡à¸·à¹ˆà¸­à¸™à¹„à¸‚: à¸•à¹‰à¸­à¸‡à¹€à¸›à¹‡à¸™à¸£à¸¹à¸›à¸—à¸µà¹ˆà¸‚à¸™à¸²à¸”à¹ƒà¸«à¸à¹ˆà¸à¸§à¹ˆà¸² 200x200 (à¸à¸±à¸™à¸žà¸§à¸à¹„à¸­à¸„à¸­à¸™/à¹‚à¸¥à¹‚à¸à¹‰)
          if (rect.width >= 200 && rect.height >= 200) {
            const src = img.src || img.getAttribute('src') || img.getAttribute('data-src');
            
            // à¸à¸£à¸­à¸‡à¸£à¸¹à¸›à¸—à¸µà¹ˆà¹„à¸¡à¹ˆà¹ƒà¸Šà¹ˆà¸œà¸¥à¸¥à¸±à¸žà¸˜à¹Œà¸­à¸­à¸
            if (src && !src.includes('icon') && !src.includes('avatar') && !src.includes('logo') && !src.includes('profile')) {
              images.push({
                src: src,
                width: rect.width,
                height: rect.height
              });
            }
          }
        }
        
        // à¸¥à¸šà¸£à¸¹à¸›à¸‹à¹‰à¸³ (Remove duplicates)
        const uniqueImages = [];
        const seenSrcs = new Set();
        for (const img of images) {
          if (!seenSrcs.has(img.src)) {
            seenSrcs.add(img.src);
            uniqueImages.push(img);
          }
        }
        
        // ðŸŸ¢ à¸ªà¹ˆà¸‡à¸à¸¥à¸±à¸šà¸—à¸±à¹‰à¸‡à¸«à¸¡à¸” (à¸¥à¸š .slice(0, 10) à¸­à¸­à¸à¹à¸¥à¹‰à¸§)
        return uniqueImages; 
      }
    });
    
    return result[0]?.result || [];
  } catch (error) {
    console.error('Error getting generated images:', error);
    return [];
  }
}

// Banana Prompt & Play Studio: Convert image URL to data URL
async function bananaConvertImageToDataUrl(imageUrl) {
  try {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    
    const result = await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: (url) => {
        return new Promise((resolve) => {
          const img = new Image();
          img.crossOrigin = 'anonymous';
          img.onload = function() {
            const canvas = document.createElement('canvas');
            canvas.width = this.width;
            canvas.height = this.height;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(this, 0, 0);
            try {
              const dataUrl = canvas.toDataURL('image/png');
              resolve(dataUrl);
            } catch (e) {
              resolve(null);
            }
          };
          img.onerror = () => resolve(null);
          img.src = url;
        });
      },
      args: [imageUrl]
    });
    
    return result[0]?.result || null;
  } catch (error) {
    console.error('Error converting image:', error);
    return null;
  }
}





// ============================================
// ðŸŸ¢ NEW LOGIC: SNAPSHOT & COMPARE (à¹à¸à¹‰à¸›à¸±à¸à¸«à¸²à¸”à¸¶à¸‡à¸£à¸¹à¸›à¹€à¸à¹ˆà¸²)
// ============================================

// ============================================
// ðŸŸ¢ à¸Ÿà¸±à¸‡à¸à¹Œà¸Šà¸±à¸™à¸Šà¹ˆà¸§à¸¢: à¸”à¸¶à¸‡ URL à¸£à¸¹à¸›à¸—à¸±à¹‰à¸‡à¸«à¸¡à¸” (à¸­à¸±à¸›à¹€à¸à¸£à¸”: à¸„à¹‰à¸™à¸«à¸²à¸›à¹‰à¸²à¸¢ "à¸£à¸¹à¸›à¸ à¸²à¸žà¸—à¸µà¹ˆà¸­à¸±à¸›à¹‚à¸«à¸¥à¸”" à¸‚à¸±à¹‰à¸™à¸ªà¸¸à¸”à¸¢à¸­à¸”)
// ============================================
async function getAllPageImages() {
    try {
        const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
        const result = await chrome.scripting.executeScript({
            target: { tabId: tab.id },
            func: async () => {
                // à¸”à¸±à¸™à¸ˆà¸­à¸¥à¸‡à¸¥à¹ˆà¸²à¸‡à¸ªà¸¸à¸”à¹€à¸žà¸·à¹ˆà¸­à¹ƒà¸«à¹‰à¹€à¸§à¹‡à¸šà¹‚à¸«à¸¥à¸”à¸£à¸¹à¸›à¸—à¸µà¹ˆà¸‹à¹ˆà¸­à¸™à¸­à¸¢à¸¹à¹ˆà¸­à¸­à¸à¸¡à¸²à¹ƒà¸«à¹‰à¸«à¸¡à¸”
                window.scrollTo(0, document.body.scrollHeight);
                await new Promise(r => setTimeout(r, 1000));
                window.scrollTo(0, 0);
                await new Promise(r => setTimeout(r, 500));

                const findResultCard = (img) => {
                    let node = img;

                    for (let depth = 0; depth < 18; depth++) {
                        if (!node || node === document.body) break;

                        const text = (node.innerText || '').trim();
                        const hasToolbar = !!node.querySelector('[role="toolbar"]');
                        const hasTile = !!node.querySelector('[data-tile-id]');
                        const hasDownload = text.includes('à¸”à¸²à¸§à¸™à¹Œà¹‚à¸«à¸¥à¸”') || text.toLowerCase().includes('download');
                        const hasDate = text.includes('à¸ªà¸£à¹‰à¸²à¸‡à¹€à¸¡à¸·à¹ˆà¸­') || text.toLowerCase().includes('created');

                        if ((hasToolbar || hasDownload) && hasTile && hasDate) {
                            return node;
                        }

                        node = node.parentElement;
                    }

                    return null;
                };

                const isGeneratedAiCard = (card) => {
                    if (!card) return false;

                    const text = (card.innerText || '').toLowerCase();
                    const isUploadedCard =
                        text.includes('à¸£à¸¹à¸›à¸ à¸²à¸žà¸—à¸µà¹ˆà¸­à¸±à¸›à¹‚à¸«à¸¥à¸”') ||
                        text.includes('uploaded image') ||
                        text.includes('original image');

                    if (isUploadedCard) return false;

                    const hasNanoBanana = text.includes('nano banana');
                    const hasPromptReuse =
                        text.includes('à¹ƒà¸Šà¹‰à¸žà¸£à¸­à¸¡à¸•à¹Œà¸‹à¹‰à¸³') ||
                        text.includes('à¹ƒà¸Šà¹‰à¸žà¸£à¸­à¸¡à¸•à¹Œà¸‚à¹‰à¸­à¸„à¸§à¸²à¸¡à¸­à¸µà¸à¸„à¸£à¸±à¹‰à¸‡') ||
                        text.includes('reuse prompt');
                    const hasPromptText = text.length > 180;

                    return hasNanoBanana && (hasPromptReuse || hasPromptText);
                };

                return Array.from(document.querySelectorAll('img'))
                    .filter(img => {
                        const rect = img.getBoundingClientRect();
                        const src = img.src || img.getAttribute('src') || img.getAttribute('data-src');

                        if (!src || !img.complete || img.naturalWidth === 0) return false;
                        if (rect.width <= 120 || rect.height <= 120) return false;
                        if (src.includes('icon') || src.includes('avatar') || src.includes('logo') || src.includes('profile')) return false;

                        const isInsidePromptBox = img.closest('[role="textbox"], [data-slate-editor="true"], [aria-haspopup="dialog"], header, nav');
                        if (isInsidePromptBox) return false;

                        const card = findResultCard(img);
                        if (!isGeneratedAiCard(card)) return false;

                        const cardImages = Array.from(card.querySelectorAll('img'));
                        const mainImage = cardImages.find(candidate => {
                            const candidateRect = candidate.getBoundingClientRect();
                            const candidateSrc = candidate.src || candidate.getAttribute('src') || candidate.getAttribute('data-src');
                            const candidateAlt = (candidate.getAttribute('alt') || '').toLowerCase();
                            const isReferenceThumb =
                                candidateAlt.includes('à¸­à¸±à¸›à¹‚à¸«à¸¥à¸”') ||
                                candidateAlt.includes('à¸„à¸­à¸¥à¹€à¸¥à¹‡à¸à¸Šà¸±à¸™') ||
                                candidateAlt.includes('uploaded') ||
                                candidateAlt.includes('collection');
                            const isEditImage = !!candidate.closest('a[href*="/edit/"]');

                            return candidateSrc && isEditImage && !isReferenceThumb && candidateRect.width > 120 && candidateRect.height > 120;
                        });

                        return mainImage === img;
                    })
                    .map(img => img.src || img.getAttribute('src') || img.getAttribute('data-src'))
                    .filter(Boolean);
            }
        });
        return new Set(result[0]?.result || []);
    } catch (e) {
        console.error("Snapshot Error:", e);
        return new Set();
    }
}

// 2. à¸Ÿà¸±à¸‡à¸à¹Œà¸Šà¸±à¸™à¸«à¸¥à¸±à¸: Banana -> Video (à¹à¸à¹‰à¹„à¸‚à¹à¸¥à¹‰à¸§)
function bananaGetToVideoStyle() {
  return bananaToVideoStyleSelect ? bananaToVideoStyleSelect.value : 'talk_ugc';
}

function bananaCleanVideoStyleLabel(text) {
  return String(text || '')
    .replace(/\s+/g, ' ')
    .trim();
}

function bananaPopulateToVideoStyles() {
  if (!bananaToVideoStyleSelect) return;

  const existingValue = bananaToVideoStyleSelect.value || 'talk_ugc';
  const options = Array.from(document.querySelectorAll('.config-option[data-type="vstyle"][data-value]'));
  if (options.length === 0) return;

  bananaToVideoStyleSelect.innerHTML = '';
  const toVideoLabelMap = {
    talk_ugc: 'รีวิว UGC',
    talk_excited: 'ตื่นเต้น / โปรโมท',
    talk_cheerful: 'ร่าเริงสดใส',
    talk_sassy: 'มั่นใจแอบแซ่บ',
    talk_sincere: 'แนะนำจากใจ',
    hook_comparison: 'เปรียบเทียบ',
    hook_secret: 'เล่าความลับ',
    rant_expert: 'ผู้เชี่ยวชาญ',
    broll_hero: 'Hero Shot ไม่มีเสียงพูด',
    broll_pan: 'แพนกล้อง',
    broll_zoom: 'ซูมสินค้า',
    broll_cinematic: 'ซีนีมาติก',
    broll_motion_detail: 'Motion Detail ไม่มีเสียงพูด',
    miniature_vdo: 'โลกจิ๋วสินค้า',
    voice_promo: 'พากย์โปรโมท',
    voice_soft: 'พากย์นุ่มนวล',
    voice_docu: 'สารคดีสินค้า',
    cartoon: 'การ์ตูนเล่าเรื่อง',
    voice_rant: 'พูดรีวิวแรง',
    voice_miniature: 'พากย์โลกจิ๋ว',
    voice_news: 'ข่าวสินค้า',
    voice_movie: 'ตัวอย่างหนัง'
  };

  options.forEach((button) => {
    const option = document.createElement('option');
    option.value = button.dataset.value;
    option.textContent = toVideoLabelMap[button.dataset.value] || bananaCleanVideoStyleLabel(button.dataset.label || button.textContent || button.dataset.value);
    bananaToVideoStyleSelect.appendChild(option);
  });

  const hasExisting = Array.from(bananaToVideoStyleSelect.options).some((option) => option.value === existingValue);
  bananaToVideoStyleSelect.value = hasExisting ? existingValue : 'talk_ugc';
}

function bananaUpdateToVideoSummary(message) {
  if (!bananaToVideoSummary) return;
  if (message) {
    bananaToVideoSummary.textContent = message;
    return;
  }

  const enabled = bananaToVideoCheckbox && bananaToVideoCheckbox.checked;
  const rounds = typeof bananaGetRoundsPerImage === 'function' ? bananaGetRoundsPerImage() : 1;
  const styleLabel = bananaToVideoStyleSelect
    ? bananaToVideoStyleSelect.options[bananaToVideoStyleSelect.selectedIndex]?.textContent
    : 'รีวิว UGC';

  bananaToVideoSummary.textContent = enabled
    ? `เปิดอยู่: หลังสร้างภาพจะส่งต่อเป็นวิดีโอสไตล์ ${styleLabel} (${rounds} รอบ/ภาพ)`
    : 'พร้อมส่งภาพที่สร้างเสร็จไปทำวิดีโออัตโนมัติ';
}

function bananaApplyToVideoStyle(styleValue) {
  bananaPopulateToVideoStyles();
  const targetStyle = styleValue || 'talk_ugc';
  const vRandomCheckbox = document.getElementById('video-random-style-switch');
  if (vRandomCheckbox) {
    vRandomCheckbox.checked = false;
    vRandomCheckbox.dispatchEvent(new Event('change', { bubbles: true }));
  }

  const styleInput = document.getElementById('video-style-select');
  if (styleInput) styleInput.value = targetStyle;

  const styleOption = document.querySelector(`.config-option[data-type="vstyle"][data-value="${targetStyle}"]`)
    || document.querySelector('.config-option[data-type="vstyle"].active')
    || document.querySelector('.config-option[data-type="vstyle"]');

  if (styleOption) {
    styleOption.click();
    return styleOption.dataset.label || styleOption.textContent.trim() || targetStyle;
  }

  return targetStyle;
}

async function bananaToVideoAutomation() {
  if (window.FeatureGate && !FeatureGate.can('imageToVideo')) {
    showToast('Image-to-Video Auto à¹ƒà¸Šà¹‰à¹„à¸”à¹‰à¹€à¸‰à¸žà¸²à¸° Premium', 'warning');
    return;
  }

  if (bananaIsAutomationRunning || videoIsAutomationRunning) {
    showToast('à¸à¸³à¸¥à¸±à¸‡à¸£à¸±à¸™à¸­à¸¢à¸¹à¹ˆà¹à¸¥à¹‰à¸§ à¸à¸£à¸¸à¸“à¸²à¸£à¸­à¸ªà¸±à¸à¸„à¸£à¸¹à¹ˆ', 'error');
    return;
  }

  // à¸”à¸¶à¸‡à¸„à¹ˆà¸² Config
  const productName = bananaProductNameInput ? bananaProductNameInput.value.trim() : '';
  const selectedVideoStyle = bananaGetToVideoStyle();
  const bananaImageAutoDownloadCheckbox = document.getElementById('banana-auto-download-checkbox');
  const previousImageAutoDownload = bananaImageAutoDownloadCheckbox ? bananaImageAutoDownloadCheckbox.checked : null;
  
  if (bananaUploadedImages.length === 0) {
    showToast('à¸à¸£à¸¸à¸“à¸²à¸­à¸±à¸žà¹‚à¸«à¸¥à¸”à¸ à¸²à¸žà¸ªà¸´à¸™à¸„à¹‰à¸²à¸à¹ˆà¸­à¸™', 'error');
    return;
  }

  // Sync à¸„à¹ˆà¸²à¹„à¸›à¸¢à¸±à¸‡à¸«à¸™à¹‰à¸² Video
  if (videoProductNameInput) videoProductNameInput.value = productName;
  bananaUpdateToVideoSummary('เริ่มโหมด Image-to-Video: กำลังสร้างภาพก่อนส่งต่อ...');
  const bananaRoundValue = bananaRoundCountSelect ? bananaRoundCountSelect.value : '1';
  if (videoRoundCountSelect) videoRoundCountSelect.value = bananaRoundValue;
  
  if (bananaRoundValue === 'custom') {
    if (videoCustomRoundInput && bananaCustomRoundInput) {
      videoCustomRoundInput.value = bananaCustomRoundInput.value;
      videoCustomRoundInput.style.display = 'block';
    }
  } else if (videoCustomRoundInput) {
    videoCustomRoundInput.style.display = 'none';
  }

  if (bananaImageAutoDownloadCheckbox) bananaImageAutoDownloadCheckbox.checked = true;
  if (videoDownloadCountAuto) videoDownloadCountAuto.checked = true;
  
  videoUpdateRoundInfo();

  try {
    // -------------------------------------------------
    // ðŸ“¸ PHASE 1: SNAPSHOT (à¸ˆà¸³à¸£à¸¹à¸›à¹€à¸”à¸´à¸¡à¸à¹ˆà¸­à¸™à¹€à¸£à¸´à¹ˆà¸¡à¸‡à¸²à¸™)
    // -------------------------------------------------
    bananaUpdateStatus('ðŸ“¸ Snapshot: à¸à¸³à¸¥à¸±à¸‡à¸ˆà¸”à¸ˆà¸³à¸£à¸¹à¸›à¸ à¸²à¸žà¹€à¸”à¸´à¸¡...');
    const previousImagesSet = await getAllPageImages();
    bananaAddLog(`â„¹ï¸ à¸ à¸²à¸žà¹€à¸”à¸´à¸¡à¹ƒà¸™à¸ˆà¸­à¸¡à¸µ ${previousImagesSet.size} à¸ à¸²à¸ž`, 'info');

    // -------------------------------------------------
    // ðŸŽ¬ PHASE 2: à¸£à¸±à¸™ Banana (à¸ªà¸£à¹‰à¸²à¸‡à¸ à¸²à¸ž)
    // -------------------------------------------------
    bananaUpdateStatus('ðŸŽ¬ [1/2] à¸à¸³à¸¥à¸±à¸‡à¸ªà¸£à¹‰à¸²à¸‡à¸ à¸²à¸ž...');
    
    // à¹€à¸£à¸µà¸¢à¸à¸Ÿà¸±à¸‡à¸à¹Œà¸Šà¸±à¸™à¸ªà¸£à¹‰à¸²à¸‡à¸ à¸²à¸ž (Function à¹€à¸”à¸´à¸¡à¸—à¸µà¹ˆà¸¡à¸µà¸­à¸¢à¸¹à¹ˆà¹à¸¥à¹‰à¸§)
await bananaHandleAutomation(true); // à¸ªà¹ˆà¸‡à¸ªà¸±à¸à¸à¸²à¸“à¸§à¹ˆà¸² "à¸à¸³à¸¥à¸±à¸‡à¸—à¸³à¸•à¹ˆà¸­à¹€à¸™à¸·à¹ˆà¸­à¸‡ à¸«à¹‰à¸²à¸¡à¸›à¸¥à¸”à¸¥à¹‡à¸­à¸„"

    if (bananaShouldStopAutomation) throw new Error('STOPPED');

    // à¸£à¸­à¹ƒà¸«à¹‰à¸ à¸²à¸žà¹‚à¸«à¸¥à¸”à¹€à¸ªà¸£à¹‡à¸ˆ (à¸ªà¸³à¸„à¸±à¸à¸¡à¸²à¸! à¹ƒà¸«à¹‰à¹€à¸§à¸¥à¸²à¸£à¸°à¸šà¸š Render)
    bananaUpdateStatus('â³ à¸£à¸­à¸ à¸²à¸žà¹ƒà¸«à¸¡à¹ˆ Render (10s)...');
    await new Promise(resolve => setTimeout(resolve, 10000));

    // -------------------------------------------------
    // ðŸ•µï¸ PHASE 3: à¹€à¸›à¸£à¸µà¸¢à¸šà¹€à¸—à¸µà¸¢à¸šà¸«à¸² "à¸£à¸¹à¸›à¹ƒà¸«à¸¡à¹ˆ" (VERIFIED COMPARE)
    // -------------------------------------------------
   // ðŸ•µï¸ [à¸ˆà¸¸à¸”à¸—à¸µà¹ˆà¹à¸à¹‰à¹„à¸‚] PHASE 3: à¸£à¸°à¸šà¸šà¸•à¸£à¸§à¸ˆà¸ªà¸­à¸šà¸ à¸²à¸žà¹ƒà¸«à¸¡à¹ˆà¹à¸šà¸š "à¹€à¸ˆà¸­à¹à¸„à¹ˆà¹„à¸«à¸™à¹€à¸­à¸²à¹à¸„à¹ˆà¸™à¸±à¹‰à¸™" (Non-Fatal Check)
    bananaUpdateStatus('ðŸ” à¸à¸³à¸¥à¸±à¸‡à¸£à¸­à¸£à¸¹à¸›à¸ à¸²à¸žà¹ƒà¸«à¸¡à¹ˆ Render à¹ƒà¸«à¹‰à¸ªà¸¡à¸šà¸¹à¸£à¸“à¹Œ...');
    let newImageUrls = [];

    for (let retry = 0; retry < 5; retry++) { 
        if (bananaShouldStopAutomation) throw new Error('STOPPED');
        await new Promise(resolve => setTimeout(resolve, 4000)); 
        
        const currentImagesSet = await getAllPageImages();
        const currentImagesArray = Array.from(currentImagesSet);
        
        // à¸à¸£à¸­à¸‡à¸«à¸²à¸ à¸²à¸žà¹ƒà¸«à¸¡à¹ˆà¸—à¸µà¹ˆà¹„à¸¡à¹ˆà¹„à¸”à¹‰à¸­à¸¢à¸¹à¹ˆà¹ƒà¸™ Snapshot à¸•à¸­à¸™à¹€à¸£à¸´à¹ˆà¸¡à¸•à¹‰à¸™
        newImageUrls = currentImagesArray.filter(url => !previousImagesSet.has(url));
        
        if (newImageUrls.length > 0) {
            // ðŸ§  à¸•à¸£à¸§à¸ˆà¸ªà¸­à¸šà¸„à¸§à¸²à¸¡à¸™à¸´à¹ˆà¸‡: à¸£à¸­à¸­à¸µà¸ 3 à¸§à¸´à¸™à¸²à¸—à¸µà¹€à¸žà¸·à¹ˆà¸­à¹ƒà¸«à¹‰à¸ à¸²à¸žà¹ƒà¸šà¸ªà¸¸à¸”à¸—à¹‰à¸²à¸¢à¹ƒà¸™ Batch à¹‚à¸«à¸¥à¸”à¸ˆà¸™à¸„à¸£à¸š
            await new Promise(resolve => setTimeout(resolve, 3000));
            const reCheckSet = await getAllPageImages();
            const reCheckArray = Array.from(reCheckSet).filter(url => !previousImagesSet.has(url));
            
            if (reCheckArray.length >= newImageUrls.length) {
                newImageUrls = reCheckArray;
                break; // à¹€à¸ˆà¸­à¸ à¸²à¸žà¹à¸¥à¹‰à¸§ (à¸ˆà¸°à¸à¸µà¹ˆà¸ à¸²à¸žà¸à¹‡à¹„à¸”à¹‰) à¹ƒà¸«à¹‰à¸­à¸­à¸à¸ˆà¸²à¸ Loop à¸à¸²à¸£à¸£à¸­
            }
        }
        bananaUpdateStatus(`â³ à¸£à¸­à¸£à¸¹à¸›à¸ à¸²à¸žà¹ƒà¸«à¸¡à¹ˆ Render à¹ƒà¸«à¹‰à¸„à¸£à¸š... (${retry + 1}/5)`);
    }

    // ðŸŸ¢ [Logic à¹ƒà¸«à¸¡à¹ˆ]: à¸–à¹‰à¸²à¸ˆà¸š Loop à¹à¸¥à¹‰à¸§à¸¢à¸±à¸‡à¹„à¸¡à¹ˆà¹€à¸ˆà¸­à¸ à¸²à¸žà¹€à¸¥à¸¢ à¹ƒà¸«à¹‰ Log à¹€à¸•à¸·à¸­à¸™à¹à¸•à¹ˆà¹„à¸¡à¹ˆà¸•à¹‰à¸­à¸‡ Crash
    if (newImageUrls.length === 0) {
        bananaAddLog('âš ï¸ à¹„à¸¡à¹ˆà¸žà¸šà¸£à¸¹à¸›à¸ à¸²à¸žà¹ƒà¸«à¸¡à¹ˆà¹ƒà¸™à¸£à¸­à¸šà¸™à¸µà¹‰ (à¸£à¸¹à¸›à¸­à¸²à¸ˆà¸ªà¸£à¹‰à¸²à¸‡à¹„à¸¡à¹ˆà¸ªà¸³à¹€à¸£à¹‡à¸ˆà¸«à¸£à¸·à¸­ Error) - à¸à¸³à¸¥à¸±à¸‡à¸‚à¹‰à¸²à¸¡à¹„à¸›à¹€à¸Šà¹‡à¸„à¸‚à¸±à¹‰à¸™à¸•à¸­à¸™à¸–à¸±à¸”à¹„à¸›', 'warning');
    } else {
        newImageUrls.reverse(); 
        bananaAddLog(`âœ¨ à¸¢à¸·à¸™à¸¢à¸±à¸™à¸žà¸šà¸ à¸²à¸žà¹ƒà¸«à¸¡à¹ˆà¸—à¸µà¹ˆà¸ªà¸£à¹‰à¸²à¸‡à¸ªà¸³à¹€à¸£à¹‡à¸ˆ ${newImageUrls.length} à¸ à¸²à¸ž`, 'success');
    }

    // -------------------------------------------------
    // ðŸ”„ PHASE 4: à¹à¸›à¸¥à¸‡à¸‚à¹‰à¸­à¸¡à¸¹à¸¥à¹à¸¥à¸°à¸ªà¹ˆà¸‡à¸•à¹ˆà¸­ (à¹à¸à¹‰à¹„à¸‚à¹ƒà¸«à¹‰à¸‚à¹‰à¸²à¸¡à¹„à¸”à¹‰à¸–à¹‰à¸²à¹„à¸¡à¹ˆà¸¡à¸µà¸£à¸¹à¸›)
    // -------------------------------------------------
    if (newImageUrls.length > 0) {
        bananaUpdateStatus(`ðŸŽ¬ [2/2] à¸à¸³à¸¥à¸±à¸‡à¹à¸›à¸¥à¸‡à¸‚à¹‰à¸­à¸¡à¸¹à¸¥à¸ à¸²à¸žà¹ƒà¸«à¸¡à¹ˆ...`);
        videoUploadedImages = []; // à¹€à¸„à¸¥à¸µà¸¢à¸£à¹Œà¸‚à¸­à¸‡à¹€à¸à¹ˆà¸²à¸—à¸´à¹‰à¸‡

        for (let i = 0; i < newImageUrls.length; i++) {
            if (bananaShouldStopAutomation) throw new Error('STOPPED');

            const url = newImageUrls[i];
            let dataUrl = url;

            bananaUpdateStatus(`ðŸŽ¬ [2/2] à¸à¸³à¸¥à¸±à¸‡à¹à¸›à¸¥à¸‡à¸ à¸²à¸ž ${i + 1}/${newImageUrls.length}...`);

            if (!url.startsWith('data:')) {
                dataUrl = await bananaConvertImageToDataUrl(url);
            }

            if (dataUrl) {
                videoUploadedImages.push({
                    id: Date.now() + Math.random() + i,
                    name: `gen_img_${i + 1}.png`,
                    type: 'image/png',
                    dataUrl: dataUrl
                });
            }
        }
        
        videoUpdateImageCount();
        bananaUpdateStatus(`ðŸŽ¬ [2/2] à¸ªà¹ˆà¸‡à¸•à¹ˆà¸­à¸ à¸²à¸ž ${videoUploadedImages.length} à¸ à¸²à¸ž à¹„à¸›à¸¢à¸±à¸‡ Video Mode`);

        // à¸ªà¸¥à¸±à¸š Tab à¹„à¸›à¸«à¸™à¹‰à¸² Video
        const videoTab = document.querySelector('[data-tab="video"]');
        if (videoTab) {
            videoTab.click();
            await new Promise(resolve => setTimeout(resolve, 1000));
        }
    } else {
        bananaUpdateStatus('à¹„à¸¡à¹ˆà¸žà¸šà¸ à¸²à¸žà¹ƒà¸«à¸¡à¹ˆà¸ªà¸³à¸«à¸£à¸±à¸šà¸ªà¹ˆà¸‡à¸•à¹ˆà¸­à¹„à¸›à¸—à¸³à¸§à¸´à¸”à¸µà¹‚à¸­');
        bananaAddLog('â­ï¸ à¹„à¸¡à¹ˆà¸¡à¸µà¸£à¸¹à¸›à¹ƒà¸«à¸¡à¹ˆà¹ƒà¸«à¹‰à¸ªà¹ˆà¸‡à¸•à¹ˆà¸­ - à¸‚à¹‰à¸²à¸¡à¸‚à¸±à¹‰à¸™à¸•à¸­à¸™à¸à¸²à¸£à¸—à¸³ Video', 'info');
        return;
    }

// -------------------------------------------------
    // ðŸš€ PHASE 5: à¸£à¸±à¸™ Video Automation (à¸‰à¸šà¸±à¸šà¹à¸à¹‰à¹„à¸‚: à¸›à¸´à¸”à¸ªà¸¸à¹ˆà¸¡ à¹à¸¥à¸°à¹ƒà¸Šà¹‰à¸ªà¹„à¸•à¸¥à¹Œ UGC)
    // -------------------------------------------------
    // [à¸ˆà¸¸à¸”à¸—à¸µà¹ˆà¹à¸à¹‰à¹„à¸‚]: à¸¢à¸à¹€à¸¥à¸´à¸à¸à¸²à¸£à¸šà¸±à¸‡à¸„à¸±à¸šà¸ªà¸¸à¹ˆà¸¡ à¹à¸¥à¸°à¸ªà¸±à¹ˆà¸‡à¹ƒà¸«à¹‰à¹ƒà¸Šà¹‰à¸ªà¹„à¸•à¸¥à¹Œ à¸£à¸µà¸§à¸´à¸§ UGC (16) à¹€à¸ªà¸¡à¸­
    const vRandomCheckbox = document.getElementById('video-random-style-switch'); 
    if (vRandomCheckbox) {
        vRandomCheckbox.checked = false; // âŒ à¸›à¸´à¸”à¹‚à¸«à¸¡à¸”à¸ªà¸¸à¹ˆà¸¡
        // à¸à¸£à¸°à¸•à¸¸à¹‰à¸™ Event à¹€à¸žà¸·à¹ˆà¸­à¹ƒà¸«à¹‰ UI à¸«à¸™à¹‰à¸²à¹€à¸§à¹‡à¸šà¸›à¸£à¸±à¸šà¸„à¸§à¸²à¸¡à¸ªà¸§à¹ˆà¸²à¸‡à¸à¸¥à¹ˆà¸­à¸‡à¸ªà¹„à¸•à¸¥à¹Œà¹ƒà¸«à¹‰à¸à¸¥à¸±à¸šà¸¡à¸²à¹€à¸¥à¸·à¸­à¸à¹„à¸”à¹‰
        vRandomCheckbox.dispatchEvent(new Event('change', { bubbles: true })); 
        bananaAddLog('âœ… à¸›à¸´à¸”à¹‚à¸«à¸¡à¸”à¸ªà¸¸à¹ˆà¸¡ Video Style à¸­à¸±à¸•à¹‚à¸™à¸¡à¸±à¸•à¸´ à¹€à¸žà¸·à¹ˆà¸­à¹ƒà¸Šà¹‰à¸ªà¹„à¸•à¸¥à¹Œà¸—à¸µà¹ˆà¸à¸³à¸«à¸™à¸”', 'info');
    }

    // à¸šà¸±à¸‡à¸„à¸±à¸šà¹€à¸¥à¸·à¸­à¸à¸›à¸¸à¹ˆà¸¡à¸ªà¹„à¸•à¸¥à¹Œà¹€à¸šà¸­à¸£à¹Œ 16 (à¸£à¸µà¸§à¸´à¸§à¸šà¹‰à¸²à¸™à¹†/UGC) à¹€à¸žà¸·à¹ˆà¸­à¸„à¸§à¸²à¸¡à¸Šà¸±à¸§à¸£à¹Œà¸à¹ˆà¸­à¸™à¸£à¸±à¸™
    const ugcOption = null && document.querySelector('.config-option[data-type="vstyle"][data-value="talk_ugc"]')
        || document.querySelector('.config-option[data-type="vstyle"].active')
        || document.querySelector('.config-option[data-type="vstyle"]');
    if (ugcOption) {
        ugcOption.click();
        bananaAddLog('ðŸ¤³ à¸šà¸±à¸‡à¸„à¸±à¸šà¹ƒà¸Šà¹‰à¸ªà¹„à¸•à¸¥à¹Œ: à¸£à¸µà¸§à¸´à¸§à¸šà¹‰à¸²à¸™à¹† (UGC)', 'success');
    }

    const appliedStyleLabel = bananaApplyToVideoStyle(selectedVideoStyle);
    bananaAddLog(`ðŸŽ¬ à¹ƒà¸Šà¹‰à¸ªà¹„à¸•à¸¥à¹Œà¸§à¸´à¸”à¸µà¹‚à¸­à¸­à¸±à¸•à¹‚à¸™à¸¡à¸±à¸•à¸´: ${appliedStyleLabel}`, 'success');
    bananaUpdateToVideoSummary(`ส่งต่อ ${videoUploadedImages.length} ภาพไปทำวิดีโอสไตล์ ${appliedStyleLabel}`);

    if (videoUploadedImages.length === 0) {
        throw new Error('à¹„à¸¡à¹ˆà¸žà¸šà¸ à¸²à¸žà¸—à¸µà¹ˆà¸ªà¹ˆà¸‡à¸•à¹ˆà¸­à¹„à¸›à¸¢à¸±à¸‡ Video Mode');
    }

    await videoRunAutomation();

    bananaUpdateStatus('ðŸŽ¬ à¹€à¸ªà¸£à¹‡à¸ˆà¸ªà¸´à¹‰à¸™! à¸ªà¸£à¹‰à¸²à¸‡à¸ à¸²à¸žà¹à¸¥à¸°à¸§à¸´à¸”à¸µà¹‚à¸­à¹€à¸ªà¸£à¹‡à¸ˆà¹à¸¥à¹‰à¸§');
    showToast('à¸ªà¸£à¹‰à¸²à¸‡à¸ à¸²à¸žà¹à¸¥à¸°à¸§à¸´à¸”à¸µà¹‚à¸­à¹€à¸ªà¸£à¹‡à¸ˆà¹à¸¥à¹‰à¸§!', 'success');

  } catch (error) {
    if (error.message === 'STOPPED') {
        bananaUpdateStatus('à¸«à¸¢à¸¸à¸”à¸à¸²à¸£à¸—à¸³à¸‡à¸²à¸™à¹à¸¥à¹‰à¸§');
        showToast('à¸«à¸¢à¸¸à¸”à¸•à¸²à¸¡à¸„à¸³à¸ªà¸±à¹ˆà¸‡à¸œà¸¹à¹‰à¹ƒà¸Šà¹‰', 'warning');
    } else {
        bananaUpdateStatus(`âŒ Error: ${error.message}`);
        showToast('à¹€à¸à¸´à¸”à¸‚à¹‰à¸­à¸œà¸´à¸”à¸žà¸¥à¸²à¸”: ' + error.message, 'error');
    }
  } finally {
    // Cleanup
    bananaIsAutomationRunning = false;
    bananaShouldStopAutomation = false;
    await toggleWebPageLock(false); 

    if (bananaBtnAutomation) {
        bananaBtnAutomation.disabled = false;
        bananaBtnAutomation.innerHTML = '<span>START GENERATE</span>'; 
    }
    if (bananaBtnStop) {
        bananaBtnStop.style.display = 'none';
    }
    if (bananaImageAutoDownloadCheckbox && previousImageAutoDownload !== null) {
        bananaImageAutoDownloadCheckbox.checked = previousImageAutoDownload;
    }
    bananaUpdateToVideoSummary();
  }
}

// ============================================
// ðŸŒ BANANA SETUP: EVENT LISTENERS (à¸‰à¸šà¸±à¸šà¹à¸à¹‰: à¸¥à¹‡à¸­à¸„à¸›à¸¸à¹ˆà¸¡ Text à¹€à¸¡à¸·à¹ˆà¸­à¹ƒà¸Šà¹‰ Smart Auto)
// ============================================
function bananaSetupEventListeners() {
	
// ==================================================================
  // ðŸŸ¢ [NEW] à¸ˆà¸±à¸”à¸à¸²à¸£ Smart Auto à¸‚à¸­à¸‡ MASCOT (Fix: à¹„à¸¡à¹ˆà¸¥à¹‡à¸­à¸à¸›à¸¸à¹ˆà¸¡à¸‚à¹‰à¸­à¸„à¸§à¸²à¸¡)
  // ==================================================================
  const mascotSmartCheck = document.getElementById('mascot-smart-auto-checkbox');
  const mascotBgInput = document.getElementById('mascot-bg-select');
  const mascotOutfitInput = document.getElementById('mascot-outfit-select');
  const mascotCustomBg = document.getElementById('mascot-custom-bg-input');
  const mascotCustomOutfit = document.getElementById('mascot-custom-outfit-input');
  
  // à¹€à¸žà¸´à¹ˆà¸¡: à¸à¸¥à¹ˆà¸­à¸‡à¸ªà¸§à¸´à¸•à¸Šà¹Œà¸‚à¹‰à¸­à¸„à¸§à¸²à¸¡
  const mascotTextCheck = document.getElementById('mascot-text-overlay-checkbox');
  const mascotTextBox = document.getElementById('mascot-text-box');

  if (mascotSmartCheck) {
      mascotSmartCheck.addEventListener('change', (e) => {
          const isSmart = e.target.checked;
          
          const toggleLock = (el, lock) => {
              if(!el) return;
              const group = el.closest('.input-group');
              if(group) {
                  if(lock) group.classList.add('disabled-section');
                  else group.classList.remove('disabled-section');
              }
          };

         if (isSmart) {
              // 1. à¸¥à¹‡à¸­à¸„à¸ªà¹ˆà¸§à¸™à¹€à¸¥à¸·à¸­à¸à¸‰à¸²à¸à¹à¸¥à¸°à¸Šà¸¸à¸” (à¹ƒà¸«à¹‰ AI à¸„à¸´à¸”à¹€à¸­à¸‡)
              toggleLock(mascotBgInput, true);
              toggleLock(mascotOutfitInput, true);
              if(mascotCustomBg) mascotCustomBg.disabled = true;
              if(mascotCustomOutfit) mascotCustomOutfit.disabled = true;
              
              // ðŸŸ¢ 2. à¹„à¸¡à¹ˆà¸¥à¹‡à¸­à¸à¸ªà¸§à¸´à¸•à¸Šà¹Œà¸‚à¹‰à¸­à¸„à¸§à¸²à¸¡à¸ªà¹ˆà¸§à¸™à¸à¸¥à¸²à¸‡à¹à¸¥à¹‰à¸§ à¹€à¸žà¸·à¹ˆà¸­à¹ƒà¸«à¹‰à¸œà¸¹à¹‰à¹ƒà¸Šà¹‰à¹€à¸¥à¸·à¸­à¸à¹€à¸›à¸´à¸”/à¸›à¸´à¸”à¹€à¸­à¸‡à¹„à¸”à¹‰à¸•à¸¥à¸­à¸”
          } else {
              // 1. à¸›à¸¥à¸”à¸¥à¹‡à¸­à¸„à¸›à¸à¸•à¸´
              toggleLock(mascotBgInput, false);
              toggleLock(mascotOutfitInput, false);
              if(mascotCustomBg) mascotCustomBg.disabled = false;
              if(mascotCustomOutfit) mascotCustomOutfit.disabled = false;
          }
      });
      
      // à¸à¸£à¸°à¸•à¸¸à¹‰à¸™ Event à¸„à¸£à¸±à¹‰à¸‡à¹à¸£à¸
      setTimeout(() => { mascotSmartCheck.dispatchEvent(new Event('change')); }, 200);
  }
	
  
  const smartAutoCheckbox = document.getElementById('banana-smart-auto-checkbox');
  const manualContainer = document.getElementById('manual-config-container');
  
  // ðŸŸ¢ à¹€à¸žà¸´à¹ˆà¸¡: à¸«à¸²à¸›à¸¸à¹ˆà¸¡ Checkbox à¹ƒà¸ªà¹ˆà¸•à¸±à¸§à¸«à¸™à¸±à¸‡à¸ªà¸·à¸­à¹à¸¥à¸°à¸à¸¥à¹ˆà¸­à¸‡à¸‚à¸­à¸‡à¸¡à¸±à¸™
  const textCheckbox = document.getElementById('banana-text-overlay-checkbox');
  const textOverlayBox = textCheckbox ? textCheckbox.closest('.special-box') : null;

  if (smartAutoCheckbox) {
      smartAutoCheckbox.addEventListener('change', (e) => {
          const isSmartOn = e.target.checked;

          // 1. à¸ˆà¸±à¸”à¸à¸²à¸£à¸ªà¹ˆà¸§à¸™ Manual Config (à¸‚à¹‰à¸²à¸‡à¸¥à¹ˆà¸²à¸‡à¸ªà¸¸à¸”)
          if (manualContainer) {
              if (isSmartOn) manualContainer.classList.add('disabled-section');
              else manualContainer.classList.remove('disabled-section');
          }

          // ðŸŸ¢ à¹à¸à¹‰à¹„à¸‚: à¹„à¸¡à¹ˆà¸¥à¹‡à¸­à¸à¸›à¸¸à¹ˆà¸¡à¸‚à¹‰à¸­à¸„à¸§à¸²à¸¡à¹à¸¥à¹‰à¸§ (à¹ƒà¸«à¹‰à¹€à¸¥à¸·à¸­à¸à¹€à¸­à¸‡à¹„à¸”à¹‰à¹€à¸ªà¸¡à¸­)
          if (textOverlayBox && textCheckbox) {
              // à¹„à¸¡à¹ˆà¸—à¸³à¸­à¸°à¹„à¸£à¸à¸±à¸š classList 'disabled-section' 
              // à¹€à¸žà¸·à¹ˆà¸­à¹ƒà¸«à¹‰à¸œà¸¹à¹‰à¹ƒà¸Šà¹‰à¸à¸”à¹€à¸›à¸´à¸”/à¸›à¸´à¸”à¹„à¸”à¹‰à¹€à¸­à¸‡à¸•à¸²à¸¡à¹ƒà¸ˆà¸Šà¸­à¸š à¹à¸¡à¹‰à¸ˆà¸°à¹€à¸›à¸´à¸” Smart Auto à¸­à¸¢à¸¹à¹ˆà¸à¹‡à¸•à¸²à¸¡
              textOverlayBox.classList.remove('disabled-section');
          }
      });
      
      // à¸à¸£à¸°à¸•à¸¸à¹‰à¸™ Event à¸„à¸£à¸±à¹‰à¸‡à¹à¸£à¸à¹€à¸žà¸·à¹ˆà¸­à¹ƒà¸«à¹‰ UI à¸­à¸±à¸›à¹€à¸”à¸•à¸•à¸²à¸¡à¸„à¹ˆà¸²à¹€à¸£à¸´à¹ˆà¸¡à¸•à¹‰à¸™à¸—à¸±à¸™à¸—à¸µ
      setTimeout(() => {
          smartAutoCheckbox.dispatchEvent(new Event('change'));
      }, 100);
  }
  
  if(bananaClearImagesBtn) bananaClearImagesBtn.addEventListener('click', bananaClearAllImages);
  bananaPopulateToVideoStyles();
  if (bananaToVideoCheckbox) bananaToVideoCheckbox.addEventListener('change', () => bananaUpdateToVideoSummary());
  if (bananaToVideoStyleSelect) bananaToVideoStyleSelect.addEventListener('change', () => bananaUpdateToVideoSummary());
  if (bananaRoundCountSelect) bananaRoundCountSelect.addEventListener('change', () => bananaUpdateToVideoSummary());
  if (bananaCustomRoundInput) bananaCustomRoundInput.addEventListener('input', () => bananaUpdateToVideoSummary());
  bananaUpdateToVideoSummary();
  
  
  
// à¸›à¸¸à¹ˆà¸¡ START (à¸à¸±à¹ˆà¸‡à¸ªà¸£à¹‰à¸²à¸‡à¸ à¸²à¸žà¸­à¸¢à¹ˆà¸²à¸‡à¹€à¸”à¸µà¸¢à¸§)
  if(bananaBtnAutomation) {
      bananaBtnAutomation.addEventListener('click', async () => {
          const shouldContinueToVideo = bananaToVideoCheckbox && bananaToVideoCheckbox.checked;
          if (shouldContinueToVideo) {
              if (window.FeatureGate && !FeatureGate.can('imageToVideo')) {
                  bananaToVideoCheckbox.checked = false;
                  showToast('Image-to-Video Auto à¹ƒà¸Šà¹‰à¹„à¸”à¹‰à¹€à¸‰à¸žà¸²à¸° Premium', 'warning');
                  return;
              }
              await bananaToVideoAutomation();
              return;
          }

          await bananaHandleAutomation(false);  // à¸ªà¸±à¹ˆà¸‡à¸£à¸±à¸™à¹à¸„à¹ˆà¹‚à¸«à¸¡à¸”à¸ªà¸£à¹‰à¸²à¸‡à¸£à¸¹à¸› à¹à¸¥à¹‰à¸§à¸ˆà¸šà¹€à¸¥à¸¢
      });
  }

  if(bananaBtnStop) bananaBtnStop.addEventListener('click', bananaStopAutomation);
  if(bananaRoundCountSelect) bananaRoundCountSelect.addEventListener('change', bananaUpdateRoundInfo);
  if(bananaRoundDropdown) bananaRoundDropdown.addEventListener('change', bananaSyncRoundDropdown);
  if(bananaCustomRoundInput) bananaCustomRoundInput.addEventListener('input', bananaUpdateRoundInfo);
  bananaSyncRoundDropdown();
 
  
  if (bananaLogClearBtn) {
    bananaLogClearBtn.addEventListener('click', (event) => {
      event.preventDefault();
      event.stopPropagation();
      bananaClearLogs();
    });
  }
  
  
  // ðŸŸ¢ à¹€à¸žà¸´à¹ˆà¸¡: Event Listener à¸ªà¸³à¸«à¸£à¸±à¸šà¸ªà¸§à¸´à¸•à¸Šà¹Œ "à¸ªà¸¸à¹ˆà¸¡à¸ªà¹„à¸•à¸¥à¹Œ"
  const randomStyleSwitch = document.getElementById('banana-random-style-switch');
  const styleSelectContainer = document.getElementById('config-content-style');

  if (randomStyleSwitch && styleSelectContainer) {
      randomStyleSwitch.addEventListener('change', (e) => {
          if (e.target.checked) {
              // à¸–à¹‰à¸²à¹€à¸›à¸´à¸”à¸ªà¸¸à¹ˆà¸¡ -> à¸—à¸³à¸à¸¥à¹ˆà¸­à¸‡à¹€à¸¥à¸·à¸­à¸à¸‚à¹‰à¸²à¸‡à¸¥à¹ˆà¸²à¸‡à¹ƒà¸«à¹‰à¸¡à¸·à¸” (Disabled)
              styleSelectContainer.classList.add('disabled-section');
          } else {
              // à¸–à¹‰à¸²à¸›à¸´à¸”à¸ªà¸¸à¹ˆà¸¡ -> à¸›à¸¥à¸”à¸¥à¹‡à¸­à¸„à¹ƒà¸«à¹‰à¹€à¸¥à¸·à¸­à¸à¹€à¸­à¸‡à¹„à¸”à¹‰
              styleSelectContainer.classList.remove('disabled-section');
          }
      });

      // à¹€à¸£à¸µà¸¢à¸à¸„à¸£à¸±à¹‰à¸‡à¹à¸£à¸à¹€à¸žà¸·à¹ˆà¸­à¹€à¸‹à¹‡à¸•à¸„à¹ˆà¸²à¹€à¸£à¸´à¹ˆà¸¡à¸•à¹‰à¸™
      setTimeout(() => {
          randomStyleSwitch.dispatchEvent(new Event('change'));
      }, 100);
  }
  
  
  // ðŸŸ¢ à¹€à¸žà¸´à¹ˆà¸¡: Event Listener à¸ªà¸³à¸«à¸£à¸±à¸šà¸ªà¸§à¸´à¸•à¸Šà¹Œ "à¸ªà¸¸à¹ˆà¸¡à¸‰à¸²à¸à¸«à¸¥à¸±à¸‡"
  const randomBgSwitch = document.getElementById('banana-random-bg-switch');
  const bgSelectContainer = document.getElementById('config-content-bg');

  if (randomBgSwitch && bgSelectContainer) {
      randomBgSwitch.addEventListener('change', (e) => {
          if (e.target.checked) {
              // à¸–à¹‰à¸²à¹€à¸›à¸´à¸”à¸ªà¸¸à¹ˆà¸¡ -> à¸—à¸³à¸à¸¥à¹ˆà¸­à¸‡à¹€à¸¥à¸·à¸­à¸à¸‚à¹‰à¸²à¸‡à¸¥à¹ˆà¸²à¸‡à¹ƒà¸«à¹‰à¸¡à¸·à¸” (Disabled)
              bgSelectContainer.classList.add('disabled-section');
          } else {
              // à¸–à¹‰à¸²à¸›à¸´à¸”à¸ªà¸¸à¹ˆà¸¡ -> à¸›à¸¥à¸”à¸¥à¹‡à¸­à¸„à¹ƒà¸«à¹‰à¹€à¸¥à¸·à¸­à¸à¹€à¸­à¸‡à¹„à¸”à¹‰
              bgSelectContainer.classList.remove('disabled-section');
          }
      });

      // à¹€à¸£à¸µà¸¢à¸à¸„à¸£à¸±à¹‰à¸‡à¹à¸£à¸à¹€à¸žà¸·à¹ˆà¸­à¹€à¸‹à¹‡à¸•à¸„à¹ˆà¸²à¹€à¸£à¸´à¹ˆà¸¡à¸•à¹‰à¸™
      setTimeout(() => {
          randomBgSwitch.dispatchEvent(new Event('change'));
      }, 100);
  }
  
  // ðŸŸ¢ à¹€à¸žà¸´à¹ˆà¸¡: Event Listener à¸ªà¸³à¸«à¸£à¸±à¸šà¸ªà¸§à¸´à¸•à¸Šà¹Œ "à¸ªà¸¸à¹ˆà¸¡à¸Šà¸¸à¸”"
  const randomOutfitSwitch = document.getElementById('banana-random-outfit-switch');
  const outfitSelectContainer = document.getElementById('config-content-outfit');

  if (randomOutfitSwitch && outfitSelectContainer) {
      randomOutfitSwitch.addEventListener('change', (e) => {
          if (e.target.checked) {
              // à¸–à¹‰à¸²à¹€à¸›à¸´à¸”à¸ªà¸¸à¹ˆà¸¡ -> à¸—à¸³à¸à¸¥à¹ˆà¸­à¸‡à¹€à¸¥à¸·à¸­à¸à¸‚à¹‰à¸²à¸‡à¸¥à¹ˆà¸²à¸‡à¹ƒà¸«à¹‰à¸¡à¸·à¸” (Disabled)
              outfitSelectContainer.classList.add('disabled-section');
          } else {
              // à¸–à¹‰à¸²à¸›à¸´à¸”à¸ªà¸¸à¹ˆà¸¡ -> à¸›à¸¥à¸”à¸¥à¹‡à¸­à¸„à¹ƒà¸«à¹‰à¹€à¸¥à¸·à¸­à¸à¹€à¸­à¸‡à¹„à¸”à¹‰
              outfitSelectContainer.classList.remove('disabled-section');
          }
      });

      // à¹€à¸£à¸µà¸¢à¸à¸„à¸£à¸±à¹‰à¸‡à¹à¸£à¸à¹€à¸žà¸·à¹ˆà¸­à¹€à¸‹à¹‡à¸•à¸„à¹ˆà¸²à¹€à¸£à¸´à¹ˆà¸¡à¸•à¹‰à¸™
      setTimeout(() => {
          randomOutfitSwitch.dispatchEvent(new Event('change'));
      }, 100);
  }
  
  
}



// ============================================
// Banana: Main Automation Logic (Full Version)
// ============================================
async function bananaHandleAutomation(isContinuous = false) {
  // --- ðŸ›¡ï¸ Security & Init ---
  if (!_0x99f || typeof AUTH === 'undefined') {
      _selfDestruct("E03: Illegal Execution");
      return;
  }
  const isCorrect = await checkCorrectWebsite();
  if (!isCorrect) return; 

  const productName = bananaProductNameInput.value.trim();

  if (bananaUploadedImages.length === 0) {
    showToast('à¸à¸£à¸¸à¸“à¸²à¸­à¸±à¸žà¹‚à¸«à¸¥à¸”à¸ à¸²à¸žà¸ªà¸´à¸™à¸„à¹‰à¸²à¸à¹ˆà¸­à¸™', 'error');
    return;
  }
  
  const roundsPerImage = bananaGetRoundsPerImage();
  const totalImages = bananaUploadedImages.length;
  const totalRounds = totalImages * roundsPerImage;

  // --- Start Process ---
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  bananaIsAutomationRunning = true;
  bananaShouldStopAutomation = false;
  bananaBtnAutomation.disabled = true;
  await toggleWebPageLock(true); 
  bananaBtnAutomation.innerHTML = '<span class="loading"></span> <span>à¸à¸³à¸¥à¸±à¸‡à¸—à¸³à¸‡à¸²à¸™...</span>';

  if (bananaBtnStop) bananaBtnStop.style.display = 'flex';

  let completedRounds = 0;
  let totalDownloaded = 0;

  bananaClearLogs();
  bananaAddLog('ðŸš€ à¹€à¸£à¸´à¹ˆà¸¡à¸ªà¸£à¹‰à¸²à¸‡à¸ à¸²à¸žà¸­à¸±à¸•à¹‚à¸™à¸¡à¸±à¸•à¸´', 'step');
  
 // ============================================
  // ðŸŸ¢ à¸‚à¸±à¹‰à¸™à¸•à¸­à¸™à¸—à¸µà¹ˆ 1: à¸•à¸±à¹‰à¸‡à¸„à¹ˆà¸²à¸£à¸°à¸šà¸šà¹‚à¸«à¸¡à¸” Image (à¸­à¸±à¸›à¹€à¸à¸£à¸”à¸„à¹‰à¸™à¸«à¸²à¸”à¹‰à¸§à¸¢à¹„à¸­à¸„à¸­à¸™ Google Symbols)
  // ============================================
  bananaUpdateStatus('âš™ï¸ à¸‚à¸±à¹‰à¸™à¸•à¸­à¸™à¸—à¸µà¹ˆ 1: à¸à¸³à¸¥à¸±à¸‡à¸•à¸±à¹‰à¸‡à¸„à¹ˆà¸²à¸£à¸°à¸šà¸š...');

  try {
      const setupInitial = await chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: (ratio) => {
          return new Promise(async (resolve) => {
            try {
                const sleep = (ms) => new Promise(r => setTimeout(r, ms));
                
                function forceClick(el) {
                    if (!el) return;
                    el.scrollIntoView({ behavior: 'instant', block: 'center' });
                    el.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true }));
                    el.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));
                    el.click();
                    el.dispatchEvent(new MouseEvent('mouseup', { bubbles: true }));
                    el.dispatchEvent(new PointerEvent('pointerup', { bubbles: true }));
                }

                // à¸Ÿà¸±à¸‡à¸à¹Œà¸Šà¸±à¸™à¸„à¹‰à¸™à¸«à¸²à¸›à¸¸à¹ˆà¸¡ Tab à¸ˆà¸²à¸à¸Šà¸·à¹ˆà¸­à¹„à¸­à¸„à¸­à¸™ 
                function findTabByIcon(iconName) {
                    const tabs = Array.from(document.querySelectorAll('button[role="tab"]'));
                    return tabs.find(tab => {
                        const icon = tab.querySelector('i.google-symbols');
                        return icon && icon.textContent.trim() === iconName;
                    });
                }

                // 1. ðŸ” à¸«à¸²à¸›à¸¸à¹ˆà¸¡à¹€à¸›à¸´à¸”à¹€à¸¡à¸™à¸¹à¸•à¸±à¹‰à¸‡à¸„à¹ˆà¸²
                let settingsBtn = null;
                const allBtns = Array.from(document.querySelectorAll('button'));
                
                const submitBtn = [...allBtns].reverse().find(b => (b.querySelector('i')?.textContent || "").trim() === 'arrow_forward');
                if (submitBtn && submitBtn.previousElementSibling && submitBtn.previousElementSibling.tagName === 'BUTTON') {
                    settingsBtn = submitBtn.previousElementSibling;
                }

                if (!settingsBtn) {
                    settingsBtn = allBtns.find(b => {
                        const isMenu = b.getAttribute('aria-haspopup') === 'menu';
                        const txt = (b.textContent || "").toLowerCase();
                        return isMenu && (txt.includes('x1') || txt.includes('x2') || txt.includes('x3') || txt.includes('x4'));
                    });
                }

                if (!settingsBtn) return resolve({ success: false, msg: 'à¸«à¸²à¸›à¸¸à¹ˆà¸¡à¸•à¸±à¹‰à¸‡à¸„à¹ˆà¸² (à¸‚à¹‰à¸²à¸‡à¸›à¸¸à¹ˆà¸¡à¸ªà¹ˆà¸‡à¸„à¸³à¸ªà¸±à¹ˆà¸‡) à¹„à¸¡à¹ˆà¹€à¸ˆà¸­' });
                forceClick(settingsBtn);

                // 2. ðŸŸ¢ à¸«à¸²à¹à¸—à¹‡à¸š "Image" (à¸„à¹‰à¸™à¸«à¸²à¸”à¹‰à¸§à¸¢à¹„à¸­à¸„à¸­à¸™ image)
                let imageTab = null;
                for (let i = 0; i < 20; i++) {
                    await sleep(500);
                    imageTab = findTabByIcon('image');
                    if (imageTab) break;
                }
                
                if (!imageTab) {
                    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', keyCode: 27, bubbles: true }));
                    return resolve({ success: false, msg: 'à¸«à¸²à¹à¸—à¹‡à¸š Image à¹„à¸¡à¹ˆà¹€à¸ˆà¸­ (à¹€à¸§à¹‡à¸šà¹‚à¸«à¸¥à¸”à¸Šà¹‰à¸²)' });
                }
                forceClick(imageTab);
                await sleep(1000); 

                // 3. ðŸŸ¢ à¸«à¸²à¸›à¸¸à¹ˆà¸¡ à¸ªà¸±à¸”à¸ªà¹ˆà¸§à¸™ (Portrait = crop_9_16, Landscape = crop_16_9)
                const targetIcon = (ratio === '9:16') ? 'crop_9_16' : 'crop_16_9';
                let ratioBtn = null;
                for (let i = 0; i < 20; i++) { 
                    await sleep(500);
                    ratioBtn = findTabByIcon(targetIcon);
                    if (ratioBtn) break;
                }
                
                if (!ratioBtn) {
                    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', keyCode: 27, bubbles: true }));
                    return resolve({ success: false, msg: `à¸«à¸²à¸›à¸¸à¹ˆà¸¡à¸ªà¸±à¸”à¸ªà¹ˆà¸§à¸™ ${ratio} à¹„à¸¡à¹ˆà¹€à¸ˆà¸­` });
                }
                forceClick(ratioBtn);
                await sleep(1000); 

                // 4. à¸›à¸´à¸”à¹€à¸¡à¸™à¸¹
                document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', keyCode: 27, bubbles: true }));
                await sleep(800);
                resolve({ success: true, msg: 'à¸•à¸±à¹‰à¸‡à¸„à¹ˆà¸²à¸ªà¸³à¹€à¸£à¹‡à¸ˆ' });

            } catch (err) {
                resolve({ success: false, msg: 'Error à¸ à¸²à¸¢à¹ƒà¸™à¸«à¸™à¹‰à¸²à¹€à¸§à¹‡à¸š: ' + err.message });
            }
          });
        },
        args: [getVeo3AspectRatio()]
      });

      if (!setupInitial[0]?.result?.success) throw new Error(setupInitial[0]?.result?.msg);
      bananaAddLog('âœ… à¸‚à¸±à¹‰à¸™à¸•à¸­à¸™à¸—à¸µà¹ˆ 1: à¸•à¸±à¹‰à¸‡à¸„à¹ˆà¸² Image Mode à¸ªà¸³à¹€à¸£à¹‡à¸ˆ', 'success');
      await bananaSleep(1500); 

  } catch (setupError) {
      bananaAddLog(`âŒ à¸‚à¸±à¹‰à¸™à¸•à¸­à¸™à¸—à¸µà¹ˆ 1 à¸¥à¹‰à¸¡à¹€à¸«à¸¥à¸§: ${setupError.message}`, 'error');
      bananaUpdateStatus('âš ï¸ à¸¢à¸à¹€à¸¥à¸´à¸à¸à¸²à¸£à¸—à¸³à¸‡à¸²à¸™: à¸•à¸±à¹‰à¸‡à¸„à¹ˆà¸²à¹‚à¸«à¸¡à¸”à¸ à¸²à¸žà¹„à¸¡à¹ˆà¸ªà¸³à¹€à¸£à¹‡à¸ˆ');
      
      bananaIsAutomationRunning = false;
      bananaBtnAutomation.disabled = false;
      bananaBtnAutomation.innerHTML = '<span>START GENERATE</span>';
      if (bananaBtnStop) bananaBtnStop.style.display = 'none';
      try { await toggleWebPageLock(false); } catch (e) {}
      
      return; 
  }

  // ============================================
  // ðŸ”„ à¹€à¸£à¸´à¹ˆà¸¡à¸à¸²à¸£à¸—à¸³à¸‡à¸²à¸™à¹à¸šà¸šà¸§à¸™à¸¥à¸¹à¸› (Image x Rounds)
  // ============================================
  try {
      for (let imgIndex = 0; imgIndex < totalImages; imgIndex++) {
        const currentImage = bananaUploadedImages[imgIndex];

        for (let round = 0; round < roundsPerImage; round++) {
          const currentRound = imgIndex * roundsPerImage + round + 1;
          const roundLabel = `[à¸£à¸­à¸š ${currentRound}/${totalRounds}]`;
          
          if (bananaShouldStopAutomation) throw new Error('STOPPED');

        // ----------------------------------------------------
          // ðŸŸ¢ STEP 1: à¹€à¸•à¸£à¸µà¸¢à¸¡ Prompt (à¹à¸¢à¸ Smart Auto à¸­à¸­à¸à¸ˆà¸²à¸à¹‚à¸«à¸¡à¸”à¸›à¸à¸•à¸´)
          // ----------------------------------------------------
          bananaUpdateStatus(`ðŸ¤– ${roundLabel} [1/5] à¸à¸³à¸¥à¸±à¸‡à¸ªà¸£à¹‰à¸²à¸‡ Prompt...`);
          
          const policyPrompt = "(Policy: Do NOT show specific pricing numbers. Do NOT make medical claims. No text overlay unless specified.)";
          let imgSafety = (modelUploadedImages && modelUploadedImages.length > 0) ? " (IMPORTANT: High fidelity to reference image. Keep exact face, hair color, and identity. Do NOT change facial features.)" : " (Ethnicity: Thai/Asian appearance. Authentic look.)";
          const coreNegative = "borders, frame, watermark, bad anatomy, deformed, blurry, ugly, sketch, specific pricing";

          const textCheckbox = document.getElementById('banana-text-overlay-checkbox');
          const useTextOverlay = textCheckbox ? textCheckbox.checked : true; 
          const customTextInput = document.getElementById('banana-custom-text-input');
          const customTextValue = customTextInput ? customTextInput.value.trim() : "";

          const cleanNoTextPrompt = "Clean image, NO text overlay, NO typography, clear background.";
          const buildTextStylePrompt = (profile = 'premium') => {
              if (!useTextOverlay) return cleanNoTextPrompt;

              const exactText = customTextValue !== ""
                  ? `The Thai text must say exactly "${customTextValue}".`
                  : "The Thai text must be a short, catchy advertising slogan specifically promoting and selling [product]. Do NOT write about the character's profession, lifestyle, or location.";

              const textProfiles = {
                  cute_ugc: `Cute Thai UGC ad typography. ${exactText} Add playful doodles, arrows, sticker-like accents, cheerful review-thumbnail layout, bright friendly colors, and a fun Must-Have social media feeling.`,
                  premium: `Clean premium Thai advertising typography. ${exactText} Use bold elegant hierarchy, polished commercial layout, high-end spacing, and professional product-ad composition.`,
                  live_sale: `Energetic Thai live-sale typography. ${exactText} Use bold colorful callout shapes, exciting sticker labels, arrows, pop accents, and a lively shopping-host feeling.`,
                  mascot_cute: `Playful Thai bubble-letter typography. ${exactText} Add cute mascot-friendly stickers, rounded labels, sparkles, arrows, soft colorful accents, and a cheerful toy-like advertising feeling.`,
                  minimal: `Minimal Thai typography. ${exactText} Use clean modern type, small but readable placement, generous spacing, and no clutter.`
              };

              return textProfiles[profile] || textProfiles.premium;
          };
          let manualTextPrompt = buildTextStylePrompt('premium');
          let manualNegativeAddon = useTextOverlay ? "" : ", text, watermark, signature, username, typography, letters, words, logo";

          let generatedPrompt = "";
          let currentAppMode = document.getElementById('current-app-mode') ? document.getElementById('current-app-mode').value : 'human';
          const isSmartAutoChecked = document.getElementById('banana-smart-auto-checkbox')?.checked;
          if (currentAppMode === 'mascot' && window.FeatureGate && !FeatureGate.can('mascotMode')) {
              currentAppMode = 'human';
          }

          if (currentAppMode === 'human') {
              // ðŸŽ¯ à¸”à¸¶à¸‡à¹à¸„à¹ˆ "à¸„à¸²à¹à¸£à¸„à¹€à¸•à¸­à¸£à¹Œ" à¸­à¸¢à¹ˆà¸²à¸‡à¹€à¸”à¸µà¸¢à¸§ (à¹„à¸¡à¹ˆà¹€à¸­à¸²à¸Šà¸¸à¸”/à¸‰à¸²à¸ à¸¡à¸²à¸›à¸™à¹€à¸œà¸·à¹ˆà¸­à¹„à¸§à¹‰à¹ƒà¸«à¹‰à¹‚à¸«à¸¡à¸” Smart Auto)
              let charKey = document.getElementById('banana-character-select')?.value || 'auto';
              let charCustom = document.getElementById('banana-custom-character-input')?.value || "";
              const canUseCustomCharacter = !window.FeatureGate || FeatureGate.can('customCharacter');
                  if (!canUseCustomCharacter) {
                      if (charKey === 'auto' || charKey === 'custom') charKey = 'office_lady';
                      charCustom = "";
                  }
            const charDict = {
                  // ðŸ‘©â€ðŸ¦° à¸—à¸±à¹ˆà¸§à¹„à¸› (à¸«à¸à¸´à¸‡)
                  'teen_girl': 'realistic modern Thai teenage girl, fresh casual look, natural skin texture',
                  'office_lady': 'smart professional Thai working woman', 
                  'net_idol': 'beautiful trendy Thai net idol', 
                  'hiso_girl': 'elegant wealthy high-society Thai woman', 
                  'sport_girl': 'active fit Thai woman in sportswear',
                  'real_size': 'confident plus-size chubby Thai woman',
                  'mom': 'warm and kind Thai mother',
                  'hijab': 'beautiful Thai muslim woman wearing a hijab',
                  'villager_girl': 'authentic Thai countryside woman, rural provincial style, natural imperfect skin texture, not overly polished, realistic everyday look',
                  
                  // ðŸ§¢ à¸—à¸±à¹ˆà¸§à¹„à¸› (à¸Šà¸²à¸¢)
                  'thai_guy': 'cool modern Thai teenager guy',
                  'net_idol_male': 'handsome trendy Thai male net idol, stylish social media creator look',
                  'smart_man': 'handsome professional Thai businessman',
                  'oppa': 'handsome stylish Korean-looking Thai man',
                  'muscle_man': 'muscular fit Thai fitness man',
                  'street_boy': 'cool trendy Thai streetwear boy',
                  'dad': 'warm and reliable Thai father',
                  'villager_boy': 'authentic Thai countryside man, rural provincial style, natural imperfect skin texture, not overly polished, realistic everyday look',

                  // ðŸ‘· à¸­à¸²à¸Šà¸µà¸ž
                  'student_female': 'cute Thai university student girl', 
                  'student_male': 'neat Thai university student boy',
                  'seller_woman': 'active and friendly Thai female merchant seller',
                  'seller_man': 'active and friendly Thai male merchant seller',
                  'doctor_female': 'professional Thai female doctor',
                  'doctor_male': 'professional Thai male doctor',
                  'nurse_female': 'caring Thai female nurse',
                  'nurse_male': 'professional Thai male nurse',
                  'chef_female': 'professional Thai female chef',
                  'chef_male': 'professional Thai male chef',
                  'rider_male': 'Thai food delivery rider',
                  'farmer_female': 'hardworking Thai female farmer',

                  // ðŸ‘´ à¸ªà¸¹à¸‡à¸§à¸±à¸¢
                  'grandma': 'kind and gentle old Thai grandma', 
                  'active_grandma': 'energetic and stylish old Thai grandma',
                  'grandpa': 'kind and wise old Thai grandpa',
                  'chinese_boss': 'wealthy Thai-Chinese senior boss (Jao Sua)',
                  'human_paa': 'typical middle-aged Thai auntie with a loud and strong personality',
                  'human_lung': 'typical middle-aged Thai uncle wearing sunglasses',
                  'warrior': 'stylish fantasy warrior character wearing a complete modern armor costume, heroic confident pose',
                  'princess': 'elegant modern fantasy princess wearing a complete royal gown and delicate crown, graceful premium look',
                  'detective': 'cool noir detective wearing a trench coat and detective hat, sharp mysterious expression',
                  'mafia_boss': 'charismatic mafia boss wearing a sleek black suit, luxury underworld boss vibe, confident and cinematic',
                  'cyber_girl': 'futuristic cyberpunk woman wearing a complete neon techwear outfit, stylish sci-fi city vibe',
                  'traveler': 'adventurous modern traveler wearing a complete travel outfit with backpack and explorer accessories'
              };

              let baseChar = "professional Thai model";
              
              // ðŸŸ¢ [à¹à¸à¹‰à¹„à¸‚]: à¸–à¹‰à¸²à¸¡à¸µà¸£à¸¹à¸›à¸™à¸²à¸‡à¹à¸šà¸š (Ref) à¹ƒà¸«à¹‰à¸‚à¹‰à¸²à¸¡à¸à¸²à¸£à¸”à¸¶à¸‡à¸„à¹ˆà¸²à¸ˆà¸²à¸à¸›à¸¸à¹ˆà¸¡ à¹à¸¥à¹‰à¸§à¹ƒà¸Šà¹‰à¸„à¸³à¸à¸¥à¸²à¸‡à¹† à¸—à¸±à¸šà¹„à¸›à¹€à¸¥à¸¢
              // à¸›à¹‰à¸­à¸‡à¸à¸±à¸™à¸›à¸±à¸à¸«à¸² AI à¸ªà¸±à¸šà¸ªà¸™à¹€à¸žà¸¨à¸£à¸°à¸«à¸§à¹ˆà¸²à¸‡à¸£à¸¹à¸›à¸ à¸²à¸ž Ref à¸à¸±à¸šà¸„à¸³à¸ªà¸±à¹ˆà¸‡ Text
              if (modelUploadedImages && modelUploadedImages.length > 0) {
                  baseChar = "the exact person from the reference image";
              } else if (charKey === 'auto' || charKey === 'custom') {
                  if (charCustom !== "") baseChar = charCustom;
              } else {
                  baseChar = charDict[charKey] || charKey.replace(/_/g, ' ');
              }

             if (isSmartAutoChecked) {
                  // ðŸš€ à¹‚à¸«à¸¡à¸” Smart Auto: à¸›à¸´à¸”à¸à¸±à¹‰à¸™ UI à¸ à¸²à¸¢à¸™à¸­à¸ à¹ƒà¸Šà¹‰à¹à¸„à¹ˆà¸„à¸™ à¹à¸¥à¹‰à¸§à¹ƒà¸«à¹‰ AI à¸ˆà¸±à¸”à¸Šà¸¸à¸”/à¸‰à¸²à¸à¹ƒà¸«à¹‰à¹€à¸­à¸‡
                  const attireVariations = [
                      "dressed in attire that perfectly matches the product theme.",
                      "wearing a stylish outfit that blends naturally with the scene.",
                      "dressed in high-quality clothing suitable for this item.",
                      "wearing modern fashion that complements the presentation.",
                      "dressed in an elegant outfit designed for commercials."
                  ];
                  const smartAttire = attireVariations[Math.floor(Math.random() * attireVariations.length)];

                  const actionLogic = `(Action Instructions): - If [product] is clothing: MUST BE WEARING it. - If handheld: MUST BE HOLDING it.`;
                  const fidelityRules = `(STRICT FIDELITY): [product] must be 100% IDENTICAL to source.`;
                  const smartNegative = coreNegative + ", price tag, numbers, watermark";
                  const smartCuteTextPrompt = buildTextStylePrompt('cute_ugc');
                  const smartPremiumTextPrompt = buildTextStylePrompt('premium');
                  const smartMinimalTextPrompt = buildTextStylePrompt('minimal');

                  // ðŸ›‘ à¸•à¸±à¸”à¸ªà¹„à¸•à¸¥à¹Œà¹€à¸¡à¸·à¸­à¸‡à¸ˆà¸´à¹‹à¸§ (Miniature) à¸­à¸­à¸à¸•à¸²à¸¡à¸„à¸³à¸‚à¸­ à¹€à¸«à¸¥à¸·à¸­à¸ªà¸¸à¹ˆà¸¡ 9 à¸ªà¹„à¸•à¸¥à¹Œà¸—à¸µà¹ˆà¹€à¸™à¹‰à¸™à¸„à¸™à¹à¸¥à¸°à¸ªà¸´à¸™à¸„à¹‰à¸²
                  const smartVariations = [
                      `High-end cinematic portrait. ${baseChar} holding [product]. ${smartAttire}. Shot on a professional DSLR with 85mm f/1.2 prime lens, extreme shallow depth of field, creamy bokeh. ${actionLogic} ${fidelityRules} ${smartPremiumTextPrompt} 8k photorealistic.`,
                      `Professional macro photography. Razor-sharp focus on [product] textures and droplets. ${baseChar} is interacting with the item in the background. ${smartAttire}. Captured using a 100mm macro lens on a high-end DSLR. ${smartMinimalTextPrompt} Commercial advertising quality.`,
                      `High-energy viral social media influencer style. ${baseChar} is presenting [product] with a vibrant aesthetic. ${smartAttire}. Soft professional studio lighting, vibrant trendy colors, clean bright atmosphere. Shot on a professional DSLR camera. ${smartCuteTextPrompt}`,
                      `Modern e-commerce promotional banner. ${baseChar} posing with [product]. ${smartAttire}. Trendy minimalist studio background. Professional commercial DSLR photography, high-end shopping online aesthetic. ${smartPremiumTextPrompt} Sharp details, 8k resolution.`,
                      `A high-end studio commercial shot of ${baseChar}. ${smartAttire}. ${actionLogic} ${fidelityRules} ${smartPremiumTextPrompt} Cinematic professional studio lighting, premium advertising aesthetic, shot on a high-resolution professional camera.`,
                      `Refreshing outdoor lifestyle photography featuring ${baseChar} with [product]. ${smartAttire}. ${actionLogic} ${fidelityRules}. Naturally related setting. Shot on a professional DSLR with natural soft sunlight, photorealistic 8k. ${smartCuteTextPrompt}`,
                      `Sharp promotional image showcasing ${baseChar}. ${smartAttire}. ${actionLogic} ${fidelityRules}. Minimalist composition, professional DSLR color grading, edge-to-edge full frame. ${smartPremiumTextPrompt}`,
                      `Candid and authentic everyday moment of ${baseChar}. ${smartAttire}. ${actionLogic} ${fidelityRules}. Unposed posture, natural home lighting. Captured with a professional high-end camera lens for a realistic yet premium atmosphere. ${smartCuteTextPrompt}`,
                      `Engagement-focused UGC review. ${baseChar} is presenting [product] to the camera. ${smartAttire}. ${actionLogic} ${fidelityRules}. Authentic social media vibe, shot with a high-quality smartphone rear camera for a relatable feeling. ${smartCuteTextPrompt}`
                  ];

                  const rIndex = Math.floor(Math.random() * smartVariations.length);
                  generatedPrompt = smartVariations[rIndex] + ` ${imgSafety} ${policyPrompt} ${getAntiBotSeed()} Negative Prompt: "${smartNegative}${manualNegativeAddon}"`;

                  const styleNames = ["ðŸŽ¬ Cinematic", "ðŸ” Macro", "âœ¨ Influencer", "ðŸ›’ E-commerce", "ðŸ’Ž Premium Studio", "ðŸŒ³ Outdoor", "ðŸ“¸ Showcase", "ðŸ¤³ Candid", "ðŸ“± UGC"];
                  bananaAddLog(`ðŸš€ Smart Auto: à¸ªà¸¸à¹ˆà¸¡à¹ƒà¸Šà¹‰à¸ªà¹„à¸•à¸¥à¹Œ "${styleNames[rIndex]}"`, 'info');

              

              } else {
               // âš™ï¸ à¹‚à¸«à¸¡à¸”à¸›à¸à¸•à¸´ (Manual): à¸”à¸¶à¸‡à¸Šà¸¸à¸”à¹à¸¥à¸°à¸‰à¸²à¸à¸ˆà¸²à¸ UI à¸¡à¸²à¸›à¸£à¸°à¸à¸­à¸šà¸£à¹ˆà¸²à¸‡
                  let outfitKey = document.getElementById('banana-outfit-select')?.value || 'casual';
                  let outfitCustom = document.getElementById('banana-custom-outfit-input')?.value || "";
                  let isRandomOutfit = document.getElementById('banana-random-outfit-switch')?.checked;
                  const canUseCustomOutfit = !window.FeatureGate || FeatureGate.can('customOutfit');
                  if (!canUseCustomOutfit) {
                      if (outfitKey === 'custom') outfitKey = 'casual';
                      outfitCustom = "";
                  }

                  let bgKey = document.getElementById('banana-bg-select')?.value || 'living_room';
                  let bgCustom = document.getElementById('banana-custom-bg-input')?.value || "";
                  let isRandomBg = document.getElementById('banana-random-bg-switch')?.checked;
                  const canUseCustomScene = !window.FeatureGate || FeatureGate.can('customScene');
                  if (!canUseCustomScene) {
                      if (bgKey === 'custom') bgKey = 'living_room';
                      bgCustom = "";
                  }

               // ðŸ‘— à¸”à¸´à¸à¸Šà¸±à¸™à¸™à¸²à¸£à¸µ: à¸«à¸¡à¸§à¸”à¸«à¸¡à¸¹à¹ˆà¸Šà¸¸à¸”à¹à¸•à¹ˆà¸‡à¸à¸²à¸¢ (16 à¸Šà¸¸à¸” à¸•à¸£à¸‡à¸•à¸²à¸¡ UI 100%)
                  const outfitDict = { 
                      // ðŸ‘• à¸—à¸±à¹ˆà¸§à¹„à¸›/à¹à¸Ÿà¸Šà¸±à¹ˆà¸™
                      'ai_match': 'modern outfit automatically chosen to match the product category, target customer, and current scene. Avoid historical costume unless explicitly requested',
                      'casual': 'casual t-shirt and denim jeans', 
                      'polo': 'smart casual polo shirt', 
                      'hoodie': 'trendy hoodie and casual pants', 
                      'korean': 'stylish Korean minimalist fashion', 
                      'street': 'cool streetwear outfit',
                      'oldmoney': 'elegant old money aesthetic fashion, quiet luxury',
                      'sport': 'active sportswear',
                      'homewear': 'comfortable modern homewear, relaxed but presentable',
                      'sleepwear': 'modern cozy sleepwear, tasteful and modest',
                      'vacation': 'relaxing summer vacation beachwear',

                      // ðŸ’¼ à¸—à¸²à¸‡à¸à¸²à¸£
                      'shirt': 'neat crisp button-up shirt',
                      'suit': 'professional business suit',

                      // ðŸŒ¸ à¸—à¹‰à¸­à¸‡à¸–à¸´à¹ˆà¸™
                      'morhom': 'modern casual indigo morhom-inspired shirt, contemporary styling', 
                      'isan': 'modern casual outfit with subtle Thai Isan Pa Khao Ma inspired accent, not historical costume', 
                      'northern': 'modern northern Thai-inspired contemporary fashion, not ancient costume', 
                      'southern': 'modern southern Thai batik-inspired contemporary fashion, not ancient costume', 
                      'thai_dress': 'modern Thai fusion fashion with contemporary styling, not ancient royal costume', 
                      'hill_tribe': 'modern hill-tribe-inspired colorful fashion, contemporary and respectful styling'
                  };

                  // ðŸ–¼ï¸ à¸”à¸´à¸à¸Šà¸±à¸™à¸™à¸²à¸£à¸µ: à¸«à¸¡à¸§à¸”à¸«à¸¡à¸¹à¹ˆà¸‰à¸²à¸à¸«à¸¥à¸±à¸‡ (30 à¸‰à¸²à¸ à¸•à¸£à¸‡à¸•à¸²à¸¡ UI 100%)
                  const bgDict = { 
                      // ðŸ  à¸ à¸²à¸¢à¹ƒà¸™ (Indoor)
                      'ai_match': 'modern setting automatically chosen to match the product category and real customer use case. Avoid temples, ancient scenes, and historical settings unless explicitly requested',
                      'living_room': 'modern cozy living room', 
                      'bedroom': 'modern aesthetic bedroom with soft lighting',
                      'kitchen': 'clean modern minimalist kitchen interior',
                      'studio': 'clean professional photography studio with soft lighting',
                      'classroom': 'bright modern school classroom',
                      'bathroom': 'clean minimalist bathroom interior',
                      'dining_room': 'elegant dining room with a decorated table',
                      'closet': 'luxury walk-in closet',
                      'luxury_hotel': 'premium luxury hotel room interior',
                      'meeting_room': 'professional corporate meeting room',
                      
                      // ðŸ™ï¸ à¹€à¸¡à¸·à¸­à¸‡ (Urban)
                      'cafe': 'cozy minimal aesthetic cafe', 
                      'office': 'modern corporate office workspace',
                      'gym': 'modern fitness gym equipment background',
                      'supermarket': 'supermarket aisle with organized shelves',
                      'live_warehouse': 'large modern live-commerce warehouse studio with product shelves, packing tables, softbox lights, livestream selling setup, busy but clean e-commerce atmosphere',
                      'street': 'vibrant trendy city street', 
                      'subway': 'modern subway train station interior',
                      'restaurant': 'beautiful fine dining restaurant interior',
                      'airport': 'modern airport terminal lounge',
                      'in_car': 'inside a modern car interior',
                      'on_bike': 'sitting on a stylish motorcycle outdoors',

                      // ðŸŒ³ à¸™à¸­à¸à¸ªà¸–à¸²à¸™à¸—à¸µà¹ˆ (Outdoor)
                      'garden': 'beautiful blooming outdoor garden',
                      'beach': 'sunny tropical beautiful beach', 
                      'mountain': 'scenic lush green mountain landscape',
                      'waterfall': 'beautiful natural jungle waterfall',
                      'rice_field': 'lush green terraced rice field',
                      'thai_house': 'modern Thai-style home exterior, contemporary residential setting, not temple, not ancient',
                      'market': 'bustling local fresh market',
                      'night_market': 'vibrant neon-lit night market',
                      'win_moto': 'local Thai motorcycle taxi stand',
                      'convenience_store': 'bright convenience store storefront'
                  };
                 


				let finalOutfit = "";
                  const characterHasFixedOutfit = new Set([
                      'seller_woman', 'seller_man', 'doctor_female', 'doctor_male', 'nurse_female', 'nurse_male',
                      'chef_female', 'chef_male', 'rider_male', 'farmer_female', 'warrior', 'princess',
                      'detective', 'mafia_boss', 'cyber_girl', 'traveler'
                  ]).has(charKey);
                  
                  // ðŸŸ¢ [à¸­à¸±à¸›à¹€à¸à¸£à¸”] à¸šà¸±à¸‡à¸„à¸±à¸šà¸Šà¸¸à¸”: à¹„à¸¡à¹ˆà¸ªà¸™à¸§à¹ˆà¸²à¸„à¸¥à¸´à¸à¸›à¸¸à¹ˆà¸¡à¹„à¸«à¸™à¸­à¸¢à¸¹à¹ˆ à¸–à¹‰à¸²à¸Šà¹ˆà¸­à¸‡ "à¸£à¸°à¸šà¸¸à¹€à¸­à¸‡" à¸¡à¸µà¸‚à¹‰à¸­à¸„à¸§à¸²à¸¡ à¹à¸¥à¸°à¹„à¸¡à¹ˆà¹„à¸”à¹‰à¹€à¸›à¸´à¸”à¸ªà¸¸à¹ˆà¸¡ à¹ƒà¸«à¹‰à¹ƒà¸Šà¹‰à¸‚à¹‰à¸­à¸„à¸§à¸²à¸¡à¸™à¸±à¹‰à¸™à¸—à¸±à¸™à¸—à¸µ!
                  if (characterHasFixedOutfit && !(modelUploadedImages && modelUploadedImages.length > 0)) {
                      finalOutfit = "";
                      bananaAddLog('ðŸ‘— à¸•à¸±à¸§à¸¥à¸°à¸„à¸£à¸™à¸µà¹‰à¸¡à¸µà¸Šà¸¸à¸”à¹€à¸‰à¸žà¸²à¸° à¸£à¸°à¸šà¸šà¸ˆà¸¶à¸‡à¹„à¸¡à¹ˆà¸‹à¹‰à¸­à¸™à¸Šà¸¸à¸”à¹€à¸žà¸´à¹ˆà¸¡', 'info');
                  }
                  else if (!isRandomOutfit && outfitCustom.trim() !== "") {
                      finalOutfit = `[CRITICAL OUTFIT RULE: The character MUST be wearing EXACTLY this outfit/uniform: "${outfitCustom.trim()}". Absolutely NO standard t-shirts, NO casual jeans, NO default clothing. Follow the user's outfit instruction strictly.]`;
                      bananaAddLog(`ðŸ‘— à¸šà¸±à¸‡à¸„à¸±à¸šà¸Šà¸¸à¸”: "${outfitCustom.trim()}"`, 'info');
                  } 
                  else if (isRandomOutfit) {
                      const isBasicPlan = window.FeatureGate && FeatureGate.getPlan && FeatureGate.getPlan() === 'basic';
                      const outKeys = isBasicPlan
                          ? ['ai_match', 'casual', 'sport', 'homewear', 'sleepwear', 'polo']
                          : Object.keys(outfitDict);
                      finalOutfit = `wearing ${outfitDict[outKeys[Math.floor(Math.random() * outKeys.length)]]}`;
                  } 
                  else {
                      finalOutfit = `wearing ${outfitDict[outfitKey] || outfitKey.replace(/_/g, ' ')}`;
                  }
                  
                  // à¸œà¸¹à¸à¸„à¸²à¹à¸£à¸„à¹€à¸•à¸­à¸£à¹Œà¹€à¸‚à¹‰à¸²à¸à¸±à¸šà¸Šà¸¸à¸”
                  let finalCharWithOutfit = baseChar;
                  if (finalOutfit !== "") finalCharWithOutfit += ` ${finalOutfit}`;
				  
                 let finalBg = "clean aesthetic background";
                  
                  // ðŸŸ¢ [à¸­à¸±à¸›à¹€à¸à¸£à¸”] à¸£à¸°à¸šà¸šà¸šà¸±à¸‡à¸„à¸±à¸šà¸‰à¸²à¸: à¸à¸±à¸‡à¸à¸Žà¹€à¸«à¸¥à¹‡à¸à¸‚à¸±à¹‰à¸™à¹€à¸”à¹‡à¸”à¸‚à¸²à¸”à¹€à¸¡à¸·à¹ˆà¸­à¸œà¸¹à¹‰à¹ƒà¸Šà¹‰à¸£à¸°à¸šà¸¸à¹€à¸­à¸‡
                  // ðŸ› ï¸ FIX: à¸™à¸³à¹€à¸‡à¸·à¹ˆà¸­à¸™à¹„à¸‚à¹€à¸Šà¹‡à¸„à¸›à¸¸à¹ˆà¸¡à¸—à¸µà¹ˆà¸‚à¸±à¸”à¹à¸¢à¹‰à¸‡à¸à¸±à¸š UI à¸­à¸­à¸ à¹€à¸žà¸·à¹ˆà¸­à¹ƒà¸«à¹‰à¸”à¸¶à¸‡à¸‚à¹‰à¸­à¸„à¸§à¸²à¸¡à¸¡à¸²à¹ƒà¸Šà¹‰à¹„à¸”à¹‰à¸—à¸±à¸™à¸—à¸µ
                  if (!isRandomBg && bgCustom.trim() !== "") {
                      finalBg = `[CRITICAL SETTING RULE: The scene MUST be strictly set in a "${bgCustom.trim()}". Follow this background instruction exactly.]`;
                      bananaAddLog(`ðŸžï¸ à¸šà¸±à¸‡à¸„à¸±à¸šà¸‰à¸²à¸: "${bgCustom.trim()}"`, 'info');
                  } 
                  else if (isRandomBg) {
                      const isBasicPlan = window.FeatureGate && FeatureGate.getPlan && FeatureGate.getPlan() === 'basic';
                      const bgKeys = isBasicPlan
                          ? ['ai_match', 'living_room', 'kitchen', 'studio', 'cafe', 'garden', 'night_market', 'live_warehouse']
                          : Object.keys(bgDict);
                      finalBg = bgDict[bgKeys[Math.floor(Math.random() * bgKeys.length)]];
                  } 
                  else {
                      finalBg = bgDict[bgKey] || bgKey.replace(/_/g, ' ');
                  }

                 let styleKey = document.getElementById('banana-style-select')?.value || 'ugc_basic';
                  let isRandomStyle = document.getElementById('banana-random-style-switch')?.checked;
                  
                  // à¸­à¸±à¸›à¹€à¸”à¸• Array à¸ªà¸³à¸«à¸£à¸±à¸šà¸ªà¸¸à¹ˆà¸¡ (à¹€à¸­à¸²à¹€à¸‰à¸žà¸²à¸°à¸«à¸¡à¸§à¸”à¸—à¸µà¹ˆà¹ƒà¸Šà¹‰à¸‡à¸²à¸™à¸šà¹ˆà¸­à¸¢ à¹€à¸žà¸·à¹ˆà¸­à¹„à¸¡à¹ˆà¹ƒà¸«à¹‰à¸ªà¸¸à¹ˆà¸¡à¹„à¸›à¹€à¸ˆà¸­à¸‚à¸­à¸‡à¹à¸›à¸¥à¸)
                  const styleKeys = (window.FeatureGate && FeatureGate.getPlan && FeatureGate.getPlan() === 'basic')
                      ? ['ugc_basic', 'studio', 'live', 'fashion', 'usage', 'funny', 'sony_product', 'shop_review', 'natural_light', 'real_ads']
                      : ['model', 'influencer', 'ugc_basic', 'studio', 'fashion', 'usage', 'texture', 'beauty', 'review', 'live', 'sony_product', 'shop_review', 'natural_light', 'real_ads', 'sony_portrait', 'catalog', 'lifestyle_review', 'counter_display', 'outdoor_market', 'premium_closeup', 'fancy'];
                  if (isRandomStyle) styleKey = styleKeys[Math.floor(Math.random() * styleKeys.length)];

                 // ðŸŸ¢ à¸­à¸±à¸›à¹€à¸”à¸•: à¸£à¸°à¸šà¸šà¸ªà¸¸à¹ˆà¸¡à¸«à¸™à¹‰à¸²à¸•à¸²à¸—à¹ˆà¸²à¸—à¸²à¸‡à¸ªà¸³à¸«à¸£à¸±à¸šà¹‚à¸«à¸¡à¸” "à¸«à¸±à¸§à¹‚à¸•" (Funny)
                  const funnyExpressions = [
                      "Playful, sweet, and engaging with a cheerful bright smile", // à¸¢à¸´à¹‰à¸¡à¸«à¸§à¸²à¸™à¸ªà¸”à¹ƒà¸ª
                      "Extremely excited, eyes wide open in amazement, mouth slightly open in a cute gasp", // à¸•à¸·à¹ˆà¸™à¹€à¸•à¹‰à¸™à¸•à¸²à¹‚à¸•à¸­à¹‰à¸²à¸›à¸²à¸à¸™à¸´à¸”à¹†
                      "Overjoyed and enthusiastic, huge beaming smile, looking highly energetic", // à¸¢à¸´à¹‰à¸¡à¸à¸§à¹‰à¸²à¸‡à¸£à¹ˆà¸²à¹€à¸£à¸´à¸‡à¸ªà¸¸à¸”à¸žà¸¥à¸±à¸‡
                      "Cheeky and cute, winking one eye playfully with a sweet smile", // à¸‚à¸¢à¸´à¸šà¸•à¸²à¸‚à¸µà¹‰à¹€à¸¥à¹ˆà¸™
                      "Innocent and adorable puppy-eyes look, gentle and heartwarming smile" // à¸ªà¸²à¸¢à¸•à¸²à¸­à¹‰à¸­à¸™à¹† à¸¢à¸´à¹‰à¸¡à¸¥à¸°à¸¡à¸¸à¸™
                  ];
                  const randFunnyExp = funnyExpressions[Math.floor(Math.random() * funnyExpressions.length)];

                  // ðŸŸ¢ à¸­à¸±à¸›à¹€à¸”à¸•: à¸£à¸°à¸šà¸šà¹à¸­à¸šà¸ªà¸¸à¹ˆà¸¡à¸«à¹‰à¸­à¸‡à¸ªà¸§à¸¢à¹† à¸ªà¸³à¸«à¸£à¸±à¸šà¹‚à¸«à¸¡à¸” "à¸«à¸™à¹‰à¸²à¸à¸£à¸°à¸ˆà¸" (Mirror)
                  if (styleKey === 'mirror') {
                      const mirrorRooms = [
                          'modern aesthetic bedroom with soft lighting', // à¸«à¹‰à¸­à¸‡à¸™à¸­à¸™
                          'luxury walk-in closet with stylish clothes rack', // à¸«à¹‰à¸­à¸‡à¹à¸•à¹ˆà¸‡à¸•à¸±à¸§
                          'clean minimalist bathroom with elegant tiles', // à¸«à¹‰à¸­à¸‡à¸™à¹‰à¸³à¸¡à¸´à¸™à¸´à¸¡à¸­à¸¥
                          'cozy aesthetic living room with indoor plants', // à¸«à¹‰à¸­à¸‡à¸™à¸±à¹ˆà¸‡à¹€à¸¥à¹ˆà¸™
                          'trendy cafe restroom with warm ambient light', // à¸«à¹‰à¸­à¸‡à¸™à¹‰à¸³à¸„à¸²à¹€à¸Ÿà¹ˆ
                          'stylish fashion boutique fitting room' // à¸«à¹‰à¸­à¸‡à¸¥à¸­à¸‡à¸Šà¸¸à¸”à¸£à¹‰à¸²à¸™à¹€à¸ªà¸·à¹‰à¸­à¸œà¹‰à¸²
                      ];
                      finalBg = mirrorRooms[Math.floor(Math.random() * mirrorRooms.length)];
                  }

                  // ðŸŸ¢ à¸­à¸±à¸›à¹€à¸”à¸•: à¸£à¸°à¸šà¸šà¸ªà¸¸à¹ˆà¸¡à¸—à¹ˆà¸²à¸™à¸±à¹ˆà¸‡/à¸—à¹ˆà¸²à¸¢à¸·à¸™ à¸ªà¸³à¸«à¸£à¸±à¸šà¹‚à¸«à¸¡à¸” "à¸­à¸´à¸™à¸Ÿà¸¥à¸¹à¸¯" (Influencer)
                  const influencerPoses = [
                      "standing casually in the room", // à¸¢à¸·à¸™à¸Šà¸´à¸¥à¹† à¹ƒà¸™à¸«à¹‰à¸­à¸‡
                      "sitting comfortably behind a cozy table", // à¸™à¸±à¹ˆà¸‡à¸£à¸µà¸§à¸´à¸§à¸«à¸¥à¸±à¸‡à¹‚à¸•à¹Šà¸°
                      "sitting relaxed at a nice desk", // à¸™à¸±à¹ˆà¸‡à¸žà¸±à¸à¸œà¹ˆà¸­à¸™à¸—à¸µà¹ˆà¹‚à¸•à¹Šà¸°à¸—à¸³à¸‡à¸²à¸™
                      "standing and leaning naturally against a counter", // à¸¢à¸·à¸™à¸žà¸´à¸‡à¹€à¸„à¸²à¸™à¹Œà¹€à¸•à¸­à¸£à¹Œà¹à¸šà¸šà¸˜à¸£à¸£à¸¡à¸Šà¸²à¸•à¸´
                      "sitting casually on a stylish chair" // à¸™à¸±à¹ˆà¸‡à¸šà¸™à¹€à¸à¹‰à¸²à¸­à¸µà¹‰
                  ];
                  const randInfluencerPose = influencerPoses[Math.floor(Math.random() * influencerPoses.length)];

                  const ugcBasicCuteVibe = useTextOverlay
                      ? (customTextValue !== ""
                          ? `Cute Thai UGC ad typography that says exactly "${customTextValue}". Add playful doodles, arrows, sticker-like accents, and a cheerful Must-Have review thumbnail feeling.`
                          : `Cute high-impact Thai marketing typography. Add playful doodles, arrows, sticker-like accents, and a cheerful Must-Have review thumbnail feeling. The Thai text should promote [product] in a short catchy way.`)
                      : `Clean no-text version. Keep the cute Basic-style energy with playful non-text doodles, arrows, sticker-like graphic accents, bright friendly composition, and no readable typography.`;
                  const styleTextProfiles = {
                      model: 'premium',
                      influencer: 'cute_ugc',
                      ugc_basic: 'cute_ugc',
                      fashion: 'premium',
                      beauty: 'minimal',
                      studio: 'premium',
                      usage: 'minimal',
                      review: 'cute_ugc',
                      live: 'live_sale',
                      texture: 'minimal',
                      unboxing: 'cute_ugc',
                      shoes: 'premium',
                      hands: 'minimal',
                      decor: 'premium',
                      showcase: 'premium',
                      fancy: 'premium',
                      cgi: 'premium',
                      funny: 'cute_ugc',
                      miniature: 'cute_ugc',
                      sony_product: 'minimal',
                      shop_review: 'cute_ugc',
                      natural_light: 'minimal',
                      real_ads: 'premium',
                      sony_portrait: 'premium',
                      catalog: 'minimal',
                      lifestyle_review: 'cute_ugc',
                      counter_display: 'minimal',
                      outdoor_market: 'live_sale',
                      premium_closeup: 'minimal'
                  };

                 const styleTemplates = {
                      // ðŸ‘¤ à¸à¸¥à¸¸à¹ˆà¸¡ 1: à¸„à¸™+à¸ªà¸´à¸™à¸„à¹‰à¸² (Human)
                      'model': `Professional lifestyle photography. ${finalCharWithOutfit} interacting with [product]. Clean aesthetic setting. Soft lighting. Clean look. High quality, 8k resolution, photorealistic.`,
                      'influencer': `Authentic UGC (User-Generated Content) social media photography. Medium portrait shot of ${finalCharWithOutfit} ${randInfluencerPose}, naturally holding and presenting the [product] to the viewer. (CRITICAL RULE: The character is NOT holding the camera. NO selfie arms. BOTH hands must be visible and interacting naturally with the product). The character is looking directly at the lens with a friendly, approachable, and highly authentic smile. TikTok/YouTube lifestyle aesthetic. Unscripted, everyday casual setting, soft natural window lighting. Engaging and relatable vibe. (NOT heavy studio quality, NOT over-produced).`,
                      'ugc_basic': `Raw smartphone-style social media UGC review photo. ${finalCharWithOutfit} lively presenting [product] to the camera with an energetic "Must-Have" vibe. Cute Basic-style creator thumbnail, playful, charming, bright, relatable, friendly, and less formal than a studio advertisement. ${ugcBasicCuteVibe} The [product] MUST remain 100% perfectly unchanged: keep original logo, text, packaging, shape, and color. Natural hands, clear product visibility, photorealistic, high quality.`,
					'fashion': `High-end fashion lookbook photography. ${finalCharWithOutfit} is stylishly modeling and wearing the [product] as the main centerpiece of their outfit. Full body or medium-full shot clearly showcasing the fit, fabric, and design of the [product]. The model is posing confidently with a strong, professional fashion editorial presence. Stylish, modern, and trendy aesthetic. Professional lighting, photorealistic, 8k resolution, fashion magazine grade.`,
                      'beauty': `Beauty influencer photography. Close-up shot of ${finalCharWithOutfit} applying [product] to the skin. Showing texture and glow. Soft ring light. (Action: Swatching or applying). High quality, 8k resolution.`,
                      'studio': `Premium blockbuster advertising key visual for [product], like a high-budget Thai commercial campaign poster. The composition must be dramatic and grand, NOT a simple person standing and holding the product. Build a full hero advertising scene: [product] is the main centerpiece, placed large and dominant in the foreground with perfect label visibility and premium glossy highlights. ${finalCharWithOutfit} is integrated into the campaign scene with a dynamic advertising pose, interacting with the product environment instead of merely holding it. Create an extravagant product-themed set around them: cinematic stage lighting, dimensional background layers, elegant props inspired by the product ingredients or use case, sweeping light beams, rim light, atmospheric depth, floating graphic accents, premium reflections, and strong visual hierarchy. Use a low-angle or hero-shot commercial camera perspective, rich contrast, sharp Sony/DSLR realism, vibrant but tasteful color grading, and a polished billboard-level layout. The image must feel like a finished luxury product advertisement / campaign poster, visually powerful, expensive, and eye-catching. Avoid plain portrait, plain studio backdrop, boring standing pose, casual holding pose, flat lighting, empty background, low-budget UGC look.`,
                      'usage': `Authentic documentary lifestyle photography. ${finalCharWithOutfit} is genuinely interacting with and actively using the [product] in a real-world, everyday situation. The character is naturally focused on the activity and is NOT looking directly at the camera (candid, unposed moment). Soft natural lighting, highly relatable and realistic storytelling atmosphere. High-end commercial grade.`,
                      'review': `Professional YouTuber and Blogger review photography. ${finalCharWithOutfit} is holding and presenting the [product] nicely to the camera. Shot on a high-end mirrorless camera with an 85mm portrait lens, creating a beautiful creamy bokeh (extreme blurred background) that makes the character and product pop out. The character has a welcoming, professional, and friendly smile. Soft aesthetic studio lighting (like a professional ring light or softbox). High quality, razor-sharp focus on the face and the product, 8k resolution.`,
                      'live': `Live commerce broadcast style. ${finalCharWithOutfit} acting as a charismatic host holding [product]. Energetic atmosphere. High quality, 8k resolution.`,
                      'sony_product': `Real commercial product photo shot on a Sony mirrorless camera. ${finalCharWithOutfit} naturally presenting [product] with clean realistic lighting, true-to-life color, sharp product details, and natural skin texture. Less AI-looking, no fantasy effects, no over-smooth plastic skin. Authentic Thai social commerce advertising photo.`,
                      'shop_review': `Real in-store review photo. ${finalCharWithOutfit} presenting [product] inside a small modern shop or retail counter, friendly seller/customer review vibe, practical lighting, believable everyday composition, Sony mirrorless photo look, natural skin texture, clear product visibility, not over-produced.`,
                      'natural_light': `Natural window-light product lifestyle photo. ${finalCharWithOutfit} using or holding [product] near soft daylight, realistic home or cafe environment, gentle shadows, Sony mirrorless camera color, clean but casual, natural texture, no CGI, no fantasy effects.`,
                      'real_ads': `Realistic Thai commercial advertising photo. ${finalCharWithOutfit} presenting [product] in a polished but believable setup, Sony camera look, crisp focus, natural skin, realistic lighting, clean composition, premium sale image without looking like AI art.`,
                      'sony_portrait': `Sony mirrorless portrait advertising photo. ${finalCharWithOutfit} holding [product] naturally, shot with an 85mm portrait lens, creamy real bokeh, sharp face and product, natural Thai skin texture, premium but believable brand campaign look, no artificial fantasy effects.`,
                      'lifestyle_review': `Everyday lifestyle review photo. ${finalCharWithOutfit} casually using [product] in a real daily-life moment, candid expression, natural home or cafe setting, Sony mirrorless documentary look, relatable Thai UGC review feeling, realistic shadows and skin texture.`,

                     // ðŸ” à¸à¸¥à¸¸à¹ˆà¸¡ 2: à¸¡à¸·à¸­+à¸ªà¸´à¸™à¸„à¹‰à¸² (Closeup) - à¸–à¸­à¸”à¸„à¸²à¹à¸£à¸„à¹€à¸•à¸­à¸£à¹Œà¸­à¸­à¸à¸—à¸±à¹‰à¸‡à¸«à¸¡à¸”
                      'texture': `Extreme close-up macro shot of [product]. Focusing on the texture, material, or droplets. Highlighting the quality. Background is blurred. Aesthetic, sensory, high definition texture. (Note: Focus on product only, face is NOT visible). High quality, 8k resolution.`,
                      'unboxing': `First-person point of view (POV) shot. Looking down at a pair of hands holding or unboxing [product] on a messy but aesthetic desk. Natural indoor lighting, candid style. (Note: POV shot, only hands visible, face is NOT visible). High quality, 8k.`,
                      'shoes': `Low angle street fashion photography. Close-up shot of feet wearing [product] (shoes). Focus sharply on the shoes/feet. Background blurred. (Note: Focus on feet, face is NOT visible). High quality, 8k.`,
                      'hands': `Professional action lifestyle photography. Close-up on hands holding or operating [product] (tool/equipment). Active posture, demonstrating usage. (Note: Focus on action/hands, face is NOT visible). High quality, 8k.`,
					  
                      // ðŸ–¼ï¸ à¸à¸¥à¸¸à¹ˆà¸¡ 3: à¸‰à¸²à¸+à¸ªà¸´à¸™à¸„à¹‰à¸² (Product) - à¹„à¸¡à¹ˆà¸¡à¸µà¸„à¸™
                      'decor': `Interior design lifestyle photography. Wide shot showcasing [product] (furniture/large home item) placed naturally and beautifully in a room. The product is the main focus of the composition. (CRITICAL RULE: NO humans, NO people, NO hands, just the product and the interior setting). High quality, 8k, photorealistic commercial grade.`,
                      'showcase': `Professional commercial product photography of [product]. The product is placed prominently in the center of the scene. Composition focuses solely on the product. (Rule: NO humans, NO people, NO hands, just the product). High quality, 8k resolution, photorealistic, advertising grade.`,
                      'catalog': `Clean studio catalog product photography. [product] arranged neatly in a realistic small studio setup with softbox lighting, accurate packaging details, true color, Sony camera sharpness, commercial catalog composition, no humans, no hands, no CGI.`,
                      'counter_display': `Retail counter display photography. [product] placed on a real shop counter with subtle props and practical store lighting, ready-to-sell merchandising look, Sony mirrorless camera realism, crisp logo and packaging, no humans, no fantasy effects.`,
                      'premium_closeup': `Premium close-up commercial photo of [product]. Focus on packaging, logo, material detail, and texture with shallow depth of field, Sony macro lens realism, elegant natural highlights, accurate colors, no humans, no hands unless required by the product.`,

                      // ðŸŽ¨ à¸à¸¥à¸¸à¹ˆà¸¡ 4: à¹à¸Ÿà¸™à¸•à¸²à¸‹à¸µ (Fantasy)
                      'fancy': `High-end advertising photography. ${finalCharWithOutfit} is holding the [product]. Bright and refreshing atmosphere. Elements of the product or related ingredients are elegantly fluttering in the air around the subject. The product packaging is glossy with premium reflective highlights. Warm and fresh tone, professional commercial grade, 8k resolution.`,
                      'outdoor_market': `Outdoor market sales photography. ${finalCharWithOutfit} presenting [product] at a modern market booth or pop-up stall, natural daylight, lively Thai retail atmosphere, realistic Sony camera color, clear product visibility, authentic social commerce vibe.`,
                      'cgi': `Surreal CGI advertising photography. A massive, skyscraper-sized [product] is placed as a gigantic monument perfectly integrated into the environment. The product looks incredibly huge. ${finalCharWithOutfit} is standing extremely small nearby, looking up at the giant product in amazement. Cinematic lighting, 3D render style, epic scale, hyper-realistic shadows.`,
                      'funny': `Create an advertisement image in an extremely realistic caricature style of ${finalCharWithOutfit} holding [product]. CRITICAL PROPORTIONS: The character has highly exaggerated proportionsâ€”a VERY LARGE HEAD attached to a TINY, SHORT body with SMALL LIMBS. The character must look like a cute miniature person standing full-body. The face MUST remain 100% realistic photography (NO cartoons, NO 3D renders allowed) but with a soft kawaii beauty filter. Expression: ${randFunnyExp}. High quality 8k, bright commercial lighting.`,
                      'miniature': `Tilt-shift macro photography of a miniature world. Tiny people interacting around the giant [product].`
                  };

                  let baseStyle = styleTemplates[styleKey] || styleTemplates['model'];
                  manualTextPrompt = buildTextStylePrompt(styleTextProfiles[styleKey] || 'premium');
                  generatedPrompt = `${baseStyle} Location: ${finalBg}. ${manualTextPrompt} ${imgSafety} (Composition: Edge-to-edge). Negative Prompt: "${coreNegative}${manualNegativeAddon}"`;
              }
         } else {
              // ============================================
              // ðŸŸ¢ [MASCOT MODE: ULTIMATE RANDOMIZER V2]
              // à¸£à¸°à¸šà¸šà¸ªà¸¸à¹ˆà¸¡ 5 à¸ˆà¸¸à¸”: 1. à¸„à¸³à¸‚à¸¶à¹‰à¸™à¸•à¹‰à¸™ 2. à¸ªà¸´à¸™à¸„à¹‰à¸²à¸¡à¸µà¸Šà¸µà¸§à¸´à¸• 3. à¸—à¹ˆà¸²à¸—à¸²à¸‡ 4. à¸ªà¹„à¸•à¸¥à¹Œà¸ à¸²à¸ž 5. à¸‰à¸²à¸ Smart Auto
              // ============================================
              bananaAddLog('ðŸ§¸ à¹‚à¸«à¸¡à¸”: à¸¡à¸²à¸ªà¸„à¸­à¸• (Mascot)', 'step');

              // 1. à¹€à¸•à¸£à¸µà¸¢à¸¡à¸‚à¹‰à¸­à¸¡à¸¹à¸¥à¸žà¸·à¹‰à¸™à¸à¸²à¸™
              const activeMascotCard = document.querySelector('#mascot-grid .mascot-card.active') || document.querySelector('.mascot-card.active');
              let mascotType = activeMascotCard ? activeMascotCard.dataset.value : 'liver'; 
              
              if (mascotType === 'custom') {
                  const customInput = document.getElementById('mascot-custom-input');
                  mascotType = (customInput && customInput.value.trim() !== '') ? customInput.value.trim() : 'character';
              }

              const isMascotSmart = document.getElementById('mascot-smart-auto-checkbox')?.checked;
              const mascotCustomText = customTextValue || "";

            // 2. à¸à¸³à¸«à¸™à¸” Subject (à¸£à¸§à¸¡à¸£à¸°à¸šà¸šà¸ªà¸¸à¹ˆà¸¡ Prefix, à¸ªà¸´à¸™à¸„à¹‰à¸²à¸¡à¸µà¸Šà¸µà¸§à¸´à¸• à¹à¸¥à¸° à¸£à¸¹à¸›à¸™à¸²à¸‡à¹à¸šà¸š)
              let subject = "";
              if (modelUploadedImages.length > 0) {
                  // ðŸš€ [à¸­à¸±à¸›à¹€à¸à¸£à¸”] à¸£à¸°à¸šà¸šà¸ªà¸¸à¹ˆà¸¡ 4 à¸ªà¹„à¸•à¸¥à¹Œ à¸ªà¸³à¸«à¸£à¸±à¸š "à¸™à¸²à¸‡à¹à¸šà¸š -> à¸­à¸²à¸£à¹Œà¸•à¸—à¸­à¸¢à¸«à¸±à¸§à¹‚à¸•" + à¸šà¸±à¸‡à¸„à¸±à¸šà¸•à¸²à¹‚à¸• Pixar
                const chibiVariations = [
                      // à¹à¸šà¸šà¸—à¸µà¹ˆ 1: à¸­à¸²à¸£à¹Œà¸•à¸—à¸­à¸¢à¸žà¸£à¸µà¹€à¸¡à¸µà¸¢à¸¡ (Pop Mart Style) - à¸«à¸™à¹‰à¸²à¸œà¸¹à¹‰à¹ƒà¸«à¸à¹ˆà¹à¸•à¹ˆà¸ªà¸±à¸”à¸ªà¹ˆà¸§à¸™à¸Ÿà¸´à¸à¹€à¸à¸­à¸£à¹Œ
                      "A premium 3D designer blind-box art toy (Pop Mart style). The character has an oversized head and a small stylish body. The facial identity is a perfect 3D translation of the young adult/teen in the reference imageâ€”keeping their mature charm but in a cute designer toy proportion. Big beautiful eyes, flawless texture. CLOTHING: Fully dressed in a stylish, premium outfit matching the '[product]'.",

                      // à¹à¸šà¸šà¸—à¸µà¹ˆ 2: à¸ˆà¸´à¸šà¸´ 3D à¸ªà¹„à¸•à¸¥à¹Œà¸„à¸¥à¸²à¸ªà¸ªà¸´à¸ (à¹„à¸¡à¹ˆà¹€à¸”à¹‡à¸à¹€à¸à¸´à¸™à¹„à¸›)
                      "A high-end 3D Super-Deformed Chibi character. It features a larger head and smaller body, but strictly maintains the young adult identity from the reference photo. Do NOT make them look like a baby. Elegant 3D Pixar-style rendering with friendly, expressive eyes and a highly professional commercial look. CLOTHING: Dressed in a high-quality outfit that visually represents the '[product]'.",

                      // à¹à¸šà¸šà¸—à¸µà¹ˆ 3: à¸Ÿà¸´à¸à¹€à¸à¸­à¸£à¹Œà¸ªà¸°à¸ªà¸¡à¸£à¸°à¸”à¸±à¸šà¸žà¸£à¸µà¹€à¸¡à¸µà¸¢à¸¡
                      "A premium collectible 3D vinyl figure toy. The character has an exaggerated head-to-body ratio for cuteness, but the face clearly belongs to the stylish young adult in the reference image. Clean, smooth 3D rendering with a trendy aesthetic. CLOTHING: Wearing a customized, professional attire inspired by the '[product]'.",

                      // à¹à¸šà¸šà¸—à¸µà¹ˆ 4: à¸­à¸™à¸´à¹€à¸¡à¸Šà¸±à¸™ 3D à¹‚à¸¡à¹€à¸”à¸´à¸£à¹Œà¸™
                      "A charming 3D animated character with designer toy proportions (large head, small body). The face is a highly detailed, mature but stylized 3D adaptation of the reference image. NO baby face. Big beautiful eyes, friendly and welcoming vibe. CLOTHING: Fully dressed in a creative and premium costume matching the '[product]' theme."
                  ];
                  subject = chibiVariations[Math.floor(Math.random() * chibiVariations.length)];
                  bananaAddLog('âœ¨ Mascot: à¸ªà¸¸à¹ˆà¸¡à¸£à¸¹à¸›à¹à¸šà¸šà¸„à¸³à¸ªà¸±à¹ˆà¸‡à¹à¸›à¸¥à¸‡à¸£à¸¹à¸› Ref à¹€à¸›à¹‡à¸™à¸ˆà¸´à¸šà¸´à¸«à¸±à¸§à¹‚à¸•', 'success');
              } else {
                  // ðŸš€ [à¸ªà¸¸à¹ˆà¸¡à¸ˆà¸¸à¸”à¸—à¸µà¹ˆ 1] à¸ªà¸³à¸«à¸£à¸±à¸š "à¸ªà¸´à¸™à¸„à¹‰à¸²à¸¡à¸µà¸Šà¸µà¸§à¸´à¸•" (5 à¸ªà¹„à¸•à¸¥à¹Œ)
                  const productMascotVariations = [
                      "A creative 3D living character where the [product] itself comes alive. Add cute tiny cartoon arms, legs, and an expressive face DIRECTLY onto the original [product].",
                      "A magical 3D Pixar-style transformation of the [product]. It becomes a living mascot with adorable tiny limbs and a lively face attached directly to its original body.",
                      "An adorable 3D animated version of the [product]. The product magically grows cute cartoonish arms, legs, and a highly expressive face right on its surface.",
                      "A cinematic 3D character design where the [product] is the mascot. Featuring tiny cute limbs and a vibrant face seamlessly blended onto the unmodified original product.",
                      "A premium 3D toy-like mascot made entirely out of the [product]. It features adorable tiny hands, feet, and an animated facial expression attached directly to the exact original product shape."
                  ];
                  const randomProductPrompt = productMascotVariations[Math.floor(Math.random() * productMascotVariations.length)];
                  const strictProductRule = " CRITICAL RULE: The original shape, label, text, and texture of the [product] MUST remain 100% exactly as the source image. Do NOT deform, morph, or redesign the product body. Just attach the face and limbs to the existing shape. (DO NOT generate any other human or animal holding it)";

                   // ðŸš€ [à¸ªà¸¸à¹ˆà¸¡à¸ˆà¸¸à¸”à¸—à¸µà¹ˆ 2] à¸ªà¸³à¸«à¸£à¸±à¸š "à¸¡à¸²à¸ªà¸„à¸­à¸•à¸—à¸±à¹ˆà¸§à¹„à¸›" à¸›à¹‰à¸­à¸‡à¸à¸±à¸™à¸šà¸­à¸— (à¸šà¸±à¸‡à¸„à¸±à¸š Pixar à¸—à¸¸à¸à¸­à¸±à¸™)
                  const mascotPrefixes = [
                      "an extremely cute Disney-Pixar style 3D",
                      "an adorable 3D Pixar animated",
                      "a charming, highly detailed Pixar-style 3D",
                      "a premium 3D Pixar-like",
                      "a delightful and friendly 3D Pixar"
                  ];
                  const randPrefix = mascotPrefixes[Math.floor(Math.random() * mascotPrefixes.length)];

                  // ðŸŒŸ à¸•à¸±à¸§à¸Šà¹ˆà¸§à¸¢à¹€à¸žà¸´à¹ˆà¸¡à¸„à¸§à¸²à¸¡à¸™à¹ˆà¸²à¸£à¸±à¸ à¸•à¸²à¹‚à¸• à¹„à¸¡à¹ˆà¸™à¹ˆà¸²à¸à¸¥à¸±à¸§ (à¹€à¸­à¸²à¹„à¸›à¸•à¹ˆà¸­à¸—à¹‰à¸²à¸¢à¸¡à¸²à¸ªà¸„à¸­à¸•à¸—à¸¸à¸à¸•à¸±à¸§)
                  const cutePixarSuffix = "with big adorable cartoon eyes, extremely friendly, and completely non-scary";

                  // à¸à¸²à¸™à¸‚à¹‰à¸­à¸¡à¸¹à¸¥à¸¥à¸±à¸à¸©à¸“à¸°à¹€à¸”à¹ˆà¸™ (à¸žà¹ˆà¸§à¸‡à¸„à¸§à¸²à¸¡à¸™à¹ˆà¸²à¸£à¸±à¸à¹€à¸‚à¹‰à¸²à¹„à¸›à¸—à¸¸à¸à¸­à¸±à¸™)
                  const mascotTraits = {
                      'liver': `Liver character (glossy red stylized material), ${cutePixarSuffix}`,
                      'kidney': `Kidney character (smooth glossy bean-shaped material), ${cutePixarSuffix}`,
                      'heart': `Heart character (stylized red 3D material), ${cutePixarSuffix}`,
                      'stomach': `Stomach character (smooth pink stylized material), ${cutePixarSuffix}`,
                      'intestine': `Intestine character (glossy pink material), ${cutePixarSuffix}`,
                      'lemon': `Lemon character (vibrant yellow glossy material, realistic water droplets), ${cutePixarSuffix}`,
                      'strawberry': `Strawberry character (vibrant red with seeds), ${cutePixarSuffix}`,
                      'carrot': `Carrot character (vibrant orange texture), ${cutePixarSuffix}`,
                      'broccoli': `Broccoli character (detailed green floret crown), ${cutePixarSuffix}`,
                      'lettuce': `Lettuce character (layered green leaves), ${cutePixarSuffix}`,
                      'cat': `bipedal Cat character standing upright on two legs like a human (soft fur texture), ${cutePixarSuffix}`,
                      'dog': `bipedal Dog character standing upright on two legs like a human (smooth fur), ${cutePixarSuffix}`,
                      'bear': `bipedal Teddy Bear character standing upright on two legs like a human (soft fluffy fur), ${cutePixarSuffix}`
                  };

                  // à¸›à¸£à¸°à¸à¸­à¸šà¸£à¹ˆà¸²à¸‡à¸‚à¸±à¹‰à¸™à¸ªà¸¸à¸”à¸—à¹‰à¸²à¸¢
                  if (mascotType === 'product_mascot') {
                      // à¸–à¹‰à¸²à¹€à¸›à¹‡à¸™à¸ªà¸´à¸™à¸„à¹‰à¸²à¸¡à¸µà¸Šà¸µà¸§à¸´à¸• à¸ˆà¸°à¸”à¸¶à¸‡à¸ˆà¸²à¸à¸•à¸±à¸§à¹à¸›à¸£à¸”à¹‰à¸²à¸™à¸šà¸™à¸¡à¸²à¹ƒà¸Šà¹‰
                      subject = `Create ${randomProductPrompt}${strictProductRule}`;
                  } else if (mascotType === 'custom' || mascotType === 'custom_mascot') {
                      subject = `Create ${randPrefix} character of [${mascotType}], ${cutePixarSuffix}`;
                  } else {
                      let trait = mascotTraits[mascotType] || `${mascotType} character, ${cutePixarSuffix}`;
                      subject = `Create ${randPrefix} ${trait}`;
                  }
                  bananaAddLog(`ðŸ§¸ Mascot: à¹ƒà¸Šà¹‰à¸ªà¹„à¸•à¸¥à¹Œ 3D à¸žà¸£à¸µà¹€à¸¡à¸µà¸¢à¸¡à¹à¸šà¸šà¸ªà¸¸à¹ˆà¸¡à¸„à¸³à¸ªà¸±à¹ˆà¸‡à¸«à¸¥à¸šà¸šà¸­à¸— -> ${mascotType}`, 'info');
              }
             // 3. à¸ˆà¸±à¸”à¸à¸²à¸£à¸ªà¸µà¸«à¸™à¹‰à¸² à¸­à¸²à¸£à¸¡à¸“à¹Œ (à¸­à¸±à¸›à¹€à¸”à¸•à¹ƒà¸«à¹‰à¹€à¸‚à¹‰à¸²à¸à¸±à¸šà¸„à¸§à¸²à¸¡à¸™à¹ˆà¸²à¸£à¸±à¸à¸ªà¹„à¸•à¸¥à¹Œ Pixar)
              const expressionVal = document.getElementById('mascot-expression-select')?.value || 'serious';
              
              // ðŸŒŸ à¹€à¸›à¸¥à¸µà¹ˆà¸¢à¸™à¸„à¸³à¸ªà¸±à¹ˆà¸‡à¸­à¸²à¸£à¸¡à¸“à¹Œà¹ƒà¸«à¹‰à¹€à¸›à¹‡à¸™à¹à¸šà¸š "à¸à¸²à¸£à¹Œà¸•à¸¹à¸™à¸™à¹ˆà¸²à¸£à¸±à¸" à¹à¸—à¸™à¸à¸²à¸£à¹ƒà¸Šà¹‰à¸„à¸³à¸£à¸¸à¸™à¹à¸£à¸‡
              const expressionMap = {
                  'serious': "Expression: A cute determined and focused look. Big eyes showing dedication, like a serious but adorable little helper.",
                  'strict': "Expression: Adorably strict, playfully pouting, or giving a cute warning look. Frowning slightly with furrowed brows, but still looking incredibly charming and huggable.",
                  'smiling': "Expression: Bright, joyful, and warm genuine smile. Cheerful big eyes, highly approachable, sweet, and welcoming."
              };

              let dynamicAction = "";
              if (mascotType === 'product_mascot') {
                  // ðŸš€ [à¸ªà¸¸à¹ˆà¸¡à¸ˆà¸¸à¸”à¸—à¸µà¹ˆ 3] à¸ªà¸¸à¹ˆà¸¡à¸—à¹ˆà¸²à¸—à¸²à¸‡ (Action) à¸ªà¸³à¸«à¸£à¸±à¸šà¸ªà¸´à¸™à¸„à¹‰à¸²à¸¡à¸µà¸Šà¸µà¸§à¸´à¸•
                  const productActions = [
                      "The character is striking a confident and energetic pose to the camera in a premium commercial style.",
                      "The living product is moving playfully, showing off its cute tiny limbs in a highly engaging advertisement.",
                      "The mascot poses dynamically, leaning forward slightly with a lively and charming attitude perfect for viral marketing.",
                      "The living character is expressing immense enthusiasm, gesturing with its tiny hands in a lively, eye-catching composition."
                  ];
                  dynamicAction = productActions[Math.floor(Math.random() * productActions.length)];
              } else {
                  // ðŸš€ [à¸ªà¸¸à¹ˆà¸¡à¸ˆà¸¸à¸”à¸—à¸µà¹ˆ 3] à¸ªà¸¸à¹ˆà¸¡à¸—à¹ˆà¸²à¸—à¸²à¸‡ (Action) à¸ªà¸³à¸«à¸£à¸±à¸šà¸¡à¸²à¸ªà¸„à¸­à¸•à¸—à¸±à¹ˆà¸§à¹„à¸›
                  const normalActions = [
                      "The mascot is interacting with the [product] in a unique, creative, and professional pose. AI: Design a dynamic posture that best showcases the [product].",
                      "The character is holding and presenting the [product] enthusiastically to the camera, creating an eye-catching advertisement.",
                      "The mascot is playfully posing alongside the [product], highlighting its features in a lively, high-end marketing shot.",
                      "The character shows off the [product] with a proud and energetic stance, perfectly framed for a top-tier product commercial."
                  ];
                  dynamicAction = normalActions[Math.floor(Math.random() * normalActions.length)];
              }

              // ðŸš€ [à¸ªà¸¸à¹ˆà¸¡à¸ˆà¸¸à¸”à¸—à¸µà¹ˆ 4] à¸ªà¸¸à¹ˆà¸¡à¸ªà¹„à¸•à¸¥à¹Œà¸ à¸²à¸ž 3D Pixar 4 à¹à¸šà¸š
              const styleVariations = [
                  "Style: High-quality 3D Animation (Pixar level), Smooth glossy texture, Sharp details, Cinematic Dramatic Lighting, Deep shadows.",
                  "Aesthetic: Premium 3D cartoon render, Disney-Pixar style, ultra-detailed materials, vibrant global illumination, crisp focus.",
                  "Visuals: Masterpiece 3D illustration, cute stylized proportions, physically based rendering (PBR), studio rim lighting, 8k resolution.",
                  "Art Direction: High-end 3D mascot design, glossy and flawless surfaces, cinematic color grading, soft ray-traced shadows, commercial quality."
              ];
              const randomStylePrompt = styleVariations[Math.floor(Math.random() * styleVariations.length)];

              // 4. à¸›à¸£à¸°à¸à¸­à¸š Prompt (à¸•à¸±à¸”à¸„à¸³à¸§à¹ˆà¸² NOT smiling unless specified à¸­à¸­à¸ à¹€à¸žà¸·à¹ˆà¸­à¹ƒà¸«à¹‰ AI à¸—à¸³à¸«à¸™à¹‰à¸²à¸•à¸²à¸™à¹ˆà¸²à¸£à¸±à¸à¹„à¸”à¹‰à¸­à¸´à¸ªà¸£à¸°à¸‚à¸¶à¹‰à¸™)
              const moodPrompt = expressionMap[expressionVal] + " NOT scared, NOT creepy, NOT blurry.";
			  
              let finalPromptParts = [];
              finalPromptParts.push(subject + ".");
              finalPromptParts.push(randomStylePrompt); // ðŸŽ² à¸§à¸²à¸‡à¸ªà¹„à¸•à¸¥à¹Œà¸ªà¸¸à¹ˆà¸¡
              finalPromptParts.push(moodPrompt);
              finalPromptParts.push(dynamicAction);     // ðŸŽ² à¸§à¸²à¸‡à¸—à¹ˆà¸²à¸—à¸²à¸‡à¸ªà¸¸à¹ˆà¸¡

            if (isMascotSmart) {
                  // ðŸ›‘ [à¹à¸à¹‰à¸šà¸±à¸„] à¸–à¹‰à¸²à¹€à¸›à¹‡à¸™à¸•à¸±à¸šà¹„à¸•à¸«à¸£à¸·à¸­à¸ªà¸´à¸™à¸„à¹‰à¸² à¹ƒà¸«à¹‰à¸–à¸­à¸”à¹€à¸ªà¸·à¹‰à¸­à¸œà¹‰à¸² à¹à¸•à¹ˆà¸–à¹‰à¸²à¹€à¸›à¹‡à¸™ "à¸£à¸¹à¸›à¸™à¸²à¸‡à¹à¸šà¸š" à¸«à¹‰à¸²à¸¡à¸ªà¸±à¹ˆà¸‡à¸–à¸­à¸”à¹€à¸ªà¸·à¹‰à¸­à¸œà¹‰à¸²à¹€à¸”à¹‡à¸”à¸‚à¸²à¸”!
                  if (modelUploadedImages.length === 0) {
                      finalPromptParts.push("(Character is NOT wearing clothes, to show its shape clearly).");
                  }
                  
                  // ðŸš€ [à¸ªà¸¸à¹ˆà¸¡à¸ˆà¸¸à¸”à¸—à¸µà¹ˆ 5] à¸ªà¸¸à¹ˆà¸¡à¸‰à¸²à¸à¸«à¸¥à¸±à¸‡ Smart Mascot (4 à¹à¸šà¸šà¸—à¸µà¹ˆà¹€à¸™à¹‰à¸™à¸ªà¸´à¸™à¸„à¹‰à¸²)
                  const smartMascotBGs = [
                      "Background: A creative 3D environment perfectly matching the theme, ingredients, and vibe of the [product], rendered with dramatic cinematic lighting.",
                      "Background: A premium 3D commercial studio setup. The background colors and lighting are specifically designed to complement and highlight the [product].",
                      "Background: A high-end 3D product showcase stage, gently decorated with beautiful floating elements closely related to the [product].",
                      "Background: A stylized, eye-catching 3D environment representing the ideal real-world use case for the [product], blending perfectly with the Pixar aesthetic."
                  ];
                  const randomBG = smartMascotBGs[Math.floor(Math.random() * smartMascotBGs.length)];
                  finalPromptParts.push(randomBG);
                  bananaAddLog(`âœ¨ Smart Mascot: à¸ªà¸¸à¹ˆà¸¡à¸‰à¸²à¸à¸«à¸¥à¸±à¸‡à¹ƒà¸«à¹‰à¹€à¸‚à¹‰à¸²à¸à¸±à¸šà¸˜à¸µà¸¡à¸ªà¸´à¸™à¸„à¹‰à¸²à¸­à¸±à¸•à¹‚à¸™à¸¡à¸±à¸•à¸´`, 'info');

              } else {
                 const bgVal = document.getElementById('mascot-bg-select')?.value || 'inside_body';
                  const outfitVal = document.getElementById('mascot-outfit-select')?.value || 'none';
                  const customBg = document.getElementById('mascot-custom-bg-input')?.value.trim();
                  const customOutfit = document.getElementById('mascot-custom-outfit-input')?.value.trim();

                  // ðŸŸ¢ [à¸­à¸±à¸›à¹€à¸à¸£à¸”] à¸šà¸±à¸‡à¸„à¸±à¸šà¸Šà¸¸à¸” Mascot
                  let userOutfit = "";
                  if (outfitVal === 'custom' && customOutfit !== "") {
                      userOutfit = `[CRITICAL OUTFIT RULE: MUST be wearing EXACTLY "${customOutfit}". No default clothing]`;
                  } else {
                      userOutfit = { 'none': "", 'suit': "wearing a suit", 'hero': "wearing a cape", 'doctor': "wearing a doctor coat", 'sport': "wearing sportswear", 'student': "wearing student uniform" }[outfitVal] || "";
                  }
                  if (userOutfit) finalPromptParts.push(`Outfit: ${userOutfit}.`);

                  // ðŸŸ¢ [à¸­à¸±à¸›à¹€à¸à¸£à¸”] à¸šà¸±à¸‡à¸„à¸±à¸šà¸‰à¸²à¸ Mascot
                 let userBg = "";
                  if (bgVal === 'custom' && customBg !== "") {
                      userBg = `[CRITICAL SETTING RULE: The background MUST be strictly "${customBg}"]`;
                  } else {
                      userBg = { 'inside_body': "Cinematic view inside human body, dramatic lighting", '3d_world': "Dramatic miniature 3D city at twilight", 'pastel_studio': "Modern studio with dramatic spotlight and long shadows", 'fruit_land': "Lush fruit forest with dramatic sun rays", 'nature_blur': "Atmospheric nature park at dusk, cinematic bokeh", 'microscope': "Dramatic scientific lab, microscopic view with focused lighting" }[bgVal] || "clean background";
                  }
                  finalPromptParts.push(`Background: ${userBg}.`);
                  
              } // <--- ðŸŸ¢ à¹€à¸žà¸´à¹ˆà¸¡à¸›à¸µà¸à¸à¸²à¸›à¸´à¸” } à¸•à¸£à¸‡à¸™à¸µà¹‰ 1 à¸•à¸±à¸§ à¹€à¸žà¸·à¹ˆà¸­à¸›à¸´à¸”à¸šà¸¥à¹‡à¸­à¸ else à¸‚à¸­à¸‡ isMascotSmart

              // 6. à¸ˆà¸±à¸”à¸à¸²à¸£à¸‚à¹‰à¸­à¸„à¸§à¸²à¸¡ (Text) à¹à¸¥à¸°à¸›à¸£à¸°à¸à¸­à¸šà¸£à¹ˆà¸²à¸‡à¸‚à¸±à¹‰à¸™à¸ªà¸¸à¸”à¸—à¹‰à¸²à¸¢
              if (useTextOverlay) {
                  finalPromptParts.push(buildTextStylePrompt('mascot_cute'));
              } else {
                  finalPromptParts.push(buildTextStylePrompt('mascot_cute'));
              }

              finalPromptParts.push(getAntiBotSeed());

              generatedPrompt = finalPromptParts.join(' ');
              generatedPrompt += ` Negative Prompt: "tall character, long legs, long arms, realistic human proportions, realistic body ratio, adult body, slender body, skinny neck, suggestive pose, inappropriate clothing, revealing attire, swimsuit, underwear, messy visuals, blurry, low quality, 2D, sketch, poorly drawn face, ${coreNegative}"`;
          } // <--- à¸ªà¹ˆà¸§à¸™à¸™à¸µà¹‰à¸›à¸´à¸”à¸šà¸¥à¹‡à¸­à¸ else (Mascot Mode) à¹„à¸”à¹‰à¸­à¸¢à¹ˆà¸²à¸‡à¸–à¸¹à¸à¸•à¹‰à¸­à¸‡à¸ªà¸¡à¸šà¸¹à¸£à¸“à¹Œà¹à¸¥à¹‰à¸§
          
          // ----------------------------------------------------
          // à¹à¸—à¸™à¸—à¸µà¹ˆà¸Šà¸·à¹ˆà¸­à¸ªà¸´à¸™à¸„à¹‰à¸²
          // ----------------------------------------------------
          generatedPrompt = generatedPrompt.replace(/\[product\]/g, productName || 'product');
          
          await bananaSleep(500);

        // ----------------------------------------------------
          // ðŸŸ¢ STEP 2: à¸­à¸±à¸žà¹‚à¸«à¸¥à¸”à¸£à¸¹à¸›à¸ à¸²à¸ž (à¹€à¸žà¸´à¹ˆà¸¡à¸£à¸°à¸šà¸šà¸£à¸­à¹‚à¸«à¸¥à¸” 100% à¸‚à¸±à¹‰à¸™à¹€à¸—à¸ž)
          // ----------------------------------------------------
          bananaUpdateStatus(`ðŸ¤– ${roundLabel} [2/5] à¸ˆà¸³à¸¥à¸­à¸‡à¸à¸²à¸£à¸§à¸²à¸‡à¸£à¸¹à¸› (Paste)...`);
          
          const singleImageData = [{
              name: currentImage.name, type: currentImage.type, dataUrl: currentImage.dataUrl
          }];

          const uploadResult = await chrome.scripting.executeScript({
            target: { tabId: tab.id },
            func: (images) => {
              return new Promise(async (resolve) => {
                  try {
                      const sleep = (ms) => new Promise(r => setTimeout(r, ms));
                      
                      // 1. à¸«à¸²à¸Šà¹ˆà¸­à¸‡à¹à¸Šà¸—à¸«à¸¥à¸±à¸
                      const editor = document.querySelector('[data-slate-editor="true"]') || document.querySelector('[role="textbox"]');
                      if (!editor) return resolve({ success: false, msg: 'âŒ à¹„à¸¡à¹ˆà¸žà¸šà¸Šà¹ˆà¸­à¸‡à¸žà¸´à¸¡à¸žà¹Œà¸‚à¹‰à¸­à¸„à¸§à¸²à¸¡' });

                      // à¸«à¸² Container à¹ƒà¸«à¸à¹ˆà¸‚à¸­à¸‡à¹à¸–à¸šà¸žà¸´à¸¡à¸žà¹Œ à¹€à¸žà¸·à¹ˆà¸­à¹ƒà¸Šà¹‰à¸™à¸±à¸šà¸£à¸¹à¸›à¸­à¸¢à¹ˆà¸²à¸‡à¹à¸¡à¹ˆà¸™à¸¢à¸³
                      const inputContainer = editor.closest('div[class*="hvKLod"]') || editor.parentElement.parentElement;
                      
                      // à¸™à¸±à¸šà¸£à¸¹à¸›à¸—à¸µà¹ˆà¸¡à¸µà¸­à¸¢à¸¹à¹ˆà¹€à¸”à¸´à¸¡à¹ƒà¸™à¹à¸–à¸šà¸žà¸´à¸¡à¸žà¹Œ (à¹„à¸¡à¹ˆà¹ƒà¸Šà¹ˆà¸—à¸±à¹‰à¸‡à¸«à¸™à¹‰à¸²à¹€à¸§à¹‡à¸š)
                      const getThumbCount = () => inputContainer ? inputContainer.querySelectorAll('img').length : 0;
                      const initialThumbs = getThumbCount();

                      // 2. à¸„à¸¥à¸´à¸à¹à¸¥à¸° Focus à¹€à¸žà¸·à¹ˆà¸­à¹€à¸•à¸£à¸µà¸¢à¸¡à¸§à¸²à¸‡à¸£à¸¹à¸›
                      editor.scrollIntoView({ behavior: 'instant', block: 'center' });
                      editor.focus();
                      editor.click();
                      await sleep(800);

                      // 3. à¹€à¸•à¸£à¸µà¸¢à¸¡à¹„à¸Ÿà¸¥à¹Œ
                      const dataTransfer = new DataTransfer();
                      images.forEach((img) => {
                          const byteString = atob(img.dataUrl.split(',')[1]);
                          const ab = new ArrayBuffer(byteString.length);
                          const ia = new Uint8Array(ab);
                          for (let i = 0; i < byteString.length; i++) ia[i] = byteString.charCodeAt(i);
                          const file = new File([new Blob([ab], { type: img.type })], img.name, { type: img.type });
                          dataTransfer.items.add(file);
                      });

                      // 4. à¸§à¸²à¸‡à¸£à¸¹à¸› (Paste)
                      const pasteEvent = new ClipboardEvent('paste', {
                          clipboardData: dataTransfer,
                          bubbles: true,
                          cancelable: true
                      });
                      editor.dispatchEvent(pasteEvent);
                      
                      // ðŸŸ¢ à¹€à¸žà¸´à¹ˆà¸¡à¹€à¸§à¸¥à¸²à¸£à¸­à¹ƒà¸«à¹‰à¹€à¸šà¸£à¸²à¸§à¹Œà¹€à¸‹à¸­à¸£à¹Œà¸à¸¥à¸·à¸™à¹„à¸Ÿà¸¥à¹Œà¸¥à¸‡ UI (à¸ªà¸³à¸„à¸±à¸à¸¡à¸²à¸à¸ªà¸³à¸«à¸£à¸±à¸šà¸„à¸­à¸¡à¸Šà¹‰à¸²)
                      await sleep(1500); 

                      // 5. à¸£à¸­à¸à¸” Save (à¸«à¸™à¹‰à¸²à¸•à¹ˆà¸²à¸‡ Crop)
                      let confirmBtn = null;
                      const confirmTexts = ['Save', 'Confirm', 'Crop and Save', 'à¸šà¸±à¸™à¸—à¸¶à¸', 'à¸¢à¸·à¸™à¸¢à¸±à¸™', 'à¹€à¸ªà¸£à¹‡à¸ˆà¸ªà¸´à¹‰à¸™', 'à¸•à¹ˆà¸­à¹„à¸›'];
                      
                      for (let check = 0; check < 15; check++) {
                          await sleep(500);
                          const currentButtons = document.querySelectorAll('button');
                          confirmBtn = Array.from(currentButtons).find(btn =>
                              confirmTexts.some(t => (btn.textContent || '').includes(t)) && btn.offsetParent !== null
                          );
                          if (confirmBtn) break;
                      }

                      if (confirmBtn) {
                          confirmBtn.click();
                          await sleep(1500);
                      }

                      // 6. â³ à¸£à¸°à¸šà¸šà¸£à¸­à¹‚à¸«à¸¥à¸”à¸£à¸¹à¸›à¸‚à¸±à¹‰à¸™à¸ªà¸¹à¸‡ (à¸£à¸­à¸ˆà¸™à¸à¸§à¹ˆà¸²à¸£à¸¹à¸›à¸ˆà¸°à¹‚à¸«à¸¥à¸”à¸„à¸£à¸š 100% à¹€à¸‚à¹‰à¸²à¸Šà¹ˆà¸­à¸‡ Prompt)
                      let isUploading = false;
                      // à¸§à¸™à¸¥à¸¹à¸›à¹€à¸Šà¹‡à¸„à¸—à¸¸à¸à¹† 0.5 à¸§à¸´à¸™à¸²à¸—à¸µ à¸ªà¸¹à¸‡à¸ªà¸¸à¸” 120 à¸£à¸­à¸š = à¸£à¸­à¹„à¸”à¹‰à¸™à¸²à¸™à¸ªà¸¸à¸” 60 à¸§à¸´à¸™à¸²à¸—à¸µ!
                      for (let w = 0; w < 120; w++) { 
                          await sleep(500);
                          
                          // à¹€à¸Šà¹‡à¸„à¸§à¹ˆà¸²à¸¡à¸µà¸£à¸¹à¸› Thumbnail à¹‚à¸œà¸¥à¹ˆà¸‚à¸¶à¹‰à¸™à¸¡à¸²à¹ƒà¸™à¸à¸¥à¹ˆà¸­à¸‡à¸žà¸´à¸¡à¸žà¹Œà¸«à¸£à¸·à¸­à¸¢à¸±à¸‡?
                          if (getThumbCount() > initialThumbs) {
                              // à¹ƒà¸«à¹‰à¹€à¸§à¸¥à¸²à¸ à¸²à¸žà¹€à¸£à¸™à¹€à¸”à¸­à¸£à¹Œà¹ƒà¸«à¹‰à¸ªà¸¡à¸šà¸¹à¸£à¸“à¹Œà¸­à¸µà¸à¸™à¸´à¸”
                              await sleep(1500);
                              return resolve({ success: true, msg: 'âœ… à¸£à¸¹à¸›à¹‚à¸«à¸¥à¸” 100% à¹€à¸‚à¹‰à¸²à¸Šà¹ˆà¸­à¸‡ Prompt à¸ªà¸³à¹€à¸£à¹‡à¸ˆ' });
                          }

                          // à¸–à¹‰à¸²à¸¢à¸±à¸‡à¹„à¸¡à¹ˆà¹‚à¸œà¸¥à¹ˆ à¹ƒà¸«à¹‰à¸¥à¸­à¸‡à¸”à¸¹à¸§à¹ˆà¸²à¸¡à¸µà¸•à¸±à¸§à¹€à¸¥à¸‚ % à¸§à¸´à¹ˆà¸‡à¸­à¸¢à¸¹à¹ˆà¹„à¸«à¸¡ (à¹€à¸Šà¹‡à¸„à¸ªà¸–à¸²à¸™à¸°à¸§à¹ˆà¸²à¹„à¸¡à¹ˆà¹„à¸”à¹‰à¸„à¹‰à¸²à¸‡)
                          const allTexts = inputContainer ? inputContainer.innerText : "";
                          if (allTexts.includes('%')) {
                              isUploading = true;
                          }
                      }

                      if (isUploading) {
                          resolve({ success: false, msg: 'âŒ à¸«à¸¡à¸”à¹€à¸§à¸¥à¸²à¸£à¸­à¸­à¸±à¸›à¹‚à¸«à¸¥à¸” (à¹€à¸™à¹‡à¸•à¸­à¸²à¸ˆà¸ˆà¸°à¸Šà¹‰à¸²à¹€à¸à¸´à¸™à¹„à¸›)' });
                      } else {
                          resolve({ success: false, msg: 'âŒ à¸§à¸²à¸‡à¸£à¸¹à¸›à¹à¸¥à¹‰à¸§à¹à¸•à¹ˆà¹€à¸§à¹‡à¸šà¹„à¸¡à¹ˆà¸•à¸­à¸šà¸ªà¸™à¸­à¸‡' });
                      }

                  } catch (e) {
                      resolve({ success: false, msg: 'Error: ' + e.message });
                  }
              });
            },
            args: [singleImageData]
          });

          // ðŸ›‘ à¸à¸Žà¹€à¸«à¸¥à¹‡à¸: à¸–à¹‰à¸²à¸­à¸±à¸›à¹‚à¸«à¸¥à¸”à¹„à¸¡à¹ˆà¸œà¹ˆà¸²à¸™ à¸«à¸£à¸·à¸­à¸£à¸¹à¸›à¹„à¸¡à¹ˆà¹€à¸‚à¹‰à¸² 100% à¹ƒà¸«à¹‰ "à¸¢à¸à¹€à¸¥à¸´à¸à¸£à¸­à¸šà¸™à¸µà¹‰" à¸—à¸±à¸™à¸—à¸µ à¸«à¹‰à¸²à¸¡à¹„à¸›à¸•à¹ˆà¸­à¹€à¸”à¹‡à¸”à¸‚à¸²à¸”!
          if (!uploadResult[0]?.result?.success) {
              bananaAddLog(`âš ï¸ ${uploadResult[0]?.result?.msg} -> à¸‚à¹‰à¸²à¸¡à¹„à¸›à¸£à¸¹à¸›à¸–à¸±à¸”à¹„à¸›`, 'warning');
              throw new Error("à¸­à¸±à¸›à¹‚à¸«à¸¥à¸”à¸£à¸¹à¸›à¹„à¸¡à¹ˆà¸ªà¸³à¹€à¸£à¹‡à¸ˆ"); // à¹‚à¸¢à¸™ Error à¹€à¸žà¸·à¹ˆà¸­à¸‚à¹‰à¸²à¸¡ Step 3 à¹à¸¥à¸° 4
          } else {
              bananaAddLog(`${uploadResult[0]?.result?.msg}`, 'success');
          }

          await bananaSleep(2000); // à¸žà¸±à¸à¸£à¸­à¸£à¸°à¸šà¸šà¸™à¸´à¹ˆà¸‡à¹† à¸à¹ˆà¸­à¸™à¸žà¸´à¸¡à¸žà¹Œà¸‚à¹‰à¸­à¸„à¸§à¸²à¸¡
		  
		  
		  
		// ----------------------------------------------------
          // ðŸŸ¢ STEP 2.5: à¸­à¸±à¸žà¹‚à¸«à¸¥à¸”à¸£à¸¹à¸›à¸™à¸²à¸‡à¹à¸šà¸š (à¹à¸à¹‰à¸›à¸±à¸à¸«à¸² Pop-up à¹€à¸”à¹‰à¸‡ 100%)
          // ----------------------------------------------------
          if (modelUploadedImages && modelUploadedImages.length > 0) {
              bananaUpdateStatus(`ðŸ¤– ${roundLabel} [2.5/5] à¸à¸³à¸¥à¸±à¸‡à¹à¸™à¸šà¸£à¸¹à¸›à¸™à¸²à¸‡à¹à¸šà¸š...`);
              
              const modelData = [{
                  name: modelUploadedImages[0].name, type: modelUploadedImages[0].type, dataUrl: modelUploadedImages[0].dataUrl
              }];

              const uploadModelResult = await chrome.scripting.executeScript({
                  target: { tabId: tab.id },
                  func: (images) => {
                      return new Promise(async (resolve) => {
                          try {
                              const sleep = (ms) => new Promise(r => setTimeout(r, ms));
                              
                              const editor = document.querySelector('[data-slate-editor="true"]') || document.querySelector('[role="textbox"]');
                              if (!editor) return resolve({ success: false, msg: 'âŒ à¹„à¸¡à¹ˆà¸žà¸šà¸Šà¹ˆà¸­à¸‡à¸žà¸´à¸¡à¸žà¹Œà¸‚à¹‰à¸­à¸„à¸§à¸²à¸¡' });

                              const inputContainer = editor.closest('div[class*="hvKLod"]') || editor.parentElement.parentElement;
                              const getThumbCount = () => inputContainer ? inputContainer.querySelectorAll('img').length : 0;
                              const initialThumbs = getThumbCount();

                              // ðŸš€ à¹ƒà¸Šà¹‰à¸§à¸´à¸˜à¸µ Paste à¸£à¸¹à¸›à¸™à¸²à¸‡à¹à¸šà¸šà¸¥à¸‡à¹„à¸›à¹ƒà¸™à¸Šà¹ˆà¸­à¸‡à¹à¸Šà¸—à¸•à¸£à¸‡à¹† (à¸‚à¹‰à¸²à¸¡à¸à¸²à¸£à¸à¸”à¸›à¸¸à¹ˆà¸¡à¹ƒà¸”à¹† à¹€à¸žà¸·à¹ˆà¸­à¸›à¹‰à¸­à¸‡à¸à¸±à¸™ Popup Window à¹€à¸”à¹‰à¸‡)
                              editor.scrollIntoView({ behavior: 'instant', block: 'center' });
                              editor.focus();
                              editor.click();
                              await sleep(800);

                              const dataTransfer = new DataTransfer();
                              images.forEach((img) => {
                                  const byteString = atob(img.dataUrl.split(',')[1]);
                                  const ab = new ArrayBuffer(byteString.length);
                                  const ia = new Uint8Array(ab);
                                  for (let i = 0; i < byteString.length; i++) ia[i] = byteString.charCodeAt(i);
                                  const file = new File([new Blob([ab], { type: img.type })], img.name, { type: img.type });
                                  dataTransfer.items.add(file);
                              });

                              const pasteEvent = new ClipboardEvent('paste', {
                                  clipboardData: dataTransfer,
                                  bubbles: true,
                                  cancelable: true
                              });
                              editor.dispatchEvent(pasteEvent);
                              
                              // ðŸŸ¢ à¸£à¸­à¸£à¸¹à¸›à¸¥à¸‡à¸Šà¹ˆà¸­à¸‡à¹à¸Šà¸— (4 à¸§à¸´à¸™à¸²à¸—à¸µ)
                              await sleep(4000);

                              // à¸£à¸­à¸à¸”à¸›à¸¸à¹ˆà¸¡ Save (à¸«à¸™à¹‰à¸²à¸•à¹ˆà¸²à¸‡ Crop)
                              let confirmBtn = null;
                              const confirmTexts = ['Save', 'Confirm', 'Crop and Save', 'à¸šà¸±à¸™à¸—à¸¶à¸', 'à¸¢à¸·à¸™à¸¢à¸±à¸™', 'à¹€à¸ªà¸£à¹‡à¸ˆà¸ªà¸´à¹‰à¸™', 'à¸•à¹ˆà¸­à¹„à¸›'];
                              
                              for (let check = 0; check < 20; check++) {
                                  await sleep(500);
                                  const currentButtons = document.querySelectorAll('button');
                                  confirmBtn = Array.from(currentButtons).find(btn =>
                                      confirmTexts.some(t => (btn.textContent || '').includes(t)) && btn.offsetParent !== null
                                  );
                                  if (confirmBtn) break;
                              }

                              if (confirmBtn) {
                                  confirmBtn.click();
                                  await sleep(4000);
                              }

                              // à¸£à¸°à¸šà¸šà¸£à¸­à¹‚à¸«à¸¥à¸”à¸£à¸¹à¸›à¸‚à¸±à¹‰à¸™à¸ªà¸¹à¸‡
                              let isUploading = false;
                              for (let w = 0; w < 120; w++) { 
                                  await sleep(500);
                                  if (getThumbCount() > initialThumbs) {
                                      await sleep(1500);
                                      return resolve({ success: true, msg: 'âœ… à¹‚à¸«à¸¥à¸”à¸£à¸¹à¸›à¸™à¸²à¸‡à¹à¸šà¸š 100% à¸ªà¸³à¹€à¸£à¹‡à¸ˆ' });
                                  }
                              }
                              resolve({ success: false, msg: 'âŒ à¸«à¸¡à¸”à¹€à¸§à¸¥à¸²à¸£à¸­à¸­à¸±à¸›à¹‚à¸«à¸¥à¸”à¸£à¸¹à¸›à¸™à¸²à¸‡à¹à¸šà¸š' });

                          } catch (e) {
                              resolve({ success: false, msg: 'Error: ' + e.message });
                          }
                      });
                  },
                  args: [modelData]
              });

              if (!uploadModelResult[0]?.result?.success) {
                  bananaAddLog(`âš ï¸ ${uploadModelResult[0]?.result?.msg} -> (à¸‚à¹‰à¸²à¸¡à¹„à¸›à¸ªà¸£à¹‰à¸²à¸‡à¸£à¸¹à¸›à¹€à¸¥à¸¢à¹‚à¸”à¸¢à¹„à¸¡à¹ˆà¸¡à¸µà¸™à¸²à¸‡à¹à¸šà¸š)`, 'warning');
              } else {
                  bananaAddLog(`${uploadModelResult[0]?.result?.msg}`, 'success');
              }

              await bananaSleep(2000); // à¸žà¸±à¸à¸£à¸­à¸£à¸°à¸šà¸šà¸™à¸´à¹ˆà¸‡à¹†
          }
		  
		  
		  

      // ----------------------------------------------------
          // ðŸŸ¢ STEP 3: à¸à¸£à¸­à¸ Prompt (à¹€à¸ˆà¸²à¸°à¹€à¸à¸£à¸²à¸° Slate.js à¸—à¸°à¸¥à¸§à¸‡ Placeholder)
          // ----------------------------------------------------
          bananaUpdateStatus(`ðŸ¤– ${roundLabel} [3/5] à¸à¸³à¸¥à¸±à¸‡à¸›à¹‰à¸­à¸™à¸‚à¹‰à¸­à¸„à¸§à¸²à¸¡ Prompt...`);

          await chrome.scripting.executeScript({
            target: { tabId: tab.id },
            func: async (text) => {
                const sleep = (ms) => new Promise(r => setTimeout(r, ms));
                const editor = document.querySelector('[data-slate-editor="true"]') || document.querySelector('[role="textbox"]');

                if (editor) {
                    // 1. à¸¥à¹‰à¸²à¸‡à¹‚à¸Ÿà¸à¸±à¸ªà¹€à¸à¹ˆà¸²à¹à¸¥à¸°à¸„à¸¥à¸´à¸à¹ƒà¸«à¸¡à¹ˆ à¹€à¸žà¸·à¹ˆà¸­à¹€à¸‹à¹‡à¸•à¹€à¸„à¸­à¸£à¹Œà¹€à¸‹à¸­à¸£à¹Œà¹ƒà¸«à¹‰à¸–à¸¹à¸à¸ˆà¸¸à¸”
                    editor.blur();
                    await sleep(100);
                    editor.focus();
                    editor.click();
                    await sleep(300);

                    // 2. à¹€à¸„à¸¥à¸µà¸¢à¸£à¹Œà¸Šà¹ˆà¸­à¸‡à¹à¸Šà¸—à¸—à¸´à¹‰à¸‡ (à¸¥à¸š Placeholder à¸—à¸µà¹ˆà¸„à¹‰à¸²à¸‡à¸­à¸¢à¸¹à¹ˆ)
                    editor.dispatchEvent(new KeyboardEvent('keydown', { key: 'a', ctrlKey: true, bubbles: true }));
                    document.execCommand('selectAll', false, null);
                    await sleep(100);
                    editor.dispatchEvent(new KeyboardEvent('keydown', { key: 'Backspace', keyCode: 8, bubbles: true }));
                    document.execCommand('delete', false, null);
                    await sleep(300);

                    // 3. âš¡ à¸¢à¸´à¸‡ Event 'beforeinput' (à¸«à¸±à¸§à¹ƒà¸ˆà¸«à¸¥à¸±à¸à¸—à¸µà¹ˆ Slate.js à¹ƒà¸Šà¹‰à¸”à¸±à¸à¸ˆà¸±à¸šà¸à¸²à¸£à¸žà¸´à¸¡à¸žà¹Œ)
                    editor.dispatchEvent(new InputEvent('beforeinput', { 
                        inputType: 'insertText', 
                        data: text, 
                        bubbles: true, 
                        cancelable: true 
                    }));

                   // 4. âš¡ à¸ˆà¸³à¸¥à¸­à¸‡à¸à¸²à¸£ Paste à¹‚à¸”à¸¢à¸¢à¸±à¸”à¹‚à¸„à¸£à¸‡à¸ªà¸£à¹‰à¸²à¸‡ HTML à¸«à¸¥à¸­à¸à¹€à¸§à¹‡à¸šà¹„à¸›à¸”à¹‰à¸§à¸¢
                    const dt = new DataTransfer();
                    dt.setData('text/plain', text);
                    dt.setData('text/html', `<p>${text}</p>`); // à¸«à¸¥à¸­à¸à¸£à¸°à¸šà¸šà¸§à¹ˆà¸²à¸à¸³à¸¥à¸±à¸‡à¸§à¸²à¸‡à¸‚à¹‰à¸­à¸„à¸§à¸²à¸¡à¸—à¸µà¹ˆà¸¡à¸µà¹‚à¸„à¸£à¸‡à¸ªà¸£à¹‰à¸²à¸‡à¸ªà¸¡à¸šà¸¹à¸£à¸“à¹Œ
                    
                    const pasteEvent = new ClipboardEvent('paste', {
                        clipboardData: dt,
                        bubbles: true,
                        cancelable: true,
                        composed: true
                    });
                    editor.dispatchEvent(pasteEvent);
                    
                    // ðŸŸ¢ à¹€à¸›à¸¥à¸µà¹ˆà¸¢à¸™à¹€à¸§à¸¥à¸²à¸£à¸­à¸à¸¥à¸·à¸™à¸‚à¹‰à¸­à¸„à¸§à¸²à¸¡à¸¢à¸²à¸§à¹† à¹€à¸›à¹‡à¸™ 4 à¸§à¸´à¸™à¸²à¸—à¸µ
                    await sleep(4000);

                    // 5. à¹€à¸Šà¹‡à¸„à¸§à¹ˆà¸²à¸‚à¹‰à¸­à¸„à¸§à¸²à¸¡à¹€à¸‚à¹‰à¸²à¸«à¸£à¸·à¸­à¸¢à¸±à¸‡ à¸–à¹‰à¸²à¸¢à¸±à¸‡à¹ƒà¸«à¹‰à¸žà¸´à¸¡à¸žà¹Œà¸¢à¸±à¸”à¸•à¸£à¸‡à¹†
                    if (!editor.textContent.includes(text.substring(0, 10))) {
                        document.execCommand('insertText', false, text);
                    }

                    // 6. à¸à¸£à¸°à¸•à¸¸à¹‰à¸™ Event 'input' à¸¢à¸·à¸™à¸¢à¸±à¸™à¸§à¹ˆà¸²à¸žà¸´à¸¡à¸žà¹Œà¹€à¸ªà¸£à¹‡à¸ˆà¹à¸¥à¹‰à¸§
                    editor.dispatchEvent(new InputEvent('input', { 
                        inputType: 'insertText', 
                        data: text, 
                        bubbles: true, 
                        composed: true 
                    }));

                    // 7. ðŸ”¥ à¸—à¹ˆà¸²à¹„à¸¡à¹‰à¸•à¸²à¸¢: à¹€à¸„à¸²à¸° Spacebar à¸›à¸´à¸”à¸—à¹‰à¸²à¸¢ 1 à¸—à¸µ à¹€à¸žà¸·à¹ˆà¸­à¸šà¸±à¸‡à¸„à¸±à¸šà¹ƒà¸«à¹‰à¸›à¸¸à¹ˆà¸¡à¸ªà¹ˆà¸‡à¸„à¸³à¸ªà¸±à¹ˆà¸‡à¸ªà¸§à¹ˆà¸²à¸‡à¸‚à¸¶à¹‰à¸™
                    editor.dispatchEvent(new KeyboardEvent('keydown', { key: ' ', code: 'Space', keyCode: 32, bubbles: true }));
                    document.execCommand('insertText', false, ' ');
                    editor.dispatchEvent(new InputEvent('input', { inputType: 'insertText', data: ' ', bubbles: true }));
                    editor.dispatchEvent(new KeyboardEvent('keyup', { key: ' ', code: 'Space', keyCode: 32, bubbles: true }));

                    // à¸ªà¸¥à¸±à¸šà¸„à¸¥à¸´à¸à¸­à¸­à¸à¹à¸¥à¹‰à¸§à¸„à¸¥à¸´à¸à¹€à¸‚à¹‰à¸² à¹€à¸žà¸·à¹ˆà¸­à¹ƒà¸«à¹‰à¹€à¸§à¹‡à¸š Save à¸„à¹ˆà¸²à¸ªà¸¸à¸”à¸—à¹‰à¸²à¸¢
                    editor.blur();
                    await sleep(150);
                    editor.focus();
                }
            },
            args: [generatedPrompt]
          });

          await bananaSleep(4000); // à¸žà¸±à¸à¸£à¸­à¸à¹ˆà¸­à¸™à¹ƒà¸«à¹‰à¸šà¸­à¸—à¸à¸”à¸›à¸¸à¹ˆà¸¡à¸ªà¸£à¹‰à¸²à¸‡
		  
         // ============================================
          // ðŸŸ¢ STEP 4: à¸à¸”à¸›à¸¸à¹ˆà¸¡à¸ªà¸£à¹‰à¸²à¸‡ (à¸¥à¸¹à¸à¸¨à¸£à¸‚à¸§à¸²) [MAIN World + Smart Wait à¸—à¸°à¸¥à¸§à¸‡à¹€à¸à¸£à¸²à¸°]
          // ============================================
          bananaUpdateStatus(`ðŸ¤– ${roundLabel} [4/5] à¸£à¸­à¹€à¸§à¹‡à¸šà¸›à¸£à¸°à¸¡à¸§à¸¥à¸œà¸¥à¸£à¸¹à¸›à¸ à¸²à¸žà¸ªà¸±à¸à¸„à¸£à¸¹à¹ˆ...`);

          // ðŸ”¥ à¹€à¸žà¸´à¹ˆà¸¡à¸”à¸µà¹€à¸¥à¸¢à¹Œà¸•à¸£à¸‡à¸™à¸µà¹‰ 5 à¸§à¸´à¸™à¸²à¸—à¸µ à¹€à¸žà¸·à¹ˆà¸­à¹ƒà¸«à¹‰à¹€à¸§à¹‡à¸š React à¸­à¸±à¸›à¹‚à¸«à¸¥à¸”à¸£à¸¹à¸›à¹ƒà¸«à¹‰à¹€à¸ªà¸£à¹‡à¸ˆà¸ªà¸¡à¸šà¸¹à¸£à¸“à¹Œ 
          // à¸›à¹‰à¸­à¸‡à¸à¸±à¸™à¸­à¸²à¸à¸²à¸£à¸ªà¹ˆà¸‡à¸„à¸³à¸ªà¸±à¹ˆà¸‡à¹„à¸§à¹„à¸›à¸ˆà¸™à¸£à¸¹à¸›à¸„à¹‰à¸²à¸‡à¸—à¸µà¹ˆà¸Šà¹ˆà¸­à¸‡à¸žà¸´à¸¡à¸žà¹Œ
          await bananaSleep(5000);

          bananaUpdateStatus(`ðŸ¤– ${roundLabel} [4/5] à¸à¸³à¸¥à¸±à¸‡à¸ªà¹ˆà¸‡à¸„à¸³à¸ªà¸±à¹ˆà¸‡à¸ªà¸£à¹‰à¸²à¸‡...`);

          const createResult = await chrome.scripting.executeScript({
            target: { tabId: tab.id },
            world: 'MAIN', // ðŸ”¥ à¸«à¸±à¸§à¹ƒà¸ˆà¸ªà¸³à¸„à¸±à¸: à¸£à¸±à¸™à¹ƒà¸™à¹‚à¸¥à¸à¸‚à¸­à¸‡à¸«à¸™à¹‰à¸²à¹€à¸§à¹‡à¸šà¹‚à¸”à¸¢à¸•à¸£à¸‡
            func: (timeoutMs) => {
              return new Promise((resolve) => {
                  const sleep = (ms) => new Promise(r => setTimeout(r, ms));
                  
                  async function trySubmit() {
                      let attempts = 0;
                      const maxAttempts = Math.floor(timeoutMs / 1000);

                      while (attempts < maxAttempts) {
                          attempts++;
                          
                          const allBtns = Array.from(document.querySelectorAll('button'));
                          let targetBtn = null;

                          for (let i = allBtns.length - 1; i >= 0; i--) {
                              const btn = allBtns[i];
                              const html = (btn.innerHTML || "").toLowerCase();
                              const text = (btn.textContent || "").toLowerCase().trim();

                              const style = window.getComputedStyle(btn);
                              if (btn.disabled || style.pointerEvents === 'none' || style.opacity === '0') continue;

                              if (text.includes('nano') || text.includes('pro') || text.includes('à¸­à¸±à¸›à¹€à¸à¸£à¸”')) continue;
                              if (html.includes('add_circle') || html.includes('add ')) continue;

                              if (html.includes('arrow_forward') || html.includes('send') || text === 'à¸ªà¸£à¹‰à¸²à¸‡' || text === 'create') {
                                  targetBtn = btn;
                                  break;
                              }
                          }

                          if (targetBtn) {
                              targetBtn.scrollIntoView({ behavior: 'instant', block: 'center' });
                              await sleep(500);

                              let success = false;
                              try {
                                  // à¸—à¹ˆà¸²à¹„à¸¡à¹‰à¸•à¸²à¸¢à¸—à¸µà¹ˆ 1: à¹à¸®à¹‡à¸ React Props à¹‚à¸”à¸¢à¸•à¸£à¸‡
                                  const reactKey = Object.keys(targetBtn).find(k => k.startsWith('__reactProps'));
                                  if (reactKey && targetBtn[reactKey].onClick) {
                                      targetBtn[reactKey].onClick({ 
                                          preventDefault: () => {}, stopPropagation: () => {}, 
                                          nativeEvent: { isTrusted: true }, type: 'click'
                                      });
                                      success = true;
                                  } else {
                                      const icon = targetBtn.querySelector('i');
                                      if (icon) {
                                          const iconKey = Object.keys(icon).find(k => k.startsWith('__reactProps'));
                                          if (iconKey && icon[iconKey].onClick) {
                                              icon[iconKey].onClick({ 
                                                  preventDefault: () => {}, stopPropagation: () => {}, 
                                                  nativeEvent: { isTrusted: true }, type: 'click'
                                              });
                                              success = true;
                                          }
                                      }
                                  }
                              } catch(e) {
                                  console.error("React Hack Error:", e);
                              }

                              // à¸—à¹ˆà¸²à¹„à¸¡à¹‰à¸•à¸²à¸¢à¸—à¸µà¹ˆ 2: à¸ˆà¸³à¸¥à¸­à¸‡à¸à¸²à¸£à¸à¸” Enter à¸—à¸µà¹ˆà¸Šà¹ˆà¸­à¸‡à¹à¸Šà¸—
                              const editor = document.querySelector('[data-slate-editor="true"]') || document.querySelector('[role="textbox"]');
                              if (editor) {
                                  editor.focus();
                                  editor.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', code: 'Enter', keyCode: 13, which: 13, bubbles: true, cancelable: true }));
                                  editor.dispatchEvent(new KeyboardEvent('keypress', { key: 'Enter', code: 'Enter', keyCode: 13, which: 13, bubbles: true, cancelable: true }));
                                  editor.dispatchEvent(new KeyboardEvent('keyup', { key: 'Enter', code: 'Enter', keyCode: 13, which: 13, bubbles: true, cancelable: true }));
                              }

                              // Backup à¸–à¹‰à¸²à¸žà¸¥à¸²à¸”à¹ƒà¸«à¹‰à¸à¸”à¸„à¸¥à¸´à¸à¸›à¸à¸•à¸´
                              if (!success) targetBtn.click();

                              return resolve({ success: true, message: 'à¸à¸”à¸›à¸¸à¹ˆà¸¡à¸ªà¹ˆà¸‡à¸„à¸³à¸ªà¸±à¹ˆà¸‡à¸ªà¸³à¹€à¸£à¹‡à¸ˆ!' });
                          }
                          
                          await sleep(1000);
                      }
                      
                      resolve({ success: false, message: 'à¸«à¸²à¸›à¸¸à¹ˆà¸¡à¸ªà¹ˆà¸‡à¸„à¸³à¸ªà¸±à¹ˆà¸‡à¹„à¸¡à¹ˆà¹€à¸ˆà¸­ à¸«à¸£à¸·à¸­à¸£à¸°à¸šà¸šà¹„à¸¡à¹ˆà¸•à¸­à¸šà¸ªà¸™à¸­à¸‡' });
                  }
                  
                  trySubmit();
              });
            },
            args: [30000]
          });

          if (!createResult[0]?.result?.success) {
              bananaAddLog(`âš ï¸ à¸à¸”à¸›à¸¸à¹ˆà¸¡à¸ªà¸£à¹‰à¸²à¸‡à¹„à¸¡à¹ˆà¸ªà¸³à¹€à¸£à¹‡à¸ˆ: ${createResult[0]?.result?.message}`, 'warning');
              throw new Error(`[Step 4/5] à¸ªà¹ˆà¸‡à¸„à¸³à¸ªà¸±à¹ˆà¸‡à¸¥à¹‰à¸¡à¹€à¸«à¸¥à¸§: ${createResult[0]?.result?.message}`);
          } else {
              bananaAddLog(`ðŸ–±ï¸ ${roundLabel} à¸ªà¹ˆà¸‡à¸„à¸³à¸ªà¸±à¹ˆà¸‡à¸ªà¸£à¹‰à¸²à¸‡à¸ à¸²à¸žà¸ªà¸³à¹€à¸£à¹‡à¸ˆ!`, 'success');
          }
		  
		  
       // ----------------------------------------------------
          // ðŸŸ¢ STEP 6: à¸£à¸­à¸œà¸¥à¸¥à¸±à¸žà¸˜à¹Œ & à¸”à¸²à¸§à¸™à¹Œà¹‚à¸«à¸¥à¸”à¸­à¸±à¸•à¹‚à¸™à¸¡à¸±à¸•à¸´ (1K)
          // ----------------------------------------------------
          
          const autoDlBox1 = document.getElementById('banana-auto-download-checkbox');
          const autoDlBox2 = document.getElementById('banana-download-checkbox');
          const autoDlBox3 = document.getElementById('video-download-count-auto'); 
          const isDownloadEnabled = (autoDlBox1 && autoDlBox1.checked) || (autoDlBox2 && autoDlBox2.checked) || (autoDlBox3 && autoDlBox3.checked) || false;

          if (!isDownloadEnabled) {
              // ðŸš€ Turbo Mode: à¸—à¸´à¹‰à¸‡à¸—à¸§à¸™à¸„à¸³à¸ªà¸±à¹ˆà¸‡! à¸£à¸­à¸ à¸²à¸žà¹€à¸ªà¸£à¹‡à¸ˆ 70-90% à¹à¸¥à¹‰à¸§à¹„à¸›à¸—à¸³à¸£à¸­à¸šà¹ƒà¸«à¸¡à¹ˆà¹€à¸¥à¸¢
              const turboWait = Math.floor(Math.random() * 5000) + 10000; // à¸ªà¸¸à¹ˆà¸¡à¸£à¸­ 10-15 à¸§à¸´à¸™à¸²à¸—à¸µ
              bananaUpdateStatus(`ðŸš€ Turbo Mode: à¸ªà¹ˆà¸‡à¸„à¸³à¸ªà¸±à¹ˆà¸‡à¹à¸¥à¹‰à¸§ à¸žà¸±à¸à¸£à¸­ ${Math.floor(turboWait/1000)} à¸§à¸´...`);
              await bananaSleep(turboWait);
              bananaAddLog(`â­ï¸ Turbo Mode: à¸‚à¹‰à¸²à¸¡à¹„à¸›à¹€à¸£à¸´à¹ˆà¸¡à¸ à¸²à¸žà¸–à¸±à¸”à¹„à¸›à¹€à¸žà¸·à¹ˆà¸­à¸„à¸§à¸²à¸¡à¸£à¸§à¸”à¹€à¸£à¹‡à¸§`, 'info');
          } else {
              // â³ à¹‚à¸«à¸¡à¸”à¸›à¸à¸•à¸´ (à¸¡à¸µà¸”à¸²à¸§à¸™à¹Œà¹‚à¸«à¸¥à¸”): à¸£à¸­à¸ˆà¸™à¸à¸§à¹ˆà¸²à¸ à¸²à¸žà¸ˆà¸°à¹€à¸ªà¸£à¹‡à¸ˆ 100%
              bananaUpdateStatus(`â³ ${roundLabel} [5/5] à¸£à¸­ AI à¸ªà¸£à¹‰à¸²à¸‡à¸ à¸²à¸ž...`);
              
              // ðŸ“¸ 1. à¸–à¹ˆà¸²à¸¢ Snapshot à¸£à¸«à¸±à¸ªà¸£à¸¹à¸›à¹€à¸à¹ˆà¸²à¹„à¸§à¹‰à¹€à¸—à¸µà¸¢à¸š (à¸”à¸±à¸à¸ˆà¸±à¸šà¹€à¸‰à¸žà¸²à¸°à¸£à¸¹à¸›à¸—à¸µà¹ˆà¸ªà¸¡à¸šà¸¹à¸£à¸“à¹Œà¹à¸¥à¹‰à¸§)
              const getOldImgs = await chrome.scripting.executeScript({
                  target: { tabId: tab.id },
                  func: () => Array.from(document.querySelectorAll('img')).map(img => img.src)
              });
              const oldImgSrcs = getOldImgs[0]?.result || [];

              // 2. â³ à¸£à¸°à¸šà¸šà¸£à¸­à¸­à¸±à¸ˆà¸‰à¸£à¸´à¸¢à¸° + à¸•à¸£à¸§à¸ˆà¸ˆà¸±à¸šà¸„à¸§à¸²à¸¡à¸™à¸´à¹ˆà¸‡ 16 à¸§à¸´à¸™à¸²à¸—à¸µ (à¹à¸¡à¹ˆà¸™à¸¢à¸³à¸ªà¸¹à¸‡)
              let isFinished = false;
              let idleCount = 0; 
              
              for (let w = 0; w < 45; w++) { // à¸£à¸­à¸ªà¸¹à¸‡à¸ªà¸¸à¸” 90 à¸§à¸´à¸™à¸²à¸—à¸µ
                  if (bananaShouldStopAutomation) throw new Error('STOPPED');
                  await bananaSleep(2000);
                  
                  const checkState = await chrome.scripting.executeScript({
                      target: { tabId: tab.id },
                      func: (oldSrcs) => {
                          const currentImgs = Array.from(document.querySelectorAll('img'));
                          const hasNewImg = currentImgs.some(img => {
                              const rect = img.getBoundingClientRect();
                              return !oldSrcs.includes(img.src) && rect.width > 150 && !img.closest('header, nav, [role="textbox"]');
                          });
                          
                          const progressEl = Array.from(document.querySelectorAll('div, span')).find(el => {
                              const txt = el.textContent.trim();
                              return /^(\d+%)|(\d+\s*%)$/.test(txt); 
                          });
                          const hasProgressBar = document.querySelector('[role="progressbar"]') !== null;
                          const hasGeneratingBtn = Array.from(document.querySelectorAll('button')).some(b => (b.textContent||'').includes('à¸à¸³à¸¥à¸±à¸‡à¸ªà¸£à¹‰à¸²à¸‡'));
                          
                          const isWorking = progressEl !== undefined || hasProgressBar || hasGeneratingBtn;
                          
                          return { hasNew: hasNewImg, working: isWorking };
                      },
                      args: [oldImgSrcs]
                  });
                  
                  const state = checkState[0]?.result;

                  if (state?.hasNew && !state?.working) {
                      bananaUpdateStatus(`âœ… à¹€à¸ˆà¸­à¸ à¸²à¸žà¹ƒà¸«à¸¡à¹ˆà¹à¸¥à¹‰à¸§! à¸£à¸­à¸£à¸°à¸šà¸šà¸›à¸£à¸°à¸¡à¸§à¸¥à¸œà¸¥à¹ƒà¸«à¹‰à¸ªà¸¡à¸šà¸¹à¸£à¸“à¹Œà¸­à¸µà¸ 6 à¸§à¸´à¸™à¸²à¸—à¸µ...`);
                      await bananaSleep(6000); // à¸à¸±à¸™à¹€à¸«à¸™à¸µà¸¢à¸§ 6 à¸§à¸´
                      isFinished = true;
                      break;
                  }

                  if (!state?.working && !state?.hasNew) {
                      idleCount++;
                      if (idleCount >= 8) { // à¸™à¸´à¹ˆà¸‡à¸•à¸´à¸”à¸à¸±à¸™ 8 à¸£à¸­à¸š (16 à¸§à¸´à¸™à¸²à¸—à¸µ)
                          bananaUpdateStatus(`âš ï¸ à¸£à¸°à¸šà¸šà¸™à¸´à¹ˆà¸‡à¸™à¸²à¸™à¹€à¸à¸´à¸™ 16 à¸§à¸´à¸™à¸²à¸—à¸µ à¸•à¸±à¸”à¸ˆà¸šà¸à¸²à¸£à¸£à¸­!`);
                          bananaAddLog(`âš ï¸ à¸„à¸²à¸”à¸§à¹ˆà¸² AI à¹€à¸£à¸™à¹€à¸”à¸­à¸£à¹Œà¸¥à¹‰à¸¡à¹€à¸«à¸¥à¸§ à¸‚à¹‰à¸²à¸¡à¹„à¸›à¸£à¸­à¸šà¸–à¸±à¸”à¹„à¸›`, 'warning');
                          isFinished = false;
                          break;
                      }
                  } else {
                      idleCount = 0; 
                  }
              }

              if (!isFinished) {
                  bananaAddLog(`âš ï¸ à¸‚à¹‰à¸²à¸¡à¸à¸²à¸£à¸”à¸²à¸§à¸™à¹Œà¹‚à¸«à¸¥à¸” à¹€à¸™à¸·à¹ˆà¸­à¸‡à¸ˆà¸²à¸à¸ à¸²à¸žà¸ªà¸£à¹‰à¸²à¸‡à¹„à¸¡à¹ˆà¸ªà¸³à¹€à¸£à¹‡à¸ˆ`, 'warning');
              } else {
                  bananaUpdateStatus(`ðŸ“¥ ${roundLabel} à¸à¸³à¸¥à¸±à¸‡à¸”à¸¹à¸”à¹„à¸Ÿà¸¥à¹Œà¸ à¸²à¸žà¸ˆà¸²à¸à¸«à¸¥à¸±à¸‡à¸šà¹‰à¸²à¸™...`);
                  
                  const downloadResult = await chrome.scripting.executeScript({
                      target: { tabId: tab.id },
                      func: (oldSrcs) => {
                          return new Promise(async (resolve) => {
                              try {
                                  const sleep = (ms) => new Promise(r => setTimeout(r, ms));
                                  window.scrollTo(0, 0);
                                  await sleep(1000);
                                  
                                  const allImgs = Array.from(document.querySelectorAll('img'));
                                  const newImgs = allImgs.filter(img => {
                                      const rect = img.getBoundingClientRect();
                                     // à¸•à¸£à¸§à¸ˆà¸ˆà¸±à¸šà¸£à¸¹à¸›à¸—à¸µà¹ˆ AI à¸ªà¸£à¹‰à¸²à¸‡ à¹‚à¸”à¸¢à¹€à¸Šà¹‡à¸„à¸—à¸±à¹‰à¸‡à¸ à¸²à¸©à¸²à¹„à¸—à¸¢à¹à¸¥à¸°à¸­à¸±à¸‡à¸à¸¤à¸© à¸«à¸£à¸·à¸­à¹€à¸Šà¹‡à¸„à¸§à¹ˆà¸²à¹„à¸¡à¹ˆà¹ƒà¸Šà¹ˆà¸£à¸¹à¸›à¸—à¸µà¹ˆà¹€à¸£à¸²à¸­à¸±à¸›à¹‚à¸«à¸¥à¸”
                                      const altText = (img.getAttribute('alt') || '').toLowerCase();
                                      const isGenerated = altText.includes('à¸ªà¸£à¹‰à¸²à¸‡à¸‚à¸¶à¹‰à¸™') || altText.includes('generated') || altText.includes('created') || altText !== '';
                                      const isNew = !oldSrcs.includes(img.src);
                                      const isLarge = rect.width > 150;
                                      const notInChat = !img.closest('header, nav, [role="textbox"]');
                                      
                                      let isUploaded = false;
                                      let card = img;
                                      for(let i = 0; i < 8; i++) {
                                          if(!card || card === document.body) break;
                                          if((card.innerText || '').includes('à¸­à¸±à¸›à¹‚à¸«à¸¥à¸”') || (card.innerText || '').includes('uploaded')) isUploaded = true;
                                          card = card.parentElement;
                                      }
                                      
                                      return isGenerated && isNew && isLarge && notInChat && !isUploaded;
                                  });
                                  
                                  if (newImgs.length === 0) return resolve({ success: false, msg: 'à¸«à¸²à¸£à¸¹à¸›à¹ƒà¸«à¸¡à¹ˆà¸šà¸™à¸«à¸™à¹‰à¸²à¸ˆà¸­à¹„à¸¡à¹ˆà¹€à¸ˆà¸­' });

                                  let downloadedCount = 0;

                                  for (let i = 0; i < newImgs.length; i++) {
                                      const targetImg = newImgs[i];
                                      const imgSrc = targetImg.src; 

                                      if (!imgSrc) continue;

                                      targetImg.scrollIntoView({ behavior: 'smooth', block: 'center' });
                                      await sleep(800);

                                      try {
                                          const response = await fetch(imgSrc);
                                          const blob = await response.blob(); 
                                          const blobUrl = window.URL.createObjectURL(blob);

                                          const a = document.createElement('a');
                                          a.style.display = 'none';
                                          a.href = blobUrl;
                                          a.download = `Banana_Gen_${Date.now()}_${i+1}.jpg`; 
                                          
                                          document.body.appendChild(a);
                                          a.click(); 
                                          await sleep(500);

                                          document.body.removeChild(a);
                                          window.URL.revokeObjectURL(blobUrl);

                                          downloadedCount++;
                                          await sleep(1000); 

                                      } catch (fetchErr) {
                                          console.log("à¸”à¸¹à¸”à¸ à¸²à¸žà¸¥à¹‰à¸¡à¹€à¸«à¸¥à¸§:", fetchErr);
                                      }
                                  }

                                  if (downloadedCount > 0) {
                                      resolve({ success: true, msg: `à¸”à¸¹à¸”à¹„à¸Ÿà¸¥à¹Œ 1K à¸ªà¸³à¹€à¸£à¹‡à¸ˆ ${downloadedCount}/${newImgs.length} à¸£à¸¹à¸›!` });
                                  } else {
                                      resolve({ success: false, msg: 'à¸žà¸¢à¸²à¸¢à¸²à¸¡à¸”à¸¹à¸”à¹„à¸Ÿà¸¥à¹Œà¹à¸¥à¹‰à¸§à¹à¸•à¹ˆà¸¥à¹‰à¸¡à¹€à¸«à¸¥à¸§' });
                                  }

                              } catch (err) {
                                  resolve({ success: false, msg: 'Error: ' + err.message });
                              }
                          });
                      },
                      args: [oldImgSrcs] 
                  });

                  if (downloadResult[0]?.result?.success) {
                      bananaAddLog(`ðŸ“¥ ${downloadResult[0].result.msg}`, 'success');
                  } else {
                      bananaAddLog(`âš ï¸ à¹‚à¸«à¸¥à¸”à¸­à¸±à¸•à¹‚à¸™à¸¡à¸±à¸•à¸´à¹„à¸¡à¹ˆà¸ªà¸³à¹€à¸£à¹‡à¸ˆ: ${downloadResult[0]?.result?.msg}`, 'warning');
                  }
              }
          }

          completedRounds++;
          bananaAddLog(`ðŸ à¸ˆà¸šà¸£à¸­à¸šà¸—à¸µà¹ˆ ${currentRound}`, 'info');
          
          // ðŸŸ¢ [à¹‚à¸„à¹‰à¸”à¸—à¸µà¹ˆà¹€à¸žà¸´à¹ˆà¸¡à¹ƒà¸«à¸¡à¹ˆ] COOLDOWN: à¸žà¸±à¸à¸«à¸²à¸¢à¹ƒà¸ˆà¸à¹ˆà¸­à¸™à¹€à¸£à¸´à¹ˆà¸¡à¸£à¸­à¸šà¸•à¹ˆà¸­à¹„à¸› 
          // à¸›à¹‰à¸­à¸‡à¸à¸±à¸™ Google à¸šà¸¥à¹‡à¸­à¸ API (à¸ªà¸¸à¹ˆà¸¡à¸žà¸±à¸ 5-8 à¸§à¸´à¸™à¸²à¸—à¸µà¹ƒà¸«à¹‰à¹€à¸™à¸µà¸¢à¸™à¹€à¸›à¹‡à¸™à¸„à¸™)
          if (currentRound < totalRounds) {
              const cooldownTime = Math.floor(Math.random() * 3000) + 5000; 
              bananaUpdateStatus(`â³ à¸žà¸±à¸à¸£à¸°à¸šà¸š ${cooldownTime/1000} à¸§à¸´à¸™à¸²à¸—à¸µà¸à¹ˆà¸­à¸™à¹€à¸£à¸´à¹ˆà¸¡à¸£à¸­à¸šà¸–à¸±à¸”à¹„à¸› (à¸à¸±à¸™à¹‚à¸”à¸™à¸šà¸¥à¹‡à¸­à¸)...`);
              await bananaSleep(cooldownTime);
          }

        } // à¸ˆà¸šà¸¥à¸¹à¸› Round
      } // à¸ˆà¸šà¸¥à¸¹à¸› Image

      if (!isContinuous) {
          bananaUpdateStatus(`ðŸŽ‰ à¹€à¸ªà¸£à¹‡à¸ˆà¸ªà¸´à¹‰à¸™!`);
          showToast('Mission Complete!', 'success');
      } else {
          bananaUpdateStatus(`âœ… à¸ªà¸£à¹‰à¸²à¸‡à¸ à¸²à¸žà¹€à¸ªà¸£à¹‡à¸ˆà¸ªà¸´à¹‰à¸™ à¸à¸³à¸¥à¸±à¸‡à¸ªà¹ˆà¸‡à¹„à¸¡à¹‰à¸•à¹ˆà¸­à¹ƒà¸«à¹‰ Video...`);
      }

  } catch (error) {
      if (error.message === 'STOPPED') {
          bananaUpdateStatus('ðŸ›‘ à¸«à¸¢à¸¸à¸”à¸à¸²à¸£à¸—à¸³à¸‡à¸²à¸™à¹à¸¥à¹‰à¸§');
      } else {
          bananaUpdateStatus(`âŒ Error: ${error.message}`);
          bananaAddLog(`âŒ Error: ${error.message}`, 'error');
      }
  } finally {
      if (!isContinuous) {
          // à¸›à¸¥à¸”à¸¥à¹‡à¸­à¸„à¹à¸¥à¸°à¸„à¸·à¸™à¸„à¹ˆà¸²à¸›à¸¸à¹ˆà¸¡à¹€à¸¡à¸·à¹ˆà¸­à¸—à¸³à¸‡à¸²à¸™à¹€à¸ªà¸£à¹‡à¸ˆ
          bananaIsAutomationRunning = false;
          bananaShouldStopAutomation = false;
          if (bananaBtnAutomation) {
              bananaBtnAutomation.disabled = false;
              bananaBtnAutomation.innerHTML = '<span>START GENERATE</span>'; 
          }
          if (bananaBtnStop) bananaBtnStop.style.display = 'none';
          try { await toggleWebPageLock(false); } catch (e) {}
      }
  }
} // <--- à¸›à¸´à¸”à¸Ÿà¸±à¸‡à¸à¹Œà¸Šà¸±à¸™ bananaHandleAutomation à¸•à¸£à¸‡à¸™à¸µà¹‰!


// ============================================
// ðŸ”’ SYSTEM LOCKER (à¸£à¸°à¸šà¸šà¸¥à¹‡à¸­à¸„à¸«à¸™à¹‰à¸²à¸ˆà¸­à¹€à¸§à¹‡à¸š - à¸›à¹‰à¸­à¸‡à¸à¸±à¸™ Error)
// ============================================
async function toggleWebPageLock(shouldLock) {
    try {
        const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
        
        // ðŸ›‘ à¸›à¹‰à¸­à¸‡à¸à¸±à¸™ Error: à¸«à¹‰à¸²à¸¡à¸£à¸±à¸™à¸ªà¸„à¸£à¸´à¸›à¸•à¹Œà¹ƒà¸™à¸«à¸™à¹‰à¸²à¸•à¸±à¹‰à¸‡à¸„à¹ˆà¸² Chrome à¸«à¸£à¸·à¸­à¸«à¸™à¹‰à¸²à¹€à¸›à¸¥à¹ˆà¸²
        if (!tab || !tab.url || !tab.url.startsWith('http')) return;

        await chrome.scripting.executeScript({
            target: { tabId: tab.id },
            func: (locked) => {
                const lockId = 'promptplay-lock-overlay';
                const existingLock = document.getElementById(lockId);

                if (locked) {
                    if (!existingLock) {
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
                                <div style="font-size: 40px; margin-bottom: 15px;">ðŸ”’</div>
                                <h2 style="margin: 0 0 10px 0; color: #fff; font-size: 20px;">SYSTEM WORKING</h2>
                                <p style="margin: 0; color: #aaa; font-size: 14px;">à¸à¸£à¸¸à¸“à¸²à¸­à¸¢à¹ˆà¸²à¸„à¸¥à¸´à¸à¹ƒà¸”à¹† à¸šà¸™à¸«à¸™à¹‰à¸²à¸ˆà¸­à¸‚à¸“à¸°à¸™à¸µà¹‰</p>
                            </div>
                        `;

                        const blockEvent = (e) => {
                            e.preventDefault();
                            e.stopPropagation();
                        };
                        ['click', 'mousedown', 'mouseup', 'keydown', 'wheel'].forEach(evt => {
                            overlay.addEventListener(evt, blockEvent, true);
                        });

                        document.body.appendChild(overlay);
                        setTimeout(() => overlay.style.opacity = '1', 10);
                    }
                } else {
                    if (existingLock) {
                        existingLock.style.opacity = '0';
                        setTimeout(() => existingLock.remove(), 300);
                    }
                }
            },
            args: [shouldLock]
        });
    } catch (e) {
        console.error("Lock error prevented:", e);
    }
}

// ============================================
// ðŸ” URL CHECKER (à¸£à¸°à¸šà¸šà¹€à¸Šà¹‡à¸„à¹€à¸§à¹‡à¸šà¸—à¸µà¹ˆà¸–à¸¹à¸à¸•à¹‰à¸­à¸‡)
// ============================================
async function checkCorrectWebsite() {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    
    // à¸”à¸¶à¸‡ URL à¸¡à¸²à¹€à¸Šà¹‡à¸„ à¸–à¹‰à¸²à¹„à¸¡à¹ˆà¸¡à¸µ (à¹€à¸Šà¹ˆà¸™à¸­à¸¢à¸¹à¹ˆà¸«à¸™à¹‰à¸² New Tab) à¹ƒà¸«à¹‰à¹€à¸›à¹‡à¸™ string à¸§à¹ˆà¸²à¸‡
    const currentUrl = (tab && tab.url) ? tab.url.toLowerCase() : "";

    // à¸•à¸£à¸§à¸ˆà¸ªà¸­à¸šà¸§à¹ˆà¸²à¸­à¸¢à¸¹à¹ˆà¸šà¸™à¸«à¸™à¹‰à¸² Google Labs Flow à¸—à¸µà¹ˆà¹‚à¸›à¸£à¹à¸à¸£à¸¡à¸£à¸­à¸‡à¸£à¸±à¸š
    const requiredFlowUrl = "https://labs.google/fx/th/tools/flow";
    const isFlowPage = currentUrl.startsWith(requiredFlowUrl);

    // âœ… à¸–à¹‰à¸²à¸œà¹ˆà¸²à¸™à¹€à¸‡à¸·à¹ˆà¸­à¸™à¹„à¸‚ (à¸­à¸¢à¸¹à¹ˆà¸«à¸™à¹‰à¸²à¹€à¸§à¹‡à¸šà¸–à¸¹à¸à¸•à¹‰à¸­à¸‡) à¹ƒà¸«à¹‰à¸£à¸±à¸™à¸•à¹ˆà¸­
    if (isFlowPage) {
        return true; 
    }

    // âŒ à¸–à¹‰à¸²à¹„à¸¡à¹ˆà¸œà¹ˆà¸²à¸™à¹€à¸‡à¸·à¹ˆà¸­à¸™à¹„à¸‚ (à¸­à¸¢à¸¹à¹ˆà¸«à¸™à¹‰à¸²à¹€à¸§à¹‡à¸šà¸­à¸·à¹ˆà¸™ à¸«à¸£à¸·à¸­à¹à¸—à¹‡à¸šà¸§à¹ˆà¸²à¸‡) à¹ƒà¸«à¹‰à¹à¸ˆà¹‰à¸‡à¹€à¸•à¸·à¸­à¸™à¸—à¸±à¸™à¸—à¸µ
    showToast('âš ï¸ à¸œà¸´à¸”à¸«à¸™à¹‰à¸²! à¸à¸£à¸¸à¸“à¸²à¹€à¸›à¸´à¸” https://labs.google/fx/th/tools/flow à¸à¹ˆà¸­à¸™à¹€à¸£à¸´à¹ˆà¸¡à¸—à¸³à¸‡à¸²à¸™', 'error');
    
    // à¸ªà¸±à¹ˆà¸™à¸›à¸¸à¹ˆà¸¡à¹à¸ˆà¹‰à¸‡à¹€à¸•à¸·à¸­à¸™à¹ƒà¸«à¹‰à¸œà¸¹à¹‰à¹ƒà¸Šà¹‰à¸£à¸¹à¹‰ (à¸«à¸²à¹€à¸‰à¸žà¸²à¸°à¸›à¸¸à¹ˆà¸¡à¸—à¸µà¹ˆà¹€à¸›à¹‡à¸™ Primary)
    const btns = document.querySelectorAll('.btn-primary');
    btns.forEach(btn => {
        btn.classList.add('shake');
        setTimeout(() => btn.classList.remove('shake'), 500);
    });
    
    return false; // â›” à¹à¸ˆà¹‰à¸‡à¹€à¸•à¸·à¸­à¸™à¹€à¸ªà¸£à¹‡à¸ˆà¹à¸¥à¹‰à¸§à¸„à¹ˆà¸­à¸¢à¸ªà¸±à¹ˆà¸‡à¸«à¸¢à¸¸à¸”à¸£à¸±à¸™
}
// -------------------------------------------------------
// ðŸŸ¢ [à¹€à¸žà¸´à¹ˆà¸¡à¹ƒà¸«à¸¡à¹ˆ] à¸”à¸±à¸à¸ˆà¸±à¸šà¸„à¹ˆà¸²à¹€à¸¡à¸·à¹ˆà¸­à¸žà¸´à¸¡à¸žà¹Œà¸•à¸±à¸§à¹€à¸¥à¸‚à¹ƒà¸™à¸Šà¹ˆà¸­à¸‡ Custom (+)
// -------------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
    // 1. à¸ˆà¸±à¸”à¸à¸²à¸£à¸Šà¹ˆà¸­à¸‡ Custom à¸‚à¸­à¸‡ Video (Video Custom Input)
    const videoCustomInput = document.getElementById('video-custom-round-input');
    if (videoCustomInput) {
        videoCustomInput.addEventListener('input', function() {
            // à¹€à¸¡à¸·à¹ˆà¸­à¸žà¸´à¸¡à¸žà¹Œà¹€à¸¥à¸‚ -> à¹„à¸¡à¹ˆà¸•à¹‰à¸­à¸‡à¹€à¸›à¸¥à¸µà¹ˆà¸¢à¸™à¸„à¹ˆà¸² Dropdown à¸«à¸¥à¸±à¸ (à¹ƒà¸«à¹‰à¸¡à¸±à¸™à¸„à¹‰à¸²à¸‡à¸„à¸³à¸§à¹ˆà¸² 'custom' à¹„à¸§à¹‰)
            // à¹à¸•à¹ˆà¹ƒà¸«à¹‰à¸ªà¸±à¹ˆà¸‡à¸„à¸³à¸™à¸§à¸“à¸£à¸­à¸šà¹ƒà¸«à¸¡à¹ˆà¸—à¸±à¸™à¸—à¸µ
            if (typeof videoUpdateRoundInfo === 'function') videoUpdateRoundInfo();
        });
    }

    // 2. à¸ˆà¸±à¸”à¸à¸²à¸£à¸Šà¹ˆà¸­à¸‡ Custom à¸‚à¸­à¸‡ Banana (Banana Custom Input)
    const bananaCustomInput = document.getElementById('banana-custom-round-input');
    if (bananaCustomInput) {
        bananaCustomInput.addEventListener('input', function() {
            // à¸—à¸³à¹€à¸«à¸¡à¸·à¸­à¸™à¸à¸±à¸™à¸à¸±à¸š Video: à¸ªà¸±à¹ˆà¸‡à¸„à¸³à¸™à¸§à¸“à¸£à¸­à¸šà¹ƒà¸«à¸¡à¹ˆà¸—à¸±à¸™à¸—à¸µà¸—à¸µà¹ˆà¸žà¸´à¸¡à¸žà¹Œ
            if (typeof bananaUpdateRoundInfo === 'function') bananaUpdateRoundInfo();
        });
    }
});

// ============================================
// ðŸŸ¢ AUTO DEFAULT SETTINGS (à¸•à¸±à¹‰à¸‡à¸„à¹ˆà¸²à¹€à¸£à¸´à¹ˆà¸¡à¸•à¹‰à¸™: à¹€à¸›à¸´à¸”à¹à¸—à¹‡à¸šà¹à¸£à¸à¸‚à¸­à¸‡ Basic)
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    // à¹€à¸žà¸´à¹ˆà¸¡à¹€à¸§à¸¥à¸²à¸«à¸™à¹ˆà¸§à¸‡à¹€à¸›à¹‡à¸™ 500ms à¹€à¸žà¸·à¹ˆà¸­à¹ƒà¸«à¹‰à¹à¸™à¹ˆà¹ƒà¸ˆà¸§à¹ˆà¸² HTML à¸§à¸²à¸”à¹€à¸ªà¸£à¹‡à¸ˆà¹à¸¥à¹‰à¸§
    setTimeout(() => {
        console.log("ðŸ”„ Setting Defaults (Basic First Tabs)...");

        // 1. à¸•à¸±à¹‰à¸‡à¸„à¹ˆà¸² Checkbox à¸žà¸·à¹‰à¸™à¸à¸²à¸™
        const checkToTrue = [
            'video-random-voice-checkbox'
        ];

        checkToTrue.forEach(id => {
            const box = document.getElementById(id);
            if (box) box.checked = true; 
        });

        // ðŸ›‘ à¸›à¸´à¸”à¸ªà¸¸à¹ˆà¸¡à¸ªà¹„à¸•à¸¥à¹Œà¸ à¸²à¸žà¸™à¸´à¹ˆà¸‡ (à¹€à¸žà¸·à¹ˆà¸­à¹ƒà¸«à¹‰à¸«à¸™à¹‰à¸²à¹à¸Ÿà¸™à¸•à¸²à¸‹à¸µà¸ªà¸§à¹ˆà¸²à¸‡à¹à¸¥à¸°à¹ƒà¸«à¹‰à¸„à¸™à¸à¸”à¹€à¸¥à¸·à¸­à¸à¹€à¸­à¸‡à¹„à¸”à¹‰)
        const imgRandomStyleBox = document.getElementById('banana-random-style-switch');
        if (imgRandomStyleBox) {
            imgRandomStyleBox.checked = false; // à¸›à¸´à¸”à¸ªà¸¸à¹ˆà¸¡à¸ªà¹„à¸•à¸¥à¹Œ (à¸ªà¸µà¹€à¸—à¸²)
            imgRandomStyleBox.dispatchEvent(new Event('change', { bubbles: true })); 
        }

        const imgRandomBgBox = document.getElementById('banana-random-bg-switch');
        if (imgRandomBgBox) {
            imgRandomBgBox.checked = false;
            imgRandomBgBox.dispatchEvent(new Event('change', { bubbles: true }));
        }

        const imgRandomOutfitBox = document.getElementById('banana-random-outfit-switch');
        if (imgRandomOutfitBox) {
            imgRandomOutfitBox.checked = false;
            imgRandomOutfitBox.dispatchEvent(new Event('change', { bubbles: true }));
        }

        // ðŸ›‘ à¸›à¸´à¸”à¸ªà¸¸à¹ˆà¸¡ Video Style 
        const vRandomStyleBox = document.getElementById('video-random-style-switch');
        if (vRandomStyleBox) {
            vRandomStyleBox.checked = false; 
            vRandomStyleBox.dispatchEvent(new Event('change', { bubbles: true })); 
        }

        // ðŸ’¾ à¸›à¸´à¸”à¸£à¸°à¸šà¸šà¸šà¸±à¸™à¸—à¸¶à¸à¸„à¸¥à¸´à¸› (à¸”à¸²à¸§à¸™à¹Œà¹‚à¸«à¸¥à¸”) à¹€à¸›à¹‡à¸™à¸„à¹ˆà¸²à¹€à¸£à¸´à¹ˆà¸¡à¸•à¹‰à¸™ (Turbo Mode)
        const vDownloadCheckbox = document.getElementById('video-download-count-auto');
        if (vDownloadCheckbox) {
            vDownloadCheckbox.checked = false; 
        }

        // 2. à¸Ÿà¸±à¸‡à¸à¹Œà¸Šà¸±à¸™à¸ˆà¸³à¸¥à¸­à¸‡à¸à¸²à¸£à¸„à¸¥à¸´à¸ (Force Click)
        function forceClick(selector) {
            const el = document.querySelector(selector);
            if(el) el.click(); 
        }

        // --- ðŸŽ¨ à¸•à¸±à¹‰à¸‡à¸„à¹ˆà¸²à¹€à¸£à¸´à¹ˆà¸¡à¸•à¹‰à¸™à¸‚à¸­à¸‡à¸à¸±à¹ˆà¸‡ Banana (Images) ---
        forceClick('.mascot-card[data-value="liver"]');
        forceClick('.char-tab-btn[data-target="preset"]');
        forceClick('.char-card[data-value="teen_girl"]');
        forceClick('.config-tab-btn[data-type="style"][data-group="recommended"]');
        forceClick('.config-option[data-type="style"][data-value="ugc_basic"]');
        forceClick('.config-tab-btn[data-type="bg"][data-group="popular"]');
        forceClick('.config-option[data-type="bg"][data-value="ai_match"]');
        forceClick('.config-tab-btn[data-type="outfit"][data-group="recommended"]');
        forceClick('.config-option[data-type="outfit"][data-value="ai_match"]');

      // --- ðŸš€ à¸•à¸±à¹‰à¸‡à¸„à¹ˆà¸²à¹€à¸£à¸´à¹ˆà¸¡à¸•à¹‰à¸™à¸‚à¸­à¸‡à¸à¸±à¹ˆà¸‡ VIDEO ---
        // 2.1 à¹€à¸¥à¸·à¸­à¸à¸ªà¹„à¸•à¸¥à¹Œà¸§à¸´à¸”à¸µà¹‚à¸­à¹€à¸›à¹‡à¸™ "ðŸ¤³ à¸£à¸µà¸§à¸´à¸§à¸šà¹‰à¸²à¸™à¹† (UGC Review)"
        forceClick('.config-option[data-type="vstyle"][data-value="talk_ugc"]');

        // 2.2 à¹€à¸¥à¸·à¸­à¸à¸ªà¸³à¹€à¸™à¸µà¸¢à¸‡à¹€à¸ªà¸µà¸¢à¸‡à¹€à¸›à¹‡à¸™ "ðŸ”Š à¸à¸¥à¸²à¸‡" (Central)
        forceClick('.voice-btn[data-type="dialect"][data-value="central"]');

        // à¹€à¸£à¸µà¸¢à¸à¹€à¸Šà¹‡à¸„à¸ªà¸–à¸²à¸™à¸° UI à¹€à¸ªà¸µà¸¢à¸‡à¸«à¸¥à¸±à¸‡à¸•à¸±à¹‰à¸‡à¸„à¹ˆà¸²
        if (typeof checkVideoVoiceState === 'function') checkVideoVoiceState();

    }, 500); 
});

// ============================================

// ============================================


// ============================================
// ðŸŸ¢ UI LOGIC: à¹€à¸Šà¹‡à¸„à¸ªà¸–à¸²à¸™à¸°à¸à¸¥à¹ˆà¸­à¸‡à¹€à¸ªà¸µà¸¢à¸‡ + à¸à¸¥à¹ˆà¸­à¸‡à¹€à¸žà¸¨
// ============================================
function checkVideoVoiceState() {
    const styleInput = document.getElementById('video-style-select');
    const randomSwitch = document.getElementById('video-random-style-switch');
    const voiceContainer = document.getElementById('video-voice-container');
    const genderWrapper = document.getElementById('video-voice-gender-wrapper');

    if (!styleInput || !voiceContainer) return;

    const selectedStyle = styleInput.value;
    const isRandom = randomSwitch ? randomSwitch.checked : false;

    // à¸£à¸²à¸¢à¸Šà¸·à¹ˆà¸­à¹‚à¸«à¸¡à¸”
  const noVoiceModes = ['broll_hero', 'broll_pan', 'broll_zoom', 'broll_cinematic', 'broll_motion_detail', 'miniature_vdo']; 
  const voiceoverModes = ['voice_promo', 'voice_soft', 'voice_docu', 'cartoon', 'voice_rant', 'voice_miniature', 'voice_news', 'voice_movie'];

    // 1. à¸ˆà¸±à¸”à¸à¸²à¸£à¸„à¸§à¸²à¸¡à¸¡à¸·à¸”/à¸ªà¸§à¹ˆà¸²à¸‡à¸‚à¸­à¸‡à¸à¸¥à¹ˆà¸­à¸‡à¹€à¸ªà¸µà¸¢à¸‡à¸£à¸§à¸¡
    if (!isRandom && noVoiceModes.includes(selectedStyle)) {
        voiceContainer.classList.add('disabled-section');
    } else {
        voiceContainer.classList.remove('disabled-section');
    }

    // 2. à¸ˆà¸±à¸”à¸à¸²à¸£à¸à¸²à¸£à¹‚à¸Šà¸§à¹Œ/à¸‹à¹ˆà¸­à¸™ "à¸à¸¥à¹ˆà¸­à¸‡à¹€à¸¥à¸·à¸­à¸à¹€à¸žà¸¨à¹à¸¥à¸°à¸­à¸²à¸¢à¸¸"
    if (genderWrapper) {
        if (!isRandom && voiceoverModes.includes(selectedStyle)) {
            genderWrapper.style.display = 'block';
            genderWrapper.classList.add('fade-in'); 
        } else {
            genderWrapper.style.display = 'none';
        }
    }
}



// à¸„à¸§à¸šà¸„à¸¸à¸¡à¸à¸²à¸£à¹€à¸›à¸´à¸”/à¸›à¸´à¸”à¸Šà¹ˆà¸­à¸‡à¸à¸£à¸­à¸à¸‚à¹‰à¸­à¸„à¸§à¸²à¸¡à¸•à¸²à¸¡ Checkbox
document.addEventListener('DOMContentLoaded', () => {
    const textToggle = document.getElementById('banana-text-overlay-checkbox');
    const textWrapper = document.getElementById('banana-custom-text-wrapper');

    if (textToggle && textWrapper) {
        textToggle.addEventListener('change', (e) => {
            if (e.target.checked) {
                textWrapper.style.display = 'block';
            } else {
                textWrapper.style.display = 'none';
            }
        });
        
        // à¸£à¸±à¸™à¸„à¸£à¸±à¹‰à¸‡à¹à¸£à¸à¹€à¸žà¸·à¹ˆà¸­à¸•à¸±à¹‰à¸‡à¸„à¹ˆà¸²à¹€à¸£à¸´à¹ˆà¸¡à¸•à¹‰à¸™
        textWrapper.style.display = textToggle.checked ? 'block' : 'none';
    }
});
