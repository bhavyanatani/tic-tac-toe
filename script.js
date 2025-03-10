let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset");
let newBtn = document.querySelector("#new");
let msg = document.querySelector("#msg");
let msgContainer = document.querySelector(".msg-container");
let mainGame = document.querySelector("#main");

let turnO = true; 
let count = 0;

const WinPatterns = [
    [0, 1, 2], [0, 3, 6], [0, 4, 8], [1, 4, 7],
    [2, 5, 8], [2, 4, 6], [3, 4, 5], [6, 7, 8]
];


msgContainer.classList.add("hide");

boxes.forEach((box) => {
    box.addEventListener("click", function () {
        if (box.innerText !== "") return;

        box.innerText = turnO ? "O" : "X";
        turnO = !turnO;
        count++;
        box.disabled = true;

        checkWinner();
    });
});
const reset = () => {
    turnO = true;
    count = 0;
    enableBoxes();

    msgContainer.classList.add("hide"); 

    mainGame.style.display = "flex";  
    mainGame.style.justifyContent = "center"; 
    mainGame.style.alignItems = "center"; 
};



const enableBoxes = () => {
    boxes.forEach(box => {
        box.disabled = false;
        box.innerText = "";
    });
};

const showWinner = (winner) => {
    msg.innerText = `🎉 Winner: ${winner} 🎉`;
    msgContainer.classList.remove("hide"); 
    mainGame.style.display = "none";
};

const checkWinner = () => {
    let winnerFound = false;

    for (let pattern of WinPatterns) {
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if (pos1Val !== "" && pos1Val === pos2Val && pos2Val === pos3Val) {
            showWinner(pos1Val);
            disableBoxes();
            winnerFound = true; 
            return; 
        }
    }

    if (!winnerFound && count === 9) {
        msg.innerText = "It's a Draw! 🤝";
        msgContainer.classList.remove("hide");
        disableBoxes(); 
    }
};

newBtn.addEventListener("click", reset);
resetBtn.addEventListener("click", reset);
