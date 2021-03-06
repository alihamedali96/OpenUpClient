const mainContainer = document.querySelector('.flex-container')

function createSection(data){
    
    const cardBody = document.createElement('div')
    cardBody.className = 'cardBody'
    
    const cardTitle = document.createElement('h5')
    cardTitle.className = 'cardTitle'
    cardTitle.textContent = data.title
    
    const cardText = document.createElement('p')
    cardText.className = 'cardText'
    cardText.textContent = data.text
    
    const cardImg = document.createElement('img')
    cardImg.className = 'gifIMG'
    const linkToImage = data.image_url
    console.log(data.image_url)
    cardImg.setAttribute('src', linkToImage)
    
    if(!data.image_url){
        cardImg.style.display = 'none'
    } 

    const commentsArea = document.createElement('p')
    commentsArea.className = 'comments'
    for(let i = 0; i < data.comments.length; i++){
        const comment = document.createElement('p')
        comment.textContent = data.comments[i]
        commentsArea.appendChild(comment)
    }

    const form = document.createElement('form')
    form.className = 'commentForm'
    form.id = data.id

    const formLabel = document.createElement('label')
    formLabel.setAttribute('for', 'commentsSection')
    form.addEventListener('submit', postComment)

    const textArea = document.createElement('textarea')
    textArea.className = 'commentInput'
    textArea.setAttribute('name', 'commentsSection')
    textArea.id = `CommentText${data.id}`

    const submit = document.createElement('input')
    submit.className = 'commentInput'
    submit.setAttribute('type', 'submit')
    submit.setAttribute('value', 'Post comment')
    submit.className = 'commentBtn'

      
    
    const btnGroup = document.createElement('div')
    btnGroup.className = 'btn-group'
    btnGroup.id = data.id
    
    const button1 = document.createElement('button')
    button1.className = 'likes button button1 clickme'
    button1.innerHTML = '&#128293;'
    button1.addEventListener('click', addInteraction)
    const button2 = document.createElement('button')
    button2.className = 'likes button button2 clickme'
    button2.innerHTML = '&#128151;'
    button2.addEventListener('click', addInteraction)
    const button3 = document.createElement('button')
    button3.className = 'likes button button3 clickme'
    button3.innerHTML = '&#11088;'
    button3.addEventListener('click', addInteraction)
    const button4 = document.createElement('div')
    button4.className = 'likes button button4'
    button4.textContent = 'Clicks'
    const counter = document.createElement('span')
    counter.id = 'counter'
    counter.textContent = data.interactions
    const lineBreak = document.createElement('BR')

    button4.appendChild(lineBreak)
    button4.appendChild(counter)

    btnGroup.appendChild(button4)
    btnGroup.appendChild(button1)
    btnGroup.appendChild(button2)
    btnGroup.appendChild(button3)

    form.appendChild(formLabel)
    form.appendChild(textArea)
    form.appendChild(submit)

    cardBody.appendChild(cardTitle)
    cardBody.appendChild(cardText)
    cardBody.appendChild(cardImg)
    cardBody.appendChild(btnGroup)
    cardBody.appendChild(commentsArea)
    cardBody.appendChild(form)

    mainContainer.appendChild(cardBody)
}

async function getMyPosts(){
  try{
      const response = await fetch('https://shrouded-dawn-75453.herokuapp.com/mypage')
      const data = await response.json()
      data.forEach(e => createSection(e))
      
  }catch(err){
      console.log('Something went wrong '+ err.message)
  }
}

getMyPosts()

    const postCommentForm = document.querySelectorAll('.commentForm')
    async function postComment(e) {
        e.preventDefault();
        const commentIdString = e.target.id
        const commentId = parseInt(commentIdString)
        const commentText = e.target.commentsSection
        console.log(commentId)    
        console.log(commentText.value)
        try {
          const newCommentData = {
            id: commentId,
            comments: commentText.value,
          };
          console.log(newCommentData)
          const options = {
            method: "PATCH",
            body: JSON.stringify(newCommentData),
            headers: {
              "Content-Type": "application/json; charset=UTF-8",
            },
          };
          const response = await fetch("https://shrouded-dawn-75453.herokuapp.com/homepage/", options);
          const data = await response.json();
          e.target.commentsSection = ''
          alert('Your comment has been posted!')
          console.log(data)
          } catch (err) {
            console.warn(err);
          }
      }
    

    const btn = document.querySelectorAll('.clickme')
    async function addInteraction(e) {
        e.preventDefault();
        const buttonIdString = e.target.parentElement.id
        const buttonId = parseInt(buttonIdString)
        console.log(buttonId)
        e.currentTarget.disabled = true
        try {
            const newInteractionData = {
                        id: buttonId,
                      }
            console.log(newInteractionData)
          const options = {
            method: "PATCH",
            body: JSON.stringify(newInteractionData),
            headers: {
              "Content-Type": "application/json; charset=UTF-8",
            },          
        }
          const response = await fetch(`https://shrouded-dawn-75453.herokuapp.com/posts/${buttonId}/`, options);
          const data = await response.json();
          console.log(data)
          } catch (err) {
            console.warn(err);
          }
      }
      


let APIKEY = "VojEBdIRm1Nxx5fsMRNKtSchRO73Qv3q";

document.addEventListener("DOMContentLoaded", init);
function init() {
  document.getElementById("btnSearch").addEventListener("click", ev => {
    ev.preventDefault(); 
    let url = `https://api.giphy.com/v1/gifs/search?api_key=${APIKEY}&limit=1&q=`;
    let str = document.getElementById("search").value.trim();
    url = url.concat(str);
    // console.log(url);
    fetch(url)
      .then(response => response.json())
      .then(content => {
        // console.log(content.data);
        // console.log("META", content.meta);
        const img = document.createElement("img");
        img.src = content.data[0].images.downsized.url;
        console.log(content.data[0].id)
        img.alt = content.data[0].title;
        img.id = "gifSearchImage"
        const gifSource = 'https://i.giphy.com/media/' + content.data[0].id + '/giphy.webp'
        console.log(gifSource)
        img.className = gifSource
        const gifArea = document.getElementById('gif')
        gifArea.appendChild(img)
        document.querySelector("#search").value = "";
      })
      .catch(err => {
        console.error(err);
      });
  });
}

// function to post a new blog
async function postBlog(e) {
  e.preventDefault();
  const gifSearchImage = document.getElementById('gifSearchImage')
  console.log(gifSearchImage.className)
  try {
    const newBlogData = {
      id: "",
      title: document.getElementById("title").value,
      text: document.getElementById("textArea").value,
      image_url: gifSearchImage.className,
      isPublic: document.querySelector('input[name="isPublic"]:checked').value,
      interactions: 0, 
      comments: ""
    };
    const options = {
      method: "POST",
      body: JSON.stringify(newBlogData),
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
    };
    const response = await fetch("https://shrouded-dawn-75453.herokuapp.com/mypage/", options);
    const data = await response.json();
    console.log(data)
    document.getElementById("title").value = ''
    document.getElementById("textArea").value = ''
    alert("Your blog has been posted!")
    } catch (err) {
      console.warn(err);
    }
}
const submit = document.getElementById('submit')

submit.addEventListener("click", postBlog)

///////DARK MODE/////////

let icon = document.getElementById("icon");

document.getElementById("icon").onclick = function (){
  document.body.classList.toggle("dark-theme");
  if (document.body.classList.contains("dark-theme")){
    icon.src = "images/sun.png"
  } else {
    icon.src = "images/moon.png"
  }
} 
