import React, { useContext, useState } from 'react'
import './Main.css'
import { assets } from '../../assets/assets'
import { Context } from '../../context/Context'
import ReactMarkdown from 'react-markdown';
// import { HashLink as Link } from 'react-router-hash-link';

const Main = () => {

  const { onSent,
    recentPrompt,
    showResult,
    loading,
    resultData,
    setInput,
    input
  } = useContext(Context);


  return (
    <div className='main'>
      <div className="nav">
        <p>Virtual Career Assistant</p>
        <img src={assets.user_icon} alt="" />
      </div>
      <div className="main-container">
        {showResult
          ? <div className="result">
            <div className='result-title'>
              {/* <img src={assets.user_icon} alt="" /> */}
              {/* <p>{recentPrompt}</p> */}
            </div>
            <div className="result-data">
              <img src={assets.vca_icon} alt="" />
              {loading
                ? <div className="loader">
                  <hr className="animated-bg" />
                  <hr className="animated-bg" />
                  <hr className="animated-bg" />
                </div>
                : <div className="mt-2 markdown-content"><ReactMarkdown components={{ p: ({node, ...props}) => <p style={{whiteSpace: 'pre-wrap'}} {...props} /> }}>{resultData}</ReactMarkdown></div>
              }
            </div>

          </div>
          : <>

            <div className="greet">
              <p><span>Hello, Student.</span></p>
            </div>

            <div className="cards">
              <div className="card">
                <p>Discover your strengths and passions with our virtual career counselling test. Your future starts here!</p>
                <img src={assets.compass_icon} alt="" />
              </div>
              <div className="card">
                <p>Unsure about your career path? Let the virtual test guide you toward the right direction.</p>
                <img src={assets.bulb_icon} alt="" />
              </div>
              <div className="card">
                <p>Take the first step toward a fulfilling career by exploring your options through our easy online assessment.</p>
                <img src={assets.message_icon} alt="" />
              </div>
              <div className="card">
                <p>Gain personalized insights and clarity about your future, take the virtual career counselling test today!</p>
                <img src={assets.code_icon} alt="" />
              </div>
            </div>
              
            <div className="greet">
              <p>Want to know the best Career Path for you to take?</p>
              <p>Scroll up to take the test above!</p>
            </div>
          </>
        }



        <div className="main-bottom">
          {/* <div className="search-box">
            <input onChange={(e) => setInput(e.target.value)} value={input} type="text" placeholder='Enter a prompt here' />
            <div>
              <img src={assets.gallery_icon} width={30} alt="" />
              <img src={assets.mic_icon} width={30} alt="" />
              {input ? <img onClick={() => onSent()} src={assets.send_icon} width={30} alt="" /> : null}
            </div>
          </div><br></br> */}
          <p className="bottom-info">
            Your personalized Career Counselling Assistant for JSS students. App developed by <a href='#'>Moses</a> and <a href='#'>Blessing</a>.  
          </p>
        </div>
      </div>
    </div>
  )
}

export default Main
