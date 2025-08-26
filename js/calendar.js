const prevBtn = document.querySelector('.section3_prev');
const nextBtn = document.querySelector('.section3_next');
const monthEl = document.querySelector('.month');
const yearEl = document.querySelector('.year');
const dayContainer = document.querySelector('.calendar-day');

const btnShowAll = document.getElementById('btnShowAll');
const btnCurrentMonth = document.getElementById('btnCurrentMonth');

let currentDate = new Date(2025, 7);

// 안전한 날짜 파싱 함수
function parseDate(dateStr) {
    const parts = dateStr.split('-');
    return new Date(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2]));
}

function filterCampaignsByDate(clickedDate) {
    const campaignItems = document.querySelectorAll('.campaign_item');

    campaignItems.forEach(item => {
        const dateText = item.querySelector('.section5_campaign_content_date').textContent.trim();
        const dateRange = dateText.replace('일정 : ', '').trim();

        let show = false;

        if (dateRange.includes('~')) {
            const [startStr, endStr] = dateRange.split('~').map(s => s.trim());
            const start = parseDate(startStr);
            const end = parseDate(endStr);

            if (clickedDate) {
                const clicked = parseDate(clickedDate);
                if (clicked >= start && clicked <= end) {
                    show = true;
                }
            } else {
                const clickedYearMonth = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}`;
                const monthStart = parseDate(`${clickedYearMonth}-01`);
                const monthEnd = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);

                if (start <= monthEnd && end >= monthStart) {
                    show = true;
                }
            }
        } else {
            if (clickedDate) {
                const clicked = parseDate(clickedDate);
                const itemDate = parseDate(dateRange);
                show = (clicked.getTime() === itemDate.getTime());
            } else {
                const clickedYearMonth = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2,'0')}`;
                const itemYearMonth = dateRange.slice(0,7);
                show = (clickedYearMonth === itemYearMonth);
            }
        }

        item.style.display = show ? 'block' : 'none';
    });

    const visibleItems = Array.from(campaignItems).filter(item => item.style.display !== 'none');
    const hasVisible = visibleItems.length > 0;

    document.querySelector('.section5_campaign_contents').style.display = hasVisible ? 'block' : 'none';
    document.querySelector('.section5_nocontent_container').style.display = hasVisible ? 'none' : 'block';

    const swiperEl = document.querySelector('.section5_swiper');
    swiperEl.style.display = hasVisible ? 'block' : 'none';

    updateSwiperStatus();

    updateCampaignSummary(clickedDate);

    // 캠페인 아이템이 4건 이하일 경우 첫 번째 슬라이드로 이동
    if (visibleItems.length <= 4) {
        swiperSection5.slideTo(0);  // 첫 번째 슬라이드로 이동
    }
}

function updateCampaignSummary(clickedDate = null) {
    const campaignItems = document.querySelectorAll('.campaign_item');
    let count = 0;
    const countedItems = new Set(); // 중복 방지용 Set

    if (clickedDate) {
        const clicked = parseDate(clickedDate);

        campaignItems.forEach(item => {
            const dateText = item.querySelector('.section5_campaign_content_date').textContent.trim();
            const dateRange = dateText.replace('일정 : ', '').trim();

            if (dateRange.includes('~')) {
                const [startStr, endStr] = dateRange.split('~').map(s => s.trim());
                const start = parseDate(startStr);
                const end = parseDate(endStr);

                if (clicked >= start && clicked <= end && !countedItems.has(item)) {
                    count++;
                    countedItems.add(item);
                }
            } else {
                const itemDate = parseDate(dateRange);
                if (clicked.getTime() === itemDate.getTime() && !countedItems.has(item)) {
                    count++;
                    countedItems.add(item);
                }
            }
        });

        const dayStr = clickedDate.slice(8, 10);
        btnCurrentMonth.textContent = `${clickedDate.slice(0, 4)}년 ${Number(clickedDate.slice(5, 7))}월 ${Number(dayStr)}일 (${count}건)`;
    } else {
        const yearMonth = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2,'0')}`;
        const monthStart = parseDate(`${yearMonth}-01`);
        const monthEnd = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);

        campaignItems.forEach(item => {
            const dateText = item.querySelector('.section5_campaign_content_date').textContent.trim();
            const dateRange = dateText.replace('일정 : ', '').trim();

            if (dateRange.includes('~')) {
                const [startStr, endStr] = dateRange.split('~').map(s => s.trim());
                const start = parseDate(startStr);
                const end = parseDate(endStr);

                if (start <= monthEnd && end >= monthStart && !countedItems.has(item)) {
                    count++;
                    countedItems.add(item);
                }
            } else {
                if (dateRange.startsWith(yearMonth) && !countedItems.has(item)) {
                    count++;
                    countedItems.add(item);
                }
            }
        });

        btnCurrentMonth.textContent = `${yearMonth} 전체 (${count}건)`;
    }
}




function renderCalendar(date) {
    dayContainer.innerHTML = '';
    const year = date.getFullYear();
    const month = date.getMonth();

    monthEl.textContent = String(month + 1).padStart(2, '0');
    yearEl.textContent = year;

    const lastDate = new Date(year, month + 1, 0).getDate();

    for (let day = 1; day <= lastDate; day++) {
        const btn = document.createElement('button');
        btn.textContent = day;
        const sunday = new Date(year, month, day).getDay();

        const today = new Date();
        if (year === today.getFullYear() && month === today.getMonth() && day === today.getDate()) {
            btn.classList.add('today');
        }
        if (sunday === 0) {
            btn.classList.add('sunday');
        }

        btn.addEventListener('click', function() {
            const allBtns = dayContainer.querySelectorAll('button');
            allBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            const dayStr = this.textContent.padStart(2, '0');
            const clickedDate = `${year}-${String(month + 1).padStart(2, '0')}-${dayStr}`;
            filterCampaignsByDate(clickedDate);
        });

        dayContainer.appendChild(btn);
    }
    filterCampaignsByDate(null);
}

prevBtn.addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    renderCalendar(currentDate);
});

nextBtn.addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    renderCalendar(currentDate);
});

btnShowAll.addEventListener('click', () => {
    const allBtns = dayContainer.querySelectorAll('button');
    allBtns.forEach(btn => btn.classList.remove('active'));

    filterCampaignsByDate(null);
});

function updateSwiperStatus() {
    const visibleSlides = document.querySelectorAll('.campaign_item:not([style*="display: none"])');

    if (visibleSlides.length <= 4) {
        swiperSection5.allowTouchMove = false;
        swiperSection5.mousewheel.disable();
    } else {
        swiperSection5.allowTouchMove = true;
        swiperSection5.mousewheel.enable();
    }
}

renderCalendar(currentDate);
updateCampaignSummary(null);
