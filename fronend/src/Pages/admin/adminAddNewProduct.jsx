import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import mediaUplode from "../../util/mediaUplode.jsx";

export default function AdminAddNewProduct() {
  const [productID, setproductID] = useState("");
  const [productName, setProductName] = useState("");
  const [price, setprice] = useState("");
  const [labledPrice, setlabledPrice] = useState("");
  const [description, setdescription] = useState("");
  const [altName, setaltName] = useState("");
  const [category, setcategory] = useState("creem");
  const [image, setimage] = useState([]);
  const [stock, setstock] = useState(0);
  const navigate = useNavigate();

  async function addproduct() {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }
//mediaupload
    const uploadPromises = [];
    for (let i = 0; i < image.length; i++) {
      uploadPromises[i] = mediaUplode(image[i]);
    }

    try {
      const urls = await Promise.all(uploadPromises);
      const Alternative = altName.split(",");
      const product = {
        productID:productID,
        productName:productName,
        productPrice: price,
        LabledPrice: labledPrice,
        productDescription: description,
        category:category,
        stock:stock,
        altanativeNames: Alternative,
        productImage: urls,
      };
      await axios.post(
        import.meta.env.VITE_API_URL + "/api/products/createProduct",
        product,
        { headers: { Authorization: "Bearer " + token } }
      );
      toast.success("Product added successfully");
      navigate("/admin/products");
    } catch (error) {
      console.log("error to add product", error);
      toast.error("Error adding product");
    }
  }

  return (
    <div className="w-full min-h-full flex justify-center items-center bg-background font-inter p-3 sm:p-4 md:p-5">
      <div className="w-full max-w-sm sm:max-w-md bg-white rounded-lg shadow-sm p-4 sm:p-5 md:p-6 flex flex-col gap-3">
        <h2 className="text-lg sm:text-xl font-semibold text-text-primary text-center">
          Add New Product
        </h2>
        <p className="text-xs sm:text-sm text-gray-500 text-center mb-2">
          Fill in the details to create a product
        </p>

        <div className="flex flex-col">
          <label className="text-xs sm:text-sm font-medium text-text-primary">Product ID</label>
          <input
            value={productID}
            onChange={(e) => setproductID(e.target.value)}
            type="text"
            placeholder="Enter product ID"
            className="mt-1 p-2 sm:p-2.5 rounded-md border border-neutral focus:ring-2 focus:ring-acensed outline-none text-xs sm:text-sm"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-xs sm:text-sm font-medium text-text-primary">Product Name</label>
          <input
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            type="text"
            placeholder="Enter product name"
            className="mt-1 p-2 sm:p-2.5 rounded-md border border-neutral focus:ring-2 focus:ring-acensed outline-none text-xs sm:text-sm"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="flex flex-col">
            <label className="text-xs sm:text-sm font-medium text-text-primary">Price</label>
            <input
              value={price}
              onChange={(e) => setprice(e.target.value)}
              type="number"
              placeholder="Price"
              className="mt-1 p-2 sm:p-2.5 rounded-md border border-neutral focus:ring-2 focus:ring-acensed outline-none text-xs sm:text-sm"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-xs sm:text-sm font-medium text-text-primary">Labeled Price</label>
            <input
              value={labledPrice}
              onChange={(e) => setlabledPrice(e.target.value)}
              type="number"
              placeholder="Labeled Price"
              className="mt-1 p-2 sm:p-2.5 rounded-md border border-neutral focus:ring-2 focus:ring-acensed outline-none text-xs sm:text-sm"
            />
          </div>
        </div>

        <div className="flex flex-col">
          <label className="text-xs sm:text-sm font-medium text-text-primary">Alternative Name</label>
          <input
            value={altName}
            onChange={(e) => setaltName(e.target.value)}
            type="text"
            placeholder="Alternative name (comma-separated)"
            className="mt-1 p-2 sm:p-2.5 rounded-md border border-neutral focus:ring-2 focus:ring-acensed outline-none text-xs sm:text-sm"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-xs sm:text-sm font-medium text-text-primary">Stock</label>
          <input
            value={stock}
            onChange={(e) => setstock(e.target.value)}
            type="number"
            placeholder="Stock quantity"
            className="mt-1 p-2 sm:p-2.5 rounded-md border border-neutral focus:ring-2 focus:ring-acensed outline-none text-xs sm:text-sm"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-xs sm:text-sm font-medium text-text-primary">Category</label>
          <select
            value={category}
            onChange={(e) => setcategory(e.target.value)}
            className="mt-1 p-2 sm:p-2.5 rounded-md border border-neutral focus:ring-2 focus:ring-acensed outline-none text-xs sm:text-sm"
          >
            <option value="creem">Cream</option>
            <option value="oil">Oil</option>
            <option value="shampoo">Shampoo</option>
            <option value="bodywash">Bodywash</option>
            <option value="facewash">Facewash</option>
            <option value="serum">Serum</option>
          </select>
        </div>

        <div className="flex flex-col">
          <label className="text-xs sm:text-sm font-medium text-text-primary">Product Images</label>
          <input
            type="file"
            onChange={(e) => setimage(e.target.files)}
            multiple
            className="mt-1 p-2 sm:p-2.5 rounded-md border border-neutral bg-neutral/50 cursor-pointer text-xs sm:text-sm file:mr-2 sm:file:mr-3 file:py-1 file:px-2 file:rounded file:border-0 file:bg-acensed file:text-white file:hover:bg-acensed-light"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-xs sm:text-sm font-medium text-text-primary">Description</label>
          <textarea
            value={description}
            onChange={(e) => setdescription(e.target.value)}
            placeholder="Enter product description..."
            className="mt-1 p-2 sm:p-2.5 rounded-md border border-neutral focus:ring-2 focus:ring-acensed outline-none text-xs sm:text-sm resize-none h-16 sm:h-20"
          />
        </div>

        <div className="flex justify-center gap-3 mt-3">
          <button
            onClick={addproduct}
            className="w-20 sm:w-24 py-1.5 sm:py-2 bg-acensed text-white rounded-md hover:bg-acensed-light hover:scale-105 transition-all duration-200 text-xs sm:text-sm font-medium"
            aria-label="Save Product"
          >
            Save
          </button>
          <button
            onClick={() => navigate("/admin/products")}
            className="w-20 sm:w-24 py-1.5 sm:py-2 bg-red-400 text-white rounded-md hover:bg-red-500 hover:scale-105 transition-all duration-200 text-xs sm:text-sm font-medium"
            aria-label="Cancel"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}