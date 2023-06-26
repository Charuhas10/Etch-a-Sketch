const divContainer = document.getElementById("grid-container");
const resizeBtn = document.getElementById("resize");
const clearBtn = document.getElementById("clear");
const eraseBtn = document.getElementById("erase");
const blackBtn = document.getElementById("black");
const colorBtn = document.getElementById("color");
const rainbowBtn = document.getElementById("rainbow");

const containerSize = divContainer.clientWidth;
const num = 16;
const itemSize = Math.floor(containerSize / num);

let isDrawing = false;

function makeDivs(num, itemSize) {
  divContainer.style.gridTemplateColumns = `repeat(${num}, ${itemSize}px)`;
  divContainer.style.gridTemplateRows = `repeat(${num}, ${itemSize}px)`;

  for (let i = 0; i < num * num; i++) {
    const div = document.createElement("div");
    divContainer.appendChild(div).className = "grid-item";
  }
  colorDivs(document.querySelectorAll(".grid-item"), "black", false);
}

resizeBtn.onclick = () => {
  const gridSize = parseInt(prompt("Enter the desired grid size:"));

  if (!isNaN(gridSize) && gridSize > 0 && gridSize <= 100) {
    const itemSize = Math.floor(containerSize / gridSize);

    clearGrid();
    makeDivs(gridSize, itemSize);
  } else if (!isNaN(gridSize)) {
    alert("Invalid grid size! Please enter a positive number.");
  }
};

function clearGrid() {
  while (divContainer.firstChild) {
    divContainer.removeChild(divContainer.firstChild);
  }
}

clearBtn.onclick = () => {
  let divs = document.querySelectorAll(".grid-item");
  divs.forEach((div) => {
    div.style.backgroundColor = "white";
  });
  colorDivs(document.querySelectorAll(".grid-item"), "black", false);
};

eraseBtn.onclick = () => {
  let divs = document.querySelectorAll(".grid-item");
  colorDivs(divs, "white", false);
};

blackBtn.onclick = () => {
  let divs = document.querySelectorAll(".grid-item");
  colorDivs(divs, "black", false);
};

colorBtn.addEventListener("click", () => {
  const colorPicker = document.createElement("input");
  colorPicker.type = "color";

  colorPicker.addEventListener("change", () => {
    const color = colorPicker.value;
    let divs = document.querySelectorAll(".grid-item");
    colorDivs(divs, color, false);
  });

  colorPicker.click();
});

rainbowBtn.onclick = () => {
  let divs = document.querySelectorAll(".grid-item");
  colorDivs(divs, "rainbow", true);
};

makeDivs(num, itemSize);

function colorDivs(divs, color, IsRgb) {
  divs.forEach((div) => {
    div.addEventListener("mousedown", () => {
      isDrawing = true;
      div.style.backgroundColor =
        IsRgb == false
          ? color
          : `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(
              Math.random() * 256
            )}, ${Math.floor(Math.random() * 256)})`;
    });

    div.addEventListener("mousemove", () => {
      if (isDrawing) {
        div.style.backgroundColor =
          IsRgb == false
            ? color
            : `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(
                Math.random() * 256
              )}, ${Math.floor(Math.random() * 256)})`;
      }
    });

    div.addEventListener("mouseup", () => {
      isDrawing = false;
    });

    div.addEventListener("touchstart", () => {
      isDrawing = true;
      div.style.backgroundColor =
        IsRgb == false
          ? color
          : `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(
              Math.random() * 256
            )}, ${Math.floor(Math.random() * 256)})`;
    });

    div.addEventListener("touchmove", (event) => {
      event.preventDefault(); // Prevent scrolling while drawing
      if (isDrawing) {
        const touch = event.touches[0];
        const target = document.elementFromPoint(touch.clientX, touch.clientY);
        if (target && target.classList.contains("grid-item")) {
          target.style.backgroundColor =
            IsRgb == false
              ? color
              : `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(
                  Math.random() * 256
                )}, ${Math.floor(Math.random() * 256)})`;
        }
      }
    });

    div.addEventListener("touchend", () => {
      isDrawing = false;
    });
  });
}
