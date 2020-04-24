let tableArray = []
let winnerDiv = document.getElementById('winner');
let turn = 'o'
let result = '';

winnerDiv.textContent = turn +'차례입니다';

for (let i = 0; i<3; i++){
    let smallArray = [];
    for (let j = 0; j<3; j++){
        let td = document.getElementById('td'+i+j);
        td.addEventListener('click',function(e){
            if (td.textContent === ''){
                td.textContent = turn;
                if (turn ==='o'){
                    turn = 'x';
                }else{
                    turn = 'o';
                }
                result = winnerCheck(td);
                if (result === null) {
                    winnerDiv.textContent = turn + '차례입니다';

                }else{
                    winnerDiv.textContent = result+'승리';
                    tableArray.forEach(function(value){
                        value.forEach(function(td){
                            td.textContent = '';
                        })
                    });
                    turn ='o';

                }

            }else{
                console.log('이미 글자가 있음');
            }

        })
        smallArray.push(td);
    }
    tableArray.push(smallArray);
}
console.log(tableArray);
function winnerCheck(td){
    let y = Number(td.id[2]);
    let x = Number(td.id[3]);
    let value = td.textContent;
    console.log(y,x,value);
    for(let i = 0; i<3;i++){
        if (value === tableArray[y][i].textContent){
            if (i===2){
                return value;
            }
        }else{
            break;
        }

    }
    for(let i = 0; i<3;i++){
        if (value === tableArray[i][x].textContent){
            if (i===2){
                return value;
            }
        }else{
            break;
        }

    }
    if(x === y){//대각선
        for (let i = 0; i<3; i++){
            if(value === tableArray[i][i].textContent){
                if(i===2){
                    return value;
                }
            }else{
                break;
            }
        }
        for (let i = 0; i<3; i++){
            if(value === tableArray[2-i][i].textContent){
                if(i===2){
                    return value;
                }
            }else{
                break;
            }
        }
    }
    if(x === 2-y)
    {
        for (let i = 0; i<3; i++){
            if(value === tableArray[2-i][i].textContent){
                if(i===2){
                    return value;
                }
            }else{
                break;
            }
        }
    }
    return null;
}
console.log(tableArray);