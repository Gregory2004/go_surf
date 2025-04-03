

function smoothScrollTo(targetPosition) {
    const startPosition = window.scrollY;
    const distance = targetPosition - startPosition;
    const duration = 200; // Длительность анимации в миллисекундах
    let startTime = null;

    function animationStep(currentTime) {
        if (!startTime) startTime = currentTime;
        const elapsedTime = currentTime - startTime;
        const progress = Math.min(elapsedTime / duration, 1); // Ограничиваем progress от 0 до 1

        window.scrollTo(0, startPosition + distance * easeInOutQuad(progress));

        if (elapsedTime < duration) {
            requestAnimationFrame(animationStep);
        }
    }

    function easeInOutQuad(t) {
        return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
    }

    requestAnimationFrame(animationStep);
}

document.querySelector(".slide-down").addEventListener("click", function() {
    const main = document.querySelector("main");
    const mainTop = main.getBoundingClientRect().top + window.scrollY; // Узнаем позицию main
    smoothScrollTo(mainTop);
});

window.addEventListener('beforeunload', function() {
    localStorage.setItem('scrollPosition', window.scrollY);
});



const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) { 
            entry.target.classList.add("show"); // Добавляем анимацию
            observer.unobserve(entry.target); // Больше не отслеживаем этот элемент
        }
    });
}, { threshold: 0.3 }); 

// Находим все скрытые элементы и начинаем их отслеживать
document.querySelectorAll(".hidden").forEach(el => observer.observe(el));