import React, { useState } from 'react'; // Importing React and useState hook from React

// Defining props for the ImageDropzone component
interface ImageDropzoneProps {
    onImageUpload: (imageSrc: string) => void; // Callback function triggered on image upload
}

// Defining the ImageDropzone component as a functional component
const ImageDropzone: React.FC<ImageDropzoneProps> = ({ onImageUpload }) => {
    const [dragging, setDragging] = useState(false); // State variable to track dragging status, initialized to false

    // Event handler for drag over event
    const handleDragOver = (e: React.DragEvent<HTMLLabelElement>) => {
        e.preventDefault(); // Preventing default behavior for drag over event
        setDragging(true); // Setting dragging state to true
    };

    // Event handler for drag leave event
    const handleDragLeave = () => {
        setDragging(false); // Setting dragging state to false
    };

    // Event handler for drop event
    const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
        e.preventDefault(); // Preventing default behavior for drop event
        setDragging(false); // Setting dragging state to false
        const file = e.dataTransfer.files[0]; // Getting the dropped file
        const reader = new FileReader(); // Creating a FileReader object
        reader.onload = () => {
            if (typeof reader.result === 'string') {
                onImageUpload(reader.result); // Calling the provided callback function with the image source
            }
        };
        if (file) {
            reader.readAsDataURL(file); // Reading the dropped file as a data URL
        }
    };

    // Event handler for file change event
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files && e.target.files[0]; // Getting the selected file
        if (file) {
            const reader = new FileReader(); // Creating a FileReader object
            reader.onload = () => {
                if (typeof reader.result === 'string') {
                    onImageUpload(reader.result); // Calling the provided callback function with the image source
                }
            };
            reader.readAsDataURL(file); // Reading the selected file as a data URL
        }
    };

    // Rendering the ImageDropzone component
    return (
        <div className="flex items-center justify-center w-full">
            <label
                htmlFor="dropzone-file"
                className={`flex flex-col items-center justify-center w-64 h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 ${dragging ? 'dark:hover:bg-gray-600' : 'dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500'}`}
                onDragOver={handleDragOver} // Drag over event handler
                onDragLeave={handleDragLeave} // Drag leave event handler
                onDrop={handleDrop} // Drop event handler
            >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    {/* SVG icon */}
                    <svg
                        className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 20 16"
                    >
                        <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                        />
                    </svg>
                    {/* Instructions */}
                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                        <span className="font-semibold">Click to upload</span> or drag and drop
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or WebP</p>
                </div>
                {/* Input field for file selection */}
                <input
                    id="dropzone-file"
                    type="file"
                    className="hidden"
                    onChange={handleFileChange} // File change event handler
                    accept="image/*" // Accepting only image files
                />
            </label>
        </div>
    );
};

export default ImageDropzone; // Exporting the ImageDropzone component
