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
    if (navigator.onLine){
        try{
            let weather=await fetch ("http://localhost/prototype2/weather_2501413.php?cityName="+city)
            let data= await weather.json();
            console.log("DATA:",data);
            loca.innerHTML=data[0].city+","+data[0].country;
            maintemp.innerHTML=data[0].main_temperature+"<sup>o</sup>C";
            mainweath.innerHTML=data[0].mainweather;
            maxtemp.innerHTML=data[0].max_temperature+"<sup>o</sup>C";
            mintemp.innerHTML=data[0].min_temperature+"<sup>o</sup>C";
            feel.innerHTML=data[0].feelslike+"<sup>o</sup>C";
            wspeed.innerHTML="Speed="+data[0].wind_speed+"m/s";
            wdeg.innerHTML="Degree="+data[0].wind_direction+"<sup>o</sup>";
            pressure.innerHTML="Pressure="+data[0].pressure+"hpa";
            humidity.innerHTML="Humidity="+data[0].humidity+"%";
            i=data[0].icon;
            icon.src="https://openweathermap.org/img/wn/"+i+"@2x.png"
            des.innerHTML=data[0].wdescription;
            let pos=JSON.stringify(data)
            localStorage.setItem(data[0].city,pos)
            document.getElementById("spe").innerHTML="Speed="+data[0].wind_speed+"m/s";
            document.getElementById("de").innerHTML="Degree="+data[0].wind_direction+"<sup>o</sup>";
            document.getElementById("pre").innerHTML="Pressure="+data[0].pressure+"hpa";
            document.getElementById("hum").innerHTML="Humidity="+data[0].humidity+"%";
        }
        catch{
            alert("Some error occured");
        }
    }
    else{
        try{
            let res=localStorage.getItem(city)
            data = JSON.parse(res)
            loca.innerHTML=data[0].city+","+data[0].country;
                maintemp.innerHTML=data[0].main_temperature+"<sup>o</sup>C";
                mainweath.innerHTML=data[0].mainweather;
                maxtemp.innerHTML=data[0].max_temperature+"<sup>o</sup>C";
                mintemp.innerHTML=data[0].min_temperature+"<sup>o</sup>C";
                feel.innerHTML=data[0].feelslike+"<sup>o</sup>C";
                wspeed.innerHTML="Speed="+data[0].wind_speed+"m/s";
                wdeg.innerHTML="Degree="+data[0].wind_direction+"<sup>o</sup>";
                pressure.innerHTML="Pressure="+data[0].pressure+"hpa";
                humidity.innerHTML="Humidity="+data[0].humidity+"%";
                i=data[0].icon;
                icon.src="https://openweathermap.org/img/wn/"+i+"@2x.png"
                des.innerHTML=data[0].wdescription;
                document.getElementById("spe").innerHTML="Speed="+data[0].wind_speed+"m/s";
                document.getElementById("de").innerHTML="Degree="+data[0].wind_direction+"<sup>o</sup>";
                document.getElementById("pre").innerHTML="Pressure="+data[0].pressure+"hpa";
                document.getElementById("hum").innerHTML="Humidity="+data[0].humidity+"%";
        }
        catch{
            alert("The data for the city is not available.")
        }
    }
}
ser.addEventListener("keypress",function(event){
    if (event.key=="Enter"){
    city=document.getElementById("search").value;
    geoo();
    }
})
