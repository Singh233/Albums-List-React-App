import React, { useEffect, useState } from 'react';
import styles from '../styles/albumList.module.scss';

// Font Awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCreditCard } from '@fortawesome/free-solid-svg-icons'
import { faPen } from '@fortawesome/free-solid-svg-icons'
import { faTrash } from '@fortawesome/free-solid-svg-icons'


export default function AlbumList(props) {
    const { album, albums, index } = props;
    const [ editClicked, setEditClicked ] = useState(false);

    const [ albumTitle, setAlbumTitle ] = useState('');

    // handle edit clicked
    const handleEditClick = (e) => {
        console.log('edit clicked');
        setEditClicked(!editClicked);
    }
    // handle delete clicked
    const handleDeleteClick = (e) => {
        console.log('delete clicked');
    }


    return (
        <div className={`${styles.listContainer} 
            ${props.stateAsProp.detailsClicked ? ' animate__animated animate__fadeInDownBig' :  'animate__animated animate__fadeInUp'}
        `}
        
        >
            {
                index + 1 === album.userId &&
                    
                        <div key={album.id} className={styles.listCard}>
                            { !editClicked && <p className={styles.title}>{album.title.substring(0, 17)}</p> }
                            {editClicked && (
                                <input
                                    required
                                    type="text"
                                    placeholder={album.title.substring(0, 17)}
                                    value={albumTitle}
                                    onChange={(e) => setAlbumTitle(e.target.value)}
                                />
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
