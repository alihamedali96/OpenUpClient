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
    const linkToImage = data.img_url
    cardImg.setAttribute('src', linkToImage)
    
    if(data.img_url = 'undefined'){
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

    const textArea = document.createElement('textarea')
    textArea.className = 'commentInput'
    textArea.setAttribute('name', 'commentsSection')
    textArea.id = `CommentText${data.id}`

    const submit = document.createElement('input')
    submit.setAttribute('type', 'submit')
    submit.setAttribute('value', 'Post comment')
    submit.className = 'commentBtn'
    
    
    const btnGroup = document.createElement('div')
    btnGroup.className = 'btn-group'
    btnGroup.id = data.id
    
    const button1 = document.createElement('button')
    button1.className = 'likes button button1 clickme'
    button1.innerHTML = '&#128293;'
    const button2 = document.createElement('button')
    button2.className = 'likes button button2 clickme'
    button2.innerHTML = '&#128151;'
    const button3 = document.createElement('button')
    button3.className = 'likes button button3 clickme'
    button3.innerHTML = '&#11088;'
    const button4 = document.createElement('div')
    button4.className = 'likes button button4 clickme'
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

async function getTopPosts(){
    try{
        const response = await fetch('https://fierce-plateau-94232.herokuapp.com/homepage/')
        const data = await response.json()
        data.forEach(e => createSection(e))
        
    }catch(err){
        console.log('Something went wrong '+ err.message)
    }
}

getTopPosts()

const flexCont = document.querySelector('.flex-container')

window.onload=function(){
    const postCommentForm = document.querySelectorAll('.commentForm')
    async function postComment(e) {
        e.preventDefault();
        const commentIdString = e.target.id
        const commentId = parseInt(commentIdString)
        const commentText = e.target.commentsSection
        try {
            const newCommentData = {
                id: commentId,
                comments: commentText.value,
            };
            const options = {
                method: "PATCH",
                body: JSON.stringify(newCommentData),
                headers: {
                "Content-Type": "application/json; charset=UTF-8",
                },
            };
            const response = await fetch("https://fierce-plateau-94232.herokuapp.com/homepage/", options);
            const data = await response.json();
            console.log(data)
            } catch (err) {
                console.warn(err);
            }
        }
    postCommentForm.forEach(item => {
        item.addEventListener('submit', postComment)
        })

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
            const response = await fetch(`https://fierce-plateau-94232.herokuapp.com/posts/${buttonId}/`, options);
            const data = await response.json();
            console.log(data)
            } catch (err) {
                console.warn(err);
            }
        }
        btn.forEach(item => {
            item.addEventListener('click', addInteraction)
        })


    }
    

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
