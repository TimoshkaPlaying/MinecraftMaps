let downloadButton = document.querySelector('.downloadButton')
let downloadLink = document.querySelector('.downloadLink')
let body = document.querySelector('body')

let right_arrow = document.querySelector(".right")
let left_arrow = document.querySelector(".left")
let img = document.querySelector(".active")
// let images = ["src/slider1.png", "src/slider2.png", "src/slider3.png"]
let images = []
let img_now = 0
let button = document.querySelector('button')

// -----------------------------------------------------------------

downloadButton.addEventListener('click', function(){
    let zip = this.getAttribute('data-url')
    let a = document.createElement('a')
    a.href = zip
    a.download = zip.split('/').pop()
    body.appendChild(a)
    a.click()
    body.removeChild(a)
})

downloadLink.addEventListener('click', function(event){
    event.preventDefault()
    let zip = this.getAttribute('href')
    let a = document.createElement('a')
    a.href = zip
    a.download = zip.split('/').pop()
    body.appendChild(a)
    a.click()
    body.removeChild(a)
})



// right_arrow.addEventListener("click", function(){
//     img_now += 1
//     if (img_now > (images.length - 1)) {
//         img_now = 0
//     }
//     img.src = images[img_now]
// })

// left_arrow.addEventListener("click", function(){
//     img_now -= 1
//     if (img_now == -1) {
//         img_now = images.length - 1
//     }
//     img.src = images[img_now]
// })


function updateSlider() {
    if (img && images.length > 0) {
        img.src = images[img_now]
    }
}

left_arrow.addEventListener("click", function() {
    img_now = (img_now - 1 + images.length)%images.length
    updateSlider()
})

right_arrow.addEventListener("click", function() {
    img_now = (img_now + 1)%images.length
    updateSlider()
})

document.addEventListener("DOMContentLoaded", function() {
    let params = new URLSearchParams(window.location.search)
    let cardName = params.get("card")
    console.log(cardName)
    if (!cardName) {
        console.error("Ошибка! Карта не найдена!")
        return
    }
    fetch("options.json")
        .then(response => response.json())
        .then(data => {
            console.log(data)
            let card = data.find(item => item.cardName === cardName)
            if (!card) {
                console.error("Ошибка! Карта не найдена в options.json!")
                return
            }
            document.querySelector(".cardName").textContent = card.cardName
            document.querySelector(".cardMoreImage").src = card.cardMoreImage
            document.querySelector(".cardMoreDecription").textContent = card.cardMoreDescription
            images = card.cardSlider
            document.querySelector(".downloadButton").dataset.url = card.downloadFile
            document.querySelector(".downloadLink").textContent = card.version
            document.querySelector(".downloadLink").href = card.downloadFile
            document.querySelector(".cardSize").textContent = card.size
            updateSlider()
        })
        .catch(error => {
            console.error("Ошибка загрузки данных!", error)
        })
})