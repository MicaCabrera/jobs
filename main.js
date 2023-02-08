const $ = (selector)=> document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);
const isHidden = (element)=>element.classList.add('is-hidden');
const isRemove = (element)=>element.classList.remove('is-hidden');

const BASE_URL = "https://63e0180e59bccf35dabee582.mockapi.io/api";
let flagEdit = false;

   
//métodos

//crear trabajos
const jobForm = () => {
    const job = {
        name: $('#title').value,
        description:$('#description').value,
        location:$('#location').value,
        category:$('#category').value,
        seniority:$('#seniority').value,
        };
    return job
};

const registerJob = () =>{
    const job = jobForm();
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
    .catch(() => alert('Error en la base de datos'))
    .finally(()=> (window.location.href ="index.html"));
}

//obtener todos los trabajos
const getJobs = () => {
    fetch(`${BASE_URL}/jobs`)
    .then((response) => response.json())
    .then ((data) => {
        renderJobs(data);
    })
    .catch(() => alert('Error en la Api'))
    
};

getJobs();

//Obtener un trabajo 
const getJob = (id) => {
    fetch(`${BASE_URL}/jobs/${id}`)
    .then((response) => response.json())
    .then ((data) => {
        showSaveDetails(data);
        infoJobForm(data); 
    })
    .catch(() => alert('Error en la Api'));
};


//mostrar cards 
const renderJobs = (jobs) => {

for(let {id,name,description, location, category,seniority} of jobs) {
$('.container-cards').innerHTML += `
 <div class="card column is-3 m-2">
 <div class="card-content"> 
 <h1 class="has-text-black">${name}</h1>
 <p>${description}</p>
 <div class="is-flex mt-1">
    <div>
     <span class="tag is-dark mr-2">${location}</span>
     <span class="tag is-dark mr-2">${category}</span>
     <span class="tag is-dark mr-2">${seniority}</span>
     </div>
 </div>

 <div class="mt-2">
  <button onclick="getJob(${id})" class="button is-info btn-save-details">Save Details</button>
  </div>
 </div>
 </div>
 `
}}

//mostrar un trabajo específico
const showSaveDetails = (data)=> {
    isHidden($('#view-cards'));
 
    $('.details-card').innerHTML = '';
    $('.details-card').innerHTML += `
    <div class="column is-3 card m-2">
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
    <button data-id="${data.id}" class="button mr-1 is-info btn-edit">Edit Job</button>
    <button data-id="${data.id}" class="button  is-danger btn-delete">Delete Job</button>
    </div>
    </div>
    </div>
    `
    //eliminar btn
    for(const btn of $$('.btn-delete')) {
    btn.addEventListener('click', ()=> {
        const idDelete = btn.getAttribute("data-id");
        deleteJob(idDelete); 
    })}
   
    //editar btn
    for(const btn of $$('.btn-edit')) {
    btn.addEventListener('click', ()=> {
        flagEdit = true;

        const idEdit = btn.getAttribute("data-id"); 
        isRemove($('#view-form'));
        $('.btn-create-form').textContent = "Editar";
        $('.btn-create-form').classList.add('is-primary');
        $('.btn-create-form').classList.remove('is-link');
        $('.btn-create-form').setAttribute('data-id',idEdit);
        getJob(idEdit);
        //boton cancelar
        $('.btn-cancel-form').remove();
    });
}

}
//eliminar un trabajo

const deleteJob = (id) => {
    fetch(`${BASE_URL}/jobs/${id}`, {
        method: 'DELETE',
    })
    .finally(()=> (window.location.href ="index.html")); 
};

const editJob = (id) => {
    const job = jobForm();
    fetch(`${BASE_URL}/jobs/${id}`,{
    method: 'PUT',
    headers: {
        "Content-Type": "Application/json",
     },
    body: JSON.stringify(job),
    })
    .then((response)=> response.json())
    .then((data)=>{
        console.log(data);
    })
    .finally(()=>(window.location.href="index.html"));
}

// //llenar el formulario de editar con la info del trabajo seleccionado
const infoJobForm = (data) => {
    $('#title').value = data.name;
    $('#description').value = data.description;
    $('#location').value = data.location;
    $('#category').value = data.category;
    $('#seniority').value = data.seniority;      
};

//eventos
$('#form').addEventListener('submit', (e)=> {
e.preventDefault();
if (flagEdit) {
const jobId = $('.btn-create-form').getAttribute('data-id'); 
editJob(jobId);
} else {
registerJob();
}

$('#view-cards').classList.remove('is-hidden');
$('#view-form').classList.add('is-hidden');
})

$('#home').addEventListener('click',()=> {
isHidden($('#view-form'));
isRemove($('#view-cards'));
$('.details-card').innerHTML = '';

})

$('#create-job').addEventListener('click', ()=> {
    isHidden($('#view-cards'));
    isRemove($('#view-form'));

    $('.btn-create-form').textContent = "Create";
    $('.btn-create-form').classList.remove('is-primary');
    $('.btn-create-form').classList.add('is-link');
    $('.btn-create-form').removeAttribute('data-id',idEdit);

    registerJob();
  })
  
$('.btn-cancel-form').addEventListener('click', ()=> {
    isHidden($('#view-form'));
    isRemove($('#view-cards'));
   })