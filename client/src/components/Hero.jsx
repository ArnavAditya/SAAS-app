import React from 'react'
import { assets } from '../assets/assets'

function Hero() {
    return (
        <div className='px-4 sm:px-20 xl:px-32 relative inline-flex flex-col w-full justify-center bg-[url(/gradientBackground.png)] bg-cover bg-no-repeat min-h-screen'>

            <div className='text-center mb-3 -mt-20'>
                <h1 className='text-3xl sm:text-5xl md:text-6xl 2xl:text-7xl font-semibold mx-auto leading-[1.2]'>
                    Drive innovation <br /> with <span className='text-primary'>AI excellence</span>
                </h1>
                <p className='mt-4 max-w-xs sm:max-w-lg 2xl:max-w-xl m-auto max-sm:text-xs text-gray-600'>
                    Transform your workflow with cutting-edge AI technology designed to boost creativity, accuracy, and performance.
                </p>

            </div>

            <div className='flex items-center gap-4 mt-8 mx-auto text-gray-600'>
                <img src={assets.user_group} alt='' className='h-8'/> Trusted by 5k+ people
            </div>

        </div>
    )
}

export default Hero
