export function extractAndFormatDates(text1, text2) {
    // Combine both texts
    var combinedText = text1 + ' ' + text2;

    // Regular expression to match dates in various formats
    var dateRegex = /((0?[1-9]|1[0-2])\/(0?[1-9]|[12][0-9]|3[01])\/(19|20)?\d{2})/g;

    // Extract dates from the combined text
    var dates = combinedText.match(dateRegex);

    // Remove duplicates and filter out dates that are not in full format
    if (dates !== null) {
        var uniqueDates = Array.from(new Set(dates)).filter(date => {
            var parts = date.split('/');
            return parts.length === 3 && parts[2].length === 4; // Check if the date is in full format (mm/dd/yyyy)
        });

        // Parse dates into Date objects
        var parsedDates = uniqueDates.map(dateStr => new Date(dateStr));

        // Sort dates in descending order
        parsedDates.sort((a, b) => b - a);

        // Take the first two dates
        var latestTwoDates = parsedDates.slice(0, 2);

        // Format the extracted dates into mm/dd/yyyy format
        var formattedDates = latestTwoDates.map(date => {
            var month = (date.getMonth() + 1).toString().padStart(2, '0');
            var day = date.getDate().toString().padStart(2, '0');
            var year = date.getFullYear().toString().padStart(4, '0');
            return month + '/' + day + '/' + year;
        });

        // Return the two latest dates as separate strings
        return formattedDates;
    }

    return [];
}



export function extractAddress(text) {
    // Regular expression to match the address format with zipcode
    const addressRegex = /\bAddress\s*([\s\S]*?)\b(\d{5})\b/i;
    const match = text.match(addressRegex);
    if (match && match[1] && match[2]) {
        // Remove leading and trailing spaces and punctuation
        const address = match[1].trim().replace(/[^\w\s]/g, '');
        const zipcode = match[2];
        return `${address} ${zipcode}`;
    } else {
        return "Address and Zipcode not found";
    }
}

export function extractDriverLicenseNumbers(text, text1) {
    const licenseRegex = /[A-Za-z]\d{8}/g;
    const matches = text.match(licenseRegex);

    if (matches) {
        return matches;
    } else {
        const matches = text1.match(licenseRegex);
        if (matches) {
            return matches;
        } else {
            return "Driver's license numbers not found";
        }
    }
}



export function parseName(inputString, inputString2) {
    // Find the index of the keyword "name" and "address"
    const nameIndex = inputString.indexOf('Name');
    const addressIndex = inputString.indexOf('Address');

    // If "name" or "address" is not found, return null
    if (nameIndex === -1 || addressIndex === -1) {
        if (inputString2.length === 'undefined') {
            return "Driver's name not found";
        } else {
            return parseName(inputString2, "")
        }

    }

    // Extract the substring between "name" and "address"
    const nameSubstring = inputString.substring(nameIndex + 4, addressIndex).trim();

    // Remove non-letter characters using regular expression
    const cleanName = nameSubstring.replace(/[^a-zA-Z\s]/g, '');

    return cleanName;
}

export function VA(str) {
    // Convert the string to lowercase for case-insensitive matching
    str = str.toLowerCase();
    // Check if "va" is present in the string
    if (str.includes("va")) {
        return true;
    } else {
        return false;
    }
}