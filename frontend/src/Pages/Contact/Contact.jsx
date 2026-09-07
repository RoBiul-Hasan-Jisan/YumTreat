import React from 'react';
import ContactInfoCard from '../../components/Contact/ContactInfoCard';
import ContactForm from './ContactForm';

const Contact = () => {
    return (
        <section id="contact" className="container-page py-16 md:py-24 text-center">
            <div className="mb-10">
                <span className="eyebrow text-lg">Contact us</span>
                <h1 className="text-3xl font-medium text-[var(--color-ink)] mt-1">We are always at your service</h1>
            </div>
            <ContactInfoCard />
            <ContactForm />
        </section>
    );
};

export default Contact;
