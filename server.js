const express = require("express")
const multer = require("multer")
const cors = require("cors")
const fs = require("fs")

const app = express()
const PORT = 2550

app.use(cors())
app.use(express.json())
app.use(express.static("public"))
app.use(express.urlencoded({extended:true}))

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        let uploadDir = "uploads/";

       
        if (file.mimetype === "application/zip" || file.mimetype === "application/x-rar-compressed" || file.originalname.endsWith(".zip") || file.originalname.endsWith(".rar")) {
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


app.post("/download", upload.fields([
    {name:"cardImage", maxCount:1}, 
    {name:"cardSlider", maxCount:10}, 
    {name:"downloadFile", maxCount:1}]), 
    (req, res) => {
    const {cardName, cardHref, cardDescription, cardMoreDescription, version, size} = req.body

    if (!cardName || !cardHref || !cardDescription || !cardMoreDescription || !version || !size) {
        return res.status(400).json({message:"Все поля должны быть заполнены!"})
    }

    const newCard = {
        cardName, 
        cardHref, 
        cardImage:req.files["cardImage"] ? req.files["cardImage"][0].path : null,
        cardDescription, 
        cardMoreDescription, 
        cardSlider:req.files["cardSlider"] ? req.files["cardSlider"].map(file => file.path) : [], 
        version, 
        size, 
        downloadFile:req.files["downloadFile"] ? req.files["downloadFile"][0].path : null, 
        editor:"false"}
    
    const optionsFile = "options.json"
    let options = []
    if (fs.existsSync(optionsFile)) {
        const fileData = fs.readFileSync(optionsFile, "utf-8")
        options = JSON.parse(fileData)
    }
    options.push(newCard)
    fs.writeFileSync(optionsFile, JSON.stringify(options, null, 4), "utf-8")

    res.status(200).json({message:"Карта успешно загружена!"})
})


app.listen(PORT, () => {
    console.log(`Сервер запущен по адресу http://localhost:${PORT}`)
})