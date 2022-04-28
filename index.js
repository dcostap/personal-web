function isElementInViewport (el) {

    // Special bonus for those using jQuery
    if (typeof jQuery === "function" && el instanceof jQuery) {
        el = el[0];
    }

    var rect = el.getBoundingClientRect();

    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) + 200 && /* or $(window).height() */
        rect.right <= (window.innerWidth || document.documentElement.clientWidth) + 200 /* or $(window).width() */
    );
}

// Check if it's time to start the animation.
function checkAnimation() {
    var $elem = $('.in-left');

    // If the animation has already been started
    if ($elem.hasClass('start')) return;

    if (isElementInViewport($elem)) {
        // Start the animation
        $elem.addClass('start');
        console.log("start");
    }
}

// Capture scroll events
$(window).scroll(function(){
    checkAnimation();
});


window.addEventListener('DOMContentLoaded', (event) => {
    const observer = new MutationObserver(list => {
        const evt = new CustomEvent('dom-changed', { detail: list });
        document.documentElement.dispatchEvent(evt)
    });
    observer.observe(document.documentElement, { attributes: true, childList: true, subtree: true });

    document.documentElement.addEventListener("dom-changed", e => console.log(e));

    updateTheme();
})

function updateTheme() {
    // check for the OS theme setting
    let systemInitiatedDark = window.matchMedia("(prefers-color-scheme: light)");

    // setting that overrides OS theme, so user can change it
    let theme = sessionStorage.getItem('theme');

    if ((theme != null && theme == "dark") || (theme == null && systemInitiatedDark.matches)) {
        document.getElementsByTagName("html")[0].setAttribute("data-theme", "dark");
        sessionStorage.setItem('theme', 'dark');
    } else {
        document.getElementsByTagName("html")[0].setAttribute("data-theme", "light");
        sessionStorage.setItem('theme', 'light');
    }

    // if the OS changes theme, we override any configuration to match it
    systemInitiatedDark.addListener(function () {
        sessionStorage.clear();
        updateTheme();
    });
}

function themeSwitcher() {
    let theme = sessionStorage.getItem('theme');
    if (theme == null || theme == "light")
        sessionStorage.setItem('theme', 'dark');
    else
        sessionStorage.setItem('theme', 'light');

    updateTheme();
}