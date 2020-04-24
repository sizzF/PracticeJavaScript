let oldWord = '조승민';

const body = document.body;
let word = document.createElement('div');
word.textContent = oldWord;
body.append(word);
let form = document.createElement('form');
body.append(form);
let textInput = document.createElement('input');
form.append(textInput);

let button = document.createElement('button');
button.textContent = '입력';
form.append(button);

let result = document.createElement('div');
body.append(result);

form.addEventListener('submit', function callback(e){
    e.preventDefault();
    if (word.textContent[word.textContent.length-1] === textInput.value[0]){
        word.textContent = textInput.value;
        result.textContent = '딩동댕';
        textInput.value = '';
        textInput.focus();
    }else{
        result.textContent = '땡';
        textInput.value = '';


    }
})
