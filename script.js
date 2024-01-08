// window.onload = function () {
const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNjVhYmQ5NzM0MTg2MGM4NGY4MWJkY2MyODc3ZWI3MCIsInN1YiI6IjY1OTZjODNjYTZjMTA0MTA3MWZhN2ZjOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.vM2Ir1-W9kQ9t3KVPZYr2n1pb8ebXrrF3HoIUucgDqs'
    }
};

fetch("https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1", options)
    .then(response => response.json())
    .then(data => {
        let movie_data = data["results"];
        // -----------------------------------------------------------------------------



        // -----------------------------------------------------------------------------
        movie_data.forEach(movie_list => {

            let movie_poster = movie_list["poster_path"];
            let movie_title = movie_list["original_title"];
            let movie_detail = movie_list["overview"];
            let movie_rating = movie_list["vote_average"];
            let movie_id = movie_list["id"];

            const newLi = document.createElement("li")

            const temp = document.querySelector(".movie_cards");
            const divBox = temp.appendChild(newLi)

            divBox.setAttribute("class", "card_id");
            divBox.setAttribute("data-Id", movie_id);

            const btn = document.querySelector("button")

            divBox.innerHTML = `
            <article>
            <img src="https://image.tmdb.org/t/p/w500/${movie_poster}" alt="">
            <div>
                <h3>${movie_title}</h3> 
                <p>${movie_detail}</p> 
                <span>평점 : ${movie_rating}</span> 
            </div>
            </article>
            `
            // let poster_card = document.querySelectorAll(".card_id")
            // poster_card.forEach((poster_card) => {
            divBox.addEventListener('click', (event) => {
                // poster_card.classList.add('active')

                alert("선택하신 영화의 ID : "+event.currentTarget.dataset.id)
                // return false;
                // throw new Error("stop loop")
            })
            // })
            btn.addEventListener('click', (e) => {
                e.preventDefault()
                let movie_search = document.getElementById("#search").value;
                alert(movie_search)
            })

    
        })
        //  .catch(err => console.error(err));


    })
// }