window.onload = async function () {
    const app = document.getElementById("App");
    let next = 1;

    app.addEventListener("scroll", () => {
        if (app.scrollTop > app.offsetHeight - 10) {
            next++;
            app.appendChild(await getThumbnails(next));
        }
    })

    app.appendChild(await getThumbnails(next));
}

async function getThumbnails(next) {
    const result = await fetch(`https://api.jikan.moe/v3/manga/${next}//characters`);
    const mangaChars = await result.json();
    //a document fragment is stored in memory, and not added to DOM tree -> perf optimization
    //https://developer.mozilla.org/en-US/docs/Web/API/Document/createDocumentFragment
    const docFragment = document.createDocumentFragment();

    mangaChars.characters.forEach(c => {
        const thumbnail = document.createElement("figure");
        const caption = document.createElement("figcaption");
        caption.appendChild(document.createTextNode(c.name));
        const img = document.createElement("img");
        img.setAttribute("alt", c.name);
        img.setAttribute("src", c.image_url);
        thumbnail.append(caption, img);
        docFragment.append(thumbnail);
    });

    return docFragment;
}