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

async function getMyPosts(){
    try{
        const response = await fetch('http://localhost:3000/mypage/')
        const data = await response.json()
        data.forEach(e => createSection(e))
        
    }catch(err){
        console.log('Something went wrong '+ err.message)
    }
}

getMyPosts()