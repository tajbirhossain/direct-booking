'use client'
import React from 'react'

const page = () => {
  const pdfPath = "/pdfs/Case-study-pdfs/miamistays.pdf";

  return (
    <div style={{
      width: '100vw',
      height: '100vh',
      margin: 0,
      padding: 0,
      overflow: 'hidden'
    }}>
      <iframe
        src={`${pdfPath}#toolbar=0&navpanes=0&scrollbar=0`}
        width="100%"
        height="100%"
        style={{
          border: 'none',
          display: 'block'
        }}
        title="PDF Viewer"
      />
    </div>
  );
}

export default page