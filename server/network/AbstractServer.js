class AbstractServer {
    handleApiRequest(handlerFn, req, res) {
        res.setHeader('Content-Type', 'application/json');
        handlerFn.call(this, req, res);
    }
}

module.exports = AbstractServer;