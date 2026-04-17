const initialCards = [
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

// criar uma variável para o botao do lapis (editar)
const editProfileButton = document.querySelector(".profile__edit-button");

// criar uma variavel para o popup de edição q aparece dps de clicar no botao do lapis
const editProfilePopup = document.querySelector("#edit-popup");

// criar uma variável para o botao de fechar o pop up de edição 
const closeEditProfileButton = editProfilePopup.querySelector(".popup__close"); // pegar editProfilePopup pq tem vários buttons com a mesma classe no documento

// cria variável com o nome para preencher o popup de editar 
const profileTitle = document.querySelector(".profile__title") 

// cria variável com descrição para preencher no popup de editar
const profileDescription = document.querySelector(".profile__description") 

//cria variável para a edição de perfil
const profileForm = document.querySelector("#edit-profile-form");

//criar uma variável para o botão que abre o popup de adicionar imagens
const addButton = document.querySelector(".profile__add-button");

//criar variável para o popup de adição de imagem
const newCardPopup = document.querySelector("#new-card-popup");

//criar uma variável para o botão de fechar o pop up de adicionar imagens 
//pegar de newCardPopup pq se procurar em document, tem outro botão com a classe .popup__close
const closeNewCardPopupButton = newCardPopup.querySelector(".popup__close"); 

//criar uma variável para o newcardform
const newCardForm = document.querySelector("#new-card-form");

//criar uma variável para o popup de abrir a imagem
const imagePopup = document.querySelector("#image-popup");

//criar uma variável para a imagem do imagpopup
const imageElement = imagePopup.querySelector(".popup__image");

//criar variável para a legenda do imagepopup
const imageCaption = imagePopup.querySelector(".popup__caption");

//criar uma variavel para o botao de fechar image popup
const closeImagePopupButton = imagePopup.querySelector(".popup__close");

//criar função que abre um elemento popup
function openModal(popupElement) {
  popupElement.classList.add("popup_is-opened")
}

//criar função que fecha um elemento popup
function closeModal(popupElement) {
  popupElement.classList.remove("popup_is-opened")
}

//criar uma função que preenche o profilefomr
function fillProfileForm(popupElement) {
  const popupInputTypeName = popupElement.querySelector(".popup__input_type_name") // seleciona o input de nome dentro do popup
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
  closeModal(editProfilePopup)
})

// criar uma função que 
function handleProfileFormSubmit(evt) { //evt depende do contexto onde a função está sendo chamada
  evt.preventDefault(); //evita que recarregue a pagina
  const popupInputTypeName = document.querySelector(".popup__input_type_name");
  const popupInputTypeDescription = document.querySelector(".popup__input_type_description");

  profileTitle.textContent = popupInputTypeName.value; 
  profileDescription.textContent = popupInputTypeDescription.value;
  closeModal(editProfilePopup);
}

profileForm.addEventListener("submit", handleProfileFormSubmit)

function handleImagePopup(name, link) {
  imageElement.src = link;
  imageCaption.textContent = name;
  openModal(imagePopup)
}

//cria o card a partir do template
function getCardElement(name="Lugar sem nome", link="../images/placeholder.jpg") {
  //clonar o conteúdo do template e armazenar em uma variável
  const cardElement = document
  .querySelector("#card-template")
  .content
  .querySelector(".card")
  .cloneNode(true);
  const cardTitle = cardElement.querySelector(".card__title");
  const cardImage = cardElement.querySelector(".card__image");

  cardImage.src = link;
  cardImage.alt = name;
  cardTitle.textContent = name;

  // fazer com que o botão de curtir fique selecionado no card
  const cardLikeButton = cardElement.querySelector(".card__like-button");
  cardLikeButton.addEventListener("click", function(){
    cardLikeButton.classList.toggle("card__like-button_is-active");
  })

  //fazer com que o botão de excluir delete o card da página
  const cardDeleteButton = cardElement.querySelector(".card__delete-button");
  cardDeleteButton.addEventListener("click", function(){
    cardElement.remove();
  })

  //abrir o popup da imagem grande 
  cardImage.addEventListener("click", () => handleImagePopup(name,link)) 

  return cardElement;
}

//capturar o clique no botão de fechar o popup da imagem e fechar o popup
closeImagePopupButton.addEventListener("click", function(){
  closeModal(imagePopup);
})

//pega o card e coloca dentro da lista
function renderCard(name, link){
  const cardElement = getCardElement(name, link); //peguei o retorno da função, que é cardElement
  console.log("valor de cardElement", cardElement)
  const cardsList = document.querySelector(".cards__list"); //peguei a lista de cards
  cardsList.prepend(cardElement); //adicionar o card na lista 
}

/* 
TESTE: PERCORRER O ARRAY INITIALCARDS PARA VER SE ESTÁ FUNCIONANDO
*/
//para cada card, chamei a função rendercard()
initialCards.forEach(function(card){renderCard(card.name, card.link)}) 

//capturar o clique no botão de adicionar imagem e abrir o popup
addButton.addEventListener("click", function(){
  openModal(newCardPopup);
})

//capturar o clique no botão de fechar o popup de adicionar imagem e fechar o popup
closeNewCardPopupButton.addEventListener("click", function(){
  closeModal(newCardPopup);
})

//criar uma função que puxa as informações que passei pro formulário e passa para a função de criar o cartão 
function handleCardFormSubmit(evt) { //evt depende do contexto onde a função está sendo chamada
  evt.preventDefault(); //evita que recarregue a pagina
  const popupCardInputTypeName = document.querySelector(".popup__input_type_card-name");
  const popupCardInputTypeUrl = document.querySelector(".popup__input_type_url");

  //usar os valores dos inputs na função de criar cartao
  renderCard(popupCardInputTypeName.value, popupCardInputTypeUrl.value)
  closeModal(newCardPopup);
}

newCardForm.addEventListener("submit", handleCardFormSubmit)