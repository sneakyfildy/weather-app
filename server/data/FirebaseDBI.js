const AbstractFirebaseDBI = require('./AbstractFirebaseDBI');

class FirebaseDBI extends AbstractFirebaseDBI{
    constructor(firebaseInstance, rootNodeName) {
        super(firebaseInstance, rootNodeName);

        this.firebaseChildMap = {
            'location_title': 'location/title',
            'location_id': 'location/id'
        };
    }
    getItems(clientQuery) {
        let ref = this.getRoot();
        let query;
        if (!!clientQuery.child) {
            const fbChildPath = this.firebaseChildMap[clientQuery.child];
            if (!!fbChildPath) {
                query = ref.orderByChild(fbChildPath);
            }

            if (!!clientQuery.search_string) {
                query = query
                    .equalTo(clientQuery.search_string);
            }
        }

        return (query || ref).once('value');
    }

    addItem(item) {
        return this.getRoot().push(item);
    }

    clear() {
        return this.getRoot().set({});
    }

    getRoot() {
        return this.firebase.database().ref(this.rootNodeName);
    }
};

module.exports = FirebaseDBI;