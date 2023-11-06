import React, { useRef, useState } from 'react'
import './ImageGenerator.css'
import default_image_2 from '../Assets/default_image_2.png'

export const ImageGenerator = () => {

    const [image_url, setImage_url] = useState('/')
    const [loading, setLoading] = useState(false)
    let inpuRef = useRef(null)

    const imageGenerator = async () => { 
        if(inpuRef.current.value==='') return 0
        setLoading(true)
        const response = await fetch(
            'https://api.openai.com/v1/images/generations',
            {
                method: "POST",
                headers:{
                    "Content-Type":"application/json",
                    Authorization: "Bearer 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",
                    "User-Agent":"Chrome",
                },
                body: JSON.stringify({
                    prompt: `${inpuRef.current.value}`,
                    n: 1,
                    size: '512x512'
                }),
            }
        );
        
        let data = await response.json()
        setImage_url(data.data[0].url)
        setLoading(false)
    }

    return (
        <div className='ai-image-generator'>
            <div className="header">AL <span>GENERATOR</span></div>

            <div className="img-loading">
                <div className="image"><img src={image_url==='/'?default_image_2:image_url} alt="" /></div>
            </div>

            <div className="loading">
                <div className={loading?"loading-bar-full": "loading-bar"}></div>
                <div className={loading?"loading-text-full": "display-none"}>   Loading...</div>
            </div>

            <div className="search-box">
                <input type="text" ref={inpuRef} className="search-input" placeholder='Describe what you want to see...' />
                <div className="generate-btn" onClick={() => {imageGenerator()}}>Generate</div>
            </div>
        </div>
    )
}

// API Key: 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