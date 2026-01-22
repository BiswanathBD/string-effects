let initialPath = "M 10 200 Q 500 200 990 200";
let string = document.querySelector("#string");
const audio = new Audio("guitar-pluck.mp3");

function getRelativePos(e) {
  const rect = string.getBoundingClientRect();
  const clientX = e.touches ? e.touches[0].clientX : e.clientX;
  const clientY = e.touches ? e.touches[0].clientY : e.clientY;

  return {
    x: clientX - rect.left,
    y: clientY - rect.top,
  };
}

// mouse move event
string.addEventListener("mousemove", (e) => {
  let { x, y } = getRelativePos(e);
  const rect = string.getBoundingClientRect();
  x = (x / rect.width) * 1000;
  y = (y / rect.height) * 400;

  let path = `M 10 200 Q ${x} ${y} 990 200`;
  gsap.to("svg path", {
    attr: { d: path },
    duration: 0.3,
  });
});

// mouse leave event
string.addEventListener("mouseleave", (e) => {
  gsap.to("svg path", {
    attr: { d: initialPath },
    duration: 1.8,
    ease: "elastic.out(1,0.1)",
  });
  if (audioEnabled) {
    audio.currentTime = 0;
    audio.play();
  }
});

// touch and move event
string.addEventListener("touchmove", (e) => {
  let { x, y } = getRelativePos(e);
  const rect = string.getBoundingClientRect();
  x = (x / rect.width) * 1000;
  y = (y / rect.height) * 400;

  let path = `M 10 200 Q ${x} ${y} 990 200`;
  console.log(e);
  gsap.to("svg path", {
    attr: { d: path },
    duration: 0.3,
  });
});

// touch end event
string.addEventListener("touchend", (e) => {
  gsap.to("svg path", {
    attr: { d: initialPath },
    duration: 1.8,
    ease: "elastic.out(1,0.1)",
  });
  if (audioEnabled) {
    audio.currentTime = 0;
    audio.play();
  }
});

// cursor follow effect
document.body.addEventListener("mousemove", (e) => {
  gsap.to("#cursor", {
    x: e.x - 10,
    y: e.y - 50,
    duration: 0.3,
    opacity: 1,
  });
});

// cursor leave effect
document.body.addEventListener("mouseleave", (e) => {
  gsap.to("#cursor", {
    duration: 0.3,
    opacity: 0,
  });
});

// Audio toggle functionality
let audioEnabled = false;
const audioToggle = document.getElementById("audioToggle");

audioToggle.addEventListener("click", () => {
  audioEnabled = !audioEnabled;
  if (!audioEnabled) {
    audio.currentTime = 5;
  }
  audioToggle.innerHTML = audioEnabled
    ? '<img src="unmute.svg" alt="" />'
    : '<img src="mute.svg" alt="" />';
});
