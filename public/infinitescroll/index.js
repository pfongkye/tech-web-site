window.onload = async function () {
    const result = await fetch("https://api.jikan.moe/v3/manga/1/characters");
    const mangaChars = await result.json();
    const images = mangaChars.characters.map(c => {
        const thumbnail = document.createElement("div");
        const caption = document.createElement("caption");
        caption.appendChild(document.createTextNode(c.name));
        const img = document.createElement("img");
        img.setAttribute("alt", c.name);
        img.setAttribute("src", c.image_url);
        thumbnail.append([caption, img]);
        return thumbnail;
    })
    document.getElementById("App").append(images);
}