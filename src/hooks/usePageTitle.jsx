import { useEffect } from 'react'

export default function usePageTitle(title) {
  useEffect(() => {
    document.title =  `Real Kicks Kenya | ${title}`
  }, [title])
}  
  