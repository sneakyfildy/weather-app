// filter cities

export default (cities, { text }) => {
    return cities.filter((city) => {
        const textMatch = city.title.toLowerCase().includes(text.toLowerCase());
        return textMatch;
    });
};