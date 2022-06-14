

const createTodo = (data) => {
    fetch("http://localhost:8000/auth", {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-type': 'application/json'
        },
        body: JSON.stringify(data) 
    })
        .then(res => res.json()) 
        .then(data = console.log(data)) 
        .catch(err => console.log(err)) 
}
