import { AiFillFacebook } from 'react-icons/ai'
import { FaInstagramSquare } from 'react-icons/fa'






export const MainFooter = () => {


    return (
        <footer className="bg-black p-4 fixed bottom-0 left-0 w-full">
            <div className='flex justify-end'>
                <div className="text-white mr-5"><AiFillFacebook /> </div>
                <div className="text-white mr-5"><FaInstagramSquare /> </div>
            </div>
        </footer>
    )





}