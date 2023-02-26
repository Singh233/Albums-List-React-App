import { useState, useEffect, useRef, useContext } from 'react'
import { fetchAlbums } from '../api';
import styles from '../styles/app.module.scss'
import AlbumCard from './AlbumCard';
import Navbar from './Navbar';
import 'animate.css';

// Font Awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'
import CustomCursor from './CustomCursor';
import { MouseContext } from '../context/mouse-context';


function App() {
  const myRef = useRef(null); // This is a hook
  const { cursorType, cursorChangeHandler } = useContext(MouseContext); // This is a hook


  const {value, setValue} = useState(''); // This is a hook

  // componentDidMount equivalent
  useEffect(() => {
    console.log('component did mount');

    fetchAlbums().then((albums) => {
      console.log(albums);
    });

    return () => {
      console.log('component will unmount');
      // if (myRef && myRef.current) {
      //   console.log('scrolling to ref')
      //   myRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      // }
    }
  }, []);


  return (
    <div className="App">
      <CustomCursor />
      <Navbar />

      <div className={styles.mainContainer}>
        <div  className={`${styles.header} animate__animated animate__fadeIn`}>
          <p> <span>SELECT</span> THE ALBUM</p>
        </div>

        <div className={styles.leftBlock}></div>


        <div className={`${styles.albumsList} animate__animated `}>


          {/* <p className={styles.previousAlbum}> Album Title</p> */}

          <div className={styles.forMargin}></div>
          <AlbumCard />
          <AlbumCard />
          <AlbumCard scrollRef={myRef}/>
          <div className={styles.forMargin} ></div>


          {/* <p className={styles.nextAlbum}> Album Title </p> */}

          
          
        </div>

        <div className={styles.detailsButton}>
            <button>Details</button>
            <FontAwesomeIcon icon={faChevronDown} />
          </div>

        <div className={styles.rightBlock}></div>


      </div>
      

    </div>
  )
}

export default App
