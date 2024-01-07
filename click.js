
// let poster_card = document.querySelectorAll("li")
// poster_card.forEach((poster_card) => {
//     poster_card.addEventListener('click', (e) => {
//         // poster_card.classList.add('active')
//         console.log("0")

//         alert(e.target.dataset.id)
//     })
// })
function printName()  {
    event.preventDefault;
    const name = document.getElementById('name').value;
    document.getElementById("result").innerText = name;

  }