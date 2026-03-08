


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
	closeBtn.addEventListener("click", closeSidebar);

	sidebarLinks.forEach(link=>{
	link.addEventListener("click", closeSidebar);
	});

	function closeSidebar(){
	sidebar.classList.remove("active");
	overlay.classList.remove("active");
	menuBtn.classList.remove("active");
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


