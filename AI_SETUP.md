# เปิด AI จริงให้ Crumb & Co.

เว็บเปิด AI ผ่าน Cloudflare Worker และ OpenRouter แล้ว โดยใช้เอกสารลูกค้า 13 ไฟล์และ `vectors.json` สำหรับค้นข้อมูลก่อนเรียบเรียงคำตอบ ขั้นตอนด้านล่างใช้เมื่อต้องตั้งค่าใหม่หรือย้ายบัญชี

## สิ่งที่เจ้าของบัญชีต้องทำ

1. สมัครหรือเข้าสู่ระบบ [OpenRouter](https://openrouter.ai/) แล้วสร้าง API key ในบัญชีของตน
2. Worker `crumb-co-chat-api` เผยแพร่แล้วที่ `https://crumb-co-chat-api.patiphatchunoon.workers.dev` หากต้องเผยแพร่โค้ดใหม่ ให้รัน `npx wrangler deploy` ในโฟลเดอร์นี้
3. ใน Worker ไปที่ **Settings → Variables and Secrets → Add** เพิ่มรายการชนิด **Secret** ชื่อ `OPENROUTER_KEY` แล้ววาง API key จากข้อ 1 จากนั้น Deploy การเปลี่ยนแปลง
4. เปิด URL ของ Worker ในเบราว์เซอร์ ควรเห็น `{"status":"ok","hasKey":true}` หาก `hasKey` เป็น `false` ให้ตรวจชื่อ Secret
5. ใน `worker.js` เตรียม `ALLOWED` สำหรับเว็บ Sites ปัจจุบันและ `https://patiphatchunoon.github.io` ไว้แล้ว หากเปลี่ยนโดเมนในภายหลัง ให้แก้รายการนี้แล้ว Deploy อีกครั้ง
6. ใน `config.js` กำหนด URL Worker ที่ `WORKER_URL` โดยไม่ใส่ `/` ท้ายสุด ตอนนี้ตั้งค่า URL ของโปรเจ็กต์ไว้แล้ว
7. เปิดเว็บและถาม `ครัวซองต์อัลมอนด์ราคาเท่าไร` ดูสถานะแชทว่าขึ้น **AI ผ่าน Worker** และตรวจว่าตอบ **95 บาท** พร้อมอ้างอิงเอกสาร ถาม `หอพักค่าเช่าเท่าไร` เพื่อดูว่าบอทปฏิเสธข้อมูลนอกเอกสาร

## เปิดการค้นแบบเวกเตอร์ตามคู่มือ

ตอนนี้มี `vectors.json` และตั้ง `SEARCH_MODE` เป็น `'vector'` แล้ว หากแก้เอกสารหรือโมเดลฝังข้อความ ให้เปิด `build-vectors.html` บนเว็บที่อยู่ใน `ALLOWED` กดสร้างไฟล์และดาวน์โหลด `vectors.json` ใหม่ แล้ววางไฟล์ไว้ชั้นเดียวกับ `index.html`

## ข้อควรทราบ

- ห้ามใส่ API key ใน `config.js`, `worker.js` หรือ GitHub เพราะไฟล์เหล่านี้เผยแพร่ได้ ให้ใส่เฉพาะใน Secret ของ Worker
- การตั้ง `WORKER_URL` เป็นเพียงการเปิดโหมด AI ในเว็บ ต้องทดสอบการตอบจริงอีกครั้งก่อนส่งงาน
- รุ่น AI ฟรีหรือโควตาอาจเปลี่ยนได้ หากคำขอผิดพลาด ให้ตรวจชื่อ `MODEL` และ `EMBED_MODEL` ใน `config.js` กับ OpenRouter และตรวจสถานะบัญชี
- เว็บไซต์ยังไม่รับออเดอร์หรือชำระเงินจริง แม้เปิด AI แล้ว

แหล่งอ้างอิงขั้นตอน: [Cloudflare Secrets](https://developers.cloudflare.com/workers/configuration/secrets/), [Cloudflare Variables and Secrets](https://developers.cloudflare.com/workers/configuration/environment-variables/), [OpenRouter Developer Platform](https://openrouter.ai/developers)
