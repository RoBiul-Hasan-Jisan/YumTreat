import React from "react";
import t1 from "../../assets/image/our-team-1.jpg";
import t2 from "../../assets/image/our-team-2.jpg";
import t3 from "../../assets/image/our-team-3.jpg";
import t4 from "../../assets/image/our-team-4.jpg";
import t5 from "../../assets/image/our-team-5.jpg";
import t6 from "../../assets/image/our-team-6.jpg";

const teamMembers = [
    { name: "John Deo", image: t1 },
    { name: "John Deo", image: t2 },
    { name: "John Deo", image: t3 },
    { name: "John Deo", image: t4 },
    { name: "John Deo", image: t5 },
    { name: "John Deo", image: t6 },
];

const OurTeam = () => {
    return (
        <section className="container-page py-16 md:py-24 text-center">
            <div className="max-w-2xl mx-auto mb-16">
                <span className="eyebrow text-lg">Our story</span>
                <h1 className="text-3xl md:text-4xl font-medium text-[var(--color-ink)] mt-2 mb-5">
                    Cooking with care, since day one
                </h1>
                <p className="text-[var(--color-ink-soft)] leading-relaxed">
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Non veniam culpa officiis, quos repudiandae
                    amet quam beatae deleniti laborum sit vero fugit quas dolorem ea accusamus sed ipsa obcaecati
                    provident voluptates architecto voluptate unde assumenda.
                </p>
            </div>
            <div className="mb-10">
                <span className="eyebrow text-lg">The people behind it</span>
                <h2 className="text-3xl font-medium text-[var(--color-ink)] mt-1">Our team</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {teamMembers.map((member, index) => (
                    <div key={index} className="rounded-2xl overflow-hidden border border-[var(--color-line)] bg-white text-left">
                        <img src={member.image} alt={member.name} className="w-full h-64 object-cover" />
                        <h3 className="text-base font-medium text-[var(--color-ink)] p-4">{member.name}</h3>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default OurTeam;
