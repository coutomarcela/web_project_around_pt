import Card from "./Card.js";
import { FormValidator } from "./FormValidator.js";
import { openModal, closeModal } from "./utils.js";

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

// ── perfil ────────────────────────────────────────────────────────────────────
const editProfileButton = document.querySelector(".profile__edit-button");
const editProfilePopup = document.querySelector("#edit-popup");
const closeEditProfileButton = editProfilePopup.querySelector(".popup__close");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileForm = document.querySelector("#edit-profile-form");
const profileFormButton = profileForm.querySelector(".popup__button");

// ── nova card ─────────────────────────────────────────────────────────────────
const addButton = document.querySelector(".profile__add-button");
const newCardPopup = document.querySelector("#new-card-popup");
const closeNewCardPopupButton = newCardPopup.querySelector(".popup__close");
const newCardForm = document.querySelector("#new-card-form");
const newCardFormButton = newCardForm.querySelector(".popup__button");

// ── popup de imagem ───────────────────────────────────────────────────────────
const imagePopup = document.querySelector("#image-popup");
const imageElement = imagePopup.querySelector(".popup__image");
const imageCaption = imagePopup.querySelector(".popup__caption");
const closeImagePopupButton = imagePopup.querySelector(".popup__close");

// ── perfil: abrir, preencher, fechar, salvar ──────────────────────────────────
function fillProfileForm(popupElement) {
  popupElement.querySelector(".popup__input_type_name").value =
    profileTitle.innerText;
  popupElement.querySelector(".popup__input_type_description").value =
    profileDescription.innerText;
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
  profileTitle.textContent = profileForm.querySelector(
    ".popup__input_type_name",
  ).value;
  profileDescription.textContent = profileForm.querySelector(
    ".popup__input_type_description",
  ).value;
  closeModal(editProfilePopup);
}

profileForm.addEventListener("submit", handleProfileFormSubmit);

// ── cards ─────────────────────────────────────────────────────────────────────
function renderCard(name, link) {
  const newCard = new Card(name, link, "#card-template");
  const cardElement = newCard.generateCard();
  cardElement.querySelector(".card__image").addEventListener("click", () => {
    handleImagePopup(name, link);
  });
  document.querySelector(".cards__list").prepend(cardElement);
}

initialCards.forEach(function (card) {
  renderCard(card.name, card.link);
});

// ── popup de imagem ───────────────────────────────────────────────────────────
function handleImagePopup(name, link) {
  imageElement.src = link;
  imageCaption.textContent = name;
  openModal(imagePopup);
}

closeImagePopupButton.addEventListener("click", function () {
  closeModal(imagePopup);
});

// ── nova card: abrir, fechar, salvar ─────────────────────────────────────────
addButton.addEventListener("click", function () {
  openModal(newCardPopup);
});

closeNewCardPopupButton.addEventListener("click", function () {
  closeModal(newCardPopup);
});

function handleCardFormSubmit(evt) {
  evt.preventDefault();
  renderCard(
    newCardForm.querySelector(".popup__input_type_card-name").value,
    newCardForm.querySelector(".popup__input_type_url").value,
  );
  closeModal(newCardPopup);
}

newCardForm.addEventListener("submit", handleCardFormSubmit);

// ── teclado ───────────────────────────────────────────────────────────────────
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeModal(newCardPopup);
    closeModal(editProfilePopup);
    closeModal(imagePopup);
  }
});

// ── validação ─────────────────────────────────────────────────────────────────
const editProfileValidator = new FormValidator(
  profileFormButton,
  "popup__input-error_active",
  profileForm,
);
editProfileValidator.setEventListeners();

const newCardValidator = new FormValidator(
  newCardFormButton,
  "popup__input-error_active",
  newCardForm,
);
newCardValidator.setEventListeners();
