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