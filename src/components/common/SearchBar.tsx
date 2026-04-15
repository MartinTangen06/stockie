import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRef, useState } from "react";
import { getSymbolLookUp } from '../../features/getSymbolLookUp';
import type symbolLookUp from "../../types/symbolLookUp";
import { Link, useNavigate } from "react-router-dom";
import './searchBar.css';

export const SearchBar = ({ icon, placeholder, value, onChange, width }: { icon: IconDefinition, placeholder: string, value?: string, onChange: (value: string) => void, width?: string }) => {
    const [inputValue, setInputValue] = useState(value ?? "");
    const [symbolResults, setSymbolResults] = useState<symbolLookUp | null>(null);
    const [showList, setShowList] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();

    const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        setInputValue(val);
        onChange(val);
        if (val.length > 0) {
            try {
                await getSymbolLookUp(val).then(data => {
                    setSymbolResults(data);
                    setShowList(true);
                });
            } catch (error) {
                console.error("Error fetching symbol look up:", error);
                return null;
            }
        } else {
            setShowList(false);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && inputValue.trim().length > 0) {
            navigate(`/stock/${inputValue.trim().toUpperCase()}`);
            setShowList(false);
            setInputValue("");
        }
    };

    const handleBlur = (e: React.FocusEvent) => {
        if (!containerRef.current?.contains(e.relatedTarget as Node)) {
            setShowList(false);
        }
    };

    return (
        <div ref={containerRef} onBlur={handleBlur}>
            <div className={`${width ? `w-${width}` : 'w-full'} h-10 flex items-center gap-2 bg-[#12121284] rounded-xl px-3`}>
                <FontAwesomeIcon icon={icon} className="text-gray-400" />
                <input className="bg-transparent border-none outline-none text-white w-full" placeholder={placeholder} value={inputValue} onChange={handleChange} onKeyDown={handleKeyDown} />
            </div>
            {showList && (
                <ul className={`absolute rounded-xl z-50 px-10 py-2 mt-2 flex flex-col gap-1 searchResultsContainer ${width ? `w-${width}` : 'w-full'}`}>
                    {symbolResults?.result.length === 0 && <li className="text-gray-400">No results found</li>}
                    {symbolResults?.result.map((item, index) => (
                        <li key={index} className="searchResultItem rounded-md px-2 py-1">
                            <Link to={`/stock/${item.symbol}`} onClick={() => { setShowList(false); setInputValue(""); }}>
                                {item.description} ({item.symbol})
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};