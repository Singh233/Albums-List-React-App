import React, { useContext, useState } from 'react';
import { MouseContext } from '../context/mouse-context';

import styles from '../styles/albumCard.module.scss';

const AlbumCard = (props) => {
    const { cursorType, cursorChangeHandler } = useContext(MouseContext);
    const { value, setValue } = props.stateAsProp;
    const { album, index } = props;

    // get ref of the element to scroll to
    

    const handleClick = (e) => {
        
        if (e.target) {
            setTimeout(() => {
                setValue(index);
            }, 300);
            // e.target.clasList.add('animate__animated animate__faster animate__fadeInRight');
            e.target.scrollIntoView({
                behavior: 'smooth',
                inline: 'center',
            });
        }
    };

    return (
        <div className={`${styles.albumCard}`}>
            <div
                className={`${styles.albumCardImage} animate__animated animate__faster animate__fadeInRight`}
            >
                <img
                    src="https://wallpapercave.com/wp/wp5029986.jpg"
                    alt="album cover"
                />
            </div>

            <div
                onMouseEnter={() => cursorChangeHandler('hovered')}
                onMouseLeave={() => cursorChangeHandler('')}
                onClick={handleClick}
                className={`${styles.albumCardInfo} animate__animated animate__fadeInRight`}
            >
                <p className={`${styles.albumCardTitle} ${
                        index !== value ? styles.active : ''
                    }`} >
                        <span className={styles.id}>{album.userId}</span>
                        
                    Album-Title
                    {/* <span className={styles.info}>Click on see details to view list</span> */}
                </p>
            </div>
        </div>
    );
}

export default AlbumCard;

