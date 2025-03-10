let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset");
let newBtn = document.querySelector("#new");
let msg = document.querySelector("#msg");
let msgContainer = document.querySelector(".msg-container");
let mainGame = document.querySelector("#main");
let turnIndicator = document.querySelector("#turn-indicator");

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
        box.disabled = true;
        turnO = !turnO;
        count++;

        turnIndicator.innerText = `Turn: ${turnO ? "O" : "X"}`;  
        checkWinner();
    });
});

const reset = () => {
    turnO = true;
    count = 0;
    enableBoxes();

    msgContainer.classList.add("hide");
    turnIndicator.innerText = "Turn: O"; 

    mainGame.style.display = "flex";  
};

const enableBoxes = () => {
    boxes.forEach(box => {
        box.disabled = false;
        box.innerText = "";
        box.style.backgroundColor = "#D9DBBC"; 
    });
};

const disableBoxes = () => {
    boxes.forEach(box => box.disabled = true);
};

const highlightWinner = (pattern) => {
    pattern.forEach(index => {
        boxes[index].style.backgroundColor = "#FFB400";  
    });

    setTimeout(() => {
        showWinner(boxes[pattern[0]].innerText);
    }, 1000); 
};

const showWinner = (winner) => {
    msg.innerText = `🎉 Winner: ${winner} 🎉`;
    msgContainer.classList.remove("hide");
    mainGame.style.display = "none";
};

const checkWinner = () => {
    for (let pattern of WinPatterns) {
        let [a, b, c] = pattern;
        if (boxes[a].innerText && boxes[a].innerText === boxes[b].innerText && boxes[b].innerText === boxes[c].innerText) {
            disableBoxes();
            highlightWinner(pattern);
            return;
        }
    }

    if (count === 9) {
        msg.innerText = "It's a Draw! 🤝";
        msgContainer.classList.remove("hide");
        disableBoxes();
    }
};

newBtn.addEventListener("click", reset);
resetBtn.addEventListener("click", reset);
