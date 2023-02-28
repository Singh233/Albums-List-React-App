import React, { useContext, useState } from 'react';
import { MouseContext } from '../context/mouse-context';
import styles from '../styles/addAlbumCard.module.scss';
// Font Awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { postAlbums } from '../api';

export default function AddAlbumCard(props) {
    const { cursorType, cursorChangeHandler } = useContext(MouseContext); // This is a hook
    const [ albumId, setAlbumId ] = useState('');
    const [ albumTitle, setAlbumTitle ] = useState('');

    const { allAlbums, setAllAlbums } = props.albumsState;

    const handleClick = (e) => {
        console.log('clicked');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = {
            albumId: albumId,
            albumTitle: albumTitle
        }

        const response = await postAlbums(data);
        if (response) {
            let arr = [...allAlbums];
            const albumData = {
                userId: parseInt(response.albumId),
                id: response.id,
                title: response.albumTitle,
            }
            arr.unshift(albumData);
            setAllAlbums(arr);
            console.log(arr);

        }


    }

    return (
        <div className={`${styles.container} `}>


            {/* <FontAwesomeIcon className={styles.cancelButton} icon={faXmark} /> */}

            <div className={`${styles.header} animate__animated animate__fadeIn`}>Add Album</div>

            <div
                // onMouseEnter={() => cursorChangeHandler('hovered')}
                // onMouseLeave={() => cursorChangeHandler('')}
                onClick={handleClick}
                className={`${styles.albumCardInfo} animate__animated animate__fadeIn`}
            >
                    <input required type="number" placeholder="Album Id" value={albumId} onChange={(e) => setAlbumId(e.target.value)} />
                    <input required type="text" placeholder="Album Title" value={albumTitle} onChange={(e) => setAlbumTitle(e.target.value)} />
                    <p onClick={handleSubmit}>Submit</p>
                
            </div>

        </div>
    );
}
