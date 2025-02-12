import React from 'react'


const Table = ({ headers, data, type }) => {

    const checkStatus = (status) => {
        switch (status.toLowerCase()) {
            case "published":
                return "bg-[#BAF0DA] text-green-700  before:bg-green-500";
            case "unpublished":
                return "bg-orange-100 text-orange-700  before:bg-orange-500";
            case "draft":
                return "bg-gray-100 text-gray-700  before:bg-gray-500";
            default:
                return "bg-gray-100 text-gray-700  before:bg-gray-500";
        }
    }

    let productCode ;
    return (

        <div className=" overflow-x-auto w-10/12 mx-auto ">
            <table className="shadow-md w-full border-collapse border border-gray-300 table-fixed">
                <thead>
                    <tr className="bg-gray-200 text-black">
                        {headers.map((header, index) => (
                            <th key={index} className=" px-4 py-2 border border-gray-300 text-left text-[#202223] ">
                                {header.Label}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.length > 0 ? (
                        data.map((row, rindex) => (
                            <tr key={rindex} className="hover:bg-gray-100 transition">
                                {headers.map((cell, cindex) => (
                                    <td key={cindex} className="border border-gray-300 px-4 py-2 text-black overflow-hidden text-ellipsis whitespace-nowrap min-w-max">
                                        {/* {cell.fieldKey === "product_code" ? (productCode = row[cell.fieldKey]) : null} */}

                                        {cell.fieldKey === "publish_status" ? (
                                            <span className={`inline-flex items-center gap-2 px-3 py-1 text-sm font-medium border rounded-full ${checkStatus(row[cell.fieldKey])}`}>
                                                <span className="w-2 h-2 rounded-full bg-current"></span>
                                                {row[cell.fieldKey]}
                                            </span>
                                        ) : cell.customField ? (cell.customField(row)) : (
                                            row[cell.fieldKey] || "-"
                                        )}
                                    </td>
                                ))}
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={headers.length} className="text-center py-4 text-gray-500">
                                No Product Data.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )

}

export default Table