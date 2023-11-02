
import { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa"







export const MakeChangesGuitarSearch = ({ newOrder, setNewOrder, setResults, results, changedOrder }) => {

    const [input, setInput] = useState("")
    const [selectedGuitar, setSelectedGuitar] = useState(null)
    const [guitarIndex, setGuitarIndex] = useState(0)
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);


    const fetchAllGuitars = (value) => {
        return fetch("http://localhost:8088/guitars")
            .then((response) => response.json())
            .then((json) => {
                const filteredResults = json?.filter((guitar) => {
                    return value && guitar && guitar?.name && guitar?.name.toLowerCase().includes(value.toLowerCase())
                });
                setResults(filteredResults);
            });
    };


    const handleKeyDown = (event) => {
        if (!results || results?.length === 0) {
            return;
        }

        switch (event.key) {
            case 'ArrowUp':
                event.preventDefault(); // Prevent the default behavior of scrolling the page
                console.log("working")
                setGuitarIndex((prevIndex) => Math.max(prevIndex - 1, 0));
                break;
            case 'ArrowDown':
                event.preventDefault(); // Prevent the default behavior of scrolling the page
                setGuitarIndex((prevIndex) => Math.min(prevIndex + 1, results?.length - 1));
                console.log("working also")
                break;
            case 'Enter': // Listen for the Enter key
                event.preventDefault();
                if (results[guitarIndex]) {
                    handleGuitarSelection(results[guitarIndex]);
                }
                break;
            default:
                break;
        }
    }

    const clearInput = () => {
        setInput("");
        setSelectedGuitar("");
        fetchAllGuitars("");
    }

    const handleChange = (value) => {
        if (selectedGuitar) {
            clearInput();
        }
        setInput(value)
        fetchAllGuitars(value)
    }


    const handleGuitarSelection = (guitar) => {
        const newIndex = results?.findIndex((result) => result === guitar);
        setGuitarIndex(newIndex);
        const selectedGuitarName = guitar.name;
        setSelectedGuitar(selectedGuitarName);

        // Now you can use the updated value of selectedGuitarName


        const copy = { ...newOrder };
        copy.guitarType = selectedGuitarName;
        setNewOrder(copy);

        setIsDropdownOpen(false); // Close the dropdown
    };

    useEffect(() => {
        if (input === "") {
            fetchAllGuitars("");
        }
    }, [input, fetchAllGuitars]);



    return (
        <>
            <div className="search-bar relative">
                <div className="absolute right-2 top-1/4 pr-4">
                    <FaSearch className="text-black text-right" />
                </div>
                <input
                    className="appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline bg-gray-200 placeholder-gray-500 mb-2 text-left"
                    required
                    type="text"
                    placeholder="Search Guitar Type"
                    value={selectedGuitar || input || changedOrder.guitarType}
                    onKeyDown={handleKeyDown}
                    onChange={(e) => {
                        handleChange(e.target.value)
                    }}
                    onClick={() => setIsDropdownOpen(true)}
                />



            </div>
            <button className="bg-blue-600 mb-6 hover:bg-blue-800 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline" onClick={clearInput}>
                clear
            </button>
            {isDropdownOpen && (
                <div className="bg-white rounded-lg overflow-hidden shadow-lg">
                    <div className="bg-gray-200 text-black overflow-y-auto max-h-96">
                        {
                            results?.map((result, index) => {
                                return (

                                    <div
                                    className={`relative cursor-pointer ${
                                        index === guitarIndex ? 'bg-gray-400' : 'hover:bg-gray-400'
                                      } p-2 transition-all duration-300`}

                                        key={result?.id}
                                        onClick={() => handleGuitarSelection(result)}
                                    >
                                        {result?.name}
                                    </div>

                                )
                            })
                        }
                    </div>
                </div>

            )}
        </>

    )
}





// const copy = { ...newOrder }
// // copy.guitarType = selectedGuitar
// setNewOrder(copy)