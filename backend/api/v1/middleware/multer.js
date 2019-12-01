const multer = require('multer');

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        if(file.mimetype === 'image/gif') {
            cb(null, '../images');
        } else {
            cb({message: 'this is not an allowed type'})
        }
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname);
    }
});

const upload = multer({storage: storage});
module.exports = upload;