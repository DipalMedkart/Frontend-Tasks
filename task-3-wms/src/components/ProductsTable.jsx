import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

const ProductsTable = () => {
    const products = useSelector(state => state.prod.products);
    console.log(products);
    const dispatch = useDispatch();

    return (
        <div className="w-10/12 mx-auto">
            <table className="w-full border-collapse border border-gray-300 shadow-md px-20">
                <thead className="bg-gray-200 text-black">
                    <tr>
                        <th className="border border-gray-300 px-4 py-2">Product Code</th>
                        <th className="border border-gray-300 px-4 py-2">Wondersoft Code</th>
                        <th className="border border-gray-300 px-4 py-2">Product Name</th>
                        <th className="border border-gray-300 px-4 py-2">Manufacturer</th>
                        <th className="border border-gray-300 px-4 py-2">Combination</th>
                        <th className="border border-gray-300 px-4 py-2">Status</th>
                        <th className="border border-gray-300 px-4 py-2">buttons</th>
                    </tr>
                </thead>
                <tbody>
                    {products.length > 0 ? (
                        products.map((product) => (
                            <tr key={product.product_id} className="hover:bg-gray-100 transition">
                                <td className="border border-gray-300 px-4 py-2 text-black">{product.product_code}</td>
                                <td className="border border-gray-300 px-4 py-2 text-black">{product.ws_code}</td>
                                <td className="border border-gray-300 px-4 py-2 text-black">{product.product_name}</td>
                                <td className="border border-gray-300 px-4 py-2 text-black">{product.manufacturer}</td>
                                <td className="border border-gray-300 px-4 py-2 text-black">{product.combination}</td>
                                <td className="border border-gray-300 px-4 py-2 text-black">{product.publish_status}</td>
                                <td className="border border-gray-300 px-4 py-2 text-black">✏️ </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="6" className="text-center py-4 text-gray-500">
                                No products found.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default ProductsTable