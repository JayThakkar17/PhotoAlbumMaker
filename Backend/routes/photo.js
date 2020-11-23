const express = require('express')
const router = express.Router()

const PhotoController = require('../controllers/photos')
const upload = require('../middleware/upload')
const {getAlbumById} = require('../controllers/album')
router.param("photoId", PhotoController.show)
router.param("albumId", getAlbumById)
router.get('/:albumId', PhotoController.index)
router.get('/show/:photoId/:albumId', PhotoController.getPhoto)
router.post('/store/:albumId', upload.array('avatar[]'), PhotoController.store)
router.put('/update/:photoId/:albumId', PhotoController.update)
router.delete('/delete/:photoId/:albumId', PhotoController.destroy)

module.exports = router