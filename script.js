const scroll = new LocomotiveScroll({
    el: document.querySelector('#main'),
    smooth: true
});


function firstPageAnim(){
  var tl = gsap.timeline();

  tl.from("#nav",{
    y: '20',
    opacity: 0,
    duration: 1.5,
    ease: Expo.easeInOut
  })

  
  .to(".boundingelem",{
    y: '0',
    duration: 1,
    delay:-1.25,
    ease: Expo.easeInOut,
    stagger:.2
  })
}

var timeout;
function circleskew(){
  var xscale = 1;
  var yscale = 1;
  
  var xprev = 0;
  var yprev = 0;

  window.addEventListener("mousemove",function(dets){
    clearTimeout(timeout);
    xscale = gsap.utils.clamp(.8, 1.2, dets.clientX - xprev);
    yscale = gsap.utils.clamp(.8, 1.2, dets.clientY - yprev);

    xprev = dets.clientX;
    yprev = dets.clientY;
   
    circleMouseFollower(xscale, yscale);

    timeout = setTimeout(function(){
      document.querySelector("#minicircle").style.transform = `translate(${dets.clientX}px,${dets.clientY}px) scale(1,1)`}, 100)
  })  
}

function circleMouseFollower(xscale,yscale) {
  window.addEventListener("mousemove", function(dets){
        document.querySelector("#minicircle").style.transform = `translate(${dets.clientX}px,${dets.clientY}px)  scale(${xscale},${yscale})`;
  })
}


circleskew();
circleMouseFollower();
firstPageAnim();

document.querySelectorAll(".elem").forEach(function (elem) {
   var rottate = 0;
   var diffrot = 0;

   elem.addEventListener("mouseleave", function(dets){
   gsap.to(elem.querySelector("img"), {
      opacity: 0,
      ease: Power1,
      duration: .5
   })
  });

  elem.addEventListener("mousemove", function(dets){
    var diff = dets.clientY - elem.getBoundingClientRect().top;
    diffrot = dets.clientX - rottate
    rottate = dets.clientX

   gsap.to(elem.querySelector("img"), {
      opacity: 1,
      ease: Power3,
      top: diff,
      left: dets.clientX,
      rotate: gsap.utils.clamp(-20, 20, diffrot * .2),
   })
  });
});
