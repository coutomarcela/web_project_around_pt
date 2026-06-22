import Card from "./Card.js";
import { FormValidator } from "./FormValidator.js";
import Section from "./Section.js";
import Popup from "./Popup.js";
import PopupWithImage from "./PopupWithImage.js";
import PopupWithForm from "./PopupWithForm.js";
import PopupWithConfirmation from "./PopupWithConfirmation.js";
import UserInfo from "./UserInfo.js";
import { api } from "./api.js";

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

//deletar card
const deleteCardPopup = new PopupWithConfirmation(
  "#delete-popup",
  handleDeleteCard,
);

deleteCardPopup.setEventListeners();

// isso está encadeado com getInitialCards() de api.js
api
  .getInitialCards()
  .then((result) => {
    //result = res.json()
    //só entramos nesse then se a solicitação for ok
    const section = new Section(
      //se der tudo certo, criamos a seção section
      {
        items: result,
        //o resultado da solicitação é passado como result (substituindo getInitialCards)
        renderer: (card) => {
          console.log(card);
          //_id sempre que vier da resposta da api
          const cardElement = renderCard(
            card.name,
            card.link,
            card._id,
            card.isLiked,
          );
          section.addItem(cardElement);
        },
      },
      ".cards__list",
    );
    section.renderItems();
  })

  .catch((err) => {
    console.log(err); // registra o erro no console
  });

//instancia da classe userinfo
const userInfo = new UserInfo(
  ".profile__title",
  ".profile__description",
  ".profile__image",
);

//acessar api para pegar os dados de perfil
api.getUserInfo().then((result) => {
  userInfo.setUserInfo(result.name, result.about, result.avatar);
});

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
  profileFormButton.textContent = "Salvando...";
  api
    .editUserInfo(inputValues.name, inputValues.description)
    .then((res) => {
      //atualiza no html visível
      userInfo.setUserInfo(
        inputValues.name,
        inputValues.description,
        res.avatar,
      );
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
      profileFormButton.textContent = "Salvar";
    });
}

profileForm.addEventListener("submit", handleProfileFormSubmit);

// ── cards ─────────────────────────────────────────────────────────────────────
//cria um objeto Card, gera o HTML e adiciona o HTML na página
function renderCard(name, link, id, isLiked) {
  const cardContainer = document.querySelector(".cards__list");
  const newCard = new Card(
    name,
    link,
    "#card-template",
    () => handleImagePopup(name, link),
    isLiked,
    () => {
      //addLike é um método que existe na classe Api, api é uma instância e consegue acessar todos os métodos da classe mãe
      console.log(isLiked);
      if (!isLiked) {
        api
          .addLike(id)
          //se o like for um sucesso, then...
          .then(() => {
            newCard.toggleLike();
            newCard.updateLikesView();
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        api.removeLike(id).then(() => {
          newCard.toggleLike();
          newCard.updateLikesView();
        });
      }
    },
    () => {
      deleteCardPopup.open(newCard);
    },
    id,
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
  //salvar o cartão na api
  //só entra no .then se a requisição for um sucesso
  //só se for um sucesso fazemos ficar visível no html (chama renderCard)
  profileFormButton.textContent = "Salvando...";
  api
    .addCard(inputValues["place-name"], inputValues.link)
    .then((res) => {
      renderCard(
        inputValues["place-name"],
        inputValues.link,
        res._id,
        res.isLiked,
      );
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
      profileFormButton.textContent = "Salvar";
    });
}

// ── excluir card  ─────────────────────────────────────────

function handleDeleteCard(card) {
  api
    //chama o deleteCard que pinga na Api
    .deleteCard(card.getId())
    //se deleteCard for um sucesso, then...
    .then(() => {
      card.removeCard();
      deleteCardPopup.close();
    })
    .catch((error) => {
      console.log(error);
    });
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

// ── editar avatar ────────────────────────────────────────────────────────────
//passo a passo:
//1.variável para o botão de editar
const editAvatarButton = document.querySelector(".profile__image-hover");

//4.função que faz o submit do form do avatar através de conexão com api (métodos declarados em api.js)
function handleAvatarFormSubmit(inputValues) {
  profileFormButton.textContent = "Salvando...";
  api
    .editProfileAvatar(inputValues.link)
    .then((res) => {
      //atualiza no html visível
      userInfo.setUserInfo(res.name, res.about, res.avatar);
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
      profileFormButton.textContent = "Salvar";
    });
}

//3.criar uma instância de popupWithForm (precisa receber um id e uma função)

const editAvatarPopup = new PopupWithForm(
  "#edit-profile-avatar",
  handleAvatarFormSubmit,
);

//chamar o método declarado na clase
editAvatarPopup.setEventListeners();

//2.evento de clique no botão que abre o popup
editAvatarButton.addEventListener("click", () => {
  editAvatarPopup.open();
});
