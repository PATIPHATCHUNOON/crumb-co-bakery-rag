const PRODUCTS = [
  {id:'croissant',name:'ครัวซองต์อัลมอนด์',category:'pastry',label:'PASTRY',price:95,unit:'ชิ้น',image:'assets/almond-croissant.webp',description:'กรอบหอมเนย ครีมอัลมอนด์ · ประมาณ 90 กรัม'},
  {id:'tart',name:'ทาร์ตสตรอว์เบอร์รี',category:'dessert',label:'DESSERT',price:120,unit:'ชิ้น',image:'assets/strawberry-tart.webp',description:'คัสตาร์ดวานิลลาและผลไม้ · ประมาณ 120 กรัม'},
  {id:'sourdough',name:'ขนมปังซาวโดว์',category:'bread',label:'BREAD',price:180,unit:'ก้อน',image:'assets/sourdough.webp',description:'เปลือกกรอบ เนื้อหนึบ · ประมาณ 500 กรัม'},
  {id:'brownie',name:'ช็อกโกแลตบราวนี',category:'dessert',label:'DESSERT',price:85,unit:'ชิ้น',image:'assets/brownie.webp',description:'ช็อกโกแลตเข้มข้น เนื้อหนึบ · ประมาณ 80 กรัม'}
];
const cart = new Map();
const $ = id => document.getElementById(id);
const money = n => '฿' + n.toLocaleString('th-TH');
function renderProducts(filter='all'){
  $('product-grid').replaceChildren(...PRODUCTS.filter(p=>filter==='all'||p.category===filter).map(p=>{
    const article=document.createElement('article');article.className='product-card';
    article.innerHTML=`<img class="product-image" src="${p.image}" alt="${p.name}"><div class="product-body"><span class="product-category">${p.label}</span><h3>${p.name}</h3><p>${p.description}</p><div class="product-bottom"><strong>${money(p.price)}</strong><button class="add-button" type="button" aria-label="เพิ่ม ${p.name} ลงตะกร้า">+</button></div></div>`;
    article.querySelector('button').addEventListener('click',()=>{cart.set(p.id,(cart.get(p.id)||0)+1);renderCart();openCart()});return article;
  }));
}
function renderCart(){
  const count=[...cart.values()].reduce((a,b)=>a+b,0);$('cart-count').textContent=count;
  const items=$('cart-items');items.replaceChildren();
  if(!count){const p=document.createElement('p');p.className='empty-cart';p.textContent='ยังไม่มีขนมในตะกร้า';items.append(p)}
  for(const [id,qty] of cart){const p=PRODUCTS.find(x=>x.id===id);const row=document.createElement('div');row.className='cart-line';row.innerHTML=`<img src="${p.image}" alt=""><div><strong>${p.name}</strong><small>${money(p.price)} / ${p.unit}</small><div class="qty"><button type="button" aria-label="ลด ${p.name}">−</button><span>${qty}</span><button type="button" aria-label="เพิ่ม ${p.name}">+</button></div></div><strong>${money(p.price*qty)}</strong>`;const btn=row.querySelectorAll('.qty button');btn[0].addEventListener('click',()=>change(id,-1));btn[1].addEventListener('click',()=>change(id,1));items.append(row)}
  $('cart-total').textContent=money([...cart].reduce((s,[id,q])=>s+PRODUCTS.find(p=>p.id===id).price*q,0));$('copy-order').disabled=!count;
}
function change(id,d){const q=(cart.get(id)||0)+d;if(q<=0)cart.delete(id);else cart.set(id,q);renderCart()}
function openCart(){$('cart-drawer').classList.add('open');$('cart-drawer').setAttribute('aria-hidden','false');$('cart-backdrop').hidden=false;$('cart-close').focus()}
function closeCart(){$('cart-drawer').classList.remove('open');$('cart-drawer').setAttribute('aria-hidden','true');$('cart-backdrop').hidden=true;$('cart-open').focus()}
document.querySelectorAll('[data-filter]').forEach(b=>b.addEventListener('click',()=>{document.querySelectorAll('[data-filter]').forEach(x=>x.classList.toggle('active',x===b));renderProducts(b.dataset.filter)}));
$('cart-open').addEventListener('click',openCart);$('cart-close').addEventListener('click',closeCart);$('cart-backdrop').addEventListener('click',closeCart);document.addEventListener('keydown',e=>{if(e.key==='Escape'&&$('cart-drawer').classList.contains('open'))closeCart()});
$('copy-order').addEventListener('click',async()=>{const lines=[...cart].map(([id,q])=>{const p=PRODUCTS.find(x=>x.id===id);return `${p.name} × ${q} = ${money(p.price*q)}`});const text=`รายการขนม Crumb & Co.\n${lines.join('\n')}\nรวม ${$('cart-total').textContent}\nนำรายการไปยืนยันกับพนักงานที่เคาน์เตอร์`;try{await navigator.clipboard.writeText(text);$('cart-feedback').textContent='คัดลอกรายการแล้ว'}catch{$('cart-feedback').textContent='คัดลอกไม่ได้ในเบราว์เซอร์นี้'}});
$('year').textContent=new Date().getFullYear();renderProducts();renderCart();
