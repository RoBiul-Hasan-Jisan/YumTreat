import React from 'react';
import { TailSpin } from 'react-loader-spinner';

const Loader = () => {
    return (
        <div className="flex justify-center items-center h-screen bg-[var(--color-paper)]">
            <TailSpin
                height="60"
                width="60"
                color="#c2410c"
                ariaLabel="tail-spin-loading"
                radius="1"
                visible={true}
            />
        </div>
    );
};

export default Loader;
