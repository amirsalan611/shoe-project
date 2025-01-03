import { loginUser } from "./user-login.js";

const backBtn = document.getElementById("backToGetStart");
const emailInput = document.getElementById("email");
const passInput = document.getElementById("pass");
const singInBtn = document.getElementById("singInBtn");
const passEye = document.getElementById("passEye");

passEye.addEventListener("click", () => {
  if (passInput.type === "password") {
    passInput.type = "text";
  } else {
    passInput.type = "password";
  }
});

backBtn.addEventListener("click", () => {
  window.location.href = "../getStart/getStart.html";
});

function singInColor() {
  if (emailInput.value && passInput.value) {
    singInBtn.classList.remove("bg-opacity-50");
    singInBtn.disabled = false;
  } else {
    singInBtn.classList.add("bg-opacity-50");
    singInBtn.disabled = true;
  }
}

emailInput.addEventListener("input", singInColor);
passInput.addEventListener("input", singInColor);
singInBtn.addEventListener("click", async () => {
  const success = await loginUser(emailInput.value, passInput.value);
  if (success) {
    window.location.href = "../home/home.html";
  }
});
