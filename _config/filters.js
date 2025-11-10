import { DateTime } from "luxon";

export default function(eleventyConfig) {
	eleventyConfig.addFilter("readableDate", (dateObj, format, zone) => {
		// Formatting tokens for Luxon: https://moment.github.io/luxon/#/formatting?id=table-of-tokens
		return DateTime.fromJSDate(dateObj, { zone: zone || "utc" }).toFormat(format || "dd LLLL yyyy");
	});

	eleventyConfig.addFilter("htmlDateString", (dateObj) => {
		// dateObj input: https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#valid-date-string
		return DateTime.fromJSDate(dateObj, { zone: "utc" }).toFormat('yyyy-LL-dd');
	});

	// Get the first `n` elements of a collection.
	eleventyConfig.addFilter("head", (array, n) => {
		if(!Array.isArray(array) || array.length === 0) {
			return [];
		}
		if( n < 0 ) {
			return array.slice(n);
		}

		return array.slice(0, n);
	});

	// Return the smallest number argument
	eleventyConfig.addFilter("min", (...numbers) => {
		return Math.min.apply(null, numbers);
	});

	// Return the keys used in an object
	eleventyConfig.addFilter("getKeys", target => {
		return Object.keys(target);
	});

	// In your filters.js file
// In your filters.js file

// 1. Array Merge Filter (Fixes Nunjucks' broken array concatenation)
eleventyConfig.addFilter("arrayMerge", function arrayMerge(arr1, arr2) {
    const a1 = Array.isArray(arr1) ? arr1 : [];
    const a2 = Array.isArray(arr2) ? arr2 : [];
    return a1.concat(a2);
});

// Filter Tag List (Now includes de-duplication)
eleventyConfig.addFilter("filterTagList", function filterTagList(tags) {
    // 1. Force array and handle single string tags
    let tagsArray;
    // ... array coercion logic ...
    if (!tags) {
        tagsArray = [];
    } else if (typeof tags === 'string') {
        tagsArray = [tags];
    } else {
        tagsArray = tags;
    }

    // 2. Remove Duplicates (THE FIX)
    tagsArray = [...new Set(tagsArray)]; 

    // 3. Exclude all organizational tags, case-insensitively
    const tagsToExclude = ["all", "posts", "post"]; 

    return tagsArray.filter(tag => {
        const normalizedTag = String(tag).toLowerCase();
        return tagsToExclude.indexOf(normalizedTag) === -1;
    });
});

	

	eleventyConfig.addFilter("sortAlphabetically", strings =>
		(strings || []).sort((b, a) => b.localeCompare(a))
	);
};
