const calendarDates = document.querySelector('.calendar-dates');
const monthYear = document.getElementById('month-year');
const prevMonthBtn = document.getElementById('prev-month');
const nextMonthBtn = document.getElementById('next-month');

let currentDate = new Date();
let currentMonth = currentDate.getMonth();
let currentYear =  currentDate.getFullYear();

const months = [
    'january','February', 'march','april','may','june','july',
    'augest','september','october', 'november', 'december'
];

function renderCalender(month, year) {
    calendarDates.innerHTML = '';
    monthYear.textContent = `${months[month]} ${year}`;

    // Get today's date

    const today = new Date();
    
    // Get the first day of the month

    const firstDay = new Date(year,month, 1).getDay();

    // Get the number of days in the month

    const daysInMonth = new Date(year, month + 1, 0).getDate();

    // create blanks for the days of the week before the first day 

    for (let i = 0; i < firstDay; i++) {
        const blank =  document.createElement('div');
        calendarDates.appendChild(blank);
    }

    // populate the days 

    for (let i = 1; i <= daysInMonth; i++) {
        const day = document.createElement('div');
        day.textContent = i;

        // highlight today's date
        
        if (
            i === today.getDate() &&
            year === today.getFullYear() &&
            month === today.getMonth ()
        ) {
            day.classList.add('current-date');
        }

        calendarDates.appendChild(day);
    }
}
 
renderCalender(currentMonth, currentYear);

prevMonthBtn.addEventListener('click',() => {
    currentMonth--;
    if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
    }

    renderCalender(currentMonth, currentYear);

});

nextMonthBtn.addEventListener('click',() => {
    currentMonth++;
    if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;   
    }

    renderCalender(currentMonth, currentYear);
});

calendarDates.addEventListener ('click', (e)=>{
    if (e.target.textContent !== '') {
        alert(`You clicked on ${e.target.textContent} ${months[currentMonth]} ${currentYear}`);
    }
});



