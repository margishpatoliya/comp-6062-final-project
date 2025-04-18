// creating vue.js application
const app = Vue.createApp({
    // function to return object
    data() {
        return {
            newFact: '', //data which generated by the app
            city: '',
            word: '',
            weather: {
                city: 'London, Ontario',
                temperature: '',
                wind: '',
                description: ''
            },
            dictionary: {
                word: '',
                phonetic: '',
                partOfSpeech: '',
                definition: ''
            },
            
        };
    },
    methods: {
        getNewFact() {
            fetch('https://uselessfacts.jsph.pl/api/v2/facts/random')
                .then(response => response.json())
                .then(data => {
                    this.newFact = data.text;
                });
        },//fetch and display a random fact
        getWeather() {
            const cityName = this.city.trim() || 'London Ontario';//if city data is not given by user then use the 'london ontario'
            fetch(`https://goweather.herokuapp.com/weather/${cityName}`)
                .then(response => response.json())
                .then(data => {
                    this.weather.city = cityName.replace('%20', ' ');
                    this.weather.temperature = data.temperature;
                    this.weather.wind = data.wind;
                    this.weather.description = data.description;//saving data from link to variable
                });
        },//fetch and display weather information of the city which given by the user
        getWord() {
            fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${this.word}`)
                .then(response => response.json())
                .then(data => {
                    this.dictionary.word = data[0].word;//here i tried to cosnt but it was not working that's why i am using data[0] directly
                    this.dictionary.phonetic = data[0].phonetic;
                    this.dictionary.partOfSpeech = data[0].meanings[0].partOfSpeech;
                    this.dictionary.definition = data[0].meanings[0].definitions[0].definition;//saving the data 
                });
        },
    },
    mounted() {
        this.getWeather();
        this.getNewFact();
        this.getWord();//mounting the methods.
    }
});

app.mount('#app');//Mount Vue.js  with the ID "app"