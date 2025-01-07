const api_key="20df43109eab4978353e1a92004bc299";
var loca=document.getElementById("loca");
var ser=document.getElementById("search");
var city=document.getElementById("search").value;
let search=document.getElementById("sbut");
var maintemp=document.getElementById("maintemp");
var mainweath=document.getElementById("mainweath");
var maxtemp=document.getElementById("max")
var mintemp=document.getElementById("min")
var wspeed=document.getElementById("speed");
var wdeg=document.getElementById("deg");
var pressure=document.getElementById("pressure");
var humidity=document.getElementById("humidity");
var icon=document.getElementById("icon");
var des=document.getElementById("descrip");
var feel=document.getElementById("feel");
const time=new Date();
var year=time.toLocaleDateString();
document.getElementById("date").innerHTML=year;
var day=time.getDay();
if (day==0){
    document.getElementById("day").innerHTML="Sunday";
}
else if (day==1){
    document.getElementById("day").innerHTML="Monday";
}
else if (day==2){
    document.getElementById("day").innerHTML="Tuesday";
}
else if (day==3){
    document.getElementById("day").innerHTML="Wednesday";
}
else if (day==4){
    document.getElementById("day").innerHTML="Thursday";
}
else if (day==5){
    document.getElementById("day").innerHTML="Friday";
}
else if (day==6){
    document.getElementById("day").innerHTML="Saturday";
}
geoo();
search.addEventListener("click",function(){
    city=document.getElementById("search").value;
    console.log(city);
    geoo();
});
async function geoo(){
    try{
    let response= await fetch("http://api.openweathermap.org/geo/1.0/direct?q="+city+"&limit=1&appid="+api_key)
    let cor= await response.json();
    let lat=cor[0].lat;
    let lon=cor[0].lon;
    let weather=await fetch ("https://api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+lon+"&appid="+api_key+"&units=metric")
    let data= await weather.json();
    console.log("DATA:",data);
    loca.innerHTML=city+","+data.sys.country;
    maintemp.innerHTML=parseInt(data.main.temp)+"<sup>o</sup>C";
    mainweath.innerHTML=data.weather[0].main;
    maxtemp.innerHTML=parseInt(data.main.temp_max)+"<sup>o</sup>C";
    mintemp.innerHTML=parseInt(data.main.temp_min)+"<sup>o</sup>C";
    feel.innerHTML=parseInt(data.main.feels_like)+"<sup>o</sup>C";
    wspeed.innerHTML="Speed="+data.wind.speed+"m/s";
    wdeg.innerHTML="Degree="+data.wind.deg+"<sup>o</sup>";
    pressure.innerHTML="Pressure="+data.main.pressure+"hpa";
    humidity.innerHTML="Humidity="+data.main.humidity+"%";
    i=data.weather[0].icon;
    icon.src="https://openweathermap.org/img/wn/"+i+"@2x.png"
    des.innerHTML=data.weather[0].description;
    }
    catch{
        alert("Some error occured");
    }
}
ser.addEventListener("  ",function(event){
    if (event.key=="Enter"){
    city=document.getElementById("search").value;
    geoo();
    }
})
