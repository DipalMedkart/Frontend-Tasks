import React from 'react'
import Link from 'next/link';
import Options from '@/components/Options';
import ProductsTable from '@/components/ProductsTable';
import Pagination from '@/components/Pagination';
import { useSelector, useDispatch } from 'react-redux';
import { fetchSelectOptionsRequest } from '@/redux/actions/selectOptionsAction';
import Table from '@/components/Table';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import auth from '@/hoc/auth';

const ProductMaster = () => {

    const dispatch = useDispatch()
    const products = useSelector((state) => state.prod.products)
    const router = useRouter();
    console.log(products);

    const handleAddClick = () => {
        dispatch(fetchSelectOptionsRequest())
    }

    const handleEditClick = (productId) => {
        if (productId) {
            router.push(`product-master/edit-product/${productId}`)
        } else {
            toast.error("This product is not editable")
        }
    }

    const headers = [
        { Label: "Product Code", fieldKey: "product_code" },
        { Label: "Wondersoft Code", fieldKey: "ws_code" },
        { Label: "Product Name", fieldKey: "product_name" },
        { Label: "Manufacturer", fieldKey: "manufacturer" },
        { Label: "Combination", fieldKey: "combination" },
        { Label: "Status", fieldKey: "publish_status" },
        {
            customField: (row) => {
                const productId = row.product_id;
                // console.log(productId);
                // console.log(row);
                return (
                    <>
                        <button className="bg-gray-200  text-white px-2 py-1 rounded mr-2" onClick={() => handleEditClick(productId)}><img src='/edit.png' /></button>
                        <button className="bg-gray-200  text-white px-2 py-1 rounded"><img src='/copy.png' /></button>
                    </>
                )
            }
        }
    ];
    return (
        <>
            <div className="w-10/12 mx-auto py-5  rounded-lg bg-white">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-semibold text-black">Product Master</h1>
                    <Link href="/product-master/add-product">
                        <button className="bg-[#5556a6] text-white px-5 py-2 rounded-md hover:bg-[#44458e] transition" onClick={() => handleAddClick()}>
                            + Add
                        </button>
                    </Link>
                </div>
            </div>
            <div className='shadow-md  mx-auto'>


                <Options />
                {/* <ProductsTable /> */}
                <Table headers={headers} data={products} />
                <Pagination />

            </div>
        </>
    );

}

export default auth(ProductMaster)