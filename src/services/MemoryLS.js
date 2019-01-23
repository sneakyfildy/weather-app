class MemoryLS {
    saveLastCity(id, title) {
        window.localStorage.setItem('last_city_id', id);
        window.localStorage.setItem('last_city_title', title);
    }

    getLastCity() {
        return {
            id: window.localStorage.getItem('last_city_id'),
            title: window.localStorage.getItem('last_city_title')
        };
    }
}

const MemoryLSInstance = new MemoryLS();
export default MemoryLSInstance;