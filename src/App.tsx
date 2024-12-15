import React, {ChangeEvent, useState} from 'react';
import './App.css';

function App() {
    const [currentValue, setCurrentValue] = useState<number | null>(null);
    const [maxValue, setMaxValue] = useState<number>(5)
    const [startValue, setStartValue] = useState<number>(0)
    const [isSettingMenu, setIsSettingMenu] = useState<boolean>(true)
    const [error, setError] = useState<WithImplicitCoercion<any>>(false)


    const handleStartValueChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.currentTarget.value)
        setStartValue(value)
        setError(value <= 0 || value <= maxValue)
    }
    const handleMaxValueChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.currentTarget.value, 10)
        setMaxValue(value)
        setError(value < startValue || startValue < 0)
    }
    const handleSet = () => {
        setCurrentValue(startValue)
        setIsSettingMenu(true)
    }
    const incHandler = () => {
        if (currentValue !== null && currentValue < maxValue) {
            setCurrentValue(currentValue + 1);
        }
    }
    const handleReset = () => {
        setStartValue(0);
        setMaxValue(5);
        setCurrentValue(null);
        setError(false);
    }
    const setHandler = () => {
        setIsSettingMenu(false)
        if (!error) {
            setCurrentValue(startValue);
        }
    }


    return (
        <div className="App">

            <div className='container'>
                {
                    isSettingMenu
                        ? <div className='blockDisplay'>
                            <div className='values'>
                                {
                                    currentValue !== null
                                        ? <h4>{currentValue}</h4>
                                        : <h4>'Press 'Set' to configure values'</h4>
                                }
                            </div>

                            <div className='buttons'>
                                <button onClick={incHandler}>inc</button>
                                <button onClick={handleReset}>reset</button>
                                <button onClick={setHandler}>set</button>
                            </div>
                        </div>


                        : <div className='boxValue'>
                            <div className="inputs">
                                <div className='input'>
                                    <label>Max Value:</label>
                                    <input
                                        type="number"
                                        value={maxValue}
                                        onChange={handleMaxValueChange}
                                        className={error ? "error" : ""}
                                    />
                                </div>
                                <div className='input'>
                                    <label>Start Value:</label>
                                    <input
                                        type="number"
                                        value={startValue}
                                        onChange={handleStartValueChange}
                                        className={error ? "error" : ""}
                                    />
                                </div>
                            </div>
                            <div className='set_buttons'>
                                <button onClick={handleSet}>Set</button>
                            </div>
                        </div>
                }
            </div>
        </div>
    );
}

export default App;