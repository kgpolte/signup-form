// Get references to the form element and all required input elements
const form = document.querySelector("form");
const firstName = document.getElementById("first");
const lastName = document.getElementById("last");
const email = document.getElementById("email");
const pwd1 = document.getElementById("pwd1");
const pwd2 = document.getElementById("pwd2");
const errorMsg = document.getElementById("error-msg");

// Check the validity of required inputs from first to last.
// Show an error message for the first invalid input encountered,
// and give the input a class of "error" so styles get updated.
function showError(mismatch=false) {

  if (mismatch) {
    errorMsg.textContent = "*Passwords do not match."
    pwd1.classList.add("error");
    pwd2.classList.add("error");
  } else if (firstName.validity.valueMissing) {
    errorMsg.textContent = "*Please enter your first name."
    firstName.classList.add("error");
  } else if (lastName.validity.valueMissing) {
    errorMsg.textContent = "*Please enter your last name."
    lastName.classList.add("error");
  } else if (email.validity.valueMissing) {
    errorMsg.textContent = "*Please enter an email address."
    email.classList.add("error");
  } else if (email.validity.typeMismatch) {
    errorMsg.textContent = "*Please check that the email address is correctly formatted."
    email.classList.add("error");
  } else if (pwd1.validity.valueMissing) {
    errorMsg.textContent = "*Please enter a password."
    pwd1.classList.add("error");
  } else if (pwd2.validity.valueMissing) {
    errorMsg.textContent = "*Please confirm your password."
    pwd2.classList.add("error");
  }
}

// Check the validity of an input an either show an error or clear the error
// and change the styles accordingly
function validateInput(input) {
  console.log(input);
  if (input.validity.valid) {
    errorMsg.textContent = "";
    input.classList.remove("error");
  } else {
    showError();
    input.classList.add("error");
  }
}

function checkPasswordMatch() {
  if (pwd1.value === pwd2.value) {
    return true;
  }
  return false;
}

// Check that all of the required fields are valid on submit.
// If not, prevent submission and show an error message.
form.addEventListener("submit", e => {
  if( !firstName.validity.valid ||
      !lastName.validity.valid ||
      !email.validity.valid ||
      !pwd1.validity.valid ||
      !pwd2.validity.valid ) {
    showError();
    e.preventDefault();
  } else if (!checkPasswordMatch()) {
    showError(true);
    e.preventDefault();
  }
});

// Add an event listener to each input to validate its contents upon focus out
firstName.addEventListener("focusout", e => validateInput(e.target));
lastName.addEventListener("focusout", e => validateInput(e.target));
email.addEventListener("focusout", e => validateInput(e.target));
pwd1.addEventListener("focusout", e => validateInput(e.target));
pwd2.addEventListener("input", e => {
  if (!checkPasswordMatch()) {
    showError(true);
  } else {
    validateInput(pwd1);
    validateInput(pwd2);
  }
});