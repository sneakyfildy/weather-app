class Globals {
    constructor () {
        this.data = {};
        if (!!window['__WEATHER_APP_GLOBALS__']) {
            Object.assign(this.data, window['__WEATHER_APP_GLOBALS__']);
        }
    }

    get(itemName) {
        return this.data[itemName];
    }
}

const GlobalsInstance = new Globals();

export default GlobalsInstance;