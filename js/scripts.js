//Global Veriables
const userList = [];

//FUNCTIONS

//Fetch 12 user objects and push to an array, then calls createUserCard function, then triggers the modal event listener for functionality
async function fetchUsers() {
    for (let i = 0; i < 12; i++) {
        await fetch('https://randomuser.me/api/?nat=us')
            .then(res => res.json())
            .then(data => userList.push(data.results[0]))
        createUserCard(userList[i]);
    }
    modalEventListener();
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

//Creates Modal HTML and formats user information. Creates event listener when open to close modal window.
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
    </div>
    `;
    document.getElementById('gallery').insertAdjacentHTML('beforeend', html);
    document.getElementById('modal-close-btn').addEventListener('click', (e) => { 
        document.getElementsByClassName('modal-container')[0].remove();
    })
}

//Adds click functionality to user cards to call createModal function and display the appropriate user info
const modalEventListener = () => {
    document.getElementById('gallery').addEventListener('click', (e) => {
        let cards = document.getElementsByClassName('card');
        let content = e.target.parentElement;
        for (let i = 0; i < 12; i++) {
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

//FUNCTION CALLS
fetchUsers();