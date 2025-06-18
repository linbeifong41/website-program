document.getElementsByClassName("login-card").addEventslistener("sumbit", function(event)) { 
    event.preventDefault(); // stop the from from refreshing the page
    const username= document.getElementsByClassName("username").value;
    const password= document.getElementsByClassName("password").value;

    // fake login check
if (username === "user" && password === "1234") {
    localStorage.setItem("isLOggedIn", "true");
    Window.location.href = "dashboard.html";  // Go to main web 
} else {
    alert("invalid login.");
}
});
