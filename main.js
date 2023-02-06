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

//cards html

const deleteJob = (id) => {
    fetch(`${BASE_URL}/jobs/${id}`, {
        method: 'DELETE',
    });
};


const renderJobs = (jobs) => {


for(let {id,name,description, location, category,seniority} of jobs) {

    const div = document.createElement("div");
    div.classList.add("card", "m-2");
    
 div.innerHTML += `
 <div>
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

 <div class="mt-2"> <button id="btn-save" class="button is-info">Save Details</button></div>
 </div>
 </div>
 `
 const detailsBtn = div.querySelector("#btn-save");

 detailsBtn.onclick = function(){
    //funcion para la card
    console.log('btn');
 };

 $('.container-cards').append(div);
}}


$('#form').addEventListener('submit', (e)=> {
e.preventDefault();

registerJob();

$('#view-cards').classList.remove('is-hidden');
$('#view-form').classList.add('is-hidden');
})
