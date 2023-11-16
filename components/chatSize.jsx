"use client"

import Image from 'next/image'
import { AnimatePresence, motion, useAnimation, useMotionValue, useTransform, animate } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'
import {AiFillCloseCircle} from 'react-icons/ai'
import {BsFillChatRightDotsFill, BsFillChatLeftFill, BsChatRightFill, BsSendFill} from 'react-icons/bs'
import {IoSend} from 'react-icons/io5'
import {FaLocationArrow} from 'react-icons/fa'
import {LiaCompressArrowsAltSolid} from 'react-icons/lia'
const fake = [
  {type: "question",
  text: "who's Trevor Noah?"
},
{type: "answer",
text: "He's a comedian obvs."
},{type: "question",
text: "oh."
},
]

export default function Home() {
  const [select, setSelect] = useState(0)
  const [messages, setMessages] = useState(fake)
  const [inputValue, setInputValue] = useState('')
  const controls = useAnimation();
  const searchbar = useAnimation();
  const searchbarHolder = useAnimation();
  const icon = useAnimation();
  const text = useAnimation();
  const plane = useAnimation();

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

    //isn't working yet, fix
    plane.start({opacity: select ? 0 : .2})
    plane.start({x: select? -1000 : -100})


    text.start({height: select ? 0 : 100})
    text.start({display: select ? 'none' : 'block'})
    icon.start({ width: select ? 64 : 48 });
    icon.start({ height: select ? 64 : 48 });
    icon.start({ margin: select ? 0 : 8 });

    controls.start({ width: select ? 64 : 300 });
    controls.start({ height: select ? 64 : 512 });
    controls.start({ marginTop: select ? 64 : 0 });

    searchbarHolder.start({ y: select ? 48 : 0, transition: {delay: select? 0 : 0.1} });
    searchbarHolder.start({ width: select ? 0 : 300, transition: {delay: .2} });
    searchbar.start({ height: select ? 0 : height.current, transition: {delay: .2} });
    searchbar.start({ width: select ? 0 : 300 - 16, transition: {delay: .2} });
    searchbar.start({ scale: select ? .8 : 1, transition: {delay: .2} });
    searchbar.start({ opacity: select ? 0 : 1, transition: {delay: .2} });
    searchbar.start({ margin: select ? 0 : 8, transition: {delay: .2} });
    searchbar.start({ padding: select ? 0 : 8, transition: {delay: .2} });


  }


  return (
    <div>
      <button onClick={()=>animate()} className='bg-gray-300 p-4 rounded-md'>backup</button>
   <motion.div className="w-16 h-16 bg-gradient-to-br from-cyan-800/10 to-purple-100 backdrop-blur-sm rounded-md fixed right-4 bottom-4 flex flex-col items-end justify-end overflow-hidden"
   animate={controls}
   transition={{
    type: "spring",
    stiffness: 260,
    damping: 20
  }}
   >
   

    <motion.div layout className='z-50 w-16 bg-gradient-to-br from-gray-700 to-gray-900 text-white h-16 rounded-md cursor-pointer group' onClick={()=>animate()}
  animate={icon}

  transition={{
    type: "spring",
    stiffness: 260,
    damping: 20
  }}
  >{select == 1 && <LiaCompressArrowsAltSolid className="w-8/12 h-full mx-auto transition-all group-hover:rotate-45 group-hover:scale-90" />}{select == 0 &&
   <BsChatRightFill className="w-6/12 mx-auto h-full transition-all text-white/90 group-hover:scale-110 group-hover:-translate-y-1 group-hover:rotate-3" />
   }</motion.div>

  <motion.div animate={text} initial={{display: 'none'}} className="grow relative overflow-y-scroll w-full p-2 overflow-x-hidden">
  {messages.map((message, index)=>{
    return <motion.div key={index} initial={{ opacity: 0, scale: .8, filter: "saturate(0%)" }} animate={{ opacity: 1, scale: 1, filter: "saturate(100%)" }} transition={{ type: "spring",stiffness: 260,
    damping: 20 }} className={`m-2 p-2 bg-gradient-to-br rounded-lg w-fit max-w-full break-all ${message.type == "question" ? 'ml-auto mr-0 from-white to-gray-100 text-black': 'from-gray-700 to-gray-900 text-white'}`}>{message.text}</motion.div>
  })}<motion.div className="dummy"></motion.div>
  </motion.div>

  {/*
   <motion.div animate={text} initial={{height: 0, overflowY: 'hidden'}} className='p-2 grow shrink overflow-y-scroll overflow-x-hidden w-full'>

  {fake.map((message)=>{
    return <div>{message.text}</div>
  })}
     </motion.div>

*/}
   
    <motion.div className="grid grid-cols-2 relative mx-auto" animate={searchbarHolder}>
    <motion.textarea layout
    ref={textareaRef}
    animate={searchbar}
    initial={{width: 0, height: 0, y: 0, margin: 0, padding: 0}}
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
     className='bg-black/10 outline-none border-none h-16 rounded-md bottom-2 right-2 backdrop-blur-md p-2 m-2 !pr-12'></motion.textarea>
  <BsSendFill
    animate={plane}
    initial={{opacity: 0}}
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
   {height.current}
   </div>
  )
}
