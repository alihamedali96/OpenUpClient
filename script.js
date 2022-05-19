// const form = document.getElementById('form')
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

    const comments = document.createElement('p')
    comments.className = 'comments'
    comments.textContent = data.comments

    const form = document.createElement('form')
    // form.action = 'PATCH'
    form.className = 'commentForm'

    const formLabel = document.createElement('label')
    formLabel.setAttribute('for', 'commentsSection')

    const textArea = document.createElement('textarea')
    textArea.setAttribute('name', 'commentsSection')
    textArea.id = `CommentText${data.id}`

    const submit = document.createElement('input')
    submit.setAttribute('type', 'submit')
    submit.setAttribute('value', 'Post comment')
    submit.className = 'commentBtn'
    submit.id = data.id
    
    const btnGroup = document.createElement('div')
    btnGroup.className = 'btn-group'
    
    
    const button1 = document.createElement('button')
    button1.className = 'likes button button1 clickme'
    button1.innerHTML = '&#128293;'
    const button2 = document.createElement('button')
    button2.className = 'likes button button2 clickme'
    button2.innerHTML = '&#128151;'
    const button3 = document.createElement('button')
    button3.className = 'likes button button3 clickme'
    button3.innerHTML = '&#128078;'
    const button4 = document.createElement('button')
    button4.className = 'likes button button4 clickme'
    button4.textContent = 'Total clicks:'
    const counter = document.createElement('span')
    counter.id = 'counter'
    counter.textContent = data.interactions

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
    cardBody.appendChild(comments)
    cardBody.appendChild(form)



    mainContainer.appendChild(cardBody)
}

async function getTopPosts(){
    try{
        const response = await fetch('http://localhost:3000/homepage/')
        const data = await response.json()
        data.forEach(e => createSection(e))
        
    }catch(err){
        console.log('Something went wrong '+ err.message)
    }
}

getTopPosts()




//Click counter      

//BUTTON COUNTER + Disable after clicking
const ELS_button = document.querySelectorAll(".clickme");
const EL_counter = document.querySelector("#counter");
let count = 0;

  const incrementCount = (ev) => {
  count += 1;
  ev.currentTarget.disabled = true; // make button disabled
  EL_counter.textContent = count;
};

ELS_button.forEach(el => {
  el.addEventListener("click", incrementCount);
});
   

const flexCont = document.querySelector('.flex-container')

// flexCont.addEventListener('click', event => {
//     console.log('hi')
//   })

//   postCommentForm.forEach(item => {
//     item.addEventListener('click', event => {
//         event.preventDefault()
//         console.log('hi')
//     })
//   })


window.onload=function(){
    const postCommentForm = document.querySelectorAll('.commentBtn')
    async function postComment(e) {
        e.preventDefault();
        const commentId = e.target.id
        //trying to get dynmamic id for textArea, but not working
            const commentBoxId = `CommentText${commentId}`
            const getElId = '"' + commentBoxId + '"'
            const commentBox = document.getElementById(getElId)
            console.log(commentBox)
        try {
            console.log(getElId)
            console.log(commentId)
          const newCommentData = {
            id: commentId,
            comments: "hi",
          };
          const options = {
            method: "PATCH",
            body: JSON.stringify(newCommentData),
            headers: {
              "Content-Type": "application/json; charset=UTF-8",
            },
          };
          const response = await fetch("http://localhost:3000/homepage/", options);
          const data = await response.json();
          console.log(data)
          } catch (err) {
            console.warn(err);
          }
      }
    postCommentForm.forEach(item => {
        item.addEventListener('click', postComment)
      })
  }