import { useEffect } from "react"

export const useScript = url => {
  const script = document.createElement('script')

  script.src = url
  script.async = true

  document.body.appendChild(script)

  useEffect(() => {
    return () => {
      document.body.removeChild(script)
    }
  }, [])
}