import axios from 'axios';
import { apiHeader } from './Auth';
export function getCategories() {
    return axios.get(
        'http://localhost:8000/api/categories'
    );
}

export function createCategory(params) {
    return axios.post(
        'http://localhost:8000/api/category/create/' + localStorage.getItem('User_id').replace(/['"]+/g, ''),
        params["category"],
        apiHeader()
    );
}

export function updateCategory(params) {
    return axios.put(
        'http://localhost:8000/api/category/' + params["id"] + '/' + localStorage.getItem('User_id').replace(/['"]+/g, ''),
        params["categoryForm"]["category"],
        apiHeader()
    );
}

export function deleteCategory(id) {
    return axios.delete(
        'http://localhost:8000/api/category/' + id + '/' + localStorage.getItem('User_id').replace(/['"]+/g, ''),
        apiHeader()
    );
}