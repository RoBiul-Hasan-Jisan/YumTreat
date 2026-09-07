export const validateFoodForm = (formData) => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = 'Food name is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (!formData.imageUrl.trim()) newErrors.imageUrl = 'Image URL is required';
    if (!formData.category) newErrors.category = 'Category is required';
    if (!formData.currentPrice || parseFloat(formData.currentPrice) <= 0) {
        newErrors.currentPrice = 'Valid current price is required';
    }

    if (formData.pastPrice && parseFloat(formData.pastPrice)) {
        if (parseFloat(formData.pastPrice) < 0) {
            newErrors.pastPrice = 'Price cannot be negative';
        } 
    }

    return newErrors;
};
