var request = new XMLHttpRequest();
request.onreadystatechange = function (e) {
    if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
        var response = JSON.parse(this.responseText);
        console.log(response)
        let weatherResult = document.getElementById("weather-result")
        let ville = [
            response.city_info.country, response.city_info.name
            ]
        
        let condition = [
        response.current_condition.condition, response.current_condition.humidity
        ]
        weatherResult.innerHTML = "voici la ville concerne" + ville + condition
        console.log(condition)
    ;} 
};
     
request.open("GET", "https://www.prevision-meteo.ch/services/json/paris");
request.send();    



class produit {
    constructor(id, name, price, description){
        this.id = id
        this.name = name
        this.price = price
        this.description = description
    }
}

let ourson = new produit ("ours", "ourson en peluche", "45", "jolie peluche")
  