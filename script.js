let objects = document.querySelectorAll('.item_con', '.main_con');
let active = 6;
let StartingTouch = 0;
let isTouching = 'ontouchstart' in window; //touch enable for smartphones/tablets

// Function to handle updating the view based on active index
function viewContent() {
    objects[active].style.zIndex = 1;
    objects[active].style.opacity = 3;
    objects[active].style.transform = 'none';
    objects[active].style.filter = 'none';

    let start = 0;
    for (var i = active + 1; i < objects.length; i++) {
        start++;
        objects[i].style.transform = `translatey(${135 * start}px) scale(${1 - 0.3 * start}) perspective(17px)`;
        objects[i].style.zIndex = -start;
        objects[i].style.opacity = start > 2 ? 0 : 0.6;
        objects[i].style.filter = 'blur(3px)';
    }

    start = 0;
    for (var i = (active - 1); i >= 0; i--) {
        start++;
        objects[i].style.transform = `translatey(${-135 * start}px) scale(${1 - 0.3 * start}) perspective(17px)`;
        objects[i].style.zIndex = -start;
        objects[i].style.filter = 'blur(3px)';
        objects[i].style.opacity = start > 2 ? 0 : 0.6;
    }
}

// Function for handling scroll events on Windows (mouse wheel)
function handleWhell(event) {
    if (event.deltaY > 0) {
        if (active < objects.length - 1) {
            active++;
        }
    } else if (event.deltaY < 0) {
        if (active > 0) {
            active--;
        }
    }
    viewContent();
}

// Handling the first touch event (for touch devices)
function handleTouchFirst(event) {
    StartingTouch = event.touches[0].clientY;
}

// Handling touch move event
function handleTouchMove(event) {
    if (!StartingTouch) return;

    let touchLast = event.touches[0].clientY;
    let touchGap = StartingTouch - touchLast;

    if (touchGap > 0) {
        if (active < objects.length - 1) {
            active++;
        }
    } else if (touchGap < 0) {
        if (active > 0) {
            active--;
        }
    }
    viewContent();
    StartingTouch = touchLast; // tracking of touch of fingers
}

// Add mouse click event for scrolling down (only single click)
function handleMouseClick(event) {
    if (event.button === 0) { // Left mouse button
        // Handle single-click (scroll down)
        if (active < objects.length - 1) {
            active++;
        }
        viewContent();
    }
}

// Check if the device supports touch
if (isTouching) {
    window.addEventListener('touchstart', handleTouchFirst); // Detect touch start for smartphones/tablets
    window.addEventListener('touchmove', handleTouchMove); // Detect touch move
} else {
    window.addEventListener('wheel', handleWhell); // Mouse wheel scroll event for Windows
    window.addEventListener('mousedown', handleMouseClick); // Left mouse click event to scroll down
}

viewContent();
