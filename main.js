$("#landing_page").hide();
// $(".gameboard1").hide();

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



current_player = 0;
if(current_player){
    $(".turn").text("White Player's turn");
} else {
    $(".turn").text("Black Player's turn");
}

checkColor = () => {
    for (let index = 0; index < grid.length; index++) {
        for (const key in grid) {
            switch (grid[index][key]) {
                
                case 0: //blank
                $("#"+index+key).removeClass("white");
                $("#"+index+key).removeClass("black");     
                break;

                case 1: //white
                $("#"+index+key).addClass("white");
                $("#"+index+key).removeClass("black");    
                break;

                case 2: //black
                $("#"+index+key).addClass("black");
                $("#"+index+key).removeClass("white");        
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

checkColor();

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
    current_player = 0;
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

    for(i=0;i<checkRow.length;i++){
        surround.push([row+checkRow[i],col+checkCol[i]]);
    }

    if(current_player && !isOccupied){
        if(document.getElementById(surround[0].join("")).classList.contains("black")||document.getElementById(surround[1].join("")).classList.contains("black")||document.getElementById(surround[2].join("")).classList.contains("black")||document.getElementById(surround[3].join("")).classList.contains("black")||document.getElementById(surround[4].join("")).classList.contains("black")||document.getElementById(surround[5].join("")).classList.contains("black")||document.getElementById(surround[6].join("")).classList.contains("black")||document.getElementById(surround[7].join("")).classList.contains("black")){
            grid[row][col] = 1;
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
                            if(grid[newRow][newCol] == 2){
                                newRow += chRow;
                                newCol += chCol;
                                count++;
                            } else if(grid[newRow][newCol] == 1){ 
                                if(count != 0){
                                    let nRow = newRow;
                                    let nCol = newCol;
                                    for(x=0;x<count;x++){
                                        nRow -= chRow;
                                        nCol -= chCol;
                                        grid[nRow][nCol] = 1;
                                    }
                                }   
                            } else if(grid[newRow][newCol] == 0){
                                break;
                            }
                        }
                    }
                }   
            }
            checkColor();
            changePlayer();
        }
    } else if (!current_player && !isOccupied) {
        if(document.getElementById(surround[0].join("")).classList.contains("white")||document.getElementById(surround[1].join("")).classList.contains("white")||document.getElementById(surround[2].join("")).classList.contains("white")||document.getElementById(surround[3].join("")).classList.contains("white")||document.getElementById(surround[4].join("")).classList.contains("white")||document.getElementById(surround[5].join("")).classList.contains("white")||document.getElementById(surround[6].join("")).classList.contains("white")||document.getElementById(surround[7].join("")).classList.contains("white")){
            grid[row][col] = 2;
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
                                if(grid[newRow][newCol] == 1){
                                    newRow += chRow;
                                    newCol += chCol;
                                    count++;
                                } else if(grid[newRow][newCol] == 2){ 
                                    if(count != 0){
                                        let nRow = newRow;
                                        let nCol = newCol;
                                        for(x=0;x<count;x++){
                                            nRow -= chRow;
                                            nCol -= chCol;
                                            grid[nRow][nCol] = 2;
                                        }
                                    }   
                                } else {
                                    break;
                                }
                            }    
                        }
                }  
            }
            checkColor();
            changePlayer();
        }
    }
});


function changePlayer(){
    current_player = current_player ? 0 : 1;
    if(current_player){
        $(".turn").text("White Player's turn");
    } else {
        $(".turn").text("Black Player's turn");
    }
}

