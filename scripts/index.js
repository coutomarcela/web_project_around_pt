import Card from "./Card.js";
import { FormValidator } from "./FormValidator.js";
import Section from "./Section.js";
import Popup from "./Popup.js";
import PopupWithImage from "./PopupWithImage.js";
import PopupWithForm from "./PopupWithForm.js";
import UserInfo from "./UserInfo.js";

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
function fillProfileForm() {
  const popupElement = document.querySelector("#edit-popup");
  const userInformation = userInfo.getUserInfo();
  popupElement.querySelector(".popup__input_type_name").value =
    userInformation.name;
  popupElement.querySelector(".popup__input_type_description").value =
    userInformation.description;
}

function handleOpenEditModal(popupElement) {
  editProfilePopup.open();
  fillProfileForm(popupElement);
}

editProfileButton.addEventListener("click", function () {
  handleOpenEditModal(editProfilePopup);
});

function handleProfileFormSubmit(inputValues) {
  userInfo.setUserInfo(inputValues.name, inputValues.description);
}

profileForm.addEventListener("submit", handleProfileFormSubmit);

// ── cards ─────────────────────────────────────────────────────────────────────
function renderCard(name, link) {
  const cardContainer = document.querySelector(".cards__list");
  const newCard = new Card(name, link, "#card-template", () =>
    handleImagePopup(name, link),
  );
  const cardElement = newCard.generateCard();
  cardContainer.prepend(cardElement);
  return cardElement;
}

// ── nova card: abrir, fechar, salvar ─────────────────────────────────────────
addButton.addEventListener("click", function () {
  addNewCardPopup.open();
});

function handleCardFormSubmit(inputValues) {
  renderCard(inputValues["place-name"], inputValues.link);
  // closeModal(newCardPopup);
}

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

const editProfilePopup = new PopupWithForm(
  "#edit-popup",
  handleProfileFormSubmit,
  () => editProfileValidator.resetValidation(),
);

editProfilePopup.setEventListeners();

const addNewCardPopup = new PopupWithForm(
  "#new-card-popup",
  handleCardFormSubmit,
  () => newCardValidator.resetValidation(),
);

addNewCardPopup.setEventListeners();

const popupWithImage = new PopupWithImage("#image-popup");

popupWithImage.setEventListeners();

function handleImagePopup(name, link) {
  popupWithImage.open(name, link);
}

const userInfo = new UserInfo(".profile__title", ".profile__description");

const section = new Section(
  {
    items: initialCards,
    renderer: (card) => {
      const cardElement = renderCard(card.name, card.link);
      section.addItem(cardElement);
    },
  },
  ".cards__list",
);

section.renderItems();
