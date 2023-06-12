// Initializing all elements constants
const temperateField = document.querySelector(".weather1");
const cityField = document.querySelector(".weather2 p");
const dateField = document.querySelector(".weather2 span");
const emojiField = document.querySelector(".weather3 img");
const weatherField = document.querySelector(".weather3 span");
const searchField = document.querySelector(".searchField");
const form = document.querySelector("form");


// Default Location

let target = "chennai";

// Function to fetch Data from Weather API

const fetchData = async (target) => {
  try {
    const url = `https://api.weatherapi.com/v1/current.json?key=2eecfa4a6c1b448f91263046231206&q=${target} `;
    const responce = await fetch(url);
    const data = await responce.json();
    console.log(data);

    // Destructuring

    const {
      current: {
        temp_c,
        condition: { text, icon },
      },
      location: { name, localtime },
    } = data;


    // Calling update Dom Function

    updateDOM(temp_c, name, localtime, icon, text);
  } catch (error) {
    alert("Location Not Found");
  }
};


// Function to update Dom

function updateDOM(temperature, city, time, emoji, text) {
  
  const exactTime = time.split(" ")[1];
  const exactDate = time.split(" ")[0];
  const exactDay = new Date(exactDate).getDay();

  
  temperateField.innerText = temperature;
  cityField.innerText = city;
  dateField.innerText = `${exactTime} - ${getDayFullName(exactDay)}  ${exactDate}`;
  emojiField.src = emoji;
  weatherField.innerText = text;
}

fetchData(target);


// Function to search the location and Adding event listen to the form

form.addEventListener("submit", (e) => {
  e.preventDefault();
  target = searchField.value;
  fetchData(target);
});

// Function to get the name of day

function getDayFullName(num) {
    switch (num) {
      case 0:
        return "Sunday";
  
      case 1:
        return "Monday";
  
      case 2:
        return "Tuesday";
  
      case 3:
        return "Wednesday";
  
      case 4:
        return "Thursday";
  
      case 5:
        return "Friday";
  
      case 6:
        return "Saturdat";
  
      default:
        return "Don't Know";
    }
  }
  