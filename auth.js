// ============================================
// 0. AUTHENTICATION SYSTEM (อัปเดตระบบโชว์วันหมดอายุแบบ Auto-Kick)
// ============================================
const AUTH = {
    // ⚠️ เปลี่ยน URL ด้านล่างเป็น URL ใหม่ที่คุณได้จากการ Deploy ครั้งล่าสุด!
    SCRIPT_URL: 'https://script.google.com/macros/s/AKfycbwzZAQSiGf_8LmGcKHeMf5lkkLkXuJKNnd4AHdia3uSasdaH_fX3xG_bW6NbnS6m_uVCQ/exec', 
    
init: function() {
        const btnLogin = document.getElementById('btn-login');
        const inputKey = document.getElementById('license-key-input');
        const deviceIdDisplay = document.getElementById('display-device-id');

        // 1. สร้างหรือดึง Device ID
        let deviceId = localStorage.getItem('promptplay_device_id');
        if (!deviceId) {
            deviceId = crypto.randomUUID();
            localStorage.setItem('promptplay_device_id', deviceId);
        }
        if(deviceIdDisplay) deviceIdDisplay.textContent = deviceId.substring(0, 8) + "...";

        // 2. Auto Login (ถ้าเคย Login แล้ว)
        const savedKey = localStorage.getItem('promptplay_license_key');
        if (savedKey) {
            this.verifyKey(savedKey, deviceId, true);
        }

        // 3. ผูกปุ่ม Login
        if (btnLogin) {
            btnLogin.addEventListener('click', () => {
                const key = inputKey.value.trim();
                if(!key) {
                    showToast('กรุณากรอก License Key', 'error');
                    return;
                }
                
                btnLogin.innerHTML = "กำลังตรวจสอบ...";
                btnLogin.disabled = true;
                this.verifyKey(key, deviceId, false);
            });
        }
    },

    verifyKey: function(key, deviceId, isAuto) {
        const overlay = document.getElementById('auth-overlay');
        const btnLogin = document.getElementById('btn-login');
        const msgDiv = document.getElementById('login-msg');

        // ส่งข้อมูลยืนยันตัวตนไปที่ Google Sheet
        const targetUrl = `${this.SCRIPT_URL}?key=${encodeURIComponent(key)}&deviceId=${encodeURIComponent(deviceId)}`;

        fetch(targetUrl, {
            method: 'GET',
            redirect: 'follow',
            credentials: 'omit' 
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                // ✅ ผ่าน!
                localStorage.setItem('promptplay_license_key', key);
                
                if(overlay) overlay.style.display = 'none'; 
                
                // อัปเดต UI ป้ายสีบนหัวโปรแกรม
                this.updateExpireUI(data.expire);
                
                // 🟢 [แก้ไขแล้ว] สั่งให้โชว์ Popup วันหมดอายุ "ทุกครั้ง" ที่เข้าใช้งาน (ทั้งกรอกใหม่และ Auto-login)
                let expireText = data.expire ? data.expire : "ระบบกำลังตรวจสอบ";
                showToast(`ยินดีต้อนรับ! หมดอายุ: ${expireText}`, 'success');

            } else {
                // ❌ ไม่ผ่าน (เช่น คีย์หมดอายุ หรือโดนเตะออกจากเครื่องอื่น)
                this.handleAuthFail(data.message, isAuto, overlay, msgDiv, btnLogin);
            }
        })
        .catch(err => {
            console.error("Auth Error", err);
            this.handleAuthFail("เชื่อมต่อ Server ไม่ได้", isAuto, overlay, msgDiv, btnLogin);
        });
    },

    forceLogoutLocal: function() {
        localStorage.removeItem('promptplay_license_key');
        const overlay = document.getElementById('auth-overlay');
        const btnLogin = document.getElementById('btn-login');
        
        if(overlay) overlay.style.display = 'flex';
        if(btnLogin) {
            btnLogin.innerHTML = "เข้าสู่ระบบ";
            btnLogin.disabled = false;
        }
    },

    handleAuthFail: function(message, isAuto, overlay, msgDiv, btnLogin) {
        if (isAuto) {
            if(overlay) overlay.style.display = 'flex';
            this.forceLogoutLocal(); // ล้างคีย์ผิดๆ ออก
        } else {
            if(msgDiv) msgDiv.textContent = message;
            if(btnLogin) {
                btnLogin.innerHTML = "เข้าสู่ระบบ";
                btnLogin.disabled = false;
                btnLogin.style.animation = "shake 0.5s";
                setTimeout(() => btnLogin.style.animation = "", 500);
            }
            showToast(message, 'error');
        }
    },

    updateExpireUI: function(expireStr) {
        const badge = document.getElementById('header-expire-badge');
        const textSpan = document.getElementById('header-expire-text');
        
        if (!badge || !textSpan) return;

        // โชว์ป้าย
        badge.style.display = 'flex';

        if (expireStr === 'Lifetime') {
            badge.className = 'expire-badge lifetime';
            textSpan.textContent = "VIP ถาวร";
            return;
        }

        // คำนวณวัน
        // 🌟 บังคับให้อ่านวันที่แบบ วัน/เดือน/ปี (DD/MM/YYYY)
        let expDate;
        if (expireStr.includes('/')) {
            const parts = expireStr.split('/'); // แยก วัน, เดือน, ปี
            // Date(ปี, เดือน (เริ่มที่0), วัน)
            expDate = new Date(parts[2], parts[1] - 1, parts[0]); 
        } else {
            expDate = new Date(expireStr);
        }
        const today = new Date();
        today.setHours(0,0,0,0);
        
        const diffTime = expDate - today;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays < 0) {
            badge.className = 'expire-badge danger';
            textSpan.textContent = "หมดอายุแล้ว!";
            this.forceLogoutLocal(); // เตะออกทันที
        } else if (diffDays <= 3) {
            badge.className = 'expire-badge warning';
            textSpan.textContent = `เหลือ ${diffDays} วัน`;
        } else {
            badge.className = 'expire-badge safe';
            textSpan.textContent = `เหลือ ${diffDays} วัน`;
        }
    }
};

// เรียกใช้ระบบ Auth ทันทีที่โหลด
document.addEventListener('DOMContentLoaded', () => {
   AUTH.init();
});