// DOM ELEMENTS 
const nameField = document.querySelector('#name');
const emailField = document.querySelector('#email');
const passwordField = document.querySelector('#password');
const confirmPasswordField = document.querySelector('#confirm-password');
const signUpButton = document.querySelector('#btn-signup');
const signUpForm = document.querySelector('.signup-form');
const result = document.querySelector('.result');


// SINGLE CHECK FUNCTIONS

const isEmpty = function (field) {
    if (field.value == '') {
        isNotValid(field, `${field.name} field can't be empty.`)
        return true;
    } else {
        isValid(field);
        return false;
    }
}

const onlyLetters = function (field) {
    if (/^[a-zA-Z ]+$/.test(field.value)) {
        isValid(field);
        return true;
    } else {
        isNotValid(field, `${field.name} field can contain only letters.`);
        return false;
    }
}

const properLength = function (field, minLength, maxLength) {
    if (field.value.length >= minLength && field.value.length < maxLength) {
        isValid(field);
        return true;
    } else if (field.value.length < minLength) {
        isNotValid(
            field,
            `${field.name} field must be at least ${minLength} characters long.`
        );
        return false;
    } else {
        isNotValid(
            field,
            `${field.name} field can have a maximum of ${maxLength} characters.`
        );
        return false;
    }
}


const properEmail = function (field) {
    let regExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (regExp.test(field.value)) {
        isValid(field);
        return true;
    } else {
        isNotValid(field, `That field must be a valid email address.`);
        return false;
    }
}

const properPassword = function (field) {
    regExp = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/;
    if (regExp.test(field.value)) {
        isValid(field);
        return true;
    } else {
        isNotValid(field, `That field must contain at least one uppercase, one lowercase and one number.`);
        return false;
    }
}

// SET VALID/INVALID FUNCTIONS 

const isNotValid = function (field, errorText) {
    field.classList.remove('valid');
    field.classList.add('not-valid');
    field.nextElementSibling.textContent = errorText;
}

const isValid = function (field) {
    field.classList.remove('not-valid');
    field.classList.add('valid');
    field.nextElementSibling.textContent = '';
}

// CHECK FORM FIELDS 

// check that name field is not empty, have only letters and enough characters
const checkName = function () {
    if (isEmpty(nameField)) return;
    if (!onlyLetters(nameField)) return;
    if (!properLength(nameField, 6, 24)) return;
    return true;
}

// check that email field is not empty and looks like email address  
const checkEmail = function () {
    if (isEmpty(emailField)) return;
    if (!properEmail(emailField)) return;
    return true;
}

// check that password field is not empty and contains uppercase, lowercase and number
const checkPassword = function () {
    if (!properLength(passwordField, 6, 32)) return;
    if (!properPassword(passwordField)) return;
    return true;
}


// if password is ok, check that both passwords are the same 
const checkConfirmedPassword = function () {
    if (checkPassword) {
        if (passwordField.value !== confirmPasswordField.value) {
            isNotValid(confirmPasswordField, `Passwords must be the same.`);
            return false;
        } else {
            isValid(confirmPasswordField);
            return true;
        }
    }
}


// SIGN UP FORM SUBMIT FUNCTION 
// If all input validations returns true, disable inputs, hide signup button and show success info 
signUpForm.addEventListener('submit', function (e) {
    e.preventDefault();
    if (
        checkName() &&
        checkEmail() &&
        checkPassword() &&
        checkConfirmedPassword()
    ) {
        const fields = [nameField, emailField, passwordField, confirmPasswordField]
        for (x = 0; x < fields.length; x++) {
            fields[x].disabled = true;
        }
        signUpButton.classList.add('hidden');
        result.textContent = "Sign up successful. Thank You for joining Us.";
    }
})