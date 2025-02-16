<?php
    header ('Content-Type:application/json');
    $apikey="";
    $cityName=$_GET['cityName'];
    if (isset($cityName)){
        $servername='localhost';
        $username='root';
        $password='';
        $conn=mysqli_connect($servername,$username,$password);
        if ($conn){
            //echo "Connected sucessfull <br>";
        }
        else{
            echo "unsucessfull".mysqli_connect_error();
        }
        $create="CREATE DATABASE IF NOT EXISTS prototype2;";
        if (mysqli_query($conn,$create)){
            //echo"Database created or already exist.<br>";
        }
        else{
            echo "unsucessfull".mysqli_connect_error();
        }
        mysqli_select_db($conn,'prototype2');
        $table="CREATE TABLE IF NOT EXISTS weatherdata(
                city  varchar(255) PRIMARY KEY,
                country varchar(255),
                main_temperature INT,
                max_temperature INT,
                min_temperature INT,
                feelslike INT,
                mainweather varchar(255),
                wdescription varchar(255),
                wind_speed INT,
                wind_direction INT,
                pressure INT,
                humidity INT,
                icon varchar(255),
                time TIMESTAMP);";
        if (mysqli_query($conn,$table)){
            //echo"Table created or exists <br>";
        }
        else{
            echo mysqli_connect_error();
        }
        $select="SELECT * FROM weatherdata WHERE city='$cityName';";
        $result=mysqli_query($conn,$select);
        if (mysqli_num_rows($result)==0){
            $url="https://api.openweathermap.org/data/2.5/weather?q=$cityName&appid=$apikey&units=metric";
            $response=file_get_contents($url);
            if ($response){
                $data=json_decode($response,true);
                $city=$data['name'];
                $country=$data['sys']['country'];
                $maintemp=$data['main']['temp'];
                $maxtemp=$data['main']['temp_max'];
                $mintemp=$data['main']['temp_min'];
                $feelslike=$data['main']['feels_like'];
                $mainweather=$data['weather'][0]['main'];
                $des=$data['weather'][0]['description'];
                $speed=$data['wind']['speed'];
                $direction=$data['wind']['deg'];
                $pressure=$data['main']['pressure'];
                $humidity=$data['main']['humidity'];
                $icon=$data['weather'][0]['icon'];
                $insert="INSERT INTO weatherdata(city,country,main_temperature,max_temperature,min_temperature,feelslike,mainweather,wdescription,wind_speed,wind_direction,pressure,humidity,icon,time)
                        VALUE ('$city','$country','$maintemp','$maxtemp','$mintemp','$feelslike','$mainweather','$des','$speed','$direction','$pressure','$humidity','$icon',NOW())";
                if(mysqli_query($conn,$insert)){
                    //echo "inserted";
                }
                else{
                    echo mysqli_connect_error();
                }
                $result=mysqli_query($conn,$select);
                $rows=[];
                    while ($row=mysqli_fetch_assoc($result)){
                        $rows[]= $row;
                        $json_data= json_encode($rows);
                        echo $json_data;
                    
                    }
            }
        }
        else{
            $select="SELECT * FROM weatherdata WHERE city='$cityName' and time >= NOW() - INTERVAL 2 HOUR;";
            $result=mysqli_query($conn,$select);
            if (mysqli_num_rows($result)==0){
                $url="https://api.openweathermap.org/data/2.5/weather?q=$cityName&appid=20df43109eab4978353e1a92004bc299&units=metric";
                $response=file_get_contents($url);
                if ($response){
                $data=json_decode($response,true);
                $city=$data['name'];
                $country=$data['sys']['country'];
                $maintemp=$data['main']['temp'];
                $maxtemp=$data['main']['temp_max'];
                $mintemp=$data['main']['temp_min'];
                $feelslike=$data['main']['feels_like'];
                $mainweather=$data['weather'][0]['main'];
                $des=$data['weather'][0]['description'];
                $speed=$data['wind']['speed'];
                $direction=$data['wind']['deg'];
                $pressure=$data['main']['pressure'];
                $humidity=$data['main']['humidity'];
                $icon=$data['weather'][0]['icon'];
                $insert="UPDATE weatherdata
                        SET city='$city',country='$country',main_temperature='$maintemp',max_temperature='$maxtemp',min_temperature='$mintemp',feelslike='$feelslike',mainweather='$mainweather',wdescription='$des',wind_speed='$speed',wind_direction='$direction',pressure='$pressure',humidity='$humidity',icon='$icon',time=NOW()
                        WHERE city='$cityName';";
                if(mysqli_query($conn,$insert)){
                    //echo "inserted";
                }
                else{
                    echo mysqli_connect_error();
                }
                $result=mysqli_query($conn,$select);
                $rows=[];
                while ($row=mysqli_fetch_assoc($result)){
                    $rows[]= $row;
                    $json_data= json_encode($rows);
                    echo $json_data;
                }
            }
            }
            else{
                $result=mysqli_query($conn,$select);
                $rows=[];
                while ($row=mysqli_fetch_assoc($result)){
                    $rows[]= $row;
                    $json_data= json_encode($rows);
                    echo $json_data;
                }
            }
        }
    }


    
?>