const faqItems = document.querySelectorAll(".faq-item");

			faqItems.forEach(item => {

				const header = item.querySelector(".faq-header");

				if(header){   // prevent errors if element missing
					header.addEventListener("click", () => {

						faqItems.forEach(el=>{
							if(el !== item){
								el.classList.remove("active");
							}
						});

						item.classList.toggle("active");

					});
				}

			});

			
			const stickyBtn = document.getElementById("stickyBtn");

				window.addEventListener("scroll", () => {

				if(window.scrollY > 600){
					stickyBtn.classList.add("active");
				}else{
					stickyBtn.classList.remove("active");
				}
			});



			/* ===============================
			ELEMENTS
			================================ */

			const popup = document.querySelector(".treedi-consult-popup");
			const overlay = document.querySelector(".treedi-consult-overlay");
			const trigger = document.getElementById("treedi-consult-trigger");
			const closeBtns = document.querySelectorAll(".consult-modal-close");

			const swipe = document.querySelector(".treedi-swipe-handle");
			const swipeBtn = document.querySelector(".treedi-swipe-btn");

			const chatbox = document.querySelector(".treedi-chatbox");
			const swipeText = document.querySelector(".treedi-swipe-text");
			const connecting = document.querySelector(".treedi-connecting");

			const checkBox = document.getElementById("treedi-check");


			/* ===============================
			SCROLL LOCK
			================================ */

			let scrollPosition = 0;

			function lockBody(){

			scrollPosition = window.scrollY || window.pageYOffset;

			document.body.style.top = `-${scrollPosition}px`;
			document.body.classList.add("treedi-lock");

			}

			function unlockBody(){

			const scrollY = document.body.style.top;

			document.body.classList.remove("treedi-lock");
			document.body.style.top = "";

			window.scrollTo(0, parseInt(scrollY || "0") * -1);

			}


			/* ===============================
			OPEN POPUP
			================================ */

			trigger.addEventListener("click", () => {

			popup.classList.add("active");
			overlay.classList.add("active");

			lockBody();

			});


			/* ===============================
			CLOSE MODAL
			================================ */

			function closeModal(){

			popup.classList.remove("active");
			chatbox.classList.remove("active");

			overlay.classList.remove("active");

			unlockBody();

			}

			closeBtns.forEach(btn=>{
			btn.addEventListener("click", closeModal);
			});

			overlay.addEventListener("click", closeModal);


			/* ===============================
			CHECKBOX ENABLE SWIPE
			================================ */

			swipeBtn.style.opacity = "0.4";
			swipeBtn.style.pointerEvents = "none";

			checkBox.addEventListener("change", () => {

			if(checkBox.checked){

			swipeBtn.style.opacity = "1";
			swipeBtn.style.pointerEvents = "auto";

			}else{

			swipeBtn.style.opacity = "0.4";
			swipeBtn.style.pointerEvents = "none";

			}

			});


			/* ===============================
			SWIPE SYSTEM
			================================ */

			let startX = 0;
			let currentX = 0;
			let maxMove = 0;
			let raf = null;


			/* SWIPE START */

			swipe.addEventListener("touchstart",(e)=>{

			startX = e.touches[0].clientX;

			maxMove = swipeBtn.offsetWidth - swipe.offsetWidth - 8;

			},{passive:true});


			/* SWIPE MOVE */

			swipe.addEventListener("touchmove",(e)=>{

			let move = e.touches[0].clientX - startX;

			if(move < 0) move = 0;
			if(move > maxMove) move = maxMove;

			currentX = move;

			if(!raf){

			raf = requestAnimationFrame(updateSwipe);

			}

			},{passive:true});


			function updateSwipe(){

			swipe.style.transform = `translateX(${currentX}px)`;

			let progress = currentX / maxMove;

			swipeText.style.transform = `translate(calc(-50% - ${currentX * 0.3}px),0)`;

			swipeText.style.opacity = 1 - progress;

			raf = null;

			}


			/* SWIPE END */

			swipe.addEventListener("touchend",()=>{

			if(currentX > maxMove * 0.6){

			popup.classList.remove("active");

			connecting.classList.add("active");
			overlay.classList.add("active");

			lockBody();

			setTimeout(()=>{

			connecting.classList.remove("active");
			chatbox.classList.add("active");

			},2000);

			}

			/* reset */

			swipe.style.transform = "translateX(0)";
			swipeText.style.transform = "translate(-50%,0)";
			swipeText.style.opacity = "1";

			currentX = 0;

			});




			/* ===============================
			STRONG IOS ZOOM BLOCK
			================================ */

			let lastTouchEnd = 0;

			/* block pinch gestures */
			['gesturestart','gesturechange','gestureend'].forEach(event => {
			document.addEventListener(event, e => {
				e.preventDefault();
			});
			});

			document.addEventListener('touchstart', function(e){
			if(e.touches.length > 1){
				e.preventDefault();
			}
			}, { passive:false });

			document.addEventListener('touchmove', function(e){
			if(e.scale && e.scale !== 1){
				e.preventDefault();
			}
			}, { passive:false });

			document.addEventListener('touchend', function(e){

			const now = Date.now();

			if(now - lastTouchEnd <= 300){
				e.preventDefault();
			}

			lastTouchEnd = now;

			}, false);

			window.addEventListener("resize", () => {
			document.documentElement.style.zoom = "1";
			});
