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
			const triggers = document.querySelectorAll(".treedi-consult-trigger");
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

				function lockBody(){

				document.body.classList.add("treedi-lock");

				}

				function unlockBody(){

				document.body.classList.remove("treedi-lock");

			}

			/* ===============================
			OPEN POPUP
			================================ */
			triggers.forEach(trigger=>{
			trigger.addEventListener("click", () => {

				popup.classList.add("active");
				overlay.classList.add("active");

				lockBody();

				});
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
			SWIPE SYSTEM (SMOOTH FIX)
			================================ */

			let startX = 0;
			let currentX = 0;
			let maxMove = 0;
			let dragging = false;


			/* SWIPE START */

			swipe.addEventListener("touchstart", startSwipe, {passive:true});
			swipe.addEventListener("mousedown", startSwipe);

			function startSwipe(e){

			dragging = true;

			startX = e.touches ? e.touches[0].clientX : e.clientX;

			maxMove = swipeBtn.offsetWidth - swipe.offsetWidth - 8;

			document.addEventListener("touchmove", moveSwipe, {passive:true});
			document.addEventListener("mousemove", moveSwipe);

			document.addEventListener("touchend", endSwipe);
			document.addEventListener("mouseup", endSwipe);

			}


			/* SWIPE MOVE */

			function moveSwipe(e){

			if(!dragging) return;

			let x = e.touches ? e.touches[0].clientX : e.clientX;

			let move = x - startX;

			/* clamp movement */

			if(move < 0) move = 0;
			if(move > maxMove) move = maxMove;

			currentX = move;

			/* GPU smooth movement */

			swipe.style.transform = `translate3d(${move}px,0,0)`;

			/* fade text */

			let progress = move / maxMove;

			swipeText.style.opacity = 1 - progress;

			}


			/* SWIPE END */

			function endSwipe(){

			if(!dragging) return;

			dragging = false;

			/* success swipe */

			if(currentX > maxMove * 0.65){

			popup.classList.remove("active");

			connecting.classList.add("active");
			overlay.classList.add("active");

			lockBody();

			setTimeout(()=>{

			connecting.classList.remove("active");
			chatbox.classList.add("active");

			},2000);

			}


			/* reset swipe */

			swipe.style.transform = "translate3d(0,0,0)";
			swipeText.style.opacity = "1";

			currentX = 0;


			/* remove listeners */

			document.removeEventListener("touchmove", moveSwipe);
			document.removeEventListener("mousemove", moveSwipe);

			document.removeEventListener("touchend", endSwipe);
			document.removeEventListener("mouseup", endSwipe);

			}


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




			// Handle input height when multipole text line in chat
			// handle submit button action 
			const textarea = document.querySelector(".chat-input-text");

			textarea.addEventListener("input", function(){

			this.style.height = "auto";

			let newHeight = this.scrollHeight;

			if(newHeight > 120){
			newHeight = 120;
			}

			this.style.height = newHeight + "px";

			});
			

			const sendBtn = document.querySelector(".chat-send-btn");

			textarea.addEventListener("input", function(){

			let value = textarea.value.trim();

			if(value.length > 0){

			sendBtn.disabled = false;
			sendBtn.classList.add("active");

			}else{

			sendBtn.disabled = true;
			sendBtn.classList.remove("active");

			}

			});







