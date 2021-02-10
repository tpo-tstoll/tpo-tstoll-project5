//Global Veriables
let userList = [];


//FUNCTIONS


//Fetch 12 user objects and push to an array
async function fetchUsers() {
    for (let i = 0; i < 12; i++) {
       let fetchedUser = await fetch('https://randomuser.me/api/')
        .then(res => res.json())
        .then(data => userList.push(data.results[0]))
    }
    createUserCard();
}

const createUserCard = () => {
    const divGallery = document.getElementById('gallery');
    
    html = `
    <div class="card">
        <div class="card-img-container">
            <img class="card-img" src="${userList[i].picture.large}" alt="profile picture">
        </div>
        <div class="card-info-container">
            <h3 id="name" class="card-name cap">${userList[i].name.first} ${userList[i].name.last}</h3>
            <p class="card-text">${userList[i].email}</p>
            <p class="card-text cap">${userList[i].location.city}, ${userList[i].location.state}</p>
        </div>
    </div>
    `;
    divGallery.insertAdjacentHTML('beforeend', html);
    
}

//FUNCTION CALLS
fetchUsers();