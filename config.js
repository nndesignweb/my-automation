// Prompt & Play Studio configuration.
const CONFIG = {
  delays: {
    actionMin: 1500,  
    actionMax: 3000,  
    afterConfirmMin: 4000,  
    afterConfirmMax: 7000,  
  },
  automation: {
    afterGeneratePrompt: { min: 1000, max: 2000 },
    afterFillPrompt: { min: 1500, max: 2500 },
    afterUploadImage: { min: 3000, max: 5000 },
    afterClickCreate: { min: 120000, max: 150000 }, // รอสร้างวิดีโอ 2-2.5 นาที
    betweenDownloads: { min: 2000, max: 4000 },
  },
  bananaAutomation: {
    afterGeneratePrompt: { min: 1000, max: 2000 },
    afterFillPrompt: { min: 1000, max: 2000 },
    afterUploadImage: { min: 3000, max: 5000 },
    afterClickCreate: { min: 20000, max: 40000 }, // รอสร้างรูป 20-40 วินาที
    betweenDownloads: { min: 1500, max: 3000 },
  },
selectors: {
    // เจาะจงหาปุ่ม Nano Banana Pro เฉพาะในแถบด้านล่าง
    settingsTrigger: 'div[class*="hvKLod"] button:has(div:contains("Nano Banana Pro"))', 
    
    // แท็บและปุ่มในเมนู Pop-up (ใช้คำค้นหาที่แม่นยำ)
    imageTab: 'button[role="tab"]:has(span:contains("Image"))',
    portraitBtn: 'button[role="tab"]:has(span:contains("แนวตั้ง"))',
    landscapeBtn: 'button[role="tab"]:has(span:contains("แนวนอน"))',

    // ปุ่มบวก (+) เฉพาะที่อยู่ในแถบพิมพ์ข้อความด้านล่าง
    addAssetTrigger: 'div[class*="hvKLod"] button:has(i:contains("add_2"))',
    
    // ปุ่มอัปโหลดในเมนูที่เด้งขึ้นมา
    uploadButton: 'button:has(span:contains("อัปโหลดรูปภาพ"))',
    
    // ช่องกรอกข้อความ (UI ใหม่)
    textArea: '[role="textbox"][contenteditable="true"]',
    
    // ปุ่มสร้าง (ลูกศร) เฉพาะที่อยู่ในแถบด้านล่าง
    createButton: 'div[class*="hvKLod"] button:has(i:contains("arrow_forward"))'
  }
};
