const handleCategory =async () =>{
    const res = await  fetch('https://openapi.programming-hero.com/api/news/categories');
    const data = await res.json();
    // console.log(data.data.news_category)

    const tabContainer = document.getElementById('tab_container');

    const trimData = data.data.news_category.slice(0, 3);
    trimData.forEach((category) => {
        const div =document.createElement('div')
        div.innerHTML = `
        <a onclick="handleLoadNews('${category.category_id}')" class="tab">
        ${category.category_name}
        </a> 
        `;
        tabContainer.appendChild(div)

        
    });

    
}


const handleLoadNews = async (categoryId) =>{
    console.log(categoryId);

    const res = await fetch(`https://openapi.programming-hero.com/api/news/category/${categoryId}`);
    const data = await res.json();

    const cardContainer = document.getElementById('card_container');
    cardContainer.innerHTML = '';

    data.data?.forEach((news)=>{
        console.log(news)
        const div = document.createElement('div');
        div.innerHTML= `
        <div class="card w-96 bg-base-100 shadow-xl">
        <figure><img src=${news?.image_url} alt="Shoes" /></figure>
        <div class="card-body">
          <h2 class="card-title">
          ${news?.title.slice(0, 20)}
            <div class="badge badge-secondary p-5">${news?.rating?.badge}</div>
          </h2>

          <p>${news?.details.slice(0,50)}</p>
          <h3>Total view: ${news.total_view? news.total_view: "No view"} </h3>

          <div class="card-footer flex justify-between mt-8">
            <div class="flex">
              <div>
                <div class="avatar online">
                  <div class="w-14 rounded-full">
                    <img src=${news?.thumbnail_url} alt="No images">

                  </div>

                </div>
              </div>
              
              <div>
                <h6>${news?.author?.name}</h6>
                <small>${news?.author?.published_date}</small>
              </div>
            </div> 


            <div class="card-detaild-btn">
              <button 
    class="inline-block cursor-pointer rounded-md bg-gray-800 px-4 py-3 
    text-center text-sm font-semibold uppercase text-white 
    transition duration-200 ease-in-out hover:bg-gray-900">

              Details
              </button>
              
              </div>
          </div>


        </div>
      </div>
        `;
        cardContainer.appendChild(div);
    });
    
};

 handleCategory()
 handleLoadNews("01")


