const ADMIN_ACCESS_CODE = "RESULTADMIN2026";

const adminSignupForm = document.getElementById("adminSignupForm");

adminSignupForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const fullName = document.getElementById("fullName").value.trim();
    const staffId = document.getElementById("staffId").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;
    const adminCode = document.getElementById("adminCode").value.trim();

    if (password !== confirmPassword) {
        alert("Passwords do not match.");
        return;
    }

    if (adminCode !== ADMIN_ACCESS_CODE) {
        alert("Invalid Administrator Access Code.");
        return;
    }

    const admin = {
        fullName: fullName,
        staffId: staffId,
        email: email,
        password: password,
        adminCode: adminCode,
        role: "admin"
    };

    localStorage.setItem("admin", JSON.stringify(admin));

    alert("Administrator account created successfully!");

    window.location.href = "login-choice.html";

});