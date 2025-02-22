let downloadButton = document.querySelector('.downloadButton')
let downloadLink = document.querySelector('.downloadLink')
let body = document.querySelector('body')

right_arrow = document.querySelector(".right")
left_arrow = document.querySelector(".left")
img = document.querySelector(".active")
images = ["src/slider1.png", "src/slider2.png", "src/slider3.png"]
img_now = 0
button = document.querySelector('button')

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



right_arrow.addEventListener("click", function(){
    img_now += 1
    if (img_now > (images.length - 1)) {
        img_now = 0
    }
    img.src = images[img_now]
})

left_arrow.addEventListener("click", function(){
    img_now -= 1
    if (img_now == -1) {
        img_now = images.length - 1
    }
    img.src = images[img_now]
})

