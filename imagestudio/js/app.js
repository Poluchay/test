var ua = window.navigator.userAgent;
var msie = ua.indexOf("MSIE ");
var isMobile = {
	Android: function () {
		return navigator.userAgent.match(/Android/i);
	},
	BlackBerry: function () {
		return navigator.userAgent.match(/BlackBerry/i);
	},
	iOS: function () {
		return navigator.userAgent.match(/iPhone|iPad|iPod/i);
	},
	Opera: function () {
		return navigator.userAgent.match(/Opera Mini/i);
	},
	Windows: function () {
		return navigator.userAgent.match(/IEMobile/i);
	},
	any: function () {
		return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
	}
};

function isIE() {
	ua = navigator.userAgent;
	var is_ie = ua.indexOf("MSIE ") > -1 || ua.indexOf("Trident/") > -1;
	return is_ie;
}
if (isIE()) {
	document.querySelector('html').classList.add('ie');
}
if (isMobile.any()) {
	document.querySelector('html').classList.add('_touch');
}

function ibg() {
	if (isIE()) {
		let ibg = document.querySelectorAll("._ibg");
		for (var i = 0; i < ibg.length; i++) {
			if (ibg[i].querySelector('img') && ibg[i].querySelector('img').getAttribute('src') != null) {
				ibg[i].style.backgroundImage = 'url(' + ibg[i].querySelector('img').getAttribute('src') + ')';
			}
		}
	}
}
ibg();

let unlock = true;

//=================
//ActionsOnHash
if (location.hash) {
	const hsh = location.hash.replace('#', '');
	if (document.querySelector('.popup_' + hsh)) {
		popup_open(hsh);
	} else if (document.querySelector('div.' + hsh)) {
		_goto(document.querySelector('.' + hsh), 500, '');
	}
}
//=================
//Menu
let iconMenu = document.querySelector(".icon-menu");
if (iconMenu != null) {
	let delay = 500;
	let menuBody = document.querySelector(".nav__body");
	iconMenu.addEventListener("click", function (e) {
		if (unlock) {
			body_lock(delay);
			iconMenu.classList.toggle("_active");
			menuBody.classList.toggle("_active");
			let subMenuShow = menuBody.querySelectorAll("._show");
			for (let i = 0; i < subMenuShow.length; i++) {
				subMenuShow[i].classList.remove('_show');
			}
		}
	});
};

function menu_close() {
	let iconMenu = document.querySelector(".icon-menu");
	let menuBody = document.querySelector(".nav__body");
	iconMenu.classList.remove("_active");
	menuBody.classList.remove("_active");

}
//=================
//BodyLock
function body_lock(delay) {
	let body = document.querySelector("body");
	if (body.classList.contains('_lock')) {
		body_lock_remove(delay);
	} else {
		body_lock_add(delay);
	}
}

function body_lock_remove(delay) {
	let body = document.querySelector("body");
	if (unlock) {
		let lock_padding = document.querySelectorAll("._lp");
		setTimeout(() => {
			for (let index = 0; index < lock_padding.length; index++) {
				const el = lock_padding[index];
				el.style.paddingRight = '0px';
			}
			body.style.paddingRight = '0px';
			body.classList.remove("_lock");
		}, delay);

		unlock = false;
		setTimeout(function () {
			unlock = true;
		}, delay);
	}
}

function body_lock_add(delay) {
	let body = document.querySelector("body");
	if (unlock) {
		let lock_padding = document.querySelectorAll("._lp");
		for (let index = 0; index < lock_padding.length; index++) {
			const el = lock_padding[index];
			el.style.paddingRight = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';
		}
		body.style.paddingRight = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';
		body.classList.add("_lock");

		unlock = false;
		setTimeout(function () {
			unlock = true;
		}, delay);
	}
}
//=================

//=================
/*
?????? ???????????????? ?????????????????? ?????????? ?????????????? data-spollers
?????? ???????????????????? ?????????????????? ?????????? ?????????????? data-spoller
???????? ?????????? ????????????????\?????????????????? ???????????? ?????????????????? ???? ???????????? ???????????????? ??????????????
?????????? ?????????????????? ???????????? ?? ???????? ??????????????????????.
????????????????: 
data-spollers="992,max" - ???????????????? ?????????? ???????????????? ???????????? ???? ?????????????? ???????????? ?????? ?????????? 992px
data-spollers="768,min" - ???????????????? ?????????? ???????????????? ???????????? ???? ?????????????? ???????????? ?????? ?????????? 768px

???????? ?????????? ?????? ???? ?? ?????????? ???????????????????? ???????????? ???????? ?????????????? ?????????????????? ?????????????? data-one-spoller
*/

// SPOLLERS
const spollersArray = document.querySelectorAll('[data-spollers]');
if (spollersArray.length > 0) {
	// ?????????????????? ?????????????? ??????????????????
	const spollersRegular = Array.from(spollersArray).filter(function (item, index, self) {
		return !item.dataset.spollers.split(",")[0];
	});
	// ?????????????????????????? ?????????????? ??????????????????
	if (spollersRegular.length > 0) {
		initSpollers(spollersRegular);
	}

	// ?????????????????? ?????????????????? ?? ?????????? ??????????????????
	const spollersMedia = Array.from(spollersArray).filter(function (item, index, self) {
		return item.dataset.spollers.split(",")[0];
	});

	// ?????????????????????????? ?????????????????? ?? ?????????? ??????????????????
	if (spollersMedia.length > 0) {
		const breakpointsArray = [];
		spollersMedia.forEach(item => {
			const params = item.dataset.spollers;
			const breakpoint = {};
			const paramsArray = params.split(",");
			breakpoint.value = paramsArray[0];
			breakpoint.type = paramsArray[1] ? paramsArray[1].trim() : "max";
			breakpoint.item = item;
			breakpointsArray.push(breakpoint);
		});

		// ???????????????? ???????????????????? ??????????????????????
		let mediaQueries = breakpointsArray.map(function (item) {
			return '(' + item.type + "-width: " + item.value + "px)," + item.value + ',' + item.type;
		});
		mediaQueries = mediaQueries.filter(function (item, index, self) {
			return self.indexOf(item) === index;
		});

		// ???????????????? ?? ???????????? ????????????????????????
		mediaQueries.forEach(breakpoint => {
			const paramsArray = breakpoint.split(",");
			const mediaBreakpoint = paramsArray[1];
			const mediaType = paramsArray[2];
			const matchMedia = window.matchMedia(paramsArray[0]);

			// ?????????????? ?? ?????????????? ??????????????????
			const spollersArray = breakpointsArray.filter(function (item) {
				if (item.value === mediaBreakpoint && item.type === mediaType) {
					return true;
				}
			});
			// ??????????????
			matchMedia.addListener(function () {
				initSpollers(spollersArray, matchMedia);
			});
			initSpollers(spollersArray, matchMedia);
		});
	}
	// ??????????????????????????
	function initSpollers(spollersArray, matchMedia = false) {
		spollersArray.forEach(spollersBlock => {
			spollersBlock = matchMedia ? spollersBlock.item : spollersBlock;
			if (matchMedia.matches || !matchMedia) {
				spollersBlock.classList.add('_init');
				initSpollerBody(spollersBlock);
				spollersBlock.addEventListener("click", setSpollerAction);
			} else {
				spollersBlock.classList.remove('_init');
				initSpollerBody(spollersBlock, false);
				spollersBlock.removeEventListener("click", setSpollerAction);
			}
		});
	}
	// ???????????? ?? ??????????????????
	function initSpollerBody(spollersBlock, hideSpollerBody = true) {
		const spollerTitles = spollersBlock.querySelectorAll('[data-spoller]');
		if (spollerTitles.length > 0) {
			spollerTitles.forEach(spollerTitle => {
				if (hideSpollerBody) {
					spollerTitle.removeAttribute('tabindex');
					if (!spollerTitle.classList.contains('_active')) {
						spollerTitle.nextElementSibling.hidden = true;
					}
				} else {
					spollerTitle.setAttribute('tabindex', '-1');
					spollerTitle.nextElementSibling.hidden = false;
				}
			});
		}
	}

	function setSpollerAction(e) {
		const el = e.target;
		if (el.hasAttribute('data-spoller') || el.closest('[data-spoller]')) {
			const spollerTitle = el.hasAttribute('data-spoller') ? el : el.closest('[data-spoller]');
			const spollersBlock = spollerTitle.closest('[data-spollers]');
			const oneSpoller = spollersBlock.hasAttribute('data-one-spoller') ? true : false;
			if (!spollersBlock.querySelectorAll('._slide').length) {
				if (oneSpoller && !spollerTitle.classList.contains('_active')) {
					hideSpollersBody(spollersBlock);
				}
				spollerTitle.classList.toggle('_active');
				_slideToggle(spollerTitle.nextElementSibling, 500);
			}
			e.preventDefault();
		}
	}

	function hideSpollersBody(spollersBlock) {
		const spollerActiveTitle = spollersBlock.querySelector('[data-spoller]._active');
		if (spollerActiveTitle) {
			spollerActiveTitle.classList.remove('_active');
			_slideUp(spollerActiveTitle.nextElementSibling, 500);
		}
	}
}
//=================
//Popups
let popup_link = document.querySelectorAll('._popup-link');
let popups = document.querySelectorAll('.popup');
for (let index = 0; index < popup_link.length; index++) {
	const el = popup_link[index];
	el.addEventListener('click', function (e) {
		if (unlock) {
			let item = el.getAttribute('href').replace('#', '');
			let video = el.getAttribute('data-video');
			popup_open(item, video);
		}
		e.preventDefault();
	})
}
for (let index = 0; index < popups.length; index++) {
	const popup = popups[index];
	popup.addEventListener("click", function (e) {
		if (!e.target.closest('.popup__body')) {
			popup_close(e.target.closest('.popup'));
		}
	});
}

function popup_open(item, video = '') {
	let activePopup = document.querySelectorAll('.popup._active');
	if (activePopup.length > 0) {
		popup_close('', false);
	}
	let curent_popup = document.querySelector('.popup_' + item);
	if (curent_popup && unlock) {
		if (video != '' && video != null) {
			let popup_video = document.querySelector('.popup_video');
			popup_video.querySelector('.popup__video').innerHTML = '<iframe src="https://www.youtube.com/embed/' + video + '?autoplay=1"  allow="autoplay; encrypted-media" allowfullscreen></iframe>';
		}
		if (!document.querySelector('.menu__body._active')) {
			body_lock_add(500);
		}
		curent_popup.classList.add('_active');
		history.pushState('', '', '#' + item);
	}
}

function popup_close(item, bodyUnlock = true) {
	if (unlock) {
		if (!item) {
			for (let index = 0; index < popups.length; index++) {
				const popup = popups[index];
				let video = popup.querySelector('.popup__video');
				if (video) {
					video.innerHTML = '';
				}
				popup.classList.remove('_active');
			}
		} else {
			let video = item.querySelector('.popup__video');
			if (video) {
				video.innerHTML = '';
			}
			item.classList.remove('_active');
		}
		if (!document.querySelector('.menu__body._active') && bodyUnlock) {
			body_lock_remove(500);
		}
		history.pushState('', '', window.location.href.split('#')[0]);
	}
}
let popup_close_icon = document.querySelectorAll('.popup__close,._popup-close');
if (popup_close_icon) {
	for (let index = 0; index < popup_close_icon.length; index++) {
		const el = popup_close_icon[index];
		el.addEventListener('click', function () {
			popup_close(el.closest('.popup'));
		})
	}
}
document.addEventListener('keydown', function (e) {
	if (e.code === 'Escape') {
		popup_close();
	}
});

//=================
//SlideToggle
let _slideUp = (target, duration = 500) => {
	if (!target.classList.contains('_slide')) {
		target.classList.add('_slide');
		target.style.transitionProperty = 'height, margin, padding';
		target.style.transitionDuration = duration + 'ms';
		target.style.height = target.offsetHeight + 'px';
		target.offsetHeight;
		target.style.overflow = 'hidden';
		target.style.height = 0;
		target.style.paddingTop = 0;
		target.style.paddingBottom = 0;
		target.style.marginTop = 0;
		target.style.marginBottom = 0;
		window.setTimeout(() => {
			target.hidden = true;
			target.style.removeProperty('height');
			target.style.removeProperty('padding-top');
			target.style.removeProperty('padding-bottom');
			target.style.removeProperty('margin-top');
			target.style.removeProperty('margin-bottom');
			target.style.removeProperty('overflow');
			target.style.removeProperty('transition-duration');
			target.style.removeProperty('transition-property');
			target.classList.remove('_slide');
		}, duration);
	}
}
let _slideDown = (target, duration = 500) => {
	if (!target.classList.contains('_slide')) {
		target.classList.add('_slide');
		if (target.hidden) {
			target.hidden = false;
		}
		let height = target.offsetHeight;
		target.style.overflow = 'hidden';
		target.style.height = 0;
		target.style.paddingTop = 0;
		target.style.paddingBottom = 0;
		target.style.marginTop = 0;
		target.style.marginBottom = 0;
		target.offsetHeight;
		target.style.transitionProperty = "height, margin, padding";
		target.style.transitionDuration = duration + 'ms';
		target.style.height = height + 'px';
		target.style.removeProperty('padding-top');
		target.style.removeProperty('padding-bottom');
		target.style.removeProperty('margin-top');
		target.style.removeProperty('margin-bottom');
		window.setTimeout(() => {
			target.style.removeProperty('height');
			target.style.removeProperty('overflow');
			target.style.removeProperty('transition-duration');
			target.style.removeProperty('transition-property');
			target.classList.remove('_slide');
		}, duration);
	}
}
let _slideToggle = (target, duration = 500) => {
	if (target.hidden) {
		return _slideDown(target, duration);
	} else {
		return _slideUp(target, duration);
	}
}
//=================
//Tabs
let tabs = document.querySelectorAll("._tabs");
for (let index = 0; index < tabs.length; index++) {
	let tab = tabs[index];
	let tabs_items = tab.querySelectorAll("._tabs-item");
	let tabs_blocks = tab.querySelectorAll("._tabs-block");
	for (let index = 0; index < tabs_items.length; index++) {
		let tabs_item = tabs_items[index];
		tabs_item.addEventListener("click", function (e) {
			for (let index = 0; index < tabs_items.length; index++) {
				let tabs_item = tabs_items[index];
				tabs_item.classList.remove('_active');
				tabs_blocks[index].classList.remove('_active');
			}
			tabs_item.classList.add('_active');
			tabs_blocks[index].classList.add('_active');
			e.preventDefault();
		});
	}
}
// Dynamic Adapt v.1
// HTML data-da="where(uniq class name),when(breakpoint),position(digi)"
// e.x. data-da=".item,992,2"
// Andrikanych Yevhen 2020
// https://www.youtube.com/c/freelancerlifestyle

"use strict";


function DynamicAdapt(type) {
	this.type = type;
}

DynamicAdapt.prototype.init = function () {
	const _this = this;
	// ???????????? ????????????????
	this.??bjects = [];
	this.daClassname = "_dynamic_adapt_";
	// ???????????? DOM-??????????????????
	this.nodes = document.querySelectorAll("[data-da]");

	// ???????????????????? ??bjects ????????????????
	for (let i = 0; i < this.nodes.length; i++) {
		const node = this.nodes[i];
		const data = node.dataset.da.trim();
		const dataArray = data.split(",");
		const ??bject = {};
		??bject.element = node;
		??bject.parent = node.parentNode;
		??bject.destination = document.querySelector(dataArray[0].trim());
		??bject.breakpoint = dataArray[1] ? dataArray[1].trim() : "767";
		??bject.place = dataArray[2] ? dataArray[2].trim() : "last";
		??bject.index = this.indexInParent(??bject.parent, ??bject.element);
		this.??bjects.push(??bject);
	}

	this.arraySort(this.??bjects);

	// ???????????? ???????????????????? ??????????-????????????????
	this.mediaQueries = Array.prototype.map.call(this.??bjects, function (item) {
		return '(' + this.type + "-width: " + item.breakpoint + "px)," + item.breakpoint;
	}, this);
	this.mediaQueries = Array.prototype.filter.call(this.mediaQueries, function (item, index, self) {
		return Array.prototype.indexOf.call(self, item) === index;
	});

	// ?????????????????????? ?????????????????? ???? ??????????-????????????
	// ?? ?????????? ?????????????????????? ?????? ???????????? ??????????????
	for (let i = 0; i < this.mediaQueries.length; i++) {
		const media = this.mediaQueries[i];
		const mediaSplit = String.prototype.split.call(media, ',');
		const matchMedia = window.matchMedia(mediaSplit[0]);
		const mediaBreakpoint = mediaSplit[1];

		// ???????????? ???????????????? ?? ???????????????????? ????????????????????????
		const ??bjectsFilter = Array.prototype.filter.call(this.??bjects, function (item) {
			return item.breakpoint === mediaBreakpoint;
		});
		matchMedia.addListener(function () {
			_this.mediaHandler(matchMedia, ??bjectsFilter);
		});
		this.mediaHandler(matchMedia, ??bjectsFilter);
	}
};

DynamicAdapt.prototype.mediaHandler = function (matchMedia, ??bjects) {
	if (matchMedia.matches) {
		for (let i = 0; i < ??bjects.length; i++) {
			const ??bject = ??bjects[i];
			??bject.index = this.indexInParent(??bject.parent, ??bject.element);
			this.moveTo(??bject.place, ??bject.element, ??bject.destination);
		}
	} else {
		for (let i = 0; i < ??bjects.length; i++) {
			const ??bject = ??bjects[i];
			if (??bject.element.classList.contains(this.daClassname)) {
				this.moveBack(??bject.parent, ??bject.element, ??bject.index);
			}
		}
	}
};

// ?????????????? ??????????????????????
DynamicAdapt.prototype.moveTo = function (place, element, destination) {
	element.classList.add(this.daClassname);
	if (place === 'last' || place >= destination.children.length) {
		destination.insertAdjacentElement('beforeend', element);
		return;
	}
	if (place === 'first') {
		destination.insertAdjacentElement('afterbegin', element);
		return;
	}
	destination.children[place].insertAdjacentElement('beforebegin', element);
}

// ?????????????? ????????????????
DynamicAdapt.prototype.moveBack = function (parent, element, index) {
	element.classList.remove(this.daClassname);
	if (parent.children[index] !== undefined) {
		parent.children[index].insertAdjacentElement('beforebegin', element);
	} else {
		parent.insertAdjacentElement('beforeend', element);
	}
}

// ?????????????? ?????????????????? ?????????????? ???????????? ????????????????
DynamicAdapt.prototype.indexInParent = function (parent, element) {
	const array = Array.prototype.slice.call(parent.children);
	return Array.prototype.indexOf.call(array, element);
};

// ?????????????? ???????????????????? ?????????????? ???? breakpoint ?? place 
// ???? ?????????????????????? ?????? this.type = min
// ???? ???????????????? ?????? this.type = max
DynamicAdapt.prototype.arraySort = function (arr) {
	if (this.type === "min") {
		Array.prototype.sort.call(arr, function (a, b) {
			if (a.breakpoint === b.breakpoint) {
				if (a.place === b.place) {
					return 0;
				}

				if (a.place === "first" || b.place === "last") {
					return -1;
				}

				if (a.place === "last" || b.place === "first") {
					return 1;
				}

				return a.place - b.place;
			}

			return a.breakpoint - b.breakpoint;
		});
	} else {
		Array.prototype.sort.call(arr, function (a, b) {
			if (a.breakpoint === b.breakpoint) {
				if (a.place === b.place) {
					return 0;
				}

				if (a.place === "first" || b.place === "last") {
					return 1;
				}

				if (a.place === "last" || b.place === "first") {
					return -1;
				}

				return b.place - a.place;
			}

			return b.breakpoint - a.breakpoint;
		});
		return;
	}
};

const da = new DynamicAdapt("max");
da.init();
const cover_slider = new Swiper('.cover-slider', {
	observer: true,
	observeParents: true,
	slidesPerView: 1,
	spaceBetween: 0,
	allowTouchMove: false,
	speed: 500,
	//touchRatio: 0,
	//simulateTouch: false,
	loop: true,

	// Arrows
	navigation: {
		nextEl: '.cover-slider__button-next',
		prevEl: '.cover-slider__button-prev',
	},

});

const slider_family = new Swiper('#slider-family', {
	observer: true,
	observeParents: true,
	speed: 500,

	pagination: {
		el: '#pagination-family',
		type: 'fraction',
		formatFractionCurrent: function (number) {
			return ('0' + number).slice(-2);
		},
		formatFractionTotal: function (number) {
			return ('0' + number).slice(-2);
		},
		renderFraction: function (currentClass, totalClass) {
			return '<span class="' + currentClass + '"></span>' +
				' / ' +
				'<span class="' + totalClass + '"></span>';
		}
	},
	navigation: {
		nextEl: '#btn-next-family',
		prevEl: '#btn-prev-family',
	},
	breakpoints: {
		320: {
			slidesPerView: 1,
			spaceBetween: 20,
		},
		768: {
			slidesPerView: 2,
			spaceBetween: 30,
		},
	},

});

const slider_fone = new Swiper('#slider-fone', {
	observer: true,
	observeParents: true,
	speed: 500,

	pagination: {
		el: '#pagination-fone',
		type: 'fraction',
		formatFractionCurrent: function (number) {
			return ('0' + number).slice(-2);
		},
		formatFractionTotal: function (number) {
			return ('0' + number).slice(-2);
		},
		renderFraction: function (currentClass, totalClass) {
			return '<span class="' + currentClass + '"></span>' +
				' / ' +
				'<span class="' + totalClass + '"></span>';
		}
	},
	navigation: {
		nextEl: '#btn-next-fone',
		prevEl: '#btn-prev-fone',
	},
	breakpoints: {
		320: {
			slidesPerView: 1,
			spaceBetween: 20,
		},
		768: {
			slidesPerView: 2,
			spaceBetween: 30,
		},
	},

});

const price_slider = new Swiper('#price-slider', {
	observer: true,
	observeParents: true,
	slidesPerView: 2,
	speed: 500,
	initialSlide: 1,
	watchOverflow: true,
	spaceBetween: 0,
	breakpoints: {
		320: {
			slidesPerView: 1,
		},
		768: {
			slidesPerView: 2,
		},

		992: {
			slidesPerView: "auto",
			allowTouchMove: true,

		},
	},

	// Arrows
	navigation: {
		nextEl: '.price__btn-next',
		prevEl: '.price__btn-prev',
	},

});

let portfolio_slider;
let inst_slider;

if (document.querySelector('#portfolio-slider') || document.querySelector('#inst-slider')) {


	if (window.innerWidth >= 768) {
		initSlider();
	}

	window.addEventListener('resize', () => {
		let windowWidth = window.innerWidth;

		if (windowWidth >= 768 && portfolio_slider == undefined) {

			initSlider();

		} else if (windowWidth < 768 && portfolio_slider != undefined) {

			portfolio_slider.destroy();
			inst_slider.destroy();
			portfolio_slider = undefined;
			inst_slider = undefined;
		}

	})
}


function initSlider() {

	portfolio_slider = new Swiper('#portfolio-slider', {
		observer: true,
		observeParents: true,
		watchOverflow: true,
		speed: 500,
		slidesPerView: 1,
		slidesPerColumn: 1,

		// Arrows
		navigation: {
			nextEl: '#btn-next-portfolio',
			prevEl: '#btn-prev-portfolio',
		},

		pagination: {
			el: '#pagination-portfolio',
			type: 'fraction',
			formatFractionCurrent: function (number) {
				return ('0' + number).slice(-2);
			},
			formatFractionTotal: function (number) {
				return ('0' + number).slice(-2);
			},
			renderFraction: function (currentClass, totalClass) {
				return '<span class="' + currentClass + '"></span>' +
					' / ' +
					'<span class="' + totalClass + '"></span>';
			}
		},

	});

	inst_slider = new Swiper('#inst-slider', {
		observer: true,
		observeParents: true,
		speed: 500,
		slidesPerView: 5,
		spaceBetween: 2,

		// Arrows
		navigation: {
			nextEl: '#btn-next-inst',
			prevEl: '#btn-prev-inst',
		},
		breakpoints: {
			320: {
				slidesPerView: 2,
			},
			768: {
				slidesPerView: 5,
			},
		},
	});

}

// price range

//slider
const slider_range = document.getElementById('price-range-1');

if (slider_range) {
	const slider_range_current_number = slider_range.closest('.price-range__body').querySelector('.current');

	noUiSlider.create(slider_range, {
		start: 1,
		connect: true,
		step: 1,
		format: {
			to: (v) => parseFloat(v).toFixed(0),
			from: (v) => parseFloat(v).toFixed(0)
		},
		range: {
			'min': 1,
			'max': 3
		},
		pips: {
			mode: 'steps',
			density: 50,
		}
	});

	slider_range.noUiSlider.on('update', function (values, handle) {
		slider_range_current_number.innerHTML = values[handle];

		let active_number = slider_range.querySelector('.noUi-value._active');

		if (active_number) {
			active_number.classList.remove('_active')
		}

		let maxPos = Math.max(values);

		slider_range.querySelector(".noUi-value[data-value=" + `'${maxPos}'` + "]").classList.add('_active');
	});

	let pips = slider_range.querySelectorAll('.noUi-value');
	addEventPips(pips, slider_range);
}



// slider
const slider_range_two = document.getElementById('price-range-2');

if (slider_range_two) {
	const slider_range_current_number = slider_range_two.closest('.price-range__body').querySelector('.current');

	noUiSlider.create(slider_range_two, {
		start: 1,
		connect: true,
		step: 1,
		format: {
			to: (v) => parseFloat(v).toFixed(0),
			from: (v) => parseFloat(v).toFixed(0)
		},
		range: {
			'min': 1,
			'max': 8
		},
		pips: {
			mode: 'steps',
			density: 50,
		}
	});

	slider_range_two.noUiSlider.on('update', function (values, handle) {
		slider_range_current_number.innerHTML = values[handle];
		let active_number = slider_range_two.querySelector('.noUi-value._active');

		if (active_number) {
			active_number.classList.remove('_active')
		}

		let maxPos = Math.max(values);

		slider_range_two.querySelector(".noUi-value[data-value=" + `'${maxPos}'` + "]").classList.add('_active');
	});


	let pips = slider_range_two.querySelectorAll('.noUi-value');
	addEventPips(pips, slider_range_two);
}



function addEventPips(pips, slider) {
	for (let i = 0; i < pips.length; i++) {
		pips[i].style.cursor = 'pointer';
		pips[i].addEventListener('click', (e) => {
			targetElement = e.target;
			// targetElement.classList.add('_active');

			let value = Number(targetElement.dataset.value);
			slider.noUiSlider.set(value);
		});
	}
}
document.addEventListener('DOMContentLoaded', () => {

   // First we get the viewport height and we multiple it by 1% to get a value for a vh unit
   let vh = window.innerHeight * 0.01;
   // Then we set the value in the --vh custom property to the root of the document
   document.documentElement.style.setProperty('--vh', `${vh}px`);

   document.addEventListener('click', documentActions);
   // Actions (?????????????????????????? ??????????????)
   function documentActions(e) {
      const targetElement = e.target;
      if (targetElement.classList.contains('nav__icon-submenu') || targetElement.closest('.nav__icon-submenu')) {
         targetElement.closest('.nav__item').classList.add('_show');
      }
      if (targetElement.classList.contains('nav__down') || targetElement.closest('.nav__down')) {
         targetElement.closest('.nav__item').classList.remove('_show');
      }
      if (targetElement.classList.contains('cover__swipe') || targetElement.closest('.cover__swipe')) {
         function goTop() {
            if (window.pageYOffset < document.querySelector('.cover').scrollHeight) {
               window.scrollBy(0, 15);
               setTimeout(goTop, 0);
            }
            return;
         }
         goTop();
      }

   }

   // time mask 
   let dateInputMask = function dateInputMask(elm) {
      elm.addEventListener('keypress', function (e) {
         const len = elm.value.length;

         if (len === 2) {
            elm.value += ':';
         }

         if (len === 5) {
            e.preventDefault();
         }
      });
   };

   const input_time = document.querySelector('#input-time');
   const input_date = document.querySelector('#input-date');

   if (input_time) {
      for (let i = 0; i < input_time.length; i++) {
         dateInputMask(input_time[i]);
      }
   }

   if (input_date) {
      const picker = datepicker(input_date, {
         formatter: (input, date, instance) => {
            const value = date.toLocaleDateString()
            input.value = value // => '1/1/2099'
         },
         startDay: 0, // Calendar week starts on a Monday.
         customDays: ['????', '????', '????', '????', '????', '????', '????'],
         customMonths: ['??????', '??????', '??????', '??????', '??????', '??????', '??????', '??????', '??????', '??????', '??????', '??????'],
      })
   }

   //???????????????? ?????????? file ?? ????????????????????
   const formImage = document.getElementById('formImage');
   //???????????????? ?????? ?????? ???????????? ?? ????????????????????
   const formPreview = document.getElementById('formPreview');
   if (formImage || formPreview) {
      //?????????????? ?????????????????? ?? ???????????? file
      formImage.addEventListener('change', () => {
         uploadFile(formImage.files[0]);
      });

      function uploadFile(file) {
         // ???????????????????? ?????? ??????????
         if (!['image/jpeg', 'image/png', 'image/gif'].includes(file.type)) {
            alert('?????????????????? ???????????? ??????????????????????.');
            formImage.value = '';
            return;
         }
         // ???????????????? ???????????? ?????????? (<2 ????)
         if (file.size > 2 * 1024 * 1024) {
            alert('???????? ???????????? ???????? ?????????? 2 ????.');
            return;
         }

         var reader = new FileReader();
         reader.onload = function (e) {
            formPreview.innerHTML += `<img src="${e.target.result}" alt="????????">`;
         };
         reader.onerror = function (e) {
            alert('????????????');
         };
         reader.readAsDataURL(file);
      }
   }

})


