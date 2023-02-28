import React, { useContext, useEffect, useState } from 'react';
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
    const { addAlbumCard, setAddAlbumCard } = props.addAlbumCardState;

    const handleClick = (e) => {
        console.log('clicked');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = {
            albumId: albumId,
            albumTitle: albumTitle
        }
        setAddAlbumCard(false);
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
            setAlbumId('');
            setAlbumTitle('');
            

        }


    }


    useEffect(() => {
        const div = document.querySelector(`.${styles.container}`);
        if (!addAlbumCard) {
            div.classList.remove('animate__fadeOutLeftBig');
            div.classList.remove('animate__fadeInLeftBig');
            div.classList.add('animate__fadeOutLeftBig');

            // SET TIMEOUT TO REMOVE ELEMENT FROM DOM
            setTimeout(() => {
                div.classList.remove(`${styles.remove}`);
                div.classList.add(`${styles.remove}`);
            }, 200);

            
        } else {
            div.classList.remove('animate__fadeOutLeftBig');
            div.classList.remove('animate__fadeInLeftBig');
            div.classList.add('animate__fadeInLeftBig');
            div.classList.remove(`${styles.remove}`);
        }
    }, [addAlbumCard]);

    return (
        <div className={`${styles.container} animate__animated ${styles.remove}`}>


            {/* <FontAwesomeIcon className={styles.cancelButton} icon={faXmark} /> */}


            <div
                // onMouseEnter={() => cursorChangeHandler('hovered')}
                // onMouseLeave={() => cursorChangeHandler('')}
                onClick={handleClick}
                className={`${styles.albumCardInfo} animate__animated animate__fadeIn`}
            >
                    <input required type="number" placeholder="Album Id" value={albumId} onChange={(e) => setAlbumId(e.target.value)} />
                    <input required type="text" placeholder="Album Title" value={albumTitle} onChange={(e) => setAlbumTitle(e.target.value)} />
                    <button onClick={handleSubmit}> Submit </button>
                
            </div>
            <div className={`${styles.header} animate__animated animate__fadeIn`}>Add Album</div>

        </div>
    );
}
