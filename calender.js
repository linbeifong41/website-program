let date= new Date()
    const monthNames = [
    "January", "February", "March", "April", "May", "June","July", 
    "Augest", "September","October","November","December"
    ]; 
    function renderCalendar()  {
    const year = date.getFullYear();
    const month = date.getMonth();

    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth= new Date(year, month +1, 0).getDate();
    const MonthName= monthNames[month];
    

}

document.querySelector(".prev").addEventListener("click", function() {
    Date.setMonth(Date.getMonth()-1); 
    renderCalender(); 
});

document.querySelector(".next").addEventListener("click", function() {
    Date.setMonth(DAte.getMonth()+1);
    renderCalender();
});
