const _elements = {
    tickerItems: document.querySelectorAll(".ticker-list__item"),
    tickerPrevBtn: document.querySelector(".ticker-buttons__btn-prev"),
    tickerNextBtn: document.querySelector(".ticker-buttons__btn-next"),
    tabHeaderItems: document.querySelectorAll(".tab-header__item"),
    tabIndicator: document.querySelector(".tab-indicator"),
    tabContents: document.querySelectorAll(".tab-body__content")
}

let _tickerCounter = 0, _tickerInterval;

_elements.tickerPrevBtn.addEventListener("click", () => {
    updateTicker(-1);
    clearInterval(_tickerInterval);
    refreshTicker();
});

_elements.tickerNextBtn.addEventListener("click", () => {
    updateTicker(1);
    clearInterval(_tickerInterval);
    refreshTicker();
});

_elements.tabHeaderItems.forEach((item, key) => {
    item.addEventListener("click", () => {
        _elements.tabIndicator.style.left = `${item.offsetLeft}px`;

        _elements.tabContents.forEach(content => {
            content.classList.remove("tab-body__content--active");
        });

        _elements.tabContents[key].classList.add("tab-body__content--active");
    });
});

const updateTicker = (value) => {
    const totalTickerItems = _elements.tickerItems.length;
    _tickerCounter += value;

    if(_tickerCounter >= totalTickerItems)
        _tickerCounter = 0;
    else if(_tickerCounter < 0)
        _tickerCounter = totalTickerItems - 1;

    for(item of _elements.tickerItems) {
        item.classList.remove("ticker-list__item--show");
    }

    _elements.tickerItems[_tickerCounter].classList.add("ticker-list__item--show");
}

const refreshTicker = () => {
    _tickerInterval = setInterval(() => {
        updateTicker(1);
    }, 5000);
}

refreshTicker();

var splide = new Splide( ".splide", {
    type: "loop",
    autoplay: true,
    cover: true,
    heightRatio: .75,
    mediaQuery: "min",
    breakpoints: {
        600: {
            width: "42rem"
        }
    }
});
splide.mount();
