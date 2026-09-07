import React from 'react';

const menuCategories = [
    {
        title: "Breakfast",
        items: [
            { name: "Morning Breakfast", description: "A healthy start to your day.", price: "$49.99" },
            { name: "Pancakes", description: "Fluffy pancakes with syrup.", price: "$39.99" },
        ],
    },
    {
        title: "Lunch",
        items: [
            { name: "Grilled Chicken", description: "Juicy grilled chicken with veggies.", price: "$59.99" },
            { name: "Pasta", description: "Creamy Alfredo pasta.", price: "$44.99" },
        ],
    },
    {
        title: "Dinner",
        items: [
            { name: "Steak", description: "Perfectly grilled steak.", price: "$79.99" },
            { name: "Salmon", description: "Grilled salmon with lemon butter.", price: "$69.99" },
        ],
    },
    {
        title: "Dessert",
        items: [
            { name: "Chocolate Cake", description: "Rich chocolate cake.", price: "$29.99" },
            { name: "Ice Cream", description: "Vanilla ice cream with toppings.", price: "$19.99" },
        ],
    },
    {
        title: "Drinks",
        items: [
            { name: "Cold Coffee", description: "Iced coffee with milk.", price: "$9.99" },
            { name: "Fresh Juice", description: "Natural fruit juice.", price: "$7.99" },
        ],
    },
];

const OurMenu = () => {
    return (
        <section className="container-page py-20 md:py-28">
            <div className="text-center mb-14">
                <span className="eyebrow text-lg">Full menu</span>
                <h2 className="text-3xl font-medium text-[var(--color-ink)] mt-1">Our menu, by mealtime</h2>
            </div>
            {menuCategories.map((category, index) => (
                <div key={index} className="mb-12 last:mb-0">
                    <h3 className="text-xl font-medium text-[var(--color-ink)] mb-5 pb-3 border-b border-[var(--color-line)]">
                        {category.title}
                    </h3>
                    <div className="grid md:grid-cols-2 gap-4">
                        {category.items.map((item, idx) => (
                            <div
                                key={idx}
                                className="p-5 rounded-2xl border border-[var(--color-line)] bg-white flex justify-between items-center gap-4 hover:border-[var(--color-accent)] transition-colors"
                            >
                                <div>
                                    <h4 className="text-base font-medium text-[var(--color-ink)]">{item.name}</h4>
                                    <p className="text-[var(--color-ink-soft)] text-sm mt-1">{item.description}</p>
                                </div>
                                <span className="text-base font-semibold text-[var(--color-accent)] whitespace-nowrap">{item.price}</span>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </section>
    );
};

export default OurMenu;