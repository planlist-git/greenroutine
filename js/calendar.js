    const prevBtn = document.querySelector('.section3_prev');
    const nextBtn = document.querySelector('.section3_next');
    const monthEl = document.querySelector('.month');
    const yearEl = document.querySelector('.year');
    const dayContainer = document.querySelector('.calendar-day');

    let currentDate = new Date(2025,7);

    function renderCalendar(date) {
        const year = date.getFullYear();
        const month = date.getMonth(); // 0-11

        // 월/년 출력
        monthEl.textContent = String(month + 1).padStart(2, '0');
        yearEl.textContent = year;

        // 날짜 초기화
        dayContainer.innerHTML = '';

        // 해당 월의 마지막 날 구하기
        const lastDate = new Date(year, month + 1, 0).getDate();

        // 날짜 버튼 생성
        for (let day = 1; day <= lastDate; day++) {
            const btn = document.createElement('button');
            btn.textContent = day;

            // 일요일 적색
            const sunday = new Date(year,month,day).getDay();

            // 오늘 날짜
            const today = new Date();
            if (
                year === today.getFullYear() &&
                month === today.getMonth() &&
                day === today.getDate()
            ) {
                btn.classList.add('today');
            }

            if (sunday == 0){
                btn.classList.add('sunday')
            }

            btn.addEventListener('click', () => {
               
            });

            dayContainer.appendChild(btn);
        }
    }

    // 이전 달로 이동
    prevBtn.addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() - 1);
        renderCalendar(currentDate);
    });

    // 다음 달로 이동
    nextBtn.addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() + 1);
        renderCalendar(currentDate);
    });

    // 초기 렌더링
    renderCalendar(currentDate);