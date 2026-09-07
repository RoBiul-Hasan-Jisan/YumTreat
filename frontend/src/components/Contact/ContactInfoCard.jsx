import React from "react";
import icon1 from "../../assets/image/icon-1.png";
import icon2 from "../../assets/image/icon-2.png";
import icon3 from "../../assets/image/icon-3.png";

const ITEMS = [
    { img: icon1, text: "7:00am – 10:30pm" },
    { img: icon2, text: "+880 1234567890" },
    { img: icon2, text: "info.yumtreat@health.co" },
    { img: icon3, text: "Rajshahi, Bangladesh" },
];

const ContactInfoCard = () => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
            {ITEMS.map((item, i) => (
                <div key={i} className="p-6 text-center bg-white rounded-2xl border border-[var(--color-line)]">
                    <img src={item.img} alt="" className="h-14 mx-auto object-contain" />
                    <h3 className="text-sm font-medium text-[var(--color-ink)] mt-4">{item.text}</h3>
                </div>
            ))}
        </div>
    );
};

export default ContactInfoCard;
