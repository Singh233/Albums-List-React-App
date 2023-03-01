import React, { useEffect, useState } from 'react'

import styles from '../styles/albumList.module.scss';
// Font Awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCreditCard } from '@fortawesome/free-solid-svg-icons'
import { faPen } from '@fortawesome/free-solid-svg-icons'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { faSquareCheck } from '@fortawesome/free-solid-svg-icons'
import { deleteAlbums, updateAlbums } from '../api';
import toast, { Toaster } from 'react-hot-toast';


export default function AlbumListCard(props) {
    const { album } = props;


    const [ editClicked, setEditClicked ] = useState(false);

    const [ deleteClicked, setDeleteClicked ] = useState(''); // yes, no and remove for remove animation


    const [ albumTitle, setAlbumTitle ] = useState('');

    const [ title, setTitle ] = useState(album.title);

    const { allAlbums, setAllAlbums } = props.albumsState;
    const { detailsClicked, setDetailsClicked } = props.stateAsProp;

    

    // handle edit clicked
    const handleEditClick = (e) => {
        console.log('edit clicked');
        if (!editClicked) {
            toast('Change album title!');
        }
        setEditClicked(!editClicked);
        
    }
    // handle delete clicked
    const handleDeleteClick = async (e) => {
        console.log('delete clicked');
        
        const response =  deleteAlbums(album.id);

        await toast.promise(response, {
            loading: 'Deleting album...',
            success: 'Album deleted successfully',
            error: 'Error when deleting!',
        });
        if (response) {
            let arr = [...allAlbums];
            let item = arr.find(item => item.id === album.id);
            let index = arr.indexOf(item);
            arr.splice(index, 0);
            setAllAlbums(arr);
            
            console.log('delete---', allAlbums);
        }
        setDeleteClicked('yes');
    }

    // handle submit click
    const handleSubmitClick = async (e) => {
        const data = {
            userId: album.userId,
            albumId: album.id,
            albumTitle: albumTitle
        }
        if (albumTitle === '') {
            await toast.promise(updateAlbums(data), {
                loading: 'Updating album...',
                success: 'No changes made!',
                error: 'Error when updating!',
            });
            setAlbumTitle(album.title);
            setEditClicked(!editClicked);

            return;
        }
        
        const response = updateAlbums(data);

        await toast.promise(response, {
            loading: 'Updating album...',
            success: 'Album updated successfully',
            error: 'Error when updating!',
        });
        
        setEditClicked(!editClicked);
        setTitle(albumTitle);
        console.log(title);
        if (response) {
            let arr = [...allAlbums];
            let item = arr.find(item => item.id === response.id);
            item.title = response.albumTitle;
            setAllAlbums(arr);
            console.log(arr);

        }
    }

    useEffect(() => {
        if (deleteClicked) {
            setTimeout(() => {
                console.log('first')
                setDeleteClicked('remove');
            }, 600);
        }
    }, [deleteClicked]);

    // if (deleteClicked) {
    //     return (<div></div>);
    // }

    return (
        <div key={album.id} 
            className={`${styles.listCard} 
            ${deleteClicked === 'yes' ? 'animate__animated animate__fadeOutLeftBig ' : deleteClicked === 'remove' ? styles.remove : ''}`}>
                { !editClicked && 
                <p className={`${styles.title} ${!editClicked ? 'animate__animated animate__fadeIn' : ''}`}>
                    {title.substring(0, 17)}</p> 
                }
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
    )
}
