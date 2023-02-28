import React, { useEffect, useState } from 'react';
import styles from '../styles/albumList.module.scss';

// Font Awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCreditCard } from '@fortawesome/free-solid-svg-icons'
import { faPen } from '@fortawesome/free-solid-svg-icons'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { faSquareCheck } from '@fortawesome/free-solid-svg-icons'
import { updateAlbums } from '../api';


export default function AlbumList(props) {
    const { album, albums, index } = props;
    const [ editClicked, setEditClicked ] = useState(false);

    const [ albumTitle, setAlbumTitle ] = useState('');

    const [ title, setTitle ] = useState(album.title);

    const { allAlbums, setAllAlbums } = props.albumsState;

    // handle edit clicked
    const handleEditClick = (e) => {
        console.log('edit clicked');
        setEditClicked(!editClicked);
    }
    // handle delete clicked
    const handleDeleteClick = (e) => {
        console.log('delete clicked');
    }

    // handle submit click
    const handleSubmitClick = async (e) => {

        const data = {
            userId: album.userId,
            albumId: album.id,
            albumTitle: albumTitle
        }
        setEditClicked(!editClicked);
        setTitle(albumTitle);

        const response = await updateAlbums(data);
        if (response) {
            let arr = [...allAlbums];
            let item = arr.find(item => item.id === response.id);
            item.title = response.albumTitle;
            setAllAlbums(arr);
            console.log(arr);

        }
    }


    return (
        <div className={`${styles.listContainer} 
            ${props.stateAsProp.detailsClicked ? ' animate__animated animate__fadeInDownBig' :  'animate__animated animate__fadeInUp'}
        `}
        
        >
            {
                index + 1 === album.userId &&
                    
                        <div key={album.id} className={styles.listCard}>
                            { !editClicked && <p className={`${styles.title} ${!editClicked ? 'animate__animated animate__fadeIn' : ''}`}>{title.substring(0, 17)}</p> }
                            {editClicked && (
                                <>
                                <input
                                    required
                                    type="text"
                                    placeholder={album.title.substring(0, 17)}
                                    value={albumTitle}
                                    onChange={(e) => setAlbumTitle(e.target.value)}
                                    className='animate__animated animate__fadeIn'
                                />
                                <FontAwesomeIcon icon={faSquareCheck} onClick={handleSubmitClick} />

                                </>
                                
                            )}
                            
                            <div className={styles.options}>
                                <p className={styles.button}>Buy</p>
                                <p onClick={handleEditClick} className={styles.button}>Edit</p>
                                <p onClick={handleDeleteClick} className={styles.button}>Delete</p>
                            </div>
                        </div>
                    
                
                
            }
        </div>
    );
}
