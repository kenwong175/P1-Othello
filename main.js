// $("#landing_page").hide();
$(".gameboard2").hide();

$("#start").click(function(){
    $("#landing_page").hide();
    $(".gameboard2").show();
});

// let grid =  [
//             [0,0,0,0],
//             [0,2,1,0],
//             [0,1,2,0],
//             [0,0,0,0]
//             ];

let blackCount = document.querySelectorAll(".black").length;
let whiteCount = document.querySelectorAll(".white").length;
$("#blackBoardCount").text(blackCount);
$("#whiteBoardCount").text(whiteCount);
let moves = 0;

let grid =  [
            [0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0],
            [0,0,0,2,1,0,0,0],
            [0,0,0,1,2,0,0,0],
            [0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0]
            ];


checkWinner = () => {
    if(moves == 60){
        if(blackCount>whiteCount){
            $(".turn").text("Tea dominated");
        } else {
            $(".turn").text("Coffee dominated");
        }
    }
}

current_player = 1;
if(current_player == 1){
    $(".turn").text("It's Time for Coffee");
} else {
    $(".turn").text("It's Time for Tea");
}

checkColor = () => {    
    for (let index = 0; index < grid.length; index++) {
        for (const key in grid) {
            switch (grid[index][key]) {
                
                case 0: //blank
                $("#"+index+key).removeClass("white animate__animated animate__flipInX");
                $("#"+index+key).removeClass("black animate__animated animate__flipInX");
                $("#"+index+key).removeClass("gray");        
                break;

                case 1: //coffee
                $("#"+index+key).removeClass("gray");  
                $("#"+index+key).removeClass("black animate__animated animate__flipInX");    
                $("#"+index+key).addClass("white animate__animated animate__flipInX");
                break;

                case 2: //tea
                $("#"+index+key).removeClass("gray");  
                $("#"+index+key).removeClass("white animate__animated animate__flipInX");   
                $("#"+index+key).addClass("black animate__animated animate__flipInX");     
                break;

                case 3:
                $("#"+index+key).removeClass("white animate__animated animate__flipInX");
                $("#"+index+key).removeClass("black animate__animated animate__flipInX");
                $("#"+index+key).addClass("gray");  
                break;

                default:
                break;
            }
        }
    }
    blackCount = document.querySelectorAll(".black").length;
    whiteCount = document.querySelectorAll(".white").length;
    $("#blackBoardCount").text(blackCount);
    $("#whiteBoardCount").text(whiteCount);
      
}

// $("#reset4").click(function(e){
//     grid =  [
//         [0,0,0,0],
//         [0,2,1,0],
//         [0,1,2,0],
//         [0,0,0,0]
//         ];
//     checkColor();
//     current_player = 0;
// });

$("#reset6").click(function(e){
    grid =  [
        [0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0],
        [0,0,0,2,1,0,0,0],
        [0,0,0,1,2,0,0,0],
        [0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0]
        ];

    checkColor();
    current_player = 1;
    moves = 0;
    $(".turn").text("It's Time for Tea");
});

checkColor();

$(".box").click(function(){
    let id = $(this).attr("id");
    let isOccupied = $(this).hasClass("black") || $(this).hasClass("white");
    let loc = id.split("");
    let row = Number(loc[0]);
    let col = Number(loc[1]);
    let checkRow = [-1,0,1,1,1,0,-1,-1];
    let checkCol = [-1,-1,-1,0,1,1,1,0];
    let count = 0;
    let surround = [];
    let convert = 0;

    convert = 0;
    hidePossibleMoves();
    for(i=0;i<checkRow.length;i++){
        if((row+checkRow[i])>-1&&(row+checkRow[i])<8&&(col+checkCol[i])>-1&&(col+checkCol[i])<8){
        surround.push([row+checkRow[i],col+checkCol[i]]);
        }
    }

    if(current_player==1 && !isOccupied){
        if(document.getElementById(surround[0].join("")).classList.contains("black")||document.getElementById(surround[1].join("")).classList.contains("black")||document.getElementById(surround[2].join("")).classList.contains("black")||document.getElementById(surround[3].join("")).classList.contains("black")||document.getElementById(surround[4].join("")).classList.contains("black")||document.getElementById(surround[5].join("")).classList.contains("black")||document.getElementById(surround[6].join("")).classList.contains("black")||document.getElementById(surround[7].join("")).classList.contains("black")){
            for(i=0;i<8;i++){
                if(row<grid.length && row>-1 && col<grid.length && col>-1){
                count = 0;
                chRow = checkRow[i];
                chCol = checkCol[i];
                let newRow = 0;
                let newCol = 0;
                newRow = row + chRow;
                newCol = col + chCol;
                    for(j=0;j<grid.length;j++){
                        if(newRow<grid.length && newRow>-1 && newCol<grid.length && newCol>-1){
                            if(grid[newRow][newCol] == 1+(1+moves)%2){
                                newRow += chRow;
                                newCol += chCol;
                                count++;
                            } else if(grid[newRow][newCol] == 1+moves%2){ 
                                if(count != 0){
                                    let nRow = newRow;
                                    let nCol = newCol;
                                    for(x=0;x<count;x++){
                                        nRow -= chRow;
                                        nCol -= chCol;
                                        grid[nRow][nCol] = 1+moves%2;
                                        convert++;
                                    }
                                }   
                            } else if(grid[newRow][newCol] == 0){
                                break;
                            }
                        }
                    }
                }   
            }
            if(convert !=0 ){
                grid[row][col] = 1+moves%2;
                changePlayer();
                checkColor();
            }
        }
    } else if (current_player== 2 && !isOccupied) {
        if(document.getElementById(surround[0].join("")).classList.contains("white")||document.getElementById(surround[1].join("")).classList.contains("white")||document.getElementById(surround[2].join("")).classList.contains("white")||document.getElementById(surround[3].join("")).classList.contains("white")||document.getElementById(surround[4].join("")).classList.contains("white")||document.getElementById(surround[5].join("")).classList.contains("white")||document.getElementById(surround[6].join("")).classList.contains("white")||document.getElementById(surround[7].join("")).classList.contains("white")){
            for(i=0;i<8;i++){
                if(row<grid.length && row>-1 && col<grid.length && col>-1){
                    count = 0;
                    chRow = checkRow[i];
                    chCol = checkCol[i];
                    let newRow = 0;
                    let newCol = 0;
                    newRow = row + chRow;
                    newCol = col + chCol;
                        for(j=0;j<grid.length;j++){
                            if(newRow<grid.length && newRow>-1 && newCol<grid.length && newCol>-1){
                                if(grid[newRow][newCol] == 1+(1+moves)%2){
                                    newRow += chRow;
                                    newCol += chCol;
                                    count++;
                                } else if(grid[newRow][newCol] == 1+moves%2){ 
                                    if(count != 0){
                                        let nRow = newRow;
                                        let nCol = newCol;
                                        for(x=0;x<count;x++){
                                            nRow -= chRow;
                                            nCol -= chCol;
                                            grid[nRow][nCol] = 1+moves%2;
                                            convert++;
                                        }
                                    }   
                                } else {
                                    break;
                                }
                            }    
                        }
                }  
            }
            if(convert!=0){
                grid[row][col] = 1+moves%2;
                changePlayer();
                checkColor();
            }
        }
    }
checkWinner();
showPossibleMoves();
let grayCount = document.querySelectorAll(".gray").length;
    if(grayCount == 0){
        changePlayer();
        moves--;
    }
});


function changePlayer(){
    current_player = 1 + (1+moves)%2
    if(current_player==1){
        $(".turn").text("It's Time for Coffee");
    } else {
        $(".turn").text("It's Time for Tea");
    }
moves++;
}

findPossibleMoves = (r,c,dir) => {
    if(grid[r][c]!= (1+(moves%2)))
    return;
    var row = r;
    var col = c;
    var changeRow = [-1,0,1,1,1,0,-1,-1] ;
    var changeCol = [-1,-1,-1,0,1,1,1,0] ;  
    var cRow = changeRow[dir];
    var cCol = changeCol[dir];
    var other = 1+(1+moves)%2;
    row += cRow ;
    col += cCol ; 
    if(row>=0&&row<8&&col>=0&&col<8){
    if(grid[row][col] ==0){
        return ;    
    }}else{
        return ;
    }
    while(row>=0&&row<8&&col>=0&&col<8){
       if(other==parseInt(grid[row][col])){
            row += cRow ;
            col += cCol ; 
            }
        else{
            break ;
        }
    }
    if(row<0||row>7||col<0||col>7){
        return ;
    }
    if( grid[row][col] ==0 ){
    grid[row][col] = 3;
    }
checkColor();
}

showPossibleMoves = () => {
    for(let row=0;row<8;row++){
        for(let col=0;col<8;col++){
            for(let dir=0;dir<8;dir++){
                findPossibleMoves(row,col,dir);
            }
        }
    }
}   

hidePossibleMoves = function(){
    for(let row=0;row<8;row++){
        for(let col=0;col<8;col++){
            if(grid[row][col]==3)
                grid[row][col] = 0;
        }
    }
}

showPossibleMoves();
checkColor();
