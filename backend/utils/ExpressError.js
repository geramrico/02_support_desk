class ExpressError extends Error {
    constructor(status, code, message) {
        super()
        this.status = status
        this.code = code
        this.message = message
    }
}

module.exports = ExpressError