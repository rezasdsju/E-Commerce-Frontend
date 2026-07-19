import {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { authFetch } from '../utils/auth';
import { useCart } from '../context/CartContext';

function CheckoutPage() {
    const BASEURL = import.meta.env.VITE_DJANGO_BASE_URL;
    const navigate = useNavigate();
    const {clearCart} = useCart();

    const [form, setForm] = useState({
        name : "",
        address : "",
        phone : "",
        payment_method : "COD",
    });
    
    const [loading, setLoading] = useState(false);
    const [messege, setMessege] = useState(null);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]:e.target.value
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessege("");
        try {
            const res = await authFetch(`${BASEURL}/api/orders/create/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(form)
            });
            const data = await res.json();
            if (res.ok) {
                setMessege("Order Placed Successfully");
                // FIX: Removed the extra fetch call
                clearCart();
                setTimeout(()=>{
                    navigate("/");
                }, 2000);
            } else {
                setMessege(data.error || "Failed to place order. Please try again"); // FIX: was data.erro
            }
        } catch (error) {
            setMessege('An error occured. Please try again');
        }
    }

    return (
        <div className='min-h-screen bg-gray-100 flex justify-center items-center p-6'>
            <div className='bg-white p-8 rounded-2xl shadow-lg w-full max-w-md'>
                <h2 className='text-2xl font-bold mb-6 text-center'>Checkout</h2>

                <form onSubmit={handleSubmit} className='space-y'>
                    <input 
                        type="text"
                        name="name"
                        placeholder='Full Name'
                        value={form.name}
                        onChange={(e)=>setForm({...form, name: e.target.value})} 
                        required
                        className='w-full border rounded-lg p-2' />

                    <textarea 
                        name="address" 
                        placeholder="Address"
                        value={form.address}
                        onChange={handleChange}
                        required
                        className='w-full border rounded-lg p-2'>
                    </textarea>
                    <input 
                        type="tel"
                        name='phone'
                        placeholder='phone number' 
                        value={form.phone}
                        onChange={handleChange}
                        required
                        className='w-full border rounded-lg p-2'
                    />

                    <select name="payment_method" 
                        value={form.payment_method}
                        onChange={handleChange}
                        className='w-full border rounded-lg p-2'        
                    >
                        <option value="COD">Cash on Delivery</option>
                        <option value="CreditCard">Online Delivery</option>
                    </select>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-600 transition duration">
                        {loading?"Processing...":"Place Order"}
                    </button>
                    {
                        messege && (
                            <p className={`text-center text-green-700 font-semibold mt-4`}>{messege}</p>
                        )
                    }
                </form>
            </div>
        </div>
    )
}

export default CheckoutPage;