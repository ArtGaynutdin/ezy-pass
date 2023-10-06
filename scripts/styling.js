// Ссылка для наведения
let policy = document.getElementById("policy");
// Текст конфеденциальности
let policyText = document.getElementById("policy-text");
// Весь контейнер
let privacyPolicy = document.querySelector(".privacy-policy");

// Показ или скрытие текста при наведении на ссылку
policy.addEventListener("mouseover", function () {
    privacyPolicy.classList.add("height");
    policyText.classList.add("active");
});
policy.addEventListener("mouseout", function () {
    privacyPolicy.classList.add("height");
    policyText.classList.remove("active");
});

// Скрытие общего контейнера при нажатии на кнопку закрытия
let closePolicy = document.getElementById("close-policy");
closePolicy.addEventListener("click", function() {
    privacyPolicy.classList.add("none");
});