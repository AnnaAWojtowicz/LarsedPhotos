import { useParams } from 'react-router-dom';


export function PhotoDetails() {
    const { photoId } = useParams();


    return (
        <>
            <p>{photoId}</p>
        </>
    )
}