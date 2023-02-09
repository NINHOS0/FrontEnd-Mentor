
const inputs = {
    name: document.querySelector(".name"),
    number: document.querySelector(".number"),
    yy: document.querySelector(".yy"),
    mm: document.querySelector(".mm"),
    cvc: document.querySelector(".cvc")
};

const errors = {
    name: document.querySelector(".name-error"),
    number: document.querySelector(".number-error"),
    date: document.querySelector(".date-error"),
    cvc: document.querySelector(".cvc-error")
}

const card = {
    name: document.querySelector(".card-name"),
    number: document.querySelector(".card-number"),
    date: document.querySelector(".card-date"),
    cvc: document.querySelector(".card-cvc")
};

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

function applyError(input, target, msg) {
    input.classList.add("error");
    target.classList.remove("hidden");
    target.innerHTML = msg;
};

function removeError(input, target) {
    input.classList.remove("error");
    target.classList.add("hidden");
};

function getErrorName() {
    const _input = inputs.name;
    const _error = errors.name;

    if (_input.value.isBlank()) return {input: _input, error: _error, msg: "Can't be blank"};
    if (_input.value.hasNumber()) return {input: _input, error: _error, msg: "Wrong format"};
    return false
};

function getErrorNumber() {
    const _input = inputs.number;
    const _error = errors.number;

    if (_input.value.isBlank()) return {input: _input, error: _error, msg: "Can't be blank"};
    if (_input.value.replaceAll(" ", "").hasLetter()) return {input: _input, error: _error, msg: "Wrong format, numbers only"};
    if (_input.value.length < 19) return {input: _input, error: _error, msg: "Wrong format"};
    return false
};

function getErrorCVC() {
    const _input = inputs.cvc;
    const _error = errors.cvc;

    if (_input.value.isBlank()) return {input: _input, error: _error, msg: "Can't be blank"};
    if (isNaN(_input.value)) return {input: _input, error: _error, msg: "Wrong format, numbers only"};
    if (_input.value.length != 3) return {input: _input, error: _error, msg: "Wrong format"};
    return false
};

function getErrorMM() {
    const _input = inputs.mm;
    const _error = errors.date;
    
    if (_input.value.isBlank()) return {input: _input, error: _error, msg: "Can't be blank"};
    if (_input.value.hasLetter()) return {input: _input, error: _error, msg: "Wrong format, numbers only"};
    if (_input.value > 12 || _input.value < 1) return {input: _input, error: _error, msg: "Wrong format"};
    return false
};

function getErrorYY() {
    const _input = inputs.yy;
    const _error = errors.date;
    
    if (_input.value.isBlank()) return {input: _input, error: _error, msg: "Can't be blank"};
    if (_input.value.hasLetter()) return {input: _input, error: _error, msg: "Wrong format, numbers only"};
    return false
};



inputs.name.addEventListener("input", event => {
    removeError(event.target, errors.name);
    card.name.innerHTML = event.target.value;
});

inputs.number.addEventListener("input", event => {
    removeError(event.target, errors.number);
    event.target.value = event.target.value.replaceAll(" ", "").numberCard();
    card.number.innerHTML = event.target.value;
});

inputs.cvc.addEventListener("input", event => {  
    removeError(event.target, errors.cvc);
    card.cvc.innerHTML = event.target.value;
});

inputs.mm.addEventListener("input", event => {
    inputs.mm.classList.remove("error");
    if (inputs.mm.className.search("error") === -1 && inputs.yy.className.search("error") === -1) {
        errors.date.classList.add("hidden");
    }
});
inputs.yy.addEventListener("input", event => {
    inputs.yy.classList.remove("error");
    if (inputs.mm.className.search("error") === -1 && inputs.yy.className.search("error") === -1) {
        errors.date.classList.add("hidden");
    }
});
document.querySelectorAll(".date").forEach(element => {
    element.addEventListener("change", event => {
        const input = event.target;

        if (input.value.length === 1 && !input.value.hasLetter()) {
            input.value = "0"+input.value;
            card.date.innerHTML = `${inputs.mm.value || "00"}/${inputs.yy.value || "00"}`;
        };
    });
});

document.querySelector(".BTNsubmit").addEventListener("click", event => {
    let errorOcurred = false
    const errors = [getErrorName(), getErrorNumber(), getErrorMM(), getErrorYY(), getErrorCVC()]; //errorSpan, input, msg
    errors.forEach(element => {
        if (element) {
            applyError(element.input, element.error, element.msg)
            errorOcurred = true
        };
    });

    if (errorOcurred) return

    document.querySelector(".form").classList.toggle("hidden");
    document.querySelector(".complete").classList.toggle("hidden");
});
document.querySelector(".BTNcontinue").addEventListener("click", event => {
    document.querySelector(".form").classList.toggle("hidden");
    document.querySelector(".complete").classList.toggle("hidden");

    Object.keys(inputs).forEach(item => {
        inputs[item].value = "";
    });

    card.number.innerHTML = "0000 0000 0000 0000";
    card.name.innerHTML = "";
    card.cvc.innerHTML = "000";
    card.date.innerHTML = "00/00";
});