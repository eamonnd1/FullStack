const url = new URL(location.href);
const movieId = url.searchParams.get("id");
const movieTitle = url.searchParams.get("title");

const APILINK = 'https://localhost:8000/api/v1/reviews/';

const main = document.getElementById("section");
const title = document.getElementById("title");

title.innerText = movieTitle;

returnReviews(APILINK)

function returnReviews(url){
    fetch(url + "movie/" + movieId).then(res => res.json())
    .then(function(data){
        console.log(data);
        data.forEach(element => {
            const div_card = document.createElement('div');
            div_card.setAttribute('class', 'card');
            const div_row = document.createElement('div');
            div_row.setAttribute('class', 'row');
            const div_column = document.createElement('div');
            div_column.setAttribute('class', 'column');
            const image = document.createElement('img');
            image.setAttribute('class', 'thumbnail');
            image.setAttribute('id', 'image')
            const title = document.createElement('h3');
            title.setAttribute('id', 'title');
            const centre = document.createElement('centre');

            title.innerHTML = `${element.title}`;
            image.src = IMG_PATH + element.poster_path;

            centre.appendChild(image);
            div_card.appendChild(centre);
            div_card.appendChild(title);
            div_column.appendChild(div_card);
            div_row.appendChild(div_column);
            main.appendChild(div_row);
        });
    });
}