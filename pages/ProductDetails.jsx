// import {Link} from 'react-router-dom';


// function ProductDetails({product}) {
//     const BASE_URL = import.meta.env.VITE_DJANGO_BASE_URL;

//     return (
//         <Link to={`/product/${product.id}`} className='block bg-white rounded-xl shadow-md hover:shadow-lg hover:scale-[1.02] transition-transform p-4 cursor-pointer'>
//             <img 
//                 src={`${BASE_URL}${product.image}`} 
//                 alt={product.name}
//             />
//             <h2 className="text-lg font-semibold mb-2 text-gray-800 truncate">{product.name}</h2>
//             <p className="text-gray-600 font-medium">${Number(product.price).toFixed(2)}</p>
//             <p className='text-gray-500 mt-2'>{product.description}</p>
//         </Link>
//     )
// }

// export default ProductDetails;







import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function ProductDetails() {
    const {id} = useParams();
    const BASE_URL = import.meta.env.VITE_DJANGO_BASE_URL;
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    useEffect(()=> {
        fetch(`${BASE_URL}/api/products/${id}/`) 
        .then((response)=>{
            if (!response.ok) {
                throw new Error('Failed to fetch products details')
            }
            return response.json();
        })
        .then((data)=>{
            setProduct(data);
            setLoading(false);
        })
        .catch((error)=>{
            setError(error.message);
            setLoading(false);
        });
    },[id, BASE_URL]);
    
    if (loading) {
        return (
            <div>Loading...</div>
        );
    }
    if (error) {
        return <div>Error: {error}</div>;
    }
    if (!product) {
        return <div>No Product Found</div>
    }

    return (
        <div className="min-h-screen bg-gray-100 flex justify-center items-center py-10">
            <div className="bg-white rounded-xl shadow-md p-6 max-w-3xl w-full">
                <div className="flex flex-col md:flex-row">
                   <img 
                   src={product.image}
                   alt={product.name} className="w-full h-56 object-cover rounded-lg mb-4" /> 
                   <div className="flex-1">
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">
                        {product.name}
                    </h1>
                    
                     <p className='text-gray-500 mt-2'>{product.description}</p>
                     <p className="text-gray-600 font-medium">${Number(product.price).toFixed(2)}</p>
                     <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
                        Add to Cart
                     </button>
                   </div>
                </div>

            </div>
        </div>
    )
} 

export default ProductDetails;