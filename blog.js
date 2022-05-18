// function to get all the posts

async function getData() {
    const response = await fetch(`http://localhost:3000/allposts`)
    const data = response.json();
    console.log(data);
    return data;
  }
  
  getData()