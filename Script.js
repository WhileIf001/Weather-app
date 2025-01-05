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
function timeAnimation(){
  setTimeout(()=>{
    icon.style.animation= "none";
  }, 5000)
}
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
    }, 5000)
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
    if (Skyw=='clear sky'){
      icon.style.cssText = "background: url(Icons/clear.Webp); background-size: 100%;"
      timeAnimation()
    }
    if (Skyw=='few clouds'){
      icon.style.cssText="background: url('Icons/Half-Cloudy.Webp'); background-size: 100%;"
      timeAnimation()
    }
    if (Skyw=='scattered clouds'){
      icon.style.cssText="background: url('Icons/hazy.Webp'); background-size: 100%;"
      timeAnimation()
    }
    if (Skyw=='light rain'){
      icon.style.cssText="background: url('Icons/rain.Webp'); background-size: 100%;"
      timeAnimation()
    }
    if (Skyw=='overcast clouds'){
      icon.style.cssText="background: url('Icons/cloudy.Webp'); background-size: 100%;"
      timeAnimation()
    }
  }catch(e){
    if (e['message'] == "Cannot read properties of undefined (reading 'speed')"){
      ErrorTag.innerText = 'Your City Is Not Defined'
    }
    
  }
  
}



Getweather.addEventListener('click', getrequest);
