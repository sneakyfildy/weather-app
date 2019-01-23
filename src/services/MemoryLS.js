class MemoryLS {
    saveLastCity(title) {
        window.localStorage.setItem('last_city_title', title);
    }

    getLastCity() {
        return {
            title: window.localStorage.getItem('last_city_title')
        };
    }
}

const MemoryLSInstance = new MemoryLS();
export default MemoryLSInstance;