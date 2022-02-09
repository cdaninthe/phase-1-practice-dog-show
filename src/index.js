document.addEventListener('DOMContentLoaded', () => {
    const table = document.getElementById('table-body')
    fetchDogs()
    
    const form = document.getElementById(`dog-form`)
    
    const submit = document.getElementById('dog-form').addEventListener('submit', (event) => {
        event.preventDefault()
        const data = {
            id: event.target.dataset.id,
            name: form[0].value,
            breed: form[1].value,
            sex: form[2].value
        }
        updateDog(data)
    })


    //Fetch dogs
    function fetchDogs(){
        fetch(`http://localhost:3000/dogs`)
        .then(resp => resp.json())
        .then(data => {
            table.innerText = ''
            displayDogs(data)
        })
    }

    //Display dogs in table
    function displayDogs(arr){
        arr.forEach(dog => {

            const tr = document.createElement('tr')
            const name = document.createElement('td')
            const breed = document.createElement('td')
            const sex = document.createElement('td')
            const td = document.createElement('td')
            const btn = document.createElement('button')

            tr.id = dog.id
            name.innerText = dog.name
            breed.innerText = dog.breed
            sex.innerText = dog.sex
            btn.innerText = 'Edit'

            table.appendChild(tr)
            tr.appendChild(name)
            tr.appendChild(breed)
            tr.appendChild(sex)
            tr.appendChild(td)
            td.appendChild(btn)

            //edit button listener
            btn.addEventListener('click', () => {
                getValues(dog)
            })           
        });
    }
    
    //Get Values in form
    function getValues(dog){
        //debugger;
        console.log(dog)
        const edit = document.getElementById(`${dog.id}`).getElementsByTagName('td')
        form.dataset.id = dog.id
        form[0].value = edit[0].innerText
        form[1].value = edit[1].innerText
        form[2].value = edit[2].innerText
    }

    //Update Dog in database
    function updateDog(dog){
        //debugger;
        console.log(dog)
        fetch (`http://localhost:3000/dogs/${dog.id}`, {
            method: 'PATCH',
            headers:{
                "Content-Type": "application/json",
                'Accept': 'application/json'
            },
            body: JSON.stringify(dog)
        })
        .then(resp => resp.json())
        .then(data => {
            console.log(data)
            fetchDogs()

            form[0].value = ''
            form[1].value = ''
            form[2].value = '' 
        })
    }
})