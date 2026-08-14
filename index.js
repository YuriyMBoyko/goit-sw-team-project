import{A as u}from"./assets/vendor-Cb7VvBBu.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))s(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&s(a)}).observe(document,{childList:!0,subtree:!0});function n(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function s(e){if(e.ep)return;e.ep=!0;const r=n(e);fetch(e.href,r)}})();(()=>{const o={openModalButton:document.querySelector("[data-mobile-menu-open]"),closeModalButtons:document.querySelectorAll("[data-mobile-menu-close]"),mobileMenu:document.querySelector("[data-mobile-menu]")};o.openModalButton.addEventListener("click",t),o.closeModalButtons.forEach(r=>{r.addEventListener("click",t)});function t(){o.mobileMenu&&(o.mobileMenu.classList.toggle("is-open"),s())}function n(){return o.mobileMenu.classList.contains("is-open")}function s(){n()?document.addEventListener("keydown",e):document.removeEventListener("keydown",e)}function e(r){r.key==="Escape"&&n()&&t()}})();function i(o,t){return!t||typeof t!="string"?void 0:`${new URL(o,import.meta.url).href}#${t}`}const l={faq:[{order_no:1,question:"Які способи оплати ви приймаєте?",answer:"Ми приймаємо оплату онлайн банківськими картками Visa та Mastercard, через платіжні системи Apple Pay та Google Pay, а також готівкою кур'єру при отриманні замовлення."},{order_no:2,question:"Чи є у вас доставка?",answer:"Так, ми здійснюємо доставку по всьому місту. Вартість та умови доставки залежать від вашого району, деталі можна уточнити при оформленні замовлення."},{order_no:3,question:"Як швидко здійснюється доставка?",answer:"Зазвичай доставка займає від 60 до 90 хвилин з моменту підтвердження замовлення. У пікові години час доставки може бути збільшений, про що ми вас обов'язково повідомимо."},{order_no:4,question:"Чи можна забрати замовлення самостійно?",answer:"Так, ви можете забрати своє замовлення самостійно за адресою [Вказати адресу самовивозу] у робочі години магазину."},{order_no:5,question:"Чи пропонуєте ви десерти для людей з особливими дієтичними потребами (безглютенові, безлактозні, веганські)?",answer:"Ми постійно розширюємо наш асортимент. Наразі у нас є обмежений вибір безглютенових та безлактозних десертів. Будь ласка, перегляньте наш каталог або зв'яжіться з нами для отримання детальної інформації."},{order_no:6,question:"Як я можу зробити замовлення на індивідуальний торт?",answer:"Для замовлення індивідуального торта, будь ласка, зв'яжіться з нашим менеджером за телефоном [Вказати номер телефону] або залиште заявку на сайті. Ми обговоримо всі деталі дизайну, начинки та терміни виконання."},{order_no:7,question:"Чи можна змінити або скасувати замовлення після його оформлення?",answer:"Якщо вам потрібно змінити або скасувати замовлення, будь ласка, негайно зв'яжіться з нами за телефоном. Можливість внесення змін залежить від етапу, на якому знаходиться ваше замовлення."},{order_no:8,question:"Який термін зберігання ваших десертів?",answer:"Термін зберігання десертів залежить від їхнього типу та інгредієнтів. Зазвичай десерти рекомендується вживати протягом 24-72 годин. Точна інформація про термін зберігання вказана на упаковці кожного виробу."},{order_no:9,question:"Чи є у вас програма лояльності або знижки для постійних клієнтів?",answer:"Так, ми цінуємо наших постійних клієнтів! Деталі нашої програми лояльності та діючих акцій ви можете знайти на окремій сторінці нашого сайту або уточнити у менеджера."},{order_no:10,question:"Що робити, якщо у мене є скарга або пропозиція?",answer:"Ми завжди раді зворотному зв'язку! Якщо у вас виникли питання, скарги або пропозиції, будь ласка, напишіть нам на електронну пошту [Вказати email] або зателефонуйте. Ваша думка допомагає нам ставати кращими."}]};document.addEventListener("DOMContentLoaded",()=>{const o=document.querySelector(".accordion-container");if(!o)return;const t=l.faq.map(({order_no:n,question:s,answer:e})=>`
      <li class="ac faq-item">
        <h3 class="ac-header faq-subtitle">
          <button class="ac-trigger faq-button" type="button">
            <span>${n}. ${s}</span>
            <svg class="faq-icon">
              <use href="${i("../img/icons.svg","keyboard-arrow-down")}"></use>
            </svg>
          </button>
        </h3>
        <div class="ac-panel faq-panel">
          <p class="ac-text faq-text">${e}</p>
        </div>
      </li>
    `).join("");o.innerHTML=t,new u(".accordion-container",{duration:400,showMultiple:!1,onOpen:function(n){console.log(n)}})});const f={feedbacks:[{_id:"6854873d82d4e3521f90a269",rate:4.5,description:"Дуже задоволена замовленням, тістечка просто тануть у роті.",author:"Олена Мельник"},{_id:"6854873d82d4e3521f90a26a",rate:5,description:"Ціна-якість на висоті, обов'язково замовлятиму ще!",author:"Дмитро Савченко"},{_id:"6854873d82d4e3521f90a26b",rate:4,description:"Смачно, але хотілося б більший вибір безглютенових десертів.",author:"Марія Бондар"},{_id:"6854873d82d4e3521f90a26c",rate:5,description:"Завжди свіжа випічка, мої улюблені еклери!",author:"Ігор Петренко"},{_id:"6854873d82d4e3521f90a26d",rate:3.5,description:"Десерти нормальні, але доставка була трохи довшою, ніж очікував.",author:"Наталя Мороз"},{_id:"6854873d82d4e3521f90a26e",rate:4.5,description:"Замовляли торт на свято, всі гості були в захваті.",author:"Володимир Ткаченко"},{_id:"6854873d82d4e3521f90a26f",rate:5,description:"Чудовий сервіс, десерти приїхали ідеально запаковані.",author:"Тетяна Лисенко"},{_id:"6854873d82d4e3521f90a270",rate:4,description:"Сподобалось все, крім одного тістечка, яке було трохи прим'яте.",author:"Олександр Шевченко"},{_id:"6854873d82d4e3521f90a271",rate:5,description:"Завжди тут замовляю, ніколи не розчаровують!",author:"Юлія Клименко"},{_id:"6854873d82d4e3521f90a272",rate:3.5,description:"Десерти смачні, але ціни трохи завищені, як на мене.",author:"Сергій Коваленко"}],total:40,page:"1",limit:"10"};document.addEventListener("DOMContentLoaded",()=>{p(".feedback-data-container",f.feedbacks)});function p(o,t){if(!t||!Array.isArray(t))return;const n=document.querySelector(o);if(!n)return;const s=i("../img/icons.svg","instagram"),e=t.map(({_id:r,rate:a,description:d,author:c})=>`
    <li class="feedback-item" data_id="${r}">
      <div class="feedback-rating" data-rate="${a}">
        <div class="feedback-star-wrapper">
          <svg class="feedback-star is-marked">
            <use href="${s}"></use>
          </svg>
          <svg class="feedback-star is-marked">
            <use href="${s}"></use>
          </svg>
          <svg class="feedback-star is-marked">
            <use href="${s}"></use>
          </svg>
          <svg class="feedback-star is-marked">
            <use href="${s}"></use>
          </svg>
          <svg class="feedback-star">
            <use href="${s}"></use>
          </svg>
        </div>
      </div>
      <p class="feedback-text">${d}</p>
      <p class="feedback-author">${c}</p>
    </li>
    `).join("");n.innerHTML=e}
//# sourceMappingURL=index.js.map
