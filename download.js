document.getElementById("uploadForm").addEventListener("submit", function(event) {
    event.preventDefault()
    const cardName = document.querySelector(".cardName").value.trim()
    const cardDescription = document.querySelector(".cardDescription").value.trim()
    const mainImage = ''
    const images = ''
    const map = ''

    if (!mainImage || !images || !map) {
        alert("Заполните все поля")
        return
    }

    const formData = new FormData()
    formData.append("cardName", cardName)
    formData.append("cardDescription", cardDescription)

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