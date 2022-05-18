import { createContext } from "react";


const RegistroContext = createContext()

function RegistroWrapper(props) {
    return (
        <RegistroContext.Provider>
            {props.children}
        </RegistroContext.Provider>
    )
}

export { RegistroContext, RegistroWrapper }