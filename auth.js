// ============================================
// 0. AUTHENTICATION SYSTEM
// Supports current Premium keys and legacy Basic keys.
// ============================================
const AUTH = {
    SCRIPT_URL: 'https://script.google.com/macros/s/AKfycbwzZAQSiGf_8LmGcKHeMf5lkkLkXuJKNnd4AHdia3uSasdaH_fX3xG_bW6NbnS6m_uVCQ/exec',
    BASIC_SCRIPT_URL: 'https://script.google.com/macros/s/AKfycbzKCN2hW1hY2x-Ec0NblteSti1rEg_Z4qS8jAK-r2np-LwQqoP5L8EDl_q-eTpyScePCw/exec',

    init: function() {
        const btnLogin = document.getElementById('btn-login');
        const inputKey = document.getElementById('license-key-input');
        const deviceIdDisplay = document.getElementById('display-device-id');

        const deviceId = this.getOrCreateDeviceId();
        if (deviceIdDisplay) deviceIdDisplay.textContent = deviceId.substring(0, 8) + '...';

        const savedKey = localStorage.getItem('promptplay_license_key') || localStorage.getItem('pp_license');
        if (savedKey && inputKey) {
            inputKey.value = savedKey;
        }

        this.showLoginOverlay();

        if (btnLogin) {
            btnLogin.addEventListener('click', () => {
                const key = inputKey ? inputKey.value.trim() : '';
                if (!key) {
                    showToast('กรุณากรอก License Key', 'error');
                    return;
                }

                btnLogin.innerHTML = 'กำลังตรวจสอบ...';
                btnLogin.disabled = true;
                this.verifyKey(key, deviceId, false);
            });
        }

        const btnSwitchKey = document.getElementById('btn-switch-key');
        if (btnSwitchKey) {
            btnSwitchKey.addEventListener('click', () => {
                this.showLoginOverlay();
                showToast('เลือกหรือเปลี่ยน License Key ได้เลย', 'success');
            });
        }

        const btnSettingsSwitchKey = document.getElementById('btn-settings-switch-key');
        if (btnSettingsSwitchKey) {
            btnSettingsSwitchKey.addEventListener('click', () => {
                const settingsModal = document.getElementById('settings-modal');
                if (settingsModal) settingsModal.classList.remove('show');
                this.showLoginOverlay();
                showToast('เปลี่ยน License Key เพื่อสลับ Basic / Premium', 'success');
            });
        }
    },

    getOrCreateDeviceId: function() {
        let deviceId = localStorage.getItem('promptplay_device_id') || localStorage.getItem('pp_did');
        if (!deviceId) {
            deviceId = crypto.randomUUID();
        }

        localStorage.setItem('promptplay_device_id', deviceId);
        localStorage.setItem('pp_did', deviceId);
        return deviceId;
    },

    verifyKey: async function(key, deviceId, isAuto) {
        const overlay = document.getElementById('auth-overlay');
        const btnLogin = document.getElementById('btn-login');
        const msgDiv = document.getElementById('login-msg');
        const endpoints = this.getEndpointOrder(key);
        let lastErrorMessage = 'เชื่อมต่อ Server ไม่ได้';

        for (const endpoint of endpoints) {
            try {
                const data = await this.checkEndpoint(endpoint.url, key, deviceId);
                if (data.success) {
                    this.handleAuthSuccess(data, key, endpoint.plan, overlay);
                    return;
                }
                lastErrorMessage = data.message || lastErrorMessage;
            } catch (err) {
                console.warn(`Auth ${endpoint.plan} endpoint failed`, err);
                lastErrorMessage = err.message || lastErrorMessage;
            }
        }

        this.handleAuthFail(lastErrorMessage, isAuto, overlay, msgDiv, btnLogin);
    },

    getEndpointOrder: function(key) {
        const legacyBasicKey = localStorage.getItem('pp_license');
        const storedPlan = localStorage.getItem('promptplay_plan');
        const shouldTryBasicFirst = storedPlan === 'basic'
            || legacyBasicKey === key
            || String(key || '').toLowerCase().includes('basic');

        const basic = { plan: 'basic', url: this.BASIC_SCRIPT_URL };
        const vip = { plan: 'vip', url: this.SCRIPT_URL };
        return shouldTryBasicFirst ? [basic, vip] : [vip, basic];
    },

    checkEndpoint: async function(endpointUrl, key, deviceId) {
        const targetUrl = `${endpointUrl}?key=${encodeURIComponent(key)}&deviceId=${encodeURIComponent(deviceId)}`;
        const response = await fetch(targetUrl, {
            method: 'GET',
            redirect: 'follow',
            credentials: 'omit',
        });
        return response.json();
    },

    handleAuthSuccess: function(data, key, endpointPlan, overlay) {
        localStorage.setItem('promptplay_license_key', key);
        localStorage.setItem('pp_license', key);

        const plan = this.resolvePlan(data, key, endpointPlan);
        localStorage.setItem('promptplay_plan', plan);

        if (window.FeatureGate) {
            FeatureGate.applyPlan(plan);
        }

        if (overlay) overlay.style.display = 'none';
        this.updateExpireUI(data.expire, plan);

        const expireText = data.expire || 'ระบบกำลังตรวจสอบ';
        const planLabel = window.FeatureGate ? FeatureGate.getPlanLabel(plan) : plan.toUpperCase();
        showToast(`ยินดีต้อนรับ ${planLabel}! หมดอายุ: ${expireText}`, 'success');
    },

    showLoginOverlay: function() {
        const overlay = document.getElementById('auth-overlay');
        const inputKey = document.getElementById('license-key-input');
        const btnLogin = document.getElementById('btn-login');
        const msgDiv = document.getElementById('login-msg');
        const savedKey = localStorage.getItem('promptplay_license_key') || localStorage.getItem('pp_license');

        if (savedKey && inputKey) {
            inputKey.value = savedKey;
        }
        if (msgDiv) {
            msgDiv.textContent = savedKey ? 'พบคีย์เดิมแล้ว กด Enter Studio เพื่อใช้งาน หรือเปลี่ยนคีย์ใหม่' : '';
        }
        if (btnLogin) {
            btnLogin.innerHTML = 'Enter Studio';
            btnLogin.disabled = false;
        }
        if (overlay) {
            overlay.style.display = 'flex';
        }
    },

    resolvePlan: function(data, key, endpointPlan) {
        if (endpointPlan === 'basic') return 'basic';

        const planSource = data.plan || data.package || data.tier || data.version || data.licenseType || data.type || '';
        if (!planSource && endpointPlan === 'vip') return 'vip';

        if (window.FeatureGate) {
            return FeatureGate.normalizePlan(planSource, key);
        }

        const fallbackSource = `${planSource} ${key}`.toLowerCase();
        if (fallbackSource.includes('basic')) return 'basic';
        return 'vip';
    },

    forceLogoutLocal: function() {
        localStorage.removeItem('promptplay_license_key');
        localStorage.removeItem('pp_license');
        localStorage.removeItem('promptplay_plan');

        const overlay = document.getElementById('auth-overlay');
        const btnLogin = document.getElementById('btn-login');

        if (window.FeatureGate) {
            FeatureGate.applyPlan('vip');
        }

        if (overlay) overlay.style.display = 'flex';
        if (btnLogin) {
            btnLogin.innerHTML = 'เข้าสู่ระบบ';
            btnLogin.disabled = false;
        }
    },

    handleAuthFail: function(message, isAuto, overlay, msgDiv, btnLogin) {
        if (isAuto) {
            if (overlay) overlay.style.display = 'flex';
            this.forceLogoutLocal();
            return;
        }

        if (msgDiv) msgDiv.textContent = message;
        if (btnLogin) {
            btnLogin.innerHTML = 'เข้าสู่ระบบ';
            btnLogin.disabled = false;
            btnLogin.style.animation = 'shake 0.5s';
            setTimeout(() => btnLogin.style.animation = '', 500);
        }
        showToast(message, 'error');
    },

    updateExpireUI: function(expireStr, plan = 'vip') {
        const badge = document.getElementById('header-expire-badge');
        const textSpan = document.getElementById('header-expire-text');

        if (!badge || !textSpan) return;

        badge.style.display = 'flex';

        if (!expireStr) {
            badge.className = 'expire-badge safe';
            textSpan.textContent = 'Lifetime';
            return;
        }

        if (expireStr === 'Lifetime') {
            badge.className = 'expire-badge lifetime';
            textSpan.textContent = 'Lifetime';
            return;
        }

        let expDate;
        if (expireStr.includes('/')) {
            const parts = expireStr.split('/');
            expDate = new Date(parts[2], parts[1] - 1, parts[0]);
        } else {
            expDate = new Date(expireStr);
        }

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const diffTime = expDate - today;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays < 0) {
            badge.className = 'expire-badge danger';
            textSpan.textContent = 'หมดอายุแล้ว!';
            this.forceLogoutLocal();
        } else if (diffDays <= 3) {
            badge.className = 'expire-badge warning';
            textSpan.textContent = `เหลือ ${diffDays} วัน`;
        } else {
            badge.className = 'expire-badge safe';
            textSpan.textContent = `เหลือ ${diffDays} วัน`;
        }
    },
};

document.addEventListener('DOMContentLoaded', () => {
    AUTH.init();
});
