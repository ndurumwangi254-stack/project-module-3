import { useEffect } from 'react'

export default function usePageTitle(title) {
  useEffect(() => {  
    document.title = `Coffee R Us | ${title}`
  }, [title])
}  
  