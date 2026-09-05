const form = document.querySelector(".signup-form");
const isSignup = document.title.toLowerCase().includes("sign up");

form?.addEventListener("submit", async event => {
    event.preventDefault();

    const email = form.querySelector("input[type='email']").value.trim();
    const passwordInputs = form.querySelectorAll("input[type='password']");
    const password = passwordInputs[0].value;

    if (isSignup && password !== passwordInputs[1].value) {
        alert("Passwords do not match.");
        return;
    }

    const data = { email, password };
    if (isSignup) data.name = form.querySelector("input[type='text']").value.trim();

    try {
        const response = await apiRequest("POST", isSignup ? "/auth/signup" : "/auth/login", data);

        if (isSignup) {
            alert(response.message || "Sign up success");
            window.location.href = "Log in.html";
            return;
        }

        if (!response.user) throw new Error(response.message || "Invalid email or password");
        localStorage.setItem("user", JSON.stringify(response.user));
        window.location.href = "home.html";
    } catch (error) {
        alert(error.message);
        if (!isSignup) window.location.href = "login-error.html";
    }
});
