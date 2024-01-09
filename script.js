let switchBtn = document.getElementById('switch')
switchBtn.addEventListener('click', (e) => {
    if (e.target.checked) {
        document.body.style.backgroundColor = "#e0e0e0"
    } else {
        document.body.style.backgroundColor = '#212121'
    }
})

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
        let movieData = data["results"];
        movieData.forEach(movieList => {

            // api 받은값 활용하기
            let moviePoster = movieList["poster_path"];
            let movieTitle = movieList["original_title"];
            let movieDetail = movieList["overview"];
            let movieRating = movieList["vote_average"];
            let movieId = movieList["id"];

            // ul 안에 li 만들어서 id값 alert에 띄우기위해 data-id 추가하기
            const newLi = document.createElement("li")

            const temp = document.querySelector(".movie_cards");
            const divBox = temp.appendChild(newLi)

            divBox.setAttribute("class", "card_id");
            divBox.setAttribute("data-Id", movieId);

            // input 보기요소 목록만들기
            const datalist = document.getElementById("movie")
            const sel = document.createElement("option")
            const sel_op = datalist.appendChild(sel)

            sel_op.setAttribute("value", movieTitle)
            // -----------------------------------------------

            divBox.innerHTML = `
            <article>
            <img src="https://image.tmdb.org/t/p/w500/${moviePoster}" alt="">
            <div>
                <h3>${movieTitle}</h3> 
                <p>${movieDetail}</p> 
                <span>Rating : ${movieRating}</span> 
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
            let inputText = document.getElementById("search");
            inputText.addEventListener("keydown", function (e) {
                if (e.key === "Enter") {
                    e.preventDefault();
                    searchResults();
                }
            });

            //button으로 검색
            const search_btn = document.getElementById("btn");
            search_btn.addEventListener("click", function (e) {
                e.preventDefault();
                searchResults()
            });

            // enter or btn 눌렀을때 결과값 가져오기
            //잘안됨... 망했다.
            //내멋대로 만들어보는중 - - - - - 
            let searchResults = function () {
                let inputResults = inputText.value.toLowerCase()
                let resultsTitle = movieTitle.toLowerCase()

                if (resultsTitle.includes(inputResults)) {
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


