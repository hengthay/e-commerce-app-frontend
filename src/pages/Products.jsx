import { useEffect, useMemo, useState } from "react";
import ProductCard from "../components/Products/ProductCard";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProducts,
  selectAllProductError,
  selectAllProducts,
  selectAllProductStatus,
} from "../features/products/productSlice";
import ErrorMessage from "../components/ErrorHandle/ErrorMessage";
import { selectSearchTerm } from "../features/search/searchSlice";

const Products = () => {
  // Filtered products based on type
  const [selectedType, setSelectedType] = useState("All");
  const [isError, setIsError] = useState(null);
  const products = useSelector(selectAllProducts);
  const dispatch = useDispatch();
  const status = useSelector(selectAllProductStatus);
  const errorMessage = useSelector(selectAllProductError);
  // Search Term
  const searchTerm = useSelector(selectSearchTerm);
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
  // Memoize normalized search string to avoid repeated lowercasing
  const normalizedSearch = useMemo(() => searchTerm.trim().toLowerCase(), [searchTerm]);
  // Filtered Product title
  const filteredProducts = useMemo(() => {
    // Filtered Label Product
    const filteredByLabel = products.filter((product) => {
      return selectedType === "All" ? product : product.type === selectedType
    });
    // Filtered by title
    return filteredByLabel.filter((product) => {
      const title = (product?.title || "").toLowerCase();
      return title.includes(normalizedSearch)
    })
  }, [products, normalizedSearch, selectedType]);

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
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <ProductCard product={product} key={product.id} />
              ))
            ) : (
              <ErrorMessage message="No products are found."/>
            )}
            
          </div>
        )}
        {/* Handle status */}
        {status === "failed" && (
          <ErrorMessage message="Sorry, failed to display products"/>
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
