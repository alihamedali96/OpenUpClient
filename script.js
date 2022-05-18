document.body.addEventListener('click', (event) => {
    const button = event.target.closest('.button');
  
    if (!button) return;
  
    const container = button.closest('.likes');
  
    if (!container) return;
  
    const counter = container.querySelector('.counter');
  
    if (!counter) return;
  
    counter.innerText = Number(counter.innerText) + 1;
  });
