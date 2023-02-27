import React, { useEffect, useState } from 'react';
import styles from '../styles/albumList.module.scss';

export default function AlbumList(props) {
    const { albums, index } = props;

    return (
        <div className={`${styles.listContainer} animate__animated animate__fadeInUp
            ${props.stateAsProp.detailsClicked ? 'animate__animated animate__fadeInUp' : ''}
        `}
        
        >
            {albums.map((album) => {
                if (index + 1 === album.userId) {
                    return (
                        <div key={album.id} className={styles.listCard}>
                            <p className={styles.title}>{album.title.substring(0, 22)}</p>
                            <p className={styles.button}>Buy</p>
                        </div>
                    );
                }
                
            })}
        </div>
    );
}
