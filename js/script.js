// 다크 모드 토글
let switchBtn = document.getElementById('switch');
switchBtn.addEventListener('click', (e) => {
    document.body.style.backgroundColor = e.target.checked ? "#e0e0e0" : '#212121';
});

// TMDB API 호출 및 영화 정보 표시
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
            displayMovieInfo(movieList);
        });
    });

// 영화 정보 표시 함수
function displayMovieInfo(movieList) {
    // api 받은 값 활용하기
    let moviePoster = movieList["poster_path"];
    let movieTitle = movieList["original_title"];
    let movieDetail = movieList["overview"];
    let movieRating = movieList["vote_average"];
    let movieId = movieList["id"];

    // ul 안에 li 만들어서 id값 alert에 띄우기위해 data-id 추가하기
    const newLi = document.createElement("li");
    const temp = document.querySelector(".movie_cards");
    const divBox = temp.appendChild(newLi);

    divBox.setAttribute("class", "card_id");
    divBox.setAttribute("data-Id", movieId);

    // input 보기요소 목록 만들기
    const datalist = document.getElementById("movie");
    const sel = document.createElement("option");
    const sel_op = datalist.appendChild(sel);

    sel_op.setAttribute("value", movieTitle);

    divBox.innerHTML = `
        <article>
                <img src="https://image.tmdb.org/t/p/w500/${moviePoster}" alt="">
                <div>
                    <h3>${movieTitle}</h3> 
                    <p>${movieDetail}</p> 
                    <span>Rating : ${movieRating}</span> 
                </div>
        </article>
    `;

    // 영화 카드 클릭 시 알림 띄우기
    // divBox.addEventListener('click', (event) => {
    //     // alert("선택하신 영화의 ID : " + event.currentTarget.dataset.id)
    // });

    divBox.addEventListener('click', (event) => {
        const clickedId = event.currentTarget.dataset.id;
        // detailPage.html로 이동하면서 클릭한 divBox의 id값을 URL에 추가
        window.location.href = `./detailPage.html?id=${clickedId}`;
    });
}

// 검색 기능 함수
function searchResults() {
    let inputText = document.getElementById("search");
    let movieCards = document.querySelectorAll(".card_id");

    movieCards.forEach(divBox => {
        let movieTitle = divBox.querySelector("h3").textContent.toLowerCase();
        let inputResults = inputText.value.toLowerCase();

        if (movieTitle.includes(inputResults)) {
            divBox.style.display = "block";
        } else {
            divBox.style.display = "none";
        }
    });
}

// 검색 기능 이벤트 등록
let inputText = document.getElementById("search");
inputText.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
        e.preventDefault();
        searchResults();
    }
});

let searchBtn = document.getElementById("btn");
searchBtn.addEventListener("click", function (e) {
    e.preventDefault();
    searchResults();
});
