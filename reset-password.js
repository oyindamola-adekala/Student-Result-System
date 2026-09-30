const resetForm = document.getElementById("resetForm");

resetForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const newPassword = document.getElementById("newPassword").value;
    const confirmNewPassword = document.getElementById("confirmNewPassword").value;

    if (newPassword !== confirmNewPassword) {
        alert("Passwords do not match.");
        return;
    }

    const savedUser = JSON.parse(localStorage.getItem("user"));

    if (!savedUser) {
        alert("No account found.");
        return;
    }

    savedUser.password = newPassword;

    localStorage.setItem("user", JSON.stringify(savedUser));

    alert("Password changed successfully!");

    window.location.href = "login.html";
});