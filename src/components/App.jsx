import { useState, useEffect, useRef, useContext } from 'react'
import { fetchAlbums } from '../api';
import styles from '../styles/app.module.scss'
import AlbumCard from './AlbumCard';
import Navbar from './Navbar';
import 'animate.css';

// Toast
import toast from 'react-hot-toast';


// Font Awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'
import CustomCursor from './CustomCursor';
import { MouseContext } from '../context/mouse-context';
import AlbumList from './AlbumList';
import AddAlbumCard from './AddAlbumCard';


function App() {
  const { cursorType, cursorChangeHandler } = useContext(MouseContext); // This is a hook

  const myRef = useRef(null);

  // state for displaying albums on home page
  const [ homeAlbums, setHomeAlbums ] = useState([]); 

  // state for displaying all albums
  const [ allAlbums, setAllAlbums ] = useState([]);

  const [ detailsClicked, setDetailsClicked ] = useState(false);

  const [ removeView, setRemoveView ] = useState(false);

  const [value, setValue] = useState(0); 

  // state for add album card
  const [ addAlbumCard, setAddAlbumCard ] = useState(false);
  // componentDidMount equivalent
  useEffect(() => {
    const data = async () => await fetchAlbums();

    
    
    data().then((res) => {
      const arr = res.filter((album, index) => index % 10 == 0);
      setHomeAlbums(arr);
      setAllAlbums(res);
    });

    return () => {
      // cleanup
      toast.promise(fetchAlbums(), {
        loading: 'Loading',
        success: 'Albums fetched successfully',
        error: 'Error when fetching',
      });
    }


  }, []);

  // See details clicked 

  const handleClick = (e) => {
        

    setDetailsClicked(true);

    setTimeout(() => {
      setRemoveView(true);
      
    }, 250);

  
};

// handle submit for add album card
const handleSubmit = (e) => {
  e.preventDefault();
  console.log('submitted');
}


  return (
    <div className="App">
      <CustomCursor />
      <Navbar 
        detailsState={{detailsClicked, setDetailsClicked}} 
        passRef={myRef}
        removeViewState={{removeView, setRemoveView}}
        addAlbumCardState={{addAlbumCard, setAddAlbumCard}}
        />

      <div className={` 
          ${styles.mainContainer} 
          ${detailsClicked ? 'animate__animated animate__fadeOutUpBig' : 'animate__animated '}
          ${removeView ? styles.remove : ''}
          `}>
        <div  className={`${styles.header} animate__animated animate__fadeIn`}>
          <p> <span>SELECT</span> THE ALBUM</p>
        </div>

        <div className={styles.leftBlock}></div>


        <div className={`${styles.albumsList} animate__animated `}>


          {/* <p className={styles.previousAlbum}> Album Title</p> */}

          <div className={styles.forMargin}></div>
          
          <AddAlbumCard passRef={myRef} albumsState={{allAlbums, setAllAlbums}} addAlbumCardState={{addAlbumCard, setAddAlbumCard}}/>
          {/* for loop */
            homeAlbums.map((album, index) => {
              return (
                <AlbumCard 
                  stateAsProp={{value, setValue}} 
                  key={index} 
                  index={index} 
                  album={album} 
                  addAlbumCardState={{addAlbumCard, setAddAlbumCard}}

                  />
              )
            })
          }
          <div className={styles.forMargin} ></div>


          {/* <p className={styles.nextAlbum}> Album Title </p> */}

          
          
        </div>

        <div
          onMouseEnter={() => cursorChangeHandler('detailsHovered')}
          onMouseLeave={() => cursorChangeHandler('')}
          onClick={addAlbumCard ? handleSubmit : handleClick} 
          className={`${styles.detailsButton} ${addAlbumCard ? styles.hide : ''}`}>
            <button>{addAlbumCard ? 'Submit' : 'Details' }</button>
            <FontAwesomeIcon icon={faChevronDown} />
          </div>

        <div className={styles.rightBlock}></div>


      </div>

      
        <AlbumList
            albumsState={{ allAlbums, setAllAlbums }}
            stateAsProp={{ detailsClicked, setDetailsClicked }}
            value={value}
        />
            

    </div>
  )
}

export default App
