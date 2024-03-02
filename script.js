let dropDown = document.getElementById("dropDown")
let navbar = document.querySelector(".navbar")
let navItem = document.querySelector(".navItem")

dropDown.addEventListener("click",()=>{
    navbar.classList.toggle("navbar-height")
    navItem.classList.toggle("navItem-display")

    if(dropDown.src.includes("navigation-bar")){
        dropDown.src = "close.png"
        dropDown.style.width = "15px"
        dropDown.style.height = "15px"
    }
    else{
        dropDown.src = "navigation-bar.png"
        dropDown.style.width = "20px"
        dropDown.style.height = "20px"
    }

})


let result = document.getElementById("result");
const apikey = '9041fdff59e7495ba9ae0d5607683c20'; 
let loading_img = document.querySelector(".load-img")
let resultH2 = document.querySelector(".resultH2")
let resultDiv = document.querySelector(".cards-container")


function removeWhiteSpace(itemArray){
    let newArray = [];

    for(let i = 0; i < itemArray.length; i++){
        let item = itemArray[i].trim()
        newArray.push(item)
    }
    return newArray
}

async function getRecipe(inputdata){

    resultH2.style.display = "none"
    loading_img.style.display = "block"
    resultDiv.innerHTML = '';

    let inputArray = inputdata.split(",");
    let whiteSpaceRemoveArray = removeWhiteSpace(inputArray);
    let finalvalue = whiteSpaceRemoveArray.join(",")
    const url = `https://api.spoonacular.com/recipes/findByIngredients?apiKey=${apikey}&ingredients=${finalvalue}`;

    try{
        let response = await fetch(url)
        let data = await response.json();
        console.log(data)
        return data
    }
    catch(error){
        result.innerHTML = `<h2 style="color:red;"> An error occurred. Please try again later. </h2>`;
        console.error('Error fetching data:', error);
    }
}


function showResult(promiseData){
    promiseData.then((data)=>{

        
        resultDiv.innerHTML = '';
        loading_img.style.display = "none"

        if(data.length === 0){
            result.innerHTML = `<h2> No recipe found based on your ingredient </h2>`;
            return
        }
        
        for(let i = 0; i < data.length; i++){

            let innerbox = document.createElement("div")
            innerbox.setAttribute("class","card")

// if you that recipe should be displayed on screen when image is loaded---------

            let imgElement = new Image();
            imgElement.src = data[i].image;;
            imgElement.onload = function() {
                innerbox.innerHTML = `<img src="${data[i].image}" alt="${data[i].title}">
                <p>${data[i].title}</p>`;

                resultDiv.appendChild(innerbox);
            };

// -------------for animation------------------------------------------

            let classArray = ['animation-left','animation-right']
            let index = parseInt(Math.random()*2)
            console.log(index)
            innerbox.classList.add(classArray[index])

// -----------------------------------------------------
        }

    })
};


let btn = document.getElementById("btn")

btn.addEventListener("click", (e)=>{
    e.preventDefault()
    let inputdata = document.getElementById("input").value.toLowerCase();
    let promiseData = getRecipe(inputdata);
    showResult(promiseData)
})


let displayBlock = document.querySelector(".usebtn");
let alertBox = document.querySelector(".alert-box");

// when user click on the how to use button the alert box will be displayed
displayBlock.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();
    alertBox.style.display = "flex";
    document.querySelector(".text-container").style.opacity = "0.5"
    document.querySelector(".entry-container").style.opacity = "0.5"
});

// when user click on the ok button the alert box will remove
document.getElementById("Okbtn").addEventListener("click", ()=>{
    alertBox.style.display = "none";
    document.querySelector(".text-container").style.opacity = "1"
    document.querySelector(".entry-container").style.opacity = "1"
})

// when use click on the document the alert box will remove from the screen
document.addEventListener("click",(e)=>{
    alertBox.style.display = "none";
    document.querySelector(".text-container").style.opacity = "1"
    document.querySelector(".entry-container").style.opacity = "1"
})