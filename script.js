const card = document.querySelector(".card-title")
const row = document.querySelector(".row")
console.log("Hi")


    fetch("http://localhost:3000/homepage")
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data);

        data.forEach((element) => {
            row.insertAdjacentHTML(
     
        "beforeend",
        `<div class="col">
        <div class="card h-100">
          <div class="card-body">
            <h5 class="card-title">${element.title}</h5>
            <p class="card-text">${element.text}</p>
          </div>
          <div class="card-footer">
            <small class="text-muted">Last updated 3 mins ago</small>
          </div>
        </div>
      </div>`
            );
          });
  
       
        });


      

   
  
