import '../../assets/png/Stockie_logo.png';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { SearchBar } from '../common/SearchBar';
import { Link } from 'react-router';


export const TopNav = () => {
    return (
        <div className="w-full h-16 flex items-center justify-between px-5 border-neutral-800 border-b-[0.5px]">
            <div>
                <Link to="/" className='flex flex-row items-center gap-2'>
                    <img width={30} src='/src/assets/png/Stockie_logo.png' className='m-0' />
                    <h1 className="text-white text-2xl font-bold m-0">Stockie</h1>
                </Link>
            </div>
            <SearchBar width='200' icon={faSearch} placeholder="Search..." onChange={() => { }} />
            <div className="flex items-center gap-5">
                <button className="flex items-center justify-center transition-colors w-10 h-10 border-neutral-800 border-[0.5px] rounded-full cursor-pointer"><img className='rounded-full object-cover' src='/src/assets/png/Stockie_logo.png' /></button>
            </div>
        </div>
    )
}