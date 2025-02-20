const observerConfig = { characterData: true };
const setComponentObserver = (query) => {
    console.log("running content.js");
    const targetNode = document.querySelector(query)?.parentNode;
    const observerCallback = (mutations) => {
        for (const mutation of mutations) {
            if (mutation.type === "characterData") {
                const listingText = document.getElementById("job-details")?.textContent;
                console.log("Job Text: ", listingText);
            }
        }
    };
    if (targetNode) {
        console.log("targetNode located");
        const listingObserver = new MutationObserver(observerCallback);
        listingObserver.observe(targetNode, observerConfig);
    }
    else {
        console.error("Somehow an unexpected error occurred, we never planned for this.");
    }
};
setComponentObserver("jobs-search__job-details--container");
