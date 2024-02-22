const parentElement = document.querySelector(".main");
const searchInput = document.querySelector(".form");
const inputFeild = document.querySelector(".input");

const createElement = (element) => document.createElement(element);

function showMovieData(data) {
  parentElement.innerHTML = "";
  parentElement.classList.remove("none");

  const { Title, imdbRating, Genre, Released, Runtime, Actors, Plot, Poster } =
    data;

  // image container

  const imageContainer = createElement("div");
  imageContainer.classList.add("image-container");

  const image = createElement("img");
  image.classList.add("movie-image");
  image.setAttribute("src", Poster);
  imageContainer.setAttribute("alt", Title);
  imageContainer.appendChild(image);

  // card details container

  const detailsContainer = createElement("div");
  detailsContainer.classList.add("movie-details");

  // card title

  const titleEle = createElement("h2");
  titleEle.classList.add("title");
  titleEle.innerText = Title;

  detailsContainer.appendChild(titleEle);

  // ratings
  const ratings = createElement("div");
  ratings.classList.add("star-rating");
  const starIcon = createElement("span");
  starIcon.classList.add("material-icons-outlined");
  starIcon.innerHTML = "star";
  ratings.appendChild(starIcon);

  // ratings value
  const ratingValue = createElement("span");
  ratingValue.innerHTML = `<strong>Rating: </strong> ${imdbRating}`;
  ratings.appendChild(ratingValue);

  detailsContainer.appendChild(ratings);

  // Genre

  const genre = createElement("div");
  genre.classList.add("genre");
  Genre.split(",").forEach((element) => {
    const p = createElement("p");
    p.innerText = element;
    genre.appendChild(p);
  });

  detailsContainer.appendChild(genre);

  // realeased date
  const relesedDate = createElement("p");
  relesedDate.innerHTML = `<strong>Relesed Date: </strong>${Released}`;
  detailsContainer.appendChild(relesedDate);

  const runtime = createElement("p");
  runtime.innerHTML = `<strong>Duration: </strong> ${Runtime}`;

  detailsContainer.appendChild(runtime);

  // actors
  const actors = createElement("span");
  actors.innerHTML = `<strong>Cast: </strong> ${Actors}`;
  detailsContainer.appendChild(actors);

  // plot
  const plot = createElement("p");
  plot.innerHTML = `<strong>Plot: </strong> ${Plot}`;
  detailsContainer.appendChild(plot);

  parentElement.appendChild(imageContainer);
  parentElement.appendChild(detailsContainer);
}

async function getMovieData(movie) {
  const myAPIkey = "613d1ada";
  const URL = `http://www.omdbapi.com/?apikey=${myAPIkey}&t=${movie}`;

  try {
    const response = await fetch(URL);
    const data = await response.json();
    showMovieData(data);
  } catch (error) {
    parentElement.classList.add("none");
    showError("No movie found !!");
  }
}

function showError(message) {
  parentElement.innerHTML = `<h2>${message}</h2>`;
}

function handleSearch(event) {
  event.preventDefault();
  const movieName = inputFeild.value.trim();
  if (movieName !== "") {
    showError("Fetching movie details!");
    getMovieData(movieName);
  } else showError("Enter a movie name to get movie information");
}

searchInput.addEventListener("submit", handleSearch);
