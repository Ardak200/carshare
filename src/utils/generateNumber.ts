const generateNumber = () => {
    var uid = (new Date().getTime()).toString(36)
    return uid;
}

export default generateNumber;