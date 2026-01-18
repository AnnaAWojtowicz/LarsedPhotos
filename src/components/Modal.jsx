import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import '../styles/modal.css';

export function Modal({ selectedPhoto, photos, onClose }) {

    const [activePhoto, setActivePhoto] = useState(null);

    useEffect(() => {
        const photo = photos.find(x => x.id == selectedPhoto);
        setActivePhoto(photo);
    }, [selectedPhoto, photos]); // Runs on those props change

    const advancePhoto = (i) => {
        const nextIndex = photos.findIndex(x => x.id == activePhoto.id) + i;
        setActivePhoto(photos[nextIndex]);
    }

    if(!activePhoto)
        return null;

    return (
        <div className='modal-overlay' onClick={onClose}>
            <div className='modal-content' onClick={(e) => e.stopPropagation()}>
                <button className='modal-close' onClick={onClose}>
                    <span className="material-symbols-outlined">
                        close_small
                    </span>
                </button>
                <button className='modal-propagate-arrow' id='modal-left-arrow' onClick={() => advancePhoto(-1)}>
                    <span className="material-symbols-outlined">
                        arrow_circle_left
                    </span>
                </button>
                <button className='modal-propagate-arrow' id='modal-right-arrow' onClick={() => advancePhoto(1)}>
                    <span className="material-symbols-outlined">
                        arrow_circle_right
                    </span>
                </button>
                <img src={activePhoto.url800} alt={activePhoto.title} />
                <figcaption>{activePhoto.title}</figcaption>
            </div>
        </div>
    );
}

Modal.propTypes = {
    selectedPhoto: PropTypes.object,
    photos: PropTypes.array.isRequired,
    onClose: PropTypes.func.isRequired,
};