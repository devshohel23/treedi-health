


document.addEventListener("DOMContentLoaded", function () {

	const menuBtn = document.getElementById("menuBtn");
	const sidebar = document.getElementById("sidebar");
	const overlay = document.getElementById("overlay");
	const closeBtn = document.getElementById("closeBtn");
	const sidebarLinks = document.querySelectorAll("#sidebar a");

	menuBtn.addEventListener("click", () => {
		sidebar.classList.add("active");
		overlay.classList.add("active");
	});

	closeBtn.addEventListener("click", closeSidebar);
	overlay.addEventListener("click", closeSidebar);

	// Close sidebar when clicking any link
	sidebarLinks.forEach(link => {
		link.addEventListener("click", closeSidebar);
	});

	function closeSidebar(){
		sidebar.classList.remove("active");
		overlay.classList.remove("active");
	}



	const faqItems = document.querySelectorAll(".faq-item");

		faqItems.forEach(item => {

		const header = item.querySelector(".faq-header");

		header.addEventListener("click", () => {

		faqItems.forEach(el=>{
		if(el !== item){
		el.classList.remove("active");
		}
		});

		item.classList.toggle("active");

		});

	});




});


