$("#landing_page").hide();

let grid =  [
            [0,0,0,0],
            [0,2,1,0],
            [0,1,2,0],
            [0,0,0,0]
            ];

current_player = 0;

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
    
}

checkColor();

resetTable = () => {
    grid =  [
        [0,0,0,0],
        [0,2,1,0],
        [0,1,2,0],
        [0,0,0,0]
        ];
checkColor();
}

$("#reset").click(function(e){
    resetTable();
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
    if(current_player && !isOccupied){
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
            console.log("Outer Row: ",newRow,"Column: ",newCol,"Count :",count);
                for(j=0;j<grid.length;j++){
                    if(newRow<grid.length && newRow>-1 && newCol<grid.length && newCol>-1){
                        if(grid[newRow][newCol] == 2){
                            console.log("Change Row :",chRow,"Change Column :",chCol)
                            newRow += chRow;
                            newCol += chCol;
                            count++;
                            console.log("Row: ",newRow,"Column: ",newCol,"Count :",count);
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
                    checkColor();
                }
            }   
        }
        checkColor();
        changePlayer();
    } else if (!current_player && !isOccupied) {
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
                console.log("Outer Row: ",newRow,"Column: ",newCol,"Count :",count);
                    for(j=0;j<grid.length;j++){
                        if(newRow<grid.length && newRow>-1 && newCol<grid.length && newCol>-1){
                            if(grid[newRow][newCol] == 1){
                                console.log("Change Row :",chRow,"Change Column :",chCol)
                                newRow += chRow;
                                newCol += chCol;
                                count++;
                                console.log("Row: ",newRow,"Column: ",newCol,"Count :",count);
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
                        checkColor();    
                    }
            }  
        }
        checkColor();
        changePlayer();
    }
});


function changePlayer(){
    current_player = current_player ? 0 : 1;
}

    