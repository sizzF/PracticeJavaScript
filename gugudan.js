class number {
    constructor() {
        this.one = Math.ceil(Math.random()*9); //올림
        this.two = Math.floor(Math.random()*9)+1; //소숫점 자르기

    }
    result(){
        return this.one * this.two;
    }
};
let gugudan = new number();

while (true){
    let myAnswer = prompt(gugudan.one+'X'+gugudan.two);
    console.log(gugudan.result(), myAnswer);
    if (myAnswer === 'c'){
        break
    }
    if (gugudan.result() === parseInt(myAnswer)){
        alert('정답');
        gugudan = new number();

    }
    else{
        alert('땡');
    }
}