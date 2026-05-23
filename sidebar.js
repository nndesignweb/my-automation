// ============================================
// 🛡️ SECURITY CORE: TAMPER PROTECTION SYSTEM
// ============================================
// ตัวแปรลับสำหรับเช็คสถานะ (ห้ามลบ)
let _0x99f = false; 

function _secureCheck() {
    // 1. เช็คว่ามีไฟล์ auth.js โหลดเข้ามาไหม
    if (typeof AUTH === 'undefined') {
        _selfDestruct("E01: Missing Core Library");
        return false;
    }
    
    // 2. เช็คว่าหน้า HTML มีกล่อง Login หรือไม่ (ป้องกันการลบ Element)
    const overlay = document.getElementById('auth-overlay');
    const keyInput = document.getElementById('license-key-input');
    
    if (!overlay || !keyInput) {
        _selfDestruct("E02: UI Integrity Violation");
        return false;
    }
    
    _0x99f = true; // ผ่านการตรวจสอบ
    return true;
}

function _selfDestruct(reason) {
    // 💣 ระเบิดโปรแกรม: ล้างหน้าจอทิ้งทั้งหมด
    document.body.innerHTML = `
        <div style="background:black; color:red; height:100vh; display:flex; flex-direction:column; justify-content:center; align-items:center; font-family:monospace; text-align:center;">
            <h1 style="font-size:40px;">⚠️ SYSTEM CORRUPTED</h1>
            <p style="color:#fff;">${reason}</p>
            <p style="color:#555; margin-top:20px;">Unauthorized modification detected.</p>
        </div>
    `;
    // ทำลายตัวแปรทิ้ง
    window.bananaHandleAutomation = null;
    window.videoRunAutomation = null;
    throw new Error("Security Violation: " + reason);
}

// เช็คความปลอดภัยทันทีที่โหลดไฟล์
_secureCheck();

// เช็คซ้ำทุกๆ 2 วินาที (Watchdog) - กันคนแอบลบทีหลังผ่าน Inspect Element
setInterval(() => {
    _secureCheck();
}, 2000);


// ============================================
// 🟢 ส่วนที่เพิ่มใหม่ 1: ระบบสลับโหมด (วางต่อจาก _secureCheck)
// ============================================

// ฟังก์ชันสลับโหมด Human / Mascot (ฉบับปรับปรุง: เพิ่มระบบ Refresh UI ทันที)
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
        
        // 🌸 ใช้ Class แทนการฝังสี
        if(btnHuman) btnHuman.classList.add('active');
        if(btnMascot) btnMascot.classList.remove('active');
    } else {
        if(humanZone) humanZone.style.display = 'none';
        if(mascotZone) mascotZone.style.display = 'block';
        if(humanSource) humanSource.style.display = 'none';
        if(mascotSource) mascotSource.style.display = 'block';
        
        // 🌸 ใช้ Class แทนการฝังสี
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
// 🟢 [DEBUGGED VERSION] ฟังก์ชันจัดการปุ่มกดหน้า Mascot
// ============================================
function setupMascotEvents() {
    console.log("🧸 Setup Mascot Events (Starting)...");

    // ฟังก์ชันช่วยผูกปุ่ม (ฉบับแก้ไข: รองรับปุ่มที่ไม่มีกล่อง Custom เช่น สีหน้า)
    function setupCustomToggle(btnClass, wrapperId, inputId, hiddenInputId) {
        const buttons = document.querySelectorAll(btnClass);
        const wrapper = wrapperId ? document.getElementById(wrapperId) : null;
        const input = inputId ? document.getElementById(inputId) : null;
        const hiddenInput = document.getElementById(hiddenInputId);

        // [จุดที่แก้ไข]: ไม่สั่ง return ทันที แต่จะเช็คเฉพาะเมื่อมีการส่ง ID มาเท่านั้น
        if (wrapperId && !wrapper) { console.warn(`⚠️ ไม่พบ Wrapper: ${wrapperId}`); }
        if (inputId && !input) { console.warn(`⚠️ ไม่พบ Input: ${inputId}`); }

        buttons.forEach(btn => {
            // Clone เพื่อล้าง Event เก่า ป้องกันการซ้อนทับ
            const newBtn = btn.cloneNode(true);
            btn.parentNode.replaceChild(newBtn, btn);

            newBtn.addEventListener('click', () => {
                if (newBtn.disabled || newBtn.classList.contains('is-locked')) {
                    return;
                }
                console.log(`🖱ï¸ Clicked: ${btnClass} -> Value: ${newBtn.dataset.value}`);

                // 1. จัดการสถานะ Active บน UI
                document.querySelectorAll(btnClass).forEach(b => b.classList.remove('active'));
                newBtn.classList.add('active');

                const value = newBtn.dataset.value;

                // 2. อัปเดตค่าลง Hidden Input ของระบบ
                if (hiddenInput) {
                    hiddenInput.value = value;
                    hiddenInput.dispatchEvent(new Event('change', { bubbles: true }));
                }

                // 3. จัดการเปิด/ปิดกล่องระบุเอง (Custom Wrapper) เฉพาะถ้ามี Element อยู่จริง
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

    // 1. ตัวละคร (Character)
    setupCustomToggle('.mascot-card', 'mascot-custom-wrapper', 'mascot-custom-input', null);

    // 2. ฉาก (Scene)
    setupCustomToggle('.mascot-bg', 'mascot-custom-bg-wrapper', 'mascot-custom-bg-input', 'mascot-bg-select');

    // 3. ชุด (Outfit)
    setupCustomToggle('.mascot-outfit', 'mascot-custom-outfit-wrapper', 'mascot-custom-outfit-input', 'mascot-outfit-select');

    // 🟢 [แก้ไขแล้ว]: ตอนนี้ปุ่มสีหน้าจะทำงานได้แล้วแม้ไม่มีกล่องข้อความ
    setupCustomToggle('.mascot-expression', null, null, 'mascot-expression-select');
}


// ============================================
// 1. SYSTEM: VISUAL UI CONTROLLER
// ============================================

// A. เปลี่ยนแท็บคาแรคเตอร์ (แก้ไข: รองรับ data-target="auto" ของปุ่มระบุเอง)
function switchCharTab(tabName) {
    if ((tabName === 'auto' || tabName === 'custom') && window.FeatureGate && !FeatureGate.can('customCharacter')) {
        tabName = 'preset';
    }

    const tabs = document.querySelectorAll('#character-source-human .char-tab-btn:not(.config-tab-btn), #workspace-human .char-tab-btn:not(.config-tab-btn)');
    const groups = document.querySelectorAll('#character-source-human .char-group, #workspace-human .char-group');
    
    // 1. เปลี่ยนสีปุ่ม Tab ให้ Active
    tabs.forEach(btn => {
        const target = btn.dataset.target || btn.getAttribute('data-target');
        if (target === tabName) btn.classList.add('active');
        else btn.classList.remove('active');
    });
    
    // 2. สลับการแสดงผล Grid รูปภาพ (หญิง/ชาย/อาชีพ)
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

    // 🟢 3. จัดการช่อง "ระบุเอง" (แก้บั๊ก: เช็ค 'auto' ให้ตรงกับ HTML)
    const customInput = document.getElementById('banana-custom-character-input');
    if (customInput) {
        // หาตัวครอบ (Wrapper) เพื่อซ่อนทั้ง Label และ Input พร้อมกัน
        const wrapper = customInput.closest('#char-group-custom') || customInput.closest('.custom-character-box'); 
        
        // ✅ แก้ไขเงื่อนไข: ถ้าเป็น 'auto' (ปุ่มระบุเอง) หรือ 'custom' ให้แสดงช่องกรอก
        if (tabName === 'auto' || tabName === 'custom') {
            if (wrapper && wrapper.id !== 'char-group-custom') wrapper.style.display = 'block';
            else customInput.style.display = 'block';
            
            // โฟกัสไปที่ช่องพิมพ์ทันที
            setTimeout(() => customInput.focus(), 100);
        } else {
            // ❌ ถ้าเลือกแท็บอื่น (หญิง/ชาย/อาชีพ) -> ให้ซ่อน
            if (wrapper && wrapper.id !== 'char-group-custom') wrapper.style.display = 'none';
            else customInput.style.display = 'none';
        }
    }
}

window.switchCharTab = switchCharTab;



// B. เลือกคาแรคเตอร์ (ฉบับอัปเดต: ล็อคชุดให้ Job และ Senior)
function selectCharacter(element, value) {
    if (element.disabled || element.classList.contains('is-locked')) {
        showToast('ตัวเลือกนี้ใช้ได้เฉพาะ Premium', 'warning');
        return;
    }

    // 1. เก็บค่าลง Input หลัก
    const hiddenInput = document.getElementById('banana-character-select');
    if (hiddenInput) hiddenInput.value = value;

    // 2. เปลี่ยนสีปุ่ม Active
    document.querySelectorAll('#character-source-human .char-group .char-card:not(.config-option), #workspace-human .char-group .char-card:not(.config-option)').forEach(card => card.classList.remove('active'));
    element.classList.add('active');

    // ========================================================
    // 🟢 [อัปเดต] Logic ล็อคช่องเลือกชุด (Job + Senior)
    // ========================================================
    
    // 1. เช็คว่าเป็นหมวด "อาชีพ" หรือไม่?
    const outfitLockedCharacters = new Set([
        'seller_woman', 'seller_man', 'doctor_female', 'doctor_male', 'nurse_female', 'nurse_male',
        'chef_female', 'chef_male', 'rider_male', 'farmer_female', 'warrior', 'princess',
        'detective', 'mafia_boss', 'cyber_girl', 'traveler'
    ]);
    const isOutfitLockedCharacter = outfitLockedCharacters.has(value) || element.classList.contains('costume-locked');
    
    // 2. เช็คว่าเป็นหมวด "สูงวัย" (มนุษย์ป้า/ลุง/ยาย/ตา) หรือไม่?  <-- เพิ่มตรงนี้
    const isSeniorGroup = false;
    
    // หา Wrapper ของส่วนเลือกชุด
    const outfitContent = document.getElementById('config-content-outfit');
    const outfitWrapper = outfitContent ? outfitContent.closest('.input-group') : null;

    if (outfitWrapper) {
        // 🔒 ถ้าเป็น "อาชีพ" หรือ "สูงวัย" -> ให้ล็อคช่องชุดทันที!
        if (isOutfitLockedCharacter || isSeniorGroup) {
            outfitWrapper.classList.add('disabled-section');
            
            // รีเซ็ตปุ่มชุดให้กลับไปเป็น "สุ่ม" (Auto) เพื่อความเรียบร้อย
            const outfitAutoBtn = document.querySelector('#config-content-outfit .config-option[data-value="ai_match"]');
            if (outfitAutoBtn) outfitAutoBtn.click(); 
            
        } else {
            // 🔓 ถ้าเป็นหมวดอื่น (วัยรุ่น, ไฮโซ) -> ปลดล็อคให้เลือกชุดได้ปกติ
            outfitWrapper.classList.remove('disabled-section');
        }
    }

    // 3. Logic เดิม: เคลียร์รูปนางแบบถ้าเลือกคาแรคเตอร์
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

// D. Select Config Option (ฉบับอัปเดต: ปิดชุดให้ Fashion และกลุ่ม Close-up)
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

function setDefaultBgToAiMatch() {
    const bgInput = document.getElementById('banana-bg-select');
    if (bgInput) bgInput.value = 'ai_match';

    const bgContent = document.getElementById('config-content-bg');
    if (bgContent) {
        bgContent.querySelectorAll('.config-option').forEach((option) => {
            option.classList.toggle('active', option.dataset.value === 'ai_match');
        });
        bgContent.querySelectorAll('.config-tab-btn').forEach((tab) => {
            tab.classList.toggle('active', tab.dataset.group === 'popular');
        });
        bgContent.querySelectorAll('.char-grid[id^="bg-group-"]').forEach((group) => {
            group.style.display = group.id === 'bg-group-popular' ? 'grid' : 'none';
        });
    }
}

function selectConfigOption(element) {
    if (element.disabled || element.classList.contains('is-locked')) {
        showToast('ตัวเลือกนี้ใช้ได้เฉพาะ Premium', 'warning');
        return;
    }

    const type = element.dataset.type;
    const value = element.dataset.value;
    const label = element.dataset.label;
    enableManualConfigMode(type);

    // 1. อัปเดตค่าลง Input
    let input = document.getElementById(`banana-${type}-select`);
    if (!input && type === 'vstyle') {
        input = document.getElementById('video-style-select');
    }
    if(input) input.value = value;

    // 2. อัปเดตข้อความที่แสดง
    const display = document.getElementById(`display-${type}`);
    if(display) {
        let cleanLabel = label;
        if(label.includes(' ')) cleanLabel = label.split(' ').slice(1).join(' ');
        display.innerHTML = label; 
    }

    // 3. เปลี่ยนสีปุ่ม
    const container = document.getElementById(`config-content-${type}`);
    if(container) {
        container.querySelectorAll('.config-option').forEach(opt => opt.classList.remove('active'));
    }
    element.classList.add('active');
    
    if (type !== 'vstyle') {
        toggleConfig(type);
    }

// ============================================================
    // 🟢 LOGIC: ล็อค "คาแรคเตอร์", "ฉาก" และ "ชุด" อัตโนมัติเมื่อเปลี่ยนสไตล์ภาพ
    // ============================================================
    if (type === 'style') {
        const outfitWrapper = document.getElementById('config-content-outfit')?.closest('.input-group');
        const bgWrapper = document.getElementById('config-content-bg')?.closest('.input-group');
        const charWrapper = document.getElementById('banana-character-select')?.closest('.input-group'); 
        
        const bgRandomSwitch = document.getElementById('banana-random-bg-switch');
        const outfitRandomSwitch = document.getElementById('banana-random-outfit-switch');

        // 1. จัดกลุ่มสไตล์ที่ต้องล็อค
        const noHumanStyles = ['real_demo', 'texture', 'unboxing', 'shoes', 'hands', 'decor', 'showcase', 'studio_photo', 'catalog', 'counter_display', 'premium_closeup', 'fancy', 'cgi', 'miniature'];
        const noOutfitStyles = ['mirror', 'clothing_campaign', 'real_demo', 'texture', 'unboxing', 'shoes', 'hands', 'decor', 'showcase', 'studio_photo', 'catalog', 'counter_display', 'premium_closeup', 'fancy', 'cgi', 'miniature']; // สไตล์สินค้า+ฉาก/เฉพาะทางไม่ใช้ค่าชุด
        const fixedBgStyles = ['mirror']; // 🟢 บังคับฉากในร่ม (เซลฟี่ลองชุด) -> ล็อคฉาก
        const setCharacterSectionLocked = (locked, message = 'โหมดนี้ไม่ใช้นางแบบ') => {
            if (!charWrapper) return;
            charWrapper.classList.toggle('disabled-section', locked);
            charWrapper.classList.toggle('model-ignored-section', locked);
            if (locked) {
                charWrapper.dataset.lockNote = message;
                charWrapper.setAttribute('title', message);
            } else {
                delete charWrapper.dataset.lockNote;
                charWrapper.removeAttribute('title');
            }
        };

        if (value === 'miniature') {
            // 🏙️ สไตล์เมืองจิ๋ว: ตั้งค่าเริ่มต้นให้ แต่ยังให้เลือกฉากและชุดเองได้
            if (bgWrapper) bgWrapper.classList.remove('disabled-section');
            if (outfitWrapper) outfitWrapper.classList.add('disabled-section');
            setCharacterSectionLocked(true);

            if (bgRandomSwitch) { bgRandomSwitch.checked = false; bgRandomSwitch.disabled = false; }
            if (outfitRandomSwitch) { outfitRandomSwitch.checked = false; outfitRandomSwitch.disabled = true; }

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
            // 🖼ï¸ สไตล์ไร้คน: ล็อค คาแรคเตอร์ + ชุด (แต่ยังให้เลือกฉากได้อิสระ)
            if (bgWrapper) bgWrapper.classList.remove('disabled-section');
            if (bgRandomSwitch) bgRandomSwitch.disabled = false;

            if (outfitWrapper) outfitWrapper.classList.add('disabled-section');
            setCharacterSectionLocked(true);

            if (outfitRandomSwitch) { outfitRandomSwitch.checked = false; outfitRandomSwitch.disabled = true; }

            const outfitAutoBtn = document.querySelector('#config-content-outfit .config-option[data-value="ai_match"]');
            const characterInput = document.getElementById('banana-character-select');
            
            if (outfitAutoBtn) outfitAutoBtn.click();
            if (characterInput) characterInput.value = 'office_lady';
            if (typeof switchCharTab === 'function') switchCharTab('preset');
            
            const charCustomInput = document.getElementById('banana-custom-character-input');
            if (charCustomInput) charCustomInput.value = '';

        } else {
            // 🔓 สไตล์อื่นๆ: ปลดล็อคคาแรคเตอร์เสมอ
            setCharacterSectionLocked(false);
            
            // 🟢 ตรวจสอบว่าจะต้องล็อค "ฉาก" หรือไม่ (สำหรับหน้ากระจก)
            if (bgWrapper) {
                if (fixedBgStyles.includes(value)) {
                    bgWrapper.classList.add('disabled-section'); // ล็อกฉากให้มืด
                    if (bgRandomSwitch) { bgRandomSwitch.checked = false; bgRandomSwitch.disabled = true; } // ปิดสุ่มฉาก
                    
                    // แอบกดเลือกฉาก "ห้องนอน (bedroom)" ให้อัตโนมัติ เพื่อให้สมจริง
                    const bedroomBtn = document.querySelector('#config-content-bg .config-option[data-value="bedroom"]');
                    if (bedroomBtn) bedroomBtn.click();
                } else {
                    bgWrapper.classList.remove('disabled-section'); // ปลดล็อกฉาก
                    if (bgRandomSwitch) bgRandomSwitch.disabled = false;
                }
            }

            // ตรวจสอบว่าจะต้องล็อค "ชุด" หรือไม่
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
	
	
	// 🟢 เพิ่ม: ถ้าเป็นการเลือก Video Style ให้เช็คว่าจะปิดกล่องเสียงไหม
    if (type === 'vstyle') {
        if (typeof checkVideoVoiceState === 'function') checkVideoVoiceState();
    }
    syncCharacterOutfitLock();
	
}


// E. Switch Config Tab (ฉบับแก้ไข: รองรับ Custom Tab + Auto Focus)
function switchConfigTab(element) {
    if (element.disabled || element.classList.contains('is-locked')) {
        showToast('ตัวเลือกนี้ใช้ได้เฉพาะ Premium', 'warning');
        return;
    }

    const type = element.dataset.type; // 'style', 'bg', 'outfit', 'vstyle'
    const groupName = element.dataset.group;
    enableManualConfigMode(type);

    if (groupName === 'custom' && window.FeatureGate) {
        const featureName = type === 'bg' ? 'customScene' : (type === 'outfit' ? 'customOutfit' : null);
        if (featureName && !FeatureGate.can(featureName)) {
            showToast('โหมดระบุเองใช้ได้เฉพาะ Premium', 'warning');
            return;
        }
    }
    
    const container = document.getElementById(`config-content-${type}`);
    if(!container) return;

    // 1. เปลี่ยนสถานะปุ่ม Tab ให้ Active
    container.querySelectorAll('.config-tab-btn').forEach(btn => btn.classList.remove('active'));
    element.classList.add('active');

   // 2. กำหนดรายการกลุ่มของแต่ละประเภท (อัปเดตให้เหลือ 4 กลุ่ม)
    let groups = [];
    if(type === 'style') {
       groups = ['recommended', 'human', 'product'];
    } else if (type === 'bg') {
       groups = ['popular', 'other', 'custom']; 
    } else if (type === 'outfit') {
       groups = ['recommended', 'all', 'custom']; 
    } else if (type === 'vstyle') { 
       groups = ['promo', 'review', 'demo', 'fun', 'voiceover', 'broll'];
    }

    // 3. วนลูปเปิด/ปิด Group และ Auto Select
    groups.forEach(g => {
        const groupId = `${type}-group-${g}`;
        const el = document.getElementById(groupId);
        
        if(el) {
            if (g === groupName) {
                // เปิดแสดงผล Group นี้
                // หมายเหตุ: ถ้าเป็น 'custom' หรือ 'auto' ให้ใช้ display: block (ไม่ใช่ grid)
                el.style.display = (g === 'auto' || g === 'custom') ? 'block' : 'grid';

                // Auto Select: ถ้ามีตัวเลือกแค่ 1 อัน หรือเป็นโหมด auto -> กดให้เลย
                const options = el.querySelectorAll('.config-option');
                if (options.length > 0) {
                    if (options.length === 1 || g === 'auto') {
                        setTimeout(() => {
                            options[0].click();
                        }, 50);
                    }
                }

            } else {
                // ปิด Group อื่น
                el.style.display = 'none';
            }
        }
    });

    // 🟢 [Logic พิเศษ] ถ้าเลือกแท็บ custom ให้โฟกัสช่องพิมพ์ทันที
    if (groupName === 'custom') {
        const inputId = `banana-custom-${type}-input`; // สร้าง ID อัตโนมัติ เช่น banana-custom-bg-input
        const input = document.getElementById(inputId);
        if(input) {
            setTimeout(() => input.focus(), 100);
        }
    }
}




// F. Select Segment (Rounds & Clips) - แก้ไขรองรับทั้ง Video และ Banana
function selectSegment(element) {
    if (element.disabled || element.classList.contains('is-locked')) {
        showToast('ตัวเลือกนี้ใช้ได้เฉพาะ Premium', 'warning');
        return;
    }
    const type = element.dataset.type;   // 'rounds' หรือ 'clips'
    const value = element.dataset.value; // '1', '3', '5', 'custom'

    // 1. เช็คว่ากดมาจากหน้าไหน? (Video หรือ Banana)
    const isVideoTab = element.closest('#tab-content-video') !== null;
    const isBasicPlan = window.FeatureGate && FeatureGate.getPlan && FeatureGate.getPlan() === 'basic';
    if (isBasicPlan && type === 'rounds' && (value === '5' || value === 'custom')) {
        showToast('Basic จำกัดรอบสูงสุด 3 รอบ', 'warning');
        if (window.FeatureGate) FeatureGate.enforceBasicRoundLimit();
        return;
    }
    
    // 2. กำหนด ID เป้าหมายให้ถูกฝั่ง
    let mainInputId, customInputId;

    if (isVideoTab) {
        // ฝั่ง Video
        mainInputId = (type === 'rounds') ? 'video-round-count' : 'video-download-count-auto';
        customInputId = 'video-custom-round-input';
    } else {
        // ฝั่ง Banana
        mainInputId = (type === 'rounds') ? 'banana-round-count' : 'banana-download-count';
        customInputId = 'banana-custom-round-input';
    }

    // 3. จัดการกรณีเลือก 'custom' (+)
    if (value === 'custom') {
        const customInput = document.getElementById(customInputId);
        if (customInput) {
            customInput.classList.remove('hidden'); // เปิดช่องกรอก
            customInput.style.display = 'block';    // บังคับโชว์
            customInput.focus();
        }
        
        // อัปเดต UI ปุ่ม
        const parent = element.parentElement;
        parent.querySelectorAll('.segment-opt').forEach(b => b.classList.remove('active'));
        element.classList.add('active');
        
        // บอก input หลักว่าเป็น custom
        const mainInput = document.getElementById(mainInputId);
        if (mainInput) mainInput.value = 'custom';
        
        return; // จบงาน
    }

    // 4. จัดการกรณีเลือกตัวเลขปกติ (1, 3, 5)
    // ซ่อนช่อง custom กลับไป
    const customInput = document.getElementById(customInputId);
    if (customInput) {
        customInput.classList.add('hidden');
        customInput.style.display = 'none';
    }

    // อัปเดตค่าลง Input หลัก
    const mainInput = document.getElementById(mainInputId);
    if (mainInput) {
        mainInput.value = value;
        
        // อัปเดต UI ปุ่ม active
        const parent = element.parentElement;
        parent.querySelectorAll('.segment-opt').forEach(b => b.classList.remove('active'));
        element.classList.add('active');

        // สั่งอัปเดตข้อความสรุปทันที
        if (isVideoTab && typeof videoUpdateRoundInfo === 'function') videoUpdateRoundInfo();
        if (!isVideoTab && typeof bananaUpdateRoundInfo === 'function') bananaUpdateRoundInfo();
    }
}

// G. Setup Visual UI
function setupAllVisualUI() {
    console.log("🛠️ Setting up Visual UI...");
    function addSafeClick(selector, callback) {
        const elements = document.querySelectorAll(selector);
        elements.forEach(el => {
            const newEl = el.cloneNode(true);
            el.parentNode.replaceChild(newEl, el);
            newEl.addEventListener('click', (e) => callback(newEl, e));
        });
    }

    addSafeClick('.char-tab-btn:not(.config-tab-btn)', (btn) => switchCharTab(btn.dataset.target || btn.getAttribute('data-target')));
    
    // 🟢 [จุดที่แก้ไข]: เพิ่ม :not(.mascot-expression) เพื่อสั่งให้ระบบ "ห้ามล้างรูปนางแบบ" เมื่อมีการเปลี่ยนสีหน้ามาสคอต
    addSafeClick('.char-card:not(.mascot-card):not(.mascot-bg):not(.mascot-outfit):not(.mascot-expression)', (card) => selectCharacter(card, card.dataset.value));
	
    addSafeClick('.config-header', (header) => toggleConfig(header.dataset.target));
    addSafeClick('.config-option', (opt) => selectConfigOption(opt));
    addSafeClick('.config-tab-btn', (btn) => switchConfigTab(btn));
    addSafeClick('.segment-opt', (seg) => selectSegment(seg));
    setDefaultBgToAiMatch();
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
        live: '🔴 ไลฟ์ขายของ',
        fashion: '👗 สวมใส่สินค้า',
        usage: '📸 ใช้งานจริง',
        real_demo: '🖐️ สาธิตใช้จริง',
        real_user_review: '🙂 รีวิวใช้จริง',
        funny: '🤪 หัวโต',
        sony_product: '📷 สินค้าเด่นสมจริง',
        shop_review: '🧺 โต๊ะรีวิวสินค้า',
        natural_light: '🌤️ แสงละมุน',
        real_ads: '🎯 โฆษณาสมจริง',
        clothing_campaign: '👗 โฆษณาเสื้อผ้า',
        model: '💃 นายแบบสินค้า',
        influencer: '🤳 รีวิว Vlog',
        beauty: '💄 บิวตี้ (หน้าชัด)',
        review: '✋ รีวิวโต๊ะสินค้า',
        mirror: '🪞 เซลฟี่ลองชุด',
        sony_portrait: '📸 พอร์ตเทรตสมจริง',
        lifestyle_review: '☕ รีวิวชีวิตจริง',
        texture: '💧 เนื้อสัมผัส (ซูม)',
        unboxing: '🤲 ถือโชว์ POV',
        shoes: '👟 รองเท้า (เห็นเท้า)',
        hands: '🛠️ สาธิต (เห็นมือ)',
        decor: '🛋️ ของชิ้นใหญ่',
        showcase: '🖼️ สินค้า Hero',
        studio_photo: '📸 ภาพถ่ายสตูดิโอ',
        catalog: '🧾 แคตตาล็อกสินค้า',
        counter_display: '🛒 วางขายหน้าร้าน',
        premium_closeup: '🔎 Premium Close-up',
        fancy: '✨ แฟนซี (ของลอย)',
        cgi: '🪐 CGI สินค้ายักษ์',
        miniature: '🏙️ เมืองจิ๋ว',
        outdoor_market: '⛱️ บูธขายกลางแจ้ง',
    };
    Object.entries(styleLabels).forEach(([value, text]) => {
        document.querySelectorAll(`.config-option[data-type="style"][data-value="${value}"]`).forEach((item) => {
            item.innerHTML = `<span class="char-icon">${text.split(' ')[0]}</span> ${text.replace(/^\S+\s*/, '')}`;
            item.dataset.label = text;
        });
    });

    const styleNotes = {
        fashion: {
            title: 'เหมาะกับรองเท้า กระเป๋า เครื่องประดับ หมวก แว่น นาฬิกา หรือของที่สวม/ถือบนตัว'
        },
        clothing_campaign: {
            title: 'เหมาะกับเสื้อผ้า ชุด เดรส คอสตูม ชุดว่ายน้ำ'
        },
        mirror: {
            title: 'เหมาะกับเสื้อผ้า/ชุด แบบลองชุดหน้ากระจก'
        },
        real_demo: {
            title: 'เหมาะกับสินค้าที่ต้องสาธิตวิธีใช้หรือเห็นผลลัพธ์'
        },
        texture: {
            title: 'เหมาะกับสินค้าเน้นเนื้อสัมผัส วัสดุ ผิว รายละเอียด'
        },
        unboxing: {
            title: 'เหมาะกับสินค้าที่ต้องถือโชว์มุมมอง POV'
        },
        shoes: {
            title: 'เหมาะกับรองเท้าหรือสินค้าที่ต้องเห็นเท้า'
        },
        studio_photo: {
            title: 'เหมาะกับสินค้าทุกแบบที่ต้องการภาพสตูดิโอพรีเมียม'
        },
        fancy: {
            title: 'เหมาะกับสินค้าที่ต้องการ CG แฟนตาซี ของลอย เอฟเฟกต์'
        },
        cgi: {
            title: 'เหมาะกับสินค้าแบบ CGI ยักษ์ ไม่มีคน'
        },
        miniature: {
            title: 'เหมาะกับสินค้าในฉากโลกจิ๋ว/เมืองจิ๋ว'
        }
    };
    Object.entries(styleNotes).forEach(([value, note]) => {
        document.querySelectorAll(`.config-option[data-type="style"][data-value="${value}"]`).forEach((item) => {
            item.classList.add('specialty-style');
            item.title = note.title;
            if (!item.querySelector('.style-note-badge')) {
                item.insertAdjacentHTML('beforeend', '<span class="style-note-badge" aria-label="คำแนะนำ">ⓘ</span>');
            }
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
    // 🟢 ส่วนที่เพิ่มใหม่ 2: สั่งให้ปุ่มทำงาน (วางบรรทัดแรกใน DOMContentLoaded)
    // ============================================
    
    // 1. ผูกปุ่มสลับโหมด Human/Mascot ให้กดได้
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

    // 2. เรียกใช้ฟังก์ชันจัดการปุ่มหน้า Mascot
    setupMascotEvents();
    
    // ============================================
    // (จบส่วนที่เพิ่มใหม่ - โค้ดเดิมต่อจากนี้ห้ามลบ)
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
	// 🟢 เพิ่ม: เช็คสถานะกล่องเสียงทันทีที่โหลดเสร็จ
        if (typeof checkVideoVoiceState === 'function') checkVideoVoiceState();
    }
// 🟢 Tab Switching Logic
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
// 🛠️ ROBUST CLICK SYSTEM (เพิ่มเพื่อความเสถียร)
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
  if (text.includes('เสร็จ') || text.includes('complete') || text.includes('mission complete')) {
    return { percent: 100, step: 'run' };
  }
  if (text.includes('error') || text.includes('หยุด') || text.includes('stop')) {
    return { percent: isRunning ? 55 : 0, step: 'run' };
  }
  if (text.includes('download') || text.includes('ดาวน์โหลด') || text.includes('ดูดไฟล์') || text.includes('บันทึก')) {
    return { percent: 88, step: 'run' };
  }
  if (text.includes('รอ') || text.includes('generat') || text.includes('render') || text.includes('create') || text.includes('สร้าง')) {
    return { percent: 68, step: 'run' };
  }
  if (text.includes('upload') || text.includes('อัพโหลด') || text.includes('เพิ่มลงพรอมต์')) {
    return { percent: 38, step: 'assets' };
  }
  if (text.includes('prompt') || text.includes('พรอมต์') || text.includes('keyword') || text.includes('fill')) {
    return { percent: 24, step: 'prompt' };
  }
  if (text.includes('style') || text.includes('เสียง') || text.includes('ตั้งค่า') || text.includes('mode')) {
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
    assets: 'เตรียมข้อมูลและรูปภาพ',
    prompt: 'กำลังสร้าง Prompt',
    creative: 'กำลังตั้งค่าสไตล์',
    run: 'กำลังรันงาน',
  };

  if (bar) bar.style.width = `${safePercent}%`;
  if (text) text.textContent = `${Math.round(safePercent)}%`;
  if (stepText) stepText.textContent = `ขั้นตอน: ${stepLabels[stepName] || stepLabels.assets}`;

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
// 🛡️ ANTI-BOT PROMPT RANDOMIZER
// ============================================
function getAntiBotSeed() {
    // สุ่มคำคุณศัพท์และรหัส เพื่อให้ Prompt แต่ละรอบมี Hash ไม่ซ้ำกัน
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
// [ส่วนเพิ่มใหม่] ตัวแปรสำหรับเลือกเสียง/สำเนียง
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
// VIDEO IMAGE PREVIEW SYSTEM (เพิ่มใหม่)
// ============================================
const videoPreviewContainer = document.getElementById('video-preview-container');

// ฟังก์ชันจัดการไฟล์ที่อัปโหลด (Video)
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
      videoUpdateImageCount(); // เรียกอัปเดตหน้าจอ
    };
    reader.readAsDataURL(file);
  });

  videoFileInput.value = '';
}

// ฟังก์ชันลบรูปทั้งหมด (Video)
function videoClearAllImages() {
  videoUploadedImages = [];
  videoUpdateImageCount();
  videoUpdateStatus('All images cleared');
}

// ฟังก์ชันลบทีละรูป (Video)
function videoRemoveOneImage(index) {
  videoUploadedImages.splice(index, 1);
  videoUpdateImageCount();
}

// ฟังก์ชันอัปเดตหน้าจอและแสดงรูปตัวอย่าง (Video)
function videoUpdateImageCount() {
  // 1. อัปเดตตัวเลข
  videoImageCount.textContent = videoUploadedImages.length;

  // 2. จัดการปุ่ม Clear All
  if (videoUploadedImages.length > 0) {
    if(videoClearImagesBtn) videoClearImagesBtn.style.display = 'flex';
  } else {
    if(videoClearImagesBtn) videoClearImagesBtn.style.display = 'none';
  }

  // 3. อัปเดตข้อมูลรอบ
  videoUpdateRoundInfo();

  // 4. สร้างรูปตัวอย่าง (Render Previews)
  if (videoPreviewContainer) {
    videoPreviewContainer.innerHTML = ''; // เคลียร์ของเก่า

    videoUploadedImages.forEach((img, index) => {
      const item = document.createElement('div');
      item.className = 'preview-item'; // ใช้ Style เดียวกับหน้า Banana

      const imgEl = document.createElement('img');
      imgEl.src = img.dataUrl;
      imgEl.title = img.name;

      // ปุ่มลบ
      const delBtn = document.createElement('button');
      delBtn.className = 'preview-remove-btn';
      delBtn.innerHTML = '✕';
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

  // แก้ไข: ปลดล็อคโชว์ Text เสมอ (ของเดิมซ่อนไว้)
  if (roundInfo) {
      roundInfo.style.display = 'block';
      const roundsPerImage = videoGetRoundsPerImage();
      const totalRounds = imageTotal * roundsPerImage;

      if (imageTotal === 0) {
        roundInfo.textContent = `ตั้งค่า: ${roundsPerImage} รอบต่อภาพ`;
      } else {
        roundInfo.textContent = `คิวรวม: ${imageTotal} ภาพ × ${roundsPerImage} รอบ = รันทั้งหมด ${totalRounds} คลิป`;
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
          // แก้ไข: ดักจับกรณีพิมพ์ตัวอักษร (NaN) หรือติดลบ ให้คืนค่า 1 เสมอ
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
    videoLogContainer.innerHTML = '<div class="log-empty">ยังไม่มี log</div>';
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

// Video Prompt & Play Studio: Setup event listeners (Fix: แยกกลุ่มปุ่มเสียงให้กดพร้อมกันได้)
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
    
    // แก้ไข Logic ตรงนี้เพื่อให้แสดงผลสไตล์ตลอดเวลา แต่จางลงเมื่อเลือกสุ่ม
    const randomVStyleSwitch = document.getElementById('video-random-style-switch');
    const vStyleContainer = document.getElementById('config-content-vstyle');
    
    if (randomVStyleSwitch && vStyleContainer) {
        randomVStyleSwitch.addEventListener('change', (e) => {
            if (e.target.checked) {
                vStyleContainer.style.opacity = "0.5";
                vStyleContainer.style.pointerEvents = "none";
                videoAddLog("🎲 โหมดวิดีโอ: สุ่มสไตล์เปิดใช้งาน", "info");
            } else {
                vStyleContainer.style.opacity = "1";
                vStyleContainer.style.pointerEvents = "auto";
                videoAddLog("🖱ï¸ โหมดวิดีโอ: เลือกสไตล์เอง", "info");
            }
        });
        // ไม่สั่ง dispatch event ทันที เพื่อให้ UI แสดงผลก่อน
    }
  
  // 🟢 4. แก้ไข Logic ปุ่มเลือกเสียง (Voice Buttons) ให้แยกกลุ่มกัน
  const allVoiceBtns = document.querySelectorAll('.voice-btn');
  
  if (allVoiceBtns.length > 0) {
      allVoiceBtns.forEach(btn => {
          btn.addEventListener('click', (e) => {
              // ดึงปุ่มที่ถูกกดจริง (เผื่อโดนไอคอนข้างใน)
              const clickedBtn = e.target.closest('.voice-btn');
              if (!clickedBtn) return;

              // เช็คว่าเป็นปุ่มประเภทไหน (gender หรือ dialect)
              const type = clickedBtn.getAttribute('data-type');     // 'gender' หรือ 'dialect'
              const value = clickedBtn.getAttribute('data-value');

              // 🟢 Key Logic: ล้าง Active เฉพาะเพื่อนร่วมกลุ่ม (Type เดียวกัน)
              const siblings = document.querySelectorAll(`.voice-btn[data-type="${type}"]`);
              siblings.forEach(b => b.classList.remove('active'));

              // ใส่ Active ให้ปุ่มที่กด
              clickedBtn.classList.add('active');

              // อัปเดตค่าลง Input ตามประเภท
              if (type === 'gender') {
                  const genderInput = document.getElementById('video-voice-gender-select');
                  if (genderInput) genderInput.value = value;
                  
                  // UX: เปลี่ยนสีปุ่มตามเพศ
                  if (value === 'male' || value === 'teen_boy' || value === 'boy' || value.includes('male')) {
                      clickedBtn.style.borderColor = '#60a5fa'; // ฟ้า
                  } else {
                      clickedBtn.style.borderColor = '#f472b6'; // ชมพู
                  }
                  // รีเซ็ตสีปุ่มที่ไม่ได้เลือกในกลุ่มเดียวกัน
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
  
  // 5. Smart UI: บทพูด
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
                          showToast('⚠️ มีบทพูด: เปลี่ยนเป็นโหมดคนพูดให้อัตโนมัติ', 'warning');
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

  if (!generatedPrompt || generatedPrompt.includes('กำลังวิเคราะห์') || generatedPrompt.startsWith('Error:')) {
    showToast('กรุณาสร้าง Prompt ก่อน', 'error');
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

                        // Fallback: find button with text (Crop/Save/บันทึก/เสร็จ/ต่อไป)
                        if (!confirmBtn) {
                          const allButtons = document.querySelectorAll('button');
                          const textCandidates = ['Crop and Save', 'บันทึก', 'ต่อไป', 'เสร็จ', 'Save', 'Confirm'];
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
  videoUpdateStatus(`กำลังเตรียมดูดไฟล์ ${maxDownloads} คลิป...`);

  try {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    const downloadResult = await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: async (maxDl) => {
        const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));
        
        // เด้งขึ้นบนสุดของจอ
        window.scrollTo(0, 0);
        await sleep(1000);

        // 🚨 ค้นหาแท็ก <video> ทั้งหมดบนหน้าจอ
        const allVideos = Array.from(document.querySelectorAll('video'));
        
        // กรองเอาเฉพาะวิดีโอที่เป็นการ์ดจริงๆ (ใหญ่กว่า 150px) ไม่ใช่ไอคอนจิ๋ว
        const validVideos = allVideos.filter(vid => {
            const rect = vid.getBoundingClientRect();
            return rect.width > 150;
        });

        if (validVideos.length === 0) {
            return { success: false, message: 'ไม่พบวิดีโอหลักบนหน้าจอ' };
        }

        const toDownload = Math.min(maxDl, validVideos.length);
        let downloadedCount = 0;

        // 🚀 วนลูปดูดไฟล์ทีละคลิป
        for (let i = 0; i < toDownload; i++) {
            const targetVideo = validVideos[i];
            
            // เลื่อนจอให้เห็นวิดีโอนิดนึง (เพื่อความสวยงามตอนรันบอท)
            targetVideo.scrollIntoView({ behavior: 'smooth', block: 'center' });
            await sleep(800);

          // 🌟 1. ขโมยลิงก์วิดีโอตรงๆ จากแท็ก <video> หรือ <source>
            let vidSrc = targetVideo.getAttribute('src') || targetVideo.currentSrc || targetVideo.src;
            if (!vidSrc) {
                const sourceTag = targetVideo.querySelector('source');
                if (sourceTag) vidSrc = sourceTag.getAttribute('src') || sourceTag.src;
            }

            // 🌟 ปลดล็อคเงื่อนไข http ออกไป! มีลิงก์ปุ๊บดูดปั๊บ
            if (vidSrc) {
                try {
                    // 🔥 แปลงลิงก์แบบย่อ (/fx/api/...) ให้เป็นลิงก์เต็ม (https://...)
                    const absoluteUrl = new URL(vidSrc, window.location.origin).href;

                    // 🔥 2. ท่าไม้ตายแฮกเกอร์: ดึงไฟล์ MP4 จากเซิร์ฟเวอร์โดยตรง
                    const response = await fetch(absoluteUrl);
                    
                    if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);
                    
                    const blob = await response.blob(); 
                    const blobUrl = window.URL.createObjectURL(blob);

                    // 🌟 3. สร้าง "ปุ่มดาวน์โหลดล่องหน" ของเราเอง
                    const a = document.createElement('a');
                    a.style.display = 'none';
                    a.href = blobUrl;
                    a.download = `Banana_Video_${Date.now()}_${i+1}.mp4`; 
                    
                    document.body.appendChild(a);
                    a.click(); // สั่งเซฟลงเครื่อง
                    await sleep(500);

                    // เก็บกวาดปุ่มล่องหนทิ้ง
                    document.body.removeChild(a);
                    window.URL.revokeObjectURL(blobUrl);

                    downloadedCount++;
                    await sleep(1500); // ⏳ รอแปบนึงให้ไฟล์ไหลเข้าเครื่องก่อนดูดคลิปถัดไป

                } catch (fetchErr) {
                    console.log(`ดูดวิดีโอที่ ${i+1} ล้มเหลว:`, fetchErr);
                }
            } else {
                console.log(`ข้ามวิดีโอที่ ${i+1}: หาลิงก์ (src) ไม่เจอ`);
            }
        }

        return { 
            success: downloadedCount > 0, 
            downloaded: downloadedCount, 
            total: toDownload,
            message: downloadedCount > 0 ? `ดาวน์โหลดเสร็จ ${downloadedCount}/${toDownload} คลิป!` : 'ดึงไฟล์ไม่สำเร็จ'
        };
      },
      args: [maxDownloads]
    });

    const res = downloadResult[0]?.result;
    
    if (res && res.success) {
        videoUpdateStatus(res.message);
        showToast(res.message, 'success');
    } else {
        videoUpdateStatus(`Error: ${res?.message || 'ไม่สามารถดึงวิดีโอได้'}`);
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
  if (!text || text.includes('กำลังวิเคราะห์')) {
    showToast('ไม่มี Prompt ให้คัดลอก', 'error');
    return;
  }

  navigator.clipboard.writeText(text).then(() => {
    showToast('คัดลอก Prompt แล้ว!', 'success');
    videoBtnCopyPrompt.textContent = '✅';
    setTimeout(() => {
      videoBtnCopyPrompt.textContent = '📋';
    }, 2000);
  }).catch(() => {
    showToast('ไม่สามารถคัดลอกได้', 'error');
  });
}

// ============================================
// AUTOMATION FUNCTIONS
// ============================================

// Video Prompt & Play Studio: Sleep helper (ฉบับแก้: ตื่นทันทีที่กด Stop)
function videoSleep(ms) {
  return new Promise((resolve, reject) => {
    // เช็คก่อนเลย ถ้ากดหยุดแล้ว ให้ Reject ทันที
    if (videoShouldStopAutomation) {
        return reject(new Error('STOPPED'));
    }

    const checkInterval = 100; // เช็คทุก 0.1 วินาที
    let elapsed = 0;

    const intervalId = setInterval(() => {
      // เช็คปุ่ม Stop ทุกๆ 0.1 วิ
      if (videoShouldStopAutomation) {
        clearInterval(intervalId);
        reject(new Error('STOPPED')); // 🔴 สั่งหยุดทันที!
      } else if (elapsed >= ms) {
        clearInterval(intervalId);
        resolve(); // ครบเวลา
      }
      elapsed += checkInterval;
    }, checkInterval);
  });
}

// Video Prompt & Play Studio: Stop automation
function videoStopAutomation() {
  if (videoIsAutomationRunning) {
    videoShouldStopAutomation = true;
    videoUpdateStatus('กำลังหยุด...');
    showToast('กำลังหยุด Automation...', 'error');
  }
}




// ============================================
// 🎬 VIDEO Prompt & Play Studio: Run Automation (Standalone Version)
// ============================================
async function videoRunAutomation() {
  if (!_0x99f || typeof AUTH === 'undefined') { _selfDestruct("E03: Illegal Execution"); return; }
  const isCorrect = await checkCorrectWebsite(); 
  if (!isCorrect) return;

  if (videoIsAutomationRunning) {
    showToast('กำลังรันอยู่แล้ว กรุณารอสักครู่', 'error');
    return;
  }

  const productName = videoProductNameInput.value.trim();
  if (videoUploadedImages.length === 0) {
    showToast('กรุณาอัพโหลดภาพตั้งต้นก่อน', 'error');
    return;
  }

  videoIsAutomationRunning = true;
  videoShouldStopAutomation = false;
  videoBtnAutomation.disabled = true;
  await toggleWebPageLock(true); 
  
  videoBtnAutomation.innerHTML = '<span class="loading"></span> <span>กำลังรัน Video...</span>';
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
          // 🟢 STEP 1: ตั้งค่าโหมด Video (อัปเกรด V13: Blacklist เมนูซ้ายมือ & ตรวจจับ role="tab")
          // ============================================
          videoUpdateStatus(`⚙️ Step 1/4: กำลังตั้งค่าโหมด Video...`);
          
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

                    // 🛑 ฟังก์ชันค้นหาปุ่มแบบเจาะจงขั้นสุด (Geofencing + Blacklist)
                    function findSafeSettingsButton(iconNames, textKeywords = [], blacklist = []) {
                        const allBtns = Array.from(document.querySelectorAll('button, [role="tab"]'));
                        
                        return allBtns.find(btn => {
                            const rect = btn.getBoundingClientRect();
                            // 1. กรองทิ้ง: ปุ่มที่อยู่ชิดซ้ายของหน้าจอเกินไป (เพิ่มระยะเป็น 200px)
                            if (rect.left < 200) return false; 
                            
                            // 2. กรองทิ้ง: แท็กเมนูของโครงสร้างเว็บ
                            if (btn.closest('nav, aside')) return false;

                            const icon = btn.querySelector('i');
                            const iconText = icon ? icon.textContent.trim().toLowerCase() : "";
                            const btnText = (btn.textContent || "").trim().toLowerCase();

                            // 3. 🚨 กรองทิ้ง (Blacklist): ถ้ามีคำต้องห้าม ให้โยนทิ้งทันที
                            const isBad = blacklist.some(word => btnText.includes(word.toLowerCase()));
                            if (isBad) return false;

                            // 4. ตรวจสอบความตรงกัน
                            const matchIcon = iconNames.some(name => iconText === name.toLowerCase());
                            const matchText = textKeywords.some(keyword => btnText.includes(keyword.toLowerCase()));

                            return (matchIcon || matchText) && btn.offsetParent !== null;
                        });
                    }

                    // 1. หาปุ่มเมนูตั้งค่า
                    let settingsBtn = null;
                    const allBtns = Array.from(document.querySelectorAll('button'));
                    const submitBtn = [...allBtns].reverse().find(b => (b.querySelector('i')?.textContent || "").trim() === 'arrow_forward');
                    if (submitBtn && submitBtn.previousElementSibling) {
                        settingsBtn = submitBtn.previousElementSibling;
                    }
                    if (!settingsBtn) {
                        settingsBtn = findSafeSettingsButton(['tune', 'settings'], ['ตั้งค่า']);
                    }
                    
                    if (!settingsBtn) return resolve({ success: false, msg: '❌ หาปุ่มเมนูตั้งค่าไม่เจอ' });
                    
                    heavyClick(settingsBtn);
                    await sleep(800);
                    
                    // 2. 🎯 หาแท็บ Video (อัปเกรด: ใส่ Blacklist คำว่า "ดูวิดีโอ", "เครื่องมือสร้างฉาก")
                    let videoTab = null;
                    for (let check = 0; check < 20; check++) {
                        await sleep(500);
                        videoTab = findSafeSettingsButton(
                            ['videocam', 'play_circle'], 
                            ['วิดีโอ', 'video'], 
                            ['ดูวิดีโอ', 'เครื่องมือสร้างฉาก', 'scene'] // 🚨 ป้องกันการกดเมนูซ้ายและเมนูเครื่องมือ
                        );
                        if (videoTab) break;
                    }

                    if (videoTab) { 
                        heavyClick(videoTab); 
                        await sleep(1000); 
                    } else { 
                        document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', keyCode: 27, bubbles: true }));
                        return resolve({ success: false, msg: '❌ หาแท็บ Video ไม่เจอ (เว็บโหลดช้า)' }); 
                    }

                    // 3. 🎯 หาแท็บ Frames
                    let framesTab = null;
                    for (let check = 0; check < 5; check++) {
                        await sleep(300);
                        framesTab = findSafeSettingsButton(['crop_free'], ['เฟรม', 'frames']);
                        if (framesTab) break;
                    }
                    if (framesTab) { 
                        heavyClick(framesTab); 
                        await sleep(1000); 
                    }

                    // 4. 🎯 หาแท็บ สัดส่วน
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

                    // กด ESC เพื่อปิดเมนู
                    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', keyCode: 27, bubbles: true }));
                    await sleep(800);
                    resolve({ success: true, msg: `✅ ตั้งค่า Video + Frames + ${ratio} สำเร็จ` });
             
                } catch (err) { resolve({ success: false, msg: 'Error: ' + err.message }); }
              });
            },
            args: [getVeo3AspectRatio()]
          });

         if (!setupVideoMode[0]?.result?.success) {
              videoAddLog(`${setupVideoMode[0]?.result?.msg}`, 'warning');
              throw new Error("ตั้งค่าโหมดวิดีโอไม่สำเร็จ"); 
          } else {
              videoAddLog(`${setupVideoMode[0]?.result?.msg}`, 'success');
          }
          await videoSleep(1000);
	

    for (let imgIndex = 0; imgIndex < totalImages; imgIndex++) {
      const currentImage = videoUploadedImages[imgIndex]; 

      for (let round = 0; round < roundsPerImage; round++) {
        const currentRound = imgIndex * roundsPerImage + round + 1;
        const roundLabel = `[รอบ ${currentRound}/${totalRounds}]`;

        try {
          if (videoShouldStopAutomation) throw new Error('STOPPED');

       // ============================================
          // 🧠 PREPARE PROMPT (อัปเดตสไตล์ให้เป็นเลขคู่ จัดกริดสวยงาม)
          // ============================================
          videoUpdateStatus(`${roundLabel} กำลังเตรียม Prompt...`);

          const styleSelect = document.getElementById('video-style-select');
          
          // 🛑 กฎเหล็กระดับวิกฤต: ล็อกคอ AI ห้ามเปลี่ยนรูปทรง ป้ายสินค้า และ "แช่แข็งตัวหนังสือ" ขั้นเด็ดขาด!
          const textProtection = " [CRITICAL TEXT RULE: Any Thai text, typography, or product labels in the image MUST remain 100% FROZEN, STATIC, and UNCHANGED throughout the entire video. DO NOT morph, distort, translate, animate, or hallucinate new text.]";
          const strictFidelity = " [Maintain 100% exact fidelity to the source image. DO NOT alter the product's shape, product label, typography, or background elements. Only animate the intended subject or camera movement.]" + textProtection;
          const tiktokSafetyRules = " (Rules: NO floating text, NO subtitles. Focus on natural mouth movements and minimal, realistic head gestures)." + strictFidelity;
          const productOnlySafetyRules = " (Rules: PRODUCT-ONLY video. NO people, NO human, NO face, NO presenter, NO talking character, NO mouth movement, NO lip sync, NO dialogue, NO subtitles, NO floating text. Use only subtle camera movement, light movement, product detail motion, or background ambience.)" + strictFidelity;
          const voiceoverSafetyRules = " (Rules: NARRATOR VOICEOVER ONLY. NO people, NO human presenter, NO talking character, NO mouth movement, NO lip sync, NO visible speaker, NO subtitles, NO floating text. Show only the product or the original source image with subtle product/camera motion.)" + strictFidelity;
		  
        // 🌟 [ULTRA NATURAL VERSION] คลังสไตล์ใช้งานจริง (อัปเดตระบบ Tough Love & เพิ่มสไตล์)
          const videoTemplates = {
              // 🗣ï¸ กลุ่ม 1: รีวิวและดึงดูดความสนใจ (Talking Head & Hook)
              'talk_ugc': "Cinematic smartphone selfie-style video. An authentic, unscripted UGC review of [product]. The character looks directly into the lens like a real everyday customer sharing a genuine 'after-use' experience. The character is speaking in Thai with a highly natural, word-of-mouth tone. " + tiktokSafetyRules,
              'talk_excited': "Bright aesthetic lighting. The character is enthusiastically presenting [product] to the viewer. High energy, friendly influencer vibe, sharing a great deal. The character is speaking in Thai with a lively, natural tone. " + tiktokSafetyRules,
              'talk_cheerful': "The character is lighthearted and smiling naturally while talking about [product]. A relaxed, feel-good vibe (no fake loud laughing). The character is speaking in Thai with a joyful, friendly banter tone. " + tiktokSafetyRules,
              'talk_sassy': "The character speaks with a self-assured, slightly playful charm about [product]. Confident but approachable. The character is speaking in Thai with a sassy, confident, but highly natural tone. " + tiktokSafetyRules,
             'talk_sincere': "The character recommends [product] with a warm, heart-to-heart expression. Like advising a close family member. The character is speaking in Thai with a soft, sincere, but normal conversational speed tone. No dramatic pauses. " + tiktokSafetyRules,
              'rant_expert': "Professional portrait framing. The character acts as a friendly expert explaining the benefits of [product]. Calm and trustworthy body language. The character is speaking in Thai with an authoritative yet highly helpful tone. " + tiktokSafetyRules,
              'hook_secret': "The character leans in slightly with an intimate, conversational vibe, holding [product]. They have a 'real talk' expression, sharing a valuable secret. The character is speaking in Thai with a quick, engaging, and mysterious tone. Speak continuously. " + tiktokSafetyRules,
              'hook_comparison': "The character is analyzing [product] logically, making a conversational comparison. Slight head tilt. The character is speaking in Thai with an analytical, 'let me explain' tone. " + tiktokSafetyRules,

             // 🛑 กลุ่ม 1.5: สายบ่นเตือนสติ (Tough Love)
              'rant': "The character is delivering a passionate 'tough love' rant. Acting like a caring best friend scolding the viewer for neglecting their own well-being, before forcefully recommending [product] as the ultimate solution. The character is speaking in Thai with a fast, urgent, scolding, yet deeply caring tone. " + tiktokSafetyRules,
              'hook_mistake': "The character gives a caring but strict warning, slightly shaking their head in disbelief at a common mistake the viewer is making. It feels like a mother scolding out of love before offering [product] to help. The character is speaking in Thai with a concerned, slightly strict, but highly helpful warning tone. " + tiktokSafetyRules,
              'rant_skeptical': "The character gives a serious, concerned wake-up call. They show slight frustration about a bad habit the viewer is doing, then their expression turns highly supportive as they introduce [product] to fix it. The character is speaking in Thai with an honest, tough-love realization tone. " + tiktokSafetyRules,
              'rant_partner': "The character acts like a caring but frustrated partner, playfully scolding the viewer for not taking care of themselves, then handing them [product] as the perfect solution. The character is speaking in Thai with a passionate, slightly annoyed but deeply loving tone. " + tiktokSafetyRules,
			  
              // 💰 กลุ่ม 2: ปิดการขาย (Closing)
              'closing_urgency': "The character expresses a natural sense of urgency about [product]. Fast-paced, dynamic energy, subtly gesturing downwards. The character is speaking in Thai with a fast-paced, FOMO-driven tone. " + tiktokSafetyRules,
              'closing_sincere': "The character gives a warm, reassuring sign-off with [product] in hand. A gentle smile indicating 'trust me on this one'. The character is speaking in Thai with a comforting, caring, but fluent and continuous tone. " + tiktokSafetyRules,
              'closing_challenge': "The character holds [product] confidently, giving a friendly, playful nod. They project a bold vibe, daring the viewer to try it. The character is speaking in Thai with a bold, confident, and challenging tone. " + tiktokSafetyRules,
              'closing_cta': "The character delivers a direct but friendly Call-To-Action about [product], subtly pointing or looking down to indicate the shopping basket. The character is speaking in Thai with a clear, inviting CTA tone. " + tiktokSafetyRules,

              // 📸 กลุ่ม 3: เน้นสินค้า (B-Roll)
              'broll_hero': "Professional commercial Hero Shot. The [product] stands perfectly still. Very subtle light reflection movement on the surface to show realism. NO rotation. Keep original image 100%. " + productOnlySafetyRules,
              'broll_pan': "Slow and smooth cinematic camera pan over [product]. Keep the product and background exactly as the original image. " + productOnlySafetyRules,
              'broll_zoom': "Camera slowly zooms in on [product] texture. Highlighting micro-details without changing them. " + productOnlySafetyRules,
              'broll_cinematic': "Cinematic lighting setup showcasing [product]. Elegant, slow-motion feel with a premium aesthetic. Keep original image completely unmodified. " + productOnlySafetyRules,
              'broll_motion_detail': "Product motion-detail B-roll. Use a gentle camera drift, subtle focus pull, tiny reflection movement, and micro-detail emphasis on [product]. Do NOT change the main lighting, scene, color mood, product shape, label, or background. Keep the original image identity intact. " + productOnlySafetyRules,
              'miniature_vdo': `Cinematic miniature product world animation. The giant [product] remains static while tiny non-human props, packaging pieces, lights, and display elements move in a stepped stop-motion style. Tilt-shift macro zoom. ${productOnlySafetyRules}`,

              // 🎙️ กลุ่ม 4: พากย์เสียง (Voiceover)
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

          // 🗣ï¸ ฝังคำสั่งแซนด์วิช: ตีกรอบหน้า-หลัง บังคับพูดไทย 100% ห้ามหลุดเด็ดขาด!
          let thaiHeader = "[CRITICAL LANGUAGE OVERRIDE: 100% THAI AUDIO ONLY. NO ENGLISH.] ";
          let thaiFooter = " [STRICT ENFORCEMENT: The character MUST speak exclusively in fluent Thai language. Absolutely NO English words, NO foreign languages, NO English accents. Must speak with a natural, continuous conversational pace. NO unnaturally slow talking, NO awkward pauses.]";
          
          let dialectPhrase = "";
          
          if (selectedVoice === 'isan') {
              dialectPhrase = `${thaiHeader}[DIALECT: Isan Thai] ${speakerRef} speaking in Isan Thai dialect. [CRITICAL RULE: This is a product review, NOT food. DO NOT use food words like "Saep". Use words like "Dee E-lee" or "Ngam" instead]${thaiFooter}`;
          } else if (selectedVoice === 'northern') {
              dialectPhrase = `${thaiHeader}[DIALECT: Northern Thai] ${speakerRef} speaking in Northern Thai dialect with a modern conversational pace. Strictly speaking ONLY, NO singing, NO traditional music${thaiFooter}`;
          } else {
              // สำหรับภาษากลาง
              dialectPhrase = `${thaiHeader}[DIALECT: Standard Thai] ${speakerRef} speaking in standard Thai${thaiFooter}`;
          }

          // --- Audio Injection Logic ---
          if (noVoiceModes.includes(selectedId)) {
              // ปิดเสียง (B-Roll) ลบคำสั่งพูดออกให้หมด
              finalPrompt = finalPrompt.replace(/The character is speaking in Thai/gi, ''); 
              finalPrompt = finalPrompt.replace(/speaking in thai/gi, ''); 
              videoAddLog(`🔇 B-Roll: ปิดเสียง`, 'info');
          } else if (voiceoverModes.includes(selectedId)) {
              let genderLabel = genderTerm ? `${genderTerm} ` : "";
              let voPhrase = dialectPhrase.replace(/The character is/gi, 'The narrator voiceover is');
              finalPrompt += ` (Audio Note: A professional ${genderLabel}narrator voiceover. ${voPhrase}).`;
              videoAddLog(`🎙️ Voiceover: ${genderTerm || 'ไม่ระบุเพศ'} (${selectedVoice})`, 'info');
          } else {
              // 🛠️ FIX 3: เปลี่ยนจากการใช้ .replace() แทรกกลางประโยค เป็นการต่อท้าย (Append) เพื่อให้ Prompt สมบูรณ์
              finalPrompt += ` ${dialectPhrase}`;
          }

          // --- Custom Script Injection ---
          if (customScriptValue && !noVoiceModes.includes(selectedId)) {
              // 🛠️ FIX 4: บังคับคำว่า "exactly in Thai language" ไว้หน้าบทพูด เพื่อไม่ให้ AI ข้ามไปใช้ภาษาอื่น
              if (voiceoverModes.includes(selectedId)) {
                  finalPrompt += ` The narrator voiceover is saying exactly in Thai language: "${customScriptValue}".`;
              } else {
                  finalPrompt += ` The character is talking to the camera, saying exactly in Thai language: "${customScriptValue}".`;
              }
              videoAddLog(`🗣ï¸ ใช้บทพูดที่ระบุ: "${customScriptValue}"`, 'info');
          }

          // 🛠️ FIX 5: เพิ่มคำแบนภาษาต่างชาติ (foreign language, english language) ใน Negative Prompt
          if (voiceoverModes.includes(selectedId)) {
              finalPrompt += ` [STRICT VISUAL VOICEOVER RULE: The voice is off-screen narration only. Do not create a presenter, talking face, lips, mouth movement, or any new human. If the source image already contains a person, keep that person visually static and do not make them speak.]`;
          }
          finalPrompt += ` Product label and text must be 100% FROZEN. ${getAntiBotSeed()} Negative Prompt: "foreign language, english language, english audio, other languages, text morphing, changing text, distorted letters, gibberish, alien language, moving text, floating letters, bad text, slow talking, slow speaking, long pauses, awkward silence, short speech, whispering"`;
          
      // ============================================
          // 🟢 STEP 2: อัพโหลดรูปและกด [เพิ่มไปยังพรอมต์] (อัปเกรด V14: เจาะเกราะ Radix UI Menu)
          // ============================================
          videoUpdateStatus(`${roundLabel} Step 2/4: กำลังอัพโหลดและเพิ่มลงพรอมต์...`);

          const singleImageData = [{
            name: currentImage.name, type: currentImage.type, dataUrl: currentImage.dataUrl
          }];

          const uploadResult = await chrome.scripting.executeScript({
            target: { tabId: tab.id },
            func: (images) => {
              return new Promise(async (resolve) => {
                  try {
                      const sleep = (ms) => new Promise(r => setTimeout(r, ms));
                      
                      // 🎯 ฟังก์ชันที่ 1: สำหรับกดเปิดเมนู 3 จุด (Hover + MouseDown)
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
                          el.click(); // ย้ำด้วย click เผื่อไว้
                      }

                      // 🎯 ฟังก์ชันที่ 2: สำหรับกดคำสั่งในเมนู Radix UI 
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

                      // 1. จำรูปเก่าบนหน้าจอทั้งหมดไว้ก่อน
                      const getFeedImgs = () => Array.from(document.querySelectorAll('img')).filter(img => {
                          const rect = img.getBoundingClientRect();
                          const isHeader = img.closest('header, nav, [role="banner"]');
                          return rect.width > 40 && rect.height > 40 && !isHeader; // ใช้ 40px เผื่อเป็น Thumbnail เล็กๆ
                      });
                      const initialImagesSrc = getFeedImgs().map(img => img.src);

                      // 2. นำรูปไปวาง (Paste) ในช่องแชทหลัก
                      const editor = document.querySelector('[data-slate-editor="true"]') || document.querySelector('[role="textbox"]');
                      if (!editor) return resolve({ success: false, msg: '❌ ไม่พบช่องแชทเพื่อวางรูป' });

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

                      // 🟢 รอกลืนไฟล์ฝั่งวิดีโอ (4 วินาที)
                      await sleep(4000); 
                      
                      // รอกดปุ่ม Save/Crop (ถ้ามี)
                      let confirmBtn = null;
                      const confirmTexts = ['Save', 'Confirm', 'Crop and Save', 'บันทึก', 'ยืนยัน', 'เสร็จสิ้น', 'ต่อไป'];
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
                          // 🟢 รอหน้าต่างปิด (4 วินาที)
                          await sleep(4000); 
                      }

                      // 3. 🎯 ระบบเล็งเป้าและกด 3 จุด
                      let isSuccess = false;

                      for (let w = 0; w < 40; w++) { 
                          await sleep(1500); // รอรูปอัปโหลดเข้า Feed
                          
                          const currentImgs = getFeedImgs();
                          let newImg = currentImgs.find(img => !initialImagesSrc.includes(img.src));

                          // ท่าไม้ตาย: ถ้าหาจาก src ไม่เจอ ให้หาป้ายคำว่า "รูปภาพที่อัปโหลด" 
                          if (!newImg) {
                              const uploadLabels = Array.from(document.querySelectorAll('span, div, p')).filter(el => 
                                  el.innerText && (el.innerText.includes('รูปภาพที่อัปโหลด') || el.innerText.includes('Uploaded'))
                              );
                              if (uploadLabels.length > 0) {
                                  let container = uploadLabels[0].closest('div[class*="card"], div:has(img)') || uploadLabels[0].parentElement.parentElement;
                                  if (container) newImg = container.querySelector('img');
                              }
                          }

                          if (newImg) {
                              newImg.scrollIntoView({ behavior: 'smooth', block: 'center' });
                              await sleep(1000); 

                              // เอาเมาส์ถูๆ ที่การ์ดรูป เพื่อเรียกปุ่ม 3 จุดออกมา
                              newImg.dispatchEvent(new MouseEvent('mouseover', {bubbles: true}));
                              newImg.dispatchEvent(new MouseEvent('mouseenter', {bubbles: true}));
                              await sleep(1000);

                              let dotBtn = null;
                              let container = newImg.parentElement;
                              
                              for (let i = 0; i < 15; i++) {
                                  if (!container || container === document.body) break;
                                  const btns = Array.from(container.querySelectorAll('button'));
                                  dotBtn = btns.find(b => {
                                      // หาผ่าน Native JS โดยหลีกเลี่ยง :contains ของ jQuery
                                      const icon = b.querySelector('i, svg');
                                      const text = (b.innerText || '').toLowerCase();
                                      const ariaLabel = (b.getAttribute('aria-label') || '').toLowerCase();
                                      const isMenu = b.getAttribute('aria-haspopup') === 'menu';
                                      
                                      return isMenu || ariaLabel.includes('more') || ariaLabel.includes('ตัวเลือก') || (icon && (text.includes('more') || text.includes('vert') || text.includes('horiz')));
                                  });
                                  if (dotBtn) break;
                                  container = container.parentElement;
                              }

                              if (!dotBtn) {
                                  // แสกนทั้งจอหารอบๆ รูป
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
                                  // 🔥 1. เปิดเมนู
                                  await triggerClick(dotBtn); 
                                  await sleep(1500); // รอเมนูกางออกแบบนิ่งๆ

                                 // 🌐 อัปเกรด V14: เจาะเกราะเมนูตาม HTML ที่ระบุ (Radix UI)
                                  const menuItems = Array.from(document.querySelectorAll('[role="menuitem"], button')).reverse();
                                  const addPromptBtn = menuItems.find(m => {
                                      const rect = m.getBoundingClientRect();
                                      if (rect.width === 0 || rect.height === 0) return false; // ข้ามปุ่มที่ซ่อนอยู่

                                      // กวาด Text ทั้งหมดข้างในปุ่ม รวมถึงไอคอน
                                      const text = (m.textContent || "").replace(/\s+/g, ''); 
                                      return text.includes('เพิ่มไปยังพรอมต์') || text.includes('addtoprompt') || text.includes('เพิ่มลงในพรอมต์');
                                  });

                                  if (addPromptBtn) {
                                      // 🔥 2. คลิกปุ่มเมนู "เพิ่มไปยังพรอมต์"
                                      await actionClick(addPromptBtn); 
                                      await sleep(800);
                                      
                                      // ปิดเมนูเผื่อค้าง
                                      document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', keyCode: 27, bubbles: true }));
                                      isSuccess = true;
                                      break; 
                                  } else {
                                      // ถ้าไม่มีเมนู แสดงว่ารูปยังประมวลผลไม่เสร็จ ให้ปิดหน้าต่างทิ้งแล้วรอวนลูปใหม่
                                      document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', keyCode: 27, bubbles: true }));
                                  }
                              } else {
                                  // ท่าไม้ตายสุดท้าย: คลิกขวาที่รูป
                                  newImg.dispatchEvent(new MouseEvent('contextmenu', { bubbles: true, cancelable: true, view: window, button: 2 }));
                                  await sleep(1500);
                              }
                          }
                      } 

                      if (isSuccess) {
                          return resolve({ success: true, msg: '✅ กด [เพิ่มไปยังพรอมต์] สำเร็จแล้ว!' });
                      } else {
                          return resolve({ success: false, msg: '❌ หมดเวลารอ หรือกดเมนูไม่ติด' });
                      }

                  } catch (e) { resolve({ success: false, msg: 'Error: ' + e.message }); }
              });
            },
            args: [singleImageData]
          });

          if (!uploadResult[0]?.result?.success) {
              videoAddLog(`⚠️ ${uploadResult[0]?.result?.msg} -> ข้ามรอบนี้`, 'warning');
              throw new Error("นำรูปเข้ากล่องเริ่มไม่สำเร็จ"); 
          } else {
              videoAddLog(`${uploadResult[0]?.result?.msg}`, 'success');
          }
          await videoSleep(3000);

          // ============================================
          // 🟢 STEP 3: กรอก Prompt วิดีโอ
          // ============================================
          videoUpdateStatus(`${roundLabel} Step 3/4: กำลังป้อนคำสั่งสร้างวิดีโอ...`);

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
          // 🟢 STEP 4: กดปุ่มส่งคำสั่งสร้างวิดีโอ [ULTIMATE GOD MODE]
          // ============================================
          videoUpdateStatus(`${roundLabel} Step 4/4: กำลังกดสร้างวิดีโอ...`);
          
          const createResult = await chrome.scripting.executeScript({
            target: { tabId: tab.id },
            world: 'MAIN', // ทะลวงเข้าหน้าเว็บหลัก
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
                              // เช็คให้ชัวร์ว่าปุ่มพร้อมใช้งานจริงๆ ไม่ได้แอบเทาอยู่
                              if (btn.disabled || style.pointerEvents === 'none' || style.opacity === '0' || btn.getAttribute('aria-disabled') === 'true') continue;

                              if (text.includes('nano') || text.includes('pro') || text.includes('อัปเกรด')) continue;
                              if (html.includes('add_circle') || html.includes('add ')) continue;

                              if (html.includes('arrow_forward') || html.includes('send') || text === 'สร้าง' || text === 'create') {
                                  targetBtn = btn;
                                  break;
                              }
                          }

                          if (targetBtn) {
                              // เลื่อนจอให้ปุ่มอยู่ตรงกลางเป๊ะๆ หลบพวกแถบเมนูบัง
                              targetBtn.scrollIntoView({ behavior: 'smooth', block: 'center' });
                              await sleep(500);

                              let success = false;
                              try {
                                  // 🔥 ท่าที่ 1: แฮ็ก React (เครื่อง Chrome ใหม่ๆ จะผ่านท่านี้)
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

                              // 🔥 ท่าที่ 2: จำลองเมาส์ยิงพิกัด X, Y ตรงกลางปุ่ม (ทะลุกำแพงบัง)
                              const rect = targetBtn.getBoundingClientRect();
                              const x = rect.left + (rect.width / 2);
                              const y = rect.top + (rect.height / 2);
                              const mouseOpts = { bubbles: true, cancelable: true, view: window, clientX: x, clientY: y };
                              
                              targetBtn.dispatchEvent(new PointerEvent('pointerdown', mouseOpts));
                              targetBtn.dispatchEvent(new MouseEvent('mousedown', mouseOpts));
                              targetBtn.dispatchEvent(new PointerEvent('pointerup', mouseOpts));
                              targetBtn.dispatchEvent(new MouseEvent('mouseup', mouseOpts));
                              targetBtn.click(); // ท่าเบสิค

                              // 🔥 ท่าที่ 3: กระหน่ำปุ่ม Enter ซ้ำ
                              targetBtn.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', code: 'Enter', keyCode: 13, bubbles: true }));
                              
                              const editor = document.querySelector('[data-slate-editor="true"]') || document.querySelector('[role="textbox"]');
                              if (editor) {
                                  editor.focus();
                                  editor.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', code: 'Enter', keyCode: 13, which: 13, bubbles: true }));
                              }

                              return resolve({ success: true, msg: 'กดปุ่มส่งคำสั่งสำเร็จ!' });
                          }
                          
                          await sleep(1000);
                      }
                      
                      resolve({ success: false, msg: 'หาปุ่มส่งคำสั่งไม่เจอ หรือปุ่มยังโหลดไม่เสร็จ' });
                  }
                  
                  trySubmit();
              });
            },
            args: [30000]
          });

          if (!createResult[0]?.result?.success) throw new Error(createResult[0]?.result?.msg);
          videoAddLog(`🖱ï¸ ${roundLabel} ส่งคำสั่งสร้างวิดีโอเรียบร้อย`, 'success');
          await videoSleep(3000);

         // ============================================
          // 🟢 STEP 5: รอผลลัพธ์ (รองรับ Turbo Mode)
          // ============================================
          const checkboxEl = document.getElementById('video-download-count-auto');
          const isDownloadEnabled = checkboxEl ? checkboxEl.checked : true;

       if (!isDownloadEnabled) {
              // 🚀 อัปเกรด Turbo Mode: สุ่มรอ 45-60 วินาที (เพื่อให้คลิปเดิมรันไปถึง 70-80% ก่อนเริ่มคิวใหม่)
              const turboWait = Math.floor(Math.random() * 15000) + 45000; 
              videoUpdateStatus(`🚀 ${roundLabel} Turbo Mode: พักรอ ${Math.floor(turboWait/1000)} วิ ป้องกันเว็บค้าง...`);
              await videoSleep(turboWait);
              videoAddLog(`⏭️ ส่งคิวใหม่ (วิดีโอเดิมน่าจะเสร็จไปแล้ว 80%)`, 'info');
          } else {
              videoUpdateStatus(`⏳ ${roundLabel} รอ AI เรนเดอร์วิดีโอ (อาจใช้เวลา 1-3 นาที)...`);
              
              // 📸 ถ่าย Snapshot จดจำรหัสวิดีโอเก่าทั้งหมดบนหน้าจอไว้! (หัวใจหลักของการกันคลิปเก่า)
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

              for(let w=0; w<240; w++) { // รอสูงสุด 4 นาที
                  if (videoShouldStopAutomation) throw new Error('STOPPED');
                  
                  const checkProgress = await chrome.scripting.executeScript({
                      target: { tabId: tab.id },
                      func: (oldSrcs) => {
                          const currentVids = Array.from(document.querySelectorAll('video'));
                          // นับเฉพาะวิดีโอที่มีลิงก์ (src) เป็นของใหม่ ที่ไม่เคยมีในความทรงจำ
                          let newCount = 0;
                          for (const v of currentVids) {
                              const src = v.getAttribute('src') || v.currentSrc || v.src || '';
                              if (src && !oldSrcs.includes(src)) newCount++;
                          }
                          
                          // 🚨 อัปเกรดเรดาร์: ตรวจจับ "สถานะกำลังโหลด" ทุกรูปแบบบนหน้าเว็บ (หลอดโหลด, เปอร์เซ็นต์, ปุ่มกำลังสร้าง)
                          const hasProgressBar = document.querySelector('[role="progressbar"]') !== null;
                          const hasLoadingText = Array.from(document.querySelectorAll('button, span, div')).some(el => {
                              const txt = (el.textContent || '').trim();
                              return txt.includes('กำลังสร้าง') || txt.includes('Generating') || /^(\d+%)|(\d+\s*%)$/.test(txt);
                          });
                          const hasLoadingClass = document.querySelector('[class*="loading"], [class*="progress"]') !== null;
                          
                          const isLoading = hasProgressBar || hasLoadingText || hasLoadingClass;
                          return { newVids: newCount, loading: isLoading };
                      },
                      args: [oldVideoSrcs]
                  });
                  
                  const status = checkProgress[0]?.result;
                  
                  // 🌟 ต้องเจอวิดีโอใหม่ และ "สถานะกำลังโหลดทั้งหมดบนจอต้องหายไป 100%" ถึงจะไปต่อ!
                  if (status && status.newVids > 0 && !status.loading) {
                      videoUpdateStatus(`✅ เจอวิดีโอใหม่ ${status.newVids} คลิป! รอระบบประมวลผลให้สมบูรณ์อีก 8 วินาที...`);
                      await videoSleep(8000); // ⏳ หน่วงเวลา 8 วิ เพื่อให้คลิปสุดท้ายโหลดเข้าที่
                      isFinished = true; 
                      break;
                  }
                  
                  if (w % 10 === 0) videoUpdateStatus(`⏳ กำลังเรนเดอร์... (${w}s)`);
                  await videoSleep(1000);
              }

              if (isFinished) {
                  videoUpdateStatus(`✅ สร้างวิดีโอเสร็จสิ้น!`);
                  videoAddLog(`${roundLabel} เรนเดอร์วิดีโอสำเร็จ`, 'success');

                  // =====================================================================
                  // 📥 ระบบดาวน์โหลดวิดีโออัตโนมัติ (โหลดเฉพาะของใหม่ทั้งหมดที่สร้างเสร็จ)
                  // =====================================================================
                  videoUpdateStatus(`📥 กำลังเตรียมดูดไฟล์วิดีโอที่เพิ่งสร้างเสร็จ...`);
                  
                  const downloadResult = await chrome.scripting.executeScript({
                      target: { tabId: tab.id },
                      func: (oldSrcs) => {
                          return new Promise(async (resolve) => {
                              try {
                                  const sleep = (ms) => new Promise(r => setTimeout(r, ms));
                                  
                                  // ดันจอขึ้นบนสุด
                                  window.scrollTo({ top: 0, behavior: 'smooth' });
                                  await sleep(1500); 
                                  
                                  // กวาดหาวิดีโอในฟีด
                                  const allVideos = Array.from(document.querySelectorAll('video'));
                                  const feedVideos = allVideos.filter(vid => !vid.closest('header, nav, [role="textbox"]'));

                                  // 🌟 คัดกรองเอาเฉพาะวิดีโอ "ใหม่เอี่ยม" ที่ไม่มีในความทรงจำเก่าเท่านั้น!
                                  const newVideos = feedVideos.filter(vid => {
                                      const src = vid.getAttribute('src') || vid.currentSrc || vid.src || '';
                                      return src && !oldSrcs.includes(src);
                                  });

                                  if (newVideos.length === 0) {
                                      return resolve({ success: false, msg: 'ไม่พบวิดีโอใหม่ (อาจจะเรนเดอร์ล้มเหลว)' });
                                  }

                                  // เรียงจากซ้ายไปขวา
                                  newVideos.sort((a, b) => a.getBoundingClientRect().left - b.getBoundingClientRect().left);

                                  // 🔥 โหลดทุกคลิปที่เป็นของใหม่ (สูงสุด 4 คลิปเผื่อไว้)
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
                                          await sleep(1500); // ⏳ รอไฟล์โหลดเข้าเครื่อง
                                      }
                                  }
                                  
                                  if (downloadedCount > 0) {
                                      resolve({ success: true, msg: `ดูดไฟล์วิดีโอใหม่สำเร็จ ${downloadedCount} คลิป!` });
                                  } else {
                                      resolve({ success: false, msg: `หาลิงก์ของวิดีโอใหม่ไม่เจอ (อาจจะโหลดไม่ขึ้น)` });
                                  }
                              } catch (err) {
                                  resolve({ success: false, msg: 'Error: ' + err.message });
                              }
                          });
                      },
                      args: [ oldVideoSrcs ]
                  });

                  if (downloadResult[0]?.result?.success) {
                      videoAddLog(`📥 ${downloadResult[0].result.msg}`, 'success');
                  } else {
                      videoAddLog(`⚠️ โหลดอัตโนมัติไม่สำเร็จ: ${downloadResult[0]?.result?.msg}`, 'warning');
                  }

              } else {
                  videoUpdateStatus(`⚠️ หมดเวลารอวิดีโอ (วิดีโออาจจะยังเรนเดอร์ไม่เสร็จ)`);
              }
          }

          completedRounds++;
          
          // 🟢 [โค้ดที่เพิ่มใหม่] COOLDOWN: พักหายใจก่อนเริ่มวิดีโอคลิปต่อไป 
          // (วิดีโอกินทรัพยากรหนัก ต้องพักนานกว่ารูปนิดนึง สุ่มพัก 7-10 วินาที)
          if (currentRound < totalRounds) {
              const cooldownTime = Math.floor(Math.random() * 3000) + 7000; 
              videoUpdateStatus(`⏳ พักระบบ ${cooldownTime/1000} วินาทีก่อนเริ่มคลิปถัดไป...`);
              await videoSleep(cooldownTime);
          }
		  
        } catch (roundError) {
            const errMsg = roundError.message || "";
            if (errMsg === 'STOPPED') {
                videoShouldStopAutomation = true;
                videoIsAutomationRunning = false;
                throw new Error('STOPPED');
            }
            videoUpdateStatus(`⚠️ พบปัญหา: ${errMsg} -> ข้ามไปรอบถัดไป`);
            await videoSleep(2000);
        }
      }
    }
    
    videoUpdateStatus(`🎉 ทำงานเสร็จสิ้นทั้งหมด!`);
    showToast('Mission Complete!', 'success');

  } catch (error) {
    if (error.message !== 'STOPPED') videoAddLog(`❌ Error: ${error.message}`, 'error');
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

// [ส่วนเพิ่มใหม่] ตัวแปรสำหรับเลือกฉากหลัง (Banana)
const bananaBgSelect = document.getElementById('banana-bg-select');
const bananaRandomBgCheckbox = document.getElementById('banana-random-bg-checkbox');

// Store uploaded images (Banana)
let bananaUploadedImages = [];
let bananaCurrentImageIndex = 0;
let modelUploadedImages = []; // ตัวแปรเก็บรูปนางแบบ
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
// IMAGE MANAGEMENT (แก้ไข: แสดงรูป + ลบทีละรูป)
// ============================================
const bananaPreviewContainer = document.getElementById('banana-preview-container');

// ฟังก์ชันอัปเดตหน้าจอ (เรียกใช้เมื่อมีการเพิ่มหรือลบรูป)
function bananaUpdateImageCount() {
  // 1. อัปเดตตัวเลข
  bananaImageCount.textContent = bananaUploadedImages.length;

  // 2. จัดการปุ่ม Clear All
  if (bananaUploadedImages.length > 0) {
    bananaClearImagesBtn.style.display = 'flex';
  } else {
    bananaClearImagesBtn.style.display = 'none';
  }

  bananaUpdateRoundInfo(); // อัปเดตจำนวนรอบ

  // 3. สร้างรูปตัวอย่าง (Render Previews)
  renderBananaPreviews();
}

// ฟังก์ชันวาดรูปตัวอย่าง
function renderBananaPreviews() {
  if (!bananaPreviewContainer) return;
  bananaPreviewContainer.innerHTML = ''; // เคลียร์ของเก่า

  bananaUploadedImages.forEach((img, index) => {
    const item = document.createElement('div');
    item.className = 'preview-item';

    // สร้างรูปภาพ
    const imgEl = document.createElement('img');
    imgEl.src = img.dataUrl;
    imgEl.title = img.name;

    // สร้างปุ่มลบ (X)
    const delBtn = document.createElement('button');
    delBtn.className = 'preview-remove-btn';
    delBtn.innerHTML = '✕';
    delBtn.onclick = () => bananaRemoveOneImage(index); // เรียกฟังก์ชันลบ

    item.appendChild(imgEl);
    item.appendChild(delBtn);
    bananaPreviewContainer.appendChild(item);
  });
}

// ฟังก์ชันลบทีละรูป
function bananaRemoveOneImage(index) {
  // ลบออกจาก Array ตามตำแหน่ง index
  bananaUploadedImages.splice(index, 1);
  // อัปเดตหน้าจอใหม่
  bananaUpdateImageCount();
}

// ฟังก์ชันจัดการไฟล์ที่อัปโหลด
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
      // เรียกฟังก์ชันอัปเดต (ซึ่งจะไปวาดรูปให้เอง)
      bananaUpdateImageCount();
    };
    reader.readAsDataURL(file);
  });

  bananaFileInput.value = '';
}

// ฟังก์ชันลบรูปทั้งหมด
function bananaClearAllImages() {
  bananaUploadedImages = [];
  bananaUpdateImageCount(); // หน้าจอจะเคลียร์รูปออกหมดเอง
  bananaUpdateStatus('All images cleared');
}


// ==========================================
// MODEL UPLOAD FUNCTIONS (เพิ่มใหม่)
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
      const file = imageFiles[0]; // รับแค่รูปเดียวล่าสุด
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
// MODEL PREVIEW SYSTEM (ระบบแสดงรูปนางแบบ)
// ============================================
const modelPreviewContainer = document.getElementById('model-preview-container');



// ============================================
// [UPDATED] MODEL UPDATE UI: รองรับการล็อคทั้ง Human และ Mascot
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
        if(uploadText) uploadText.textContent = "เปลี่ยนรูปนางแบบ";
        if(clearBtn) clearBtn.classList.remove('hidden');

        const item = document.createElement('div');
        item.className = 'preview-item'; 

        const img = document.createElement('img');
        img.src = modelUploadedImages[0].dataUrl;

        const delBtn = document.createElement('button');
        delBtn.className = 'preview-remove-btn';
        delBtn.innerHTML = '✕';
        delBtn.onclick = () => {
            modelUploadedImages = [];
            modelUpdateUI();
        };

        item.appendChild(img);
        item.appendChild(delBtn);
        container.appendChild(item);

    } else {
        if(countBadge) countBadge.style.display = 'none';
        if(uploadText) uploadText.textContent = "เพิ่มรูปนางแบบ (Ref)";
        if(clearBtn) clearBtn.classList.add('hidden');
    }

    // -------------------------------------------------------
    // [NEW] Logic ล็อคส่วนเลือกตัวละคร (ทั้ง 2 โหมด)
    // -------------------------------------------------------
    const hasImage = modelUploadedImages.length > 0;
    const currentMode = document.getElementById('current-app-mode')?.value || 'human';

    // 1. ล็อคฝั่ง Human
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

    // 2. ล็อคฝั่ง Mascot (Grid เลือกตัวละคร)
    const mascotGrid = document.getElementById('mascot-grid');
    const mascotCustomInput = document.getElementById('mascot-custom-input');
    
    if (mascotGrid) {
        if (hasImage && currentMode === 'mascot') {
            mascotGrid.classList.add('disabled-section');
            if(mascotCustomInput) mascotCustomInput.disabled = true;
            bananaAddLog('📸 Mascot Mode: ตรวจพบรูปภาพ Ref - ปิดการเลือกตัวละครชั่วคราว', 'info');
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

  // แก้ไข: โชว์ Text ให้ผู้ใช้ทราบคิวที่ระบบจะรัน
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
          // แก้ไข: ดักจับความปลอดภัยของข้อมูล
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
    showToast('Basic จำกัดรอบสูงสุด 3 รอบ', 'warning');
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
    bananaLogContainer.innerHTML = '<div class="log-empty">ยังไม่มี log</div>';
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
  if (!text || text.includes('กำลังวิเคราะห์')) {
    showToast('ไม่มี Prompt ให้คัดลอก', 'error');
    return;
  }

  navigator.clipboard.writeText(text).then(() => {
    showToast('คัดลอก Prompt แล้ว!', 'success');
    bananaBtnCopyPrompt.textContent = '✅';
    setTimeout(() => {
      bananaBtnCopyPrompt.textContent = '📋';
    }, 2000);
  }).catch(() => {
    showToast('ไม่สามารถคัดลอกได้', 'error');
  });
}

// Banana Prompt & Play Studio: Sleep helper (ฉบับแก้: ตื่นทันทีที่กด Stop)
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
    bananaUpdateStatus('กำลังหยุด...');
    showToast('กำลังหยุด Automation...', 'error');
  }
}

// Banana Prompt & Play Studio: Get generated images from page (แก้ไข: ดึงทั้งหมด + Scroll)
async function bananaGetGeneratedImages() {
  try {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    
    const result = await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: async () => { // 🟢 เพิ่ม async เพื่อรองรับการรอ
        
        // 1. สั่ง Scroll ลงล่างสุดเพื่อให้รูป Lazy Load โหลดขึ้นมาให้ครบ
        window.scrollTo(0, document.body.scrollHeight);
        await new Promise(r => setTimeout(r, 1000)); // รอ 1 วินาทีให้โหลด

        const images = [];
        
        // Method: กวาดหาทุกรูปในหน้าจอที่มีขนาดใหญ่พอ
        const allImgs = document.querySelectorAll('img');
        for (const img of allImgs) {
          const rect = img.getBoundingClientRect();
          // เงื่อนไข: ต้องเป็นรูปที่ขนาดใหญ่กว่า 200x200 (กันพวกไอคอน/โลโก้)
          if (rect.width >= 200 && rect.height >= 200) {
            const src = img.src || img.getAttribute('src') || img.getAttribute('data-src');
            
            // กรองรูปที่ไม่ใช่ผลลัพธ์ออก
            if (src && !src.includes('icon') && !src.includes('avatar') && !src.includes('logo') && !src.includes('profile')) {
              images.push({
                src: src,
                width: rect.width,
                height: rect.height
              });
            }
          }
        }
        
        // ลบรูปซ้ำ (Remove duplicates)
        const uniqueImages = [];
        const seenSrcs = new Set();
        for (const img of images) {
          if (!seenSrcs.has(img.src)) {
            seenSrcs.add(img.src);
            uniqueImages.push(img);
          }
        }
        
        // 🟢 ส่งกลับทั้งหมด (ลบ .slice(0, 10) ออกแล้ว)
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
// 🟢 NEW LOGIC: SNAPSHOT & COMPARE (แก้ปัญหาดึงรูปเก่า)
// ============================================

// ============================================
// 🟢 ฟังก์ชันช่วย: ดึง URL รูปทั้งหมด (อัปเกรด: ค้นหาป้าย "รูปภาพที่อัปโหลด" ขั้นสุดยอด)
// ============================================
async function getAllPageImages() {
    try {
        const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
        const result = await chrome.scripting.executeScript({
            target: { tabId: tab.id },
            func: async () => {
                // ดันจอลงล่างสุดเพื่อให้เว็บโหลดรูปที่ซ่อนอยู่ออกมาให้หมด
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
                        const hasDownload = text.includes('ดาวน์โหลด') || text.toLowerCase().includes('download');
                        const hasDate = text.includes('สร้างเมื่อ') || text.toLowerCase().includes('created');

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
                        text.includes('รูปภาพที่อัปโหลด') ||
                        text.includes('uploaded image') ||
                        text.includes('original image');

                    if (isUploadedCard) return false;

                    const hasNanoBanana = text.includes('nano banana');
                    const hasPromptReuse =
                        text.includes('ใช้พรอมต์ซ้ำ') ||
                        text.includes('ใช้พรอมต์ข้อความอีกครั้ง') ||
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
                                candidateAlt.includes('อัปโหลด') ||
                                candidateAlt.includes('คอลเล็กชัน') ||
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

// 2. ฟังก์ชันหลัก: Banana -> Video (แก้ไขแล้ว)
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
    showToast('Image-to-Video Auto ใช้ได้เฉพาะ Premium', 'warning');
    return;
  }

  if (bananaIsAutomationRunning || videoIsAutomationRunning) {
    showToast('กำลังรันอยู่แล้ว กรุณารอสักครู่', 'error');
    return;
  }

  // ดึงค่า Config
  const productName = bananaProductNameInput ? bananaProductNameInput.value.trim() : '';
  const selectedVideoStyle = bananaGetToVideoStyle();
  const bananaImageAutoDownloadCheckbox = document.getElementById('banana-auto-download-checkbox');
  const previousImageAutoDownload = bananaImageAutoDownloadCheckbox ? bananaImageAutoDownloadCheckbox.checked : null;
  
  if (bananaUploadedImages.length === 0) {
    showToast('กรุณาอัพโหลดภาพสินค้าก่อน', 'error');
    return;
  }

  // Sync ค่าไปยังหน้า Video
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
    // 📸 PHASE 1: SNAPSHOT (จำรูปเดิมก่อนเริ่มงาน)
    // -------------------------------------------------
    bananaUpdateStatus('📸 Snapshot: กำลังจดจำรูปภาพเดิม...');
    const previousImagesSet = await getAllPageImages();
    bananaAddLog(`ℹ️ ภาพเดิมในจอมี ${previousImagesSet.size} ภาพ`, 'info');

    // -------------------------------------------------
    // 🎬 PHASE 2: รัน Banana (สร้างภาพ)
    // -------------------------------------------------
    bananaUpdateStatus('🎬 [1/2] กำลังสร้างภาพ...');
    
    // เรียกฟังก์ชันสร้างภาพ (Function เดิมที่มีอยู่แล้ว)
await bananaHandleAutomation(true); // ส่งสัญญาณว่า "กำลังทำต่อเนื่อง ห้ามปลดล็อค"

    if (bananaShouldStopAutomation) throw new Error('STOPPED');

    // รอให้ภาพโหลดเสร็จ (สำคัญมาก! ให้เวลาระบบ Render)
    bananaUpdateStatus('⏳ รอภาพใหม่ Render (10s)...');
    await new Promise(resolve => setTimeout(resolve, 10000));

    // -------------------------------------------------
    // 🕵️ PHASE 3: เปรียบเทียบหา "รูปใหม่" (VERIFIED COMPARE)
    // -------------------------------------------------
   // 🕵️ [จุดที่แก้ไข] PHASE 3: ระบบตรวจสอบภาพใหม่แบบ "เจอแค่ไหนเอาแค่นั้น" (Non-Fatal Check)
    bananaUpdateStatus('🔍 กำลังรอรูปภาพใหม่ Render ให้สมบูรณ์...');
    let newImageUrls = [];

    for (let retry = 0; retry < 5; retry++) { 
        if (bananaShouldStopAutomation) throw new Error('STOPPED');
        await new Promise(resolve => setTimeout(resolve, 4000)); 
        
        const currentImagesSet = await getAllPageImages();
        const currentImagesArray = Array.from(currentImagesSet);
        
        // กรองหาภาพใหม่ที่ไม่ได้อยู่ใน Snapshot ตอนเริ่มต้น
        newImageUrls = currentImagesArray.filter(url => !previousImagesSet.has(url));
        
        if (newImageUrls.length > 0) {
            // 🧠 ตรวจสอบความนิ่ง: รออีก 3 วินาทีเพื่อให้ภาพใบสุดท้ายใน Batch โหลดจนครบ
            await new Promise(resolve => setTimeout(resolve, 3000));
            const reCheckSet = await getAllPageImages();
            const reCheckArray = Array.from(reCheckSet).filter(url => !previousImagesSet.has(url));
            
            if (reCheckArray.length >= newImageUrls.length) {
                newImageUrls = reCheckArray;
                break; // เจอภาพแล้ว (จะกี่ภาพก็ได้) ให้ออกจาก Loop การรอ
            }
        }
        bananaUpdateStatus(`⏳ รอรูปภาพใหม่ Render ให้ครบ... (${retry + 1}/5)`);
    }

    // 🟢 [Logic ใหม่]: ถ้าจบ Loop แล้วยังไม่เจอภาพเลย ให้ Log เตือนแต่ไม่ต้อง Crash
    if (newImageUrls.length === 0) {
        bananaAddLog('⚠️ ไม่พบรูปภาพใหม่ในรอบนี้ (รูปอาจสร้างไม่สำเร็จหรือ Error) - กำลังข้ามไปเช็คขั้นตอนถัดไป', 'warning');
    } else {
        newImageUrls.reverse(); 
        bananaAddLog(`✨ ยืนยันพบภาพใหม่ที่สร้างสำเร็จ ${newImageUrls.length} ภาพ`, 'success');
    }

    // -------------------------------------------------
    // 🔄 PHASE 4: แปลงข้อมูลและส่งต่อ (แก้ไขให้ข้ามได้ถ้าไม่มีรูป)
    // -------------------------------------------------
    if (newImageUrls.length > 0) {
        bananaUpdateStatus(`🎬 [2/2] กำลังแปลงข้อมูลภาพใหม่...`);
        videoUploadedImages = []; // เคลียร์ของเก่าทิ้ง

        for (let i = 0; i < newImageUrls.length; i++) {
            if (bananaShouldStopAutomation) throw new Error('STOPPED');

            const url = newImageUrls[i];
            let dataUrl = url;

            bananaUpdateStatus(`🎬 [2/2] กำลังแปลงภาพ ${i + 1}/${newImageUrls.length}...`);

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
        bananaUpdateStatus(`🎬 [2/2] ส่งต่อภาพ ${videoUploadedImages.length} ภาพ ไปยัง Video Mode`);

        // สลับ Tab ไปหน้า Video
        const videoTab = document.querySelector('[data-tab="video"]');
        if (videoTab) {
            videoTab.click();
            await new Promise(resolve => setTimeout(resolve, 1000));
        }
    } else {
        bananaUpdateStatus('ไม่พบภาพใหม่สำหรับส่งต่อไปทำวิดีโอ');
        bananaAddLog('⏭️ ไม่มีรูปใหม่ให้ส่งต่อ - ข้ามขั้นตอนการทำ Video', 'info');
        return;
    }

// -------------------------------------------------
    // 🚀 PHASE 5: รัน Video Automation (ฉบับแก้ไข: ปิดสุ่ม และใช้สไตล์ UGC)
    // -------------------------------------------------
    // [จุดที่แก้ไข]: ยกเลิกการบังคับสุ่ม และสั่งให้ใช้สไตล์ รีวิว UGC (16) เสมอ
    const vRandomCheckbox = document.getElementById('video-random-style-switch'); 
    if (vRandomCheckbox) {
        vRandomCheckbox.checked = false; // ❌ ปิดโหมดสุ่ม
        // กระตุ้น Event เพื่อให้ UI หน้าเว็บปรับความสว่างกล่องสไตล์ให้กลับมาเลือกได้
        vRandomCheckbox.dispatchEvent(new Event('change', { bubbles: true })); 
        bananaAddLog('✅ ปิดโหมดสุ่ม Video Style อัตโนมัติ เพื่อใช้สไตล์ที่กำหนด', 'info');
    }

    // บังคับเลือกปุ่มสไตล์เบอร์ 16 (รีวิวบ้านๆ/UGC) เพื่อความชัวร์ก่อนรัน
    const ugcOption = null && document.querySelector('.config-option[data-type="vstyle"][data-value="talk_ugc"]')
        || document.querySelector('.config-option[data-type="vstyle"].active')
        || document.querySelector('.config-option[data-type="vstyle"]');
    if (ugcOption) {
        ugcOption.click();
        bananaAddLog('🤳 บังคับใช้สไตล์: รีวิวบ้านๆ (UGC)', 'success');
    }

    const appliedStyleLabel = bananaApplyToVideoStyle(selectedVideoStyle);
    bananaAddLog(`🎬 ใช้สไตล์วิดีโออัตโนมัติ: ${appliedStyleLabel}`, 'success');
    bananaUpdateToVideoSummary(`ส่งต่อ ${videoUploadedImages.length} ภาพไปทำวิดีโอสไตล์ ${appliedStyleLabel}`);

    if (videoUploadedImages.length === 0) {
        throw new Error('ไม่พบภาพที่ส่งต่อไปยัง Video Mode');
    }

    await videoRunAutomation();

    bananaUpdateStatus('🎬 เสร็จสิ้น! สร้างภาพและวิดีโอเสร็จแล้ว');
    showToast('สร้างภาพและวิดีโอเสร็จแล้ว!', 'success');

  } catch (error) {
    if (error.message === 'STOPPED') {
        bananaUpdateStatus('หยุดการทำงานแล้ว');
        showToast('หยุดตามคำสั่งผู้ใช้', 'warning');
    } else {
        bananaUpdateStatus(`❌ Error: ${error.message}`);
        showToast('เกิดข้อผิดพลาด: ' + error.message, 'error');
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
// 🍌 BANANA SETUP: EVENT LISTENERS (ฉบับแก้: ล็อคปุ่ม Text เมื่อใช้ Smart Auto)
// ============================================
function bananaSetupEventListeners() {
	
// ==================================================================
  // 🟢 [NEW] จัดการ Smart Auto ของ MASCOT (Fix: ไม่ล็อกปุ่มข้อความ)
  // ==================================================================
  const mascotSmartCheck = document.getElementById('mascot-smart-auto-checkbox');
  const mascotBgInput = document.getElementById('mascot-bg-select');
  const mascotOutfitInput = document.getElementById('mascot-outfit-select');
  const mascotCustomBg = document.getElementById('mascot-custom-bg-input');
  const mascotCustomOutfit = document.getElementById('mascot-custom-outfit-input');
  
  // เพิ่ม: กล่องสวิตช์ข้อความ
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
              // 1. ล็อคส่วนเลือกฉากและชุด (ให้ AI คิดเอง)
              toggleLock(mascotBgInput, true);
              toggleLock(mascotOutfitInput, true);
              if(mascotCustomBg) mascotCustomBg.disabled = true;
              if(mascotCustomOutfit) mascotCustomOutfit.disabled = true;
              
              // 🟢 2. ไม่ล็อกสวิตช์ข้อความส่วนกลางแล้ว เพื่อให้ผู้ใช้เลือกเปิด/ปิดเองได้ตลอด
          } else {
              // 1. ปลดล็อคปกติ
              toggleLock(mascotBgInput, false);
              toggleLock(mascotOutfitInput, false);
              if(mascotCustomBg) mascotCustomBg.disabled = false;
              if(mascotCustomOutfit) mascotCustomOutfit.disabled = false;
          }
      });
      
      // กระตุ้น Event ครั้งแรก
      setTimeout(() => { mascotSmartCheck.dispatchEvent(new Event('change')); }, 200);
  }
	
  
  const smartAutoCheckbox = document.getElementById('banana-smart-auto-checkbox');
  const manualContainer = document.getElementById('manual-config-container');
  
  // 🟢 เพิ่ม: หาปุ่ม Checkbox ใส่ตัวหนังสือและกล่องของมัน
  const textCheckbox = document.getElementById('banana-text-overlay-checkbox');
  const textOverlayBox = textCheckbox ? textCheckbox.closest('.special-box') : null;

  if (smartAutoCheckbox) {
      smartAutoCheckbox.addEventListener('change', (e) => {
          const isSmartOn = e.target.checked;

          // 1. จัดการส่วน Manual Config (ข้างล่างสุด)
          if (manualContainer) {
              if (isSmartOn) manualContainer.classList.add('disabled-section');
              else manualContainer.classList.remove('disabled-section');
          }

          // 🟢 แก้ไข: ไม่ล็อกปุ่มข้อความแล้ว (ให้เลือกเองได้เสมอ)
          if (textOverlayBox && textCheckbox) {
              // ไม่ทำอะไรกับ classList 'disabled-section' 
              // เพื่อให้ผู้ใช้กดเปิด/ปิดได้เองตามใจชอบ แม้จะเปิด Smart Auto อยู่ก็ตาม
              textOverlayBox.classList.remove('disabled-section');
          }
      });
      
      // กระตุ้น Event ครั้งแรกเพื่อให้ UI อัปเดตตามค่าเริ่มต้นทันที
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
  
  
  
// ปุ่ม START (ฝั่งสร้างภาพอย่างเดียว)
  if(bananaBtnAutomation) {
      bananaBtnAutomation.addEventListener('click', async () => {
          const shouldContinueToVideo = bananaToVideoCheckbox && bananaToVideoCheckbox.checked;
          if (shouldContinueToVideo) {
              if (window.FeatureGate && !FeatureGate.can('imageToVideo')) {
                  bananaToVideoCheckbox.checked = false;
                  showToast('Image-to-Video Auto ใช้ได้เฉพาะ Premium', 'warning');
                  return;
              }
              await bananaToVideoAutomation();
              return;
          }

          await bananaHandleAutomation(false);  // สั่งรันแค่โหมดสร้างรูป แล้วจบเลย
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
  
  
  // 🟢 เพิ่ม: Event Listener สำหรับสวิตช์ "สุ่มสไตล์"
  const randomStyleSwitch = document.getElementById('banana-random-style-switch');
  const styleSelectContainer = document.getElementById('config-content-style');

  if (randomStyleSwitch && styleSelectContainer) {
      randomStyleSwitch.addEventListener('change', (e) => {
          if (e.target.checked) {
              // ถ้าเปิดสุ่ม -> ทำกล่องเลือกข้างล่างให้มืด (Disabled)
              styleSelectContainer.classList.add('disabled-section');
          } else {
              // ถ้าปิดสุ่ม -> ปลดล็อคให้เลือกเองได้
              styleSelectContainer.classList.remove('disabled-section');
          }
      });

      // เรียกครั้งแรกเพื่อเซ็ตค่าเริ่มต้น
      setTimeout(() => {
          randomStyleSwitch.dispatchEvent(new Event('change'));
      }, 100);
  }
  
  
  // 🟢 เพิ่ม: Event Listener สำหรับสวิตช์ "สุ่มฉากหลัง"
  const randomBgSwitch = document.getElementById('banana-random-bg-switch');
  const bgSelectContainer = document.getElementById('config-content-bg');

  if (randomBgSwitch && bgSelectContainer) {
      randomBgSwitch.addEventListener('change', (e) => {
          if (e.target.checked) {
              // ถ้าเปิดสุ่ม -> ทำกล่องเลือกข้างล่างให้มืด (Disabled)
              bgSelectContainer.classList.add('disabled-section');
          } else {
              // ถ้าปิดสุ่ม -> ปลดล็อคให้เลือกเองได้
              bgSelectContainer.classList.remove('disabled-section');
          }
      });

      // เรียกครั้งแรกเพื่อเซ็ตค่าเริ่มต้น
      setTimeout(() => {
          randomBgSwitch.dispatchEvent(new Event('change'));
      }, 100);
  }
  
  // 🟢 เพิ่ม: Event Listener สำหรับสวิตช์ "สุ่มชุด"
  const randomOutfitSwitch = document.getElementById('banana-random-outfit-switch');
  const outfitSelectContainer = document.getElementById('config-content-outfit');

  if (randomOutfitSwitch && outfitSelectContainer) {
      randomOutfitSwitch.addEventListener('change', (e) => {
          if (e.target.checked) {
              // ถ้าเปิดสุ่ม -> ทำกล่องเลือกข้างล่างให้มืด (Disabled)
              outfitSelectContainer.classList.add('disabled-section');
          } else {
              // ถ้าปิดสุ่ม -> ปลดล็อคให้เลือกเองได้
              outfitSelectContainer.classList.remove('disabled-section');
          }
      });

      // เรียกครั้งแรกเพื่อเซ็ตค่าเริ่มต้น
      setTimeout(() => {
          randomOutfitSwitch.dispatchEvent(new Event('change'));
      }, 100);
  }
  
  
}



// ============================================
// Banana: Main Automation Logic (Full Version)
// ============================================
async function bananaHandleAutomation(isContinuous = false) {
  // --- 🛡️ Security & Init ---
  if (!_0x99f || typeof AUTH === 'undefined') {
      _selfDestruct("E03: Illegal Execution");
      return;
  }
  const isCorrect = await checkCorrectWebsite();
  if (!isCorrect) return; 

  const productName = bananaProductNameInput.value.trim();

  if (bananaUploadedImages.length === 0) {
    showToast('กรุณาอัพโหลดภาพสินค้าก่อน', 'error');
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
  bananaBtnAutomation.innerHTML = '<span class="loading"></span> <span>กำลังทำงาน...</span>';

  if (bananaBtnStop) bananaBtnStop.style.display = 'flex';

  let completedRounds = 0;
  let totalDownloaded = 0;

  bananaClearLogs();
  bananaAddLog('🚀 เริ่มสร้างภาพอัตโนมัติ', 'step');
  
 // ============================================
  // 🟢 ขั้นตอนที่ 1: ตั้งค่าระบบโหมด Image (อัปเกรดค้นหาด้วยไอคอน Google Symbols)
  // ============================================
  bananaUpdateStatus('⚙️ ขั้นตอนที่ 1: กำลังตั้งค่าระบบ...');

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

                // ฟังก์ชันค้นหาปุ่ม Tab จากชื่อไอคอน 
                function findTabByIcon(iconName) {
                    const tabs = Array.from(document.querySelectorAll('button[role="tab"]'));
                    return tabs.find(tab => {
                        const icon = tab.querySelector('i.google-symbols');
                        return icon && icon.textContent.trim() === iconName;
                    });
                }

                // 1. 🔍 หาปุ่มเปิดเมนูตั้งค่า
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

                if (!settingsBtn) return resolve({ success: false, msg: 'หาปุ่มตั้งค่า (ข้างปุ่มส่งคำสั่ง) ไม่เจอ' });
                forceClick(settingsBtn);

                // 2. 🟢 หาแท็บ "Image" (ค้นหาด้วยไอคอน image)
                let imageTab = null;
                for (let i = 0; i < 20; i++) {
                    await sleep(500);
                    imageTab = findTabByIcon('image');
                    if (imageTab) break;
                }
                
                if (!imageTab) {
                    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', keyCode: 27, bubbles: true }));
                    return resolve({ success: false, msg: 'หาแท็บ Image ไม่เจอ (เว็บโหลดช้า)' });
                }
                forceClick(imageTab);
                await sleep(1000); 

                // 3. 🟢 หาปุ่ม สัดส่วน (Portrait = crop_9_16, Landscape = crop_16_9)
                const targetIcon = (ratio === '9:16') ? 'crop_9_16' : 'crop_16_9';
                let ratioBtn = null;
                for (let i = 0; i < 20; i++) { 
                    await sleep(500);
                    ratioBtn = findTabByIcon(targetIcon);
                    if (ratioBtn) break;
                }
                
                if (!ratioBtn) {
                    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', keyCode: 27, bubbles: true }));
                    return resolve({ success: false, msg: `หาปุ่มสัดส่วน ${ratio} ไม่เจอ` });
                }
                forceClick(ratioBtn);
                await sleep(1000); 

                // 4. ปิดเมนู
                document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', keyCode: 27, bubbles: true }));
                await sleep(800);
                resolve({ success: true, msg: 'ตั้งค่าสำเร็จ' });

            } catch (err) {
                resolve({ success: false, msg: 'Error ภายในหน้าเว็บ: ' + err.message });
            }
          });
        },
        args: [getVeo3AspectRatio()]
      });

      if (!setupInitial[0]?.result?.success) throw new Error(setupInitial[0]?.result?.msg);
      bananaAddLog('✅ ขั้นตอนที่ 1: ตั้งค่า Image Mode สำเร็จ', 'success');
      await bananaSleep(1500); 

  } catch (setupError) {
      bananaAddLog(`❌ ขั้นตอนที่ 1 ล้มเหลว: ${setupError.message}`, 'error');
      bananaUpdateStatus('⚠️ ยกเลิกการทำงาน: ตั้งค่าโหมดภาพไม่สำเร็จ');
      
      bananaIsAutomationRunning = false;
      bananaBtnAutomation.disabled = false;
      bananaBtnAutomation.innerHTML = '<span>START GENERATE</span>';
      if (bananaBtnStop) bananaBtnStop.style.display = 'none';
      try { await toggleWebPageLock(false); } catch (e) {}
      
      return; 
  }

  // ============================================
  // 🔄 เริ่มการทำงานแบบวนลูป (Image x Rounds)
  // ============================================
  try {
      for (let imgIndex = 0; imgIndex < totalImages; imgIndex++) {
        const currentImage = bananaUploadedImages[imgIndex];

        for (let round = 0; round < roundsPerImage; round++) {
          const currentRound = imgIndex * roundsPerImage + round + 1;
          const roundLabel = `[รอบ ${currentRound}/${totalRounds}]`;
          
          if (bananaShouldStopAutomation) throw new Error('STOPPED');

        // ----------------------------------------------------
          // 🟢 STEP 1: เตรียม Prompt (แยก Smart Auto ออกจากโหมดปกติ)
          // ----------------------------------------------------
          bananaUpdateStatus(`🤖 ${roundLabel} [1/5] กำลังสร้าง Prompt...`);
          
          const policyPrompt = "(Policy: Do NOT show specific pricing numbers. Do NOT make medical claims. No text overlay unless specified.)";
          let imgSafety = (modelUploadedImages && modelUploadedImages.length > 0) ? " (IMPORTANT: High fidelity to reference image. Keep exact face, hair color, and identity. Do NOT change facial features.)" : " (Ethnicity: Thai/Asian appearance. Authentic look.)";
          const coreNegative = "borders, frame, watermark, bad anatomy, deformed, blurry, ugly, sketch, specific pricing, extra hands, extra fingers, duplicate hands, floating hands, detached hands, third hand, random hand entering frame, malformed hands, mutated fingers, fused fingers, too many fingers";

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
              const headlineRule = "CRITICAL TYPOGRAPHY RULE: Because text overlay is enabled, the image MUST include a large, prominent Thai advertising headline, not tiny caption text. The typography must feel like a real ad design with graphic play, not plain typed text. Use ad-poster scale typography with strong hierarchy, readable thick lettering, clear contrast, outline or shadow depth when useful, dynamic placement, supporting shapes, accent strokes, stickers, tags, arrows, underlines, glow, shadow, panels, or product-themed graphic elements when suitable. The headline must be easy to read at phone-screen size and integrated into the composition.";

              const textProfiles = {
                  cute_ugc: `${headlineRule} Cute Thai UGC ad typography. ${exactText} Add playful doodles, arrows, sticker-like accents, cheerful review-thumbnail layout, bright friendly colors, and a fun Must-Have social media feeling.`,
                  premium: `${headlineRule} Modern premium Thai advertising typography. ${exactText} Use bold clean Thai lettering, strong readable hierarchy, crisp color-block panels, product-color accent shapes, modern sticker tags, short underline strokes, soft shadow depth, and polished social-commerce layout. Keep it fresh, current, and desirable. Avoid old luxury styling: no gold serif headline, no royal calligraphy, no ornate swirls, no vintage premium script. Clean does not mean plain.`,
                  cgi_extreme: `${headlineRule} Extreme CGI Thai advertising typography. ${exactText} Use massive cinematic 3D headline lettering, glowing outlines, neon rim light, metallic or glass depth, energy trails, particles, speed lines, explosion-like graphic accents, dramatic badges, and over-the-top blockbuster campaign layout. Make it feel like an ultra-premium futuristic CG product ad, bold and spectacular, not subtle.`,
                  live_sale: `${headlineRule} Energetic Thai shopping-host typography. ${exactText} Use bold colorful callout shapes, exciting sticker labels, arrows, pop accents, and a lively real-time selling feeling. Do not write the words "ไลฟ์สด", "LIVE", "Live", or "livestream" in the image unless the user explicitly typed them in custom text.`,
                  live_photo_no_text: `${headlineRule} Clean Thai selling-host typography control. ${exactText} If text overlay is enabled, use only this Thai advertising text as a prominent selling headline and integrate it cleanly into the photo. Add lively ad-style shapes or accents, but do not invent livestream UI, chat comments, price tags, badges, captions, subtitles, "ไลฟ์สด", "LIVE", "Live", or "livestream" unless the user explicitly typed those words in custom text.`,
                  mascot_cute: `${headlineRule} Playful Thai bubble-letter typography. ${exactText} Add cute mascot-friendly stickers, rounded labels, sparkles, arrows, soft colorful accents, and a cheerful toy-like advertising feeling.`,
                  minimal: `${headlineRule} Clean bold Thai advertising typography. ${exactText} Keep the layout uncluttered, but still use a large readable headline, one optional smaller supporting line, strong contrast, dynamic placement, tasteful accent lines, small labels, and polished ad-like spacing. Do not make the text tiny or plain.`,
                  clean_demo: `${headlineRule} Clean Thai product-demonstration typography. ${exactText} Use one large clearly readable headline plus a smaller supporting line, placed in an open corner or lower third without covering the hands, product, or result. Add practical graphic callouts, arrows, underline accents, or small benefit tags when suitable. Keep it modern, warm, practical, and ad-like, not tiny, plain, or cluttered.`,
                  fashion_campaign: `${headlineRule} Modern Thai fashion typography. ${exactText} Use a stylish large headline lockup with bold rounded or clean geometric Thai lettering, playful outline, soft drop shadow, trendy sticker tags, small cute-cool badges, simple arrows, color-block panels, and accents matched to the outfit colors. Keep it fresh, fashionable, friendly, and youthful-but-polished. Avoid old luxury styling: no gold serif headline, no royal calligraphy, no ornate swirls, no vintage premium script. Place text around the model without covering the outfit silhouette or wearable product.`,
                  clothing_editorial: `${headlineRule} Modern cute-cool Thai clothing campaign typography. ${exactText} Build a fashion headline lockup with bold rounded Thai letters, white or color outline, soft shadow depth, playful sticker labels, clean color-block shapes, small star/spark accents, simple underline strokes, and palette colors picked from the outfit. The mood should feel trendy, wearable, youthful, and stylish, not old-fashioned luxury. Avoid gold serif typography, ornate curves, royal-style calligraphy, vintage swirls, and overly elegant luxury script. The text must frame the outfit and enhance the silhouette without covering fabric details.`,
                  ad_campaign: `${headlineRule} Dynamic Thai advertising poster typography. ${exactText} Create a polished modern campaign headline layout with a large expressive Thai headline, smaller supporting line, strong visual hierarchy, bold graphic strokes or underline accents, sticker-like detail tags, and text integrated into the image composition instead of a plain caption. Avoid old luxury styling, gold serif type, royal calligraphy, and vintage ornate swirls.`,
                  luxury_packshot: `${headlineRule} Modern product packshot Thai advertising typography. ${exactText} Use a large clean headline lockup with bold rounded or geometric Thai lettering, strong contrast, product-color accent blocks, neat sticker labels, modern badges, crisp shadow depth, simple arrows or underline marks, and a bottom-third or side-column layout that frames [product] like a finished contemporary product campaign. Avoid gold serif typography, royal calligraphy, ornate swirls, vintage luxury script, and old-fashioned beauty-poster styling.`,
                  retail_poster: `${headlineRule} Thai retail review poster typography. ${exactText} Use bold readable headline blocks, sticker-style benefit labels, small callout tags, arrows, shop-signage energy, and a friendly sales-poster composition that feels designed, not like casual UGC text or plain text.`,
                  natural_editorial: `${headlineRule} Natural-light Thai editorial ad typography. ${exactText} Use airy modern magazine-style layout with a large readable headline, soft translucent text panels or clean headline zones, warm accent lines, subtle stickers or label tags, balanced whitespace, and polished product-lifestyle hierarchy. Keep it fresh, warm, current, and clearly designed, not classic or old-fashioned.`,
                  campaign_pop: `${headlineRule} High-impact Thai product campaign typography. ${exactText} Use a huge playful headline at the top with thick rounded lettering, white outline, shadow depth, dynamic supporting words around the subject, small brand-style badges, sparkle accents, arrows or decorative marks when suitable, and a polished advertising composition. Keep it energetic, premium, and product-appropriate, not like a discount flyer or plain caption text.`
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
              // 🎯 ดึงแค่ "คาแรคเตอร์" อย่างเดียว (ไม่เอาชุด/ฉาก มาปนเผื่อไว้ให้โหมด Smart Auto)
              let charKey = document.getElementById('banana-character-select')?.value || 'auto';
              let charCustom = document.getElementById('banana-custom-character-input')?.value || "";
              const canUseCustomCharacter = !window.FeatureGate || FeatureGate.can('customCharacter');
                  if (!canUseCustomCharacter) {
                      if (charKey === 'auto' || charKey === 'custom') charKey = 'office_lady';
                      charCustom = "";
                  }
            const charDict = {
                  // 👩‍🦰 ทั่วไป (หญิง)
                  'teen_girl': 'realistic modern Thai teenage girl, fresh casual look, natural skin texture',
                  'office_lady': 'smart professional Thai working woman', 
                  'net_idol': 'beautiful trendy Thai net idol', 
                  'hiso_girl': 'elegant wealthy high-society Thai woman', 
                  'sport_girl': 'active fit Thai woman in sportswear',
                  'real_size': 'confident plus-size chubby Thai woman',
                  'mom': 'warm and kind Thai mother',
                  'hijab': 'beautiful Thai muslim woman wearing a hijab',
                  'villager_girl': 'authentic Thai countryside woman, rural provincial style, natural imperfect skin texture, not overly polished, realistic everyday look',
                  
                  // 🧢 ทั่วไป (ชาย)
                  'thai_guy': 'cool modern Thai teenager guy',
                  'net_idol_male': 'handsome trendy Thai male net idol, stylish social media creator look',
                  'smart_man': 'handsome professional Thai businessman',
                  'oppa': 'handsome stylish Korean-looking Thai man',
                  'muscle_man': 'muscular fit Thai fitness man',
                  'street_boy': 'cool trendy Thai streetwear boy',
                  'dad': 'warm and reliable Thai father',
                  'villager_boy': 'authentic Thai countryside man, rural provincial style, natural imperfect skin texture, not overly polished, realistic everyday look',

                  // 👷 อาชีพ
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

                  // 👴 สูงวัย
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
              
              // 🟢 [แก้ไข]: ถ้ามีรูปนางแบบ (Ref) ให้ข้ามการดึงค่าจากปุ่ม แล้วใช้คำกลางๆ ทับไปเลย
              // ป้องกันปัญหา AI สับสนเพศระหว่างรูปภาพ Ref กับคำสั่ง Text
              if (modelUploadedImages && modelUploadedImages.length > 0) {
                  baseChar = "the exact person from the reference image";
              } else if (charKey === 'auto' || charKey === 'custom') {
                  if (charCustom !== "") baseChar = charCustom;
              } else {
                  baseChar = charDict[charKey] || charKey.replace(/_/g, ' ');
              }

             if (isSmartAutoChecked) {
                  // 🚀 โหมด Smart Auto: ปิดกั้น UI ภายนอก ใช้แค่คน แล้วให้ AI จัดชุด/ฉากให้เอง
                  const attireVariations = [
                      "dressed in attire that perfectly matches the product theme.",
                      "wearing a stylish outfit that blends naturally with the scene.",
                      "dressed in high-quality clothing suitable for this item.",
                      "wearing modern fashion that complements the presentation.",
                      "dressed in an elegant outfit designed for commercials."
                  ];
                  const smartAttire = attireVariations[Math.floor(Math.random() * attireVariations.length)];

                  const actionLogic = `(Action Instructions): - If [product] is clothing: MUST BE WEARING it. - If handheld: MUST BE HOLDING it.`;
                  const fidelityRules = `(STRICT FIDELITY): [product] must be 100% IDENTICAL to the uploaded/reference source. Keep the exact package shape, logo area, label layout, color, cap, material, proportions, and key visual details. Do not redesign, rebrand, recolor, translate, simplify, replace, or invent new flavors, sizes, colors, or variants. If multiple products are shown, they must be exact copies of the same reference product unless the user explicitly asks for variants.`;
                  const smartNegative = coreNegative + ", price tag, numbers, watermark";
                  const smartCampaignTextPrompt = buildTextStylePrompt('campaign_pop');
                  const smartCameraDirections = [
                      'Camera direction: dynamic campaign hero shot, [product] large in the foreground, presenter in the midground, strong depth and clean headline space.',
                      'Camera direction: close product-first portrait framing with shallow depth of field, crisp packaging, and soft background blur.',
                      'Camera direction: 3/4 advertising angle with diagonal visual flow, product foreground, presenter support, and natural perspective.',
                      'Camera direction: slight low-angle hero framing that makes [product] feel premium and desirable without distorting the package.',
                      'Camera direction: medium-close commercial portrait crop with face and [product] both readable, polished depth, and lively ad composition.',
                      'Camera direction: product foreground with layered background props and soft bokeh, strong foreground-midground-background separation.'
                  ];
                  const smartCameraPrompt = smartCameraDirections[Math.floor(Math.random() * smartCameraDirections.length)] + ' Avoid repeating the exact same composition across generations. No camera brand text or camera logos.';

                  // 🛑 Smart Auto: ให้ AI ทำหน้าที่เป็นผู้กำกับภาพโฆษณา เลือกชุด ฉาก และองค์ประกอบให้เข้ากับสินค้า
                  const smartVariations = [
                      `Ultimate promotional advertisement image for [product]. Act as a creative advertising director. Choose the most suitable outfit, background, props, lighting, colors, graphic accents, and composition for this product category and target customer. ${baseChar} is ${smartAttire} and poses confidently while presenting [product]. Make [product] the main visual focus with clear packaging, strong hierarchy, and a complete high-impact Thai campaign layout. ${smartCameraPrompt} ${actionLogic} ${fidelityRules} ${smartCampaignTextPrompt} Photorealistic, polished, dynamic, not a simple person-holding-product photo.`,
                      `Hero campaign key visual for [product]. AI must design the outfit and scene to match the product, customer, and brand mood. ${baseChar} appears as a confident presenter in a dynamic advertising pose, with [product] large, readable, and visually dominant. Add product-appropriate props, background details, color blocking, light effects, and graphic accents that make the ad feel finished and exciting. ${smartCameraPrompt} ${actionLogic} ${fidelityRules} ${smartCampaignTextPrompt} Sharp professional-camera realism, premium social-commerce poster quality.`,
                      `Benefit-burst Thai product advertisement for [product]. Choose a matching outfit and background automatically, then build the image around the product benefits. ${baseChar} presents [product] with energetic sales confidence. Arrange clear product hero placement, supporting benefit badges, arrows, sparkle marks, callout zones, and a readable Thai headline without making it look like a discount flyer. ${smartCameraPrompt} ${actionLogic} ${fidelityRules} ${smartCampaignTextPrompt} High-impact commercial composition, crisp product details.`,
                      `Lifestyle campaign poster for [product]. Select the most suitable outfit and real-world setting for the product category, then turn that lifestyle scene into a designed advertisement. ${baseChar} naturally uses or presents [product], while [product] remains the hero with clear packaging. Add tasteful props, dynamic depth, color harmony, graphic accents, and Thai campaign typography that follows the composition. ${smartCameraPrompt} ${actionLogic} ${fidelityRules} ${smartCampaignTextPrompt} Natural but polished advertising realism.`,
                      `Product-world advertising concept for [product]. Let the product theme inspire the outfit, background, props, lighting, colors, and decorative effects. ${baseChar} is integrated into a product-themed campaign scene, presenting [product] with excitement and confidence. Make the image feel imaginative but still useful for real Thai social-commerce advertising, with strong product readability and designed typography. ${smartCameraPrompt} ${actionLogic} ${fidelityRules} ${smartCampaignTextPrompt} Premium photorealistic campaign poster.`,
                      `Social-commerce launch poster for [product]. AI chooses a matching outfit and selling environment, then creates a scroll-stopping Thai ad image with a large product hero, expressive presenter pose, bold headline area, supporting text blocks, stickers, arrows, and energetic graphic rhythm. Keep it polished and product-appropriate, not casual UGC and not plain studio photography. ${smartCameraPrompt} ${actionLogic} ${fidelityRules} ${smartCampaignTextPrompt} Bright commercial lighting, crisp details, finished ad layout.`
                  ];

                  const rIndex = Math.floor(Math.random() * smartVariations.length);
                  generatedPrompt = smartVariations[rIndex] + ` ${imgSafety} ${policyPrompt} ${getAntiBotSeed()} Negative Prompt: "${smartNegative}${manualNegativeAddon}"`;

                  const styleNames = ["🎯 Campaign Director", "🌟 Hero Campaign", "💥 Benefit Burst", "🏡 Lifestyle Poster", "✨ Product World", "🚀 Social Launch"];
                  bananaAddLog(`🚀 Smart Auto: สุ่มใช้สไตล์ "${styleNames[rIndex]}"`, 'info');

              

              } else {
               // ⚙️ โหมดปกติ (Manual): ดึงชุดและฉากจาก UI มาประกอบร่าง
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

               // 👗 ดิกชันนารี: หมวดหมู่ชุดแต่งกาย (16 ชุด ตรงตาม UI 100%)
                  const outfitDict = { 
                      // 👕 ทั่วไป/แฟชั่น
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

                      // 💼 ทางการ
                      'shirt': 'neat crisp button-up shirt',
                      'suit': 'professional business suit',

                      // 🌸 ท้องถิ่น
                      'morhom': 'modern casual indigo morhom-inspired shirt, contemporary styling', 
                      'isan': 'modern casual outfit with subtle Thai Isan Pa Khao Ma inspired accent, not historical costume', 
                      'northern': 'modern northern Thai-inspired contemporary fashion, not ancient costume', 
                      'southern': 'modern southern Thai batik-inspired contemporary fashion, not ancient costume', 
                      'thai_dress': 'modern Thai fusion fashion with contemporary styling, not ancient royal costume', 
                      'hill_tribe': 'modern hill-tribe-inspired colorful fashion, contemporary and respectful styling'
                  };

                  // 🖼ï¸ ดิกชันนารี: หมวดหมู่ฉากหลัง (30 ฉาก ตรงตาม UI 100%)
                  const bgDict = { 
                      // 🏠 ภายใน (Indoor)
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
                      
                      // 🏙️ เมือง (Urban)
                      'cafe': 'cozy minimal aesthetic cafe', 
                      'office': 'modern corporate office workspace',
                      'gym': 'modern fitness gym equipment background',
                      'supermarket': 'supermarket aisle with organized shelves',
                      'live_warehouse': 'busy product warehouse selling scene with tall storage shelves, stacked boxes, packing tables, and staff actively packing orders in the background. The foreground should feel close to a selling table with many visible copies of [product] neatly arranged, while the warehouse remains visible behind with strong depth and warm practical lighting. Energetic best-selling online shop atmosphere, organized chaos, product-packed foreground, staff movement in the background, trustworthy ready-to-ship Thai store feeling. No readable text, no price signs, no livestream UI, no ring light, no tripod, no microphone, no messy clutter',
                      'factory_line': 'medium-close factory packing conveyor scene for [product]. Show [product] repeated clearly along a conveyor belt in the foreground and midground, with staff standing beside the belt packing, sorting, labeling, or placing products into boxes. The conveyor belt should lead into the background with strong depth, but the camera must not be too far away. Use a realistic warehouse-factory packing area, shelves and boxes in the background, busy staff working naturally, bright practical factory lighting, clean organized workflow, and a trustworthy high-volume production atmosphere. No livestream equipment, no ring light, no microphone, no messy clutter',
                      'busy_shop': 'busy popular retail shop packed with many visible products, full shelves, crowded product displays, customers browsing and buying, and active shop staff helping customers. Make the foreground feel full of products and successful sales energy, while keeping the main [product] area visible and not blocked. Warm practical store lighting, lively best-selling product atmosphere, organized but busy retail environment. No livestream equipment, no ring light, no microphone, no messy clutter',
                      'sampheng_market': 'grand busy Sampheng-style Thai wholesale market shop packed with lots of merchandise, dense colorful product displays, narrow shopfront feeling, full shelves, hanging goods, baskets, shoppers browsing closely, and shop staff helping customers. The scene should feel abundant, crowded, and high-traffic like a successful wholesale shop, but the main [product] area must remain visible in the foreground and not be overshadowed. Warm practical market lighting, organized dense retail energy, no livestream equipment, no ring light, no microphone, no messy clutter',
                      'street': 'vibrant trendy city street', 
                      'subway': 'modern subway train station interior',
                      'restaurant': 'beautiful fine dining restaurant interior',
                      'airport': 'modern airport terminal lounge',
                      'in_car': 'inside a modern car interior',
                      'on_bike': 'sitting on a stylish motorcycle outdoors',

                      // 🌳 นอกสถานที่ (Outdoor)
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
                  
                  // 🟢 [อัปเกรด] บังคับชุด: ไม่สนว่าคลิกปุ่มไหนอยู่ ถ้าช่อง "ระบุเอง" มีข้อความ และไม่ได้เปิดสุ่ม ให้ใช้ข้อความนั้นทันที!
                  if (characterHasFixedOutfit && !(modelUploadedImages && modelUploadedImages.length > 0)) {
                      finalOutfit = "";
                      bananaAddLog('👗 ตัวละครนี้มีชุดเฉพาะ ระบบจึงไม่ซ้อนชุดเพิ่ม', 'info');
                  }
                  else if (!isRandomOutfit && outfitCustom.trim() !== "") {
                      finalOutfit = `[CRITICAL OUTFIT RULE: The character MUST be wearing EXACTLY this outfit/uniform: "${outfitCustom.trim()}". Absolutely NO standard t-shirts, NO casual jeans, NO default clothing. Follow the user's outfit instruction strictly.]`;
                      bananaAddLog(`👗 บังคับชุด: "${outfitCustom.trim()}"`, 'info');
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
                  
                  // ผูกคาแรคเตอร์เข้ากับชุด
                  let finalCharWithOutfit = baseChar;
                  if (finalOutfit !== "") finalCharWithOutfit += ` ${finalOutfit}`;
				  
                 let finalBg = "clean aesthetic background";
                  
                  // 🟢 [อัปเกรด] ระบบบังคับฉาก: ฝังกฎเหล็กขั้นเด็ดขาดเมื่อผู้ใช้ระบุเอง
                  // 🛠️ FIX: นำเงื่อนไขเช็คปุ่มที่ขัดแย้งกับ UI ออก เพื่อให้ดึงข้อความมาใช้ได้ทันที
                  if (!isRandomBg && bgCustom.trim() !== "") {
                      finalBg = `[CRITICAL SETTING RULE: The scene MUST be strictly set in a "${bgCustom.trim()}". Follow this background instruction exactly.]`;
                      bananaAddLog(`🏞️ บังคับฉาก: "${bgCustom.trim()}"`, 'info');
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
                  
                  // อัปเดต Array สำหรับสุ่ม (เอาเฉพาะหมวดที่ใช้งานบ่อย เพื่อไม่ให้สุ่มไปเจอของแปลก)
                  const styleKeys = (window.FeatureGate && FeatureGate.getPlan && FeatureGate.getPlan() === 'basic')
                      ? ['ugc_basic', 'studio', 'live', 'fashion', 'clothing_campaign', 'funny', 'sony_product', 'shop_review']
                      : ['ugc_basic', 'studio', 'fashion', 'clothing_campaign', 'usage', 'real_demo', 'real_user_review', 'texture', 'beauty', 'live', 'sony_product', 'shop_review', 'natural_light', 'real_ads', 'studio_photo', 'counter_display', 'outdoor_market', 'premium_closeup', 'fancy'];
                  if (isRandomStyle) styleKey = styleKeys[Math.floor(Math.random() * styleKeys.length)];

                 // 🟢 อัปเดต: ระบบสุ่มหน้าตาท่าทางสำหรับโหมด "หัวโต" (Funny)
                  const funnyExpressions = [
                      "Playful, sweet, and engaging with a cheerful bright smile", // ยิ้มหวานสดใส
                      "Extremely excited, eyes wide open in amazement, mouth slightly open in a cute gasp", // ตื่นเต้นตาโตอ้าปากนิดๆ
                      "Overjoyed and enthusiastic, huge beaming smile, looking highly energetic", // ยิ้มกว้างร่าเริงสุดพลัง
                      "Cheeky and cute, winking one eye playfully with a sweet smile", // ขยิบตาขี้เล่น
                      "Innocent and adorable puppy-eyes look, gentle and heartwarming smile" // สายตาอ้อนๆ ยิ้มละมุน
                  ];
                  const randFunnyExp = funnyExpressions[Math.floor(Math.random() * funnyExpressions.length)];

                  // 🟢 อัปเดต: ระบบแอบสุ่มห้องสวยๆ สำหรับโหมด "เซลฟี่ลองชุด" (Mirror)
                  if (styleKey === 'mirror') {
                      const mirrorRooms = [
                          'modern aesthetic bedroom with soft lighting', // ห้องนอน
                          'luxury walk-in closet with stylish clothes rack', // ห้องแต่งตัว
                          'clean minimalist dressing area with soft neutral walls', // มุมแต่งตัวมินิมอล
                          'cozy aesthetic living room with indoor plants', // ห้องนั่งเล่น
                          'trendy cafe restroom with warm ambient light', // ห้องน้ำคาเฟ่
                          'stylish fashion boutique fitting room' // ห้องลองชุดร้านเสื้อผ้า
                      ];
                      finalBg = mirrorRooms[Math.floor(Math.random() * mirrorRooms.length)];
                  }

                  // 🟢 อัปเดต: ระบบสุ่มท่านั่ง/ท่ายืน สำหรับโหมด "อินฟลูฯ" (Influencer)
                  const influencerPoses = [
                      "standing casually in the room", // ยืนชิลๆ ในห้อง
                      "sitting comfortably behind a cozy table", // นั่งรีวิวหลังโต๊ะ
                      "sitting relaxed at a nice desk", // นั่งพักผ่อนที่โต๊ะทำงาน
                      "standing and leaning naturally against a counter", // ยืนพิงเคาน์เตอร์แบบธรรมชาติ
                      "sitting casually on a stylish chair" // นั่งบนเก้าอี้
                  ];
                  const randInfluencerPose = influencerPoses[Math.floor(Math.random() * influencerPoses.length)];

                  const ugcBasicCuteVibe = useTextOverlay
                      ? (customTextValue !== ""
                          ? `Cute Thai UGC ad typography that says exactly "${customTextValue}". Add playful doodles, arrows, sticker-like accents, and a cheerful Must-Have review thumbnail feeling.`
                          : `Cute high-impact Thai marketing typography. Add playful doodles, arrows, sticker-like accents, and a cheerful Must-Have review thumbnail feeling. The Thai text should promote [product] in a short catchy way.`)
                      : `Clean no-text version. Keep the cute Basic-style energy with playful non-text doodles, arrows, sticker-like graphic accents, bright friendly composition, and no readable typography.`;
                  const pickStyleCameraPrompt = (styleKey) => {
                      const sharedProductPortrait = [
                          'close portrait-distance product framing with [product] near the camera, soft background blur, and natural depth',
                          'professional product portrait lens look, shallow depth of field, clean foreground focus on [product]',
                          'slightly angled 3/4 product hero framing with the character softly supporting in the midground',
                          'hand-held realistic product close-up, packaging sharp, background softly blurred'
                      ];
                      const cameraPromptMap = {
                          ugc_basic: [
                              'smartphone-style medium close framing, product held close to the lens, friendly creator angle',
                              'casual vertical creator shot with slight handheld perspective and clear product foreground',
                              'bright review-thumbnail framing, face and product both visible, natural phone-camera energy',
                              'close friendly UGC angle with [product] near the camera and a lively personal-review feel'
                          ],
                          studio: [
                              'dynamic hero-shot composition with [product] large in the foreground and presenter in the midground',
                              'slight low-angle campaign framing that makes [product] feel powerful and premium',
                              'centered poster-style hero framing with strong foreground-midground-background depth',
                              'diagonal campaign composition with product foreground, presenter support, and bold headline space'
                          ],
                          live: [
                              'beauty-friendly medium-close selling portrait, host appears attractive waist-up, product display decorates the lower foreground',
                              'close eye-level selling table shot, host centered with flattering face light, products arranged neatly in front',
                              'tight 3/4 selling-table angle, readable products in front, attractive host upper body behind, background softly blurred',
                              'professional portrait selling-table crop with shallow depth, beautiful host face, product rows close to camera, no phone foreground'
                          ],
                          fashion: [
                              'medium-close to medium-full fashion campaign framing that prioritizes the wearable product over the model face',
                              'product-first editorial wearable shot with the item sharp, face optional or softly secondary, clean vertical composition',
                              '3/4 fashion lookbook angle with wearable product detail readable, product closer to camera, and ad-poster spacing',
                              'close-to-medium fashion crop with shallow depth, strong styling, and the worn/carried product as the visual hero'
                          ],
                          clothing_campaign: [
                              'full-body fashion campaign framing with the clothing silhouette clear, editorial pose, and polished headline space',
                              'medium-full clothing advertisement shot with fabric texture readable, elegant body line, and themed set props around the model',
                              '3/4 fashion editorial angle with outfit as the hero, premium lighting, and product-matching environment design',
                              'knee-up to full-body clothing brand poster crop with dramatic softbox light, rim light, and dynamic fashion headline area'
                          ],
                          usage: [
                              'natural medium close-up action framing showing the product being used clearly',
                              'over-the-shoulder real-use angle focused on the product action',
                              'candid 3/4 lifestyle angle with product visible during use and soft natural depth',
                              'close lifestyle action crop that keeps [product] readable while showing the use case'
                          ],
                          real_demo: [
                              'tight close-up POV framing on hands actively using [product], no face visible',
                              'macro demonstration angle showing texture, application, surface, or result clearly',
                              'over-the-hand close crop with [product] and the use action filling the frame',
                              'top-down or slight 3/4 close-up product-use angle, hands only, clean real setting'
                          ],
                          real_user_review: [
                              'soft medium close-up review framing with face partially visible and [product] readable',
                              'casual portrait review angle, product close to camera, warm everyday background blur',
                              'natural 3/4 upper-body framing with product held clearly and believable home-review depth',
                              'close friendly review shot with product foreground and relaxed real-user expression'
                          ],
                          review: [
                              'eye-level desk review shot with product centered on the table and reviewer behind',
                              'slight top-down 25 degree review-table angle showing product layout clearly',
                              '3/4 desk angle with readable packaging rows and reviewer pointing naturally',
                              'close table-foreground framing, product sharp, reviewer softly behind'
                          ],
                          mirror: [
                              'mirror-reflection outfit try-on crop, smartphone held by the model but no phone-screen frame or camera UI overlay, outfit clearly visible',
                              'warm pastel fitting-room mirror-reflection angle, crisp full outfit visibility, phone naturally in hand, no giant phone frame',
                              'clean mirror-reflection fashion selfie composition with sharp outfit details, visible room reflection, no camera app interface',
                              'soft dressing-room mirror POV framing with natural crop, gentle depth, and clear clothing or accessory focus'
                          ],
                          sony_product: sharedProductPortrait,
                          shop_review: [
                              'eye-level product table review shot, multiple products neatly arranged in the foreground',
                              'slight top-down 25 degree table framing that shows many product packs clearly',
                              '3/4 table-review angle with product rows in front and reviewer behind or beside',
                              'close foreground table display with packaging sharp and clean background context'
                          ],
                          natural_light: [
                              'warm window-light portrait framing with product foreground and soft airy background',
                              'gentle 3/4 lifestyle composition with shallow depth and natural sunlight direction',
                              'close natural-light product lifestyle crop, product readable, character softly integrated',
                              'soft backlit lifestyle angle with product in the lower foreground and clean headline space'
                          ],
                          real_ads: [
                              'realistic campaign hero shot with product foreground and confident presenter midground',
                              'dynamic diagonal advertising composition with strong depth and readable product hero',
                              'close commercial portrait framing, product sharp, background polished but believable',
                              '3/4 social-commerce ad angle with layered depth, clean headline space, and natural perspective'
                          ],
                          sony_portrait: sharedProductPortrait,
                          lifestyle_review: [
                              'warm casual medium close-up with product visible during a real everyday moment',
                              'soft 3/4 lifestyle review angle with shallow depth and product foreground clarity',
                              'natural portrait review crop with relaxed expression and readable product',
                              'candid close lifestyle framing that still keeps product packaging clear'
                          ],
                          texture: [
                              'extreme macro crop focused on product texture, material, or surface detail',
                              'tight detail shot with shallow depth and crisp tactile product texture',
                              'macro side-light angle emphasizing texture, shine, droplets, or material quality',
                              'close sensory detail framing with product texture filling most of the image'
                          ],
                          unboxing: [
                              'top-down first-person POV shot with hands holding and showing [product] clearly, no shipping box',
                              'slight 3/4 overhead POV angle showing [product] shape and packaging in the hands, clean surface',
                              'close first-person product-showcase crop with [product] details sharp and readable, no parcel packaging',
                              'realistic handheld POV angle looking down at [product] being presented neatly for review'
                          ],
                          shoes: [
                              'low-angle close-up footwear framing with shoes or feet dominant and background blurred',
                              'street-style low 3/4 angle focused sharply on the product being worn',
                              'close ground-level fashion crop showing product details and realistic depth',
                              'dynamic low-angle product-wear shot with clean background separation'
                          ],
                          hands: [
                              'tight hands-only action close-up showing [product] being operated clearly',
                              'over-the-hand tool-use angle with product controls or action area sharp',
                              '3/4 close action crop focused on hands, product, and real use surface',
                              'practical demonstration close-up with natural hand position and clear product function'
                          ],
                          decor: [
                              'wide 3/4 interior room angle showing [product] placed naturally in the space',
                              'clean editorial interior shot with product as the main anchor and balanced room depth',
                              'slightly low interior hero angle for large product presence without distortion',
                              'wide lifestyle room composition with product clearly visible and environment supporting it'
                          ],
                          showcase: sharedProductPortrait,
                          studio_photo: [
                              'centered premium studio product shot with [product] on a clean platform and tasteful related props around it',
                              'expensive commercial product photography angle, [product] centered, soft shadows, modern prop styling',
                              'high-end tabletop studio mockup with [product] as the main hero and product-related decorations supporting it',
                              'front 3/4 modern packshot composition with crisp label, clean lighting, and contemporary studio depth'
                          ],
                          catalog: [
                              'straight-on clean catalog product framing with accurate shape and label visibility',
                              'slight 3/4 studio catalog angle showing product depth and packaging details',
                              'organized product lineup shot with even lighting and crisp e-commerce clarity',
                              'close clean product catalog crop, neutral perspective, no dramatic distortion'
                          ],
                          counter_display: [
                              'eye-level retail advertising poster shot with product as a neat foreground hero and clean headline space',
                              '3/4 counter angle showing product arrangement, believable shop context, and bold ad layout hierarchy',
                              'close counter-foreground framing with crisp packaging, subtle store depth, and room for a large Thai headline',
                              'slight top-down retail display angle with organized products, readable labels, and campaign-poster composition'
                          ],
                          premium_closeup: [
                              'premium macro product close-up with shallow depth and elegant highlight control',
                              'tight packaging-detail shot focused on logo, material, and reflective surface',
                              'close product beauty angle with soft background blur and crisp front label',
                              'macro 3/4 product detail framing with refined commercial lighting'
                          ],
                          fancy: [
                              'dynamic 3/4 advertising angle with product foreground and floating elements arranged in depth',
                              'hero product perspective with shallow depth, glossy highlights, and energetic diagonal flow',
                              'close premium campaign crop with product sharp and decorative elements softly layered',
                              'slight low-angle fantasy-ad framing that makes [product] feel large and desirable'
                          ],
                          outdoor_market: [
                              'medium-close eye-level outdoor booth advertising poster shot with [product] large on the front table and bold headline space',
                              'medium 3/4 booth angle with [product] display close to camera, seller softly behind, and campaign-poster hierarchy',
                              'close market-table foreground framing with [product] readable and dominant, lively booth background softly blurred',
                              'medium-close slight top-down outdoor display angle with [product] filling the foreground, friendly seller context, and dynamic ad composition'
                          ],
                          cgi: [
                              'epic low-angle CGI campaign poster shot with gigantic [product], explosive graphic depth, and huge headline space',
                              'cinematic wide perspective with enormous product monument, glowing CG effects, and dynamic ad layout',
                              'dramatic 3/4 wide-angle CGI composition with strong scale contrast, neon accents, particles, and bold text zones',
                              'hero low-angle blockbuster scene framing the giant product as a landmark with extreme commercial poster energy'
                          ],
                          funny: [
                              'full-body cute caricature framing with oversized head clearly visible and product held close',
                              'medium-full playful product shot with character centered and product readable',
                              'slight low-angle cute mascot-like framing, product foreground, cheerful expression',
                              'bright centered character-product composition with clean depth and readable product'
                          ],
                          miniature: [
                              'tilt-shift macro angle looking down into a tiny product world',
                              'close miniature-world perspective with giant product and tiny scene elements in depth',
                              'macro 3/4 tilt-shift framing emphasizing scale and playful tiny details',
                              'low macro miniature angle that makes [product] feel like a huge object in a tiny world'
                          ]
                      };
                      const prompts = cameraPromptMap[styleKey] || [
                          'professional 3/4 commercial framing with natural depth and clear product visibility',
                          'close product-friendly portrait framing with shallow depth and clean perspective',
                          'balanced advertising composition with strong foreground-midground-background separation',
                          'natural professional camera look with crisp product focus and believable perspective'
                      ];
                      const selected = prompts[Math.floor(Math.random() * prompts.length)];
                      return `Camera direction: ${selected}. Prefer product-first medium, medium-close, or close framing. Avoid distant wide establishing shots because [product] must stay large, readable, and commercially prominent. Use wide framing only when the style truly needs scale, and even then keep [product] visually dominant. Avoid repeating the exact same composition across generations. No camera brand text or camera logos.`;
                  };
                  const styleTextProfiles = {
                      model: 'premium',
                      influencer: 'cute_ugc',
                      ugc_basic: 'cute_ugc',
                      fashion: 'fashion_campaign',
                      clothing_campaign: 'clothing_editorial',
                      beauty: 'minimal',
                      studio: 'campaign_pop',
                      usage: 'natural_editorial',
                      real_demo: 'clean_demo',
                      real_user_review: 'natural_editorial',
                      review: 'retail_poster',
                      live: 'live_photo_no_text',
                      mirror: 'fashion_campaign',
                      texture: 'minimal',
                      unboxing: 'cute_ugc',
                      shoes: 'premium',
                      hands: 'minimal',
                      decor: 'premium',
                      showcase: 'premium',
                      studio_photo: 'luxury_packshot',
                      fancy: 'cgi_extreme',
                      cgi: 'cgi_extreme',
                      funny: 'cute_ugc',
                      miniature: 'cute_ugc',
                      sony_product: 'luxury_packshot',
                      shop_review: 'retail_poster',
                      natural_light: 'natural_editorial',
                      real_ads: 'ad_campaign',
                      sony_portrait: 'premium',
                      catalog: 'premium',
                      lifestyle_review: 'natural_editorial',
                      counter_display: 'retail_poster',
                      outdoor_market: 'live_sale',
                      premium_closeup: 'minimal'
                  };

                 const styleTemplates = {
                      // 👤 กลุ่ม 1: คน+สินค้า (Human)
                      'model': `Full-body product presenter advertisement. ${finalCharWithOutfit} appears as a confident campaign model in the selected scene, with [product] clearly presented as the visual focus. Use a polished commercial pose, clean product visibility, coordinated outfit styling, intentional negative space for Thai headline text, and a finished social-commerce ad composition. Photorealistic, sharp, attractive, not a plain standing portrait.`,
                      'influencer': `Designed creator review image for [product]. Medium portrait shot of ${finalCharWithOutfit} ${randInfluencerPose}, naturally presenting [product] to the viewer. (CRITICAL RULE: The character is NOT holding the camera. NO selfie arms. BOTH hands must be visible and interacting naturally with the product). Make it feel like a polished TikTok or YouTube thumbnail: friendly face, clear product hero, bright creator setup, playful callout space, and dynamic Thai text placement. Authentic but still designed, not random casual photography.`,
                      'ugc_basic': `Raw smartphone-style social media UGC review photo. ${finalCharWithOutfit} lively presenting [product] to the camera with an energetic "Must-Have" vibe. Cute Basic-style creator thumbnail, playful, charming, bright, relatable, friendly, and less formal than a studio advertisement. ${ugcBasicCuteVibe} The [product] MUST remain 100% perfectly unchanged: keep original logo, text, packaging, shape, and color. Natural hands, clear product visibility, photorealistic, high quality.`,
					'fashion': `Fashion wearable-product campaign poster for [product]. This style is best for wearable products other than full clothing campaigns: shoes, bags, jewelry, accessories, hats, glasses, watches, or items worn, carried, or styled on the body. The wearable product must be the visual hero, more important than the model's face. The model's face may be visible, cropped, turned away, softly blurred, or secondary; do not force a face-focused portrait. If [product] is clothing or a costume, use it as the worn hero, but for dedicated clothing ads prefer the "โฆษณาเสื้อผ้า" style. Keep the product's original color, silhouette, trim, fabric, pattern, logo area, and distinctive details faithful to the reference. If [product] is a bag, shoes, jewelry, watch, glasses, or accessory, style it clearly on the body or in the hand as the hero while the selected outfit supports it. If [product] is not wearable, style the outfit to match the product category while the product remains clearly held or placed as the hero; do not transform the product into clothing. Use product-first medium-close to medium-full fashion-ad framing, modern confident pose, clean body line, stylish selected scene, fresh lookbook composition, and strong fashion campaign typography space. Make it feel like a polished modern fashion advertisement, not a face portrait or plain standing shot.`,
                      'clothing_campaign': `Clothing fashion campaign advertisement for [product]. Specialized style for clothing, outfits, dresses, costumes, swimwear, uniforms, tops, skirts, pants, and full fashion looks only. Ignore any selected outfit setting completely; do not use outfit dropdown values or add clothing from settings. ${baseChar} must wear the exact uploaded/reference clothing product as the hero outfit. Keep the original color, silhouette, trim, fabric, pattern, lace, buttons, logo area, proportions, and distinctive details faithful to the reference. Do not add blazer, jacket, coat, cardigan, pants, outerwear, scarf, belt, bag, jewelry, or extra accessories unless they are visible in the reference clothing product. No smartphone, no mirror selfie, no phone, no camera UI. Create a full-body or knee-up fashion campaign pose with confident modern posture, clean body line, and strong outfit silhouette. Design the surrounding composition to match the clothing category and mood: for swimwear use a fresh beach-themed studio set, sand-colored platform, shells, ocean-color lighting, or resort props; for party dresses use trendy festive studio lighting, ribbons, playful sparkle, or modern event props; for knitwear use cozy soft fabric props and warm editorial light; for uniforms use clean contemporary brand set design; for casual wear use youthful lifestyle studio props that match the garment. Use modern fashion lighting with softbox key light, rim light, polished color grading, shallow depth, fabric texture clarity, and editorial background separation. Make it feel like a finished contemporary clothing brand advertisement with cute-cool dynamic Thai headline space, not an old luxury poster, not a casual selfie, and not a plain catalog photo.`,
                      'beauty': `Beauty influencer photography. Close-up shot of ${finalCharWithOutfit} applying [product] to the skin. Showing texture and glow. Soft ring light. (Action: Swatching or applying). High quality, 8k resolution.`,
                      'studio': `Ultimate promotional advertisement image for [product]. Use the selected character and outfit as the campaign presenter: ${finalCharWithOutfit}. Use the selected scene as the campaign environment, then turn that outfit and scene into a complete product-ad concept instead of a simple photo. Make [product] the main visual focus with clear packaging, strong hierarchy, and a confident presenter pose. Let the advertising composition adapt to the product category, target customer, outfit, and scene: choose suitable props, lighting, colors, graphic accents, product-themed effects, or brand-like elements that make the product more desirable. Add a huge Thai headline area, dynamic supporting text zones, badges or decorative marks when suitable, and a layout that feels designed as a finished Thai advertising poster. Keep it energetic, polished, product-appropriate, and visually rich. Avoid price tags, discount flyer layout, crowded supermarket stacks, plain studio backdrop, or simple person-holding-product composition.`,
                      'usage': `Real usage advertising scene for [product]. ${finalCharWithOutfit} is genuinely using [product] in the selected environment, but the image must still be designed like a product ad. Show the real use case clearly, keep [product] visible and important, add natural action storytelling, tasteful props, warm lighting, depth, and a clean Thai headline zone. The character may focus on the activity instead of the camera. Relatable, believable, polished, not a plain lifestyle snapshot.`,
                      'real_demo': `Real-use close-up product demonstration for [product]. Show only one natural pair of hands, [product], and the relevant body part, material, food, surface, tool area, or environment needed to demonstrate use. No visible face, no full person, no portrait, no extra hands from outside the frame. The product must be clearly visible and actively being used: applying, holding, pouring, opening, swatching, spraying, wiping, assembling, wearing detail, mixing, placing, or operating depending on the product type. Show the result or benefit of use when possible, such as texture, coverage, pour, fit, shine, cleaning result, food result, skin result, or before/after-like action detail. Use a real everyday setting such as home, bathroom, bedroom, balcony, kitchen, desk, shop counter, or workspace when suitable. Warm natural light, realistic texture, clear product detail, authentic Thai review feeling, trusted close-up demo, not a studio ad. Leave a clean readable area for Thai ad text, but do not cover the hands, product, or result.`,
                      'real_user_review': `Authentic real-user product review for [product]. ${finalCharWithOutfit} naturally uses, applies, holds, or presents [product] in a real everyday setting, with face or upper body partially visible and the product still readable. Keep the mood trustworthy, soft, natural, and relatable rather than overly cute. Use warm daylight, realistic skin texture, simple home, bathroom, bedroom, cafe, balcony, shop, or workspace environment when suitable, and a clean review-style composition with subtle Thai text space. Avoid exaggerated UGC stickers, discount flyer layout, or over-produced studio posing.`,
                      'review': `Desk review advertising thumbnail for [product]. ${finalCharWithOutfit} sits or stands near a neat review table, holding or pointing to [product] while the product packaging remains large, readable, and central. Add reviewer-style props, small benefit callout areas, bright friendly lighting, clear face, clear product, and a designed Thai review headline layout. It should feel like a polished product-review poster, not just a person holding an item.`,
                      'live': `Live-selling host advertising photo for [product]. Keep the feeling of an energetic Thai live-sale moment, but make it a clean still advertisement with no broadcast interface. Use the selected/uploaded character as the exact presenter: ${finalCharWithOutfit}. Preserve the character's reference face, age impression, body shape, skin tone, and identity; improve only the lighting, grooming, and commercial polish without changing who the character is. The outfit must follow the selected outfit instruction and match the product naturally. The presenter is centered behind a front selling table with a confident friendly expression, flattering face lighting, clean natural makeup/grooming, and healthy realistic skin texture. The foreground uses a close selling-table layout with several neatly arranged copies, colors, or variants of [product] decorating the lower foreground; the products support the composition and remain readable. The presenter may hold or present one or two products close to the camera. Use a medium-close waist-up portrait crop from the table edge, not a wide full-room shot. The selected Location must become the real background context, softly blurred behind the selling table, while the foreground keeps the live-sale product display feeling. A small neat clip microphone or compact selling microphone is allowed if it looks professional and not cluttered. Use professional portrait depth, shallow depth of field, warm flattering light, energetic best-selling atmosphere, and clear product visibility. Do not invent livestream UI or extra text: no fake LIVE label, no chat comments, no price tags, no subtitles, no broadcast interface, no phone foreground, no phone screen, no tripod, no camera rig, no messy clutter.`,
                      'mirror': `Mirror-reflection outfit try-on advertisement for [product]. Specialized style for clothing and outfit products only. Ignore any selected outfit setting completely; do not use outfit dropdown values or add any extra clothing from settings. The uploaded/reference clothing or outfit product is the only outfit the character should wear. The image must look like the viewer is seeing the character's reflection in a real mirror while the character holds a smartphone naturally in one hand. Show the person and outfit in the mirror reflection, not inside a phone screen. Do not create a giant smartphone frame, camera app UI, shutter button, phone screen border, screenshot interface, or black phone bezel around the image. ${baseChar} stands naturally in a cozy bedroom, dressing room, walk-in closet, boutique fitting room, or soft curtain background. The character must wear the exact uploaded/reference outfit as the main focus: keep its original color, silhouette, trim, fabric, pattern, logo area, and distinctive details. Do not add blazer, jacket, coat, cardigan, pants, outerwear, layered clothing, scarf, belt, or extra accessories that are not present in the reference product. The smartphone may partially cover a small part of the face or chest, but must not block the outfit. Keep the image crisp, clean, full-body or knee-up when useful, with gentle pastel warmth instead of heavy haze. Add polished Thai ad text space with a large fashion headline, but do not cover the outfit, body line, phone, or product.`,
                      'sony_product': `Realistic product-focused portrait commercial photo for [product]. Shoot in a close portrait-distance composition with a professional large-camera look, shallow depth of field, creamy natural background blur, and strong product clarity. Make [product] the main hero, held or placed close to the camera with readable packaging, true-to-life color, and believable glossy detail. ${finalCharWithOutfit} may support the product naturally in the midground, but the image should stay realistic and product-focused rather than a flashy poster. Use warm practical lighting, clean composition, natural skin texture, and subtle Thai text space only when needed. No camera brand text, no camera logos, no fake brand marks, no fantasy effects, no over-designed typography, no cluttered graphic poster layout.`,
                      'shop_review': `Clean Thai product table review for [product]. Arrange multiple copies, variants, or angles of [product] neatly across a front table, making the product display the main foreground focus with readable packaging and clear labels. ${finalCharWithOutfit} appears behind or beside the table as a friendly reviewer, naturally presenting or pointing to the product without blocking it. Use the selected scene as a clean background context, such as home, cafe, small shop, counter, or workspace. Keep the setup tidy, warm, believable, and uncluttered. No ring light, no tripod, no microphone, no livestream equipment, no messy props. Add subtle Thai review text placement, warm natural or practical lighting, and a trustworthy social-commerce composition.`,
                      'natural_light': `Natural window-light lifestyle advertisement composition. Create a warm product key visual with [product] large in the foreground or lower third, soft daylight, gentle shadows, and tasteful lifestyle props related to the product. ${finalCharWithOutfit} uses or presents the product naturally in the midground, with a candid premium lifestyle feeling. Use an elegant diagonal or S-curve visual flow, airy negative space for Thai headline text, soft bokeh, realistic home or cafe environment, professional camera color, natural texture, no CGI, no fantasy effects.`,
                      'real_ads': `Realistic Thai commercial advertising key visual. Compose it like a finished social-commerce campaign poster: [product] is the hero, large and sharp in the foreground with clear logo and packaging, while ${finalCharWithOutfit} supports the story with a confident advertising pose. Use layered depth, dynamic diagonal composition, premium but believable lighting, tasteful graphic accents or product-themed props, dedicated headline area, crisp focus, natural skin, and polished sale-image hierarchy. Make it feel like a real brand ad, not a plain person-holding-product photo and not generic AI art.`,
                      'sony_portrait': `Professional portrait-lens advertising photo. ${finalCharWithOutfit} holding [product] naturally, shot with an 85mm portrait lens look, creamy real bokeh, sharp face and product, natural Thai skin texture, premium but believable brand campaign look, no camera logos, no artificial fantasy effects.`,
                      'lifestyle_review': `Everyday lifestyle review advertisement for [product]. ${finalCharWithOutfit} casually uses or presents [product] in a believable daily-life moment, with the selected scene feeling real and relatable. Keep [product] easy to see, add warm lifestyle props, natural expression, soft professional-camera realism, and clean Thai review text placement. It should feel authentic but still composed for an ad, not an accidental candid photo.`,

                     // 🔍 กลุ่ม 2: มือ+สินค้า (Closeup) - ถอดคาแรคเตอร์ออกทั้งหมด
                      'texture': `Extreme close-up macro shot of [product]. Focusing on the texture, material, or droplets. Highlighting the quality. Background is blurred. Aesthetic, sensory, high definition texture. (Note: Focus on product only, face is NOT visible). High quality, 8k resolution.`,
                      'unboxing': `First-person point of view (POV) product-showcase review photo. Looking down from the user's own viewpoint at exactly one natural pair of hands holding and showing [product] clearly, like a neat personal review shot. Focus on the product's real shape, size, label, packaging, and details. Use a clean tabletop, lap, vanity, desk, kitchen counter, or lifestyle surface that fits the product. No shipping box, no parcel box, no cardboard delivery package, no messy unboxing clutter, no extra hands from outside the frame. (Note: POV shot, only hands visible, face is NOT visible). Photorealistic, natural indoor light, high quality.`,
                      'shoes': `Low angle street fashion photography. Close-up shot of feet wearing [product] (shoes). Focus sharply on the shoes/feet. Background blurred. (Note: Focus on feet, face is NOT visible). High quality, 8k.`,
                      'hands': `Professional action lifestyle photography. Close-up on hands holding or operating [product] (tool/equipment). Active posture, demonstrating usage. (Note: Focus on action/hands, face is NOT visible). High quality, 8k.`,
					  
                      // 🖼ï¸ กลุ่ม 3: ฉาก+สินค้า (Product) - ไม่มีคน
                      'decor': `Interior design lifestyle photography. Wide shot showcasing [product] (furniture/large home item) placed naturally and beautifully in a room. The product is the main focus of the composition. (CRITICAL RULE: NO humans, NO people, NO hands, just the product and the interior setting). High quality, 8k, photorealistic commercial grade.`,
                      'showcase': `Hero product-only advertising image for [product]. The product is the only main subject, placed large and dominant with perfect label visibility, attractive reflections, product-appropriate props, and a clean campaign background. (Rule: NO humans, NO people, NO hands, just the product). Add intentional negative space for Thai headline text and a polished commercial layout, not a plain catalog shot.`,
                      'studio_photo': `Modern premium studio product photography for [product]. Product-only high-end commercial mockup shot: place [product] centered as the main hero on a clean contemporary platform, tabletop, acrylic block, stone slab, fabric surface, or modern display riser. Decorate around it with tasteful props related to the product category, ingredients, texture, color mood, or use case, but keep every prop secondary and never covering the product. Use expensive studio lighting, soft shadows, crisp reflections, sharp packaging, readable label area, clean background depth, and a fresh modern brand-campaign feeling. Avoid old luxury styling, gold-heavy decoration, ornate props, vintage beauty-poster mood, and classic serif typography. (Rule: NO humans, NO people, NO hands, product-only).`,
                      'catalog': `Clean e-commerce catalog image for [product]. Arrange [product] neatly in a realistic small studio setup with softbox lighting, accurate packaging details, true color, professional camera sharpness, and organized product variants or angles when useful. (Rule: NO humans, NO people, NO hands). Keep it clean, trustworthy, and shop-ready with subtle Thai product label space, no fantasy effects.`,
                      'counter_display': `Retail counter advertising poster for [product]. Place [product] on a real shop counter as a neat foreground hero display with practical store lighting, shelf or cashier-counter context, and subtle merchandising props. Make the whole image feel like a finished Thai retail ad, not just a plain product photo: strong product hierarchy, clean campaign layout, bold headline area, small benefit callout zones, sticker-like accents when suitable, and believable shop atmosphere. (Rule: NO humans, NO people, NO hands). Keep packaging crisp, readable, centered, and clearly promoted.`,
                      'premium_closeup': `Modern premium close-up commercial photo of [product]. Focus on packaging, logo, material detail, and texture with shallow depth of field, professional macro lens realism, clean contemporary highlights, accurate colors, crisp product surface, and fresh ad-ready composition. Avoid old luxury styling, gold-heavy mood, ornate props, and vintage beauty-poster lighting. No humans, no hands unless required by the product.`,

                      // 🎨 กลุ่ม 4: แฟนตาซี (Fantasy)
                      'fancy': `Fantasy CG product advertising poster for [product]. Make [product] the central hero, floating or standing on a premium fantasy product stage. Surround it with product-related ingredients, particles, glowing ribbons, splash effects, light trails, crystal or glass reflections, magical arcs, and premium 3D decorative elements. The scene should feel like a high-budget Thai product campaign: dramatic, polished, colorful, visually rich, and CG-enhanced. No person is required; avoid plain person-holding-product composition. If a presenter appears, they must stay secondary and never hold or cover the product. Keep [product] dominant, readable, glossy, and desirable, with a huge headline area and dynamic ad-poster hierarchy.`,
                      'outdoor_market': `Outdoor booth campaign advertisement for [product]. ${finalCharWithOutfit} presents [product] at a modern market booth, pop-up stall, fair booth, or outdoor product stand. Make it feel like a finished Thai social-commerce ad poster, not a casual booth snapshot: clear product display table, lively selling atmosphere, product hero foreground, bold headline area, small callout zones, sticker-like accents when suitable, natural daylight, and polished campaign hierarchy. Keep [product] visible and attractive with realistic professional camera color and dynamic Thai sales-text placement when text overlay is enabled.`,
                      'cgi': `Extreme CGI blockbuster advertising poster for [product]. Create an over-the-top futuristic CG product ad where [product] becomes a gigantic heroic commercial monument or central 3D product world. Absolutely no human, no presenter, no person, no mascot, no hands. The product must dominate the entire image. Use dramatic scale, cinematic lighting, glowing energy trails, particles, glass/metal reflections, floating product-themed elements, dynamic graphic arcs, depth, impact, and spectacular campaign composition. Make it feel like the most extreme high-budget Thai advertising visual, with huge headline space and CG graphic effects designed around the product. Keep [product] readable and visually dominant, but make the overall image bold, surreal, premium, and powerful.`,
                      'funny': `Create an advertisement image in an extremely realistic caricature style of ${finalCharWithOutfit} holding [product]. CRITICAL PROPORTIONS: The character has highly exaggerated proportions—a VERY LARGE HEAD attached to a TINY, SHORT body with SMALL LIMBS. The character must look like a cute miniature person standing full-body. The face MUST remain 100% realistic photography (NO cartoons, NO 3D renders allowed) but with a soft kawaii beauty filter. Expression: ${randFunnyExp}. High quality 8k, bright commercial lighting.`,
                      'miniature': `Tilt-shift macro photography of a miniature world. Tiny people interacting around the giant [product].`
                  };

                  let baseStyle = styleTemplates[styleKey] || styleTemplates['model'];
                  manualTextPrompt = buildTextStylePrompt(styleTextProfiles[styleKey] || 'premium');
                  const styleCameraPrompt = pickStyleCameraPrompt(styleKey);
                  const productHeroPriority = `Product priority: [product] must remain the visual hero. Keep packaging, logo area, shape, color, and key product details clear and readable. The character, props, text, and background must support [product], not overpower or hide it. Product fidelity rule: [product] must stay identical to the uploaded/reference product image. Keep the exact package shape, logo area, label layout, color, cap, material, proportions, and key visual details. Do not redesign, rebrand, recolor, translate, simplify, replace, or invent new flavors, sizes, colors, or variants. If multiple products are shown, they must be exact copies of the same reference product unless the user explicitly asks for variants. Hand anatomy rule: If hands are visible, show only the natural hands belonging to the visible person. No extra hands, no duplicate hands, no floating hands, no detached hands, no third hand, and no random hand entering from the frame edge. Hands must have correct anatomy, natural wrists, and natural finger count. For product-only styles, show no hands at all unless the style explicitly requires POV or hand demonstration.`;
                  generatedPrompt = `${baseStyle} Location: ${finalBg}. ${styleCameraPrompt} ${productHeroPriority} ${manualTextPrompt} ${imgSafety} (Composition: Edge-to-edge). Negative Prompt: "${coreNegative}${manualNegativeAddon}"`;
              }
         } else {
              // ============================================
              // 🟢 [MASCOT MODE: ULTIMATE RANDOMIZER V2]
              // ระบบสุ่ม 5 จุด: 1. คำขึ้นต้น 2. สินค้ามีชีวิต 3. ท่าทาง 4. สไตล์ภาพ 5. ฉาก Smart Auto
              // ============================================
              bananaAddLog('🧸 โหมด: มาสคอต (Mascot)', 'step');

              // 1. เตรียมข้อมูลพื้นฐาน
              const activeMascotCard = document.querySelector('#mascot-grid .mascot-card.active') || document.querySelector('.mascot-card.active');
              let mascotType = activeMascotCard ? activeMascotCard.dataset.value : 'liver'; 
              
              if (mascotType === 'custom') {
                  const customInput = document.getElementById('mascot-custom-input');
                  mascotType = (customInput && customInput.value.trim() !== '') ? customInput.value.trim() : 'character';
              }

              const isMascotSmart = document.getElementById('mascot-smart-auto-checkbox')?.checked;
              const mascotCustomText = customTextValue || "";

            // 2. กำหนด Subject (รวมระบบสุ่ม Prefix, สินค้ามีชีวิต และ รูปนางแบบ)
              let subject = "";
              if (modelUploadedImages.length > 0) {
                  // 🚀 [อัปเกรด] ระบบสุ่ม 4 สไตล์ สำหรับ "นางแบบ -> อาร์ตทอยหัวโต" + บังคับตาโต Pixar
                const chibiVariations = [
                      // แบบที่ 1: อาร์ตทอยพรีเมียม (Pop Mart Style) - หน้าผู้ใหญ่แต่สัดส่วนฟิกเกอร์
                      "A premium 3D designer blind-box art toy (Pop Mart style). The character has an oversized head and a small stylish body. The facial identity is a perfect 3D translation of the young adult/teen in the reference image—keeping their mature charm but in a cute designer toy proportion. Big beautiful eyes, flawless texture. CLOTHING: Fully dressed in a stylish, premium outfit matching the '[product]'.",

                      // แบบที่ 2: จิบิ 3D สไตล์คลาสสิก (ไม่เด็กเกินไป)
                      "A high-end 3D Super-Deformed Chibi character. It features a larger head and smaller body, but strictly maintains the young adult identity from the reference photo. Do NOT make them look like a baby. Elegant 3D Pixar-style rendering with friendly, expressive eyes and a highly professional commercial look. CLOTHING: Dressed in a high-quality outfit that visually represents the '[product]'.",

                      // แบบที่ 3: ฟิกเกอร์สะสมระดับพรีเมียม
                      "A premium collectible 3D vinyl figure toy. The character has an exaggerated head-to-body ratio for cuteness, but the face clearly belongs to the stylish young adult in the reference image. Clean, smooth 3D rendering with a trendy aesthetic. CLOTHING: Wearing a customized, professional attire inspired by the '[product]'.",

                      // แบบที่ 4: อนิเมชัน 3D โมเดิร์น
                      "A charming 3D animated character with designer toy proportions (large head, small body). The face is a highly detailed, mature but stylized 3D adaptation of the reference image. NO baby face. Big beautiful eyes, friendly and welcoming vibe. CLOTHING: Fully dressed in a creative and premium costume matching the '[product]' theme."
                  ];
                  subject = chibiVariations[Math.floor(Math.random() * chibiVariations.length)];
                  bananaAddLog('✨ Mascot: สุ่มรูปแบบคำสั่งแปลงรูป Ref เป็นจิบิหัวโต', 'success');
              } else {
                  // 🚀 [สุ่มจุดที่ 1] สำหรับ "สินค้ามีชีวิต" (5 สไตล์)
                  const productMascotVariations = [
                      "A creative 3D living character where the [product] itself comes alive. Add cute tiny cartoon arms, legs, and an expressive face DIRECTLY onto the original [product].",
                      "A magical 3D Pixar-style transformation of the [product]. It becomes a living mascot with adorable tiny limbs and a lively face attached directly to its original body.",
                      "An adorable 3D animated version of the [product]. The product magically grows cute cartoonish arms, legs, and a highly expressive face right on its surface.",
                      "A cinematic 3D character design where the [product] is the mascot. Featuring tiny cute limbs and a vibrant face seamlessly blended onto the unmodified original product.",
                      "A premium 3D toy-like mascot made entirely out of the [product]. It features adorable tiny hands, feet, and an animated facial expression attached directly to the exact original product shape."
                  ];
                  const randomProductPrompt = productMascotVariations[Math.floor(Math.random() * productMascotVariations.length)];
                  const strictProductRule = " CRITICAL RULE: The original shape, label, text, and texture of the [product] MUST remain 100% exactly as the source image. Do NOT deform, morph, or redesign the product body. Just attach the face and limbs to the existing shape. (DO NOT generate any other human or animal holding it)";

                   // 🚀 [สุ่มจุดที่ 2] สำหรับ "มาสคอตทั่วไป" ป้องกันบอท (บังคับ Pixar ทุกอัน)
                  const mascotPrefixes = [
                      "an extremely cute Disney-Pixar style 3D",
                      "an adorable 3D Pixar animated",
                      "a charming, highly detailed Pixar-style 3D",
                      "a premium 3D Pixar-like",
                      "a delightful and friendly 3D Pixar"
                  ];
                  const randPrefix = mascotPrefixes[Math.floor(Math.random() * mascotPrefixes.length)];

                  // 🌟 ตัวช่วยเพิ่มความน่ารัก ตาโต ไม่น่ากลัว (เอาไปต่อท้ายมาสคอตทุกตัว)
                  const cutePixarSuffix = "with big adorable cartoon eyes, extremely friendly, and completely non-scary";

                  // ฐานข้อมูลลักษณะเด่น (พ่วงความน่ารักเข้าไปทุกอัน)
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

                  // ประกอบร่างขั้นสุดท้าย
                  if (mascotType === 'product_mascot') {
                      // ถ้าเป็นสินค้ามีชีวิต จะดึงจากตัวแปรด้านบนมาใช้
                      subject = `Create ${randomProductPrompt}${strictProductRule}`;
                  } else if (mascotType === 'custom' || mascotType === 'custom_mascot') {
                      subject = `Create ${randPrefix} character of [${mascotType}], ${cutePixarSuffix}`;
                  } else {
                      let trait = mascotTraits[mascotType] || `${mascotType} character, ${cutePixarSuffix}`;
                      subject = `Create ${randPrefix} ${trait}`;
                  }
                  bananaAddLog(`🧸 Mascot: ใช้สไตล์ 3D พรีเมียมแบบสุ่มคำสั่งหลบบอท -> ${mascotType}`, 'info');
              }
             // 3. จัดการสีหน้า อารมณ์ (อัปเดตให้เข้ากับความน่ารักสไตล์ Pixar)
              const expressionVal = document.getElementById('mascot-expression-select')?.value || 'serious';
              
              // 🌟 เปลี่ยนคำสั่งอารมณ์ให้เป็นแบบ "การ์ตูนน่ารัก" แทนการใช้คำรุนแรง
              const expressionMap = {
                  'serious': "Expression: A cute determined and focused look. Big eyes showing dedication, like a serious but adorable little helper.",
                  'strict': "Expression: Adorably strict, playfully pouting, or giving a cute warning look. Frowning slightly with furrowed brows, but still looking incredibly charming and huggable.",
                  'smiling': "Expression: Bright, joyful, and warm genuine smile. Cheerful big eyes, highly approachable, sweet, and welcoming."
              };

              let dynamicAction = "";
              if (mascotType === 'product_mascot') {
                  // 🚀 [สุ่มจุดที่ 3] สุ่มท่าทาง (Action) สำหรับสินค้ามีชีวิต
                  const productActions = [
                      "The living product is striking a confident energetic presenter pose while keeping the original package shape, label, and front face clearly visible.",
                      "The living product moves playfully but keeps its packaging readable, using cute tiny limbs to point toward its own label and key visual features.",
                      "The product mascot leans forward slightly like a commercial hero, with the original [product] body large, sharp, and unmistakable.",
                      "The living character gestures enthusiastically with tiny hands while the product body remains the main foreground hero, not distorted or hidden."
                  ];
                  dynamicAction = productActions[Math.floor(Math.random() * productActions.length)];
              } else {
                  // 🚀 [สุ่มจุดที่ 3] สุ่มท่าทาง (Action) สำหรับมาสคอตทั่วไป
                  const normalActions = [
                      "The mascot is interacting with a large foreground [product] in a dynamic presenter pose, making the product look like the main hero of the ad.",
                      "The character is holding or pointing toward [product] close to the camera, creating an eye-catching product-first advertisement.",
                      "The mascot poses beside a large readable [product], highlighting its features without blocking the package or label.",
                      "The character shows off [product] with a proud energetic stance while the product remains larger, sharper, and more visually important than the mascot."
                  ];
                  dynamicAction = normalActions[Math.floor(Math.random() * normalActions.length)];
              }

              // 🚀 [สุ่มจุดที่ 4] สุ่มสไตล์ภาพ 3D Pixar 4 แบบ
              const styleVariations = [
                  "Style: High-quality 3D Animation (Pixar level), Smooth glossy texture, Sharp details, Cinematic Dramatic Lighting, Deep shadows.",
                  "Aesthetic: Premium 3D cartoon render, Disney-Pixar style, ultra-detailed materials, vibrant global illumination, crisp focus.",
                  "Visuals: Masterpiece 3D illustration, cute stylized proportions, physically based rendering (PBR), studio rim lighting, 8k resolution.",
                  "Art Direction: High-end 3D mascot design, glossy and flawless surfaces, cinematic color grading, soft ray-traced shadows, commercial quality."
              ];
              const randomStylePrompt = styleVariations[Math.floor(Math.random() * styleVariations.length)];

              const mascotCampaignPrompt = [
                  "Campaign direction: Build a finished high-impact 3D product advertisement, not just a cute character render. [product] must be the hero, large and readable in the foreground or center foreground, with the mascot acting as a presenter beside or behind it. Use strong product hierarchy, clear packaging, premium props, dynamic depth, and a clean headline area for Thai ad text.",
                  "Campaign direction: Create a 3D promotional key visual where [product] is the main commercial focus. Place [product] close to the camera with crisp shape, label, and color, while the mascot supports it with an energetic presenter pose. Add product-themed stage elements, polished lighting, and advertising layout depth.",
                  "Campaign direction: Design a premium social-commerce mascot ad. The mascot should make [product] feel desirable, but must not overpower it. Use [product] as the foreground hero, mascot as supporting character, strong 3D commercial composition, clear text-safe area, and product-themed props or effects.",
                  "Campaign direction: Make the scene feel like a finished 3D campaign poster for [product]. Use product foreground dominance, mascot interaction, glossy highlights, layered background, dynamic camera angle, and clear packaging fidelity. Avoid a plain mascot portrait."
              ][Math.floor(Math.random() * 4)];

              const mascotCameraPrompt = [
                  "Camera direction: product foreground hero shot with mascot in the midground, shallow depth, premium 3D advertising perspective.",
                  "Camera direction: slight low-angle 3/4 product stage shot, [product] large and mascot presenting beside it.",
                  "Camera direction: close product-first composition with mascot leaning in from the side, strong depth and readable packaging.",
                  "Camera direction: centered 3D campaign poster framing, product dominant, mascot supporting, clean headline space."
              ][Math.floor(Math.random() * 4)];

              // 4. ประกอบ Prompt (ตัดคำว่า NOT smiling unless specified ออก เพื่อให้ AI ทำหน้าตาน่ารักได้อิสระขึ้น)
              const moodPrompt = expressionMap[expressionVal] + " NOT scared, NOT creepy, NOT blurry.";
			  
              let finalPromptParts = [];
              finalPromptParts.push(subject + ".");
              finalPromptParts.push(randomStylePrompt); // 🎲 วางสไตล์สุ่ม
              finalPromptParts.push(mascotCampaignPrompt);
              finalPromptParts.push(mascotCameraPrompt);
              finalPromptParts.push(moodPrompt);
              finalPromptParts.push(dynamicAction);     // 🎲 วางท่าทางสุ่ม

            if (isMascotSmart) {
                  // 🛑 [แก้บัค] ถ้าเป็นตับไตหรือสินค้า ให้ถอดเสื้อผ้า แต่ถ้าเป็น "รูปนางแบบ" ห้ามสั่งถอดเสื้อผ้าเด็ดขาด!
                  if (modelUploadedImages.length === 0) {
                      finalPromptParts.push("(Character is NOT wearing clothes, to show its shape clearly).");
                  }
                  
                  // 🚀 [สุ่มจุดที่ 5] สุ่มฉากหลัง Smart Mascot (4 แบบที่เน้นสินค้า)
                  const smartMascotBGs = [
                      "Background: A creative 3D environment perfectly matching the theme, ingredients, and vibe of the [product], rendered with dramatic cinematic lighting.",
                      "Background: A premium 3D commercial studio setup. The background colors and lighting are specifically designed to complement and highlight the [product].",
                      "Background: A high-end 3D product showcase stage, gently decorated with beautiful floating elements closely related to the [product].",
                      "Background: A stylized, eye-catching 3D environment representing the ideal real-world use case for the [product], blending perfectly with the Pixar aesthetic."
                  ];
                  const randomBG = smartMascotBGs[Math.floor(Math.random() * smartMascotBGs.length)];
                  finalPromptParts.push(randomBG);
                  bananaAddLog(`✨ Smart Mascot: สุ่มฉากหลังให้เข้ากับธีมสินค้าอัตโนมัติ`, 'info');

              } else {
                 const bgVal = document.getElementById('mascot-bg-select')?.value || 'inside_body';
                  const outfitVal = document.getElementById('mascot-outfit-select')?.value || 'none';
                  const customBg = document.getElementById('mascot-custom-bg-input')?.value.trim();
                  const customOutfit = document.getElementById('mascot-custom-outfit-input')?.value.trim();

                  // 🟢 [อัปเกรด] บังคับชุด Mascot
                  let userOutfit = "";
                  if (outfitVal === 'custom' && customOutfit !== "") {
                      userOutfit = `[CRITICAL OUTFIT RULE: MUST be wearing EXACTLY "${customOutfit}". No default clothing]`;
                  } else {
                      userOutfit = { 'none': "", 'suit': "wearing a suit", 'hero': "wearing a cape", 'doctor': "wearing a doctor coat", 'sport': "wearing sportswear", 'student': "wearing student uniform" }[outfitVal] || "";
                  }
                  if (userOutfit) finalPromptParts.push(`Outfit: ${userOutfit}.`);

                  // 🟢 [อัปเกรด] บังคับฉาก Mascot
                 let userBg = "";
                  if (bgVal === 'custom' && customBg !== "") {
                      userBg = `[CRITICAL SETTING RULE: The background MUST be strictly "${customBg}"]`;
                  } else {
                      userBg = { 'inside_body': "Cinematic view inside human body, dramatic lighting", '3d_world': "Dramatic miniature 3D city at twilight", 'pastel_studio': "Modern studio with dramatic spotlight and long shadows", 'fruit_land': "Lush fruit forest with dramatic sun rays", 'nature_blur': "Atmospheric nature park at dusk, cinematic bokeh", 'microscope': "Dramatic scientific lab, microscopic view with focused lighting" }[bgVal] || "clean background";
                  }
                  finalPromptParts.push(`Background: ${userBg}.`);
                  
              } // <--- 🟢 เพิ่มปีกกาปิด } ตรงนี้ 1 ตัว เพื่อปิดบล็อก else ของ isMascotSmart

              // 6. จัดการข้อความ (Text) และประกอบร่างขั้นสุดท้าย
              if (useTextOverlay) {
                  finalPromptParts.push(buildTextStylePrompt('mascot_cute'));
              } else {
                  finalPromptParts.push(buildTextStylePrompt('mascot_cute'));
              }

              finalPromptParts.push(getAntiBotSeed());

              generatedPrompt = finalPromptParts.join(' ');
              generatedPrompt += ` Negative Prompt: "tall character, long legs, long arms, realistic human proportions, realistic body ratio, adult body, slender body, skinny neck, suggestive pose, inappropriate clothing, revealing attire, swimsuit, underwear, messy visuals, blurry, low quality, 2D, sketch, poorly drawn face, ${coreNegative}"`;
          } // <--- ส่วนนี้ปิดบล็อก else (Mascot Mode) ได้อย่างถูกต้องสมบูรณ์แล้ว
          
          // ----------------------------------------------------
          // แทนที่ชื่อสินค้า
          // ----------------------------------------------------
          generatedPrompt = generatedPrompt.replace(/\[product\]/g, productName || 'product');
          
          await bananaSleep(500);

        // ----------------------------------------------------
          // 🟢 STEP 2: อัพโหลดรูปภาพ (เพิ่มระบบรอโหลด 100% ขั้นเทพ)
          // ----------------------------------------------------
          bananaUpdateStatus(`🤖 ${roundLabel} [2/5] จำลองการวางรูป (Paste)...`);
          
          const singleImageData = [{
              name: currentImage.name, type: currentImage.type, dataUrl: currentImage.dataUrl
          }];

          const uploadResult = await chrome.scripting.executeScript({
            target: { tabId: tab.id },
            func: (images) => {
              return new Promise(async (resolve) => {
                  try {
                      const sleep = (ms) => new Promise(r => setTimeout(r, ms));
                      
                      // 1. หาช่องแชทหลัก
                      const editor = document.querySelector('[data-slate-editor="true"]') || document.querySelector('[role="textbox"]');
                      if (!editor) return resolve({ success: false, msg: '❌ ไม่พบช่องพิมพ์ข้อความ' });

                      // หา Container ใหญ่ของแถบพิมพ์ เพื่อใช้นับรูปอย่างแม่นยำ
                      const inputContainer = editor.closest('div[class*="hvKLod"]') || editor.parentElement.parentElement;
                      
                      // นับรูปที่มีอยู่เดิมในแถบพิมพ์ (ไม่ใช่ทั้งหน้าเว็บ)
                      const getThumbCount = () => inputContainer ? inputContainer.querySelectorAll('img').length : 0;
                      const initialThumbs = getThumbCount();

                      // 2. คลิกและ Focus เพื่อเตรียมวางรูป
                      editor.scrollIntoView({ behavior: 'instant', block: 'center' });
                      editor.focus();
                      editor.click();
                      await sleep(800);

                      // 3. เตรียมไฟล์
                      const dataTransfer = new DataTransfer();
                      images.forEach((img) => {
                          const byteString = atob(img.dataUrl.split(',')[1]);
                          const ab = new ArrayBuffer(byteString.length);
                          const ia = new Uint8Array(ab);
                          for (let i = 0; i < byteString.length; i++) ia[i] = byteString.charCodeAt(i);
                          const file = new File([new Blob([ab], { type: img.type })], img.name, { type: img.type });
                          dataTransfer.items.add(file);
                      });

                      // 4. วางรูป (Paste)
                      const pasteEvent = new ClipboardEvent('paste', {
                          clipboardData: dataTransfer,
                          bubbles: true,
                          cancelable: true
                      });
                      editor.dispatchEvent(pasteEvent);
                      
                      // 🟢 เพิ่มเวลารอให้เบราว์เซอร์กลืนไฟล์ลง UI (สำคัญมากสำหรับคอมช้า)
                      await sleep(1500); 

                      // 5. รอกด Save (หน้าต่าง Crop)
                      let confirmBtn = null;
                      const confirmTexts = ['Save', 'Confirm', 'Crop and Save', 'บันทึก', 'ยืนยัน', 'เสร็จสิ้น', 'ต่อไป'];
                      
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

                      // 6. ⏳ ระบบรอโหลดรูปขั้นสูง (รอจนกว่ารูปจะโหลดครบ 100% เข้าช่อง Prompt)
                      let isUploading = false;
                      // วนลูปเช็คทุกๆ 0.5 วินาที สูงสุด 120 รอบ = รอได้นานสุด 60 วินาที!
                      for (let w = 0; w < 120; w++) { 
                          await sleep(500);
                          
                          // เช็คว่ามีรูป Thumbnail โผล่ขึ้นมาในกล่องพิมพ์หรือยัง?
                          if (getThumbCount() > initialThumbs) {
                              // ให้เวลาภาพเรนเดอร์ให้สมบูรณ์อีกนิด
                              await sleep(1500);
                              return resolve({ success: true, msg: '✅ รูปโหลด 100% เข้าช่อง Prompt สำเร็จ' });
                          }

                          // ถ้ายังไม่โผล่ ให้ลองดูว่ามีตัวเลข % วิ่งอยู่ไหม (เช็คสถานะว่าไม่ได้ค้าง)
                          const allTexts = inputContainer ? inputContainer.innerText : "";
                          if (allTexts.includes('%')) {
                              isUploading = true;
                          }
                      }

                      if (isUploading) {
                          resolve({ success: false, msg: '❌ หมดเวลารออัปโหลด (เน็ตอาจจะช้าเกินไป)' });
                      } else {
                          resolve({ success: false, msg: '❌ วางรูปแล้วแต่เว็บไม่ตอบสนอง' });
                      }

                  } catch (e) {
                      resolve({ success: false, msg: 'Error: ' + e.message });
                  }
              });
            },
            args: [singleImageData]
          });

          // 🛑 กฎเหล็ก: ถ้าอัปโหลดไม่ผ่าน หรือรูปไม่เข้า 100% ให้ "ยกเลิกรอบนี้" ทันที ห้ามไปต่อเด็ดขาด!
          if (!uploadResult[0]?.result?.success) {
              bananaAddLog(`⚠️ ${uploadResult[0]?.result?.msg} -> ข้ามไปรูปถัดไป`, 'warning');
              throw new Error("อัปโหลดรูปไม่สำเร็จ"); // โยน Error เพื่อข้าม Step 3 และ 4
          } else {
              bananaAddLog(`${uploadResult[0]?.result?.msg}`, 'success');
          }

          await bananaSleep(2000); // พักรอระบบนิ่งๆ ก่อนพิมพ์ข้อความ
		  
		  
		  
		// ----------------------------------------------------
          // 🟢 STEP 2.5: อัพโหลดรูปนางแบบ (แก้ปัญหา Pop-up เด้ง 100%)
          // ----------------------------------------------------
          if (modelUploadedImages && modelUploadedImages.length > 0) {
              bananaUpdateStatus(`🤖 ${roundLabel} [2.5/5] กำลังแนบรูปนางแบบ...`);
              
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
                              if (!editor) return resolve({ success: false, msg: '❌ ไม่พบช่องพิมพ์ข้อความ' });

                              const inputContainer = editor.closest('div[class*="hvKLod"]') || editor.parentElement.parentElement;
                              const getThumbCount = () => inputContainer ? inputContainer.querySelectorAll('img').length : 0;
                              const initialThumbs = getThumbCount();

                              // 🚀 ใช้วิธี Paste รูปนางแบบลงไปในช่องแชทตรงๆ (ข้ามการกดปุ่มใดๆ เพื่อป้องกัน Popup Window เด้ง)
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
                              
                              // 🟢 รอรูปลงช่องแชท (4 วินาที)
                              await sleep(4000);

                              // รอกดปุ่ม Save (หน้าต่าง Crop)
                              let confirmBtn = null;
                              const confirmTexts = ['Save', 'Confirm', 'Crop and Save', 'บันทึก', 'ยืนยัน', 'เสร็จสิ้น', 'ต่อไป'];
                              
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

                              // ระบบรอโหลดรูปขั้นสูง
                              let isUploading = false;
                              for (let w = 0; w < 120; w++) { 
                                  await sleep(500);
                                  if (getThumbCount() > initialThumbs) {
                                      await sleep(1500);
                                      return resolve({ success: true, msg: '✅ โหลดรูปนางแบบ 100% สำเร็จ' });
                                  }
                              }
                              resolve({ success: false, msg: '❌ หมดเวลารออัปโหลดรูปนางแบบ' });

                          } catch (e) {
                              resolve({ success: false, msg: 'Error: ' + e.message });
                          }
                      });
                  },
                  args: [modelData]
              });

              if (!uploadModelResult[0]?.result?.success) {
                  bananaAddLog(`⚠️ ${uploadModelResult[0]?.result?.msg} -> (ข้ามไปสร้างรูปเลยโดยไม่มีนางแบบ)`, 'warning');
              } else {
                  bananaAddLog(`${uploadModelResult[0]?.result?.msg}`, 'success');
              }

              await bananaSleep(2000); // พักรอระบบนิ่งๆ
          }
		  
		  
		  

      // ----------------------------------------------------
          // 🟢 STEP 3: กรอก Prompt (เจาะเกราะ Slate.js ทะลวง Placeholder)
          // ----------------------------------------------------
          bananaUpdateStatus(`🤖 ${roundLabel} [3/5] กำลังป้อนข้อความ Prompt...`);

          await chrome.scripting.executeScript({
            target: { tabId: tab.id },
            func: async (text) => {
                const sleep = (ms) => new Promise(r => setTimeout(r, ms));
                const editor = document.querySelector('[data-slate-editor="true"]') || document.querySelector('[role="textbox"]');

                if (editor) {
                    // 1. ล้างโฟกัสเก่าและคลิกใหม่ เพื่อเซ็ตเคอร์เซอร์ให้ถูกจุด
                    editor.blur();
                    await sleep(100);
                    editor.focus();
                    editor.click();
                    await sleep(300);

                    // 2. เคลียร์ช่องแชททิ้ง (ลบ Placeholder ที่ค้างอยู่)
                    editor.dispatchEvent(new KeyboardEvent('keydown', { key: 'a', ctrlKey: true, bubbles: true }));
                    document.execCommand('selectAll', false, null);
                    await sleep(100);
                    editor.dispatchEvent(new KeyboardEvent('keydown', { key: 'Backspace', keyCode: 8, bubbles: true }));
                    document.execCommand('delete', false, null);
                    await sleep(300);

                    // 3. ⚡ ยิง Event 'beforeinput' (หัวใจหลักที่ Slate.js ใช้ดักจับการพิมพ์)
                    editor.dispatchEvent(new InputEvent('beforeinput', { 
                        inputType: 'insertText', 
                        data: text, 
                        bubbles: true, 
                        cancelable: true 
                    }));

                   // 4. ⚡ จำลองการ Paste โดยยัดโครงสร้าง HTML หลอกเว็บไปด้วย
                    const dt = new DataTransfer();
                    dt.setData('text/plain', text);
                    dt.setData('text/html', `<p>${text}</p>`); // หลอกระบบว่ากำลังวางข้อความที่มีโครงสร้างสมบูรณ์
                    
                    const pasteEvent = new ClipboardEvent('paste', {
                        clipboardData: dt,
                        bubbles: true,
                        cancelable: true,
                        composed: true
                    });
                    editor.dispatchEvent(pasteEvent);
                    
                    // 🟢 เปลี่ยนเวลารอกลืนข้อความยาวๆ เป็น 4 วินาที
                    await sleep(4000);

                    // 5. เช็คว่าข้อความเข้าหรือยัง ถ้ายังให้พิมพ์ยัดตรงๆ
                    if (!editor.textContent.includes(text.substring(0, 10))) {
                        document.execCommand('insertText', false, text);
                    }

                    // 6. กระตุ้น Event 'input' ยืนยันว่าพิมพ์เสร็จแล้ว
                    editor.dispatchEvent(new InputEvent('input', { 
                        inputType: 'insertText', 
                        data: text, 
                        bubbles: true, 
                        composed: true 
                    }));

                    // 7. 🔥 ท่าไม้ตาย: เคาะ Spacebar ปิดท้าย 1 ที เพื่อบังคับให้ปุ่มส่งคำสั่งสว่างขึ้น
                    editor.dispatchEvent(new KeyboardEvent('keydown', { key: ' ', code: 'Space', keyCode: 32, bubbles: true }));
                    document.execCommand('insertText', false, ' ');
                    editor.dispatchEvent(new InputEvent('input', { inputType: 'insertText', data: ' ', bubbles: true }));
                    editor.dispatchEvent(new KeyboardEvent('keyup', { key: ' ', code: 'Space', keyCode: 32, bubbles: true }));

                    // สลับคลิกออกแล้วคลิกเข้า เพื่อให้เว็บ Save ค่าสุดท้าย
                    editor.blur();
                    await sleep(150);
                    editor.focus();
                }
            },
            args: [generatedPrompt]
          });

          await bananaSleep(4000); // พักรอก่อนให้บอทกดปุ่มสร้าง
		  
         // ============================================
          // 🟢 STEP 4: กดปุ่มสร้าง (ลูกศรขวา) [MAIN World + Smart Wait ทะลวงเกราะ]
          // ============================================
          bananaUpdateStatus(`🤖 ${roundLabel} [4/5] รอเว็บประมวลผลรูปภาพสักครู่...`);

          // 🔥 เพิ่มดีเลย์ตรงนี้ 5 วินาที เพื่อให้เว็บ React อัปโหลดรูปให้เสร็จสมบูรณ์ 
          // ป้องกันอาการส่งคำสั่งไวไปจนรูปค้างที่ช่องพิมพ์
          await bananaSleep(5000);

          bananaUpdateStatus(`🤖 ${roundLabel} [4/5] กำลังส่งคำสั่งสร้าง...`);

          const createResult = await chrome.scripting.executeScript({
            target: { tabId: tab.id },
            world: 'MAIN', // 🔥 หัวใจสำคัญ: รันในโลกของหน้าเว็บโดยตรง
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

                              if (text.includes('nano') || text.includes('pro') || text.includes('อัปเกรด')) continue;
                              if (html.includes('add_circle') || html.includes('add ')) continue;

                              if (html.includes('arrow_forward') || html.includes('send') || text === 'สร้าง' || text === 'create') {
                                  targetBtn = btn;
                                  break;
                              }
                          }

                          if (targetBtn) {
                              targetBtn.scrollIntoView({ behavior: 'instant', block: 'center' });
                              await sleep(500);

                              let success = false;
                              try {
                                  // ท่าไม้ตายที่ 1: แฮ็ก React Props โดยตรง
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

                              // ท่าไม้ตายที่ 2: จำลองการกด Enter ที่ช่องแชท
                              const editor = document.querySelector('[data-slate-editor="true"]') || document.querySelector('[role="textbox"]');
                              if (editor) {
                                  editor.focus();
                                  editor.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', code: 'Enter', keyCode: 13, which: 13, bubbles: true, cancelable: true }));
                                  editor.dispatchEvent(new KeyboardEvent('keypress', { key: 'Enter', code: 'Enter', keyCode: 13, which: 13, bubbles: true, cancelable: true }));
                                  editor.dispatchEvent(new KeyboardEvent('keyup', { key: 'Enter', code: 'Enter', keyCode: 13, which: 13, bubbles: true, cancelable: true }));
                              }

                              // Backup ถ้าพลาดให้กดคลิกปกติ
                              if (!success) targetBtn.click();

                              return resolve({ success: true, message: 'กดปุ่มส่งคำสั่งสำเร็จ!' });
                          }
                          
                          await sleep(1000);
                      }
                      
                      resolve({ success: false, message: 'หาปุ่มส่งคำสั่งไม่เจอ หรือระบบไม่ตอบสนอง' });
                  }
                  
                  trySubmit();
              });
            },
            args: [30000]
          });

          if (!createResult[0]?.result?.success) {
              bananaAddLog(`⚠️ กดปุ่มสร้างไม่สำเร็จ: ${createResult[0]?.result?.message}`, 'warning');
              throw new Error(`[Step 4/5] ส่งคำสั่งล้มเหลว: ${createResult[0]?.result?.message}`);
          } else {
              bananaAddLog(`🖱ï¸ ${roundLabel} ส่งคำสั่งสร้างภาพสำเร็จ!`, 'success');
          }
		  
		  
       // ----------------------------------------------------
          // 🟢 STEP 6: รอผลลัพธ์ & ดาวน์โหลดอัตโนมัติ (1K)
          // ----------------------------------------------------
          
          const autoDlBox1 = document.getElementById('banana-auto-download-checkbox');
          const autoDlBox2 = document.getElementById('banana-download-checkbox');
          const autoDlBox3 = document.getElementById('video-download-count-auto'); 
          const isDownloadEnabled = (autoDlBox1 && autoDlBox1.checked) || (autoDlBox2 && autoDlBox2.checked) || (autoDlBox3 && autoDlBox3.checked) || false;

          if (!isDownloadEnabled) {
              // 🚀 Turbo Mode: ทิ้งทวนคำสั่ง! รอภาพเสร็จ 70-90% แล้วไปทำรอบใหม่เลย
              const turboWait = Math.floor(Math.random() * 5000) + 10000; // สุ่มรอ 10-15 วินาที
              bananaUpdateStatus(`🚀 Turbo Mode: ส่งคำสั่งแล้ว พักรอ ${Math.floor(turboWait/1000)} วิ...`);
              await bananaSleep(turboWait);
              bananaAddLog(`⏭️ Turbo Mode: ข้ามไปเริ่มภาพถัดไปเพื่อความรวดเร็ว`, 'info');
          } else {
              // ⏳ โหมดปกติ (มีดาวน์โหลด): รอจนกว่าภาพจะเสร็จ 100%
              bananaUpdateStatus(`⏳ ${roundLabel} [5/5] รอ AI สร้างภาพ...`);
              
              // 📸 1. ถ่าย Snapshot รหัสรูปเก่าไว้เทียบ (ดักจับเฉพาะรูปที่สมบูรณ์แล้ว)
              const getOldImgs = await chrome.scripting.executeScript({
                  target: { tabId: tab.id },
                  func: () => Array.from(document.querySelectorAll('img')).map(img => img.src)
              });
              const oldImgSrcs = getOldImgs[0]?.result || [];

              // 2. ⏳ ระบบรออัจฉริยะ + ตรวจจับความนิ่ง 16 วินาที (แม่นยำสูง)
              let isFinished = false;
              let idleCount = 0; 
              
              for (let w = 0; w < 45; w++) { // รอสูงสุด 90 วินาที
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
                          const hasGeneratingBtn = Array.from(document.querySelectorAll('button')).some(b => (b.textContent||'').includes('กำลังสร้าง'));
                          
                          const isWorking = progressEl !== undefined || hasProgressBar || hasGeneratingBtn;
                          
                          return { hasNew: hasNewImg, working: isWorking };
                      },
                      args: [oldImgSrcs]
                  });
                  
                  const state = checkState[0]?.result;

                  if (state?.hasNew && !state?.working) {
                      bananaUpdateStatus(`✅ เจอภาพใหม่แล้ว! รอระบบประมวลผลให้สมบูรณ์อีก 6 วินาที...`);
                      await bananaSleep(6000); // กันเหนียว 6 วิ
                      isFinished = true;
                      break;
                  }

                  if (!state?.working && !state?.hasNew) {
                      idleCount++;
                      if (idleCount >= 8) { // นิ่งติดกัน 8 รอบ (16 วินาที)
                          bananaUpdateStatus(`⚠️ ระบบนิ่งนานเกิน 16 วินาที ตัดจบการรอ!`);
                          bananaAddLog(`⚠️ คาดว่า AI เรนเดอร์ล้มเหลว ข้ามไปรอบถัดไป`, 'warning');
                          isFinished = false;
                          break;
                      }
                  } else {
                      idleCount = 0; 
                  }
              }

              if (!isFinished) {
                  bananaAddLog(`⚠️ ข้ามการดาวน์โหลด เนื่องจากภาพสร้างไม่สำเร็จ`, 'warning');
              } else {
                  bananaUpdateStatus(`📥 ${roundLabel} กำลังดูดไฟล์ภาพจากหลังบ้าน...`);
                  
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
                                     // ตรวจจับรูปที่ AI สร้าง โดยเช็คทั้งภาษาไทยและอังกฤษ หรือเช็คว่าไม่ใช่รูปที่เราอัปโหลด
                                      const altText = (img.getAttribute('alt') || '').toLowerCase();
                                      const isGenerated = altText.includes('สร้างขึ้น') || altText.includes('generated') || altText.includes('created') || altText !== '';
                                      const isNew = !oldSrcs.includes(img.src);
                                      const isLarge = rect.width > 150;
                                      const notInChat = !img.closest('header, nav, [role="textbox"]');
                                      
                                      let isUploaded = false;
                                      let card = img;
                                      for(let i = 0; i < 8; i++) {
                                          if(!card || card === document.body) break;
                                          if((card.innerText || '').includes('อัปโหลด') || (card.innerText || '').includes('uploaded')) isUploaded = true;
                                          card = card.parentElement;
                                      }
                                      
                                      return isGenerated && isNew && isLarge && notInChat && !isUploaded;
                                  });
                                  
                                  if (newImgs.length === 0) return resolve({ success: false, msg: 'หารูปใหม่บนหน้าจอไม่เจอ' });

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
                                          console.log("ดูดภาพล้มเหลว:", fetchErr);
                                      }
                                  }

                                  if (downloadedCount > 0) {
                                      resolve({ success: true, msg: `ดูดไฟล์ 1K สำเร็จ ${downloadedCount}/${newImgs.length} รูป!` });
                                  } else {
                                      resolve({ success: false, msg: 'พยายามดูดไฟล์แล้วแต่ล้มเหลว' });
                                  }

                              } catch (err) {
                                  resolve({ success: false, msg: 'Error: ' + err.message });
                              }
                          });
                      },
                      args: [oldImgSrcs] 
                  });

                  if (downloadResult[0]?.result?.success) {
                      bananaAddLog(`📥 ${downloadResult[0].result.msg}`, 'success');
                  } else {
                      bananaAddLog(`⚠️ โหลดอัตโนมัติไม่สำเร็จ: ${downloadResult[0]?.result?.msg}`, 'warning');
                  }
              }
          }

          completedRounds++;
          bananaAddLog(`🏁 จบรอบที่ ${currentRound}`, 'info');
          
          // 🟢 [โค้ดที่เพิ่มใหม่] COOLDOWN: พักหายใจก่อนเริ่มรอบต่อไป 
          // ป้องกัน Google บล็อก API (สุ่มพัก 5-8 วินาทีให้เนียนเป็นคน)
          if (currentRound < totalRounds) {
              const cooldownTime = Math.floor(Math.random() * 3000) + 5000; 
              bananaUpdateStatus(`⏳ พักระบบ ${cooldownTime/1000} วินาทีก่อนเริ่มรอบถัดไป (กันโดนบล็อก)...`);
              await bananaSleep(cooldownTime);
          }

        } // จบลูป Round
      } // จบลูป Image

      if (!isContinuous) {
          bananaUpdateStatus(`🎉 เสร็จสิ้น!`);
          showToast('Mission Complete!', 'success');
      } else {
          bananaUpdateStatus(`✅ สร้างภาพเสร็จสิ้น กำลังส่งไม้ต่อให้ Video...`);
      }

  } catch (error) {
      if (error.message === 'STOPPED') {
          bananaUpdateStatus('🛑 หยุดการทำงานแล้ว');
      } else {
          bananaUpdateStatus(`❌ Error: ${error.message}`);
          bananaAddLog(`❌ Error: ${error.message}`, 'error');
      }
  } finally {
      if (!isContinuous) {
          // ปลดล็อคและคืนค่าปุ่มเมื่อทำงานเสร็จ
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
} // <--- ปิดฟังก์ชัน bananaHandleAutomation ตรงนี้!


// ============================================
// 🔒 SYSTEM LOCKER (ระบบล็อคหน้าจอเว็บ - ป้องกัน Error)
// ============================================
async function toggleWebPageLock(shouldLock) {
    try {
        const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
        
        // 🛑 ป้องกัน Error: ห้ามรันสคริปต์ในหน้าตั้งค่า Chrome หรือหน้าเปล่า
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
                                <div style="font-size: 40px; margin-bottom: 15px;">🔒</div>
                                <h2 style="margin: 0 0 10px 0; color: #fff; font-size: 20px;">SYSTEM WORKING</h2>
                                <p style="margin: 0; color: #aaa; font-size: 14px;">กรุณาอย่าคลิกใดๆ บนหน้าจอขณะนี้</p>
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
// 🔍 URL CHECKER (ระบบเช็คเว็บที่ถูกต้อง)
// ============================================
async function checkCorrectWebsite() {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    
    // ดึง URL มาเช็ค ถ้าไม่มี (เช่นอยู่หน้า New Tab) ให้เป็น string ว่าง
    const currentUrl = (tab && tab.url) ? tab.url.toLowerCase() : "";

    // ตรวจสอบว่าอยู่บนหน้า Google Labs Flow ที่โปรแกรมรองรับ
    const isFlowPage = currentUrl.startsWith('https://labs.google/fx/tools/flow')
        || currentUrl.startsWith('https://labs.google/fx/th/tools/flow')
        || /^https:\/\/labs\.google\/fx\/tools\/flow\/project\/[a-z0-9-]+/.test(currentUrl);

    // ✅ ถ้าผ่านเงื่อนไข (อยู่หน้าเว็บถูกต้อง) ให้รันต่อ
    if (isFlowPage) {
        return true; 
    }

    // ❌ ถ้าไม่ผ่านเงื่อนไข (อยู่หน้าเว็บอื่น หรือแท็บว่าง) ให้แจ้งเตือนทันที
    showToast('⚠️ ผิดหน้า! กรุณาเปิดโปรเจกต์ Google Labs Flow ก่อนเริ่มทำงาน', 'error');
    
    // สั่นปุ่มแจ้งเตือนให้ผู้ใช้รู้ (หาเฉพาะปุ่มที่เป็น Primary)
    const btns = document.querySelectorAll('.btn-primary');
    btns.forEach(btn => {
        btn.classList.add('shake');
        setTimeout(() => btn.classList.remove('shake'), 500);
    });
    
    return false; // ⛔ แจ้งเตือนเสร็จแล้วค่อยสั่งหยุดรัน
}
// -------------------------------------------------------
// 🟢 [เพิ่มใหม่] ดักจับค่าเมื่อพิมพ์ตัวเลขในช่อง Custom (+)
// -------------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
    // 1. จัดการช่อง Custom ของ Video (Video Custom Input)
    const videoCustomInput = document.getElementById('video-custom-round-input');
    if (videoCustomInput) {
        videoCustomInput.addEventListener('input', function() {
            // เมื่อพิมพ์เลข -> ไม่ต้องเปลี่ยนค่า Dropdown หลัก (ให้มันค้างคำว่า 'custom' ไว้)
            // แต่ให้สั่งคำนวณรอบใหม่ทันที
            if (typeof videoUpdateRoundInfo === 'function') videoUpdateRoundInfo();
        });
    }

    // 2. จัดการช่อง Custom ของ Banana (Banana Custom Input)
    const bananaCustomInput = document.getElementById('banana-custom-round-input');
    if (bananaCustomInput) {
        bananaCustomInput.addEventListener('input', function() {
            // ทำเหมือนกันกับ Video: สั่งคำนวณรอบใหม่ทันทีที่พิมพ์
            if (typeof bananaUpdateRoundInfo === 'function') bananaUpdateRoundInfo();
        });
    }
});

// ============================================
// 🟢 AUTO DEFAULT SETTINGS (ตั้งค่าเริ่มต้น: เปิดแท็บแรกของ Basic)
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    // เพิ่มเวลาหน่วงเป็น 500ms เพื่อให้แน่ใจว่า HTML วาดเสร็จแล้ว
    setTimeout(() => {
        console.log("🔄 Setting Defaults (Basic First Tabs)...");

        // 1. ตั้งค่า Checkbox พื้นฐาน
        const checkToTrue = [
            'video-random-voice-checkbox'
        ];

        checkToTrue.forEach(id => {
            const box = document.getElementById(id);
            if (box) box.checked = true; 
        });

        // 🛑 ปิดสุ่มสไตล์ภาพนิ่ง (เพื่อให้หน้าแฟนตาซีสว่างและให้คนกดเลือกเองได้)
        const imgRandomStyleBox = document.getElementById('banana-random-style-switch');
        if (imgRandomStyleBox) {
            imgRandomStyleBox.checked = false; // ปิดสุ่มสไตล์ (สีเทา)
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

        // 🛑 ปิดสุ่ม Video Style 
        const vRandomStyleBox = document.getElementById('video-random-style-switch');
        if (vRandomStyleBox) {
            vRandomStyleBox.checked = false; 
            vRandomStyleBox.dispatchEvent(new Event('change', { bubbles: true })); 
        }

        // 💾 ปิดระบบบันทึกคลิป (ดาวน์โหลด) เป็นค่าเริ่มต้น (Turbo Mode)
        const vDownloadCheckbox = document.getElementById('video-download-count-auto');
        if (vDownloadCheckbox) {
            vDownloadCheckbox.checked = false; 
        }

        // 2. ฟังก์ชันจำลองการคลิก (Force Click)
        function forceClick(selector) {
            const el = document.querySelector(selector);
            if(el) el.click(); 
        }

        // --- 🎨 ตั้งค่าเริ่มต้นของฝั่ง Banana (Images) ---
        forceClick('.mascot-card[data-value="liver"]');
        forceClick('.char-tab-btn[data-target="upload"]');
        forceClick('.config-tab-btn[data-type="style"][data-group="recommended"]');
        forceClick('.config-option[data-type="style"][data-value="ugc_basic"]');
        forceClick('.config-tab-btn[data-type="bg"][data-group="popular"]');
        forceClick('.config-option[data-type="bg"][data-value="ai_match"]');
        setDefaultBgToAiMatch();
        forceClick('.config-tab-btn[data-type="outfit"][data-group="recommended"]');
        forceClick('.config-option[data-type="outfit"][data-value="ai_match"]');

      // --- 🚀 ตั้งค่าเริ่มต้นของฝั่ง VIDEO ---
        // 2.1 เลือกสไตล์วิดีโอเป็น "🤳 รีวิวบ้านๆ (UGC Review)"
        forceClick('.config-option[data-type="vstyle"][data-value="talk_ugc"]');

        // 2.2 เลือกสำเนียงเสียงเป็น "🔊 กลาง" (Central)
        forceClick('.voice-btn[data-type="dialect"][data-value="central"]');

        // เรียกเช็คสถานะ UI เสียงหลังตั้งค่า
        if (typeof checkVideoVoiceState === 'function') checkVideoVoiceState();

    }, 500); 
});

// ============================================

// ============================================


// ============================================
// 🟢 UI LOGIC: เช็คสถานะกล่องเสียง + กล่องเพศ
// ============================================
function checkVideoVoiceState() {
    const styleInput = document.getElementById('video-style-select');
    const randomSwitch = document.getElementById('video-random-style-switch');
    const voiceContainer = document.getElementById('video-voice-container');
    const genderWrapper = document.getElementById('video-voice-gender-wrapper');

    if (!styleInput || !voiceContainer) return;

    const selectedStyle = styleInput.value;
    const isRandom = randomSwitch ? randomSwitch.checked : false;

    // รายชื่อโหมด
  const noVoiceModes = ['broll_hero', 'broll_pan', 'broll_zoom', 'broll_cinematic', 'broll_motion_detail', 'miniature_vdo']; 
  const voiceoverModes = ['voice_promo', 'voice_soft', 'voice_docu', 'cartoon', 'voice_rant', 'voice_miniature', 'voice_news', 'voice_movie'];

    // 1. จัดการความมืด/สว่างของกล่องเสียงรวม
    if (!isRandom && noVoiceModes.includes(selectedStyle)) {
        voiceContainer.classList.add('disabled-section');
    } else {
        voiceContainer.classList.remove('disabled-section');
    }

    // 2. จัดการการโชว์/ซ่อน "กล่องเลือกเพศและอายุ"
    if (genderWrapper) {
        if (!isRandom && voiceoverModes.includes(selectedStyle)) {
            genderWrapper.style.display = 'block';
            genderWrapper.classList.add('fade-in'); 
        } else {
            genderWrapper.style.display = 'none';
        }
    }
}



// ควบคุมการเปิด/ปิดช่องกรอกข้อความตาม Checkbox
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
        
        // รันครั้งแรกเพื่อตั้งค่าเริ่มต้น
        textWrapper.style.display = textToggle.checked ? 'block' : 'none';
    }
});
