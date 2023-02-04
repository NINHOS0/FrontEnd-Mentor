const cardNumber = document.querySelector(".card-number");
const cardName = document.querySelector(".card-name");
const cardDate = document.querySelector(".card-date");
const cardCvc = document.querySelector(".card-cvc");


function isLetter(str) {
    if (str.length === 1 && str.match(/[a-z]/i)) return true;
    else return false;
}

String.prototype.numberCard = function() {
    let result = [];
    var char = this.split('');
    for (let count = 0; count < 4; count++) {
        let i = this.slice(count*4,(count+1)*4);
        if (i != "") {
            result.push(i)
        }
    }
    result = result.join(" ");
    return result;
};

String.prototype.isBlank = function() {
    if (this.length === 0) return true;
    else return false;
};
String.prototype.hasNumber = function() {
    for (let index = 0; index < this.length; index++) {
        const char = this[index];
        if (!isNaN(char)) return true;
    }
    return false;
};
String.prototype.hasLetter = function() {
    for (let index = 0; index < this.length; index++) {
        const char = this[index];
        if (isNaN(char)) return true;
    }
    return false;
};


function applyError(target, input, error) {
    input.classList.add("error");
    target.style.display = "block";
    target.innerHTML = error;
};

function removeError(target, input) {
    input.classList.remove("error");
    target.style.display = "none";
}



Element.prototype.errorName = function() {
    const error = document.querySelector(".name-error");
    if (this.value.isBlank()) {
        applyError(error, this, "Can't be blank");
        return true;
    } else if (this.value.hasNumber()) {
        applyError(error, this, "Wrong format, only letters")
        return true;
    } else {
        removeError(error, this);
    }
    return false;
};
document.querySelector(".name").addEventListener("input", (event) => {
    const input = event.target;

    input.errorName();
    cardName.innerHTML = input.value;
});



Element.prototype.errorNumberInput = function() {
    const error = document.querySelector(".number-error");
    if (this.value.isBlank()) {
        applyError(error, this, "Can't be blank");
        return true;
    } else if (this.value.replaceAll(" ", "").hasLetter()) {
        applyError(error, this, "Wrong format, numbers only");
        return true;
    } else {
        removeError(error, this)
    }
    return false;
};
document.querySelector(".number").addEventListener("input", (event) => {
    const input = event.target;

    input.errorNumberInput();
    input.value = input.value.replaceAll(" ", "").numberCard();
    cardNumber.innerHTML = input.value;
});
// document.querySelector(".number").addEventListener("change", (event) => {
//     const size = event.target.value.length;
//     const error = document.querySelector(".number-error")
    
//     if (size === 0) {
//         error.innerHTML = "Can't be blank";
//         number.classList.add("error");
//         error.style.display = "block";
//     } 
//     else if (size < 19) applyError(error, number, "Wrong format");
//     else removeError(error, number);
// });



const selected = {mm: false, yy: false};
const mm = document.querySelector(".mm");
const yy = document.querySelector(".yy");
mm.addEventListener("input", event => selected.mm = true);
yy.addEventListener("input", event => selected.yy = true);
document.querySelectorAll(".date").forEach(element => {
    element.addEventListener("input", (event) => {
        const input = event.target;
        const error = document.querySelector(".date-error")

        const aCode = input.value.charCodeAt(input.value.length-1);;
        if (aCode < 48 || aCode > 57) return input.value = input.value.replace(event.data, "");

        if (input.value.length === 0) input.classList.add("error")
        else input.classList.remove("error")

        if (mm.value.length === 0 && selected.mm) error.classList.remove("hidden");
        else if (yy.value.length === 0 && selected.yy) error.classList.remove("hidden");
        else error.classList.add("hidden");
    });
    element.addEventListener("change", (event) => {
        const input = event.target;
        if (input.className.search("mm") != -1) {
            if (input.value > 12) input.value = 12;
            else if (input.value < 1 && input.value != "") input.value = 1;
        }
        
        if (input.value.length === 1) input.value = "0"+input.value;
        cardDate.innerHTML = `${mm.value || "00"}/${yy.value || "00"}`;
    });
});



// document.querySelector(".cvc").addEventListener("input", (event) => {
//     const input = event.target;
//     const error = document.querySelector(".cvc-error");

//     if (input.value.length === 0) applyError(error, input, "Can't be blank");
//     else if (isNaN(input.value)) applyError(error, input, "Wrong format, numbers only");
//     else removeError(error, input);
//     cardCvc.innerHTML = input.value;
// });
// document.querySelector(".cvc").addEventListener("change", (event) => {
//     const input = event.target;
//     const error = document.querySelector(".cvc-error")
//     if (input.value.length != 3) applyError(error, input, "Wrong format");
// });



document.querySelector(".BTNsubmit").addEventListener("click", (event) => {
    const errors = []; //errorSpan, input, msg




    document.querySelector(".form").classList.toggle("hidden");
    document.querySelector(".complete").classList.toggle("hidden");
});
document.querySelector(".BTNcontinue").addEventListener("click", (event) => {
    document.querySelector(".form").classList.toggle("hidden");
    document.querySelector(".complete").classList.toggle("hidden");
});