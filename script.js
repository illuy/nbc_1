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
        movie_data.forEach(movie_list => {

            let movie_poster = movie_list["poster_path"];
            let movie_title = movie_list["original_title"];
            let movie_detail = movie_list["overview"];
            let movie_rating = movie_list["vote_average"];
            let movie_id = movie_list["id"];

            const newLi = document.createElement("li")

            const temp = document.querySelector(".movie_cards");
            const divBox = temp.appendChild(newLi)

            // input 보기요소 목록만들기
            // const in_option = document.createElement("datalist")
            const datalist = document.getElementById("movie")
            const sel = document.createElement("option")
            const sel_op = datalist.appendChild(sel)

            sel_op.setAttribute("value", movie_title)


            // 

            divBox.setAttribute("class", "card_id");
            divBox.setAttribute("data-Id", movie_id);



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

                alert("선택하신 영화의 ID : " + event.currentTarget.dataset.id)
                // return false;
                // throw new Error("stop loop")
            })
            // })

            let input_text = document.getElementById("search");
            input_text.addEventListener("keydown", function (e) {
                if (e.key === "Enter") {
                    e.preventDefault();
                    search_results();
                }
            });

            const search_btn = document.getElementById("btn");
            search_btn.addEventListener("click",function(e){
                e.preventDefault();
                search_results()
            });

            let search_results = function () {
                let sel = input_text.value;
                console.log(sel)
                // let title_search = movie_title.find()
                if (sel === movie_title) {
                    console.log("ok")
                    
                } else {
                    console.log("no")

                    divBox.innerHTML = `
                    <article style="display:none">
                    <div>
                        찾을수 없습니다.
                    </div>
                    </article>
                    `
                }

            }

        })
        //  .catch(err => console.error(err));


    })
// }

