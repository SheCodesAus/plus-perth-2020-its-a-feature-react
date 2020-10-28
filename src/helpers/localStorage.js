export function clearStorage(){
    window.localStorage.clear();
};

export function setStorage(name,value){
    window.localStorage.setItem(name,value);
};

export function getStorage(name){
    return window.localStorage.getItem(name);
};

export function isAuthenticated() {
    let token = getStorage("token");
    if (token != null) {
        return true;
    } else {
        return false;
    }
};

export function isOwner(owner){
    return(owner === window.localStorage.getItem("user"))
}

