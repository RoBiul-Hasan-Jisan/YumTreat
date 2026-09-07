import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { FoodsContext } from "../../Context/FoodsContext";
import { FaStar, FaStarHalfAlt, FaRegStar, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
// import f1 from '../../assets/foods/'

const EditFoods = () => {
    const navigate = useNavigate();
    const { foods, loading } = useContext(FoodsContext);

    const handleEdit = (foodId) => {
        console.log('Edit food:', foodId);
        navigate(`/admin-dashboard/edit-food/${foodId}`);
    };

    if (loading) {
        return <div className="text-center mt-10 text-lg font-semibold">Loading...</div>;
    }

    return (
        <div className="p-4">
            <h1 className="text-3xl font-bold text-center mb-8">Manage Foods</h1>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-8 mb-8 text-center">
                <div className="bg-white shadow-md rounded-lg p-6 w-60">
                    <h3 className="text-lg font-semibold text-sky-700 mb-2">Total Foods</h3>
                    <p className="text-2xl font-bold text-gray-900">{foods.length}</p>
                </div>

                <div className="bg-white shadow-md rounded-lg p-6 w-60">
                    <h3 className="text-lg font-semibold text-green-600 mb-2">Total Active Foods</h3>
                    <p className="text-2xl font-bold text-gray-900">
                        {foods.filter((food) => food.isAvailable).length}
                    </p>
                </div>

                <div className="bg-white shadow-md rounded-lg p-6 w-60">
                    <h3 className="text-lg font-semibold text-red-600 mb-2">Total Deactive Foods</h3>
                    <p className="text-2xl font-bold text-gray-900">
                        {foods.filter((food) => !food.isAvailable).length}
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 px-4">
                {foods.map((food) => (
                    <div key={food._id} className="bg-gray-100 p-6 rounded-2xl text-center relative shadow-lg">

                        {/* Food Image */}
                        <div className="mb-4">
                            <img
                                src={`../src/assets/foods/${food.imageUrl}.png`}
                                alt={food.name}
                                className="h-40 mx-auto object-cover"
                            />
                        </div>

                        {/* Food Name */}
                        <h3 className="text-xl font-semibold text-gray-900">{food.name}</h3>

                        {/* Rating (optional) */}
                        <div className="flex justify-center items-center gap-1 text-yellow-500 my-2">
                            {[...Array(5)].map((_, index) => (
                                <span key={index}>
                                    {food.rating === 0
                                        ? <FaRegStar />  // Show empty star if rating 0
                                        : (index < Math.floor(food.rating) ? <FaStar /> : <FaStarHalfAlt />)}
                                </span>
                            ))}
                            <span className="text-gray-500 text-sm">({food.reviews || 0})</span>
                        </div>


                        {/* Price (optional) */}
                        <div className="text-lg font-bold text-gray-900">
                            ${food.currentPrice || '0'}
                            {!food.pastPrice == 0 && (
                                <span className="text-gray-500 line-through text-sm ml-2">
                                    ${food.pastPrice}
                                </span>
                            )}
                        </div>

                        {/* Availability Status */}
                        <div className="flex justify-center items-center gap-2 mt-3">
                            {food.isAvailable ? (
                                <div className="flex items-center text-green-600 font-medium">
                                    <FaCheckCircle className="mr-1" /> Available
                                </div>
                            ) : (
                                <div className="flex items-center text-red-600 font-medium">
                                    <FaTimesCircle className="mr-1" /> Not Available
                                </div>
                            )}
                        </div>

                        {/* Edit and Delete Buttons */}
                        <div className=" mt-6">
                            <button
                                onClick={() => handleEdit(food._id)}
                                className="bg-blue-500 w-[100%] hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
                            >
                                Edit Food
                            </button>
                        </div>

                    </div>
                ))}
            </div>
        </div>
    );
};

export default EditFoods;
