const form = document.querySelector("#imc-form");
const heightInput = document.querySelector("#height");
const weightInput = document.querySelector("#weight");
const clearBtn = document.querySelector("#clear-btn");
const resultContainer = document.querySelector("#result-container");
const imcNumber = document.querySelector("#imc-number");
const imcInfo = document.querySelector("#imc-info");
const backBtn = document.querySelector("#back-btn");

const calcImc = (weight, height) => {
    const imc = (weight / (height * height)).toFixed(1);
    return imc;
};

const showOrHideResults = () => {
    form.classList.toggle("hide");
    resultContainer.classList.toggle("hide");
};

const cleanInputs = () => {
    heightInput.value = "";
    weightInput.value = "";
    imcNumber.className = "";
    imcInfo.className = "";
};

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const weight = +weightInput.value.replace(",", ".");
    const height = +heightInput.value.replace(",", ".");

    if (!weight || !height) return;

    const imc = calcImc(weight, height);
    let info;
    let infoClass;

    if (imc < 18.5) {
        info = "Abaixo do peso";
        infoClass = "warning";
    } else if (imc >= 18.5 && imc <= 24.9) {
        info = "Peso normal";
        infoClass = "good";
    } else if (imc >= 25 && imc <= 29.9) {
        info = "Sobrepeso";
        infoClass = "warning";
    } else if (imc >= 30 && imc <= 39.9) {
        info = "Obesidade";
        infoClass = "danger";
    } else if (imc >= 40) {
        info = "Obesidade grave";
        infoClass = "danger";
    }

    imcNumber.innerText = imc;
    imcInfo.innerText = info;

    imcNumber.classList.add(infoClass);
    imcInfo.classList.add(infoClass);

    showOrHideResults();
});

clearBtn.addEventListener("click", (e) => {
    e.preventDefault();
    cleanInputs();
});

backBtn.addEventListener("click", () => {
    cleanInputs();
    showOrHideResults();
});