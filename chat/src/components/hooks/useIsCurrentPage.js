import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'

function useIsCurrentPage(pageId) {
    const currentURL = useLocation()
    const [isCurrent, setIsCurrent] = useState(false)

    useEffect(() => {
        const URL_ARR = currentURL.pathname.split('/')
        if (URL_ARR[1] !== 'dialogs' || Number(URL_ARR[2]) !== pageId) {
            setIsCurrent(false)
        } else {
            setIsCurrent(true)
        }
    }, [currentURL])

    return isCurrent
}

export default useIsCurrentPage