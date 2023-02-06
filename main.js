const $ = (selector)=> document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

const BASE_URL = "https://63e0180e59bccf35dabee582.mockapi.io/api";

//métodos

//obtener todos los trabajos
const getJobs = () => {
    fetch(`${BASE_URL}/jobs`)
    .then((response) => response.json())
    .then ((data) => {
        console.log(data)
    })
    .catch(() => alert('Error en la Api'));
};

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
 <div class="card column is-2 has-text-centered">
 <h1 class="title">Título Job</h1>
 <p> Lorem ipsum dolor sit amet consectetur adipisicing elit. 
     Dolores eos voluptate quaerat sint temporibus eum pariatur ad explicabo eveniet.</p>
 <div class="is-flex is-justify-content-center mt-2">
     <span class="tag is-dark mr-2">Info</span>
     <span class="tag is-dark mr-2">Info</span>
     <span class="tag is-dark mr-2">Info</span>
 </div>

 <div class="m-2"> <button class="button is-info">Save Details</button></div>
</div>
 `
}

}


$('#form').addEventListener('submit', (e)=> {
e.preventDefault();+
registerJob();
})