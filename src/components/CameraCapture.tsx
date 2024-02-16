import { useRef, useCallback, useState } from "react"; // Importing useRef, useCallback, and useState hooks from React
import Webcam from "react-webcam"; // Importing Webcam component from "react-webcam" library

// Defining props for the Camera component
interface CameraProps {
  capture: (imageSrc: string) => void; // Callback function triggered on image capture
}

// Default video constraints for the Webcam component
const videoConstraints = {
  width: 720, // Width of the video stream
  height: 360, // Height of the video stream
  facingMode: "user" // Facing mode of the camera (e.g., "user" for front camera)
};

// Defining the Camera component as a functional component
const Camera: React.FC<CameraProps> = ({ capture }) => {
  const webcamRef = useRef<Webcam>(null); // Reference to the Webcam component

  // Event handler for capturing an image from the Webcam
  const handleCapture = () => {
    const imageSrc = webcamRef.current?.getScreenshot(); // Getting the screenshot from the Webcam
    if (imageSrc) {
      capture(imageSrc); // Calling the provided callback function with the captured image source
    }
  };

  // Rendering the Camera component
  return (
    <div>
      {/* Rendering the Webcam component */}
      <Webcam
        audio={false} // Disabling audio
        width={540} // Setting width of the Webcam component
        height={360} // Setting height of the Webcam component
        ref={webcamRef} // Assigning the Webcam reference
        screenshotFormat="image/jpeg" // Setting the format of the screenshot
        videoConstraints={videoConstraints} // Applying video constraints to the Webcam
      />
      {/* Button container for capturing image */}
      <div className="button-container">
        {/* Capture button */}
        <a href="#_" className="border inline-block py-4 text-xl text-white bg-gray-800 px-7 hover:bg-gray-700" onClick={handleCapture}>Capture</a>
      </div>
    </div>
  );
};

export default Camera; // Exporting the Camera component
