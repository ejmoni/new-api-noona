let news = [];
let menus = document.querySelectorAll(".menus button")
menus.forEach(menu=> menu.addEventListener("click", (event)=>getNewsByTopic(event) ))

let searchButton = document.getElementById("search-button");


const getLatestNews = async()=>{
    let url =  new URL('https://api.newscatcherapi.com/v2/latest_headlines?countries=KR&topic=sport&page_size=10'
    );
    let header = new Headers({
        'x-api-key':'gKtRfPkzF2YewXzsSMa3d0Fjgs6zmkkvJAoY6pVB1m4'
    });
    let response =  await fetch(url,{headers:header});
    let data = await response.json();
    news = data.articles
    console.log(news);

   render();
};

const getNewsByTopic = async(event) =>{
    console.log("클림됨", event.target.textContent);
    let topic = event.target.textContent.toLowerCase()
    let url = new URL(`https://api.newscatcherapi.com/v2/latest_headlines?countries=KR&page_size=10&topic=${topic}`);
    
    let header = new Headers({'x-api-key':'gKtRfPkzF2YewXzsSMa3d0Fjgs6zmkkvJAoY6pVB1m4'});
    let response =  await fetch(url,{headers:header});
    let data = await response.json();
    news=data.articles
    render()
};

const getNewsByKeyword =async()=>{
    //검색키워드읽어오기
    //url에 검색키워드 부치기
    //헤더준비
    //url 부르기
    //데이터가져오기
    //데이터보여주기
    let keyword = document.getElementById("search-input").value;
    let url = new URL(
        `https://api.newscatcherapi.com/v2/search?q=${keyword}&page_size=10
        `);
    let header = new Headers({
     'x-api-key':'gKtRfPkzF2YewXzsSMa3d0Fjgs6zmkkvJAoY6pVB1m4'
    });
    let response =  await fetch(url,{headers:header});
    let data = await response.json();
    news = data.articles;
    
    render();
};



const render = () =>{
    let newsHTML = "";
    newsHTML = news.map(item=>{
        return`<div class="row news">
        <div class="col-lg-4">
            <img class = "news-img-size" 
                src="${
                    item.media || 
                    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqEWgS0uxxEYJ0PsOb2OgwyWvC0Gjp8NUdPw&usqp=CAU"
                }"/>
        </div>
        <div class="col-lg-8">
            <h2>${item.title}</h2>
            <p>${
                item.summary == null || item.summary == ""
                ?"내용없음"
                :item.summary.length >200
                ?item.summary.substring(0, 200)+"..."
                :item.summary
            }</p>
            <div>
                ${item.rights || "no source"} ${moment(
                    item.published_date
                    ).fromNow()}
            </div>
        </div>
    </div>`;
    }).join('');

    console.log(newsHTML);

    document.getElementById("news-board").innerHTML=newsHTML;
};

searchButton.addEventListener("click", getNewsByKeyword);
getLatestNews();

