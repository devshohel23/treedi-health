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
	});

	overlay.addEventListener("click", closeSidebar);

	if(closeBtn){
		closeBtn.addEventListener("click", closeSidebar);
	}

	/* Close sidebar when clicking any link */
	sidebarLinks.forEach(link => {
		link.addEventListener("click", () => {
			closeSidebar();
		});
	});

	function closeSidebar(){
		sidebar.classList.remove("active");
		overlay.classList.remove("active");
		menuBtn.classList.remove("active");
	}

});