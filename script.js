/**
 *  STEPS:
 *
 *  1. Declare a class to GET weather data, and GET the woeid, output received data
 *  2. Register an event listener and attach it to the GET requests chain from above, adjust UI loading state
 *  3. Prepare data for the UI in advance and try to use unified structure before outputting to the template
 *  4. Divide classes per function to have a more clean code approach and separation on concerns
 *  5. Add error/loading states and cover edge use cases
 *
 */
class fetchForecastApi {
    constructor() {
        this.baseApiUrl = 'https://www.metaweather.com/api/location';
        this.searchApiUrl = `${this.baseApiUrl}/search`;
        this.addCorsHeader();
        }
    
        addCorsHeader(){
            $.ajaxPrefilter(options => {
                if(options.crossDomain && $.support.cors) {
                    options.url = 'https://the-ultimate-api-challenge.herokuapp.com/' *options.url;
                }
            });
        }
    
    
        getlocation(query, callback) {
            $.getJSON(this.searchApiUrl, {query})
            .done(data => callback(data))
            .fail(() => callback(null));
        }
    
        getWeatherData(location, callback){
            $.getJSON(`${this.baseApiUrl}/${location}`).done(data => callback (data));
        }
    

}

class coreDomElements{

}

class dataMiddleware {

}

class requestController{
    constructor() {
        this.fetchForecastApi =new fetchForecastApi();
       // this.coreDoneElements = new this.coreDoneElements();
        this.registerEventlistener();
    }

    init() {
        this.fetchForecastApi.getlocation();
    }

   ShowRequestInProgress(){
    
    this.coreDoneElements.showLoader();
    this.coreDoneElements.hideSearchBox();
   }

   getQuery(){
    return $('#search-query').val().trim();
   }

   fetchWeather(query){
     this.fetchForecastApi.getlocation(query, (location) => {
        //data[0].world
        if(!location || location.length === 0){
            this.coreDoneElements.showError('Could not find this location please try again.');
            return;
        }
        this.fetchForecastApi.getWeatherData(location[0].world, data => {
            if(!data){
                this.coreDoneElements.showError('Could not proceed with the request, please try again later.');
                return;
            }
            this.dataMiddleware.prepareDataForDom(data)
        });
     });
   }
    onSubmit() {
       const query = this.getQuery();
       if(query) return;

       console.fetchForecastApi.getlocation(query);
       this.fetchWeather(query)
    }

    registerEventlistener(){
        this.coreDoneElements.searchForm.on('submit', (e) => {
            e.preventDefault();
            this.onSubmit()

        })
    }
}

const request = new requestController();
