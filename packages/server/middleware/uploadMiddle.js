import multer from 'multer'

const storage = multer.diskStorage({
    destination: "../client/public/",
    filename: function(req, file, cb){
        const extension = file.originalname.toLowerCase().split(" ").join("-")
        cb(null,"IMAGE-" + Date.now() + extension) //https://dev.to/ibrahimshamma99/upload-file-via-mern-stack-rocket-528l
    }
})

const upload = multer({
    storage: storage,
    limit:{filesize:1000000},
})

module.exports = upload