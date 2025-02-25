// DOMElements selector
const main = document.getElementById("main")
const modal = document.getElementById("contact_modal")
const form = document.querySelector("form")
const formData = document.querySelectorAll(".formData")
const openBtn = document.getElementById("open_contact_modal_btn")
const closeIcon = document.getElementById("close_contactForm-icon")
const submitBtn = document.getElementById("submit_btn")
// form elements selector
const firstName = document.getElementById("first")
const lastName = document.getElementById("last")
const email = document.getElementById("email")
const message = document.querySelector("textarea")
// regex
const nameRegExp = /[^0-9<>()[\]\\.,;:\s@"][A-Za-z]{1,}/
const emailRegExp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))+$/
// keyboard nav on contactForm modal
const focussableElements = `img, input, textarea, button, [tabindex]:not([tabindex="-1"]`
const firstFocusableElement = modal.querySelectorAll(focussableElements)[0];
const focusableContent = modal.querySelectorAll(focussableElements);
const lastFocusableElement = focusableContent[focusableContent.length - 1];
export class ContactForm {

  static init() {
    // open modal
    openBtn.addEventListener('click', displayModal)
    // close modal
    closeIcon.addEventListener('click', closeModal)
    // verify entry on type
    formData[0].addEventListener("input", firstNameIsValid)
    formData[1].addEventListener("input", lastNameIsValid)
    formData[2].addEventListener("input", emailIsValid)
    formData[3].addEventListener("input", messageIsValid)
    // validate contact form
    submitBtn.addEventListener("click", validate)
    // keep focus in modal
    document.addEventListener('keydown', keyboardNav)
    // close modal onkeypress "escape"
    closeIcon.addEventListener('keydown', keyboardCloseModal)
    // init focus on first element
    firstFocusableElement.focus();
  }
}

// open modal
function displayModal() {
  document.body.style.position = 'fixed'
  document.body.style.top = `-${window.scrollY}px`
  main.setAttribute('aria-hidden', 'true');
  modal.style.display = "block";
  modal.setAttribute('aria-hidden', 'false');
  closeIcon.focus();
}

// close modal
function closeModal() {
  document.body.style.position = ''
  document.body.style.top = ''
  window.scrollTo(0, parseInt(scrollY || '0') * -1)
  main.setAttribute('aria-hidden', 'false');
  modal.style.display = "none";
  modal.setAttribute('aria-hidden', 'true');
  formData.forEach(formData => {
    formData.setAttribute("data-error-visible", "false");
    formData.setAttribute("data-error", "");
  });
  form.reset();
  openBtn.focus();
}

// keyboard nav in modal
function keyboardNav(e) {
  const isTabPressed = e.key === "Tab" || e.keyCode === 9;
  // if any other key is pressed
  if (!isTabPressed) {
    return;
  }

  if (e.shiftKey) { // if shift+tab is pressed together
    if (document.activeElement === firstFocusableElement) {
      lastFocusableElement.focus(); // focus on last focusable element
      e.preventDefault();
    }
  } else { // if focus on the last focusable element
    if (document.activeElement === lastFocusableElement) {
      firstFocusableElement.focus(); // add focus on first focusable element
      e.preventDefault();
    }
  }
}

function keyboardCloseModal(e) {
  const isEscPressed = e.key === "Escape" || e.keyCode === 27;
  if (isEscPressed) {
    e.preventDefault();
    // trigger the button element with a click
    closeModal();
  }
}

// verify firstname
function firstNameIsValid() {
  if (!firstName.value.match(nameRegExp)) {
    formData[0].setAttribute("data-error-visible", "true");
    formData[0].setAttribute("data-error", "Entrez un prénom valide.");
    return false;
  } else {
    formData[0].setAttribute("data-error-visible", "false");
    formData[0].setAttribute("data-error", "");
    return true;
  }
}
// verify lastname
function lastNameIsValid() {
  if (!lastName.value.match(nameRegExp)) {
    formData[1].setAttribute("data-error-visible", "true");
    formData[1].setAttribute("data-error", "Entrez un nom valide.");
    return false;
  } else {
    formData[1].setAttribute("data-error-visible", "false");
    formData[1].setAttribute("data-error", "");
    return true;
  }
}
// verify email
function emailIsValid() {
  if (!email.value.match(emailRegExp)) {
    formData[2].setAttribute("data-error-visible", "true");
    formData[2].setAttribute("data-error", "Entrez un email valide.");
    return false;
  } else {
    formData[2].setAttribute("data-error-visible", "false");
    formData[2].setAttribute("data-error", "");
    return true;
  }
}
// verify message
function messageIsValid() {
  if (message.value == "") {
    formData[3].setAttribute("data-error-visible", "true");
    formData[3].setAttribute("data-error", "Votre message ne peut-être vide.");
    return false;
  } else {
    formData[3].setAttribute("data-error-visible", "false");
    formData[3].setAttribute("data-error", "");
    return true;
  }
}

// validate contact form
function validate(e) {
  e.preventDefault();
  if (
    firstNameIsValid() &&
    lastNameIsValid() &&
    emailIsValid() &&
    messageIsValid()
  ) {
    console.log(
      "Prénom:" + firstName.value +
      ", Nom:" + lastName.value +
      ", Email:" + email.value +
      ", Message:" + message.value);
    form.reset();
  } else {
    firstNameIsValid(),
      lastNameIsValid(),
      emailIsValid(),
      messageIsValid()
  }
}