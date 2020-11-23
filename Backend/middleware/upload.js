const path = require('path')
const multer = require('multer')

var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function(req, file, cb) {
        let ext = path.extname(file.originalname)
        cb(null, Date.now() + ext)
    }
})

var upload = multer ({
    storage: storage,
    // fileFilter: function(req, file, callback) {
    //     if(
    //         file.mimetype == "image/png" || 
    //         file.mimetype == "image/JPG"
    //     ){
    //         callback(null, true)
    //     }else{
    //         console.log('only jpg & png file supported.')
    //         callback(null, false)
    //     }
    // },
    limits: {
        fileSize: 2048 * 2048 * 10
    }
})

module.exports = upload