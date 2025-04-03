const plane = document.querySelector('.airplane')
let lastScrollY = window.scrollY;

window.addEventListener("scroll", () => {
    const scrollY = window.scrollY;
    const speed = 2; // Чем больше число, тем быстрее движение

    if (plane.getBoundingClientRect().top < window.innerHeight && plane.getBoundingClientRect().bottom > 0) {
        let moveX = (scrollY - lastScrollY) * speed;
        let currentX = parseFloat(plane.dataset.x || 0); // Получаем текущее смещение
        let newX = currentX + moveX;

        plane.style.transform = `translateX(${newX}px)`;
        plane.dataset.x = newX; // Запоминаем позицию
    }

    lastScrollY = scrollY;
});