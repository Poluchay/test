"use strict"
const isMobile = {
    Android: function () {
        return navigator.userAgent.match(/Android/i);
    },
    Windows: function () {
        return navigator.userAgent.match(/IEMobile/i);
    },
    any: function () {
        return (
            isMobile.Android() ||
            isMobile.Windows()
        )
    }
};

if(isMobile.any()){
    document.body.classList.add('_touch');
} else {
    document.body.classList.add('_pc'); 
}

const a = document.querySelectorAll('.menu__link[data-goto]')
if (a.length > 0) {
    a.forEach(menyLink =>{
        menyLink.addEventListener("click", onMenyLinkClick)
    })
}
function onMenyLinkClick(e) {
    const menyLink = e.target;
    console.log(document.querySelector(menyLink.dataset.goto));
    if (menyLink.dataset.goto && document.querySelector(menyLink.dataset.goto)){
        console.log(menyLink);
        const gotoBlock = document.querySelector(menyLink.dataset.goto);
        const gotoBlockValue = gotoBlock.getBoundingClientRect().top + pageYOffset - document.querySelector('header').offsetHeight;
        console.log(window);
        window.scrollTo({
            top: gotoBlockValue,
            behavior: "smooth"
        })
        e.preventDefault();
    }
}