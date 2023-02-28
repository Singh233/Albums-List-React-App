const URL = 'https://jsonplaceholder.typicode.com/albums';

// function to fetch data from the API
export const fetchAlbums = async () => {
    const response = await fetch(`${URL}`);
    try {
        const data = await response.json();
        console.log(data);
        return data;
    } catch (err) {
        console.log(err);
    }
}

// function to post data to the API
export const postAlbums = async (album) => {
    const response = await fetch(`${URL}`, {
        method: 'POST',
        body: JSON.stringify(album),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    });
    const json = await response.json();
    return json;
}
    