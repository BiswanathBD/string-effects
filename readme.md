# Interactive SVG Effect Box

An interactive SVG animation that responds to your **mouse or touch movements** inside a box. Move your mouse or pull the string to see the effect, and leave or release to reset it. Built with **HTML, CSS, JavaScript, and GSAP** for smooth animations.

🎨 **Live Demo:** https://biswanathbd.github.io/string-effects/

---

## 🎯 Features

- Interactive **mouse & touch movement effect** on SVG paths  
- Resets automatically when interaction ends  
- Smooth animations using **GSAP**  
- Optional **custom cursor tracking**  
- Works on both desktop and mobile  
- Lightweight and easy to integrate  

---

## ⚡ How It Works

1. Mouse or touch movements inside the box trigger dynamic changes in the SVG curve.  
2. Leaving the box or ending touch interaction resets the path to its original state.  
3. GSAP handles animation tweening and custom easing.

---

## 🛠️ Setup

1. Clone or download the project.  
2. Make sure `index.html`, `style.css`, and `script.js` are in the same folder.  
3. Open `index.html` in a browser.  
4. Move your mouse or touch inside the box to see the effect.

---

## 📌 Code with Explanatory Comments

```js
// Initial SVG path (default state)
let initialpath = "M 10 200 Q 500 200 990 200";
let string = document.querySelector("#string");

// Helper: Get position relative to the #string element
function getRelativePos(e) {
  const rect = string.getBoundingClientRect(); // size & position of box
  return {
    x: e.clientX - rect.left, // horizontal relative inside box
    y: e.clientY - rect.top,  // vertical relative inside box
  };
}

// Mouse move inside the string box
string.addEventListener("mousemove", (e) => {
  let { x, y } = getRelativePos(e);

  // Scale vertical position to match SVG viewBox height (0–400)
  const rect = string.getBoundingClientRect();
  y = (y / rect.height) * 400;

  // Create new path using mouse coordinates
  let path = `M 10 200 Q ${x} ${y} 990 200`;

  // Animate path attribute using GSAP
  gsap.to("svg path", {
    attr: { d: path },
    duration: 0.3,
  });
});

// Reset path on mouse leave
string.addEventListener("mouseleave", () => {
  gsap.to("svg path", {
    attr: { d: initialpath },
    duration: 1.8,
    ease: "elastic.out(1,0.1)",
  });
});

// Touch move for mobile devices
string.addEventListener("touchmove", (e) => {
  e.preventDefault(); // prevent page scroll while touching

  let touch = e.touches[0];
  const rect = string.getBoundingClientRect();

  let x = touch.clientX - rect.left;
  let y = (touch.clientY - rect.top) / rect.height * 400;

  let path = `M 10 200 Q ${x} ${y} 990 200`;

  gsap.to("svg path", {
    attr: { d: path },
    duration: 0.3,
  });
}, { passive: false });

// Reset path when touch ends
string.addEventListener("touchend", () => {
  gsap.to("svg path", {
    attr: { d: initialpath },
    duration: 1.8,
    ease: "elastic.out(1,0.1)",
  });
});

// Custom cursor effect (desktop)
document.body.addEventListener("mousemove", (e) => {
  gsap.to("#cursor", {
    x: e.x - 10, // small offset for cursor center
    y: e.y - 50, // adjust for vertical position
    duration: 0.3,
    opacity: 1,
  });
});

// Hide cursor when mouse leaves window
document.body.addEventListener("mouseleave", () => {
  gsap.to("#cursor", {
    duration: 0.3,
    opacity: 0,
  });
});
