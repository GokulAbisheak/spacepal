import React from 'react';

const Loading = () => {
    return (
        <div className='w-full h-screen bg-black bg-opacity-70 fixed top-0 left-0 flex items-center justify-center z-[1000]'>
            <div className='w-[100px] h-[100px] rounded-full border-8 border-neutral-300 border-t-blue-500 animate-spin'>
            </div>
        </div>
    );
}

export default Loading;
