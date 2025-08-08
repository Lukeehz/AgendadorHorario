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

const params = new URLSearchParams(window.location.search);
const error = params.get("error");
if (error) {
  alert("Erro ao realizar o login: " + error);
}

// 🚀 Validação dos formulários antes de enviar
document.querySelectorAll("form").forEach(form => {
  form.addEventListener("submit", (e) => {
    let valid = true;

    form.querySelectorAll("input[required]").forEach(input => {
      if (!input.value.trim()) {
        input.classList.add("is-invalid");
        valid = false;
      } else {
        input.classList.remove("is-invalid");
      }
    });

    if (!valid) {
      e.preventDefault(); // Impede envio se tiver campo vazio
      alert("Por favor, preencha todos os campos obrigatórios.");
    }
  });
});
