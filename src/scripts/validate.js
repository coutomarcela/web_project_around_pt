//1. pegar tds os formularios e seus inputs
//2. fazer um loop que pegue um formulario de cada vez
//3. para cada formulario, fazer a validação
//4. fazer ouvidor de evento do tipo input
//5. validar cada input

// colocar uma mesma classe em todos os fomrularios que quero validar

//validar o formulário 'editar perfil'
//ambos os campos são obrigatórios
//campo nome deve ter entre 2-40 caracteres
//campo sobre deve ter entre 2-200 caracteres
//usar as mensagens de erro padrão do navegador
//enquanto houver erro em algum campo, o botão de salvar deve ficar inativo
//design para botão inativo:

//temos 2 formulários: 1) #edit-profile-form / const profileForm e 2) #new-card-form / const newCardForm

const formInputs = document.querySelectorAll(".popup__input");

//colocar um id em cada input e o nome tem que bater com o começo da classe do span

function showInputError(element, errorMessage) {
  const form = element.closest(".popup__form"); // procura o formulário mais próximo do element, que depois receberá o valor do input quando a função for chamada
  const inputList = form.querySelectorAll(".popup__input");
  const errorElement = form.querySelector(`.${element.id}-input-error`);
  errorElement.textContent = errorMessage;
  errorElement.classList.add("popup__input-error_active");
  const button = form.querySelector(".popup__button"); //pega o formulário atual e procura o botão
  toggleButtonState(inputList, button);
}

function hideInputError(element) {
  const form = element.closest(".popup__form");
  const inputList = form.querySelectorAll(".popup__input");
  const errorElement = form.querySelector(`.${element.id}-input-error`);
  errorElement.classList.remove("popup__input-error_active");
  errorElement.textContent = "";
  const button = form.querySelector(".popup__button"); //pega o formulário atual e procura o botão
  toggleButtonState(inputList, button);
}

formInputs.forEach((input) => {
  hideInputError(input); //começam todos os inputs de erro escondidos
  input.addEventListener("input", function () {
    if (!input.validity.valid) {
      //estado validity é nativo do input
      showInputError(input, input.validationMessage); //validationMessage tbm é nativo do input
    } else {
      hideInputError(input);
    }
  });
});

function hasInvalidInput(inputList) {
  return Array.from(inputList).some(function (input) {
    return !input.validity.valid;
  });
}

function toggleButtonState(inputList, buttonElement) {
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
  } else {
    buttonElement.disabled = false;
  }
}
