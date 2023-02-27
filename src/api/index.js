const url = 'https://jsonplaceholder.typicode.com/albums';

// function to fetch data from the API
export const fetchAlbums = () => {
    return fetch(`${url}`)
        .then((response) => { 
            return response.json().then((data) => {
                console.log(data);
                return data;
            }).catch((err) => {
                console.log(err);
            }) 
        });
}
    