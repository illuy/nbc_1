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

            // api 받은값 활용하기
            let movie_poster = movie_list["poster_path"];
            let movie_title = movie_list["original_title"];
            let movie_detail = movie_list["overview"];
            let movie_rating = movie_list["vote_average"];
            let movie_id = movie_list["id"];

            // ul 안에 li 만들어서 id값 alert에 띄우기위해 data-id 추가하기
            const newLi = document.createElement("li")

            const temp = document.querySelector(".movie_cards");
            const divBox = temp.appendChild(newLi)

            divBox.setAttribute("class", "card_id");
            divBox.setAttribute("data-Id", movie_id);

            // input 보기요소 목록만들기
            const datalist = document.getElementById("movie")
            const sel = document.createElement("option")
            const sel_op = datalist.appendChild(sel)

            sel_op.setAttribute("value", movie_title)
            // -----------------------------------------------

            divBox.innerHTML = `
            <article data-id="${movie_id}">
            <img src="https://image.tmdb.org/t/p/w500/${movie_poster}" alt="">
            <div>
                <h3>${movie_title}</h3> 
                <p>${movie_detail}</p> 
                <span>평점 : ${movie_rating}</span> 
            </div>
            </article>
            `
            
            // alert 띄우기 
            // let poster_card = document.querySelectorAll(".card_id")
            // .card_id 계속 찾을수 없다고 나옴.... 
            // console.log(poster_card)
            // 알고보니 배열로 나온다... 그래서 addEventListener 안됨;;; 
            divBox.addEventListener('click', (event) => {
                // poster_card.classList.add('active')
                alert("선택하신 영화의 ID : " + event.currentTarget.dataset.id)
            })

            // 검색기능 만들기 
            //enter
            let input_text = document.getElementById("search");
            input_text.addEventListener("keydown", function (e) {
                if (e.key === "Enter") {
                    e.preventDefault();
                    search_results();
                }
            });

            //button으로 검색
            const search_btn = document.getElementById("btn");
            search_btn.addEventListener("click", function (e) {
                e.preventDefault();
                search_results()
            });

            // enter or btn 눌렀을때 결과값 가져오기
            //잘안됨... 망했다.
            //내멋대로 만들어보는중 - - - - - 
            let search_results = function () {
                let sel2 = input_text.value.toLowerCase()
                let results_title = movie_title.toLowerCase()   

                if (results_title.includes(sel2)) {
                    console.log("ok")
                    divBox.style.display = "block";
                } else {
                    console.log("no")
                    divBox.style.display = "none";
                }
            }

        })
        //  .catch(err => console.error(err));
    })
// }

