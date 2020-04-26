let gameSettings = {
    'width': 0,
    'height': 0,
    'mines': 0,
}
let tableArray = [];
let tableStatusArray = [];
let tableTrArray = [];
let timerInterval = null;
let timeCount =0;
const timer = document.querySelector('#timer');
const gameSetBtn = document.querySelector('#gameSetBtn');
const gameStartBtn = document.querySelector('#gameStartBtn');

gameSetBtn.addEventListener('click',function(){
    gameSettings.width = parseInt(document.querySelector('#widthSet').value);
    gameSettings.height = parseInt(document.querySelector('#heightSet').value);
    gameSettings.mines = parseInt(document.querySelector('#mineSet').value);
    console.log(gameSettings);
    createTableArray(gameSettings);
    console.log(tableArray);
    createGameTable();
});

gameStartBtn.addEventListener('click', setTimerInterval);

let gameTable = document.querySelector('#gameTable tbody');

function createGameTable(){
//테이블 재설정할때 초기화하는방법 생각하기
    for(let i = 0; i<gameSettings.height; i++){
        let tr = document.createElement('tr');
        for (let j = 0; j<gameSettings.width; j++){
            let td = document.createElement('td');

            td.addEventListener('click',(event) => {
                let rowIndex = tableTrArray.findIndex(row => row.contains(event.target));
                let columns = Array.from(tableTrArray[rowIndex].querySelectorAll('td'));
                let columnIndex = columns.findIndex(column => column == event.target);
                console.log(rowIndex, columnIndex);
                let status = tableArray[rowIndex][columnIndex];
                let column = columns[columnIndex];
                if (status==='X'){
                    column.textContent = 'x';
                    alert('게임오버!');
                }else{//safe zone, no mine
                    openTable(rowIndex,columnIndex);
                }

            });
            td.addEventListener('contextmenu', (event) => {
                event.preventDefault();
                let rowIndex = tableTrArray.findIndex(row => row.contains(event.target));
                let columns = Array.from(tableTrArray[rowIndex].querySelectorAll('td'));
                let columnIndex = columns.findIndex(column => column == event.target);
                let column = columns[columnIndex];

                console.log(rowIndex, columnIndex);

                if (column.textContent ===''){
                    column.textContent = 'A';
                    tableStatusArray[rowIndex][columnIndex] = 'A';
                }else if(column.textContent ==='A'){
                    column.textContent = '?';
                    tableStatusArray[rowIndex][columnIndex] = '?';
                }else if(column.textContent === '?'){
                    column.textContent = '';
                    tableStatusArray[rowIndex][columnIndex] = '';
                }

            });
            td.textContent = tableStatusArray[i][j];
            tr.appendChild(td);
        }
        gameTable.appendChild(tr);
        tableTrArray.push(tr);
    }
}

function createTableArray(gameSettings){
    tableArray =[];
    tableStatusArray = [];
    for(let i = 0; i<gameSettings.height; i++){
        let array = [];
        let statusArray = [];
        for (let j = 0; j<gameSettings.width; j++){
            let td = document.createElement('td');
            array.push(0);
            statusArray.push('');
        }
        tableArray.push(array);
        tableStatusArray.push(statusArray);
    }
    //마인 심기
    let mineLocations = createMineLocations(gameSettings);
    console.log(mineLocations);
    mineLocations.forEach((location) => {
        let height = parseInt(location / gameSettings.width);
        let width = parseInt(location - gameSettings.width*height);
        console.log(height,width);
        tableArray[height][width] = 'X';
    });

    //주변 마인수 체크
    for(let i = 0; i<gameSettings.height; i++){
        for(let j = 0; j<gameSettings.width; j++){
            if(tableArray[i][j] !== 'X'){
                let mineCount = 0;
                let idx_i = i-1;
                let idx_j = j-1;
                if(idx_i>=0 && idx_j>=0 && idx_i<gameSettings.height && idx_j<gameSettings.width){
                    if(tableArray[idx_i][idx_j]==='X'){
                        mineCount++;
                    }
                }
                idx_i = i-1;
                idx_j = j;
                if(idx_i>=0 && idx_j>=0 && idx_i<gameSettings.height && idx_j<gameSettings.width){
                    if(tableArray[idx_i][idx_j]==='X'){
                        mineCount++;
                    }
                }
                idx_i = i-1;
                idx_j = j+1;
                if(idx_i>=0 && idx_j>=0 && idx_i<gameSettings.height && idx_j<gameSettings.width){
                    if(tableArray[idx_i][idx_j]==='X'){
                        mineCount++;
                    }
                }
                idx_i = i;
                idx_j = j-1;
                if(idx_i>=0 && idx_j>=0 && idx_i<gameSettings.height && idx_j<gameSettings.width){
                    if(tableArray[idx_i][idx_j]==='X'){
                        mineCount++;
                    }
                }
                idx_i = i;
                idx_j = j+1;
                if(idx_i>=0 && idx_j>=0 && idx_i<gameSettings.height && idx_j<gameSettings.width){
                    if(tableArray[idx_i][idx_j]==='X'){
                        mineCount++;
                    }
                }
                idx_i = i+1;
                idx_j = j-1;
                if(idx_i>=0 && idx_j>=0 && idx_i<gameSettings.height && idx_j<gameSettings.width){
                    if(tableArray[idx_i][idx_j]==='X'){
                        mineCount++;
                    }
                }
                idx_i = i+1;
                idx_j = j;
                if(idx_i>=0 && idx_j>=0 && idx_i<gameSettings.height && idx_j<gameSettings.width){
                    if(tableArray[idx_i][idx_j]==='X'){
                        mineCount++;
                    }
                }
                idx_i = i+1;
                idx_j = j+1;
                if(idx_i>=0 && idx_j>=0 && idx_i<gameSettings.height && idx_j<gameSettings.width){
                    if(tableArray[idx_i][idx_j]==='X'){
                        mineCount++;
                    }
                }
                if(mineCount === 0){
                    tableArray[i][j] = ' ';
                }else{
                    tableArray[i][j]=''+mineCount;
                }

            }
        }
    }
}

function createMineLocations(gameSettings){
    let length = gameSettings.width * gameSettings.height;
    let mineArray = [];
    for (let i = 0; i < gameSettings.mines; i++){
        let location = Math.floor(Math.random()*length);
        if (mineArray.indexOf(location) !== -1){
            i--;
        }else{
            mineArray.push(location);
        }
    }
    return mineArray;
}
function openTable(height, width) {
    console.log('openTable',height,width);
    if(height>=0 && width>=0 && height<gameSettings.height && width<gameSettings.width) {
        let columns = Array.from(tableTrArray[height].querySelectorAll('td'));
        let column = columns[width];
        let status = tableArray[height][width];
        if (status === ' ') {
            if (tableStatusArray[height][width] === ''){
                column.textContent = '';
                column.style.backgroundColor = '#DDDDDD';
                tableStatusArray[height][width] = ' ';
                return openTable(height - 1, width - 1), openTable(height - 1, width),
                    openTable(height - 1, width + 1), openTable(height, width - 1),
                    openTable(height , width + 1), openTable(height + 1, width - 1),
                    openTable(height + 1, width), openTable(height + 1, width + 1);
            }

        } else if (status === 'X') {
            return;
        } else {
            column.textContent = status;
            if (status === '1') {
                column.style.backgroundColor = '#DDDDDD';
                column.style.color = 'blue';
            } else if (status === '2') {
                column.style.backgroundColor = '#DDDDDD';
                column.style.color = 'green';
            } else if (status === '3') {
                column.style.backgroundColor = '#DDDDDD';
                column.style.color = 'yellow';
            } else if (status === '4') {
                column.style.backgroundColor = '#DDDDDD';
                column.style.color = 'red';
            } else if (status === '5') {
                column.style.backgroundColor = '#DDDDDD';
                column.style.color = 'red';
            } else if (status === '6') {
                column.style.backgroundColor = '#DDDDDD';
                column.style.color = 'red';
            }
        }
        tableStatusArray[height][width] = status;
    }else{
        return;

    }
}
function setTimerInterval(){
    return setInterval(() => {

        timer.textContent = timeCount;
        timeCount++;
    },1000);

}

function closeTimerInterval(timer){
    timeCount=0;
    clearInterval(timer);
}