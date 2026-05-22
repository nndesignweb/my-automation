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
        showToast('ระบบมาสคอตใช้ได้เฉพาะ Premium', 'warning');
        mode = 'human';
    }

    const modeInput = document.getElementById('current-app-mode');
    if(modeInput) modeInput.value = mode;

    const humanZone = document.getElementById('workspace-human');
    const mascotZone = document.getElementById('workspace-mascot');
    const btnHuman = document.getElementById('btn-mode-human');
    const btnMascot = document.getElementById('btn-mode-mascot');

    if (mode === 'human') {
        if(humanZone) humanZone.style.display = 'block';
        if(mascotZone) mascotZone.style.display = 'none';
        
        // 🌸 ใช้ Class แทนการฝังสี
        if(btnHuman) btnHuman.classList.add('active');
        if(btnMascot) btnMascot.classList.remove('active');
    } else {
        if(humanZone) humanZone.style.display = 'none';
        if(mascotZone) mascotZone.style.display = 'block';
        
        // 🌸 ใช้ Class แทนการฝังสี
        if(btnHuman) btnHuman.classList.remove('active');
        if(btnMascot) btnMascot.classList.add('active');
    }

    if (typeof modelUpdateUI === 'function') {
        modelUpdateUI(); 
    }
}

window.switchAppMode = switchAppMode;

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
                    showToast('ตัวเลือกนี้ใช้ได้เฉพาะ Premium', 'warning');
                    return;
                }
                console.log(`🖱️ Clicked: ${btnClass} -> Value: ${newBtn.dataset.value}`);

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
        showToast('ตัวละครระบุเองใช้ได้เฉพาะ Premium', 'warning');
        tabName = 'general';
    }

    const tabs = document.querySelectorAll('.char-tab-btn');
    const groups = document.querySelectorAll('.char-group');
    
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

    // 🟢 3. จัดการช่อง "ระบุเอง" (แก้บั๊ก: เช็ค 'auto' ให้ตรงกับ HTML)
    const customInput = document.getElementById('banana-custom-character-input');
    if (customInput) {
        // หาตัวครอบ (Wrapper) เพื่อซ่อนทั้ง Label และ Input พร้อมกัน
        const wrapper = customInput.closest('.input-group'); 
        
        // ✅ แก้ไขเงื่อนไข: ถ้าเป็น 'auto' (ปุ่มระบุเอง) หรือ 'custom' ให้แสดงช่องกรอก
        if (tabName === 'auto' || tabName === 'custom') {
            if (wrapper) wrapper.style.display = 'block';
            else customInput.style.display = 'block';
            
            // โฟกัสไปที่ช่องพิมพ์ทันที
            setTimeout(() => customInput.focus(), 100);
        } else {
            // ❌ ถ้าเลือกแท็บอื่น (หญิง/ชาย/อาชีพ) -> ให้ซ่อน
            if (wrapper) wrapper.style.display = 'none';
            else customInput.style.display = 'none';
        }
    }
}



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
    document.querySelectorAll('.char-card').forEach(card => card.classList.remove('active'));
    element.classList.add('active');

    // ========================================================
    // 🟢 [อัปเดต] Logic ล็อคช่องเลือกชุด (Job + Senior)
    // ========================================================
    
    // 1. เช็คว่าเป็นหมวด "อาชีพ" หรือไม่?
    const isJobGroup = element.closest('#char-group-job') !== null;
    
    // 2. เช็คว่าเป็นหมวด "สูงวัย" (มนุษย์ป้า/ลุง/ยาย/ตา) หรือไม่?  <-- เพิ่มตรงนี้
    const isSeniorGroup = element.closest('#char-group-senior') !== null;
    
    // หา Wrapper ของส่วนเลือกชุด
    const outfitContent = document.getElementById('config-content-outfit');
    const outfitWrapper = outfitContent ? outfitContent.closest('.input-group') : null;

    if (outfitWrapper) {
        // 🔒 ถ้าเป็น "อาชีพ" หรือ "สูงวัย" -> ให้ล็อคช่องชุดทันที!
        if (isJobGroup || isSeniorGroup) {
            outfitWrapper.classList.add('disabled-section');
            
            // รีเซ็ตปุ่มชุดให้กลับไปเป็น "สุ่ม" (Auto) เพื่อความเรียบร้อย
            const outfitAutoBtn = document.querySelector('#config-content-outfit .config-option[data-value="auto"]');
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
     // 🟢 อัปเดต: ย้ายโหมดมือและเท้า มารวมในกลุ่มที่ต้องล็อกทั้งคนและชุด
        const noHumanStyles = ['showcase', 'decor', 'texture', 'unboxing', 'hands', 'shoes']; 
        const noOutfitStyles = ['fashion']; // เหลือแค่แฟชั่นที่ล็อกเฉพาะชุด (แต่ยังให้เลือกหน้าคนได้)
        const fixedBgStyles = ['mirror']; // 🟢 บังคับฉากในร่ม (หน้ากระจก) -> ล็อคฉาก

        if (value === 'miniature') {
            // 🏙️ สไตล์เมืองจิ๋ว: ตั้งค่าเริ่มต้นให้ แต่ยังให้เลือกฉากและชุดเองได้
            if (bgWrapper) bgWrapper.classList.remove('disabled-section');
            if (outfitWrapper) outfitWrapper.classList.remove('disabled-section');
            if (charWrapper && typeof modelUploadedImages !== 'undefined' && modelUploadedImages.length > 0) {
                charWrapper.classList.add('disabled-section');
            } else if (charWrapper) {
                charWrapper.classList.remove('disabled-section');
            }

            if (bgRandomSwitch) { bgRandomSwitch.checked = false; bgRandomSwitch.disabled = false; }
            if (outfitRandomSwitch) { outfitRandomSwitch.checked = false; outfitRandomSwitch.disabled = false; }

            const bgAutoBtn = document.querySelector('#config-content-bg .config-option[data-value="auto"]');
            const outfitAutoBtn = document.querySelector('#config-content-outfit .config-option[data-value="auto"]');
            const characterInput = document.getElementById('banana-character-select');
            
            if (bgAutoBtn) bgAutoBtn.click();
            if (outfitAutoBtn) outfitAutoBtn.click();
            if (characterInput) characterInput.value = 'office_lady';
            if (typeof switchCharTab === 'function') switchCharTab('general');
            
            const charCustomInput = document.getElementById('banana-custom-character-input');
            if (charCustomInput) charCustomInput.value = '';

        } else if (noHumanStyles.includes(value)) {
            // 🖼️ สไตล์ไร้คน: ล็อค คาแรคเตอร์ + ชุด (แต่ยังให้เลือกฉากได้อิสระ)
            if (bgWrapper) bgWrapper.classList.remove('disabled-section');
            if (bgRandomSwitch) bgRandomSwitch.disabled = false;

            if (outfitWrapper) outfitWrapper.classList.add('disabled-section');
            if (charWrapper && typeof modelUploadedImages !== 'undefined' && modelUploadedImages.length > 0) {
                charWrapper.classList.add('disabled-section');
            } else if (charWrapper) {
                charWrapper.classList.remove('disabled-section');
            }

            if (outfitRandomSwitch) { outfitRandomSwitch.checked = false; outfitRandomSwitch.disabled = true; }

            const outfitAutoBtn = document.querySelector('#config-content-outfit .config-option[data-value="auto"]');
            const characterInput = document.getElementById('banana-character-select');
            
            if (outfitAutoBtn) outfitAutoBtn.click();
            if (characterInput) characterInput.value = 'office_lady';
            if (typeof switchCharTab === 'function') switchCharTab('general');
            
            const charCustomInput = document.getElementById('banana-custom-character-input');
            if (charCustomInput) charCustomInput.value = '';

        } else {
            // 🔓 สไตล์อื่นๆ: ปลดล็อคคาแรคเตอร์เสมอ
            if (charWrapper) charWrapper.classList.remove('disabled-section');
            
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
                    const outfitAutoBtn = document.querySelector('#config-content-outfit .config-option[data-value="auto"]');
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
       groups = [ 'human', 'closeup', 'fantasy', 'product'];
    } else if (type === 'bg') {
       // 🟢 ยุบรวมธรรมชาติและไวรัลเป็น outdoor
       groups = ['indoor', 'urban', 'outdoor', 'custom']; 
    } else if (type === 'outfit') {
       // 🟢 ยุบรวมแฟชั่นเข้าทั่วไป และอาชีพเข้าทางการ
       groups = ['daily', 'work', 'local', 'custom']; 
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
	

	
	
    setupAllVisualUI();

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
                videoAddLog("🖱️ โหมดวิดีโอ: เลือกสไตล์เอง", "info");
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
          const strictFidelity = " [Maintain 100% exact fidelity to the source image. DO NOT alter the product's shape or background elements. Only animate the character.]" + textProtection;
          const tiktokSafetyRules = " (Rules: NO floating text, NO subtitles. Focus on natural mouth movements and minimal, realistic head gestures)." + strictFidelity;
		  
        // 🌟 [ULTRA NATURAL VERSION] คลังสไตล์ใช้งานจริง (อัปเดตระบบ Tough Love & เพิ่มสไตล์)
          const videoTemplates = {
              // 🗣️ กลุ่ม 1: รีวิวและดึงดูดความสนใจ (Talking Head & Hook)
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
              'broll_hero': "Professional commercial Hero Shot. The [product] stands perfectly still. Very subtle light reflection movement on the surface to show realism. NO rotation. Keep original image 100%. " + tiktokSafetyRules,
              'broll_pan': "Slow and smooth cinematic camera pan over [product]. Keep the product and background exactly as the original image. " + tiktokSafetyRules,
              'broll_zoom': "Camera slowly zooms in on [product] texture. Highlighting micro-details without changing them. " + tiktokSafetyRules,
              'broll_cinematic': "Cinematic lighting setup showcasing [product]. Elegant, slow-motion feel with a premium aesthetic. Keep original image completely unmodified. " + tiktokSafetyRules,
              'miniature_vdo': `Cinematic miniature world animation. The giant [product] remains static. Tiny characters are moving in a stepped stop-motion style. Tilt-shift macro zoom. ${tiktokSafetyRules}`,

              // 🎙️ กลุ่ม 4: พากย์เสียง (Voiceover)
              'voice_promo': "Fast cuts commercial style. Energetic camera movement showing [product]. Keep original image details. Voice Tone: High-energy, fast-paced commercial narrator. " + tiktokSafetyRules,
              'voice_soft': "Gentle camera movement showing [product]. Soft vibe. Keep original colors. Voice Tone: Soothing and calm narrator, but speaking at a normal, continuous commercial pace. NOT slow ASMR. " + tiktokSafetyRules,
             'voice_docu': "Cinematic product documentary style. Elegant pans detailing the premium quality of [product]. Voice Tone: Professional and sophisticated product narrator explaining features continuously at a standard commercial speed. NOT slow. " + tiktokSafetyRules,
              'voice_rant': "Dramatic and urgent commercial style. High contrast lighting showing [product]. Voice Tone: Strict, deeply concerned, and urgent warning narrator. " + tiktokSafetyRules,
              'voice_miniature': "Cinematic miniature world animation. The giant [product] remains static. Tiny characters moving in stop-motion. Script Style: A highly engaging TikTok-style narrative. Start with a cinematic hook, explain REAL benefits, end with CTA. Voice Tone: Magical, premium documentary narrator. " + tiktokSafetyRules,
              'cartoon': "Magical and highly expressive commercial style. Playful camera angles showing [product] with a vibrant, animated vibe. Voice Tone: Classic Disney-style cartoon narrator, theatrical, highly expressive, magical, and bouncy. " + tiktokSafetyRules,
			'voice_news': "Professional news broadcast style. Camera framing [product] as the subject of a breaking news or exclusive feature story. Clean, objective, and high-quality presentation. Voice Tone: Authoritative, clear, and professional news anchor narrator reporting breaking news and formally presenting the key details about [product]. " + tiktokSafetyRules,
              'voice_movie': "Epic Hollywood movie trailer style. Dramatic lighting showcasing [product]. Voice Tone: Deep, resonant movie trailer narrator speaking continuously and powerfully without long dramatic pauses. " + tiktokSafetyRules
		 

		 };

          const randomVStyleSwitch = document.getElementById('video-random-style-switch');
          const customScriptInput = document.getElementById('video-custom-script');
          const customScriptValue = customScriptInput ? customScriptInput.value.trim() : "";
          const isRandomVStyle = randomVStyleSwitch ? randomVStyleSwitch.checked : false;
          let selectedId = "talk_ugc";

          const noVoiceModes = ['broll_hero', 'broll_pan', 'broll_zoom', 'broll_cinematic', 'miniature_vdo'];
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

          // 🗣️ ฝังคำสั่งแซนด์วิช: ตีกรอบหน้า-หลัง บังคับพูดไทย 100% ห้ามหลุดเด็ดขาด!
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
              videoAddLog(`🗣️ ใช้บทพูดที่ระบุ: "${customScriptValue}"`, 'info');
          }

          // 🛠️ FIX 5: เพิ่มคำแบนภาษาต่างชาติ (foreign language, english language) ใน Negative Prompt
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
          videoAddLog(`🖱️ ${roundLabel} ส่งคำสั่งสร้างวิดีโอเรียบร้อย`, 'success');
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
    const charUIBox = document.querySelector('.char-tab-container');
    if (charUIBox) {
        if (hasImage && currentMode === 'human') {
            charUIBox.classList.add('disabled-section');
            charUIBox.classList.add('model-ref-locked');
        } else {
            charUIBox.classList.remove('disabled-section');
            charUIBox.classList.remove('model-ref-locked');
        }
    }

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

                return Array.from(document.querySelectorAll('img'))
                    .filter(img => {
                        const rect = img.getBoundingClientRect();
                        
                        // 1. กรองขนาด: ต้องเป็นรูปไซส์ใหญ่เท่านั้น (ตัดไอคอนและรูปจิ๋วทิ้ง)
                        if (rect.width <= 150 || rect.height <= 150 || !img.complete || img.naturalWidth === 0) return false;

                        // 2. กรองโซนหวงห้าม: ไม่เอารูปในช่องพิมพ์, กล่องเครื่องมือ, หรือป๊อปอัป
                        const isInsidePromptBox = img.closest('[role="textbox"], [data-slate-editor="true"], [aria-haspopup="dialog"], header, nav');
                        if (isInsidePromptBox) return false;

                        // 3. 🎯 ด่านอรหันต์: สแกนหาป้ายคำว่า "รูปภาพที่อัปโหลด" 
                        let isUploaded = false;
                        let card = img;
                        // ถอยกลับไปสแกนหาข้อความในการ์ดแม่ สูงสุด 10 ชั้น
                        for (let i = 0; i < 10; i++) {
                            if (!card || card === document.body) break;
                            const text = (card.innerText || "").toLowerCase();
                            // ถ้าพบคำว่าอัปโหลด ให้ประหารรูปนี้ทิ้งทันที
                            if (text.includes('รูปภาพที่อัปโหลด') || text.includes('uploaded image') || text.includes('original image')) {
                                isUploaded = true;
                                break;
                            }
                            card = card.parentElement;
                        }

                        // ถ้ารูปนี้รอดจากทุกด่าน = เป็นรูปใหม่ที่ AI เพิ่งสร้างเสร็จจริงๆ
                        return !isUploaded;
                    })
                    .map(img => img.src);
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

  options.forEach((button) => {
    const option = document.createElement('option');
    option.value = button.dataset.value;
    option.textContent = bananaCleanVideoStyleLabel(button.dataset.label || button.textContent || button.dataset.value);
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
    : 'รีวิว UGC บ้าน ๆ';

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
          const coreNegative = "borders, frame, watermark, bad anatomy, deformed, blurry, ugly, sketch, specific pricing";

          const textCheckbox = document.getElementById('banana-text-overlay-checkbox');
          const useTextOverlay = textCheckbox ? textCheckbox.checked : true; 
          const customTextInput = document.getElementById('banana-custom-text-input');
          const customTextValue = customTextInput ? customTextInput.value.trim() : "";

          let manualTextPrompt = useTextOverlay ? (customTextValue !== "" ? `high-impact professional Thai text overlay that says exactly "${customTextValue}" in an extreme advertising typography style.` : `high-impact, professional Thai text overlay. The text MUST be a short, catchy Thai advertising slogan specifically promoting and selling [product]. Do NOT write about the character's profession, lifestyle, or location. High-quality typography that dominates the visual composition.`) : "Clean image, NO text overlay, NO typography, clear background.";
          let manualNegativeAddon = useTextOverlay ? "" : ", text, watermark, signature, username, typography, letters, words, logo";

          let generatedPrompt = "";
          let currentAppMode = document.getElementById('current-app-mode') ? document.getElementById('current-app-mode').value : 'human';
          const isSmartAutoChecked = document.getElementById('banana-smart-auto-checkbox')?.checked;
          if (currentAppMode === 'mascot' && window.FeatureGate && !FeatureGate.can('mascotMode')) {
              currentAppMode = 'human';
              showToast('ระบบมาสคอตใช้ได้เฉพาะ Premium', 'warning');
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
                  'office_lady': 'smart professional Thai working woman', 
                  'net_idol': 'beautiful trendy Thai net idol', 
                  'hiso_girl': 'elegant wealthy high-society Thai woman', 
                  'sport_girl': 'active fit Thai woman in sportswear',
                  'real_size': 'confident plus-size chubby Thai woman',
                  'mom': 'warm and kind Thai mother',
                  'hijab': 'beautiful Thai muslim woman wearing a hijab',
                  'villager_girl': 'authentic Thai rural country woman',
                  
                  // 🧢 ทั่วไป (ชาย)
                  'thai_guy': 'cool modern Thai teenager guy',
                  'smart_man': 'handsome professional Thai businessman',
                  'oppa': 'handsome stylish Korean-looking Thai man',
                  'muscle_man': 'muscular fit Thai fitness man',
                  'street_boy': 'cool trendy Thai streetwear boy',
                  'dad': 'warm and reliable Thai father',
                  'villager_boy': 'authentic Thai rural country man',

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
                  'human_lung': 'typical middle-aged Thai uncle wearing sunglasses'
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
                  const fidelityRules = `(STRICT FIDELITY): [product] must be 100% IDENTICAL to source.`;
                  const smartNegative = coreNegative + ", price tag, numbers, watermark";

                  // 🛑 ตัดสไตล์เมืองจิ๋ว (Miniature) ออกตามคำขอ เหลือสุ่ม 9 สไตล์ที่เน้นคนและสินค้า
                  const smartVariations = [
                      `High-end cinematic portrait. ${baseChar} holding [product]. ${smartAttire}. Shot on a professional DSLR with 85mm f/1.2 prime lens, extreme shallow depth of field, creamy bokeh. ${actionLogic} ${fidelityRules} ${manualTextPrompt} 8k photorealistic.`,
                      `Professional macro photography. Razor-sharp focus on [product] textures and droplets. ${baseChar} is interacting with the item in the background. ${smartAttire}. Captured using a 100mm macro lens on a high-end DSLR. ${manualTextPrompt} Commercial advertising quality.`,
                      `High-energy viral social media influencer style. ${baseChar} is presenting [product] with a vibrant aesthetic. ${smartAttire}. Soft professional studio lighting, vibrant trendy colors, clean bright atmosphere. Shot on a professional DSLR camera. (Strict Rule: Clean frame, NO app interface, NO TikTok UI, NO icons, NO overlays). ${manualTextPrompt}`,
                      `Modern e-commerce promotional banner. ${baseChar} posing with [product]. ${smartAttire}. Trendy minimalist studio background. Professional commercial DSLR photography, high-end shopping online aesthetic. ${manualTextPrompt} Sharp details, 8k resolution.`,
                      `A high-end studio commercial shot of ${baseChar}. ${smartAttire}. ${actionLogic} ${fidelityRules} ${manualTextPrompt} Cinematic professional studio lighting, premium advertising aesthetic, shot on a high-resolution professional camera.`,
                      `Refreshing outdoor lifestyle photography featuring ${baseChar} with [product]. ${smartAttire}. ${actionLogic} ${fidelityRules}. Naturally related setting. Shot on a professional DSLR with natural soft sunlight, photorealistic 8k. ${manualTextPrompt}`,
                      `Sharp promotional image showcasing ${baseChar}. ${smartAttire}. ${actionLogic} ${fidelityRules}. Minimalist composition, professional DSLR color grading, edge-to-edge full frame. ${manualTextPrompt}`,
                      `Candid and authentic everyday moment of ${baseChar}. ${smartAttire}. ${actionLogic} ${fidelityRules}. Unposed posture, natural home lighting. Captured with a professional high-end camera lens for a realistic yet premium atmosphere. ${manualTextPrompt}`,
                      `Engagement-focused UGC review. ${baseChar} is presenting [product] to the camera. ${smartAttire}. ${actionLogic} ${fidelityRules}. Authentic social media vibe, shot with a high-quality smartphone rear camera for a relatable feeling. ${manualTextPrompt}`
                  ];

                  const rIndex = Math.floor(Math.random() * smartVariations.length);
                  generatedPrompt = smartVariations[rIndex] + ` ${imgSafety} ${policyPrompt} ${getAntiBotSeed()} Negative Prompt: "${smartNegative}${manualNegativeAddon}"`;

                  const styleNames = ["🎬 Cinematic", "🔍 Macro", "✨ Influencer", "🛒 E-commerce", "💎 Premium Studio", "🌳 Outdoor", "📸 Showcase", "🤳 Candid", "📱 UGC"];
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
                      'casual': 'casual t-shirt and denim jeans', 
                      'polo': 'smart casual polo shirt', 
                      'hoodie': 'trendy hoodie and casual pants', 
                      'korean': 'stylish Korean minimalist fashion', 
                      'street': 'cool streetwear outfit',
                      'oldmoney': 'elegant old money aesthetic fashion, quiet luxury',
                      'sport': 'active sportswear',
                      'vacation': 'relaxing summer vacation beachwear',

                      // 💼 ทางการ
                      'shirt': 'neat crisp button-up shirt',
                      'suit': 'professional business suit',

                      // 🌸 ท้องถิ่น
                      'morhom': 'traditional Thai indigo morhom shirt', 
                      'isan': 'casual outfit with Thai Isan Pa Khao Ma (loincloth) pattern', 
                      'northern': 'traditional Thai Northern Lanna style clothing', 
                      'southern': 'traditional Thai Southern Batik or Patek style clothing', 
                      'thai_dress': 'trendy modern Thai fusion fashion, wearing an elegant traditional Thai Sabai (pleated shawl) draped top paired with casual denim jeans', 
                      'hill_tribe': 'traditional Thai hill tribe colorful clothing'
                  };

                  // 🖼️ ดิกชันนารี: หมวดหมู่ฉากหลัง (30 ฉาก ตรงตาม UI 100%)
                  const bgDict = { 
                      // 🏠 ภายใน (Indoor)
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
                      'thai_house': 'traditional Thai wooden house exterior',
                      'market': 'bustling local fresh market',
                      'night_market': 'vibrant neon-lit night market',
                      'win_moto': 'local Thai motorcycle taxi stand',
                      'convenience_store': 'bright convenience store storefront'
                  };
                 


				let finalOutfit = "";
                  
                  // 🟢 [อัปเกรด] บังคับชุด: ไม่สนว่าคลิกปุ่มไหนอยู่ ถ้าช่อง "ระบุเอง" มีข้อความ และไม่ได้เปิดสุ่ม ให้ใช้ข้อความนั้นทันที!
                  if (!isRandomOutfit && outfitCustom.trim() !== "") {
                      finalOutfit = `[CRITICAL OUTFIT RULE: The character MUST be wearing EXACTLY this outfit/uniform: "${outfitCustom.trim()}". Absolutely NO standard t-shirts, NO casual jeans, NO default clothing. Follow the user's outfit instruction strictly.]`;
                      bananaAddLog(`👗 บังคับชุด: "${outfitCustom.trim()}"`, 'info');
                  } 
                  else if (isRandomOutfit) {
                      const outKeys = Object.keys(outfitDict);
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
                      const bgKeys = Object.keys(bgDict);
                      finalBg = bgDict[bgKeys[Math.floor(Math.random() * bgKeys.length)]];
                  } 
                  else {
                      finalBg = bgDict[bgKey] || bgKey.replace(/_/g, ' ');
                  }

                 let styleKey = document.getElementById('banana-style-select')?.value || 'ugc_basic';
                  let isRandomStyle = document.getElementById('banana-random-style-switch')?.checked;
                  
                  // อัปเดต Array สำหรับสุ่ม (เอาเฉพาะหมวดที่ใช้งานบ่อย เพื่อไม่ให้สุ่มไปเจอของแปลก)
                  const styleKeys = ['model', 'influencer', 'ugc_basic', 'studio', 'fashion', 'usage', 'texture', 'beauty', 'review', 'live', 'fancy'];
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

                  // 🟢 อัปเดต: ระบบแอบสุ่มห้องสวยๆ สำหรับโหมด "หน้ากระจก" (Mirror)
                  if (styleKey === 'mirror') {
                      const mirrorRooms = [
                          'modern aesthetic bedroom with soft lighting', // ห้องนอน
                          'luxury walk-in closet with stylish clothes rack', // ห้องแต่งตัว
                          'clean minimalist bathroom with elegant tiles', // ห้องน้ำมินิมอล
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

                 const styleTemplates = {
                      // 👤 กลุ่ม 1: คน+สินค้า (Human)
                      'model': `Professional lifestyle photography. ${finalCharWithOutfit} interacting with [product]. Clean aesthetic setting. Soft lighting. Clean look. High quality, 8k resolution, photorealistic.`,
                      'influencer': `Authentic UGC (User-Generated Content) social media photography. Medium portrait shot of ${finalCharWithOutfit} ${randInfluencerPose}, naturally holding and presenting the [product] to the viewer. (CRITICAL RULE: The character is NOT holding the camera. NO selfie arms. BOTH hands must be visible and interacting naturally with the product). The character is looking directly at the lens with a friendly, approachable, and highly authentic smile. TikTok/YouTube lifestyle aesthetic. Unscripted, everyday casual setting, soft natural window lighting. Engaging and relatable vibe. (NOT heavy studio quality, NOT over-produced).`,
                      'ugc_basic': `Cute Basic-style UGC review photo. ${finalCharWithOutfit} naturally holding and presenting [product] to the camera with a friendly everyday creator vibe. Bright approachable TikTok review thumbnail style, playful, charming, soft colorful lighting, relatable social-media composition, photorealistic, high quality.`,
					'fashion': `High-end fashion lookbook photography. ${finalCharWithOutfit} is stylishly modeling and wearing the [product] as the main centerpiece of their outfit. Full body or medium-full shot clearly showcasing the fit, fabric, and design of the [product]. The model is posing confidently with a strong, professional fashion editorial presence. Stylish, modern, and trendy aesthetic. Professional lighting, photorealistic, 8k resolution, fashion magazine grade.`,
                      'beauty': `Beauty influencer photography. Close-up shot of ${finalCharWithOutfit} applying [product] to the skin. Showing texture and glow. Soft ring light. (Action: Swatching or applying). High quality, 8k resolution.`,
                     'studio': `Epic campaign advertising photography. ${finalCharWithOutfit} standing confidently and presenting the [product] within a spectacular and grand setting. The scene MUST BE transformed from a simple background into an spectacular and impactful promotional environment. Ensure the entire composition is grand and awe-inspiring, flawlessly integrating the character and product into an extravagant campaign poster. Dramatic epic lighting, stylized visual effects like glowing text, particle effects, or light flares that make the whole image look magnificent. A masterful and powerful composition that feels like a premium, master-piece advertising poster. The final image should look grand, powerful, and spectacular. Professional grade photography.`,
                      'usage': `Authentic documentary lifestyle photography. ${finalCharWithOutfit} is genuinely interacting with and actively using the [product] in a real-world, everyday situation. The character is naturally focused on the activity and is NOT looking directly at the camera (candid, unposed moment). Soft natural lighting, highly relatable and realistic storytelling atmosphere. High-end commercial grade.`,
                      'review': `Professional YouTuber and Blogger review photography. ${finalCharWithOutfit} is holding and presenting the [product] nicely to the camera. Shot on a high-end mirrorless camera with an 85mm portrait lens, creating a beautiful creamy bokeh (extreme blurred background) that makes the character and product pop out. The character has a welcoming, professional, and friendly smile. Soft aesthetic studio lighting (like a professional ring light or softbox). High quality, razor-sharp focus on the face and the product, 8k resolution.`,
                      'live': `Live commerce broadcast style. ${finalCharWithOutfit} acting as a charismatic host holding [product]. Energetic atmosphere. High quality, 8k resolution.`,

                     // 🔍 กลุ่ม 2: มือ+สินค้า (Closeup) - ถอดคาแรคเตอร์ออกทั้งหมด
                      'texture': `Extreme close-up macro shot of [product]. Focusing on the texture, material, or droplets. Highlighting the quality. Background is blurred. Aesthetic, sensory, high definition texture. (Note: Focus on product only, face is NOT visible). High quality, 8k resolution.`,
                      'unboxing': `First-person point of view (POV) shot. Looking down at a pair of hands holding or unboxing [product] on a messy but aesthetic desk. Natural indoor lighting, candid style. (Note: POV shot, only hands visible, face is NOT visible). High quality, 8k.`,
                      'shoes': `Low angle street fashion photography. Close-up shot of feet wearing [product] (shoes). Focus sharply on the shoes/feet. Background blurred. (Note: Focus on feet, face is NOT visible). High quality, 8k.`,
                      'hands': `Professional action lifestyle photography. Close-up on hands holding or operating [product] (tool/equipment). Active posture, demonstrating usage. (Note: Focus on action/hands, face is NOT visible). High quality, 8k.`,
					  
                      // 🖼️ กลุ่ม 3: ฉาก+สินค้า (Product) - ไม่มีคน
                      'decor': `Interior design lifestyle photography. Wide shot showcasing [product] (furniture/large home item) placed naturally and beautifully in a room. The product is the main focus of the composition. (CRITICAL RULE: NO humans, NO people, NO hands, just the product and the interior setting). High quality, 8k, photorealistic commercial grade.`,
                      'showcase': `Professional commercial product photography of [product]. The product is placed prominently in the center of the scene. Composition focuses solely on the product. (Rule: NO humans, NO people, NO hands, just the product). High quality, 8k resolution, photorealistic, advertising grade.`,

                      // 🎨 กลุ่ม 4: แฟนตาซี (Fantasy)
                      'fancy': `High-end advertising photography. ${finalCharWithOutfit} is holding the [product]. Bright and refreshing atmosphere. Elements of the product or related ingredients are elegantly fluttering in the air around the subject. The product packaging is glossy with premium reflective highlights. Warm and fresh tone, professional commercial grade, 8k resolution.`,
                      'cgi': `Surreal CGI advertising photography. A massive, skyscraper-sized [product] is placed as a gigantic monument perfectly integrated into the environment. The product looks incredibly huge. ${finalCharWithOutfit} is standing extremely small nearby, looking up at the giant product in amazement. Cinematic lighting, 3D render style, epic scale, hyper-realistic shadows.`,
                      'funny': `Create an advertisement image in an extremely realistic caricature style of ${finalCharWithOutfit} holding [product]. CRITICAL PROPORTIONS: The character has highly exaggerated proportions—a VERY LARGE HEAD attached to a TINY, SHORT body with SMALL LIMBS. The character must look like a cute miniature person standing full-body. The face MUST remain 100% realistic photography (NO cartoons, NO 3D renders allowed) but with a soft kawaii beauty filter. Expression: ${randFunnyExp}. High quality 8k, bright commercial lighting.`,
                      'miniature': `Tilt-shift macro photography of a miniature world. Tiny people interacting around the giant [product].`
                  };

                  let baseStyle = styleTemplates[styleKey] || styleTemplates['model'];
                  generatedPrompt = `${baseStyle} Location: ${finalBg}. ${manualTextPrompt} ${imgSafety} (Composition: Edge-to-edge). Negative Prompt: "${coreNegative}${manualNegativeAddon}"`;
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
                      "The character is striking a confident and energetic pose to the camera in a premium commercial style.",
                      "The living product is moving playfully, showing off its cute tiny limbs in a highly engaging advertisement.",
                      "The mascot poses dynamically, leaning forward slightly with a lively and charming attitude perfect for viral marketing.",
                      "The living character is expressing immense enthusiasm, gesturing with its tiny hands in a lively, eye-catching composition."
                  ];
                  dynamicAction = productActions[Math.floor(Math.random() * productActions.length)];
              } else {
                  // 🚀 [สุ่มจุดที่ 3] สุ่มท่าทาง (Action) สำหรับมาสคอตทั่วไป
                  const normalActions = [
                      "The mascot is interacting with the [product] in a unique, creative, and professional pose. AI: Design a dynamic posture that best showcases the [product].",
                      "The character is holding and presenting the [product] enthusiastically to the camera, creating an eye-catching advertisement.",
                      "The mascot is playfully posing alongside the [product], highlighting its features in a lively, high-end marketing shot.",
                      "The character shows off the [product] with a proud and energetic stance, perfectly framed for a top-tier product commercial."
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

              // 4. ประกอบ Prompt (ตัดคำว่า NOT smiling unless specified ออก เพื่อให้ AI ทำหน้าตาน่ารักได้อิสระขึ้น)
              const moodPrompt = expressionMap[expressionVal] + " NOT scared, NOT creepy, NOT blurry.";
			  
              let finalPromptParts = [];
              finalPromptParts.push(subject + ".");
              finalPromptParts.push(randomStylePrompt); // 🎲 วางสไตล์สุ่ม
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
                  if (mascotCustomText !== "") {
                       finalPromptParts.push(`high-impact professional Thai text overlay that says exactly "${mascotCustomText}" in an extreme advertising typography style.`);
                  } else {
                       finalPromptParts.push("high-impact, professional Thai text overlay in an extreme advertising style. High-quality typography that dominates the visual composition.");
                  }
              } else {
                  finalPromptParts.push("Clean image, no text overlay.");
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
              bananaAddLog(`🖱️ ${roundLabel} ส่งคำสั่งสร้างภาพสำเร็จ!`, 'success');
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
async function legacyToggleWebPageLock(shouldLock) {
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
async function legacyCheckCorrectWebsite() {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    
    // ดึง URL มาเช็ค ถ้าไม่มี (เช่นอยู่หน้า New Tab) ให้เป็น string ว่าง
    const currentUrl = (tab && tab.url) ? tab.url.toLowerCase() : "";

    // ตรวจสอบว่าอยู่บนโดเมน Google Labs และอยู่ในหน้า Flow ทำงาน
    const isLabs = currentUrl.includes("labs.google");
    const isFlow = currentUrl.includes("flow");

    // ✅ ถ้าผ่านเงื่อนไข (อยู่หน้าเว็บถูกต้อง) ให้รันต่อ
    if (isLabs && isFlow) {
        return true; 
    }

    // ❌ ถ้าไม่ผ่านเงื่อนไข (อยู่หน้าเว็บอื่น หรือแท็บว่าง) ให้แจ้งเตือนทันที
    showToast('⚠️ ผิดหน้า! กรุณากดเข้าโปรเจกต์ Google Labs ก่อนเริ่มทำงาน', 'error');
    
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
// 🟢 AUTO DEFAULT SETTINGS (ตั้งค่าเริ่มต้น: เปิดหน้าแฟนตาซี + แฟนซี)
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    // เพิ่มเวลาหน่วงเป็น 500ms เพื่อให้แน่ใจว่า HTML วาดเสร็จแล้ว
    setTimeout(() => {
        console.log("🔄 Setting Defaults (Fantasy Tab & Fancy)...");

        // 1. ตั้งค่า Checkbox พื้นฐาน
        const checkToTrue = [
            'video-random-voice-checkbox',   
            'banana-random-bg-switch',       // ✅ เปิดสุ่มฉาก (สีเขียว)
            'banana-random-outfit-switch'    // ✅ เปิดสุ่มชุด (สีเขียว)
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
        forceClick('.char-tab-btn[data-target="auto"]');
        
        // 🟢 สั่งให้เปิดแท็บ "แฟนตาซี" ทันทีที่โหลดเว็บเสร็จ
        forceClick('.config-tab-btn[data-type="style"][data-group="fantasy"]');
        
        // 🟢 แก้ไข: สั่งให้กดเลือก "แฟนซี (ของลอย)" เป็นค่าเริ่มต้น เพื่อไม่ให้ฉาก/ชุดโดนล็อค
        forceClick('.config-option[data-type="style"][data-value="fancy"]');

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
  const noVoiceModes = ['broll_hero', 'broll_pan', 'broll_zoom', 'broll_sunlight', 'miniature_vdo']; 
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
