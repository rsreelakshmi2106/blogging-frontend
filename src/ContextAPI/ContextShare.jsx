import React, { createContext, useState } from 'react'

export const addBlogResponseContext = createContext()

function ContextShare({ children }) {
    const [addBlogResponse, setAddBlogPresponse] = useState("")
    return (
        <>
            <addBlogResponseContext.Provider value={{ addBlogResponse, setAddBlogPresponse }}>
                {children}
            </addBlogResponseContext.Provider>
        </>
    )
}

export default ContextShare