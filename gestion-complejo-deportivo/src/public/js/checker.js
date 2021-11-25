//AUTHENTICATION - LOGIN

var username = $("#username");
var password = $("#password");
var direccion = $("#direccion");
var surname = $("#surname");
var nombre = $("#name");
var email = $("#email");
var dob = $("nacimiento");

// ------------------------ HELPERS ----------------------------

function shake(element){
    element.effect("shake", {times:2}, 750);
}

function setGreenBorder(element){
    element.css("border-color", "green");
    element.css("border-width", "1px");
}

function setRedBorder(element){
    element.css("border-color", "red");
    element.css("border-width", "2px");
}

function valid(element){
    var regex = /^[a-zA-Z0-9]+$/;
    if(!regex.test(element.val())){
        setRedBorder(element);
        return false;
    } else {
        setGreenBorder(element);
        return true;
    }
}

function validmail(element){
    var regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if(!regex.test(element.val())){
        setRedBorder(element);
        return false;
    } else {
        setGreenBorder(element);
        return true;
    }
}
// ------------------------ END HELPERS ----------------------------

// ------------------------ CHECKERS ----------------------------

function chekAllInputs(form){
    var inputs = form.find("input");
    var valid = true;
    for(var i = 0; i < inputs.length; i++){
        if(!checkInput($(inputs[i]))){
            valid = false;
        }
    }
    return valid;
}

function checkInput(element){
    if(element.val() == "" || !valid(element)){
        setRedBorder(element);
        return false;
    } else {
        setGreenBorder(element);
        return true;
    }
}

function checkInputMail(element){
    if(element.val() == "" || !validmail(element)){
        setRedBorder(element);
        return false;
    } else {
        setGreenBorder(element);
        return true;
    }
}

// ------------------------ END SIGNIN ----------------------------

//Listen when the document loads
$(document).ready(function(){
    checkInput(username);
    checkInput(password);
    checkInput(direccion);
    checkInput(surname);
    checkInput(nombre);
    checkInput(dob);
    checkInputMail(email);
});

//Listen when the user write something in the username field
username.keyup(function(){
    checkInput(username);
});

//Listen when the user write something in the password field
password.keyup(function(){
    checkInput(password);
});

//Listen when the user write something in the direccion field
direccion.keyup(function(){
    checkInput(direccion);
});

//Listen when the user write something in the surname field
surname.keyup(function(){
    checkInput(surname);
});

//Listen when the user write something in the name field
nombre.keyup(function(){
    checkInput(nombre);
});

//Listen when the user write something in the email field
email.keyup(function(){
    checkInputMail(email);
});

//Listen when the user write something in the dob field
dob.keyup(function(){
    checkInput(dob);
});

//Block the form
$("#signin").submit(function(e){
    if(!checkInput(username) || !checkInput(password)){
        e.preventDefault();
        shake($("#signin"));
    } else {
        $("#signin").submit();
    }
});

$("#signup").submit(function(e){
    if(!checkInput(username) || !checkInput(password) || !checkInput(direccion) || !checkInput(surname) || !checkInput(nombre) || !checkInput(dob) || !checkInputMail(email)){
        e.preventDefault();
        shake($("#signup"));
    } else {
        $("#signup").submit();
    }
});


