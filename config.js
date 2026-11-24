// ข้อมูลร้านอยู่ใน shop.js และ docs/*.txt
// ห้ามใส่ OpenRouter API key ในไฟล์นี้หรือไฟล์ใด ๆ ที่เผยแพร่บน GitHub Pages
window.CONFIG = {
  WORKER_URL: 'https://crumb-co-chat-api.patiphatchunoon.workers.dev',
  SEARCH_MODE: 'vector',
  EMBED_MODEL: 'nvidia/nemotron-3.5-embed-1b:free',
  MODEL: 'nvidia/nemotron-3.5-super-vl:free', // ตรวจชื่อรุ่นที่ OpenRouter ก่อนใช้งาน
  VECTORS_FILE: 'vectors.json',
  DOCS_BASE: 'docs',
  FILES: [
    '01-menu.txt','02-ingredients.txt','03-orders.txt','04-faq.txt',
    '05-contact.txt','06-croissant.txt','07-tart.txt','08-sourdough.txt',
    '09-brownie.txt','10-selection.txt','11-delivery.txt','12-store.txt',
    '13-care.txt'
  ],
  CHUNK_SIZE: 500,
  OVERLAP: 100,
  TOP_K: 3
};
