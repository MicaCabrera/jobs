const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);
const isHidden = (element) => element.classList.add("is-hidden");
const isRemove = (element) => element.classList.remove("is-hidden");

const BASE_URL = "https://63e0180e59bccf35dabee582.mockapi.io/api";
let flagEdit = false;

//métodos

//vista index
const index = () => {
  window.location.href = "index.html";
};

//crear trabajos
const jobForm = () => {
  const job = {
    name: $("#title").value,
    description: $("#description").value,
    location: $("#location").value,
    category: $("#category").value,
    seniority: $("#seniority").value,
  };
  return job;
};

const registerJob = () => {
  const job = jobForm();
  fetch(`${BASE_URL}/jobs`, {
    method: "POST",
    headers: {
      "Content-Type": "Application/json",
    },
    body: JSON.stringify(job),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
    })
    .catch(() => alert("Error en la base de datos"))
    .finally(() => (window.location.href = "index.html"));
};

//obtener todos los trabajos
const getJobs = () => {
  fetch(`${BASE_URL}/jobs`)
    .then((response) => response.json())
    .then((jobs) => {
      nameSelectFilters(jobs);
      renderJobs(jobs);
      filterLocation(jobs);
    })
    .catch(() => alert("Error en la Api"));
};

getJobs();

//Obtener un trabajo
const getJob = (id) => {
  fetch(`${BASE_URL}/jobs/${id}`)
    .then((response) => response.json())
    .then((data) => {
      showSaveDetails(data);
      infoJobForm(data);
    })
    .catch(() => alert("Error en la Api"));
};

//mostrar cards
const renderJobs = (jobs) => {
  for (let { id, name, description, location, category, seniority } of jobs) {
    $(".container-cards").innerHTML += `
 <div class="column is-one-quarter m-3 box">
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
 `;
  }
};

//mostrar un trabajo específico
const showSaveDetails = (data) => {
  isHidden($("#view-cards"));

  $(".details-card").innerHTML = "";
  $(".details-card").innerHTML += `
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
    `;
  //eliminar trabajo btn
  for (const btn of $$(".btn-delete")) {
    btn.addEventListener("click", () => {
      const idDelete = btn.getAttribute("data-id");

      $("#btn-confirm-delete").setAttribute("data-id", idDelete);
      showModal();
    });
  }

  //editar trabajo btn
  for (const btn of $$(".btn-edit")) {
    btn.addEventListener("click", () => {
      flagEdit = true;

      const idEdit = btn.getAttribute("data-id");
      isRemove($("#view-form"));
      $(".btn-create-form").textContent = "Editar";
      $(".btn-create-form").classList.add("is-primary");
      $(".btn-create-form").classList.remove("is-link");
      $(".btn-create-form").setAttribute("data-id", idEdit);
      getJob(idEdit);

      //boton cancelar
      $(".btn-cancel-form").remove();
    });
  }
};

//eliminar un trabajo
const deleteJob = (id) => {
  fetch(`${BASE_URL}/jobs/${id}`, {
    method: "DELETE",
  }).finally(() => (window.location.href = "index.html"));
};

//Editar trabajo
const editJob = (id) => {
  const job = jobForm();
  fetch(`${BASE_URL}/jobs/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "Application/json",
    },
    body: JSON.stringify(job),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
    })
    .finally(() => (window.location.href = "index.html"));
};

// //llenar el formulario de editar con la info del trabajo seleccionado
const infoJobForm = (data) => {
  $("#title").value = data.name;
  $("#description").value = data.description;
  $("#location").value = data.location;
  $("#category").value = data.category;
  $("#seniority").value = data.seniority;
};

//filtros
const nameSelectFilters = (jobs) => {
  const filterLocation = jobs.map((location) => location.location);
  const filterLocationSet = new Set(filterLocation);

  const filterSeniority = jobs.map((seniority) => seniority.seniority);
  const filterSenioritySet = new Set(filterSeniority);

  const filterCategory = jobs.map((category) => category.category);
  const filterCategorySet = new Set(filterCategory);

  for (let location of filterLocationSet) {
    $(
      "#select-location"
    ).innerHTML += `<option value="${location}"> ${location} </option>`;
  }

  for (let seniority of filterSenioritySet) {
    $(
      "#select-seniority"
    ).innerHTML += `<option value="${seniority}"> ${seniority} </option>`;
  }

  for (let category of filterCategorySet) {
    $(
      "#select-category"
    ).innerHTML += `<option value="${category}"> ${category} </option>`;
  }
};

//busca x filtro
const filterLocation = (jobs) => {
  $("#btn-search").addEventListener("click", () => {
    const valueLocation = $("#select-location").value;
    const valueSeniority = $("#select-seniority").value;
    const valueCategory = $("#select-category").value;

    let filterJobs = [...jobs];

    if (valueLocation !== "Location") {
      filterJobs = filterJobs.filter((job) => job.location === valueLocation);
    }
    if (valueSeniority !== "Seniority") {
      filterJobs = filterJobs.filter((job) => job.seniority === valueSeniority);
    }
    if (valueCategory !== "Category") {
      filterJobs = filterJobs.filter((job) => job.category === valueCategory);
    }
    renderFilters(filterJobs);
  });
};

//muestra los trabajos filtrados
const renderFilters = (filterJobs) => {
  $(".container-cards").innerHTML = "";
  renderJobs(filterJobs);
};

//modal vista

const showModal = () => {
  $("#modal").classList.add("is-active");
};

const hiddeModal = () => {
  $("#modal").classList.remove("is-active");
};

const showLoading = () => {
  $(".container-cards").innerHTML += `
<button class="button is-loading">Loading</button>`;
};

//eventos

//vista principal home
$("#home").addEventListener("click", index);

// limpia los filtros
$("#btn-clear").addEventListener("click", index);

//vista Create Job
$("#create-job").addEventListener("click", () => {
  flagEdit = false;
  isHidden($("#view-cards"));
  isRemove($("#view-form"));

  $(".btn-create-form").textContent = "Create";
  $(".btn-create-form").classList.remove("is-primary");
  $(".btn-create-form").classList.add("is-link");
  $(".btn-create-form").removeAttribute("data-id", idEdit);
});

//formulario
$("#form").addEventListener("submit", (e) => {
  e.preventDefault();

  if (flagEdit) {
    const jobId = $(".btn-create-form").getAttribute("data-id");
    editJob(jobId);
  } else {
    registerJob();
  }

  $("#view-cards").classList.remove("is-hidden");
  $("#view-form").classList.add("is-hidden");
});

//modal
$("#btn-modal-close").addEventListener("click", hiddeModal);
$("#btn-cancel").addEventListener("click", hiddeModal);
$("#btn-confirm-delete").addEventListener("click", (e) => {
  const id = e.target.getAttribute("data-id");
  deleteJob(id);
});

//nav
$("#btn-nav").addEventListener("click", () => {
  $(".navbar-menu").classList.toggle("is-active");

  for (let a of $$(".nav-color")) {
    a.classList.toggle("has-text-link-dark");
  }
});
