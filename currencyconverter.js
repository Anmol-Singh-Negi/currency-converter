const BASE_URL = "https://api.exchangerate-api.com/v4/latest";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
let fromCurr = document.querySelector(" .from select");
let toCurr = document.querySelector(".to select");
let msg= document.querySelector(".msg");

for(let select of dropdowns)
{
    for(let currCode in countryList)
    {
        let newItem= document.createElement("option");
        newItem.innerText=currCode;
        newItem.value=currCode;
        if(select.name==="from" && currCode==="USD")
        {
            newItem.selected="selected";
        }
        else if(select.name==="to" && currCode==="INR")
        {
            newItem.selected="selected";
        }
        select.append(newItem);
    }
    select.addEventListener("change",(evt)=>{
        updateFlag(evt.target);
    });
    
}

const updateFlag=(element)=>{
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/shiny/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
}

btn.addEventListener("click",async (evt)=>
{
    evt.preventDefault();
    let amount = document.querySelector(".amount input");
    let amtVal = amount.value;
    console.log(amtVal);
    if(amtVal === "" || amtVal<1)
    {
        amtVal = 1;
        amount.value === "1";
    }
    
     
    const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}`;
    let response = await fetch(URL);
    let data = await response.json();
    
    
    //${data.rates[`${toCurr.value}`]}
    let FinalAmount = amtVal* data.rates[`${toCurr.value}`];
    msg.innerText= `${amtVal} ${fromCurr.value} =  ${FinalAmount} ${toCurr.value}`;

}) 





