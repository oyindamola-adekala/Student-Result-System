const signupForm = document.getElementById("signupForm");

signupForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const fullName = document.getElementById("fullname").value.trim();
    const email = document.getElementById("email").value.trim();
    const school = document.getElementById("school").value.trim();
    const matricNo = document.getElementById("matricNo").value.trim();
    const department = document.getElementById("department").value.trim();
    const level = document.getElementById("level").value.trim();
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    if (password !== confirmPassword) {
        alert("Passwords do not match.");
        return;
    }

   const user = {
    fullName: fullName,
    school: school,
    matricNo: matricNo,
    department: department,
    level: level,
    email: email,
    password: password,
    role: "student"
};

    localStorage.setItem("user", JSON.stringify(user));

    alert("Account created successfully!");

    window.location.href = "login-choice.html";
});