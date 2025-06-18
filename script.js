document.querySelector(".login-card").addEventlistener("sumbit", function(event) {
    event.preventDefault(); 
    const username= document.querySelector("username").value;
    const password= document.querySelector("password").value;

    // fake login check
if (username === "user" && password === "1234") {
    localStorage.setItem("isLoggedIn", "true");
    Window.location.href = "dashboard.html"; 
} else {
    alert("invalid login.");
}

});