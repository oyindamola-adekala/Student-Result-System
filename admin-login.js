const adminLoginForm = document.getElementById("adminLoginForm");

adminLoginForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const email = document.getElementById("adminLoginEmail").value.trim();
    const staffId = document.getElementById("adminLoginStaffId").value.trim();
    const password = document.getElementById("adminLoginPassword").value;
    const adminCode = document.getElementById("adminLoginCode").value.trim();

    const admin = JSON.parse(localStorage.getItem("admin"));

    if (!admin) {
        alert("No administrator account found. Please create an administrator account first.");
        return;
    }

    if (
        admin.email === email &&
        admin.staffId === staffId &&
        admin.password === password &&
        admin.adminCode === adminCode
    ) {
        alert("Administrator Login Successful!");

        window.location.href = "admin-dashboard.html";

    } else {
        alert("Invalid administrator login details.");
    }

});