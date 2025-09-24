import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Loader } from "../components/loader.jsx";
import ImageSlider from "../components/imageSlider";
import { addToCart } from "../util/cart";
import toast from "react-hot-toast";

export default function ProductOverview() {
  const { id } = useParams();
  const [status, setStatus] = useState("loading");
  const [product, setProduct] = useState(null);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/products/${id}`)
      .then((res) => {
        setProduct(res.data);
        console.log(res.data);
        setStatus("success");
      })
      .catch((err) => {
        console.error("Error fetching product:", err);
        setStatus("error");
      });
  }, [id]);

  return (
    <div className="w-full min-h-[calc(100vh-100px)] bg-background p-3 sm:p-4 md:p-6 font-inter flex justify-center fade-in">
      {status === "loading" && <Loader />}

      {status === "success" && product && (
        <div className="w-full max-w-7xl flex flex-col md:flex-row gap-4 md:gap-6">
          {/* Image Slider Section */}
          <div className="w-full md:w-1/2 flex justify-center">
            <ImageSlider images={product.productImage || []} />
          </div>

          {/* Product Details Section */}
          <div className="w-full md:w-1/2 bg-white rounded-lg shadow-sm p-4 sm:p-6 md:p-8 flex flex-col gap-4">
            {/* Product Name */}
            <div>
              <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold text-text-primary ">
                {product.productName || "Product Name"}
              </h1>
              <p className="text-xs  font-semibold text-text-primary">
                Category:{product.category}
              </p>
            </div>

            <span className="text-xs sm:text-sm text-neutral-400 ">
              {product.altanativeNames.map((name) => {
                return <span>{name}|</span>;
              })}
            </span>

            {/* Price */}
            <div className="flex items-center gap-3 justify-center item-center">
              <p className="text-lg sm:text-xl font-bold text-acensed">
                Rs.{product.productPrice?.toFixed(2) || "0.00"}
              </p>
              {product.LabledPrice && (
                <p className="text-sm text-neutral line-through">
                  ${product.LabledPrice.toFixed(2)}
                </p>
              )}
            </div>

            {/* Stock Status */}
            <p
              className={`text-sm font-medium ${
                product.stock > 0 ? "text-accent" : "text-red-500"
              }`}
            >
              {product.stock > 0
                ? `In Stock (${product.stock} available)`
                : "Out of Stock"}
            </p>

            {/* Description */}
            <div>
              <h2 className="text-sm sm:text-base font-semibold text-text-primary mb-2">
                Description
              </h2>
              <p className="text-xs sm:text-sm text-neutral leading-relaxed">
                {product.productDescription || "No description available"}
              </p>
            </div>

            {/* Call-to-Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                className={`w-full sm:w-auto px-10 py-3 text-sm sm:text-base font-medium text-white bg-acensed rounded-lg hover:bg-acensed-light transition-all duration-200 ${
                  product.stock <= 0 ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={product.stock <= 0}
                onClick={() => {
                  addToCart(product, 1);
                  toast.success("Product added to cart");
                }}
              >
                Add to Cart
              </button>
              <Link to = {"/checkout"} state={[{
								image : product.productImage[0],
								productID : product.productID,
								name : product.productName,
								price : product.productPrice,
								labelledPrice : product.labelledPrice,
								quantity : 1
							}]}
                className={`w-full sm:w-auto px-12 py-3 text-sm sm:text-base font-medium text-white bg-accent rounded-lg hover:bg-acensed transition-all duration-200 ${
                  product.stock <= 0 ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={product.stock <= 0}
                
              >
                Buy Now
              </Link>
              
            </div>
          </div>
        </div>
      )}

      {status === "error" && (
        <div className="flex flex-col items-center justify-center h-full">
          <h1 className="text-xl sm:text-2xl font-semibold text-text-primary mb-3">
            Error Loading Product
          </h1>
          <button
            onClick={() => setStatus("loading")}
            className="px-4 py-2 text-sm sm:text-base bg-acensed text-white rounded-lg hover:bg-acensed-light transition-all duration-200"
          >
            Try Again
          </button>
        </div>
      )}
    </div>
  );
}
