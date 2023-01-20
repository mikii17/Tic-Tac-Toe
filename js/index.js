function init() {
  let currentPlayer = 0;
  let startPlayer = 0;
  let count = 0;

  const boxItems = document.querySelectorAll(".box-item");
  const boxContainer = document.getElementById("box-container");
  const playerOne = document.getElementById("player1");
  const tie = document.getElementById("tie");
  const playerTwo = document.getElementById("player2");
  const playerOneVal = document.getElementById("player1-value");
  const tieVal = document.getElementById("tie-value");
  const playerTwoVal = document.getElementById("player2-value");
  const st = document.getElementById("strike-through");
  const result = document.getElementById("result");
  const winner = document.getElementById("winner");

  Array.prototype.forEach.call(boxItems, (boxItem) => {
    boxItem.addEventListener("click", (e) => {
      e.stopPropagation();
      if (boxItem.textContent !== "") return;
      if (currentPlayer === 0) boxItem.textContent = "X";
      else boxItem.textContent = "O";
      let winFlag = checkWin(boxItem.textContent);
      if (winFlag) {
        winner.textContent = `Player${currentPlayer + 1}  Wins!!!`;
        result.style.display = "grid";
        if (currentPlayer === 0) {
          playerOneVal.textContent = `${
            parseInt(playerOneVal.textContent) + 1
          }`;
        } else {
          playerTwoVal.textContent = `${
            parseInt(playerTwoVal.textContent) + 1
          }`;
        }
      } else if (count === 8) {
        winner.textContent = `Tie!!!`;
        result.style.display = "grid";
        tie.classList.add("active");
        playerOne.classList.remove("active");
        playerTwo.classList.remove("active");
        tieVal.textContent = `${parseInt(tieVal.textContent) + 1}`;
      } else {
        count += 1;
        currentPlayer = (currentPlayer + 1) % 2;
        if (currentPlayer === 0) {
          playerOne.classList.add("active");
          playerTwo.classList.remove("active");
        } else {
          playerOne.classList.remove("active");
          playerTwo.classList.add("active");
        }
      }
    });
  });
  result.addEventListener("click", (e) => {
    result.style.display = "none";
    boxClear();
    startPlayer = (startPlayer + 1) % 2;
    if (startPlayer === 0) {
      playerOne.classList.add("active");
      playerTwo.classList.remove("active");
      tie.classList.remove("active");
    } else {
      playerOne.classList.remove("active");
      playerTwo.classList.add("active");
      tie.classList.remove("active");
    }
    currentPlayer = startPlayer;
    count = 0;
  });
  const boxClear = () => {
    Array.prototype.forEach.call(boxItems, (boxItem) => {
      boxItem.textContent = "";
    });
    st.className = "strike-through";
  };
  const checkWin = (val) => {
    if (
      boxItems[0].textContent === val &&
      boxItems[1].textContent === val &&
      boxItems[2].textContent === val
    ) {
      st.classList.add("hz", "hz-top");
      return true;
    } else if (
      boxItems[3].textContent === val &&
      boxItems[4].textContent === val &&
      boxItems[5].textContent === val
    ) {
      st.classList.add("hz", "hz-middle");
      return true;
    } else if (
      boxItems[6].textContent === val &&
      boxItems[7].textContent === val &&
      boxItems[8].textContent === val
    ) {
      st.classList.add("hz", "hz-bottom");
      return true;
    } else if (
      boxItems[0].textContent === val &&
      boxItems[3].textContent === val &&
      boxItems[6].textContent === val
    ) {
      st.classList.add("vt", "vt-left");
      return true;
    } else if (
      boxItems[1].textContent === val &&
      boxItems[4].textContent === val &&
      boxItems[7].textContent === val
    ) {
      st.classList.add("vt", "vt-middle");
      return true;
    } else if (
      boxItems[2].textContent === val &&
      boxItems[5].textContent === val &&
      boxItems[8].textContent === val
    ) {
      st.classList.add("vt", "vt-right");
      return true;
    } else if (
      boxItems[0].textContent === val &&
      boxItems[4].textContent === val &&
      boxItems[8].textContent === val
    ) {
      st.classList.add("diagonal", "left-right");
      return true;
    } else if (
      boxItems[2].textContent === val &&
      boxItems[4].textContent === val &&
      boxItems[6].textContent === val
    ) {
      st.classList.add("diagonal", "right-left");
      return true;
    }
    return false;
  };
}

document.addEventListener("DOMContentLoaded", init);
