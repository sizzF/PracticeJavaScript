let left = 0;
let list = {
    '바위': 0,
    '가위': 1,
    '보': 2,
}
let list2 = {
    0: 0,
    '-141px': 1,
    '-282px': 2,
}
let resultdiv=document.querySelector('#result');
let buttonList=document.querySelector('#buttonList');

let computer = document.querySelector('#computer');
let interval = intervalMaker();

function winnerCheck(computer, me) {
    if (computer - me === 0) {
        return '비김';
    } else if (computer - me === -1 || computer - me === 2) {
        return '짐';
    } else if (computer - me === 1 || computer - me === -2) {
        return '이김';
    }
}

function intervalMaker(){
    return setInterval(() =>{
        if (left === 0){
            left = '-141px';
        }else if (left === '-141px'){
            left = '-282px'
        }else if (left === '-282px'){
            left = 0
        }
        computer.style.background =
            'url("https://en.pimg.jp/023/182/267/1/23182267.jpg") '+left+' 0';
    },100);
}

document.querySelectorAll('.btn').forEach((btn)=>{
    btn.addEventListener('click', function(){
        console.log(this.textContent);
        clearInterval(interval);
        buttonList.style.display='none';
        setTimeout(function () {
            interval = intervalMaker();
            buttonList.style.display='block';

        },1000)
        resultdiv.textContent=winnerCheck(list2[left], list[this.textContent]);

    })
})
