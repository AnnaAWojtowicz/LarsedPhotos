import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

export function Album() {

    const { albumId } = useParams();

    useEffect(() => {
        // Fetch album photos here

    }, []);

    return (
        <div className="album">
            <h1>Album {albumId}</h1>
        </div>
    );
}