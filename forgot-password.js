const forgotForm = document.getElementById("forgotForm");

forgotForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const email = document.getElementById("resetEmail").value.trim();

    const savedUser = JSON.parse(localStorage.getItem("user"));

    if (!savedUser) {
        alert("No account found.");
        return;
    }

    if (email === savedUser.email) {
        alert("Email verified. You can now reset your password.");

        window.location.href = "reset-password.html";
    } else {
        alert("No account found with this email.");
    }
});