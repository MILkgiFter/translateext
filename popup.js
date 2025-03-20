
document.addEventListener("DOMContentLoaded", () => {
    let langSelect = document.getElementById("lang-select");
    let saveBtn = document.getElementById("save-btn");

    chrome.storage.sync.get("targetLang", (data) => {
        if (data.targetLang) {
            langSelect.value = data.targetLang;
        }
    });

    saveBtn.addEventListener("click", () => {
        chrome.storage.sync.set({ targetLang: langSelect.value }, () => {
            alert("Язык сохранен!");
        });
    });
});
