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
                break;

                case 2: //black
                $("#"+index+key).addClass("black");        
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

$(".box").click(function(e){
    let id = $(this).attr("id");
    let isOccupied = $(this).hasClass("black") || $(this).hasClass("white");
    let loc = id.split("");
    let row = loc[0];
    let col = loc[1];
    if(current_player && !isOccupied){
        grid[row][col] = 1;
        checkColor();
        changePlayer();
    } else if (!current_player && !isOccupied) {
        grid[row][col] = 2;
        checkColor();
        changePlayer();
    }
});


function changePlayer(){
    current_player = current_player ? 0 : 1;
}


//     for(i=0;i<;i++){

//     }
// let row = 1;
// let col = 1;
// let dir = 1;
// var changeRow = [-1,0,1,1,1,0,-1,-1] ;
// var changeCol = [-1,-1,-1,0,1,1,1,0] ;  
// var cRow = changeRow[dir];
// var cCol = changeCol[dir];
// row += cRow ;
// col += cCol ;
// console.log("row",row);
// console.log("column",col); 
// }