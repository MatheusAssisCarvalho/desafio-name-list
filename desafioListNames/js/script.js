let allData = [];
let filterData = [];

let tabNames = null;
let tabStatistics = null;
let totalPessoas = 0;

let input = null;
let dataInput = null;

let qtdMas = null;
let qtdFem = null;
let ageSum = null;
let ageAvarege = null;

window.addEventListener('load', () => {
    tabNames = document.querySelector('#tabNames');
    tabStatistics = document.querySelector('#statistic-data');
    input = document.querySelector('#inputName');
    button = document.querySelector('#button');
    totalPessoas = document.querySelector('#totalPessoas');

    fetchData();
})

async function fetchData() {
    const res = await fetch('https://randomuser.me/api/?seed=javascript&results=100&nat=BR&noinfo');
    const json = await res.json();
    allData = json.results.map(data => {
        const {name, last, dob, gender, picture} = data;
        return {
            name: name.first+' '+name.last,
            firstName: name.first,
            lastName: name.last,
            age: dob.age,
            gender,
            picture: picture.medium
        };
    });
    render();
}

function render () {
    renderNameList();
    renderInput();
    renderDataStatistic();
}

function renderNameList() {
    let namesHTML = "<div>";

    filterData.forEach(person => {
        const { firstName, lastName, age, gender, picture } = person;
        const nameHTML = `
            <div id='name'>
                <div>
                    <img src="${picture}" alt="${firstName} ${lastName}">
                </div>
                <div>
                    <ul>
                        <li>${firstName} ${lastName},</li>
                        <li>${age} anos</li>
                    </ul>
                </div>
            </div>
        `;
        namesHTML += nameHTML;
    });

    namesHTML += "</div>";
    if (filterData.length == 0) {
        tabNames.textContent = "Nenhum nome filtrado";
    } else {
        tabNames.innerHTML = namesHTML;
    }
    totalPessoas.textContent = filterData.length;
};

function renderDataStatistic() {
    let namesHTML = "<div>";
    qtdMas = 0
    qtdFem = 0
    ageSum = 0
    ageAvarege = 0
    filterData.forEach(person => {
        const { firstName, lastName, age, gender, picture } = person;
        if (gender === "male") {
            qtdMas++;
        }
        if (gender === "female") {
            qtdFem++;
        }
        ageSum += age;
    });
    if (filterData.length > 0) {
        ageAvarege = ageSum/filterData.length;
    } else {
        ageAvarege = 0;
    }

    const statistcsHTML = `
        <div id='name'>
            <ul>
                <li>Sexo Masculino: ${qtdMas}</li>
                <li>Sexo Feminino: ${qtdFem}</li>
                <li>Soma das Idades: ${ageSum}</li>
                <li>Média das Idades: ${ageAvarege}</li>
            </ul>
        </div>
    `;
    tabStatistics.innerHTML = statistcsHTML;
};

function renderInput() {
    input.addEventListener('keyup', (event) => {
        if (event.key === 'Enter') {
            dataInput = event.target.value
            renderFilterNames();
        }
    })
    button.addEventListener('click', (event) => {
        dataInput = input.value
        renderFilterNames();
    })
}
function renderFilterNames() {
    filterData = [];
    if (dataInput === "") {
        return;
    }
    filterData = allData.filter(person => {
        return person.name.toLowerCase().indexOf(dataInput.toLowerCase()) > -1
    })
    renderNameList()
    renderDataStatistic()
}
