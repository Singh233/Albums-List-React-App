const url = 'https://jsonplaceholder.typicode.com/albums';

// function to fetch data from the API
export const fetchAlbums = () => {
    return fetch(`${url}`)
        .then(res => res.json())
        .then(data => console.log(data))
}
    