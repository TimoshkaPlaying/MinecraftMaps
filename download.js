document.getElementById("uploadForm").addEventListener("submit", function(event) {
    event.preventDefault()
    const cardVersion = document.querySelector(".cardVersion").value
    const cardName = document.querySelector(".cardName").value.trim() + " " + `(${cardVersion})`
    const cardDescription = document.querySelector(".cardDescription").value.trim()
    const cardMoreDescription = document.querySelector(".cardMoreDescription").value.trim()
    const cardImage = document.querySelector(".cardMainImage").files[0]
    const cardSlider = document.querySelector(".cardImages").files
    const map = document.querySelector(".cardFile").files[0]
    let name = cardName.replace(" ", "+")
    name = name.replace("(", "%28")
    name = name.replace(")", "%29")
    const cardHref = `map.html?card=${name}`
    const cardSize = (map["size"]/1048576).toFixed(1)

    // if (!cardName || !cardDescription || !cardMoreDescription  || !cardImage || !cardSlider || !map || !cardVersion) {
    //     alert("Заполните все поля")
    //     return
    // }

    const formData = new FormData()
    formData.append("cardName", cardName)
    formData.append("cardHref",  cardHref)
    formData.append("cardImage", cardImage)
    formData.append("cardDescription", cardDescription)
    formData.append("cardMoreDescriprion", cardMoreDescription)
    // formData.append("cardSlider", cardSlider)
    for (let i=0; i<cardSlider.length; i++) {
        formData.append("cardSlider", cardSlider[i])
    }
    formData.append("version", cardVersion)
    formData.append("size", cardSize)
    formData.append("downloadFile", map)
    formData.append("editor", "false")



    fetch("http://localhost:2550/download", {
        method: "POST",
        body: formData,
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message)
        window.location.href = "index.html"
    })
    .catch(error => console.error("Ошибка отправки формы!", error))
})