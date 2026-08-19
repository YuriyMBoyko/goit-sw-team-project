# Солодка майстерня

## Назва проекту

**Солодка майстерня** — командний проект з блоку **JavaScript**.

## Про проект

Проект виконано як результат вивчення блоку **JavaScript** курсу **FullStack Developer** у [GoIT Academy](https://goit.global/ua/).

Проект виконано на основі [Vanilla App Template](https://github.com/goitacademy/vanilla-app-template)

Посилання:
- [макет веб-сторінки](https://www.figma.com/design/UCknpohZVh4qpbnv15XAXj/%D0%A1%D0%BE%D0%BB%D0%BE%D0%B4%D0%BA%D0%B0-%D0%9C%D0%B0%D0%B9%D1%81%D1%82%D0%B5%D1%80%D0%BD%D1%8F?node-id=8203-60422&t=6c9k6XnNFmJYz5Nv-0);
- [технічне завдання](https://docs.google.com/spreadsheets/d/1M3h49rFXdQUPasAZG8gH-qedpZC-fg02d0n3bqY5z94/edit?usp=sharing);
- [жива сторінка](https://yuriymboyko.github.io/goit-sw-team-project/)

## Робота над проектом

Для реалізації проект було поділено на задачі відповідно до секцій сайта. Формування задач відбувалося таким чином, щоб кожен учасник команди мав хоча б одну задачу по JavaScript.

Виконавці обирали задачі самостійно та за власним бажанням з переліку задач ToDo.

## Виконавці

- Юрій Бойко (YuriyMBoyko) **Team Lead** 
    (підготовка репозитарію, секції Header, Hero, Відгуки клієнтів, Часті питання, Footer, code review, bug fixing, доопрацювання)
- Ірина Антонюк (AuroraStruct) **Web-developer** 
    (секції About Us та Order Modal)
- Карина Бобровська (KarinaKarpOff) **Web-developer** 
    (секція Солодощі - картки товарів )
- Андрій Срібняк (Zaikst) **Web-developer** 
    (секція Product Modal)
- Альона Приходько (alyona830) **Web-developer** 
    (секція Солодощі - категорії товарів)
- Максим Глянь (flyanxi) **Web-developer** 
    (Loader - використано в секціях Солодощі та Відгуки клієнтів)
- Анастасія Дишлюк (anastasiia7dyshliuk) **Web-developer** 
    (Секція Популярні товари - знаходиться не code review та ще не увійшла в реліз)

## Технології, використані при роботі над проектом

- **HTML5** (розмітка сторінок)
- **CSS3** (адаптивна верстка)
- **Vite** (збирання проекту)
- **JavaScript** (код проекту)

## Структура проекту

- `src/index.html` — основна сторінка сайту
- `src/partials/` — HTML-частини сторінки (header, sections, footer тощо)
- `src/css/` — стилі (загальні стилі та стилі секцій)
- `src/js/` — JavaScript-логіка
- `src/img/` — іконки та картинки проекту

## Запускаємо проект локально

### 1. передумови

- Встановлений **Node.js** (рекомендовано LTS)
- **npm** (встановлюється разом із Node.js)

### 2. встановлюємо залежності

```bash
npm install
```

### 3. запускаємо у режимі розробки

```bash
npm run dev
```

Після запуску відкрити у браузері адресу, яку покаже Vite (зазвичай
`http://localhost:5173`).

## Розгортання на github

Проєкт налаштований на збирання через Vite та може бути розгорнутий на **GitHub Pages**.

Для коректної роботи на GitHub Pages у файлі `package.json` вказано base-шлях:

```json
"build": "vite build --base=/goit-sw-team-project/"
```
