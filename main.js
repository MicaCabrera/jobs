const $ = (selector)=> document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

const BASE_URL = "https://63e0180e59bccf35dabee582.mockapi.io/api";

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

//dom

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

 <div class="mt-2"> <button class="button is-info">Save Details</button></div>
 </div>
 </div>
 `
}}


$('#form').addEventListener('submit', (e)=> {
e.preventDefault();+
registerJob();
})