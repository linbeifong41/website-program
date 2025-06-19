let events = {}; 
let selectedDate = '';  


function loadEvents() {
    const saved = localStorage.getItem('calendarEvents');
    if (saved) {
        events = JSON.parse(saved);
    }
}

function saveEvents() {
    localStorage.setItem('calendarEvents',JSON.stringify(events));
}


const calendarDates = document.querySelector('.calendar-dates');
const monthYear = document.getElementById('month-year');
const prevMonthBtn = document.getElementById('prev-month');
const nextMonthBtn = document.getElementById('next-month');

let currentDate = new Date();
let currentMonth = currentDate.getMonth();
let currentYear =  currentDate.getFullYear();

const months = [
    'January','February', 'March','April','May','June','July',
    'August','September','October', 'November', 'December'
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

        const dateKey = year + '-' + String(month+1).padStart(2, '0') + '-' + String(i).padStart(2, '0');
        day.dataset.date = dateKey;

        // highlight today's date
        
        if (
            i === today.getDate() &&
            year === today.getFullYear() &&
            month === today.getMonth ()
        ) {
            day.classList.add('current-date');
        }

        if (events[dateKey] && events[dateKey].length > 0) {
            const dot = document.createElement('div');
            dot.className = 'event-dot';
            dot.style.backgroundColor = events[dateKey][0].color ||'#000' ;
            day.appendChild(dot);
        }
        calendarDates.appendChild(day);
    }
    setupDayClickListeners();

    function renderEventList() {
        const eventList = document.getElementById('eventList');
        eventList.innerHTML = '';

        const items = events[selectedDate] || [];
        
        if (items.length === 0) {

            const li = document.createElement('li');
            li.textContent = 'No events.';
            eventList.appendChild(li);
        } else {
            items.forEach(event => {
                const li = document.createElement('li');
                li.innerHTML = `<span style="color:${event.color}>${event.time}</span> - ${event.title}`;
                eventList.appendChild(li);
            });
        }
    }

    function CloseModal() {
        document.getElementById('eventModal').classList.add('hidden');
        document.getElementById('eventForm').reset();
    }
}

document.getElementById('eventForm').addEventListener('submit', e => {
    e.preventDefault();
    const title = document.getElementById('event Title').value;
    const time = document.getElementById('eventTime').value;
    const color = document.getElementById('eventColor').value;

    if (!events[selectedDate]) {
        events[selectedDate] = [];
    }

    events[selectedDate].push({ title, time, color });

    saveEvents();
    renderCalender(currentMonth, currentYear);
    CloseModal();
});
 
function setupDayClickListeners() {
    document.querySelectorAll('.calendar-dates div').forEach(day =>{
        const date = day.dataset.date;
        if (!date) return;
        
        day.addEventListener('click',() => {
            selectedDate = date;
            document.getElementById('selectedDateLabel').textContent = selectedDate;
            document.getElementById('eventModal').classList.remove('hidden');
            renderEventList();
        });
    });
}

loadEvents();

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



