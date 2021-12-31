const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const propertyController = require('../controllers/propertyController');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../public/images/properties'));
    },
    filename: (req, file, cb) => {
        const newFilename = 'property-' + Date.now() + path.extname(file.originalname); 
        cb(null, newFilename);
    }
});

const upload = multer({ storage });

router.get('/', propertyController.list);

router.get('/detail/:id', propertyController.detail);

router.get('/create', propertyController.createGET);
router.post('/create', upload.single('image'), propertyController.createPOST);

router.get('/edit/:id', propertyController.editGET);
router.put('/edit/:id', upload.single('image'), propertyController.editPUT);

router.delete('/delete/:id', propertyController.delete);

router.get('/search', propertyController.search);


module.exports = router;