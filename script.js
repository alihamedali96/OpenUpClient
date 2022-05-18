// const form = document.getElementById('form')
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
    // form.action = 'PATCH'
    form.className = 'commentForm'

    const formLabel = document.createElement('label')
    formLabel.setAttribute('for', 'commentsSection')

    const textArea = document.createElement('textarea')
    textArea.setAttribute('name', 'commentsSection')

    const submit = document.createElement('input')
    submit.setAttribute('type', 'submit')
    submit.setAttribute('value', 'Post comment')
    submit.className = 'commentBtn'
    
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


const postCommentForm = document.querySelectorAll('.commentBtn')

postCommentForm.forEach(item => {
    item.addEventListener('click', (e) => {
        
    e.preventDefault()
    console.log(e)
    // const options = {
    // method: 'PATCH',
    // body: JSON.stringify({comments: "What a great day this was to make a new post"})
    // }
    // fetch("http://localhost:3000/homepage", options)
    // .then(console.log("Patched post"))
    // .catch(err => console.warn('Opa, something went wrong!', err)) 
})
})


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
   

