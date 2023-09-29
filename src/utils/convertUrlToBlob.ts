export const convertUrlToBlob = (url:string) => {
    let image = new Image()

    fetch("http://192.168.1.2:8092" + url)
        .then(res => res.blob()) // Gets the response and returns it as a blob
        .then(blob => {
            // Here's where you get access to the blob
            // And you can use it for whatever you want
            // Like calling ref().put(blob)

            // Here, I use it to make an image appear on the page
            image.src = URL.createObjectURL(blob);
        });

    return image;
}