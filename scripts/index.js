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

const editProfileButton = document.querySelector(".profile__edit-button");

const editProfilePopup = document.querySelector("#edit-popup");

const closeEditProfileButton = editProfilePopup.querySelector(".popup__close");

const profileTitle = document.querySelector(".profile__title");

const profileDescription = document.querySelector(".profile__description");

const profileForm = document.querySelector("#edit-profile-form");
// document.addEventListener("submit", (event) => {
//   event.preventDefault();
//   console.log(event);
// });

const addButton = document.querySelector(".profile__add-button");

const newCardPopup = document.querySelector("#new-card-popup");

const closeNewCardPopupButton = newCardPopup.querySelector(".popup__close");

const newCardForm = document.querySelector("#new-card-form");

const imagePopup = document.querySelector("#image-popup");

const imageElement = imagePopup.querySelector(".popup__image");

const imageCaption = imagePopup.querySelector(".popup__caption");

const closeImagePopupButton = imagePopup.querySelector(".popup__close");

function openModal(popupElement) {
  popupElement.classList.add("popup_is-opened");
  popupElement.addEventListener("click", (event) => {
    if (event.target === popupElement) closeModal(popupElement); //pq o popuelement é a área externa e não o formulário
  });
  popupElement.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeModal(popupElement);
    }
  });
}

function closeModal(popupElement) {
  popupElement.classList.remove("popup_is-opened");
  popupElement.removeEventListener("click", () => {});
  const inputErrorMessageName = document.getElementById("name-input-error");
  const inputErrorMessageDescription = document.getElementById(
    "description-input-error",
  );
  inputErrorMessageName.textContent = "";
  inputErrorMessageDescription.textContent = "";
}

function fillProfileForm(popupElement) {
  const popupInputTypeName = popupElement.querySelector(
    ".popup__input_type_name",
  );
  popupInputTypeName.value = profileTitle.innerText;
  const popupInputTypeDescription = popupElement.querySelector(
    ".popup__input_type_description",
  );
  popupInputTypeDescription.value = profileDescription.innerText;
}

function handleOpenEditModal(popupElement) {
  openModal(popupElement);
  fillProfileForm(popupElement);
}

editProfileButton.addEventListener("click", function () {
  handleOpenEditModal(editProfilePopup);
});

closeEditProfileButton.addEventListener("click", function () {
  closeModal(editProfilePopup);
});

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  const popupInputTypeName = document.querySelector(".popup__input_type_name");
  const popupInputTypeDescription = document.querySelector(
    ".popup__input_type_description",
  );

  profileTitle.textContent = popupInputTypeName.value;
  profileDescription.textContent = popupInputTypeDescription.value;
  closeModal(editProfilePopup);
}

profileForm.addEventListener("submit", handleProfileFormSubmit);

function handleImagePopup(name, link) {
  imageElement.src = link;
  imageCaption.textContent = name;
  openModal(imagePopup);
}

function getCardElement(name, link) {
  const cardElement = document
    .querySelector("#card-template")
    .content.querySelector(".card")
    .cloneNode(true);
  const cardTitle = cardElement.querySelector(".card__title");
  const cardImage = cardElement.querySelector(".card__image");

  cardImage.src = link;
  cardImage.alt = name;
  cardTitle.textContent = name;

  const cardLikeButton = cardElement.querySelector(".card__like-button");
  cardLikeButton.addEventListener("click", function () {
    cardLikeButton.classList.toggle("card__like-button_is-active");
  });

  const cardDeleteButton = cardElement.querySelector(".card__delete-button");
  cardDeleteButton.addEventListener("click", function () {
    cardElement.remove();
  });

  cardImage.addEventListener("click", () => handleImagePopup(name, link));

  return cardElement;
}

closeImagePopupButton.addEventListener("click", function () {
  closeModal(imagePopup);
});

function renderCard(name, link) {
  const cardElement = getCardElement(name, link);
  const cardsList = document.querySelector(".cards__list");
  cardsList.prepend(cardElement);
}

initialCards.forEach(function (card) {
  renderCard(card.name, card.link);
});

addButton.addEventListener("click", function () {
  openModal(newCardPopup);
});

closeNewCardPopupButton.addEventListener("click", function () {
  closeModal(newCardPopup);
});

function handleCardFormSubmit(evt) {
  evt.preventDefault();
  const popupCardInputTypeName = document.querySelector(
    ".popup__input_type_card-name",
  );
  const popupCardInputTypeUrl = document.querySelector(
    ".popup__input_type_url",
  );

  renderCard(popupCardInputTypeName.value, popupCardInputTypeUrl.value);
  closeModal(newCardPopup);
}

newCardForm.addEventListener("submit", handleCardFormSubmit);

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeModal(newCardPopup);
    closeModal(editProfilePopup);
    closeModal(imagePopup);
  }
});
