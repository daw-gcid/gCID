'use client';
import React, { useState } from 'react';

const RadioButtonGroup: React.FC = () => {
    const [selectedOption, setSelectedOption] = useState<string>('1');

    const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedOption(event.target.value);
    };

    return (
        <div className="grid place-items-center">
            <div className="grid w-full grid-cols-3 gap-2 rounded-xl bg-gray-200 p-1">
                <div>
                    <input
                        type="radio"
                        name="option"
                        id="1"
                        value="1"
                        className="peer hidden"
                        checked={selectedOption === '1'}
                        onChange={handleOptionChange}
                    />
                    <label
                        htmlFor="1"
                        className="block cursor-pointer select-none rounded-xl p-2 text-center peer-checked:transition peer-checked:ease-in peer-checked:bg-custom-green peer-checked:font-bold peer-checked:text-white"
                    >
                        Cliente
                    </label>
                </div>

                <div>
                    <input
                        type="radio"
                        name="option"
                        id="2"
                        value="2"
                        className="peer hidden"
                        checked={selectedOption === '2'}
                        onChange={handleOptionChange}
                    />
                    <label
                        htmlFor="2"
                        className="block cursor-pointer select-none rounded-xl p-2 text-center peer-checked:transition peer-checked:ease-in peer-checked:bg-custom-green peer-checked:font-bold peer-checked:text-white"
                    >
                        Instituto
                    </label>
                </div>

                <div>
                    <input
                        type="radio"
                        name="option"
                        id="3"
                        value="3"
                        className="peer hidden"
                        checked={selectedOption === '3'}
                        onChange={handleOptionChange}
                    />
                    <label
                        htmlFor="3"
                        className="block cursor-pointer select-none rounded-xl p-2 text-center peer-checked:transition peer-checked:ease-in peer-checked:bg-custom-green peer-checked:font-bold peer-checked:text-white"
                    >
                        Talento
                    </label>
                </div>
            </div>
        </div>
    );
};

export default RadioButtonGroup;
