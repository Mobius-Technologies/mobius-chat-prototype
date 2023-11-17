"use client"

import Image from 'next/image'
import { AnimatePresence, motion, useAnimation, useMotionValue, useTransform, animate } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'
import {AiFillCloseCircle} from 'react-icons/ai'
import {BsFillChatRightDotsFill, BsFillChatLeftFill, BsChatRightFill, BsSendFill} from 'react-icons/bs'
import {IoSend} from 'react-icons/io5'
import {FaLocationArrow, FaPlaneDeparture} from 'react-icons/fa'
import {LiaCompressArrowsAltSolid} from 'react-icons/lia'

import Describe from '../../components/image'

const fake = [
  {type: "question",
  text: "What are some shoes that you would recommend for me?"
},
{type: "answer",
text: "I'd recommend these Nike shoes. Please tell me if you have any questions!",
addons: [
  {type: 'image',
src: 'https://www.tennisnuts.com/images/product/full/NIKE-FREE-50-642198_406_A_PREM.jpg',
markdown: `### Nikes
* bullet point
* bullet point
* bullet point\n
~$100~ **$50**`},
{type: 'image',
src: 'https://www.tennisnuts.com/images/product/main/DR6966-001_C.jpg?61',
markdown: `### Nikes
* bullet point
* bullet point
* bullet point\n
~$100~ **$50**`},
{type: 'image',
src: 'https://www.tennisnuts.com/images/product/main/DH0219-402_C.jpg?61',
markdown: `### Nikes
* bullet point
* bullet point
* bullet point\n
~$100~ **$50**`},
{type: 'image',
src: 'https://www.tennisnuts.com/images/product/main/DH2603-400_C.jpg?61',
markdown: `### Nikes
* bullet point
* bullet point
* bullet point\n
~$100~ **$50**`}
]
},{type: "question",
text: "oh."
},
{type: 'answer',
text: 'Do you have any other questions?'}
]

export default function Home() {

  const [urlTyped, setUrlTyped] = useState('https://wikipedia.com')
  const [url, setUrl] = useState('https://wikipedia.com')

  const [select, setSelect] = useState(0)
  const [messages, setMessages] = useState(fake)
  const [inputValue, setInputValue] = useState('')
  const controls = useAnimation();
  const searchbar = useAnimation();
  const searchbarHolder = useAnimation();
  const icon = useAnimation();
  const text = useAnimation();
  const plane = useAnimation();
  const bg = useAnimation();

  const [clicked, setClicked] = useState(-1)

  const textareaRef = useRef(null);
  const height = useMotionValue(48);
  
  useEffect(() => {
    const textarea = textareaRef.current;

    const updateHeight = () => {
      height.set(textarea.scrollHeight >= 48 ? textarea.scrollHeight : 48); // Update height based on content
    };

    // Set the initial height
    updateHeight();

    // Update height whenever the user types
    textarea.addEventListener('input', updateHeight);

    return () => {
      textarea.removeEventListener('input', updateHeight);
    };
  }, [height]);


  
  const scrollToBottom = () => {
    document.getElementsByClassName('dummy')[0].scrollIntoView({ behavior: "smooth" });
  }
  
  const changeInputHeight = () => {
    searchbar.start({ height: height.current, transition: {duration: .1}})
  }
    
  const animate = ()=>{
    setSelect(Math.abs(select-1))

    bg.start({opacity: select? 0 : 1})
    bg.start({display: select? 'none' : 'block', transition: {delay: select? .2 : 0}})
    icon.start({opacity: select? 1 : 0})
    icon.start({y: select? 0 : 12})

    text.start({height: select ? 0 : 100})
    text.start({display: select ? 'none' : 'block'})

    controls.start({ width: select ? 'calc(100vw - 256px)' : 'calc(100vw - 128px)' });
    controls.start({ height: select ? 'calc(100vh - 256px)' : 'calc(100vh - 128px)' });
    controls.start({scale: select? .9 : 1})
    controls.start({maxWidth: 700})
    //controls.start({x: select ? -128 + 16 : -64 + 16})
    //controls.start({y: select ? -128 + 16 : -64 + 16})
    controls.start({opacity: select ? 0:1})

    searchbarHolder.start({ y: select ? 48 : 0, transition: {delay: select? 0 : 0.1} });
    searchbarHolder.start({ width: select ? 0 : 800 });
    searchbarHolder.start({maxWidth: select ? 0 : 'auto',transition: {delay: .2}})
    searchbar.start({ height: select ? 0 : height.current, transition: {delay: .2} });
    searchbar.start({ width: select ? 0 : 800 - 16 });
    searchbar.start({ scale: select ? .8 : 1, transition: {delay: .2} });
    searchbar.start({ opacity: select ? 0 : 1, transition: {delay: .2} });
    searchbar.start({ margin: select ? 0 : 8, transition: {delay: .2} });
    searchbar.start({ padding: select ? 0 : 8, transition: {delay: .2} });
    plane.start({opacity: select ? 0 : 1})


  }


  return (
    <div>
      <div className='fixed left-2 bottom-2 z-50 flex rounded-md'>
        <input placeholder='url' className='p-2 rounded-md bg-slate-300/50 backdrop-blur-md' value={urlTyped} onChange={(e)=>setUrlTyped(e.target.value)} />
        <button className='mx-2 bg-slate-400 p-2 rounded-md backdrop-blur-md' onClick={()=>setUrl(urlTyped)}>{"Go -->"}</button>
      </div>
      <iframe className='w-screen h-screen fixed' src={url} placeholder={'https://website.com'} />

      <motion.div className='z-50 w-32 bg-gradient-to-br from-gray-700 to-gray-900 text-white h-8 rounded-full cursor-pointer group px-4 transition-all hover:scale-110 flex justify-center items-center place-content-center fixed right-2 bottom-2' onClick={()=>animate()}
  animate={icon}

  transition={{
    type: "spring",
    stiffness: 260,
    damping: 20
  }}
  ><div className="flex">Ask AI <BsChatRightFill className="h-full w-auto mx-2 m-auto transition-all text-white/90 group-hover:scale-110 group-hover:-translate-y-1 group-hover:rotate-3" /></div>
   </motion.div>


   <motion.div className="asdf fixed top-0 w-screen h-screen hidden justify-center place-content-center items-center"
   animate={{display: select ? "flex" : "none", transition: {delay: select ? 0 : .2}}}>
   <motion.div className="bg-black/50 backdrop-blur-sm fixed w-screen h-screen" animate={bg}
          initial={{opacity: 0, display: 'none'}} onClick={()=>animate()}></motion.div>
   
   <motion.div className="w-28 h-8 bg-gradient-to-br from-white/60 to-purple-100 backdrop-blur-sm rounded-md flex flex-col items-end justify-end"
   animate={controls}
   initial={{width: 'calc(100vw - 128px)', opacity:0, height: 'calc(100vh - 128px)', scale:0.9}}
   transition={{
    type: "spring",
    stiffness: 260,
    damping: 20
  }}
   >   

  <motion.div animate={text} initial={{display: 'none'}} className="grow relative overflow-y-scroll w-full p-2 overflow-x-hidden">
  {messages.map((message, index)=>{
    return <motion.div key={index} initial={{ opacity: 0, scale: .8}} animate={{ opacity: 1, scale: 1 }} transition={{ type: "spring",stiffness: 260,
    damping: 20 }} className={`m-2 p-2 bg-gradient-to-br rounded-lg w-fit max-w-full break-all ${message.type == "question" ? 'ml-auto mr-0 from-white to-gray-100 text-black': 'from-gray-700 to-gray-900 text-white z-10'}`}>{message.text}
    {message.type!='question' && <motion.div className="flex flex-wrap">
      {message.addons ? message.addons.map((item, extraIndex)=>{
        return <Describe src={item.src} t={item.markdown} id={index + ',' + extraIndex} setClicked={setClicked} clicked={clicked} />
      }) : ''}
      </motion.div>}</motion.div>
  })}
    <motion.div className="block relative ml-auto w-fit max-w-full mr-2 mt-2 place-items-end justify-end items-end" animate={{
    opacity: select ? 1 : 0,
   }}
   transition={{
    delay: select? .2 : 0
  }}>
    <motion.div className='rounded-full outline outline-blue-300/20 bg-white mx-0.5 px-2 py-1 cursor-pointer my-1.5 w-fit ml-auto'>What other brands of shoes can I use?</motion.div>
    <motion.div className='rounded-full outline outline-blue-300/20 bg-white mx-0.5 px-2 py-1 cursor-pointer my-1.5 w-fit ml-auto'>Can you find me black shoes instead?</motion.div>
    <motion.div className='rounded-full outline outline-blue-300/20 bg-white mx-0.5 px-2 py-1 cursor-pointer my-1.5 w-fit ml-auto'>Can you find me cheaper shoes?</motion.div>
   </motion.div>
  
  <motion.div className="dummy"></motion.div>
  </motion.div>
   
   <motion.div className='block !max-w-full' animate={searchbarHolder}
   initial={{y: 48, width: 0, maxWidth: 0}}
   >

    <motion.div className="flex relative mx-auto max-w-full">
    <motion.textarea layout
    ref={textareaRef}
    animate={searchbar}
    initial={{width: 0, height: 0, y: 0, margin: 0, padding: 0, scale: .8 }}
    transition={{
      type: "spring",
      stiffness: 100,
      damping: 20
    }}
    style={{resize: 'none',boxSizing: 'border-box'}}
    value={inputValue}
    onChange={(event)=>{
      setInputValue(event.target.value)
      changeInputHeight()
    }}
    onKeyPress={(event)=>{
      if(event.key == "Enter" && !event.shiftKey){
        let m = [...messages]
        m.push({
          type: "question",
          text: inputValue
        })
        setMessages(m)
        setInputValue('')
        setTimeout(()=>{
          setInputValue('')
          height.set(48)
          changeInputHeight()
          scrollToBottom()
        }, 50)
      }
    }}
     className='bg-black/20 outline-none border-none h-16 rounded-md bottom-2 right-2 backdrop-blur-md p-2 m-2 !pr-12 max-w-full'></motion.textarea>
  <BsSendFill
    animate={plane}
    initial={{opacity: 0, display: 'none'}}
  className={`absolute w-8 h-8 text-sm bottom-4 right-4 bg-gradient-to-br text-black rounded-md p-1 ${inputValue == "" ? 'text-slate-500/50 from-white/0 to-white/0 !bg-transparent' : 'cursor-pointer from-white to-white/10'}`} onClick={()=>{
    if(inputValue != ""){
      let m = [...messages]
      m.push({
        type: "question",
        text: inputValue
      })
      setMessages(m)
      setInputValue('')
      setTimeout(()=>{
        scrollToBottom()
      }, 50)
      height.set(48)
      changeInputHeight()
    }
  }} />
   </motion.div>
   </motion.div>

   </motion.div>
   </motion.div>
   </div>
  )
}