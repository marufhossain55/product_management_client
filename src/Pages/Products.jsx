import axios from 'axios';
import { useEffect, useState } from 'react';

const Products = () => {
  const [currentPage, setCurrentPage] = useState();
  const [itemParPage, setItemParPage] = useState(6);
  const [count, setCount] = useState(0);
  const [products, setProducts] = useState([]);
  const [filter, setFilter] = useState('');
  const [brandFilter, setBrandFilter] = useState('');
  const [priceFilter, setPriceFilter] = useState('');
  const [sort, setSort] = useState('');
  const [search, setSearch] = useState('');
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    const getData = async () => {
      const { data } = await axios.get(
        `${
          import.meta.env.VITE_API_URL
        }/all-products?page=${currentPage}&size=${itemParPage}&filter=${filter}&brandFilter=${brandFilter}&priceFilter=${priceFilter}&sort=${sort}&search=${search}`
      );
      setProducts(data);
    };
    getData();
  }, [
    currentPage,
    itemParPage,
    filter,
    sort,
    search,
    brandFilter,
    priceFilter,
  ]);
  console.log(products);
  useEffect(() => {
    const getCount = async () => {
      const { data } = await axios.get(
        `${
          import.meta.env.VITE_API_URL
        }/products-count?filter=${filter}&brandFilter=${brandFilter}&search=${search}&priceFilter=${priceFilter}`
      );

      setCount(data.count);
    };
    getCount();
  }, [filter, search, brandFilter, priceFilter]);

  const numberOfPages = Math.ceil(count / itemParPage);
  console.log(numberOfPages);
  const pages = [...Array(numberOfPages).keys()].map((element) => element + 1);

  const handlePaginationButton = (value) => {
    setCurrentPage(value);
  };

  const handleReset = () => {
    setFilter('');
    setSort('');
    setSearch('');
    setSearchText('');
    setBrandFilter('');
    setPriceFilter('');
  };

  const handleSearch = (e) => {
    e.preventDefault();

    setSearch(searchText);
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-center items-center gap-5 ">
        <div>
          <select
            onChange={(e) => {
              setFilter(e.target.value);
              setCurrentPage(1);
            }}
            value={filter}
            name="category"
            id="category"
            className="border p-4 rounded-lg"
          >
            <option value="">Filter By Category</option>
            <option value="men's clothing">men's clothing</option>
            <option value="jewelery">jewelery</option>
            <option value="electronics">electronics</option>
            <option value="women's clothing">women's clothing</option>
            <option value="men's footwear">men's footwear</option>
            <option value="women's footwear">women's footwear</option>
            <option value="home and kitchen">home and kitchen</option>
          </select>
        </div>
        <div>
          <select
            onChange={(e) => {
              setBrandFilter(e.target.value);
              setCurrentPage(1);
            }}
            value={brandFilter}
            name="category"
            id="category"
            className="border p-4 rounded-lg"
          >
            <option value="">Filter by Brand Name</option>
            <option value="Fjallraven">Fjallraven</option>
            <option value="Casual Premium">Casual Premium</option>
            <option value="Cotton Wear">Cotton Wear</option>
            <option value="Princess">Princess</option>
            <option value="SanDisk">SanDisk</option>
            <option value="Silicon Power">Silicon Power</option>
            <option value="BIYLACLESEN">BIYLACLESEN</option>
            <option value="TCL">TCL</option>
            <option value="Anker">Anker</option>
            <option value="Apple">Apple</option>
            <option value="Microsoft">Microsoft</option>
            <option value="Ring">Ring</option>
          </select>
        </div>
        {/* /////////////////////////////////////////////////////// */}
        <div>
          <select
            onChange={(e) => {
              setPriceFilter(e.target.value);
              setCurrentPage(1);
            }}
            value={priceFilter}
            name="category"
            id="category"
            className="border p-4 rounded-lg"
          >
            <option value="">Filter by price</option>
            <option value="bellow 200">below 200</option>
            <option value="200-1000">200-1000</option>
            <option value="upper 1000">upper 1000</option>
          </select>
        </div>

        <form onSubmit={handleSearch}>
          <div className="flex p-1 overflow-hidden border rounded-lg    focus-within:ring focus-within:ring-opacity-40 focus-within:border-blue-400 focus-within:ring-blue-300">
            <input
              className="px-6 py-2 text-gray-700 placeholder-gray-500 bg-white outline-none focus:placeholder-transparent"
              type="text"
              name="search"
              onChange={(e) => setSearchText(e.target.value)}
              value={searchText}
              placeholder="Enter product Title"
              aria-label="Enter product Title"
            />

            <button className="px-1 md:px-4 py-3 text-sm font-medium tracking-wider text-gray-100 uppercase transition-colors duration-300 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:bg-gray-600 focus:outline-none">
              Search
            </button>
          </div>
        </form>
        <div>
          <select
            onChange={(e) => {
              setSort(e.target.value);
              setCurrentPage(1);
            }}
            value={sort}
            name="category"
            id="category"
            className="border p-4 rounded-md"
          >
            Price: Low to High, High to Low
            <option value="">Sort By Date and time</option>
            <option value="dsc">Price:High to Low</option>
            <option value="asc">Price: Low to High</option>
            <option value="dasc">Date Added: Newest first</option>
          </select>
        </div>
        <button onClick={handleReset} className="btn">
          Reset
        </button>
      </div>
      <div className="grid  lg:grid-cols-3 gap-4">
        {products?.map((product) => (
          <div
            key={product._id}
            className="flex max-w-md overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800"
          >
            <div
              className="w-1/3 bg-cover"
              style={{
                backgroundImage: `url(${product.image})`,
              }}
            ></div>

            <div className="w-2/3 p-4 md:p-4">
              <h1 className="text-xl font-bold text-gray-800 dark:text-white">
                {product.title}
              </h1>

              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                {new Date(product.creation_date).toLocaleString()}
              </p>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 font-bold">
                {product.category}
              </p>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 font-bold">
                {product.brand}
              </p>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                {product.description.substring(0, 150)}...
              </p>

              <div className="flex justify-between mt-3 item-center">
                <h1 className="text-lg font-bold text-gray-700 dark:text-gray-200 md:text-xl">
                  ${product.price}
                </h1>

                <h1 className="text-lg font-bold text-gray-700 dark:text-gray-200 md:text-xl flex justify-center items-center">
                  <svg
                    className="w-5 h-5 text-gray-700 fill-current dark:text-gray-300"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" />
                  </svg>

                  {product?.rating?.rate}
                </h1>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-12">
        <button
          disabled={currentPage === 1}
          onClick={() => handlePaginationButton(currentPage - 1)}
          className="px-4 py-2 mx-1 text-gray-700 disabled:text-gray-500 capitalize bg-gray-200 rounded-md disabled:cursor-not-allowed disabled:hover:bg-gray-200 disabled:hover:text-gray-500 hover:bg-blue-500  hover:text-white"
        >
          <div className="flex items-center -mx-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6 mx-1 rtl:-scale-x-100"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M7 16l-4-4m0 0l4-4m-4 4h18"
              />
            </svg>

            <span className="mx-1">previous</span>
          </div>
        </button>

        {pages.map((btnNum) => (
          <button
            onClick={() => handlePaginationButton(btnNum)}
            key={btnNum}
            className={`hidden ${
              currentPage === btnNum ? 'bg-blue-500 text-white' : ''
            } px-4 py-2 mx-1 transition-colors duration-300 transform  rounded-md sm:inline hover:bg-blue-500  hover:text-white`}
          >
            {btnNum}
          </button>
        ))}

        <button
          disabled={currentPage === numberOfPages}
          onClick={() => handlePaginationButton(currentPage + 1)}
          className="px-4 py-2 mx-1 text-gray-700 transition-colors duration-300 transform bg-gray-200 rounded-md hover:bg-blue-500 disabled:hover:bg-gray-200 disabled:hover:text-gray-500 hover:text-white disabled:cursor-not-allowed disabled:text-gray-500"
        >
          <div className="flex items-center -mx-1">
            <span className="mx-1">Next</span>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6 mx-1 rtl:-scale-x-100"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </div>
        </button>
      </div>
    </div>
  );
};
export default Products;
