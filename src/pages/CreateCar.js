import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CreateCar = () => {
  const [images, setImages] = useState([]);
  const [numImages, setNumImages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [carModel, setCarModel] = useState("");
  const [price, setPrice] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleImageChange = (e) => {
    const selectedFiles = Array.from(e.target.files);

    if (selectedFiles.length > numImages) {
      toast.error(`You can only upload up to ${numImages} image(s).`);
      return;
    }

    if (images.length + selectedFiles.length > numImages) {
      toast.error(`You can only upload up to ${numImages} image(s).`);
      return;
    }

    setImages((prevImages) => [...prevImages, ...selectedFiles]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!carModel || !price || !phoneNumber) {
      toast.error("All fields are required.");
      return;
    }
    setLoading(true);

    const user = JSON.parse(localStorage.getItem("user"));
    const formData = new FormData();
    formData.append("carModel", carModel);
    formData.append("price", price);
    formData.append("phoneNumber", phoneNumber);
    formData.append("userId", user.id);
    images.forEach((image, index) => {
      formData.append("pictures", image);
    });

    try {
      const headers = {
        "Content-Type": "multipart/form-data",
        ...(user.token && { Authorization: `Bearer ${user.token}` }),
      };

      await axios.post(
        "car-backend-tau.vercel.app/api/v1/cars/create",
        formData,
        {
          headers,
        }
      );
      setImages([]);
      toast.success("Car added successfully!");
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Network error. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#093545]">
      <div className="bg-[#093545] p-8 rounded-lg w-full max-w-lg">
        <ToastContainer position="top-right" autoClose={3000} />

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Car Model"
            value={carModel}
            onChange={(e) => setCarModel(e.target.value)}
            className="w-full bg-[#224957] text-white p-3 rounded mb-4 outline-none"
          />

          <input
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full bg-[#224957] text-white p-3 rounded mb-4 outline-none"
          />

          <input
            type="text"
            placeholder="Phone Number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="w-full bg-[#224957] text-white p-3 rounded mb-4 outline-none"
          />

          <select
            value={numImages}
            onChange={(e) => setNumImages(Number(e.target.value))}
            className="w-full bg-[#224957] text-white p-3 rounded mb-4"
          >
            {[...Array(10).keys()].map((num) => (
              <option key={num + 1} value={num + 1}>
                {num + 1} Image{num + 1 > 1 && "s"}
              </option>
            ))}
          </select>

          <div className="w-full border-2 border-dashed border-gray-400 h-64 flex flex-col items-center justify-center text-white mb-4 relative">
            <span>Drop images here</span>

            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageChange}
              className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
              disabled={images.length >= numImages}
            />

            <button
              type="button"
              onClick={() =>
                document.querySelector("input[type='file']").click()
              }
              disabled={images.length >= numImages}
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-400"
            >
              Select Images
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            {images.length > 0 &&
              images.map((image, index) => (
                <div key={index} className="relative group">
                  <img
                    src={URL.createObjectURL(image)}
                    alt={`preview-${index}`}
                    className="h-32 w-full object-cover rounded"
                  />

                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity">
                    <FontAwesomeIcon
                      icon={faTrash}
                      className="text-white text-2xl cursor-pointer"
                      onClick={() =>
                        setImages(
                          images.filter((_, imgIndex) => imgIndex !== index)
                        )
                      }
                    />
                  </div>
                </div>
              ))}
          </div>

          <div className="flex space-x-2">
            <button
              type="button"
              className="bg-[#093545] border-solid border-2 text-white px-4 py-2 rounded hover:bg-[#093545]"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-400"
              disabled={loading}
            >
              {loading ? "Adding..." : "Add Car"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateCar;
