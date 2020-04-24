let numberArray = Array(45).fill().map(function(value, idx){
    return idx+1;
});
let lottoArray = [];

for (let i = 45; i>0; i--){
    let number = numberArray.splice(Math.floor(Math.random()*i),1)[0];
    lottoArray.push(number);
}

console.log(lottoArray);

let winnerNumber = lottoArray.slice(0,6);
let bonusNumber = lottoArray[lottoArray.length-1];
console.log(winnerNumber, bonusNumber);
winnerNumber = winnerNumber.sort(function(p,c){ return p-c; });

console.log(winnerNumber, bonusNumber);