import React from 'react'
import Link from 'next/link';

const ProductMaster = () => {
  return (
    
        <div className="container mx-auto my-6 p-4 shadow-lg rounded-lg bg-white ">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-semibold text-black">Product Master</h1>
                <Link href="/product-master/add-product">
                    <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
                        + Add 
                    </button>
                </Link>
            </div>

            <table className="min-w-full border border-gray-300">
                <thead>
                    <tr>
                        <th className="border-b p-2">Product Name</th>
                        <th className="border-b p-2">Category</th>
                        <th className="border-b p-2">Price</th>
                        <th className="border-b p-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {/* {products.map((product) => (
                        <tr key={product.id}>
                            <td className="border-b p-2">{product.name}</td>
                            <td className="border-b p-2">{product.category}</td>
                            <td className="border-b p-2">{product.price}</td>
                            <td className="border-b p-2">
                                <Link href={`/edit-product/${product.id}`}>
                                    <button className="bg-yellow-500 text-white px-2 py-1 rounded-md hover:bg-yellow-600">
                                        Edit
                                    </button>
                                </Link>
                            </td>
                        </tr>
                    ))} */}
                </tbody>
            </table>

            {/* Pagination */}
            <div className="flex justify-between mt-4">
                <button
                    // onClick={handlePreviousPage}
                    className="bg-gray-300 px-4 py-2 rounded-md disabled:opacity-50"
                    // disabled={currentPage === 1}
                >
                    Previous
                </button>
                {/* <span>Page {currentPage} of {totalPages}</span> */}
                <button
                    // onClick={handleNextPage}
                    className="bg-gray-300 px-4 py-2 rounded-md disabled:opacity-50"
                    // disabled={currentPage === totalPages}
                >
                    Next
                </button>
            </div>
        </div>
    );
  
}

export default ProductMaster