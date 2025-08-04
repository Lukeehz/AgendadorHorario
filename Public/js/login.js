    const btnLogin = document.getElementById("btnLogin");
    const btnRegister = document.getElementById("btnRegister");
    const loginForm = document.getElementById("loginForm");
    const registerForm = document.getElementById("registerForm");

    function setActiveButton(activeBtn, inactiveBtn) {
      activeBtn.classList.add("active");
      activeBtn.setAttribute("aria-pressed", "true");
      inactiveBtn.classList.remove("active");
      inactiveBtn.setAttribute("aria-pressed", "false");
    }

    btnLogin.addEventListener("click", () => {
      setActiveButton(btnLogin, btnRegister);
      loginForm.classList.remove("hidden");
      registerForm.classList.add("hidden");
    });

    btnRegister.addEventListener("click", () => {
      setActiveButton(btnRegister, btnLogin);
      registerForm.classList.remove("hidden");
      loginForm.classList.add("hidden");
    });