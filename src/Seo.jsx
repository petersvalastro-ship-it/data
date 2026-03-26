import { useEffect } from 'react'

export function Seo({ title, description }) {
  useEffect(() => {
    document.title = title
    const metaDescription = document.querySelector('meta[name="description"]')
    if (metaDescription) metaDescription.setAttribute('content', description)
  }, [title, description])
  return null
}
