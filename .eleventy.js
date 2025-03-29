const { DateTime } = require("luxon");

module.exports = function(eleventyConfig) {

    eleventyConfig.addPassthroughCopy("./src/style.css");
    eleventyConfig.addPassthroughCopy("./src/assets");

    eleventyConfig.addFilter("postDate", (dateObj) => {
        return DateTime.fromJSDate(dateObj).toFormat("dd LLLL yyyy");
        }
    );

    // Add global data for current year
    eleventyConfig.addGlobalData('currentYear', () => {
        return DateTime.now().year;
    });

    // Add a filter to format dates
    eleventyConfig.addFilter("formatDate", function(date) {
        return new Date(date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric"
        });
    });
    
    // Add a filter to truncate text
    eleventyConfig.addFilter("truncate", function(text, length) {
        if (text.length > length) {
        return text.substring(0, length) + "...";
        }
        return text;
    });
    
    // Add a filter to convert text to uppercase
    eleventyConfig.addFilter("uppercase", function(text) {
        return text.toUpperCase();
    });
    
    // Add a filter to convert text to lowercase
    eleventyConfig.addFilter("lowercase", function(text) {
        return text.toLowerCase();
    });
    
    // Add a filter to convert text to title case
    eleventyConfig.addFilter("titleCase", function(text) {
        return text.replace(/\w\S*/g, function(txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        });
    });

    return {
        dir: {
            input: "src",
            output: "public"
        }
    };

}