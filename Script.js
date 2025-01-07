const apiKey = 'd6da27ad247052eeda7fad2a1661f344';
const icon = document.querySelector('.icon');
var InputCity = document.querySelector('.inputCity');
var Getweather = document.querySelector('.getWeather');
var City = document.querySelector('.City')
var Temp = document.querySelector('.Temp');
var Sky = document.querySelector('.Sky');
var Wind = document.querySelector('.Wind');
var ErrorTag = document.querySelector('.errortag');
setInterval(()=>{
  if (InputCity.value.length>0) {
    InputCity.style.fontFamily = "GraphitePro"
  }else {
    InputCity.style.fontFamily = "Farnaz"
  }
}, 0.5)
function convert(data){
  return (data-273);
}

async function getrequest(){
  try{
    var SendRequest = await (await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${InputCity.value}&appid=${apiKey}`)).json();
   getinfo(SendRequest);
  }catch(e){
    if (e['message'] == 'Failed to fetch'){
      ErrorTag.innerText = 'Please Check Your Internet';
    }
    else{
      ErrorTag.innerText = ''
    }
    setTimeout(() => {
      ErrorTag.innerText = ''
    }, 3000)
  }
}
async function getinfo(data){
    try{
    var Cityname = data['name'];
    var windspeed = data['wind']['speed'];
    var Temperature = data['main']['temp'];
    var Skyw = data['weather'][0]['description']
    City.innerHTML = `City Name: ${Cityname}`;
    Temp.innerHTML = `Temperature: ${convert(Temperature).toFixed(1)} C°`;
    Wind.innerHTML = `Wind Speed: ${windspeed} km/h`;
    Sky.innerHTML = `Sky condition: ${Skyw}`;
    if(Skyw=="clear sky"){
      icon.classList.add("clear","show");
    }
    if(Skyw=="few clouds" || Skyw=="scattered clouds" || Skyw=="fog" || Skyw=="haze"){
      icon.classList.add("fog","show");
    }
    if(Skyw=="heavy intensity rain" || Skyw=="moderate rain" || Skyw=="rain" || Skyw=="shower rain" || Skyw=="light rain"){
      icon.classList.add("rain","show");
    }
    if(Skyw=="clouds" || Skyw=="overcast clouds" || Skyw=="broken clouds" || Skyw=="mist"){
      icon.classList.add("clouds","show");
    }
    if(Skyw=="heavy intensity snow" || Skyw=="moderate snow" || Skyw=="snow" || Skyw=="shower snow" || Skyw=="light snow"){
      icon.classList.add("snow","show");
    }
    if(Skyw=="rain and thunder" || Skyw=="thunder and lightning" || Skyw=="squalls"){
      icon.classList.add("squalls","show");
    }
  }catch(e){
    if (e['message'] == "Cannot read properties of undefined (reading 'speed')"){
      ErrorTag.innerText = 'Your City Is Not Defined'
    }else{
        ErrorTag.innerText = ''
      }
      setTimeout(() => {
        ErrorTag.innerText = ''
      }, 3000)
    }
}

Getweather.addEventListener('click', getrequest);
