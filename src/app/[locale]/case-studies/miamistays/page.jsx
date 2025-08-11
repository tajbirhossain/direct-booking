'use client'
import React, { useEffect } from 'react'

const page = () => {
  const pdfPath = "/pdfs/Case-study-pdfs/miamistays.pdf"
  
  useEffect(() => {
    const style = document.createElement('style')
    style.textContent = `
      iframe[title="PDF Viewer"] {
        border: none !important;
      }
    `
    document.head.appendChild(style)

    return () => {
      document.head.removeChild(style)
    }
  }, [])
  
  const pdfJsUrl = `/pdfjs/web/viewer.html?file=${encodeURIComponent(pdfPath)}&toolbar=0&navpanes=0&statusbar=0#toolbar=0&navpanes=0&scrollbar=0&zoom=page-width`
  
  return (
    <div style={{ 
      width: '100vw', 
      height: '100vh', 
      margin: 0, 
      padding: 0, 
      overflow: 'hidden' 
    }}>
      <iframe 
        src={pdfJsUrl}
        width="100%" 
        height="100%" 
        style={{ border: 'none', display: 'block' }}
        title="PDF Viewer"
        onLoad={(e) => {
          try {
            const iframeDoc = e.target.contentDocument || e.target.contentWindow.document
            const toolbar = iframeDoc.getElementById('toolbarContainer')
            if (toolbar) {
              toolbar.style.display = 'none'
            }
          } catch (err) {
            console.log('Could not access iframe content')
          }
        }}
      />
    </div>
  )
}

export default page