import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProducts,
  selectAllProductError,
  selectAllProducts,
  selectAllProductStatus,
} from "../features/products/productSlice";
import ErrorMessage from "../components/ErrorMessage";

const Products = () => {
  // Filtered products based on type
  const [selectedType, setSelectedType] = useState("All");
  const [isError, setIsError] = useState(null);
  const products = useSelector(selectAllProducts);
  const dispatch = useDispatch();
  const status = useSelector(selectAllProductStatus);
  const errorMessage = useSelector(selectAllProductError);

  // Product types
  const productTypes = ["All", "Fashion", "Kitchen & Dinning", "Home & Living"];

  // Fetch all products
  useEffect(() => {
    try {
      setIsError(null);
      if (status === "idle") {
        dispatch(fetchProducts());
      }
    } catch (error) {
      console.log(error);
      setIsError("Failed to get all products" || error);
    }
  }, [dispatch, status]);

  // console.log('Products: ', products);

  // Filtered Label Product
  const filteredLabel = products.filter((product) =>
    selectedType === "All" ? product : product.type === selectedType
  );

  return (
    <section className="w-full bg-gray-100/40 ">
      <div className="section-container mx-auto lg:my-20 md:my-15 my-10 max-sm:w-[350px] w-full md:px-4 md:py-4 flex flex-col justify-center space-y-3">
        <div className="flex flex-col justify-center items-center space-y-4 mt-10">
          <h4 className="md:text-3xl lg:text-5xl text-2xl font-medium text-gray-700">
            Our Products
          </h4>
          <p className="max-w-sm text-center md:text-base text-sm text-gray-500">
            Enjoy your shopping with us to relaxing from thing that make you
            harder to resolve.
          </p>
        </div>

        {/* Filtered Product */}
        <div className="w-full flex md:justify-start justify-center items-start md:gap-x-3 gap-x-2 my-14">
          {productTypes.map((type) => (
            <p
              key={type}
              onClick={() => setSelectedType(type)}
              className={`cursor-pointer md:px-3 px-1.5 py-1 md:text-base text-sm rounded-lg transition-all text-nowrap
            ${
              selectedType === type
                ? "bg-black text-white"
                : "text-gray-600 hover:text-black"
            }`}
            >
              {type}
            </p>
          ))}
        </div>
        {/* Product Card Rendering */}
        {status === "succeeded" && (
          <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 justify-between gap-8 relative mr-2.5!">
            {filteredLabel.length > 0 ? (
              filteredLabel.map((product) => (
                <ProductCard product={product} key={product.id} />
              ))
            ) : (
              <ErrorMessage message={errorMessage} isError={isError} />
            )}
            
          </div>
        )}
        {/* Handle status */}
        {status === "failed" && (
          <div className="section-container flex items-center gap-2 p-4 rounded-md bg-red-50 border border-red-300 text-red-700 my-10 w-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-8 text-red-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <p className="md:text-lg text-sm font-medium">
              Sorry, failed to display products
            </p>
          </div>
        )}
        {status === "loading" && (
          <div className="flex justify-center items-center h-64">
            <h4 className="text-gray-700 font-medium md:text-lg text-base flex items-center gap-x-2">
              Loading<p className="w-6 h-6 rounded-full border-b-transparent border-t-transparent border-2 border-gray-400 animate-spin"></p>
            </h4>
          </div>
        )}
        {isError && (
          <p className="text-red-500 text-lg font-medium">{isError}</p>
        )}
      </div>
    </section>
  );
};

export default Products;
