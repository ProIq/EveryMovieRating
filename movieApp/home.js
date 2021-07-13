const API_KEY="api_key=28b6df43287db53bdea676b6fd6f8706";
const BASE_URL="https://api.themoviedb.org/3";
const pop=BASE_URL+"/discover/movie?sort_by=popularity.desc&"+API_KEY;
const IMG="https://image.tmdb.org/t/p/w500/";
function getMovies(url){
    fetch(url).then(res=>res.json()).then(data=>{
        showMovies(data.results);
    })
}
getMovies(pop);
function showMovies(res){
    document.querySelector("#main").innerHTML="";    
    res.forEach(element => {
        let x;
        const {poster_path,title,overview,vote_average}=element;
        if(vote_average>=8){
            x="green";
        } 
        else if(vote_average>=5&&vote_average<=8){
            x="orange";
        }
        else {
            x="red";
        }   
        const div=document.createElement("div");
          div.setAttribute("class","movie");
         div.innerHTML=`<img src="${IMG+poster_path}">
         <div class="movie-info">
             <h3>${title}</h3>
             <span class="${x}">${vote_average}</span>
         </div>
         <div class="overview">
             <h3>Overview</h3>
             ${overview}
         </div>`
         document.querySelector("#main").appendChild(div);   
    });
}
document.querySelector("#form").addEventListener("submit",(e)=>{
    e.preventDefault();
    const search=document.querySelector("#search").value;
    if(search){
        getMovies(BASE_URL+"/search/movie?"+API_KEY+"&query="+search);
    }
})