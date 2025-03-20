(function () {
    // Создаем кнопку
    let btn = document.createElement("div");
    btn.id = "floating-translate-btn";
    btn.innerText = "🌍";

    // Стили для кнопки
    btn.style.position = "fixed";
    btn.style.bottom = "20px";
    btn.style.right = "20px";
    btn.style.width = "50px";
    btn.style.height = "50px";
    btn.style.background = "white";
    btn.style.border = "1px solid black";
    btn.style.borderRadius = "50%";
    btn.style.textAlign = "center";
    btn.style.lineHeight = "50px";
    btn.style.fontSize = "24px";
    btn.style.cursor = "pointer";
    btn.style.boxShadow = "0 4px 8px rgba(0,0,0,0.2)";
    btn.style.zIndex = "9999";
    btn.style.userSelect = "none"; // Запрет выделения текста

    document.body.appendChild(btn);

    // Перемещение кнопки
    let isDragging = false, offsetX, offsetY;

    btn.addEventListener("mousedown", (e) => {
        isDragging = true;
        offsetX = e.clientX - btn.offsetLeft;
        offsetY = e.clientY - btn.offsetTop;
        btn.style.opacity = "0.7"; // Делает кнопку полупрозрачной во время перетаскивания
    });

    document.addEventListener("mousemove", (e) => {
        if (isDragging) {
            btn.style.left = e.clientX - offsetX + "px";
            btn.style.top = e.clientY - offsetY + "px";
        }
    });

    document.addEventListener("mouseup", () => {
        isDragging = false;
        btn.style.opacity = "1"; // Возвращает нормальную прозрачность
    });

    // Обработка клика по кнопке
    btn.addEventListener("click", () => {
        let selectedText = window.getSelection().toString().trim();
        if (selectedText) {
            chrome.runtime.sendMessage({ action: "translate", text: selectedText });
        } else {
            alert("Выделите текст для перевода!");
        }
    });

    console.log("Кнопка перевода загружена");
})();
