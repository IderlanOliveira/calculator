// Adiciona vírgula a cada 3 digitos
const formatWithCommas = (number) => {
    return number.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
  };
  
  // Permite adicionar números decimais
  const formatNumber = (number) => {
    return Number((Math.round(number * 100) / 100).toFixed(2));
  };
  
  // Adição
  const add = (n1, n2) => {
    return formatNumber(n1 + n2);
  };
  
  // Subtração
  const subtract = (n1, n2) => {
    return formatNumber(n1 - n2);
  };
  
  // Multiplicação
  const multiply = (n1, n2) => {
    return formatNumber(n1 * n2);
  };
  
  // Divisão
  const divide = (n1, n2) => {
    // Se a divisão for por 0
    if (n2 === 0) {
      // Limpa a tela pequena
      smallDisplayEl.textContent = "";
  
      // Block calculator
      blockCalculator();
  
      // Mensagem de retorno que será exibida no display
      return "∞";
    }
  
    return formatNumber(n1 / n2);
  };
  
  // Chama uma função específica a depender da operação
  const operate = (n1, n2, operation) => {
    switch (operation) {
      case "+":
        return add(n1, n2);
      case "-":
        return subtract(n1, n2);
      case "*":
        return multiply(n1, n2);
      case "/":
        return divide(n1, n2);
    }
  };
  
  // Redefine tudo
  const clear = () => {
    bigDisplay = "";
    number1 = undefined;
    operator = "";
    result = false;
  
    bigDisplayEl.textContent = "0";
  
    smallDisplayEl.textContent = "";
  
    // Se a calculator estiver bloqueada
    if (blocked) {
      [...padKeyEls].forEach((key) => {
        key.style.removeProperty("pointer-events");
        key.style.removeProperty("opacity");
      });
  
      blocked = false;
    }
  };
  
  // Definir bigDisplay
  const setBigDisplay = (number) => {
    // Converte número para string
    let stringNumber = number.toString();
  
    // Se o número for decimal, é necessário formatar a parte inteira
    if (stringNumber.includes(".")) {
      // Dividir stringNumber em partes inteiras e decimais
      const numberArray = stringNumber.split(".");
  
      // Formatar a parte inteira
      numberArray[0] = formatWithCommas(numberArray[0]);
  
      // Juntar o array formatado
      stringNumber = numberArray.join(".");
  
      // Atualizar bigDisplay
      bigDisplayEl.textContent = stringNumber;
    } else {
      // Se o number for inteiro, apenas atualiza a bigDisplay
      bigDisplayEl.textContent = formatWithCommas(stringNumber);
    }
  };
  
  // Define o texto para a tela pequena
  const setSmallDisplay = () => {
    smallDisplayEl.textContent =
      number2 !== undefined
        ? `${number1} ${operator} ${number2} =`
        : `${number1} ${operator}`;
  };
  
  // Blocks calculator quando um número é dividido por 0
  const blockCalculator = () => {
    // Todos os padKeys, exceto o AC
    const filteredKeys = [...padKeyEls].filter(
      (padKey) => padKey.textContent !== "AC"
    );
  
    // Bloqueia todas as teclas, exceto o AC
    filteredKeys.forEach((key) => {
      key.style.pointerEvents = "none";
      key.style.opacity = "0.85";
    });
  
    blocked = true;
  };