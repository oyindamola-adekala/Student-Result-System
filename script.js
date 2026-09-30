// Login Function
const loginForm = document.getElementById("loginForm");

if (loginForm) {

    loginForm.addEventListener("submit", function(event) {

        event.preventDefault();

        window.location.href = "student-dashboard.html";

    });

}

// Logout Function
// Logout Function
const logout = document.getElementById("logout");

if (logout) {

    logout.addEventListener("click", function() {

        const confirmLogout = confirm("Are you sure you want to log out?");

        if (confirmLogout) {
            window.location.href = "index.html";
        }

    });

}