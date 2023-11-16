"use client"

import Image from 'next/image'
import { AnimatePresence, motion, useAnimation, useMotionValue, useTransform, animate } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'
const fake = [
  {type: "question",
  text: "who's Trevor Noah?"
},
{type: "answer",
text: "He's a comedian obvs.",
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
text: 'cool beans brotatochip'}
]

//https://github.com/remarkjs/react-markdown
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

const Describe = ({src, t, clicked, id, setClicked})=>{
  const contentRef = useRef(null);

  const imageRef = useRef(null)
  const textRef = useRef(null)

  const holder = useAnimation()

  const [contentHeight, setContentHeight] = useState(0);
  const controls = useAnimation();
  useEffect(() => {
    if (clicked === id) {
      console.log(imageRef.current.clientHeight)
      console.log(textRef.current.clientHeight)
        setContentHeight(imageRef.current && textRef.current ? imageRef.current.clientHeight + textRef.current.clientHeight + 36 : 0);
    } else {
      setContentHeight(imageRef.current.clientHeight);
    }
},[clicked]);

  useEffect(()=>{
    holder.start({padding: clicked == id? 8 : 0})
    holder.start({zIndex: clicked==id? 100 : 1, transition: {duration: clicked==id? 0 : 1, delay: clicked==id? 0 : .1}})
  }, [clicked])

  return(
    <motion.div className='relative group w-64 h-fit backdrop-blur-sm rounded-lg text-black m-1 z-20 flex place-content-center items-center justify-center'    
    animate={holder}
    >
      <motion.div ref={contentRef}>
      <img ref={imageRef} src={src} className={`w-64 h-auto rounded-md cursor-pointer transition-all duration-300 ${clicked == id ? 'shadow-md' : 'shadow-none'}`} onClick={()=>{setClicked(clicked==id ? -1 : id)}}/>
      <motion.div className='overflow-hidden absolute w-full pr-2'
      animate={{height: clicked == id ? 'auto' : 0, opacity: clicked == id ? 1 : 0}}
      initial={{height: 0, opacity: 0}}
      >

    <div ref={textRef} className='mt-2 w-full prose prose-zinc p-0'>

    <Markdown remarkPlugins={[remarkGfm]} className=''>{t}</Markdown>

      <div className="cursor-pointer font-bold w-fit transition-all shadow-sm hover:shadow-md bg-white p-2 rounded-md mx-auto mt-1 flex"><div>More information </div><div className='transition-all'>{"-->"}</div></div>
      <div className="h-4"></div>
      </div>
      </motion.div>
      </motion.div>
      {contentRef.current && 
      <motion.div className="absolute bg-gradient-to-br from-white to-gray-100 backdrop-blur-sm shadow-md -z-10 top-0 mx-auto rounded-md w-full"
       animate={{height:contentHeight, width:clicked==id?300:256, y: clicked==id? -24 : 0}}></motion.div>
      }
      </motion.div>
  )
}

function Home() {
  const [messages, setMessages] = useState(fake)

  const [clicked, setClicked] = useState(0)


  return (
    <div className='w-[600px] shadow-lg rounded-md p-2 bg-gradient-to-br from-slate-300 to-slate-100'>
  
  {messages.map((message, index)=>{
    return <motion.div key={index} initial={{ opacity: 0, scale: .8}} animate={{ opacity: 1, scale: 1 }} transition={{ type: "spring",stiffness: 260,
    damping: 20 }} className={`m-2 p-2 bg-gradient-to-br rounded-lg w-fit max-w-full break-all ${message.type == "question" ? 'ml-auto mr-0 from-white to-gray-100 text-black': 'from-gray-700 to-gray-900 text-white z-10'}`}>{message.text}
    {message.type!='question' && <motion.div className="flex flex-wrap">
      {message.addons ? message.addons.map((item, extraIndex)=>{
        return <Describe src={item.src} t={item.markdown} id={index + ',' + extraIndex} setClicked={setClicked} clicked={clicked} />
      }) : ''}
      </motion.div>}</motion.div>
  })}<motion.div className="dummy"></motion.div>
  </div>
  )
}

export default Describe;