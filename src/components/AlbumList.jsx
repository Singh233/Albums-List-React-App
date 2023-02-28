import React, { useEffect, useState } from 'react';
import styles from '../styles/albumList.module.scss';
import AlbumListCard from './AlbumListCard';




export default function AlbumList(props) {
    const { value } = props;
    const { allAlbums, setAllAlbums } = props.albumsState;
    const { detailsClicked, setDetailsClicked } = props.stateAsProp;
    
    
    if (!detailsClicked) {
        return (<div></div>);
    }
    

    

    return (
        <div className={`${styles.listContainer} 
            ${props.stateAsProp.detailsClicked ? ' animate__animated animate__fadeInUp' :  'animate__animated '}
        `} >
            {allAlbums.map((album, index) => {
                if (value + 1 === album.userId) {
                    return (
                        <AlbumListCard
                            key={index}
                            album={album}
                            albumsState={{ allAlbums, setAllAlbums }}
                            stateAsProp={{ detailsClicked, setDetailsClicked }}
                        />
                    );
                }
                
            })
            
            }
        </div>
    );
}
