// document.addEventListener("load",loadAnimations)
// function loadAnimations(e) {
// }
const elemToBeAnimated = document.querySelectorAll(".animated")
const callback = (entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add(entry.target.dataset.effect)
      observer.unobserve(entry.target)
    }
  })
}

for (let index = 0; index < elemToBeAnimated.length; index++) {
  const observer = new IntersectionObserver(callback, {}) 
  observer.observe(elemToBeAnimated[index]) 
}

// window.onbeforeunload = function () {
//   document.removeEventListener('load', loadAnimations)
// }