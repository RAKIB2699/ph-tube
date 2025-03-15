function removeActiveClass() {
   const activebtn = document.getElementsByClassName("active");

   for (let btn of activebtn) {
      btn.classList.remove("active");
   }
}
function loadCategories() {
   fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
      .then(res => res.json())
      .then(data => display(data.categories))
}
function loadVideo() {
   fetch('https://openapi.programming-hero.com/api/phero-tube/videos')
      .then(res => res.json())
      .then(data => {
         removeActiveClass();
         document.getElementById("btnAll").classList.add("active");
         displayVideo(data.videos)
      })
}
const loadvideodetails = (videoId) => {
   const url = 'https://openapi.programming-hero.com/api/phero-tube/video/${videoId}'
   fetch(url)
      .then(res => res.json())
      .then(data => display_loadvideodetails(data.video))

}
const display_loadvideodetails = (video) => {
   console.log(video);
   document.getElementById("show_details").showModal();
   const container = document.getElementById("container");
   container.innerHTML=`
    <h2>hello</h2>
   `
}

const loadCategoriesVideo = (id) => {
   const url = `
  https://openapi.programming-hero.com/api/phero-tube/category/${id}`
   fetch(url)
      .then(res => res.json())
      .then(data => {

         const clickbtn = document.getElementById(`btn-${id}`)
         // console.log(clickbtn)
         clickbtn.classList.add("active");

         displayVideo(data.category);

      });
};


loadCategories();



function display(categories) {
   const categoryContainer = document.getElementById('categoryContainer');
   for (let cat of categories) {
      // console.log(cat)
      const divCategory = document.createElement("div")
      divCategory.innerHTML = `
         <button id="btn-${cat.category_id}" onclick="loadCategoriesVideo(${cat.category_id})" class="btn btn-sm hover:bg-red-400 hover:text-white">${cat.category}</button>
        `;
      categoryContainer.append(divCategory);
   }
}

function displayVideo(videos) {
   const videoContainer = document.getElementById('videoContainer');
   videoContainer.innerHTML = "";
   if (videos.length == 0) {
      videoContainer.innerHTML = `
        <div class="py-20 col-span-full flex flex-col justify-center items-center">
            <img src="./assest/Icon.png" alt="">
            <h1 class="text-2xl font-bold">Oops!! Sorry, There is no content here</h1>
         </div>
      `
      return;
   }
   videos.forEach(video => {
      const videoCard = document.createElement("div")
      videoCard.innerHTML = `
       <div class="card bg-base-100">
            <figure class="relative">
               <img class="w-full h-[300px] object-cover" src="${video.thumbnail}" alt="Shoes" />
               <span class="absolute bottom-2 right-2 text-sm text-white bg-black rounded px-1 py-1">3hrs 56 min ago</span>
            </figure>
            <div class="flex gap-3 px-0 mt-4">
               <div>
                  <div class="avatar">
                     <div class="ring-primary ring-offset-base-100 w-7 rounded-full ring ring-offset-2">
                        <img src="${video.authors[0].profile_picture}" />
                     </div>
                  </div>
               </div>
               <div>
                  <h2 class="card-title text-xl font-bold">${video.title}</h2>
                 <p class="flex gap-1">${video.authors[0].profile_name}<span>
                  <img class="w-5 h-5" src="./assest/icons8-verified-badge-48.png" alt="">
                 </span></p>
                 <p>${video.others.views}</p>
               </div>

            </div>
            <button onclick="loadvideodetails('${video.video_id}')"; class="btn btn-block">show details</button>
         </div>
      `
      videoContainer.append(videoCard);
   });
}