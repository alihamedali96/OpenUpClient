let APIKEY = "VojEBdIRm1Nxx5fsMRNKtSchRO73Qv3q";


document.addEventListener("DOMContentLoaded", init);
function init() {
  document.getElementById("btnSearch").addEventListener("click", ev => {
    ev.preventDefault(); 
    let url = `https://api.giphy.com/v1/gifs/search?api_key=${APIKEY}&limit=1&q=`;
    let str = document.getElementById("search").value.trim();
    url = url.concat(str);
    console.log(url);
    fetch(url)
      .then(response => response.json())
      .then(content => {
        //  data, pagination, meta
        console.log(content.data);
        console.log("META", content.meta);
        let fig = document.createElement("figure");
        let img = document.createElement("img");
        img.src = content.data[0].images.downsized.url;
        img.alt = content.data[0].title;
        fig.appendChild(img);
       
        let gif = document.querySelector(".gif");
        gif.insertAdjacentElement("afterbegin", fig);
        document.querySelector("#search").value = "";
      })
      .catch(err => {
        console.error(err);
      });
  });
}





// post request of form data to /mypage 


// const onclick = (e) => {
//   const data = {
//     data: document.querySelector('input').value
//   }


//   e.preventDefault();

//   fetch("/mypage", {
//     method: 'POST',
//     mode: 'no-cors',
//     cache: 'no-cache',
//     credentials: 'same-origin',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify(data) // body data type must match "Content-Type" header
//   });
// }

// const button = document.querySelector('#submit');

// button.onclick = onclick;






// function to post a new blog

async function postBlog(e) {
  e.preventDefault();
  try {
    const newBlogData = {
      id: "",
      title: document.getElementById("title").value,
      text: document.getElementById("text").value,
      image_url: document.getElementById("gif").value,
    };
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newBlogData),
    };
    const response = await fetch("http://localhost:3000/mypage", options);
    const data = await response.json();
    return data;
  } catch (err) {
    console.warn(err);
  }
}


const submit = document.getElementById("submit");
// const submitprivate = document.getElementById("submitprivate");

submit.addEventListener("click", postBlog)
// submitprivate.addEventListener("click", postBlog);



