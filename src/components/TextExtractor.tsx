import React, { useState } from 'react'; // Importing React and useState hook from React
import { PSM } from 'tesseract.js'; // Importing PSM (Page Segmentation Mode) enum from tesseract.js
import { createWorker } from 'tesseract.js'; // Importing createWorker function from tesseract.js
import { extractAndFormatDates, extractAddress, extractDriverLicenseNumbers, parseName, VA } from "./func"; // Importing various utility functions from "./func" file

// Defining props for the TextExtractor component
interface TextExtractorProps {
    image: string | null; // Image source, can be string or null
    setExtractedInfo: (info: any | null) => void; // Setter function for extracted information
}

// Defining the TextExtractor component as a functional component
const TextExtractor: React.FC<TextExtractorProps> = ({ image, setExtractedInfo }) => {
    const [loading, setLoading] = useState(false); // State variable to track loading status, initialized to false

    // Asynchronous function to extract text from the provided image
    const extractTextFromImage = async () => {
        if (!image) { // If no image is provided, show alert and return
            alert('Please select an image first.');
            return;
        }

        setLoading(true); // Set loading state to true

        try {
            const worker = await createWorker('eng'); // Creating a Tesseract.js worker with English language
            const worker2 = await createWorker('eng'); // Creating another Tesseract.js worker with English language
            const worker3 = await createWorker('eng'); // Creating another Tesseract.js worker with English language

            // Configuring Tesseract.js workers with specific page segmentation modes
            await worker.setParameters({
                tessedit_pageseg_mode: PSM.SINGLE_COLUMN, // Setting page segmentation mode to SINGLE_COLUMN
            });
            await worker3.setParameters({
                tessedit_pageseg_mode: PSM.SPARSE_TEXT, // Setting page segmentation mode to SPARSE_TEXT
            });
            await worker2.setParameters({}); // No specific parameters set for the second worker

            // Recognizing text from the image using each worker and getting the text data
            const data1 = await (await worker.recognize(image)).data.text; // Recognizing text with the first worker
            const data2 = await (await worker2.recognize(image)).data.text; // Recognizing text with the second worker
            const data3 = await (await worker3.recognize(image)).data.text; // Recognizing text with the third worker

            // If the extracted text corresponds to the state of Virginia (VA), perform further extraction
            if (VA(data1)) {
                const extractedAddress = extractAddress(data1); // Extracting address from the text
                const extractedDateIss = extractAndFormatDates(data1)[1]; // Extracting and formatting issue date
                const extractedDateExp = extractAndFormatDates(data1)[0]; // Extracting and formatting expiry date
                const extractedDL = extractDriverLicenseNumbers(data1, data2); // Extracting driver's license numbers
                const extractedNames = parseName(data1, data3); // Parsing and extracting names

                // Setting the extracted information using the provided setter function
                setExtractedInfo({
                    extractedNames,
                    extractedDL,
                    extractedDateIss,
                    extractedDateExp,
                    extractedAddress
                });
            }

            // Terminating all Tesseract.js workers after processing
            await worker.terminate();
            await worker2.terminate();
            await worker3.terminate();
        } catch (error) {
            console.error('Error extracting text:', error); // Logging error if any occurs during text extraction
        } finally {
            setLoading(false); // Resetting loading state to false, regardless of success or failure
        }
    };

    // Rendering the TextExtractor component
    return (
        <div>
            {/* Button to trigger text extraction, with loading indicator */}
            <button
                onClick={extractTextFromImage} // Click event handler to trigger text extraction
                disabled={loading} // Disabling button if currently loading
                type="button"
                className={`py-4 text-xl text-white bg-gray-800 px-7 hover:bg-gray-700 border border-white ${loading && "cursor-not-allowed opacity-50"
                    }`}
            >
                {loading ? ( // Conditional rendering based on loading state
                    <>
                        <svg
                            aria-hidden="true"
                            role="status"
                            className="inline w-4 h-4 me-3 text-white-200 animate-spin dark:text-white-600"
                            viewBox="0 0 100 101"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                fill="currentColor"
                            />
                            <path
                                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                fill="#1C64F2"
                            />
                        </svg>
                        Loading...
                    </>
                ) : (
                    "Extract Text"
                )}
            </button>
        </div>
    );
};

export default TextExtractor; // Exporting the TextExtractor component
