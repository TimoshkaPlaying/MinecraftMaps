const express = require("express")
const multer = require("multer")
const cors = require("cors")
const fs = require("fs")

const app = express()
const PORT = 2550

app.use(cors())
app.use(express.json())
app.use(express.static("public"))

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        let uploadDir;

       
        if (file.mimetype === "application/zip" || file.originalname.endsWith(".zip")) {
            uploadDir = "maps/";
        } else {
            uploadDir = "src/";
        } 

       
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }

        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage });


app.post("/download", upload.fields([{name:"cardImage"}, {name:"cardSlider"}, {name:"map"}]), (req, res) => {
    const {cardName, cardHref, cardDescription, cardMoreDescription, cardVersion, cardSize} = req.body

    if (!cardName, !cardHref, !cardDescription, !cardMoreDescription, !cardVersion, !cardSize) {
        return res.status(400).json({message:"Все поля должны быть заполнены!"})
    }

    const newCard = {cardName, cardHref, cardDescription, cardMoreDescription, cardVersion, cardSize, 
        cardImage:req.files["cardImage"] ? req.files["cardImage"][0].path : null,
        cardSlider:req.files["cardSlider"] ? req.files["cardSlider"].map(file => file.path) : null, 
        map:req.files["downloadFile"] ? req.files["downloadFile"][0].path : null}
})


app.listen(PORT, () => {
    console.log(`Сервер запущен по адресу http://localhost:${PORT}`)
})