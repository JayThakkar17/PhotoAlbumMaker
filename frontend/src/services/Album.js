import axios from 'axios';
import { apiHeader } from './Auth';
export function getAlbums() {
    return axios.get(
        'http://localhost:8000/api/albums/' + localStorage.getItem('User_id').replace(/['"]+/g, ''),
        apiHeader()
    );
}

export function createAlbum(params) {
    return axios.post(
        'http://localhost:8000/api/album/create/' + localStorage.getItem('User_id').replace(/['"]+/g, ''),
        params["album"],
        apiHeader()
    );
}

export function updateAlbum(params) {
    return axios.put(
        'http://localhost:8000/api/album/' + params["id"] + '/' + localStorage.getItem('User_id').replace(/['"]+/g, ''),
        params["albumForm"]["album"],
        apiHeader()
    );
}

export function deleteAlbum(id) {
    return axios.delete(
        'http://localhost:8000/api/album/' + id + '/' + localStorage.getItem('User_id').replace(/['"]+/g, ''),
        apiHeader()
    );
}

export function UploadPhoto(params, id) {
    return axios.post(
        'http://localhost:8000/api/photo/store/' + id,
        params
    );
}

export function getPhotos(id) {
    return axios.get(
        'http://localhost:8000/api/photo/' + id
    );
}