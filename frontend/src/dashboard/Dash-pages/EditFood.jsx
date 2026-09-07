import { useEffect, useState } from 'react';
import { useNavigate, useParams, NavLink } from 'react-router-dom';
import axios from 'axios';
import { validateFoodForm } from '../utils/foodValidation';
import { useCategoryContext } from '../../Context/CategoryContext';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

const EditFood = () => {
    const { id } = useParams(); // get the food id from URL
    const navigate = useNavigate();
    const { categories } = useCategoryContext();
    const [errors, setErrors] = useState({});
    const [foodData, setFoodData] = useState({
        name: '',
        description: '',
        imageUrl: '',
        rating: 0,
        numberOfReviews: 0,
        currentPrice: 0,
        pastPrice: 0,
        category: '',
        tags: [],
        customOrder: false,
        isAvailable: true,
        isPopular: false,
        isSpecial: false,
        isSuperDeals: false
    });

    // Fetch food details
    useEffect(() => {
        const fetchFood = async () => {
            try {
                const res = await fetch(`http://localhost:5000/api/foods/${id}`);
                if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
                const data = await res.json();
                setFoodData(data);
            } catch (error) {
                console.error('Error fetching food:', error);
            }
        };
        fetchFood();
    }, [id]);


    // Handle input change
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFoodData((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    //form validation
    const validateForm = () => {
        const validationErrors = validateFoodForm(foodData);
        setErrors(validationErrors);
        return Object.keys(validationErrors).length === 0;
    };

    // Handle form submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        try {
            await axios.put(`http://localhost:5000/api/foods/update/${id}`, foodData);
            alert('Food updated successfully!');
            // await fetchFoods();
            navigate(-1); // go back to previous page
        } catch (error) {
            console.error('Error updating food:', error);
            alert('Failed to update food.');
        }
    };

    // Handle delete food
    const handleDelete = async () => {
        const confirmDelete = window.confirm('Are you sure you want to delete this food?');
        if (!confirmDelete) return;
        try {
            await axios.delete(`http://localhost:5000/api/foods/delete/${id}`);
            alert('Food deleted successfully!');
            navigate(-1);
        } catch (error) {
            console.error('Error deleting food:', error);
            alert('Failed to delete food.');
        }
    };

    // console.log(foodData);

    return (
        <div className="max-w-4xl mx-auto p-8">
            <h1 className="text-3xl font-bold text-center mb-8">Edit Food</h1>
            <h4 className='font-bold text-center'>Food ID: {id}</h4>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6">
                <label className="flex flex-col">
                    <span className="font-medium mb-1">Food Name</span>
                    <input
                        type="text"
                        name="name"
                        value={foodData.name}
                        onChange={handleChange}
                        placeholder="Food Name"
                        className={`border rounded p-3 ${errors.name ? 'border-red-500' : ''}`}
                        required
                    />
                </label>

                <label className="flex flex-col">
                    <span className="font-medium mb-1">Description</span>
                    <textarea
                        name="description"
                        value={foodData.description}
                        onChange={handleChange}
                        placeholder="Description"
                        className={`border rounded p-3 ${errors.description ? 'border-red-500' : ''}`}
                        required
                    ></textarea>
                </label>

                <label className="flex flex-col">
                    <span className="font-medium mb-1">Image URL</span>
                    <input
                        type="text"
                        name="imageUrl"
                        value={foodData.imageUrl}
                        onChange={handleChange}
                        placeholder="Image URL"
                        className={`border rounded p-3 ${errors.imageUrl ? 'border-red-500' : ''}`}
                        required
                    />
                </label>

                <label className="flex flex-col">
                    <span className="font-medium mb-1">Rating</span>
                    <input
                        type="number"
                        name="rating"
                        value={foodData.rating}
                        onChange={handleChange}
                        placeholder="Rating"
                        className={`border rounded p-3`}
                    />
                </label>

                <label className="flex flex-col">
                    <span className="font-medium mb-1">Number of Reviews</span>
                    <input
                        type="number"
                        name="numberOfReviews"
                        value={foodData.numberOfReviews}
                        onChange={handleChange}
                        placeholder="Number of Reviews"
                        className={`border rounded p-3 `}
                    />
                </label>

                <label className="flex flex-col">
                    <span className="font-medium mb-1">Current Price</span>
                    <input
                        type="number"
                        name="currentPrice"
                        value={foodData.currentPrice}
                        onChange={handleChange}
                        placeholder="Current Price"
                        className={`border rounded p-3 ${errors.currentPrice ? 'border-red-500' : ''}`}
                        required
                    />
                </label>

                <label className="flex flex-col">
                    <span className="font-medium mb-1">Past Price</span>
                    <input
                        type="number"
                        name="pastPrice"
                        value={foodData.pastPrice}
                        onChange={handleChange}
                        placeholder="Past Price"
                        className={`border rounded p-3 ${errors.pastPrice ? 'border-red-500' : ''}`}
                    />
                    {errors.pastPrice && <p className="mt-1 text-sm text-red-600">{errors.pastPrice}</p>}
                </label>

                <label className="flex flex-col">
                    <span className="font-medium mb-1">Category</span>
                    <select
                        id="category"
                        name="category"
                        value={foodData.category}
                        onChange={handleChange}
                        className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500 p-2 border ${errors.category ? 'border-red-500' : ''}`}
                    >
                        {/* Show the current category name as selected (if available) */}
                        {!foodData.category && <option value="">Select a category</option>}
                        {foodData.category && !categories.find(c => c._id === foodData.category) && (
                            <option value={foodData.category} disabled>{foodData.category}</option>
                        )}

                        {Array.isArray(categories) && categories.map(category => (
                            <option key={category._id} value={category._id}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                    {errors.category && <p className="mt-1 text-sm text-red-600">{errors.category}</p>}
                </label>

                <label className="flex flex-col">
                    <span className="font-medium mb-1">Tags (comma separated)</span>
                    <input
                        type="text"
                        name="tags"
                        value={foodData.tags.join(',')}
                        onChange={(e) =>
                            setFoodData({ ...foodData, tags: e.target.value.split(',') })
                        }
                        placeholder="e.g. spicy,vegan,new"
                        className={`border rounded p-3 ${errors.tags ? 'border-red-500' : ''}`}
                    />
                </label>

                <div className="flex items-center gap-6">
                    <label className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            name="customOrder"
                            checked={foodData.customOrder}
                            onChange={handleChange}
                        />
                        Custom Order
                    </label>

                    <label className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            name="isAvailable"
                            checked={foodData.isAvailable}
                            onChange={handleChange}
                        />
                        Available {foodData.isAvailable ? (
                            <FaCheckCircle className="text-green-500" />
                        ) : (
                            <FaTimesCircle className="text-red-500" />
                        )}
                    </label>
                    <label className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            name="isPopular"
                            checked={foodData.isPopular}
                            onChange={handleChange}
                        />
                        Popular Food
                    </label>
                    <label className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            name="isSpecial"
                            checked={foodData.isSpecial}
                            onChange={handleChange}
                        />
                        Special Food
                    </label>
                    <label className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            name="isSuperDeals"
                            checked={foodData.isSuperDeals}
                            onChange={handleChange}
                        />
                        Super Deals Food
                    </label>
                </div>

                <div className="flex justify-between gap-6">
                    <button
                        type="submit"
                        className="bg-green-500 text-white py-3 px-6 rounded-lg hover:bg-green-700 transition"
                    >
                        Update Food
                    </button>

                    <button
                        type="button"
                        onClick={handleDelete}
                        className="bg-red-500 text-white py-3 px-6 rounded-lg hover:bg-red-700 transition"
                    >
                        Delete Food
                    </button>
                    <NavLink to="/admin-dashboard" className="bg-sky-500 text-white py-3 px-6 rounded-lg hover:bg-red-700 transition">Cancle</NavLink>
                </div>
            </form>
        </div>

    );
};

export default EditFood;
