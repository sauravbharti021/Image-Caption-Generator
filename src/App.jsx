
import { useState } from 'react'
import './App.css'
import { useEffect } from 'react'
import { Api } from './api/Api'

function App() {

  const [img, setImg] = useState('')
  const [imagePreview, setImagePreview] = useState('')
  const [tempText, setTempText] = useState('Wait your caption is being loaded')

  const onReset = ()=>{
    let btn = document.getElementById('resetBtn');
    btn.style.display = 'none';
    setImg('')
    setImagePreview('')
    document.getElementById('fileInput').value= ''
    setTempText('Wait your caption is being loaded')
  }

  const onUpload= async(event)=>{
    
    setImg(event.target.files[0])
    setTempText('Wait your caption is being loaded')

    const res= await Api(event.target.files[0])

    if(res){
      setTempText(res.data.captionResult.text)
    }
  }

  useEffect(()=>{
    if(img)
      setImagePreview(URL.createObjectURL(img))
  }, [img, tempText])
  return (
    <>
      <h1 className=' text-7xl font-bold underline text-blue-300  text-center '>Image Caption Generator</h1>

      <h2 className='text-3xl text-center my-8'>Generate SEO friendly alt text for your images</h2>

      <div id="container" className='m-4 flex justify-center'>
        <div id="temp_container">
          <input className='border-2 border-gray-500 p-4  ' type='file' id='fileInput' name='fileInput' accept='image/*' onChange={onUpload} / >
          
          {
            img && <img src={imagePreview} className='w-96 h-80 my-3 border-2 border-blue-400 '/>
          }  
          {
            img && <p id='result' className='my-3 py-4 border-4 border-black  text-center bg-blue-200'>{tempText}</p>
          }
          <div className='flex justify-center'>

            {
              img && <button type='button' className='border-2 border-black p-1 my-2 px-8 bg-gray-300 rounded-lg hover:bg-gray-500' id='resetBtn' onClick={onReset}>Reset</button>
            }
          </div>
        </div>
      </div>
          
      
      <footer className='bg-black text-white fixed bottom-0 w-full text-center py-1 '> Created in 2024. @Saurav Bharti</footer>

    </>
  )
}

export default App
