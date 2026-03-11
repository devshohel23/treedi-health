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

				const swipeBtn = document.querySelector(".treedi-swipe-btn");

				const chatbox = document.querySelector(".treedi-chatbox");
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
				connecting.classList.remove("active");

				overlay.classList.remove("active");

				unlockBody();

				}

				closeBtns.forEach(btn=>{
				btn.addEventListener("click", closeModal);
				});

				overlay.addEventListener("click", closeModal);


				/* ===============================
				ENABLE BUTTON AFTER CHECKBOX
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
				START CONSULT BUTTON (IOS SAFE)
				================================ */

				let consultStarted = false;

				function startConsult(e){

				if(consultStarted) return;

				consultStarted = true;

				popup.classList.remove("active");

				connecting.classList.add("active");
				overlay.classList.add("active");

				lockBody();

				setTimeout(()=>{

				connecting.classList.remove("active");
				chatbox.classList.add("active");

				consultStarted = false;

				},2000);

				}


				/* click support */
				swipeBtn.addEventListener("click", startConsult);

				/* iOS touch support */
				swipeBtn.addEventListener("touchend", startConsult);




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







