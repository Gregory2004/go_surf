const videos = {
    video1: {
        elem: document.getElementById('video1'),
        'loc-1': 'SLEEP',
        'loc-2': 'NORTH SHORE',
        'loc-3': 'ENERGY',
        'loc-4': 'NORMAL'

    },
    video2: {
        elem: document.getElementById('video2'),
        'loc-1': 'SHOP',
        'loc-2': 'EAST SHORE',
        'loc-3': 'MIKHAIL',
        'loc-4': 'TYPICAL'
    },
    video3: {
        elem: document.getElementById('video3'),
        'loc-1': 'SURF',
        'loc-2': 'WEST SHORE',
        'loc-3': 'CONDITION',
        'loc-4': 'RADICAL'
    },
    video4: {
        elem: document.getElementById('video4'),
        'loc-1': 'TRAVEL',
        'loc-2': 'EAST SHORE',
        'loc-3': 'LIT',
        'loc-4': 'GRANATABLE'
    },
};


function returnObjText(object) {
    const textes = document.querySelectorAll('.header-carousel-item-text')
    let index = 0;

    for (let keys in object) {
        if (index < textes.length) {
            object[keys].text = textes[index]; 
            index++;
        }
    }
    return object
}

let running = true;



function changeVideo(object) {
    let currentIndex = 2;
    const videosObj = Object.values(object);
    const videosAtr = videosObj.map(element => element);

    let currentVideo = videosAtr[currentIndex].elem;
    let currentText = videosAtr[currentIndex].text;

    const loc1 = document.querySelector('.loc-1')
    const loc2 = document.querySelector('.loc-2')
    const loc3 = document.querySelector('.loc-3')
    const loc4 = document.querySelector('.loc-4')

    const locsArr = [loc1,loc2,loc3,loc4]

    function changeLocsText(newIndex) {
        locsArr.forEach((loc, newIndex) => {
            loc.style.transition = "transform 0.6s ease-in-out, opacity 0.6s";
            loc.style.transform = "translateX(100%)";
            loc.style.opacity = "0";

            setTimeout(() => {
                loc.style.transition = "none";
                loc.style.transform = "translateX(-100%)";
                loc.textContent = videosAtr[currentIndex][`loc-${newIndex + 1}`]; 

                setTimeout(() => {
                    loc.style.transition = "transform 0.1s ease-in-out, opacity 0.6s";
                    loc.style.transform = "translateX(0%)"; 
                    loc.style.opacity = "1";
                }, 10);
            }, 100);
        });
    }

    currentText.style.borderTop = "3px solid #4AF6CD";

    function updateContent() {
        let newIndex = (currentIndex + 1) % videosAtr.length;
        let newVideo = videosAtr[newIndex].elem;
        let newText = videosAtr[newIndex].text;

        changeLocsText(newIndex); 

        newText.style.transition = "border 1s";
        currentText.style.borderTop = "3px solid white";
        newText.style.borderTop = "3px solid #4AF6CD";

        currentVideo.style.opacity = "0";
        newVideo.style.opacity = "1";

        currentVideo = newVideo;
        currentIndex = newIndex;
        currentText = newText;
    }


    let interval = setInterval(updateContent, 6000);

    // Смена при клике на кнопку
    const myButt = document.querySelector('.loc-but');
    myButt.addEventListener('click', () => {
        clearInterval(interval); 
        updateContent(); 
        interval = setInterval(updateContent, 6000); 
    });
}

document.addEventListener("visibilitychange", () => {
    running = !document.hidden; // При скрытии вкладки — ставим на паузу
    if (running) changeVideo; // Если вкладка снова активна — продолжаем
});

changeVideo(returnObjText(videos))