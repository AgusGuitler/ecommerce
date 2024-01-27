export function validateInputReq(input){
    if (input.value.trim().length>3  && input.value.trim().length <= 30) {
        input.className ="form-control is-valid"
        return true;
    }
    else{
        input.className ="form-control is-invalid"
        return false;
    }
}
export function validateEmail(input){
    const regExEmail = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
    if (regExEmail.test(input.value)) {
        input.className = "form-control is-valid";
        return true;  
    }
    else{
        input.className = "form-control is-invalid";
        return false;
    }
}
export function validatePassword(input){
    const regExPass = /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/;
    if (regExPass.test(input.value)) {
        input.className = "form-control is-valid";
        return true;  
    }
    else{
        input.className = "form-control is-invalid";
        return false;
    }
}

export function validateInputsSignUp(nameInp, emailInp, passwordInp){
    if (validateInputReq(nameInp)&&validateEmail(emailInp)&&validatePassword(passwordInp)) {
        return true;
    }else{
        return false;
    }
}
export function validateSignIn(emailSignIn, passSignIn){
    if (validateEmail(emailSignIn)&&validatePassword(passSignIn)) {
        return true;
    }else{
        return false;
    }
}

export function validateInputPrice(input) {
    const regExPrice = /^(\d{1,9}(?:\,\d{1,2})?|\d{1,2}(?:\,\d{1,2})?)$/;
    if (regExPrice.test(input.value)) {
      input.className = "form-control is-valid";
      return true;
    } else {
      input.className = "form-control is-invalid";
      return false;
    }
};

export function validateInputUrl(input) {
    const regExURL = /^https?:\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*$/;
  
    if (regExURL.test(input.value)) {
      input.className = "form-control is-valid";
      return true;
    } else {
      input.className = "form-control is-invalid";
      return false;
    }
};

export function validateInputDescription(input){
    if (input.value.trim().length >= 10 && input.value.trim().length <= 200) {
        input.className = "form-control is-valid";
        return true;
      } else {
        input.className = "form-control is-invalid";
        return false;
      }
};

export function validateInputCategory(input){
    if (input.value.trim().length >= 3 && input.value.trim().length <= 20) {
        input.className = "form-control is-valid";
        return true;
    } else {
    input.className = "form-control is-invalid";
    return false;
    }
};

export function validateInputStock(input) {
    const regExStock = /^[0-9]+$/;
    if (regExStock.test(input.value)) {
      input.className = "form-control is-valid";
      return true;
    } else {
      input.className = "form-control is-invalid";
      return false;
    }
};

export function validateAll(
    inputCode,
    inputName,
    inputPrice,
    inputCategory,
    inputImgUrl,
    inputDescription,
    inputStock
  ) {
    if (
      validateInputReq(inputCode) &&
      validateInputReq(inputName) &&
      validateInputPrice(inputPrice) &&
      validateInputCategory(inputCategory) &&
      validateInputUrl(inputImgUrl) &&
      validateInputDescription(inputDescription) &&
      validateInputStock(inputStock)
    ) {
      return true;
    } else {
      return false;
    }
};

export function getAleatoryCode(){
    return window.crypto.randomUUID();
};

export function getRoleUserLog(){
    const user = JSON.parse(sessionStorage.getItem("user"));
  
    if (user !== null) {
      return user.role;
    } else {
      return "invitado";
    }
};

/*
///Validation
//  SignIn
emailSignIn.addEventListener('blur',()=>{validateinputRequerido(emailSignIn)});
passSignIn.addEventListener('blur',()=>{validateinputRequerido(passSignIn)});
//  SignUp
nameInp.addEventListener('blur',()=>{validateinputRequerido(nameInp)});
emailInp.addEventListener('blur',()=>{validateinputRequerido(emailInp)});
passwordInp.addEventListener('blur',()=>{validateinputRequerido(passwordInp)});
repPassInp.addEventListener('blur',()=>{validateinputRequerido(repPassInp)});
*/