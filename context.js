import React, { useState } from 'react'

export const IndexContext = React.createContext({ index: 0, setIndex: (v) => { } });
export const HintColorContext = React.createContext('');
export const ThemeContext = React.createContext({ darkTheme: false, setDarkTheme: (v) => { } });


const Context = ({ children }) => {
    const [index, setIndex] = useState(0);
    const [hintColor] = useState("rgb(61, 78, 159)");
    const [darkTheme, setDarkTheme] = useState(false);

    return (

        <IndexContext.Provider value={{ index, setIndex }}>
            <HintColorContext.Provider value={hintColor}>
                <ThemeContext.Provider value={{ darkTheme, setDarkTheme }}>
                    {children}
                </ThemeContext.Provider>

            </HintColorContext.Provider>
        </IndexContext.Provider>
    )
}

export default Context;