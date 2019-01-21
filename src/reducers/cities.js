import uuid from 'uuid';

// // Don't know how this data is going to be really used, so putting
// hardcoded set of cities here at the moment
const citiesReducerDefaultState = [
    {
        id: uuid(),
        title: 'azazaz'
    },
    {
        id: uuid(),
        title: 'ololo'
    },
    {
        id: uuid(),
        title: 'zlo'
    }
];

export default (state = citiesReducerDefaultState, action) => {
    // empty reducer, since we do not modify cities set (yet)
    return state;
};
