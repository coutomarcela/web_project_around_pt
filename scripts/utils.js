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

export { openModal, closeModal };
