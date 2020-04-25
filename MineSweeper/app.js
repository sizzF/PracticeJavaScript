let gameSettings = {
    'width': 0,
    'height': 0,
    'mines': 0,
}
let tableArray = []
let gameSetBtn = document.querySelector('#gameSetBtn');

gameSetBtn.addEventListener('click',function(){
    gameSettings.width = parseInt(document.querySelector('#widthSet').value);
    gameSettings.height = parseInt(document.querySelector('#heightSet').value);
    gameSettings.mines = parseInt(document.querySelector('#mineSet').value);
    console.log(gameSettings);
    createTableArray(gameSettings);
    let mineLocations = createMineLocations(gameSettings);
    console.log('minLocations before');
    console.log(mineLocations);
    console.log(tableArray);
    mineLocations.forEach((location) => {
        let width = parseInt(location / gameSettings.width);
        let height = parseInt(location % gameSettings.height);
        tableArray[width][height] = 'X';
    })
    createGameTable(tableArray,gameSettings);

})

let gameTable = document.querySelector('#gameTable tbody');

function createGameTable(tableArray, gameSettings){
//테이블 재설정할때 초기화하는방법 생각하기
    for(let i = 0; i<gameSettings.width; i++){
        let tr = document.createElement('tr');
        for (let j = 0; j<gameSettings.height; j++){
            let td = document.createElement('td');
            td.addEventListener('click',() => {
            })
            td.textContent = tableArray[i][j];
            tr.appendChild(td);
        }
        gameTable.appendChild(tr);
    }
}

function createTableArray(gameSettings){
    for(let i = 0; i<gameSettings.width; i++){
        let array = []
        for (let j = 0; j<gameSettings.height; j++){
            let td = document.createElement('td');
            array.push(0);
        }
        tableArray.push(array);
    }
}

function createMineLocations(gameSettings){
    let length = gameSettings.width * gameSettings.height;
    let mineArray = [];
    for (let i = 0; i < gameSettings.mines; i++){
        let location = Math.floor(Math.random()*length);
        if (mineArray.indexOf(location) != -1){
            i--;
        }else{
            mineArray.push(location);
        }
    }
    return mineArray;
}