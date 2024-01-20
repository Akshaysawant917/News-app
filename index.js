const apiKey = "cfc48798fd184b8dbc1932122f291cd0";
const url = "https://newsapi.org/v2/everything?q=";

window.addEventListener("load", () => fetchNews("India"));

async function fetchNews(query) {
  const res = await fetch(`${url}${query}&apiKey=${apiKey}`);
  const data =await res.json();
  console.log(data);
  bindData(data.articles);
};
function bindData(articles){
    const cardContainer=document.getElementById("main-container");
    const cardTemplete= document.getElementById("templete");

    cardContainer.innerHTML=""; 

    articles.forEach(article => {
        if(!article.urlToImage) return;
        const cardClone = cardTemplete.content.cloneNode(true);
        fillDataInCard(cardClone,article);
        cardContainer.appendChild(cardClone);
    });
function fillDataInCard(cardClone,article){
    const newsImg=cardClone.querySelector("#news-Img");
    const newsTitle=cardClone.querySelector("#news-title");
    const newsSource=cardClone.querySelector("#news-source");
    const newsDesc=cardClone.querySelector("#news-desc");

    newsImg.src=article.urlToImage;
    newsSource.innerHTML=`${article.source.name}`;
    newsTitle.innerHTML=article.title;
    newsDesc.innerHTML=article.description;
   

    cardClone.firstElementChild.addEventListener("click",()=>{
        window.open(article.url,"_blank");
    })
}

}


function handleNavClick(id){
    fetchNews(id)
};

const searchText=document.getElementById("input-text");
const searchButton=document.getElementById("button-serach");

searchButton.addEventListener("click",()=>{
    const query=searchText.value;
    if(!query) return;
    fetchNews(query);
});

const card=document.getElementById("card");

