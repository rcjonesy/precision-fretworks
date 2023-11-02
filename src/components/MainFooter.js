import { AiFillFacebook } from 'react-icons/ai'
// import { FaInstagramSquare } from 'react-icons/fa'
import { BsInstagram } from 'react-icons/bs'
import { BsFacebook } from 'react-icons/bs'
import { Link } from 'react-router-dom'






export const MainFooter = () => {


    return (
        <footer className="fixed bottom-5 right-0 w-1/4 bg-gradient-to-b p-4 pt-9 pb-3">
            <div className='flex justify-end items-center h-full'>
                <div>
                    <Link to="http://www.facebook.com">
                        <button className="mr-7 text-3xl text-blue-600 p-0 border-none rounded-full m-0 hover:text-blue-700">
                            <BsFacebook />
                        </button>
                    </Link>
                </div>
                <div>
                    <Link to="http://www.instagram.com">
                        <button className="text-white mr-20 text-3xl bg-gradient-to-r from-[#fa7e1e] via-[#d62976] to-[#962fbf] rounded-full ml-8 hover:from-[#ff9926] hover:via-[#ff3e4c] hover:to-[#a44cc7]">
                            <BsInstagram />
                        </button>
                    </Link>
                </div>


            </div>

        </footer>
    )




}