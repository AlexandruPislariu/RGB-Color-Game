let game = {}
game.init = function()
{
    setUpModeButtons();

    setUpSquares();
    
    reset();
}

let numSquares = 6;
let colors = [];
let pickedColor;
let squares = document.querySelectorAll(".square");
let colorDisplay = document.getElementById("colorDisplay");
let messageDisplay = document.querySelector("#message");
let resetButton = document.querySelector("#reset");
let modeButtons = document.querySelectorAll(".mode");

game.init();

function setUpModeButtons()
{
    for(let i=0; i<modeButtons.length; i++)
    {
        modeButtons[i].addEventListener("click", function()
        {   
            modeButtons[0].classList.remove("selected"); 
            modeButtons[1].classList.remove("selected");     
            this.classList.add("selected");

            this.textContent === "Easy" ? numSquares = 3: numSquares = 6;

            reset();
        });
    }
}

function setUpSquares()
{
    
    for(let i=0; i<squares.length; i++)
    {   
        //add click listeners to squares
        squares[i].addEventListener("click",function()
        {   
            //grab color of clicked square
            let clickedColor = this.style.backgroundColor;
    
            //compare color to pickedColor
            if(clickedColor === pickedColor)
            {
                messageDisplay.textContent = "Correct!";
                changeColors(pickedColor);
                document.querySelector("h1").style.backgroundColor = pickedColor;
                resetButton.textContent = "Play Again?";
            }
            else
            {
                this.style.backgroundColor = "#232323";
                messageDisplay.textContent = "Try Again!";
            }
        });
    }
}
function reset()
{
    colors = generateRandomColors(numSquares);
    //pick a new random color from array
    pickedColor = randomColorFromArray();
    //change colorDisplay to match picked color
    colorDisplay.textContent = pickedColor;
    resetButton.textContent = "New Colors";
    messageDisplay.textContent = "";

    //change colors of squares
    for(let i=0; i<squares.length; i++)
        if(colors[i])
        {
            squares[i].style.backgroundColor = colors[i];
            squares[i].style.display = "block";
        }
        else
            squares[i].style.display = "none";

    document.querySelector("h1").style.backgroundColor = "steelblue";
}

resetButton.addEventListener("click",function()
{
    reset();
});

function changeColors(color)
{
    //loop through all squares
    for(let i=0; i<squares.length; i++)
    //change each color to match given color
        squares[i].style.backgroundColor = color;
}

function randomColorFromArray()
{
    let index = Math.floor(Math.random() * colors.length);
    return colors[index];
}

function randomRGBColor()
{   
    //pick a "red"
    let r = Math.floor(Math.random() * 256);

    //pick a "green"
    let g = Math.floor(Math.random() * 256);

    //pick a "blue"
    let b = Math.floor(Math.random() * 256);

    return "rgb(" + r +", " + g + ", " + b + ")";
}

function generateRandomColors(numColors)
{
    //Make an array
    let arr = [];
    //Add numColors random colors
    for(let i=0; i<numColors; i++)
        //get random color
        arr.push(randomRGBColor());
    return arr;

}