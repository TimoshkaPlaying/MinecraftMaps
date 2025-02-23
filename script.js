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