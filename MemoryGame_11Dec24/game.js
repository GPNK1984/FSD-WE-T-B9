/********************************* Memory Card Game | GUVI Assessment  ***********************************/
/* @Developer : Ganesan
   @Date: 13 Dec 2024
*/
const RESTARTBTN=document.getElementById('restartBtn');
let gameBoard=document.getElementsByClassName('game-board')[0];
let gameSize=4;
let totalCards=gameSize*gameSize;
let card_images=['css3','html5','javascript','mongo','node','react','tailwind','visualstudio'];
let resultElem=document.getElementById('result-message');
let flipCardElem=`
                <div class="flip-card-inner">
                    <div class="flip-card-front">
                        
                    </div>
                    <div class="flip-card-back">
                        
                    </div>
                </div>
          `;
//Initiate the Game
let initGame=()=>{
    generateGameBoard();
    reStartBtnEvent();
}
//Method used to randomize the card positions
let shuffleCardImages=(array) =>{
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}
//Method used to enable or disable card click events
let disableCards=(isEnable)=>{
    document.querySelectorAll('.flip-card').forEach(element => {
        if(isEnable){
            element.style.pointerEvents = 'none';
        }else{
            var matchFound=element.getElementsByClassName('flip-card-inner')[0].getAttribute('matchFound');
            (matchFound!='true') ? element.style.pointerEvents = 'auto' : element.style.pointerEvents = 'none';
        }
    });
}
//Main method used to generate game board and set click event and core logic of the game
let generateGameBoard=()=>{
    let boxCnt=0;
    let clickCnt=0;
    let lastClickedElem='';
    let flipCardArr=[];
    //Store image src sets in final array to display 2 image sets in card game
    let finalCardImages=[...shuffleCardImages(card_images),...shuffleCardImages(card_images)]
    for(let i=0;i<gameSize;i++){
        for(let j=0;j<gameSize;j++){
            // Generate Cards at run time
            let elem= document.createElement('div');
            elem.setAttribute('class','flip-card cell');
            elem.innerHTML=flipCardElem;
            elem.getElementsByClassName('flip-card-back')[0].innerHTML=`<img alt="Avatar" src='./images/${finalCardImages[boxCnt]}.png' style='width:98px;height:98px'/>`
            gameBoard.appendChild(elem);
            //

            let flipCardInner=elem.getElementsByClassName('flip-card-inner')[0] ;

            elem.addEventListener('click',function(e){
                e.preventDefault();
                clickCnt++; // Capture the move count
                flipCardArr.push(flipCardInner)
                if(clickCnt%2==0){ // Logic to find a every 2 card clicks
                    let curElem=this.getElementsByClassName('flip-card-back')[0].children[0].getAttribute('src');
                    disableCards(true) // Disable the cards when 2 cards open
                    if(curElem===lastClickedElem) { //Matching logic
                        console.log("Match Found")
                        for(let card of flipCardArr){
                            card.setAttribute('matchFound',true); //Set the attribute to capture whether that particular card is already matched or not
                        }
                        lastClickedElem="";
                        disableCards(false) 
                    } else{
                        resetFlipCard(flipCardArr); // Reset the opened cards to orginal position
                    }
                    flipCardArr=[] // Empty array for every 2 opened cards
                }

                //Flip Effect
                flipCardInner.setAttribute('style','transform: rotateY(180deg)');
                //Storing the last clicked elem for comparison
                lastClickedElem=this.getElementsByClassName('flip-card-back')[0].children[0].getAttribute('src')

                displayResult(clickCnt); // Display result
            })
            boxCnt++;
        }
    }
    arrangeCardPositions(); //Method call to arrange the cards
}
//Method used to arrange the card positions at runtime
let arrangeCardPositions=()=>{
    let boxCnt=0, left=0, top=0,topY=0,leftX=0;
    document.querySelectorAll('.flip-card').forEach(element => {
        if(boxCnt>0){
            if(boxCnt%gameSize===0){
                console.log("Row Found");
                top=top+25;
                topY=topY+8;
                left=0;
                leftX=0;
            }else{
                left=left+25;
                leftX=leftX+8;

            }
        }
        let positions=`top: calc(${top}% + ${topY}px); left: calc(${left}% + ${leftX}px); `
        element.setAttribute("style",positions)
        boxCnt++;

    });
}
//Reset the card to original position
let resetFlipCard=(flipCardArr)=>{
    for(let card of flipCardArr){
        setTimeout(function(){
            card.setAttribute('style','transform: rotateY(0deg)');
            disableCards(false)
        },1500)
    }
}
//Display result at end of the last card flip
let displayResult=(moveCnt)=>{
    let matchCnt=0;
    
    document.querySelectorAll('.flip-card').forEach(element => {
        var matchFound=element.getElementsByClassName('flip-card-inner')[0].getAttribute('matchFound');
        if(matchFound=='true') matchCnt++;
    });
    if(matchCnt==totalCards){
        let successMsg=`<p>🎉 Congrats! Your have matched card with ${moveCnt} moves</p>`;
        resultElem.setAttribute('style','display:block');
        resultElem.innerHTML=successMsg;
    }
}
//Restart Game Button Event
let reStartBtnEvent=()=>{
    RESTARTBTN.addEventListener('click',function(){
        gameBoard.innerHTML="";
        resultElem.innerHTML="";
        resultElem.setAttribute('style','display:none');
        generateGameBoard();
    })
}
//Method call to initialize the Game
initGame();
