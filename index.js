const tempField=document.querySelector(".weather1");
const cityField=document.querySelector(".weather2 p");
const dateField=document.querySelector(".weather2 span");
const emojiField=document.querySelector(".weather3 img");
const weatherField=document.querySelector(".weather3 span");
const searchField=document.querySelector(".searchField");
const form=document.querySelector("form");
let target="delhi";


const fetchData=async () =>{
    try {
        const url=`https://api.weatherapi.com/v1/current.json?key=5520b7ea7b5e4e8eae1110157232605&q=${target}`;
        const response=await fetch(url);
        const data=await response.json();

        const {
            current:{temp_c,condition:{icon,text}},
            location:{name,localtime}
        }=data;
        updateDom(temp_c,name,localtime,icon,text);    
        console.log(data);
    } catch (error) {
    alert(" Oops!!...Location Not Found");
    }
}

function updateDom(temp,city,time,icon,cond){

    const exactTime=time.split(" ")[1];
    const exactDate=time.split(" ")[0];
    let exactDay=getFulldayName(new Date(exactDate).getDay());    

    tempField.innerText=`${temp}°`;
    cityField.innerText=city;    
    dateField.innerText=`${exactTime} - ${exactDay} - ${exactDate}`;
    emojiField.src=icon;
    weatherField.innerText=cond;
}


function getFulldayName(key){
    switch (key) {
        case 0: return "Sunday";
        case 1: return "Monday";
        case 2: return "TuesDay";
        case 3: return "Wednesday";
        case 4: return "Thrusday";
        case 5: return "Friday";
        case 6: return "Saturday";
        default:return "Don't Know";
    }
}
fetchData();

form.addEventListener("submit",(e)=>{
    e.preventDefault();
    target=searchField.value;    
    fetchData();
    // console.log(target);
})