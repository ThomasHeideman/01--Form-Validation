'use strict';

const form = document.getElementById('form');
const userName = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');

// Show input error message
function showError(input, message) {
  const formControl = input.parentElement;
  formControl.className = 'form-control error';
  const small = formControl.querySelector('small');
  small.textContent = message;
}
// show success outline
function showSuccess(input) {
  const formControl = input.parentElement;
  formControl.className = 'form-control success';
}

// Check email
function checkEmail(input) {
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (re.test(input.value.trim())) {
    showSuccess(input);
  } else {
    // NOTE: old reference to getFieldName() function
    //showError(input, `${getFieldName(input)} is not valid`);
    showError(input, `${input.name} is not valid`);
  }
}

// Check required fields
function checkRequired(inputArr) {
  inputArr.forEach(function (input) {
    if (input.value.trim() === '') {
      showError(input, `${input.name} is required`);
    } else {
      showSuccess(input);
    }
  });
}
// Check input length

function checkLength(input, min, max = 100) {
  if (input.value.length < min) {
    showError(input, `${input.name} should be at least ${min} characters`);
  } else if (input.value.length > max) {
    showError(input, `${input.name} cannot be more than ${max} characters`);
  } else {
    showSuccess(input);
  }
}
// Check passwords match
function checkPassWordsMatch(input1, input2) {
  if (input1.value !== input2.value) {
    showError(input2, `Passwords do not match`);
  } else if (input2.value !== '') {
    showSuccess(input2);
  }
}

// NOTE: removed necessity for getFieldName() function, by making use of the name atrribute on <input>
// Get Field name
// function getFieldName(input) {
//   //return input.id.charAt(0).toUpperCase() + input.id.slice(1);
//   return input.name;
// }

// Event listeners
form.addEventListener('submit', function (e) {
  e.preventDefault();
  checkRequired([userName, email, password, password2]);
  checkLength(userName, 3);
  checkLength(password, 6, 25);
  checkEmail(email);
  checkPassWordsMatch(password, password2);
});
