import React, { useState } from "react";
import toast,{Toaster} from "react-hot-toast";
import axios from "axios";
import { IoCheckmarkCircle, IoCloseCircle, IoCamera } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const UploadBins = () => {
  const [image, setImage] = useState(null); // Stores uploaded image URL
  const [location, setLocation] = useState(null); // Stores user's location
  const [category, setCategory] = useState(""); // Stores selected category
  const [isUploading, setIsUploading] = useState(false); // Indicates upload status
  const [uploadProgress, setUploadProgress] = useState(0); // Tracks upload progress
  const nav = useNavigate();
  axios.defaults.withCredentials = true;

  const handleFileUpload = async (file) => {
    try {
      setIsUploading(true);
      setUploadProgress(0); // Reset progress
  
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", import.meta.env.VITE_CLOUD_PRESET);
  
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );
  
      if (!response.ok) {
        throw new Error(`Upload failed with status ${response.status}`);
      }
  
      const data = await response.json();
      setImage(data.secure_url); // Save uploaded image URL
      toast.success("Image uploaded successfully!");
    } catch (error) {
      console.error("Upload failed:", error);
      toast.error("Image upload failed. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };
  


  // Function to get user's location
  const fetchLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ latitude, longitude }); // Save as an object
          toast.success("Location fetched successfully!");
        },
        (error) => {
          console.error("Error fetching location:", error);
          toast.error("Unable to fetch location. Please enable location access.");
        }
      );
    } else {
      toast.error("Geolocation is not supported by this browser.");
    }
  };
  
  // Handle submit button click
  const handleTickClick = async (e) => {
    e.preventDefault();
  
    try {
      if (!category || !location || !image) {
        toast.warning("Please complete all fields before submitting.");
        return;
      }
  
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER}/user/reportbin`,
        {
          imageUrl: image,
          location, // This should be an object with latitude and longitude
          category,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
  
      if (response.status === 200) {
        toast.success("Data uploaded successfully!");
        nav(-1); 
      }
    } catch (error) {
      console.error("Error submitting data:", error);
      toast.error("Failed to submit data. Please try again.");
    }
  };
  

  // Handle clear button click
  const handleClear = () => {
    setImage(null);
    setLocation("");
    setCategory("");
    setUploadProgress(0);
    toast("All fields have been cleared!", {
      icon: "🧹",
    });
  };

  // Open device camera
  const handleCameraClick = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.capture = "environment";
    input.onchange = (e) => handleFileUpload(e.target.files[0]);
    input.click();
  };

  return (
    <div className="min-h-screen flex flex-col items-center p-5">
      <Toaster/>
      <h1 className="text-4xl font-bold mb-4">Report Waste Dumping</h1>
      <p className="text-center text-lg mb-6">
        Upload an image and provide necessary details to report waste dumping.
      </p>

      <div className="w-full max-w-md p-5 bg-white rounded-lg shadow-md">
        <div className="mb-4">
          {image ? (
            <div className="relative">
              <img
                src={image}
                alt="Uploaded"
                className="w-full h-64 object-cover rounded-lg"
              />
              <button
                onClick={handleClear}
                className="absolute top-2 right-2 text-red-600 text-2xl"
              >
                <IoCloseCircle />
              </button>
            </div>
          ) : (
            <label
              className="flex flex-col items-center justify-center border-2 border-dashed border-gray-400 rounded-lg h-64 cursor-pointer"
              onDrop={(e) => {
                e.preventDefault();
                handleFileUpload(e.dataTransfer.files[0]);
              }}
              onDragOver={(e) => e.preventDefault()}
            >
              <input
                type="file"
                className="hidden"
                onChange={(e) => handleFileUpload(e.target.files[0])}
              />
              <IoCamera className="text-4xl text-gray-500 mb-2" />
              <p className="text-gray-500">Drag and drop or click to upload</p>
            </label>
          )}
        </div>

        {isUploading && (
          <div className="w-full bg-gray-200 rounded-full h-4 mb-4">
            <div
              className="bg-blue-500 h-4 rounded-full"
              style={{ width: `${uploadProgress}%` }}
            ></div>
          </div>
        )}

<div className="mb-4">
  <label className="block text-gray-700 font-medium">Location</label>
  <input
    type="text"
    value={
      location && location.latitude && location.longitude
        ? `${location.latitude}, ${location.longitude}`
        : ""
    }
    readOnly
    className="w-full p-2 border rounded-lg bg-gray-100"
    placeholder="Click to fetch location..."
    onClick={fetchLocation}
  />
</div>


        <div className="mb-4">
          <label className="block text-gray-700 font-medium">
            Waste Category
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full p-2 border rounded-lg"
          >
            <option value="" disabled>
              Select a category
            </option>
            <option value="bio">Biodegradable</option>
            <option value="non-bio">Non-Biodegradable</option>
          </select>
        </div>

        <div className="flex justify-between">
          <button
            onClick={handleTickClick}
            disabled={!image || !location || !category || isUploading}
            className={`${
              image && location && category && !isUploading
                ? "bg-green-500"
                : "bg-gray-400 cursor-not-allowed"
            } text-white px-4 py-2 rounded-lg flex items-center`}
          >
            <IoCheckmarkCircle className="mr-2" /> Submit
          </button>
          <button
            onClick={handleCameraClick}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center"
          >
            <IoCamera className="mr-2" /> Use Camera
          </button>
        </div>
      </div>
    </div>
  );
};

export default UploadBins;
