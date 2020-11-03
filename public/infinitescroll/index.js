window.onload = async function () {
    const app = document.getElementById("App");
    let next = 1;

    window.addEventListener("scroll", async () => {
        if (window.scrollY > app.offsetHeight - window.visualViewport.height) {
            next++;
            app.appendChild(await getThumbnails(next));
        }
    })

    app.appendChild(await getThumbnails(next));
}

async function getThumbnails(next) {
    try {
        const result = await fetch(`https://api.jikan.moe/v3/manga/${next}/characters`);
        const mangaChars = await result.json();
        //a document fragment is stored in memory, and not added to DOM tree -> perf optimization
        //https://developer.mozilla.org/en-US/docs/Web/API/Document/createDocumentFragment
        const docFragment = document.createDocumentFragment();

        if (Array.isArray(mangaChars.characters)) {
            mangaChars.characters.forEach(c => {
                const thumbnail = document.createElement("figure");
                const caption = document.createElement("figcaption");
                caption.appendChild(document.createTextNode(c.name));
                const img = document.createElement("img");
                img.setAttribute("alt", c.name);
                img.setAttribute("src", c.image_url);
                thumbnail.append(img, caption);
                docFragment.append(thumbnail);
            });
        }

        return docFragment;
    } catch (e) {
        console.error(e);
    }
}