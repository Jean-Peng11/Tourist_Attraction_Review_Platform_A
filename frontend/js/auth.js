// Login
document.querySelector(".signup-form")?.addEventListener("submit", async e => {
    e.preventDefault();

    const email = document.querySelector("input[type='email']").value;
    const password = document.querySelector("input[type='password']").value;

    const res = await post("/login", { email, password });

    if (res.user) {
        localStorage.setItem("user", JSON.stringify(res.user));
        window.location.href = "home.html";
    } else {
        window.location.href = "login-error.html";
    }
});

// Signup
document.querySelector(".signup-form")?.addEventListener("submit", async e => {
    e.preventDefault();

    const email = document.querySelector("input[type='email']").value;
    const name = document.querySelector("input[type='text']").value;
    const password = document.querySelector("input[type='password']").value;

    const res = await post("/signup", { email, name, password });

    if (res.message === "Sign up success") {
        window.location.href = "login.html";
    } else {
        alert(res.message);
    }
});
