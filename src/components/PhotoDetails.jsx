import { useParams, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getPhotos } from '../api/homeApi.js';

export function PhotoDetails() {
    const { photoId } = useParams();
    const location = useLocation();
    const photo = location.state?.photo;

    useEffect(() => {
        if (location.state?.photo) {
            return; // Skip fetching if photo is in the passed state via react router
        }

        const fetchAllPhotos = async () => {
            const response = await fetch(``)
        }
    })

    if(!photo) {
        return(<p>Photo state is missing</p>);
    }

    return (
        <>
            <p>{photoId}</p>
            <p>{photo.title}</p>
        </>
    )
}