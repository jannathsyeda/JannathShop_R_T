function getUrl(name) {
    return new URL(`../assets/img/${name}`, import.meta.url).href;
}

export { getUrl }; 