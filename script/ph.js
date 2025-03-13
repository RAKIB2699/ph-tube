
function loadCategories(){
    fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
    .then(res =>res.json())
    .then(data =>display(data.categories))
}
function loadVideo(){
    fetch('https://openapi.programming-hero.com/api/phero-tube/videos')
    .then(res =>res.json())
    .then(data =>displayVideo(data.videos))
}


loadCategories();
loadVideo();


function display(categories){
     const categoryContainer = document.getElementById('categoryContainer');
     for(let cat of categories){
        // console.log(cat)
        const divCategory = document.createElement("div")
        divCategory.innerHTML = `
         <button class="btn btn-sm hover:bg-red-400 hover:text-white">${cat.category}</button>
        `;
        categoryContainer.append(divCategory);
     }
}
 
function displayVideo(videos){
   const videoContainer = document.getElementById('videoContainer');
   videos.forEach(video => {
      const videoCard = document.createElement("div")
      videoCard.innerHTML = `
       <div class="card bg-base-100 shadow-sm">
  <figure>
    <img
      src="${video.thumbnail}"
      alt="Shoes" />
  </figure>
  <div class="card-body">
    <h2 class="card-title">${video.title}</h2>
    <p>A card component has a figure, a body part, and inside body there are title and actions parts</p>
    <div class="card-actions justify-end">
      <button class="btn btn-primary">Buy Now</button>
    </div>
  </div>
</div>
      `
      videoContainer.append(videoCard);
   });
}