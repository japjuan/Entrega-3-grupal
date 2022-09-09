let getJSONData = function(url){
    let result = {};
    return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }else{
        throw Error(response.statusText);
      }
    })
    .then(function(response) {
          result.status = 'ok';
          result.data = response;
          return result;
    })
    .catch(function(error) {
        result.status = 'error';
        result.data = error;
        return result;
    });
}

let nasaItems = []

function search(){
    getJSONData("https://images-api.nasa.gov/search?q=" + document.getElementById("inputBuscar").value).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            nasaItems = resultObj.data.collection.items
            showProductsList()
        }
    });
};

function showProductsList(){
    let htmlContentToAppend = "";

    for(const imagen of nasaItems){ 

        htmlContentToAppend += `
        <div class "col">
            <div class="card h-90" >
                <img class="card-img-top" src="` + imagen.links[0].href + `" alt="Card image cap">
                <div class="card-body">
                    <h5 class="card-title">` + imagen.data[0].title + `</h5>
                    <p class="card-text a">` + imagen.data[0].description + `</p>
                    <p class="card-text b"></p>
                </div>
                <div class="card-footer">
                    <small class="text-muted">` + imagen.data[0].date_created + `</small>
                </div>
            </div>
        </div>
        `
        document.getElementById("contenedor").innerHTML = htmlContentToAppend; 
    }
}

