import React, { useState } from 'react'; // Importing React and useState hook
import logo from './gear-512.png'; // Importing logo image
import '../App.css'; // Importing CSS file

import CustomWebcam from "./CameraCapture"; // Importing CustomWebcam component
import TextExtractor from './TextExtractor'; // Importing TextExtractor component
import ImageDropzone from './ImageDropzone'; // Importing ImageDropzone component

import test from "./test.jpg"; // Importing test image
import test1 from "./test3.jpg"; // Importing test1 image
import test2 from "./test4.jpg"; // Importing test2 image
import test3 from "./test1.jpg"; // Importing test3 image
import test4 from "./test2.jpg"; // Importing test4 image

// Enum for different modes of the application
enum Mode {
  CameraCapture,
  ImageUpload,
  ExampleImage
}

// Main App component
function App() {
  const [mode, setMode] = useState<Mode | null>(null); // State for mode of the application
  const [url, setUrl] = useState<string | null>(null); // State for URL of the image
  const [extractedInfo, setExtractedInfo] = useState<any | null>(null); // State for extracted information

  // Function to handle capturing an image
  const handleCapture = (imageSrc: string) => {
    setUrl(imageSrc); // Set the URL of the captured image
  };

  // Function to handle selecting an example image
  const handleExampleImage = (imageName: string) => {
    setExtractedInfo(null); // Reset extractedInfo when selecting a new example image

    // Set URL based on the selected example image
    if (imageName === 'test') {
      setUrl(test);
    } else if (imageName === 'test1') {
      setUrl(test1);
    } else if (imageName === 'test2') {
      setUrl(test2);
    } else if (imageName === 'test3') {
      setUrl(test3);
    } else if (imageName === 'test4') {
      setUrl(test4);
    }
    setMode(Mode.ExampleImage); // Keep mode as ExampleImage
  };

  // Function to handle uploading an image
  const handleImageUpload = (imageSrc: string) => {
    setUrl(imageSrc); // Set the URL of the uploaded image
    setMode(null); // Reset mode after uploading an image
  };

  // Function to handle changing the mode of the application
  const handleModeChange = (selectedMode: Mode) => {
    setUrl(null); // Reset URL when mode changes
    setExtractedInfo(null); // Reset extractedInfo when mode changes
    setMode(selectedMode); // Set the new mode
  };

  // Function to handle deleting the current image
  const handleDelete = () => {
    setUrl(null); // Reset URL when delete button is pressed
    setExtractedInfo(null); // Reset extractedInfo when delete button is pressed
  };

  // Function to handle resetting all states
  const handleResetAll = () => {
    setUrl(null); // Reset URL
    setExtractedInfo(null); // Reset extractedInfo
    setMode(null); // Reset mode
  };

  // Rendering the App component
  return (
    <div className="App">
      <header className="App-header">
        {/* Logo and application title */}
        <div className="flex flex-col items-center justify-center">
          <img src={logo} className="App-logo mb-4" alt="logo" />
          <h1 className="text-4xl font-bold text-center text-white-900">IDScraper (Prototype)</h1>
        </div>
        <div className="mb-6" />

        {/* Buttons for choosing the mode */}
        <div className="space-x-4">
          {/* Button for capturing image */}
          <a href="#_" className="relative p-0.5 inline-flex items-center justify-center overflow-hidden group rounded-md"
            onClick={() => handleModeChange(Mode.CameraCapture)}
          >
            {/* Styling for button background */}
            <span className="w-full h-full bg-gradient-to-br from-[#ff8a05] via-[#ff5478] to-[#ff00c6] group-hover:from-[#ff00c6] group-hover:via-[#ff5478] group-hover:to-[#ff8a05] absolute"></span>
            {/* Button content */}
            <span className="relative px-8 py-2 transition-all ease-out bg-gray-900 rounded-md group-hover:bg-opacity-0 duration-400">
              <svg className="inline-flex item w-9 h-9 mr-2 text-white dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" stroke-linejoin="round" stroke-width="2" d="M4 18V8c0-.6.4-1 1-1h1.5l1.7-1.7c.2-.2.4-.3.7-.3h6.2c.3 0 .5.1.7.3L17.5 7H19c.6 0 1 .4 1 1v10c0 .6-.4 1-1 1H5a1 1 0 0 1-1-1Z" />
                <path stroke="currentColor" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
              </svg>
              <span className="relative text-white">Capture</span>
            </span>
          </a>

          {/* Button for uploading image */}
          <a href="#_" className="relative p-0.5 inline-flex items-center justify-center overflow-hidden group rounded-md"
            onClick={() => handleModeChange(Mode.ImageUpload)}
          >
            {/* Styling for button background */}
            <span className="w-full h-full bg-gradient-to-br from-[#ff8a05] via-[#ff5478] to-[#ff00c6] group-hover:from-[#ff00c6] group-hover:via-[#ff5478] group-hover:to-[#ff8a05] absolute"></span>
            {/* Button content */}
            <span className="relative px-8 py-2 transition-all ease-out bg-gray-900 rounded-md group-hover:bg-opacity-0 duration-400">
              <svg className="inline-flex item w-9 h-9 mr-2 text-white dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v9m-5 0H5a1 1 0 0 0-1 1v4c0 .6.4 1 1 1h14c.6 0 1-.4 1-1v-4c0-.6-.4-1-1-1h-2M8 9l4-5 4 5m1 8h0" />
              </svg>
              <span className="relative text-white">Upload</span>
            </span>
          </a>

          {/* Button for selecting example image */}
          <a href="#_" className="relative p-0.5 inline-flex items-center justify-center overflow-hidden group rounded-md"
            onClick={() => handleModeChange(Mode.ExampleImage)}
          >
            {/* Styling for button background */}
            <span className="w-full h-full bg-gradient-to-br from-[#ff8a05] via-[#ff5478] to-[#ff00c6] group-hover:from-[#ff00c6] group-hover:via-[#ff5478] group-hover:to-[#ff8a05] absolute"></span>
            {/* Button content */}
            <span className="relative px-8 py-2 transition-all ease-out bg-gray-900 rounded-md group-hover:bg-opacity-0 duration-400">
              <svg className="inline-flex item w-9 h-9 mr-2 text-white dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m3 16 5-7 6 6.5m6.5 2.5L16 13l-4.3 6m2.3-9h0M4 19h16c.6 0 1-.4 1-1V6c0-.6-.4-1-1-1H4a1 1 0 0 0-1 1v12c0 .6.4 1 1 1Z" />
              </svg>
              <span className="relative text-white">Examples</span>
            </span>
          </a>

          {/* Button for resetting all states */}
          <a href="#_" className="relative p-0.5 inline-flex items-center justify-center overflow-hidden group rounded-md"
            onClick={handleResetAll}
          >
            {/* Styling for button background */}
            <span className="w-full h-full bg-gradient-to-br from-[#ff8a05] via-[#ff5478] to-[#ff00c6] group-hover:from-[#ff00c6] group-hover:via-[#ff5478] group-hover:to-[#ff8a05] absolute"></span>
            {/* Button content */}
            <span className="relative px-8 py-2 transition-all ease-out bg-gray-900 rounded-md group-hover:bg-opacity-0 duration-400">
              <svg className="inline-flex item w-9 h-9 mr-2 text-white dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z" />
              </svg>
              <span className="relative text-white">Reset</span>
            </span>
          </a>
        </div>

        <div className="mb-6" />

        {/* Displaying components based on the selected mode */}
        {mode === Mode.CameraCapture && <CustomWebcam capture={handleCapture} />}
        {mode === Mode.ImageUpload && <ImageDropzone onImageUpload={handleImageUpload} />}
        {mode === Mode.ExampleImage && (
          <div className="inline-flex">
            {/* Displaying buttons for selecting example images */}
            <a href="#_" className="border inline-block py-4 text-xl text-white bg-gray-800 px-7 hover:bg-gray-700" onClick={() => handleExampleImage('test')}>Example 1</a>
            <a href="#_" className="border inline-block py-4 text-xl text-white bg-gray-800 px-7 hover:bg-gray-700" onClick={() => handleExampleImage('test1')}>Example 2</a>
            <a href="#_" className="border inline-block py-4 text-xl text-white bg-gray-800 px-7 hover:bg-gray-700" onClick={() => handleExampleImage('test2')}>Example 3</a>
            <a href="#_" className="border inline-block py-4 text-xl text-white bg-gray-800 px-7 hover:bg-gray-700" onClick={() => handleExampleImage('test3')}>Example 4</a>
            <a href="#_" className="border inline-block py-4 text-xl text-white bg-gray-800 px-7 hover:bg-gray-700" onClick={() => handleExampleImage('test4')}>Example 5</a>
          </div>
        )}

        <div className="mb-6" />

        {/* Display the captured or uploaded image */}
        {url && (
          <div className="flex items-center">
            <img src={url} alt="Screenshot" className="image" />
            <div className="ml-2">
              {/* Button to delete the current image */}
              <button onClick={handleDelete} type="button" className="text-white-700 border border-white-700 hover:bg-gray-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center me-2 dark:border-white-500 dark:text-white-500 dark:hover:text-white dark:focus:ring-white-800 dark:hover:bg-white-500">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                </svg>
                <span className="sr-only">Icon description</span>
              </button>

              {/* TextExtractor component to extract information from the image */}
              <div className="mt-2">
                <TextExtractor image={url} setExtractedInfo={setExtractedInfo} />
              </div>
            </div>
          </div>
        )}

        {/* Display the extracted information */}
        <div>
          {extractedInfo && (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
              {/* Displaying extracted information */}
              <div style={{ textAlign: 'left' }}>
                <strong>Name:</strong> {extractedInfo.extractedNames}
              </div>
              <div style={{ textAlign: 'left' }}>
                <strong>DL#:</strong> {extractedInfo.extractedDL}
              </div>
              <div style={{ textAlign: 'left' }}>
                <strong>Issue date:</strong> {extractedInfo.extractedDateIss}
              </div>
              <div style={{ textAlign: 'left' }}>
                <strong>Expiry date:</strong> {extractedInfo.extractedDateExp}
              </div>
              <div style={{ textAlign: 'left' }}>
                <strong>Address:</strong> {extractedInfo.extractedAddress}
              </div>
            </div>
          )}
        </div>
      </header>
    </div>
  );
}

export default App; // Exporting the App component
