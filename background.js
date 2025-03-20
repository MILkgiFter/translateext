
chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
        id: "translate",
        title: "Перевести выделенный текст",
        contexts: ["selection"]
    });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === "translate" && info.selectionText) {
        chrome.scripting.executeScript({
            target: { tabId: tab.id },
            function: translateSelectedText,
            args: [info.selectionText]
        });
    }
});

function translateSelectedText(text) {
    const lang = localStorage.getItem("targetLang") || "en";
    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${lang}&dt=t&q=${encodeURIComponent(text)}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const translatedText = data[0]?.map(t => t[0]).join("") || "Ошибка перевода";
            alert(`Перевод: ${translatedText}`);
        })
        .catch(() => alert("Ошибка перевода"));
}
