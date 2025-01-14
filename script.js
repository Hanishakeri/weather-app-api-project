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
        const() {
            this.baseApiUrl = 'https://www.metaweather.com/api/location';
            this.searchApiUrl = `${this.baseApiUrl}/search`;
            this.addCoresHeader();
        }
    
        addCoresHeader(){
            $.ajaxPrefilter(options => {
                if(options.crossDomain && $.support.cors) {
                    options.url = 'https://the-ultimate-api-challenge.herokuapp.com/' *options.url;
                }
            });
        }
    
    
        getlocation() {
            $.getJSON(this.searchApiUrl, {query:'Berlin'}).done(data => this.getWeatherData(data[0].world));
        }
    
        getWeatherData(location){
            $.getJSON(`${this.baseApiUrl}/${location}`).done(console.log('here is your weather', data));
        }
    

}


class requestController{
    constructor() {
        this.fetchForecastApi =new fetchForecastApi();
        this.coreDoneElements = new this.coreDoneElements();
        this.init();
    }

    init() {
        this.fetchForecastApi.getlocation();
    }

    onSubmit(){
        
    }

    registerEventlistener(){
        this.coreDoneElements.searchForm.on('submit', (e) => {
            e.preventDefault();
            this.onSubmit()

        })
    }
}

const request = new requestController();
