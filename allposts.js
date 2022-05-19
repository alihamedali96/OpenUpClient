//   const url = "http://localhost:3000/homepage"
// const options = {
//   method: 'PATCH',
//   body: JSON.stringify({id: 1, comments: "What a great day this was to make a new post"})
// }
// fetch(url, options)
//   .then(console.log("Patched post"))
//   .catch(err => console.warn('Opa, something went wrong!', err)) 

const mainContainer = document.querySelector('.flex-container')

function createSection(data){
    //make div, ul and img
    const cardBody = document.createElement('div')
    cardBody.className = 'cardBody'
    
    const cardTitle = document.createElement('h5')
    cardTitle.className = 'cardTitle'
    cardTitle.textContent = data.title

    const cardText = document.createElement('p')
    cardText.className = 'cardText'
    cardText.textContent = data.text

    const cardImg = document.createElement('img')
    const linkToImage = data.img_url
    cardImg.setAttribute('src', linkToImage)

    const comments = document.createElement('p')
    comments.className = 'comments'
    comments.textContent = data.comments

    const form = document.createElement('form')
    form.action = 'PATCH'

    const formLabel = document.createElement('label')
    formLabel.setAttribute('for', 'commentsSection')

    const textArea = document.createElement('textarea')
    textArea.setAttribute('name', 'commentsSection')

    const submit = document.createElement('input')
    submit.setAttribute('type', 'submit')
    submit.setAttribute('value', 'Post comment')
    
    const btnGroup = document.createElement('div')
    btnGroup.className = 'btn-group'
    const counter = document.createElement('div')
    counter.className = 'counter'
    counter.textContent = data.interactions
    const button1 = document.createElement('button')
    button1.className = 'likes button button1'
    button1.innerHTML = '&#128293;'
    const button2 = document.createElement('button')
    button2.className = 'likes button button2'
    button2.innerHTML = '&#128151;'
    const button3 = document.createElement('button')
    button3.className = 'likes button button3'
    button3.innerHTML = '&#128078;'

    btnGroup.appendChild(counter)
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
    cardBody.appendChild(comments)
    cardBody.appendChild(form)



    mainContainer.appendChild(cardBody)
}


const searchBtn = document.querySelector('#searchBtn')
const searchBar = document.querySelector('#searchBar')

searchBar.addEventListener('keydown', (e)=>{
    if(e.key === 'Enter'){
        e.preventDefault()
        searchBtn.click()
    }
})

//caching issue
//need to mske insensitive to case

searchBtn.addEventListener('click', (e)=>{
    e.preventDefault()
    const search = searchBar.value
    const cardBodys = document.getElementsByClassName('cardBody')
    const cardTitles = document.getElementsByClassName('cardTitle')
    const cardTexts = document.getElementsByClassName('cardText')
    for (let i = 0; i < cardBodys.length; i++) {
        if(cardTitles[i].textContent.includes(search)||cardTexts[i].textContent.includes(search)){
            cardBodys[i].style.visibility = 'visible'
        }else{
            cardBodys[i].style.display = 'none'
        }
        
    }
})

async function getAllPosts(){
    try{
        const response = await fetch('http://localhost:3000/allposts/')
        posts = await response.json()
        posts.forEach(e => createSection(e))
    }catch(err){
        console.log('Something went wrong '+ err.message)
    }
}

getAllPosts()

function refreshPage(){
    window.location.reload();
} 

// function to get all the posts

async function getData() {
    const response = await fetch(`http://localhost:3000/allposts`)
    const data = response.json();
    console.log(data);
    return data;
  }
  
  getData()




  ///////DARK MODE/////////

const about = document.getElementById("aboutLink");
const darkmode = document.getElementById("darkLink");
let CheckDarkOn = false;

darkmode.addEventListener("click", swicthColours);

function swicthColours(e) {
  console.log("dark mode clicked");
  console.log(CheckDarkOn);
  e.preventDefault();
  let mainbody = document.querySelector("body");
  //   mainbody.style.backgroundColor = "rgb(39, 39, 39)";
  //   mainbody.style.color = "white";

  if (CheckDarkOn === false) {
    mainbody.style.backgroundColor = "rgb(39, 39, 39)";
    mainbody.style.color = "white";
    CheckDarkOn = true;
  } else {
    mainbody.style.backgroundColor = "white";
    mainbody.style.color = "black";
    CheckDarkOn = false;
  }
}
