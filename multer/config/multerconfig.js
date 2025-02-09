const multer=require('multer');
const path=require('path');
const crypto = require('crypto');
const fs = require('fs');

const uploadDir = './public/images/upload';
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}
//diskstorage
// './public/images/uploads'
const storage = multer.diskStorage({
  //destinatioon of file upload
  destination: function (req, file, cb) {
    cb(null, uploadDir)
  },
  filename: function (req, file, cb) {
    crypto.randomBytes(12, function(err,name){
      const fn =name.toString("hex")+path.extname(file.originalname);
      cb(null, fn);
    });
  }
});

const upload = multer({ storage: storage })

module.exports=upload;