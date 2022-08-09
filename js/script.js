

(function() {
	'use strict';
	let isTouch, isDesktop;
	common();
	
	document.addEventListener('DOMContentLoaded', onLoaded, false);
	
	function common() {
		const doc = document.documentElement;
		isDesktop = window.matchMedia('(min-width: 768px)').matches;
		if (window.innerWidth !== doc.clientWidth) { doc.classList.add('hasScrollbar'); }
	}
	
	function onLoaded() {
		// console.log('onLoaded');
		const fns = [setInview, navToggle, buttonMotion];
		imagesLoaded('.l-main').on('always', function() {
			//console.log('imagesLoaded');
			for (let i = 0, len = fns.length; i < len; i++) {
				fns[i]();
			}
			if (!isTouch) ;
		}, false);
	}
	
/*** buttonMotion
	 -------------------------------------------------- */
	function buttonMotion() {
		if (document.querySelectorAll('.js-hov') !== null) {
			bm();
		}
	}
	const bm = {
		function() {
			const btn = document.querySelectorAll('.js-hov');
			for (let i = btn.length; i--;) {
				this.addEvent(btn[i]);
			}
		},
		addEvent: function(btn) {
			//document.body.addEventListener('mousemove', this.mouseMove);
			btn.addEventListener('mouseenter', this.mouseEnter, false);
			btn.addEventListener('mouseleave', this.mouseLeave, false);
			btn.addEventListener('transitionend', this.transitionEnd, false);
		},
		mouseMove: function(e) {
			if (bm.curButton !== null) {
				const cx = bm.curButton.rect.x + bm.curButton.rect.width / 2;
				const cy = window.pageYOffset + bm.curButton.rect.y + bm.curButton.rect.height / 2;
				const x = e.pageX - cx;
				const y = e.pageY - cy;
				bm.curButton.elm.style.transform = 'translate(' + x + 'px,' + y + 'px)';
			}
		},
		mouseEnter: function(e) {
			const t = this.parentNode.classList.contains('visual_scroll') ? this.parentNode : this;
			t.classList.add('anima');
			t.classList.add('hov');
			bm.curButton = {
				elm: this,
				rect: this.getBoundingClientRect(),
			}
		},
		mouseLeave: function(e) {
			const t = this.parentNode.classList.contains('visual_scroll') ? this.parentNode : this;
			t.classList.add('anima');
			t.classList.remove('hov');
			bm.curButton = null;
		},
		transitionEnd: function(e) {
			//console.log(e);
			const t = this.parentNode.classList.contains('visual_scroll') ? this.parentNode : this;
			if (this.className.indexOf('js-hov') > 0) {
				t.classList.remove('anima');
			}
		},
	};
	
/*navToggle
	 * -------------------------------------------------- */
	function navToggle() {
		if (document.querySelector('.menu-button') !== null) {
			nt.constructor();
		}
	}
	const nt = {
		constructor: function() {
			this.isActive = false;
			this.nav = document.querySelector('.l-menu');
			this.trigger = document.querySelector('.menu-button');
			
			const trigger = document.querySelectorAll('.menu-button, .menu_overlay');
			for (let i = 0, len = trigger.length; i < len; i++) {
				trigger[i].removeEventListener('click', this.onClick, false);
				trigger[i].addEventListener('click', this.onClick, false);
			}
			this.nav.addEventListener('transitionend', this.navAnimaEnd, false);
			this.trigger.addEventListener('transitionend', this.triggerAnimaEnd, false);
		},
		onClick: function() {
			this.classList.add('anima');
			this.classList.add('is-active');
			!nt.isActive ? nt.openMenu() : nt.closeMenu();
		},
		openMenu: function() {
			this.isOpen = true;
			this.nav.classList.add('anima');
			this.nav.classList.add('is-active');
			this.isActive = true;
		},
		closeMenu: function() {
			
			this.isOpen = false;
			this.trigger.classList.add('anima');
			this.trigger.classList.remove('is-active');
			this.nav.classList.add('anima');
			this.nav.classList.remove('is-active');
			this.isActive = false;
		},
		navAnimaEnd: function(e) {
			if (e.propertyName === 'transform') {
				this.classList.remove('anima');
			}
		},
		triggerAnimaEnd: function(e) {
			if (e.propertyName === 'color') {
				this.classList.remove('anima');
			}
		},
	};
	
	
	/**
	 * setInview()
	 * in-view
	 * -------------------------------------------------- */
	function setInview() {
		if (document.querySelector('.js-inview') !== null) {
			inview.constructor();
			document.documentElement.classList.add('active-inview');
		}
	}
	const inview = {
		constructor: function() {
			const target = isTouch ? '.js-inview, .service_section .title, .service_section p, .service_figure, .report dt, .report dd' : '.js-inview';
			inView(target).on('enter', this.isInview).check();
			inView.offset({ top: 80, right: 0, bottom: 0, left: 0 });
			const inviewElms = document.querySelectorAll('.js-inview');
			for (let i = 0, len = inviewElms.length; i < len; i++) {
				inviewElms[i]['isAnimated'] = false;
				inviewElms[i].addEventListener('transitionend', this.animaEnd);
			}
		},
		isInview: function(el) {
			if (!el['isAnimated']) el.classList.add('is-anima');
			el.classList.add('is-inview');
		},
		animaEnd: function(e) {
			if (!e.target.closest('.js-inview')['isAnimated']) {
				let elm = e.target.closest('.js-inview');
				let timer = 100;
				if (elm.getAttribute('class').indexOf('steps_flow') !== -1) {
					timer = 600;
				}
				if (elm.getAttribute('class').indexOf('service_anchor') !== -1) {
					timer = 400;
				}
				elm['isAnimated'] = true;
				setTimeout(function() {
					elm.classList.remove('is-anima');
				}, timer);
			}
		},
	};
	/**-------------------------------------------------- */
	const resized = function(fn) {
		if (resized.timer !== false) clearTimeout(resized.timer);
		resized.timer = setTimeout(fn, 1);
	};
})();

/*-swiper------------------------------------------------- */

	let products_swiper = new Swiper(".js-products-slider", {
		loop: !0,
		speed: 600,
		navigation: {
			nextEl: ".swiper-button-next",
			prevEl: ".swiper-button-prev"
		},
		pagination: {
			el: ".swiper-pagination",
			clickable: !0
		},
		slidesPerView: 1,
		spaceBetween: 0,
		centeredSlides: !0,
		breakpoints: {
			960: {
				slidesPerView: "auto",
				spaceBetween: 100
			},
			475: {
				slidesPerView: 1,
				centeredSlides : true
			}
		}
	})

let exhibi_swiper = new Swiper(".exhibi", {
		loop: 0,
		speed: 600,
		navigation: {
			nextEl: ".swiper-button-next",
			prevEl: ".swiper-button-prev"
		},
		// pagination: {
		// 	el: ".swiper-pagination",
		// 	type: "progressbar"
		// },
	
		slidesPerView: "auto",
		spaceBetween: 0,
		// breakpoints: {
		// 	960: {}
	
		// }
	})
	

var ScrollActive = window['ScrollActive'];

new ScrollActive({
    wrapper: document.querySelector('.p-top-enjoy__nav'),
	activeClass: 'active',
    offset: 30,
    hash: true,

});	


//footertop

var scrollTop_btn = document.getElementsByClassName('l-footer__pagetop ')[0];
      scrollTop_btn.addEventListener("click",function(){
        window.scrollTo({top:0, left:0, behavior:'smooth'});

      })