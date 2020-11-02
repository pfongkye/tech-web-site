window.onload = async function () {
    const result = await fetch("https://api.jikan.moe/v3/manga/1/characters");
    const mangaChars = await result.json();
    //a document fragment is stored in memory, and not added to DOM tree -> perf optimization
    //https://developer.mozilla.org/en-US/docs/Web/API/Document/createDocumentFragment
    const docFragment = document.createDocumentFragment();

    mangaChars.characters.forEach(c => {
        const thumbnail = document.createElement("div");
        const caption = document.createElement("caption");
        caption.appendChild(document.createTextNode(c.name));
        const img = document.createElement("img");
        img.setAttribute("alt", c.name);
        img.setAttribute("src", c.image_url);
        thumbnail.append(caption, img);
        docFragment.append(thumbnail);
    })

    document.getElementById("App").appendChild(docFragment);
}