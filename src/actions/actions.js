export const SET_MOVIES = 'SET_MOVIES';
export const SET_FILTER = 'SET_FILTER';
export const SET_USER = 'SET_USER';
export const SET_FAVORITE = 'SET_FAVORITE';
export const UPDATE_USER = 'UPDATE_USER';
export const DELETE_USER = 'DELETE_USER';
export const DELETE_FAVORITE = 'DELETE_FAVORITE';

export function setMovies(value) {
    return { 
        type: SET_MOVIES, 
        value 
    };
}

export function setFilter(value) {
    return { 
        type: SET_FILTER, 
        value 
    };
}

export function setUser(value) {
    return { 
        type: SET_USER, 
        value 
    };
}

export function setFavorite(value) {
    return { 
        type: SET_FAVORITE, 
        value 
    };
}

export function updateUser(value) {
    return { 
        type: UPDATE_USER, 
        value 
    };
}

export function deleteUser(value) {
    return { 
        type: DELETE_USER, 
        value 
    };
}

export function deleteFavorite(value) {
    return { 
        type: DELETE_FAVORITE, 
        value 
    };
}