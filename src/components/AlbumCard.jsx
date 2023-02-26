import React from 'react'

import styles from '../styles/albumCard.module.scss';

export default function AlbumCard(props) {

    return (
        <div  className={`${styles.albumCard}`}>
            <div className={`${styles.albumCardImage} animate__animated animate__fadeInRight`} >
                <img src="https://wallpapercave.com/wp/wp5029986.jpg" alt="album cover" />
            </div>

            <div className={`${styles.albumCardInfo} animate__animated animate__fadeInRight`}>
                <p ref={props.scrollRef} className={styles.albumCardTitle}>Album Title</p>
            </div>
        </div>
    )
}
