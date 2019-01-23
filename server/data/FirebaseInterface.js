const firebase = require('../firebase/firebase');

class FirebaseInterface {
    constructor(rootNodeName) {
        this.rootNodeName = rootNodeName;
    }
    getItems(clientQuery) {
        let ref = this.getRoot();
        let query;
        if (!!clientQuery.child) {
            const fbChildPath = clientQuery.child.replace(/_/g, '/');
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

    addItems(items) {
        let lastPromise;
        items.map((item, index) => {
            console.log('push!', index);
            lastPromise = this.getRoot().push(item);
        });
        return lastPromise;
    }

    clear() {
        return this.getRoot().set({});
    }

    getRoot(rootNodeName) {
        return firebase.database().ref(this.rootNodeName);
    }
};

module.exports = FirebaseInterface;