//Global Veriables
const userList = [];

//FUNCTIONS

//Fetch 12 user objects and push to an array, then calls setupUsers function to populate the page
async function fetchUsers() {
    await fetch('https://randomuser.me/api/?nat=us&results=12')
        .then(res => res.json())
        .then(data => data.results.map(elem => userList.push(elem)));
    await setUpUsers(userList);
}


//Setup users calls the createUser function an
const setUpUsers = (users) => {
    modalEventListener();
    document.body.style.backgroundImage = 'linear-gradient(lightblue, royalblue)';
    users.map(user => createUserCard(user));
    addSearch();
}

//Displays individual User Card HTML elements based upon userList array
const createUserCard = (user) => {
    html = `
    <div class="card">
        <div class="card-img-container">
            <img class="card-img" src="${user.picture.medium}" alt="profile picture">
        </div>
        <div class="card-info-container">
            <h3 id="name" class="card-name cap">${user.name.first} ${user.name.last}</h3>
            <p class="card-text">${user.email}</p>
            <p class="card-text cap">${user.location.city}, ${user.location.state}</p>
        </div>
    </div>
    `;
    document.getElementById('gallery').insertAdjacentHTML('beforeend', html);
}

//Creates Modal HTML and formats user information. Calls event listener to handle button actions.
const createModal = (user) => {
    let phoneNumber = formatTelephone(`${user.cell}`);
    let DOB = formatDOB(`${user.dob.date}`);
    html =`
    <div class="modal-container">
    <div class="modal">
        <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
        <div class="modal-info-container">
            <img class="modal-img" src="${user.picture.large}" alt="profile picture">
            <h3 id="name" class="modal-name cap">${user.name.first} ${user.name.last}</h3>
            <p class="modal-text">${user.email}</p>
            <p class="modal-text cap">${user.location.city}</p>
            <hr>
            <p class="modal-text">${phoneNumber}</p>
            <p class="modal-text">${user.location.street.number} ${user.location.street.name}, ${user.location.city}, ${user.location.state} ${user.location.postcode}</p>
            <p class="modal-text">Birthday: ${DOB}</p>
        </div>
        <div class="modal-btn-container">
            <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
            <button type="button" id="modal-next" class="modal-next btn">Next</button>
        </div>
    </div>`;
    document.getElementById('gallery').insertAdjacentHTML('beforeend', html);
    if (user === userList[0]) {document.getElementById('modal-prev').style.display = 'none'};
    if (user === userList[11]) {document.getElementById('modal-next').style.display = 'none'};
    modalButtonListeners();
}

//Adds click functionality to user cards to call createModal function and display the appropriate user info
const modalEventListener = () => {
    document.getElementById('gallery').addEventListener('click', (e) => {
        let cards = document.getElementsByClassName('card');
        let content = e.target.parentElement;
        for (let i = 0; i < cards.length; i++) {
        if (e.target === cards[i] || content === cards[i] || content.parentElement === cards[i]) {
            createModal(userList[i]);
        }
    }
})}

//Formats user telephone
const formatTelephone = (phoneNumber) => {
    phone = phoneNumber.replace(/[^\d]/g, "");
    const regex = /^\D*(\d{3})\D*(\d{3})\D*(\d{4})\D*$/
    return phone.replace(regex, '($1) $2-$3');
}

//Formats user date of birth
const formatDOB = (DOB) => {
    correctedDOB = DOB.replace(/[^\d{8}]/g, "");
    trimDOB = correctedDOB.substring(0, 8);
    const regex = /^([0-9]{4})([0-9]{2})([0-9]{2})$/g
    return trimDOB.replace(regex, '$2/$3/$1');
}

//Adds click listeners to all buttons in the modal window
const modalButtonListeners = () => {
    let name = document.querySelector("div.modal-info-container > #name"); 
    let prevBtn = document.getElementById('modal-prev');
    let nextBtn = document.getElementById('modal-next');
    document.getElementById('modal-close-btn').addEventListener('click', (e) => { 
        removeModalWindow();
    })
    prevBtn.addEventListener('click', (e) => { 
        for (let i = 1; i < userList.length; i++) { 
            if (name.textContent === `${userList[i].name.first} ${userList[i].name.last}`) {
                removeModalWindow();
                createModal(userList[i-1])
            }
        }
    } 
)    
    nextBtn.addEventListener('click', (e) => { 
        for (let i = 0; i < userList.length; i++) { 
            if (name.textContent === `${userList[i].name.first} ${userList[i].name.last}`) {
                removeModalWindow();
                createModal(userList[i+1])
            }
        }
    })
}

//Function to remove the modal winow
const removeModalWindow = () => {
    document.getElementsByClassName('modal-container')[0].remove();
};

//Search Bar added to page and event listener function called
const addSearch = () => {
    const searchHTML = `
        <form action="#" method="get">
            <input type="search" id="search-input" class="search-input" placeholder="Search...">
            <input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
        </form>`;
    document.querySelector('div.search-container').insertAdjacentHTML('beforeend', searchHTML);
    seachListener();

}

//Function to filter search results and display matching cards
const executeSearch = (input) => {
    const cardContainer = document.querySelectorAll(".card-info-container");
    for (let i = 0; i < userList.length; i++) {
        let cardName = cardContainer[i].firstElementChild;
        let firstName = userList[i].name.first.toUpperCase();
        let lastName = userList[i].name.last.toUpperCase();
        let fullName = `${firstName} ${lastName}`;
        if (firstName.includes(input.toUpperCase()) || lastName.includes(input.toUpperCase()) || fullName.includes(input.toUpperCase())) {
            cardContainer[i].parentElement.style.display = "";
        } else {
            cardContainer[i].parentElement.style.display = "none";
        }
    }
}

//Function that holds listeners for the search bar
const seachListener = () => {
    let searchBar = document.querySelector('input.search-input')
    let searchBtn = document.querySelector('input.search-submit')
    searchBar.addEventListener('keyup', (e) => {
        e.preventDefault();
        executeSearch(searchBar.value);
     });
     searchBtn.addEventListener('click', (e) => {
         e.preventDefault();
         executeSearch(searchBar.value);
      });
}

//FUNCTION CALLS
fetchUsers();