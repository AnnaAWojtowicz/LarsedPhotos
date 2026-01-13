
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';

export function SingleImageView() {
    const location = useLocation();
    const { title, image_url } = location.state || {};

    if (!title || !image_url) {
        return <div>No image data available. Please navigate from the gallery.</div>;
    }

    return(
        <>
            <title>{title}</title>
            <img src={image_url} alt={title} />
        </>
    );
}

SingleImageView.propTypes = {
    title: PropTypes.string,
    image_url: PropTypes.string,
};