let initialpath = "M 10 250 Q 500 250 990 250";
let string = document.querySelector("#string");

string.addEventListener("mousemove", (e) => {
  let path = `M 10 250 Q ${e.x} ${e.y} 990 250`;
  console.log(e);
  gsap.to("svg path", {
    attr: { d: path },
    duration: 0.3,
  });
});

string.addEventListener("mouseleave", (e) => {
  gsap.to("svg path", {
    attr: { d: initialpath },
    duration: 1.8,
    // use gsap elastic ease for a bouncy effect
    ease: "elastic.out(1,0.1)",
  });
});

document.body.addEventListener("mousemove", (e) => {
  gsap.to("#cursor", {
    x: e.x,
    y: e.y,
    duration: 0.5,
  });
});