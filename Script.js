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
      icon.style.background="url(Icons/clear.Webp)"
    }
    if(Skyw=="few clouds" || Skyw=="scattered clouds"){
      icon.style.background="url(Icons/hazy.Webp)"
    }
    if(Skyw=="heavy rain" || Skyw=="moderate rain" || Skyw=="light rain"){
      icon.style.background="url(Icons/rain.Webp)"
    }
    if(Skyw=="clouds" || Skyw=="overcast clouds"){
      icon.style.background="url(Icons/cloudy.Webp)"
    }
    if(Skyw=="heavy snow" || Skyw=="moderate snow" || Skyw=="light snow"){
      icon.style.background="url(Icons/snow.Webp)"
    }
    if(Skyw=="rain and thunder" || Skyw=="thunder and lightning"){
      icon.style.background="url(Icons/tstorms.Webp)"
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
