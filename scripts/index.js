initialCards = [
  {
    name: "Vale de Yosemite",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_yosemite.jpg",
  },
  {
    name: "Lago Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lake-louise.jpg",
  },
  {
    name: "Montanhas Carecas",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_latemar.jpg",
  },
  {
    name: "Parque Nacional Vanoise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lago.jpg",
  },
];

/* 
TESTE: PERCORRER O ARRAY INITIALCARDS PARA VER SE ESTÁ FUNCIONANDO
*/

initialCards.forEach(function (card) {
  console.log(card);
});


// criar uma variável para o botao do lapis (editar)
const editProfileButton = document.querySelector(".profile__edit-button");

// criar uma variavel para o popup de edição q aparece dps de clicar no botao do lapis
const editProfilePopup = document.querySelector("#edit-popup");

// criar uma variável para obotao de fechar o pop up de edição 
const closeEditProfileButton = editProfilePopup.querySelector(".popup__close"); // pegar editProfilePopup pq tem vários buttons com a mesma classe no documento

const profileTitle = document.querySelector(".profile__title") // cria variável com o nome para preencher o popup de editar 

const profileDescription = document.querySelector(".profile__description") // cria variável com descrição para preencher no popup de editar

const profileForm = document.querySelector("#edit-profile-form");

// funções q fazem as coisas
// add class ao modal de abrir
function openModal(popupElement) {
  popupElement.classList.add("popup_is-opened")
}

//remove class de abrir para fechar
function closeModal(popupElement) {
  popupElement.classList.remove("popup_is-opened")
}

//
function fillProfileForm(popupElement) {
  console.log("valor de popupElement" , popupElement)
  const popupInputTypeName = popupElement.querySelector(".popup__input_type_name") // selectiona o input de nome dentro do popup
  popupInputTypeName.value = profileTitle.innerText // toda tag input tem um valor + determina que o input será preenchido com o innerText da variável criada em cima
  const popupInputTypeDescription = popupElement.querySelector(".popup__input_type_description")
  popupInputTypeDescription.value = profileDescription.innerText
}

function handleOpenEditModal(popupElement){
  openModal(popupElement) // o popup q quero abrir passa como argumento 
  fillProfileForm(popupElement);
}

//capturar o evento de click e fazer ele abrir o modal 
// editProfileButton.addEventListener("click", () => openModal(editProfilePopup));
editProfileButton.addEventListener("click", function(){
  handleOpenEditModal(editProfilePopup)
})

closeEditProfileButton.addEventListener("click", function() {
  console.log("clicou no fechar")
  closeModal(editProfilePopup)
})

// criar uma função que 
function handleProfileFormSubmit(evt) { //evt depende do contexto onde a função está sendo chamada
  evt.preventDefault(); //evitaque recarregue a pagina
  const popupInputTypeName = document.querySelector(".popup__input_type_name");
  const popupInputTypeDescription = document.querySelector(".popup__input_type_description");

  profileTitle.textContent = popupInputTypeName.value; 
  profileDescription.textContent = popupInputTypeDescription.value;
  closeModal(editProfilePopup);

}

profileForm.addEventListener("submit", handleProfileFormSubmit)