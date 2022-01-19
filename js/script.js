// Referência dos elementos
const padKeyEls = document.querySelectorAll(".pad_key");
const smallDisplayEl = document.querySelector(".display_operation");
const bigDisplayEl = document.querySelector(".display_result");

// Variáveis
let bigDisplay = "";
let number1;
let number2;
let operator = "";
let result = false;
let blocked = false;

// Definindo o valor de bigDisplayEL como 0
bigDisplayEl.textContent = "0";

// Para evitar que passe do estipulado
fitty(bigDisplayEl, { maxSize: 50 });
fitty(smallDisplayEl, { maxSize: 25, minSize: 11 });

// Detecta quando um botão for pressionado
padKeyEls.forEach((padKey) => {
  padKey.addEventListener("click", () => {
    const key = padKey.textContent;

    // Um número foi clicado
    if (!isNaN(key)) {
      if (result) {
        clear();
      }

      // Atualizar big display
      if (bigDisplay.split("").length < 16) {
        // Previnir números com o 0 na frente, ex: 04
        if (bigDisplay === "0") {
          bigDisplay = "";
        }

        // Atualizar bigDisplay
        bigDisplay += key;

        // Atualizar texto da big display
        setBigDisplay(bigDisplay);
      }
    }

    // Clicou no ponto
    else if (key === ".") {
      // Se um resultado foi calculado antes, começa do zero
      if (result) {
        clear();
      }

      if (!bigDisplay.includes(".")) {
        bigDisplay ? (bigDisplay += ".") : (bigDisplay += "0.");
      }

      setBigDisplay(bigDisplay);
    }

    // Um operador foi clicado
    else if (key === "+" || key === "-" || key === "*" || key === "/") {
      // Define o resultado como false se um operador for clicado após o cálculo
      if (result) {
        result = false;
      }

      if (!operator) {
        // Armazenamento do 1º número
        number1 = Number(bigDisplay);
      } else {
        if (bigDisplay) {
          // Armazenamento do 2º número
          number2 = Number(bigDisplay);

          // Atualiza o number1 para o resultado da operação
          number1 = operate(number1, number2, operator);

          // Clear number2
          number2 = undefined;
        }
      }

      // Atualizar o texto da bigDisplay
      setBigDisplay(number1);

      // Armazena o operator
      operator = key;

      // Atualizar o texto da bigDisplay
      if (!blocked) {
        setSmallDisplay();
      }

      // Clear bigDisplay
      bigDisplay = "";
    }

    // Se clicar em porcentagem
    else if (key === "%") {
      if (!number1) {
        bigDisplay = (bigDisplay / 100).toString();

        setBigDisplay(bigDisplay);
      }
    }

    // Se clicar em delete
    else if (key === "DEL") {
      if (bigDisplay) {
        // Converte bigDisplay para array
        bigDisplayArr = bigDisplay.split("");

        // Deleta o último digito
        bigDisplayArr.pop();

        // Converte array em string e atualiza bigDisplay
        bigDisplay = bigDisplayArr.join("");

        bigDisplayArr.length > 0
          ? setBigDisplay(bigDisplay)
          : setBigDisplay("0");
      }
    }

    // Se clicar em ac
    else if (key === "AC") {
      clear();
    }

    // Se clicar em igual
    else {
      if (number1 !== undefined && bigDisplay !== "" && !result) {
        // Armazenar number2
        number2 = Number(bigDisplay);

        // Atualizar o texto da bigDisplay
        setSmallDisplay();

        // Operar e atualizar bigDisplay
        number1 = operate(number1, number2, operator);
        setBigDisplay(number1);

        // Redefine number2
        number2 = undefined;

        // Define resultado como verdadeiro
        result = true;

        // Clear bigDisplay
        bigDisplay = "";
      }
    }
  });
});