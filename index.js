import{A as l}from"./assets/vendor-Cb7VvBBu.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))n(t);new MutationObserver(t=>{for(const e of t)if(e.type==="childList")for(const a of e.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function s(t){const e={};return t.integrity&&(e.integrity=t.integrity),t.referrerPolicy&&(e.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?e.credentials="include":t.crossOrigin==="anonymous"?e.credentials="omit":e.credentials="same-origin",e}function n(t){if(t.ep)return;t.ep=!0;const e=s(t);fetch(t.href,e)}})();(()=>{const r={openModalButton:document.querySelector("[data-mobile-menu-open]"),closeModalButtons:document.querySelectorAll("[data-mobile-menu-close]"),mobileMenu:document.querySelector("[data-mobile-menu]")};r.openModalButton.addEventListener("click",o),r.closeModalButtons.forEach(e=>{e.addEventListener("click",o)});function o(){r.mobileMenu&&(r.mobileMenu.classList.toggle("is-open"),n())}function s(){return r.mobileMenu.classList.contains("is-open")}function n(){s()?document.addEventListener("keydown",t):document.removeEventListener("keydown",t)}function t(e){e.key==="Escape"&&s()&&o()}})();const f={faq:[{order_no:1,question:"Які способи оплати ви приймаєте?",answer:"Ми приймаємо оплату онлайн банківськими картками Visa та Mastercard, через платіжні системи Apple Pay та Google Pay, а також готівкою кур'єру при отриманні замовлення."},{order_no:2,question:"Чи є у вас доставка?",answer:"Так, ми здійснюємо доставку по всьому місту. Вартість та умови доставки залежать від вашого району, деталі можна уточнити при оформленні замовлення."},{order_no:3,question:"Як швидко здійснюється доставка?",answer:"Зазвичай доставка займає від 60 до 90 хвилин з моменту підтвердження замовлення. У пікові години час доставки може бути збільшений, про що ми вас обов'язково повідомимо."},{order_no:4,question:"Чи можна забрати замовлення самостійно?",answer:"Так, ви можете забрати своє замовлення самостійно за адресою [Вказати адресу самовивозу] у робочі години магазину."},{order_no:5,question:"Чи пропонуєте ви десерти для людей з особливими дієтичними потребами (безглютенові, безлактозні, веганські)?",answer:"Ми постійно розширюємо наш асортимент. Наразі у нас є обмежений вибір безглютенових та безлактозних десертів. Будь ласка, перегляньте наш каталог або зв'яжіться з нами для отримання детальної інформації."},{order_no:6,question:"Як я можу зробити замовлення на індивідуальний торт?",answer:"Для замовлення індивідуального торта, будь ласка, зв'яжіться з нашим менеджером за телефоном [Вказати номер телефону] або залиште заявку на сайті. Ми обговоримо всі деталі дизайну, начинки та терміни виконання."},{order_no:7,question:"Чи можна змінити або скасувати замовлення після його оформлення?",answer:"Якщо вам потрібно змінити або скасувати замовлення, будь ласка, негайно зв'яжіться з нами за телефоном. Можливість внесення змін залежить від етапу, на якому знаходиться ваше замовлення."},{order_no:8,question:"Який термін зберігання ваших десертів?",answer:"Термін зберігання десертів залежить від їхнього типу та інгредієнтів. Зазвичай десерти рекомендується вживати протягом 24-72 годин. Точна інформація про термін зберігання вказана на упаковці кожного виробу."},{order_no:9,question:"Чи є у вас програма лояльності або знижки для постійних клієнтів?",answer:"Так, ми цінуємо наших постійних клієнтів! Деталі нашої програми лояльності та діючих акцій ви можете знайти на окремій сторінці нашого сайту або уточнити у менеджера."},{order_no:10,question:"Що робити, якщо у мене є скарга або пропозиція?",answer:"Ми завжди раді зворотному зв'язку! Якщо у вас виникли питання, скарги або пропозиції, будь ласка, напишіть нам на електронну пошту [Вказати email] або зателефонуйте. Ваша думка допомагає нам ставати кращими."}]};document.addEventListener("DOMContentLoaded",()=>{const r=document.querySelector(".accordion-container");if(!r)return;const o=new URL("/goit-sw-team-project/assets/icons-Cdyo7Dv1.svg",import.meta.url).href,s="keyboard-arrow-down",n=f.faq.map(({order_no:t,question:e,answer:a})=>`
      <li class="ac faq-item">
        <h3 class="ac-header faq-subtitle">
          <button class="ac-trigger faq-button" type="button">
            <span>${t}. ${e}</span>
            <svg class="faq-icon">
              <use href="${o}#${s}"></use>
            </svg>
          </button>
        </h3>
        <div class="ac-panel faq-panel">
          <p class="ac-text faq-text">${a}</p>
        </div>
      </li>
    `).join("");r.innerHTML=n,new l(".accordion-container",{duration:400,showMultiple:!1,onOpen:function(t){console.log(t)}})});const p={feedbacks:[{_id:"6854873d82d4e3521f90a269",rate:4.5,description:"Дуже задоволена замовленням, тістечка просто тануть у роті.",author:"Олена Мельник"},{_id:"6854873d82d4e3521f90a26a",rate:5,description:"Ціна-якість на висоті, обов'язково замовлятиму ще!",author:"Дмитро Савченко"},{_id:"6854873d82d4e3521f90a26b",rate:4,description:"Смачно, але хотілося б більший вибір безглютенових десертів.",author:"Марія Бондар"},{_id:"6854873d82d4e3521f90a26c",rate:5,description:"Завжди свіжа випічка, мої улюблені еклери!",author:"Ігор Петренко"},{_id:"6854873d82d4e3521f90a26d",rate:3.5,description:"Десерти нормальні, але доставка була трохи довшою, ніж очікував.",author:"Наталя Мороз"},{_id:"6854873d82d4e3521f90a26e",rate:4.5,description:"Замовляли торт на свято, всі гості були в захваті.",author:"Володимир Ткаченко"},{_id:"6854873d82d4e3521f90a26f",rate:5,description:"Чудовий сервіс, десерти приїхали ідеально запаковані.",author:"Тетяна Лисенко"},{_id:"6854873d82d4e3521f90a270",rate:4,description:"Сподобалось все, крім одного тістечка, яке було трохи прим'яте.",author:"Олександр Шевченко"},{_id:"6854873d82d4e3521f90a271",rate:5,description:"Завжди тут замовляю, ніколи не розчаровують!",author:"Юлія Клименко"},{_id:"6854873d82d4e3521f90a272",rate:3.5,description:"Десерти смачні, але ціни трохи завищені, як на мене.",author:"Сергій Коваленко"}],total:40,page:"1",limit:"10"};document.addEventListener("DOMContentLoaded",()=>{m(".feedback-data-container",p.feedbacks)});function m(r,o){if(!o||!Array.isArray(o))return;const s=document.querySelector(r);if(!s)return;const e=`${new URL("/goit-sw-team-project/assets/icons-Cdyo7Dv1.svg",import.meta.url).href}#instagram`;console.log(`This is url from feedback section: ${e}`);const a=o.map(({_id:i,rate:d,description:c,author:u})=>`
    <li class="feedback-item" data_id="${i}">
      <div class="feedback-rating" data-rate="${d}">
        <div class="feedback-star-wrapper">
          <svg class="feedback-star is-marked">
            <use href="${e}"></use>
          </svg>
          <svg class="feedback-star is-marked">
            <use href="${e}"></use>
          </svg>
          <svg class="feedback-star is-marked">
            <use href="${e}"></use>
          </svg>
          <svg class="feedback-star is-marked">
            <use href="${e}"></use>
          </svg>
          <svg class="feedback-star">
            <use href="${e}"></use>
          </svg>
        </div>
      </div>
      <p class="feedback-text">${c}</p>
      <p class="feedback-author">${u}</p>
    </li>
    `).join("");s.innerHTML=a}
//# sourceMappingURL=index.js.map
