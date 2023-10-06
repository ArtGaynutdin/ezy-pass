/* ------------------ Доступ к основным элементам DOM ------------------ */
// Селект количества букв
let selectNumOfChar = document.getElementById("numberOfChar");
// Селект для выбора свойств
let selectOptions = document.getElementById("chooseOptions");
// Селект количества паролей
let selectNumOfPasswords = document.getElementById("numberOfPasswords");
// Селект количества спец-символов
let selectNumOfSpecialSymbols = document.getElementById("numberOfSpecial");
// Инпут-чекбокс для использования спец-символов
let chekSpecialSymbol = document.getElementById("specialSymbol");

/* ------------------ Заполнение количества символов пароля ------------------ */
// Функция для заполнения
function complectionSelect(selectElement, min, max) {
    for (let i = min; i <= max; i++) {
        let option = document.createElement("option");
        option.value = i;
        option.textContent = i;
        selectElement.appendChild(option);
    }
}
// Заполнение селекта количества символов
complectionSelect(selectNumOfChar, 6, 20);
// Заполнение селекта количества паролей
complectionSelect(selectNumOfPasswords, 1, 10);
// Заполнение селекта количества спец-символов
complectionSelect(selectNumOfSpecialSymbols, 1, 2);

/* ------------------ Использование спец-символов ------------------ */
// Лейбл для селект количества спец-символов
let labelSpecial = document.getElementById("labelSpecial");
// Показ или скрытие лейбла и селекта спец-символов
chekSpecialSymbol.addEventListener("change", function () {
    if (chekSpecialSymbol.checked) {
        labelSpecial.classList.remove("none");
        selectNumOfSpecialSymbols.classList.remove("none");
    } else {
        labelSpecial.classList.add("none");
        selectNumOfSpecialSymbols.classList.add("none");
    }
});

/* ------------------ Сообщение об уровне сложности пароля ------------------ */
// контейнер для сообщения
let complexity = document.getElementById("complexity");
// Получение картинок
let weakImage = document.getElementById("weak");
let optimalImage = document.getElementById("optimal");
let strongImage = document.getElementById("strong");
// Массив возможных значений уровня сложности
let complexityArray = ["Weak", "Optimal", "Strong"];
// Создание заголовка
let complexityMassege = document.createElement("h3");
// Вспомогательная функция для изменения картинок
function addActiveClassForImage(imageStatus) {
    switch (imageStatus) {
        case weak:
            optimalImage.classList.remove("active");
            strongImage.classList.remove("active");
            weakImage.classList.add("active");
            break;
        case optimal:
            weakImage.classList.remove("active");
            strongImage.classList.remove("active");
            optimalImage.classList.add("active");
            break;
        case strong:
            weakImage.classList.remove("active");
            optimalImage.classList.remove("active");
            strongImage.classList.add("active");
            break;
    }
}
// Вспомогательная функция для изменения сообщения
function addActiveClassForMessege(messegeStatus) {
    switch (messegeStatus) {
        case weak:
            complexityMassege.classList.remove("color-optimal");
            complexityMassege.classList.remove("color-strong");
            complexityMassege.classList.add("color-weak");
            break;
        case optimal:
            complexityMassege.classList.remove("color-weak");
            complexityMassege.classList.remove("color-strong");
            complexityMassege.classList.add("color-optimal");
            break;
        case strong:
            complexityMassege.classList.remove("color-weak");
            complexityMassege.classList.remove("color-optimal");
            complexityMassege.classList.add("color-strong");
            break;
    }
}
// Вспомогательная функция для правильного установления статуса сложности
function chekingInput() {
    if (chekSpecialSymbol.checked) {
        let chekBool = true;
        return chekBool;
    } else {
        let chekBool = false;
        return chekBool;
    }
}
// Функция для изменения статуса
function updateComplexityMessage() {
    let resultCheking = chekingInput();
    switch (resultCheking) {
        // Если без спец-символов
        case false:
            // Если символов меньше 8
            if (selectNumOfChar.value < 8) {
                complexityMassege.textContent = "Password is " + complexityArray[0];
                // Для картинки
                addActiveClassForImage(weak);
                // Для сообщения
                addActiveClassForMessege(weak);
            }
            // Если символов больше 8 и только цифры или только буквы
            else if (selectNumOfChar.value >= 8 && (selectOptions.value == "onlyCharacters" || selectOptions.value == "onlyNumbers")) {
                complexityMassege.textContent = "Password is " + complexityArray[1];
                // Для картинки
                addActiveClassForImage(optimal);
                // Для сообщения
                addActiveClassForMessege(optimal);
            }
            // Если символов больше 8 и цифры с буквами
            else if (selectNumOfChar.value >= 8 && selectOptions.value == "charactersAndNumbers") {
                complexityMassege.textContent = "Password is " + complexityArray[2];
                // Для картинки
                addActiveClassForImage(strong);
                // Для сообщения
                addActiveClassForMessege(strong);
            }
            break;
        // Если со спец-символами
        case true:
            // Если символов меньше 8
            if (selectNumOfChar.value < 8 && (selectOptions.value == "charactersAndSpecials" || selectOptions.value == "numbersAndSpecials" || selectOptions.value == "num&char&Specials")) {
                complexityMassege.textContent = "Password is " + complexityArray[1];
                // Для картинки
                addActiveClassForImage(optimal);
                // Для сообщения
                addActiveClassForMessege(optimal);
            }
            // Если символов больше 8
            else if (selectNumOfChar.value >= 8 && (selectOptions.value == "charactersAndSpecials" || selectOptions.value == "numbersAndSpecials" || selectOptions.value == "num&char&Specials")) {
                complexityMassege.textContent = "Password is " + complexityArray[2];
                // Для картинки
                addActiveClassForImage(strong);
                // Для сообщения
                addActiveClassForMessege(strong);
            }
    }
    // Очистка установленного статуса
    complexity.innerHTML = "";
    // Установка нового статуса
    complexity.appendChild(complexityMassege);
}
// Реагирование на внесение изменений в селект "выбора количества символов"
selectNumOfChar.addEventListener("change", function () {
    updateComplexityMessage();
});
// Реагирование на внесение изменений в селект "выбора опций генерации"
selectOptions.addEventListener("change", function () {
    chekSpecialSymbol.checked = false;
    updateComplexityMessage();
});
// Проверка на инпут-чекбокс для "спец-символов" и изменение options в selectOptions
chekSpecialSymbol.addEventListener("change", function () {
    // Для цифр со спец-символами
    if (chekSpecialSymbol.checked && selectOptions.value == "onlyNumbers") {
        selectOptions.value = "numbersAndSpecials";
        updateComplexityMessage();
    }
    // Для букв со спец-символами
    else if (chekSpecialSymbol.checked && selectOptions.value == "onlyCharacters") {
        selectOptions.value = "charactersAndSpecials";
        updateComplexityMessage();
    }
    // Для цифр и букв со спец-символами
    else if (chekSpecialSymbol.checked && selectOptions.value == "charactersAndNumbers") {
        selectOptions.value = "num&char&Specials";
        updateComplexityMessage();
    }
    // При снятии галочки с чек-бокса
    else {
        let temporaryStorage = selectOptions.value;
        switch (temporaryStorage) {
            case "numbersAndSpecials":
                selectOptions.value = "onlyNumbers";
                break;
            case "charactersAndSpecials":
                selectOptions.value = "onlyCharacters";
                break;
            case "num&char&Specials":
                selectOptions.value = "charactersAndNumbers";
        }
        updateComplexityMessage();
    }
});
// Установление состояния при первой загрузке страницы
updateComplexityMessage();

/* ------------------ Генерация случайного числа ------------------ */
// Генератор булевого решения (0 или 1)
function randomSolution() {
    let random = Math.random();
    if (random >= 0.5) {
        random = Math.ceil(random);
    } else if (random < 0.5) {
        random = Math.floor(random);
    }
    return random;
}
// Функция генерации цифры от 0 до 9
function randomDigit() {
    let min = 0;
    let max = 9;
    let randomDigit = Math.floor(Math.random() * (max - min + 1)) + min;
    return randomDigit;
}
// Функция генерации латинского символа
function randomChar() {
    let randomIndex = Math.floor(Math.random() * 26);
    let solution = randomSolution();
    let randomLetter;
    if (solution == 0) {
        randomLetter = String.fromCharCode(97 + randomIndex);
    } else if (solution == 1) {
        randomLetter = String.fromCharCode(65 + randomIndex);
    }
    return randomLetter;
}
// Функция генерации спец-символа
function randomSpecialSymbol() {
    let symbolsArray = ["@", "!", "#", "$", "%", "^", "&"];
    let min = 0;
    let max = 6;
    let randomElement = Math.floor(Math.random() * (max - min + 1)) + min;
    // console.log(symbolsArray[randomElement]);
    return symbolsArray[randomElement];
}
// Функция для генерации пароля
function randomPass() {
    // Массив символа пароля
    let passArray = [];
    // Счетчик количества спец-символов
    let specialCounter = 0;
    // Счетчик для полного заполнения всех символов
    let i = 0;
    switch (selectOptions.value) {
        // Генерация только чисел
        case "onlyNumbers":
            for (let i = 0; i < selectNumOfChar.value; i++) {
                passArray[i] = randomDigit();
            }
            break;
        // Генерация чисел и спец-символов
        case "numbersAndSpecials":
            while (passArray.length < selectNumOfChar.value) {
                let SpecialSymbolNumber = selectNumOfSpecialSymbols.value;
                let solution = randomSolution();
                if (specialCounter < SpecialSymbolNumber) {
                    if (solution == 0) {
                        specialCounter += 1;
                        passArray.push(randomSpecialSymbol());
                    } else if (solution == 1) {
                        passArray.push(randomDigit());
                    }
                } else if (solution == 1) {
                    passArray.push(randomDigit());
                }
                i += 1;
            }
            break;
        // Генерация букв
        case "onlyCharacters":
            for (let i = 0; i < selectNumOfChar.value; i++) {
                passArray[i] = randomChar();
            }
            break;
        // Генерация букв и спец-символов
        case "charactersAndSpecials":
            while (passArray.length < selectNumOfChar.value) {
                let SpecialSymbolNumber = selectNumOfSpecialSymbols.value;
                let solution = randomSolution();
                if (specialCounter < SpecialSymbolNumber) {
                    if (solution == 0) {
                        specialCounter += 1;
                        passArray.push(randomSpecialSymbol());
                    } else if (solution == 1) {
                        passArray.push(randomChar());
                    }
                } else if (solution == 1) {
                    passArray.push(randomChar());
                }
                i += 1;
            }
            break;
        // Генерация цифр и букв
        case "charactersAndNumbers":
            for (let i = 0; i < selectNumOfChar.value; i++) {
                let solution = randomSolution();
                if (solution == 0) {
                    passArray[i] = randomDigit();
                } else if (solution == 1) {
                    passArray[i] = randomChar();
                }
            }
            break;
        // Генерация цифр, букв и спец-символов
        case "num&char&Specials":
            while (passArray.length < selectNumOfChar.value) {
                let randomPath = Math.random();
                let SpecialSymbolNumber = selectNumOfSpecialSymbols.value;
                if (specialCounter < SpecialSymbolNumber) {
                    if (randomPath > 0 && randomPath <= 0.33) {
                        specialCounter += 1;
                        passArray.push(randomSpecialSymbol());
                    } else if (randomPath > 0.33 && randomPath < 0.67) {
                        passArray.push(randomDigit());
                    } else if (randomPath >= 0.67 && randomPath < 1) {
                        passArray.push(randomChar());
                    }
                } else if (randomPath > 0.33 && randomPath < 0.67) {
                    passArray.push(randomDigit());
                } else if (randomPath >= 0.67 && randomPath < 1) {
                    passArray.push(randomChar());
                }
                i += 1;
            }
    }
    let passString = passArray.join("");
    return passString;
}

/* ------------------ Вывод результата (сгенерированного пароля) ------------------ */
// Общий контейнер для вывода
let showResult = document.getElementById("showResult");
// Кнопка генерации
let generateButton = document.getElementById("generateButton");
// Анимационный блеск (элемент)
let skewButton = document.getElementById("skew_button");
// Слежка за наведение на кнопку для анимации
generateButton.addEventListener("mouseover", function () {
    skewButton.classList.add("animate");
});
generateButton.addEventListener("mouseout", function () {
    skewButton.classList.remove("animate");
});
// Список для элементов (сгенерированных паролей)
let passContainer = document.getElementById("result");

// Обработка нажатия на кнопку генерации
generateButton.addEventListener("click", function () {
    // Показ контейнера для вывода
    showResult.classList.remove("none");
    // Очищение списка паролей
    resultList.innerHTML = "";
    // Вызов функции создания элементов списка
    for (i = 0; i < selectNumOfPasswords.value; i++) {
        // createPasswordField();
        createResultElement();
    }
    // Добавление интерфейса для копирования
    addCopyInterface();
    // Покраска и анимация элементов
    colorizingElements();
});

// Получение списка для выгрузки элементов на страницу
let resultList = document.getElementById("result_list");
// Функция создания, заполнения и вывода элемента в массив
function createResultElement() {
    // Создание элемента списка
    let resultElement = document.createElement("li");
    resultElement.classList.add("result_item");
    // Генерация самого пароля
    let finalPassword = randomPass();
    // Запись пароля в поле
    let passwordValue = document.createElement("p");
    passwordValue.classList.add("password_value");
    passwordValue.innerText = finalPassword;
    // Создание кнопки для копирования пароля
    let copyButton = document.createElement("button");
    copyButton.classList.add("copy_button");
    copyButton.innerText = "Copy";
    // Создание блика для анимации
    let highlight = document.createElement("div");
    highlight.classList.add("element_skew");
    // Добавление пароля и кнопки в элемент списка
    resultElement.appendChild(highlight);
    resultElement.appendChild(passwordValue);
    resultElement.appendChild(copyButton);
    // Добавление элемента в сам список
    resultList.append(resultElement);
}
// Добавление функции копирования пароля
function addCopyInterface() {
    // Получение массива элементов списка
    let resultElementsQuery = document.querySelectorAll(".result_item");
    let resultElementsArray = Array.from(resultElementsQuery);

    // Получение массива кнопок
    let copyButtonsQuery = document.querySelectorAll(".copy_button");
    let copyButtonsArray = Array.from(copyButtonsQuery);
    // Получение массива паролей
    let passwordValuesQuery = document.querySelectorAll(".password_value");
    let passwordValuesArray = Array.from(passwordValuesQuery);
    // Обработка нажатия на любую кнопку
    for (let i = 0; i < copyButtonsArray.length; i++) {
        copyButtonsArray[i].addEventListener("click", function () {
            // Скопировать текст из текущей кнопки и закинуть его в буфер обмена с Богом!
            resultElementsArray[i].classList.add("copied");
            copyButtonsArray[i].innerText = "Copied";

            function backToCopy() {
                resultElementsArray[i].classList.remove("copied");
                copyButtonsArray[i].innerText = "Copy";
            }
            setTimeout(backToCopy, 4000);

            let resultPass = passwordValuesArray[i].textContent;
            // Помещение пароля в буфер обмена
            navigator.clipboard.writeText(resultPass);
        });
    }
}
// Функция добавления грандиентов для элементов с Богом!
function colorizingElements() {
    // Получение массива элементов списка
    let resultElementsQuery = document.querySelectorAll(".result_item");
    let resultElementsArray = Array.from(resultElementsQuery);

    // Массив с классами градиентов
    let colorsArray = ["password_color_01", "password_color_02", "password_color_03",
    "password_color_04", "password_color_05", "password_color_06",
    "password_color_07", "password_color_08", "password_color_09",
    "password_color_10"];

    // Перемешивание мест элементов в массиве
    function randomizeArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            // Поменять местами элементы
            [array[i], array[j]] = [array[j], array[i]];
        }
    }
    randomizeArray(colorsArray);
    
    // Перемешанные цвета в новый массив
    let outputColors = [];
    for (let i = 0; i < colorsArray.length; i++) {
        outputColors[i] = colorsArray[i];
    }

    // Добавление градиентов к элементам
    for (let i = 0; i < resultElementsArray.length; i++) {
        resultElementsArray[i].classList.add(outputColors[i]);
    }

    // Собрание всех анимационных бликов
    let highlightsAnimateQuery = document.querySelectorAll(".element_skew");
    let highlightsAnimateArray = Array.from(highlightsAnimateQuery);

    for (let i = 0; i < resultElementsArray.length; i++) {
        resultElementsArray[i].addEventListener("mouseover", function () {
            // console.log("highlights!");
            highlightsAnimateArray[i].classList.add("animate");
        });
        resultElementsArray[i].addEventListener("mouseout", function () {
            highlightsAnimateArray[i].classList.remove("animate");
        });
    }
}