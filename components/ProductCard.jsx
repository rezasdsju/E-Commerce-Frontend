function ProductCard({product}) {
    return (
        <div className="bg-white rounded-xl shadow-lg overflow-hidden max-w-sm hover:shadow-xl transition-shadow duration-300">
            {/* <img src="{product.image}" alt="{product.name}" className="w-full h-56 object-cover rounded-lg mb-4" /> */}
            <h2 className="text-lg font-semibold mb-2 text-gray-800 truncate">{product.name}</h2>
            <p className="text-gray-600 font-medium">${Number(product.price).toFixed(2)}</p>
        </div>
    )
}


export default ProductCard;