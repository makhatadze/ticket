export default {
    handleLocalStorage: {
        set(key, value, exprid=99999999) {
            let data = {
                value,
                expirse: Date.now() + exprid
            };
            localStorage.setItem(key, JSON.stringify(data));
        },
        get(key) {
            let data = JSON.parse(localStorage.getItem(key));
            if(data && data.expirse>=Date.now()){
                const { expirse, value } = data;
                return value;
            }else{
                localStorage.removeItem(key);
                return;
            }
        },
        removeItem(key) {
            localStorage.removeItem(key);
        },
        clear() {
            localStorage.clear();
        }
    }
}