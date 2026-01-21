# Interactive SVG Effect Box

An interactive SVG animation that responds to your mouse movements inside a box. Move your mouse inside the box to see the effect, and leave to reset it. Built with **HTML, CSS, JavaScript, and GSAP** for smooth animations.

---

## 🎯 Features

- Interactive **mouse movement effect** on SVG paths  
- Resets automatically when the mouse leaves the box  
- Smooth animations using **GSAP**  
- Custom **cursor tracking** (optional)  
- Lightweight and easy to integrate  

---

## ⚡ How It Works

1. Mouse movements inside the box trigger a dynamic change in the SVG path.  
2. Moving the mouse away (`mouseleave`) resets the path to its original state.  
3. GSAP handles the smooth transition and easing effects.  

---

## 🛠️ Setup

1. Clone or download the project.  
2. Open `index.html` in a browser.  
3. Move your mouse inside the box to see the effect.  

---

## 📌 Code Snippets

### Mouse move effect
```js
let initialpath = "M 10 200 Q 500 200 990 200";
let string = document.querySelector("#string");

string.addEventListener("mousemove", (e) => {
  let bounds = string.getBoundingClientRect();
  let x = e.clientX - bounds.left;
  let y = e.clientY - bounds.top;
  let path = `M 10 200 Q ${x} ${y} 990 200`;

  gsap.to("svg path", {
    attr: { d: path },
    duration: 0.3,
    ease: "power3.out",
  });
});

string.addEventListener("mouseleave", () => {
  gsap.to("svg path", {
    attr: { d: initialpath },
    duration: 1.8,
    ease: "elastic.out(1,0.1)",
  });
});
