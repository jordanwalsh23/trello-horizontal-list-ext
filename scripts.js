var toggleBtn = document.createElement('button');
toggleBtn.id = "toggle-btn";
toggleBtn.innerText = "Toggle Horizontal View";

toggleBtn.onclick = function() {

    if (document.querySelector("#board").classList.contains('side-toggled')) {
        //disable
        disableHorizontalView();
        saveState('disabled');

    } else {
        //enable
        enableHorizontalView();
        saveState('enabled');

    }

    //trigger the changes to take place.
    document.querySelector("#board").offsetHeight;

}

function saveState(state) {

    var boardName = window.location.pathname.replace(/\//g, '-');

    chrome.storage.sync.get(['state'], function(result) {
        console.log('Saved value currently is: ', result);

        if (!result || !result.state) {
            result = {
                state: {}
            };
        }

        result.state[boardName] = state;

        console.log('Updated to: ', result);

        chrome.storage.sync.set(result, function() {
            // Notify that we saved.
            console.log('Settings saved');
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

        if (!document.getElementById('toggle-btn')) {

            //We are in a new board.

            var boardName = window.location.pathname.replace(/\//g, '-');

            console.log('boardName:', boardName);

            //Add the button
            document.querySelector(".board-header-btns").append(toggleBtn);

            //chrome.storage.sync.remove(['state']);

            //Get the state from memory
            chrome.storage.sync.get(['state'], function(result) {
                console.log('Value currently is ', result);

                var thisState = result.state[boardName];

                if (thisState == "enabled") {
                    enableHorizontalView();
                    //trigger the changes to take place.
                    document.querySelector("#board").offsetHeight;
                }
            });
        }


    }


}, 2000);