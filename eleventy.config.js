module.exports = function(eleventyConfig) {
    // Beritahu Eleventy untuk salin terus fail CSS dan JS abang ke folder siap
    eleventyConfig.addPassthroughCopy("style.css");
    eleventyConfig.addPassthroughCopy("script.js");
    eleventyConfig.addPassthroughCopy("assets");

    return {
        dir: {
            input: ".",         // Cari fail mentah di folder utama
            output: "_site"     // Hantar fail HTML yang dah siap ditukarkan ke folder _site
        }
    };
};