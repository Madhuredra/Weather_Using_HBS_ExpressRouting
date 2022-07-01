const submitBtn = document.getElementById('submitBtn');
const city_name = document.getElementById('city_name');

const temp = document.getElementById('temp');
const temp_status = document.getElementById('temp_status');

const datahide = document.querySelector('.middle_layer');

const day = document.getElementById('day');
const today_date = document.getElementById('today_date');

let Day = new Date().getDay();
// const Today_Date = new Date().getVarDate();
const Date1 = new Date().getDate();
const Month = new Date().getMonth();

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

day.innerHTML = `${days[Day]}`;
today_date.innerHTML = `${Date1} ${months[Month]}`;

const getInfo = async(event) => {
    event.preventDefault();
    const city_val = document.getElementById('cityName').value;
    if(city_val===""){
        city_name.innerHTML = `Please enter a city name`;
        city_name.style.color = "red";
        datahide.add.classList('data_hide');
    }else{
        try{
            let url = `https://api.openweathermap.org/data/2.5/weather?q=${city_val}&appid=ad436e5e81691acb53b92951b648fc05`;
            const response = await fetch(url);
            console.log(response);
            const data = await response.json();
            // console.log(data);    
            const arrData = [data];
            // console.log(arrData);
            city_name.innerHTML = `${arrData[0].name}, ${arrData[0].sys.country}`;
            // (32°F − 32) × 5/9
            // const cel = arrData[0].main.temp*5/9-32*5/9;
            const cel = Math.round((arrData[0].main.temp - 273.15));
            // console.log(cel);
            temp.innerHTML = `${cel}`;
            // temp_status.innerHTML = `${arrData[0].weather[0].main}`;
            const tempMood = arrData[0].weather[0].main;
            //condition to check sunny or cloudy
            if (tempMood == "Clear") {
                temp_status.innerHTML = "<i class='fas fa-sun' style='color: #eccc68;'></i>";
            }else if (tempMood == "Clouds") {
                temp_status.innerHTML = "<i class='fas fa-cloud' style='color: #f1f2f6;'></i>";
            } else if (tempMood== "Rain") {
                temp_status.innerHTML = "<i class='fas fa-cloud-rain' style='color: #a4b0be;'></i>";
            } else {
                temp_status.innerHTML = "<i class='fas fa-cloud' style='color:#f1f2f6;'></i>";
            }
            datahide.classList.remove('data_hide');

        }catch(err){
            datahide.add.classList('data_hide');
            city_name.innerHTML = `Please enter a correct city name`;
            city_name.style.color = "red";
        }
    }
}
submitBtn.addEventListener('click', getInfo);