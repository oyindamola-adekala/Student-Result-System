const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", function (event) {

    event.preventDefault();

    const email = document.getElementById("loginEmail").value.trim();
    const password = document.getElementById("loginPassword").value;

    const user = JSON.parse(localStorage.getItem("user"));

    if (
        user &&
        user.email === email &&
        user.password === password
    ) {
        alert("Student Login Successful!");

        window.location.href = "student-dashboard.html";

    } else {
        alert("Invalid student email or password.");
    }

});