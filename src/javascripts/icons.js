const loadFontAwesome = () => {
    const script = document.createElement('script');
    script.src = 'https://kit.fontawesome.com/9a6abd3de1.js';
    script.crossOrigin = 'anonymous';
    document.head.appendChild(script);
};


export default loadFontAwesome;