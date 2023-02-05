const $ = (selector)=> document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

const BASE_URL = "https://63e0180e59bccf35dabee582.mockapi.io/api";

const getJobs = () => {
    fetch(`${BASE_URL}/jobs`)
    .then((response) => response.json())
    .then ((data) => {
        console.log(data)
    })
    .catch(() => alert('error'));
};

getJobs();