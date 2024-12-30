import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { Loading } from "../components";
import { addItem as addToCart } from "../features/cart/cartSlice";
import { addItem as addToFavorites } from "../features/favorites/favoritesSlice";

import { BsHeart, BsHeartFill } from "react-icons/bs";
import { useProducts } from "../hooks/useProducts";

const ProductDetails = () => {
  const { data, isLoading, isError } = useProducts();
  const { productId } = useParams();
  const [selectedImage, setSelectedImage] = useState("");
  const [currentProduct, setCurrentProduct] = useState(null);
  const [amount, setAmount] = useState(1);
  const [zoomStyle, setZoomStyle] = useState({});
  const [heartHovered, setHeartHovered] = useState(false);

  // Retrieve from localStorage if available
  useEffect(() => {
    const savedProduct = JSON.parse(localStorage.getItem("currentProduct"));
    if (savedProduct) {
      setCurrentProduct(savedProduct);
    }
  }, []);

  // Update localStorage whenever currentProduct changes
  useEffect(() => {
    if (currentProduct) {
      localStorage.setItem("currentProduct", JSON.stringify(currentProduct));
    }
  }, [currentProduct]);

  // Fetch the product from API and set it when available
  useEffect(() => {
    const product = data?.data?.find((product) => product.id == productId);
    setCurrentProduct(product);
  }, [data, productId]);

  // Set the default big image
  useEffect(() => {
    if (currentProduct) {
      setSelectedImage(
        `https://ewaiq.com/public/storage/${currentProduct.image}`
      );
    }
  }, [currentProduct]);

  // Map through the product images and create URLs
  const imageUrls = currentProduct?.images?.map(
    (imagePath) => `https://ewaiq.com/public/storage/${imagePath}`
  );

  // Function to change the selected image when a thumbnail is clicked
  const changeImage = (src) => {
    setSelectedImage(src);
  };

  // Function to handle mouse movement for zoom effect
  const handleMouseMove = (e) => {
    const image = e.target;
    const { left, top, width, height } = image.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;

    const xPercent = (x / width) * 100;
    const yPercent = (y / height) * 100;

    setZoomStyle({
      backgroundImage: `url(${selectedImage})`,
      backgroundSize: "200% 200%",
      backgroundPosition: `${xPercent}% ${yPercent}%`,
      width: "100%",
      height: "100%",
      position: "absolute",
      top: 0,
      left: 0,
      borderRadius: "8px",
    });
  };

  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        product: {
          ...currentProduct,
          amount: Number(amount),
          cartID: currentProduct.id,
        },
      })
    );
  };

  const handleAddToFavorites = () => {
    dispatch(
      addToFavorites({
        product: { ...currentProduct, favoriteID: currentProduct.id },
      })
    );
  };

  if (isLoading)
    return (
      <div>
        <Loading />
      </div>
    );
  if (isError || !currentProduct) return <p>Error loading product details.</p>;

  return (
    <>
      <nav className="w-full rounded-md px-5 py-3">
        <ol className="list-reset flex">
          <li>
            <Link to="/" className="text-primary py-5 ">
              Home
            </Link>
          </li>
          <li>
            <span className="mx-2 text-neutral-400">/</span>
          </li>
          <li>
            <Link
              to="/products"
              className="text-primary hover:text-primary-accent-300"
            >
              Products
            </Link>
          </li>
          <li>
            <span className="mx-2 text-neutral-400">/</span>
          </li>
          <li className="text-neutral-400">Product Details</li>
        </ol>
      </nav>
      {/* Product Details Section */}
      <section className="py-10 relative">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-wrap -mx-4">
            {/* Product Images */}
            <div className="w-full md:w-1/2 px-4 mb-8">
              {/* Zoom Container */}
              <div
                className="w-full h-[60%] rounded-lg overflow-hidden relative"
                onMouseMove={handleMouseMove}
                onMouseLeave={() => setZoomStyle({})}
              >
                <img
                  src={selectedImage}
                  alt="Product"
                  className="w-full h-full object-cover"
                />
                {/* Zoomed Image */}
                <div className="zoomed-image" style={zoomStyle}></div>
              </div>
              <div className="flex gap-4 justify-start overflow-x-auto whitespace-nowrap py-4">
                {imageUrls?.map((src, index) => (
                  <img
                    key={index}
                    src={src}
                    alt={`Thumbnail ${index + 1}`}
                    className={`w-16 sm:w-20 object-cover rounded-md cursor-pointer transition duration-300 inline-block ${
                      src === selectedImage
                        ? "opacity-100"
                        : "opacity-60 hover:opacity-100"
                    }`}
                    onClick={() => changeImage(src)}
                  />
                ))}
              </div>
            </div>

            {/* Product Details */}
            <div className="w-full md:w-1/2 px-4">
              <h2 className="text-3xl font-bold mb-2">
                {currentProduct?.name}
              </h2>
              <p className="text-gray-600 mb-4">SKU: {currentProduct?.sku}</p>
              <div className="mb-4">
                <span className="text-2xl font-bold mr-2">
                  ${currentProduct?.price}
                </span>
              </div>
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, index) => (
                  <svg
                    key={index}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="size-6 text-yellow-500"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                      clipRule="evenodd"
                    />
                  </svg>
                ))}
                <span className="ml-2 text-gray-600">4.5 (120 reviews)</span>
              </div>
              <p className="text-gray-700 mb-6">
                {currentProduct?.description}
              </p>

              <div className="mb-6">
                <label
                  htmlFor="amount"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Amount:
                </label>
                <input
                  type="number"
                  id="amount"
                  name="amount"
                  min="1"
                  defaultValue="1"
                  className="w-12 text-center rounded-md border-gray-300"
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>
              <div className="flex space-x-4 mb-6">
                <button
                  className="bg-[#a67a53] text-white px-6 py-2 rounded-md hover:bg-[#a67a53]"
                  onClick={handleAddToCart}
                >
                  Add to Cart
                </button>

                {/* Add to Favorites Button */}
                <button
                  onMouseEnter={() => setHeartHovered(true)}
                  onMouseLeave={() => setHeartHovered(false)}
                  className="focus:outline-none"
                  onClick={handleAddToFavorites}
                >
                  {heartHovered ? (
                    <BsHeartFill className="h-6 w-6" />
                  ) : (
                    <BsHeart className="h-6 w-6" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProductDetails;
