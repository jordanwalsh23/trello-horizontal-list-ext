var toggleBtn = document.createElement('button');
toggleBtn.id = "toggle-btn";
toggleBtn.innerText = "Toggle Horizontal View";

toggleBtn.onclick = function() {

    if (document.querySelector("#board").classList.contains('side-toggled')) {
        //disable
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

    } else {
        //enable
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
    document.querySelector("#board").offsetHeight;

}

window.setInterval(function() {
    if (!document.getElementById('toggle-btn')) {
        document.querySelector(".board-header-btns").append(toggleBtn)
    }
}, 2000);