import React, { useContext, useEffect } from 'react';
import Category from '../../components/Category/Category';
import OrderForm from './OrderForm';
import OurMenu from './OurMenu';
import FoodLists from './FoodLists';
import { FoodsContext } from '../../Context/FoodsContext';
import Loader from '../../components/Loader/Loader';

const Menu = () => {
    const { loading } = useContext(FoodsContext);
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    if (loading) {
        return <Loader />;
    }

    return (
        <div>
            <Category />
            <FoodLists />
            <OrderForm />
            <OurMenu />
        </div>
    );
};

export default Menu;
