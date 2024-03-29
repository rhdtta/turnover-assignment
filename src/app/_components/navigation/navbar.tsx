import cart from '../../../../public/icons/cart.svg';
import search from '../../../../public/icons/search.svg';
import left from '../../../../public/icons/left.svg';
import right from '../../../../public/icons/right.svg';
import Image from 'next/image';

export function Navbar() {
    return(
        <nav>
            <div className="flex flex-col gap-2 px-10 pt-4 pb-6">
                <div className="flex justify-end text-xs gap-5 text-[#333333]">
                    <span>Help</span>
                    <span>Orders & Returns</span>
                    <span>Hi, John</span>
                </div>
                <div className="flex justify-between text-4xl font-bold align-baseline text-center items-end">
                    <div className="logo float-left">
                        ECOMMERCE
                    </div>
                    <div className='navigation-links flex gap-8 text-base font-semibold relative left-[-75px]'>
                        <span>Categories</span>
                        <span>Sales</span>
                        <span>Clearance</span>
                        <span>New stock</span>
                        <span>Trending</span>
                    </div>
                    <div className="actions flex gap-8 float-left">
                        <Image className="h-10" src={search} alt="search"/>
                        <Image className="h-10" src={cart} alt="cart"/>
                    </div>
                </div>
            </div>
            <div className='flex justify-center items-center gap-5 h-9 bg-[#F4F4F4]'>
                <Image src={left} alt="left"/>
                <span>Get 10% off on business signup</span>
                <Image src={right} alt="right"/>
            </div>
        </nav>
    )
}