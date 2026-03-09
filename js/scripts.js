document.addEventListener("DOMContentLoaded", function () {

const menuBtn = document.getElementById("menuBtn");
const sidebar = document.getElementById("sidebar");
const overlay = document.getElementById("overlay");
const closeBtn = document.getElementById("closeBtn");
const sidebarLinks = document.querySelectorAll("#sidebar a");

menuBtn.addEventListener("click", () => {
    sidebar.classList.toggle("active");
    overlay.classList.toggle("active");
    menuBtn.classList.toggle("active");
    document.body.classList.toggle("no-scroll");
});

overlay.addEventListener("click", closeSidebar);

if (closeBtn) {
    closeBtn.addEventListener("click", closeSidebar);
}

sidebarLinks.forEach(link => {
    link.addEventListener("click", closeSidebar);
});

function closeSidebar() {
    sidebar.classList.remove("active");
    overlay.classList.remove("active");
    menuBtn.classList.remove("active");
    document.body.classList.remove("no-scroll");
}





});