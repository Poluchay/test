
//     let a = document.querySelector('.header__burger');
//     a.addEventListener('click', ()=>{
//         document.querySelector('.nav').classList.toggle('view');
//         alert('Kolya huy');
//     });

//     let div = document.querySelector('.huy');//нашли див по классу
//     let input = document.querySelector('.huy1'); //нашли инпут по классу

//     let v = function runTime (){ //Если нажали на див

//   let timerNumber = 0; // Таймер = 0 до функции чтобы повторно запустить 
//   //таймер с нуля
//   let interval = setInterval(() =>{  //функция с таймером работает 
//     //пока работает таймер, каждую секунду вызывает сама себя
//     div.innerHTML = timerNumber; // помещаем в див таймер
//     timerNumber = timerNumber + 1; // таймер 0 + 1, 1 + 1.....
//     if(timerNumber == 12){
//       clearInterval(interval);
//     }
//   }, 1000)
// }; Android BlackBerry iPhone iPad iPod Opera Mini IEMobile

//userAgent
document.addEventListener('DOMContentLoaded', () => {
   const isMobile = {
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
      IEMobile: function () {
         return navigator.userAgent.match(/IEMobile/i);
      },
      any: function () {
         return (
            isMobile.Android() ||
            isMobile.BlackBerry() ||
            isMobile.iOS() ||
            isMobile.Opera() ||
            isMobile.IEMobile()
         )
      }
   }
   // true картинка, false видео 
   if (isMobile.any()) {
      document.querySelector('html').className = 'mob';
   } else {
      let firstScreenBg = document.querySelector('.first-screen__bg');
      firstScreenBg.innerHTML = '<video class="first-screen__video" playsinline autoplay loop muted> <source src="img/header/video1.mp4" type="video/mp4"> </video>';
   }
})

const presentBtnText = document.querySelector('.first-screen__button');
if (window.innerWidth < 801) {
   presentBtnText.textContent = 'РАССЧЕТ БЮДЖЕТА';
}
window.addEventListener('resize', function (e) {
   if (window.innerWidth < 801) {
      presentBtnText.textContent = 'РАССЧЕТ БЮДЖЕТА';
   } else presentBtnText.textContent = 'БЕСПЛАТНЫЙ РАССЧЕТ БЮДЖЕТА';
}
)