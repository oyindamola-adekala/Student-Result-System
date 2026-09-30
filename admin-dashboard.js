const savedAdmin = JSON.parse(localStorage.getItem("admin"));

if (!savedAdmin) {
    window.location.href = "login-choice.html";
}

if (savedAdmin.role !== "admin") {
    alert("Access denied!");
    window.location.href = "login-choice.html";
}

// Show admin name
document.getElementById("adminName").textContent = savedAdmin.fullName;

// Logout
const logoutBtn = document.getElementById("logoutBtn");

logoutBtn.addEventListener("click", function () {
    localStorage.removeItem("admin");
    window.location.href = "login-choice.html";
});