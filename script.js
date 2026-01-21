let initialpath = "M 10 200 Q 500 200 990 200";
let string = document.querySelector("#string");

// mouse move event
string.addEventListener("mousemove", (e) => {
  let path = `M 10 200 Q ${e.x} ${e.y} 990 200`;
  console.log(e);
  gsap.to("svg path", {
    attr: { d: path },
    duration: 0.3,
  });
});

// mouse leave event
string.addEventListener("mouseleave", (e) => {
  gsap.to("svg path", {
    attr: { d: initialpath },
    duration: 1.8,
    ease: "elastic.out(1,0.1)",
  });
});

// cursor follow effect
document.body.addEventListener("mousemove", (e) => {
  gsap.to("#cursor", {
    x: e.x,
    y: e.y,
    duration: 0.5,
    opacity: 1,
  });
});
// cursor follow effect
document.body.addEventListener("mouseleave", (e) => {
  gsap.to("#cursor", {
    duration: 0.5,
    opacity: 0,
  });
});