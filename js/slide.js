let tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
document.body.appendChild(tag);

let players = [];

function onYouTubeIframeAPIReady() {
    document.querySelectorAll('.section8_iframe_content').forEach((iframe, idx) => {
        players[idx] = new YT.Player(iframe);
    });
}

// 섹션1_배너
var swiper = new Swiper(".mySwiper", {
        spaceBetween: 30,
        centeredSlides: true,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
        
    });

// 섹션4_edu
var swiperSection4 = new Swiper(".section4_swiper",{
        slidesPerView:3,
        spaceBetween: 26,
        centeredSlides: false,
        navigation: {
            nextEl: '#section4_edu_btn_next',
            prevEl: '#section4_edu_btn_prev',
        },
});


// 섹션5_캠페인
var swiperSection5 = new Swiper(".section5_swiper",{
    direction:'vertical',
    slidesPerView:1,
    spaceBetween:30,
    mousewheel: true,
});



// 섹션8_영상으로 배우는 그린 지식
var swiperSection8 = new Swiper(".section8_swiper",{
    spaceBetween: 30,
    centeredSlides: false,
    navigation: {
        nextEl: '.video_btn_next',
        prevEl: '.video_btn_prev',
    },
    on: {
        slideChange: () => {
            stopAllVideos();
            resetPlayButtons();
        }
    }
});

// 현재 클릭한 영상은 제외하고 나머지 영상 멈추기 (재생위치 초기화도 제외)
function stopAllVideos(excludeVideo) {
    players.forEach(player => {
        if (player && player.pauseVideo) {
            player.pauseVideo();
        }
    });

    document.querySelectorAll('.section8_video_content').forEach(video => {
        if (video !== excludeVideo) {  // 현재 영상은 제외
            video.pause();
            // video.currentTime = 0;
            video.controls = false;
        }
    });
}

function resetPlayButtons(){
    document.querySelectorAll('.section8_play_btn').forEach(btn => {
        btn.classList.remove('playing');
        btn.style.display = 'block';
    });
}

document.querySelectorAll('.section8_play_btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const slide = btn.closest('.swiper-slide');
        const video = slide.querySelector('video');

        if (!video) return;

        const isPlaying = btn.classList.contains('playing');

        if (isPlaying) {
            video.pause();
        } else {
            stopAllVideos();
            resetPlayButtons();

            video.controls = true;
            video.play();

            btn.classList.add('playing');
            btn.style.display = 'none';
        }
    });
});

document.querySelectorAll('.section8_video_content').forEach(video  => {
    const slide = video.closest('.swiper-slide');
    const btn = slide.querySelector('.section8_play_btn');

    if(!btn) return;

    video.addEventListener('pause', () => {
        btn.classList.remove('playing');
        video.controls = false;
        btn.style.display = 'block';
    });

    video.addEventListener('play', () => {
        btn.classList.add('playing');
        btn.style.display = 'none';
        video.controls = true;
    });

    video.addEventListener('ended', () => {
        btn.classList.remove('playing');
        video.controls = false;
        btn.style.display = 'block';
    });
});




// 섹션9_후원자님을 위한 선물
var swiperSection9 = new Swiper(".section9_swiper",{
        spaceBetween: 30,
        centeredSlides: true,
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
        },
        
});

document.querySelector('.gift_list').addEventListener('click',function(e){

    const targetLink = e.target.closest('a');
    if(!targetLink) return;

    const items = Array.from(document.querySelectorAll(".gift_list li a"));
    const index = items.indexOf(targetLink);

    swiperSection9.slideTo(index);

});