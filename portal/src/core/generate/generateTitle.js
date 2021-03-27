const generateTitle = value => {
    value = value.split('_');
    let text = '';
    if (value.length > 1) {
        value.forEach(el => text = `${text} ${el.charAt(0).toUpperCase() + el.slice(1)}`)
        return text;
    }
    return value[0].charAt(0).toUpperCase() + value[[0]].slice(1);
};

export default generateTitle;
