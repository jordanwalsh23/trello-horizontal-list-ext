var currentState = "disabled";
var debugHorizontal = false;
var loaded = false;

var toggleLink = document.createElement('a');
toggleLink.id = "toggle-link";
toggleLink.href = "#";
toggleLink.classList.add("board-header-btn", "board-header-btn-without-icon", "board-header-btn-text");
toggleLink.innerText = "Toggle Horizontal View";

toggleLink.onclick = function() {

    if (document.querySelector("#board").classList.contains('side-toggled')) {
        //disable
        currentState = "disabled";
        disableHorizontalView();
        saveState('disabled');
    } else {
        //enable
        currentState = "enabled";
        enableHorizontalView();
        saveState('enabled');
    }

    //trigger the changes to take place.
    document.querySelector("#board").offsetHeight;

}

function saveState(state) {

    var boardName = window.location.pathname.replace(/\//g, '-');

    chrome.storage.sync.get(['state'], function(result) {
        debugHorizontal && console.log('Saved value currently is: ', result);

        if (!result || !result.state) {
            result = {
                state: {}
            };
        }

        result.state[boardName] = state;

        debugHorizontal && console.log('Updated to: ', result);

        chrome.storage.sync.set(result, function() {
            // Notify that we saved.
            debugHorizontal && console.log('Settings saved');
        });
    });
}

function disableHorizontalView() {
    document.querySelector("#board").classList.remove("side-toggled");

    document.querySelectorAll(".list-wrapper").forEach(function(obj) {
        obj.classList.remove("side-toggled");
    });

    document.querySelectorAll(".list").forEach(function(obj) {
        obj.classList.remove("side-toggled");
    });

    document.querySelectorAll(".list-cards").forEach(function(obj) {
        obj.classList.remove("side-toggled");
        obj.onblur = false;
    });

    document.querySelectorAll(".list-card").forEach(function(obj) {
        obj.classList.remove("side-toggled");
    });
}

function enableHorizontalView() {
    document.querySelector("#board").classList.add("side-toggled");

    document.querySelectorAll(".list-wrapper").forEach(function(obj) {
        obj.classList.add("side-toggled");
    });

    document.querySelectorAll(".list").forEach(function(obj) {
        obj.classList.add("side-toggled");
    });

    document.querySelectorAll(".list-cards").forEach(function(obj) {
        obj.classList.add("side-toggled");
    });

    document.querySelectorAll(".list-card").forEach(function(obj) {
        obj.classList.add("side-toggled");
    });
}

window.setInterval(function() {

    var path = window.location.pathname;

    if (path.startsWith("/b")) {
        //We are on a board, check if the button is there

        if (!document.getElementById('toggle-link')) {

            //We are in a new board.

            var boardName = window.location.pathname.replace(/\//g, '-');

            debugHorizontal && console.log('boardName:', boardName);

            //Add the button
            var boardHeaderBtns = document.querySelector(".board-header-btns");

            if (boardHeaderBtns) {
                loaded = true;
                boardHeaderBtns.append(toggleLink);
                //chrome.storage.sync.remove(['state']);

                //Get the state from memory
                chrome.storage.sync.get(['state'], function(result) {
                    debugHorizontal && console.log('Value currently is ', result);

                    currentState = result.state[boardName];
                });
            } else {
                loaded = false;
            }
        }

        debugHorizontal && console.log('Current State for this board is: ', currentState);

        if (!loaded) {
            return false;
        }

        if (currentState == "disabled") {
            disableHorizontalView();
            return false;
        }

        if (currentState == "enabled") {
            enableHorizontalView();
            //trigger the changes to take place.
            document.querySelector("#board").offsetHeight;
        }
    }

}, 100);