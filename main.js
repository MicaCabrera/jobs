const $ = (selector)=> document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

const BASE_URL = "https://63e0180e59bccf35dabee582.mockapi.io/api";

//vista

$('#create-job').addEventListener('click', ()=> {
$('#view-cards').classList.add('is-hidden');
$('#view-form').classList.remove('is-hidden');
})

$('#home').addEventListener('click', ()=> {
    $('#view-cards').classList.remove('is-hidden');
    $('#view-form').classList.add('is-hidden');
    })
    

//métodos

//obtener todos los trabajos
const getJobs = () => {
    fetch(`${BASE_URL}/jobs`)
    .then((response) => response.json())
    .then ((data) => {
        renderJobs(data);
    })
    .catch(() => alert('Error en la Api'));
};

getJobs();

//crear trabajos
const registerJob = () =>{

    const job = {
    name: $('#title').value,
    description:$('#description').value,
    location:$('#location').value,
    category:$('#category').value,
    seniority:$('#seniority').value,
    }
  
    fetch(`${BASE_URL}/jobs`, {
    method: 'POST',
    headers: {
    'Content-Type': 'Application/json'
    },
    body: JSON.stringify(job),
    })
    .then((response) => response.json())
    .then ((data) => {
        console.log(data)
    })
    .catch(() => alert('Error en la base de datos'));
}

//Obtener un trabajo 
const getJob = (id) => {
    fetch(`${BASE_URL}/jobs/${id}`)
    .then((response) => response.json())
    .then ((data) => {
        showSaveDetails(data);
    })
    .catch(() => alert('Error en la Api'));
};

//cards html

const deleteJob = (id) => {
    fetch(`${BASE_URL}/jobs/${id}`, {
        method: 'DELETE',
    });
};


const renderJobs = (jobs) => {

for(let {id,name,description, location, category,seniority} of jobs) {
$('.container-cards').innerHTML += `
 <div class="card m-2">
 <div class="card-content"> 
 <h1>${name}</h1>
 <p>${description}</p>
 <div class="is-flex mt-1">
    <div>
     <span class="tag is-dark mr-2">${location}</span>
     <span class="tag is-dark mr-2">${category}</span>
     <span class="tag is-dark mr-2">${seniority}</span>
     </div>
 </div>

 <div class="mt-2"> <button onclick="getJob(${id})" class="button is-info btn-save-details"">Save Details</button></div>
 </div>
 </div>
 `
}}

const showSaveDetails = (data)=> {
    $('.container-cards').innerHTML = '';

    $('.container-cards').innerHTML += `
    <div class="card m-2">
    <div class="card-content"> 
    <h1>${data.name}</h1>
    <p>${data.description}</p>
    <div class="is-flex mt-1">
       <div>
        <span class="tag is-dark mr-2">${data.location}</span>
        <span class="tag is-dark mr-2">${data.category}</span>
        <span class="tag is-dark mr-2">${data.seniority}</span>
        </div>
    </div>
    

    <div class="mt-2 is-flex">
    <button class="button mr-1 is-info btn-save-details"">Edit Job</button>
    <button class="button is-danger btn-save-details"">Delete Job</button>
    </div>
    </div>
    </div>
    `
}


$('#form').addEventListener('submit', (e)=> {
e.preventDefault();

registerJob();

$('#view-cards').classList.remove('is-hidden');
$('#view-form').classList.add('is-hidden');
})
