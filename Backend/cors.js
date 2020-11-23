'use strict'

module.exports = function(app) {
    const cors = require('cors')
    const corsOption = {
        origin: function(origin, callback) {
            if(process.env.CORS_WHITELIST.split(' ').indexOf(origin) !==1) {
                callback(null, true)
            }else {
                callback(new Error('Not allowed by CORS configuration'))
            }
        },
        methods: "GET, HEAD, PUT, PATCH, POST, DELETE",
    }

    const publicOptions = {
        origin: function(origin, callback) {
            callback(null, true)
        },
        methods: "GET"
    }

    app.options('*', cors(corsOption))
    app.use(cors(corsOption))
    app.use('/public', cors(publicOptions))
    
}