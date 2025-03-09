// // Здесь будет вся логика проекта

// let link = document.querySelector(".toMapLink")
// let cardName = document.querySelector(".cardName")
// let cardMore = document.querySelector(".cardMore")

// console.log(link)

// link.addEventListener("click", function(){
//     fetch("options.json").then(response=>{
//         if (!response.ok) {
//             throw new Error('Ответ не ок!!')
//         }
//         return response.json()
//     })
//     .then(data=>{
//         cardName.innerHTML = ''
//         data.forEach(element => {
//             let div = document.createElement('div')
//             div.classList.add("cardName")
//             div.innerHTML = `<h3>${element.cardName}<\h3>`
//             cardMore.appendChild(div)
//         })
//     })
//     .catch(error=>{
//         console.log('Error', error)
//     })
// })

let cardName = document.querySelector(".cardName")
let cardImage = document.querySelector(".cardImage")
let cardDescription = document.querySelector(".cardDescription")
let cards = document.querySelector(".cards")

fetch("options.json")
        .then(response => response.json())
        .then(data => {
            data = data.reverse()
            let params = new URLSearchParams(window.location.search)
            let cardVersion = params.get("version")
            let editor = params.get("editor")
            if (!cardVersion) {
                console.error("Ошибка! Версия не найдена!")
                // return
            }
            for (let i=0; i<data.length; i+=1) {
                if (data[i]["version"] == cardVersion || !cardVersion) {
                    if (data[i]["editor"] == editor || !editor) {
                        // Создаём div с классом card
                    let div_card = document.createElement("div")
                    div_card.classList.add("card")
                    cards.appendChild(div_card)
                    // Саздём ссылку с классом toMapLink
                    let a_toMapLink = document.createElement("a")
                    a_toMapLink.classList.add("toMapLink")
                    a_toMapLink.href = data[i]["cardHref"]
                    div_card.appendChild(a_toMapLink)
                    // Создём h2 с классом cardName
                    let h2_cardName = document.createElement("h2")
                    h2_cardName.classList.add("cardName")
                    h2_cardName.textContent = data[i]["cardName"]
                    a_toMapLink.appendChild(h2_cardName)
                    // Создаём img с классом cardImage
                    let img_cardImage = document.createElement("img")
                    img_cardImage.classList.add("cardImage")
                    img_cardImage.draggable = "false"
                    img_cardImage.src = data[i]["cardImage"]
                    a_toMapLink.appendChild(img_cardImage)
                    // Создаём p с классом cardDescription
                    p_cardDecription = document.createElement("p")
                    p_cardDecription.classList.add("cardDescription")
                    p_cardDecription.textContent = data[i]["cardDescription"]
                    a_toMapLink.appendChild(p_cardDecription)
                    }
                }
            }
        })
        .catch(error => {
            console.error("Ошибка загрузки данных!", error)
        })