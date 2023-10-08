import React, { useEffect, useState } from 'react'
import {AiFillCopy,AiOutlineSend} from 'react-icons/ai'
import {BiArrowBack} from 'react-icons/bi'
import link from '../assets/link.svg'
import loader from '../assets/loader.svg'
import tick from '../assets/tick.svg'

import {useLazyGetSummaryQuery} from '../services/article'

const Summarizer = () => {

  useEffect(()=>{
    if(window.localStorage.getItem('articles') != ''){
      const articlesFromLocal=JSON.parse(window.localStorage.getItem('articles'))
    

      if(articlesFromLocal){
        setAllArticles(articlesFromLocal)
      }
    }
  },[])

  const [article,setArticle]=useState({
    url:'',
    summary:'',
  })

  const [copied,setCopied]=useState('')
 

  const [allArticles,setAllArticles]=useState([]);

const [getSummary,{error,isFetching}]=useLazyGetSummaryQuery()

const handleSubmit=async(e)=>{
  e.preventDefault();

  const {data}=await getSummary({articleUrl:article.url})

  if(data?.summary){
    const newArticle={...article,summary:data.summary}

    const updatedAllArticles=[newArticle,...allArticles]
    setArticle(newArticle)
    setAllArticles(updatedAllArticles)
    window.localStorage.setItem('articles',JSON.stringify(updatedAllArticles))

    
  }
 

}
const handleCopy=(copyUrl)=>{
  setCopied(copyUrl)
  navigator.clipboard.writeText(copyUrl)
  setTimeout(()=>setCopied(false),3000);
}

  return (
    <div className='flex flex-col gap-5  w-full justify-center items-center  my-5 '>

        <div className='flex gap-3 items-center bg-gray-100 p-2 mx-2 rounded-full shadow-lg max-w-[300px] lg:max-w-[700px]  ' >

          <img src={link} alt="" />

        <input type="url" required placeholder='insert link here' className='p-3  text-left border-none  placeholder:text-slate-500 placeholder:text-lg outline-none bg-transparent max-w-[150px] lg:min-w-[400px] ' value={article.url} onChange={(e)=>setArticle({ ...article, url: e.target.value })} />

        <button disabled={isFetching} type='submit' className=' p-2   rounded-full hover:opacity-90 disabled:opacity-60 text-xl' onClick={handleSubmit}><AiOutlineSend/></button>
        </div>

        

        

        
        

        
        {isFetching ? (
          <img src={loader} alt='loader' className='w-20 h-20 object-contain' />
        ) : error ? (
          <p className='font-inter font-bold text-black text-center'>
            Well, that wasn't supposed to happen...
            <br />
            <span className='font-satoshi font-normal text-gray-700'>
              {error?.data?.error}
            </span>
          </p>
        ) : article.summary && 
        
        <div className='flex flex-col items-center gap-2'>

          <h2 className='font-bold'>Article <span className='text-orange-500'>Summary</span>:</h2>
        <div className=' border border-gray-200  md:mx-[100px] lg:mx-[200px] xl:mx-[300px] bg-gray-100  mx-10  shadow-xl items-center  p-5'>
         <p>{article.summary}</p>
         
        </div>
        <div  className='flex gap-2'>
        <button className='flex flex-col items-center gap-1 text-2xl bg-gray-300 text-gray-800 rounded-full p-2 hover:opacity-90 ' title='copy' onClick={()=>handleCopy(article.summary)}>
            {copied===article.summary ?
            <img src={tick} className='w-6 h-6' alt="" /> :<AiFillCopy/> }
          
          </button>
        <button className='flex flex-col items-center gap-1 text-2xl bg-gray-300 text-gray-800 rounded-full p-2 hover:opacity-90 ' title='back' onClick={()=>setArticle({url:'',summary:''})}><BiArrowBack/></button>
        </div>
        </div>}
        
        {!article.summary && !isFetching && 
        <div className='flex flex-col gap-3 items-center'>

            <h2 className='font-bold text-orange-500'>History:</h2>

            <div className='flex flex-col items-center gap-3'>
             {allArticles.map((article,index)=>(

              <div key={`link ${index}`} onClick={()=>setArticle(article)} className=' flex gap-2 max-w-[300px] cursor-pointer hover:opacity-90 border p-2 bg-white ' title={article.url}>
                  <img src={link} alt="" />
                  <p className='max-h-[20px] overflow-hidden text-blue-400'>{article.url}</p>
              </div>
             )

             )}
             </div>

             {allArticles.length>0   ? <button className=' text-red-600 p-2 border bg-gray-50 rounded-full shadow-md' onClick={()=>{window.localStorage.setItem('articles',''),setAllArticles([])} }>Reset</button> : <p>no history yet</p> }

             

        </div>
        }
        
        
         </div>
        

        
        
        
    
  )
}

export default Summarizer
