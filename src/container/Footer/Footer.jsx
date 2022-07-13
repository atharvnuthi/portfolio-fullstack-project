import React, { useState } from 'react';
import MotionWrap from '../../wrapper/MotionWrap';
import AppWrap from '../../wrapper/AppWrap';
import { images } from '../../constants';
import { client } from '../../client';
import './Footer.scss';

const Footer = () => {
  const [formData, setFormData] = useState({name: '', email: '', message: ''});
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const {name, email, message} = formData; // destructing! 

  const handleChangeInput = (e) => {
    const {name, value} = e.target;
    setFormData({...formData, [name]: value});
  }

  const handleSubmit = () => {
    setLoading(true);

    const contact = {
      _type: 'contact',
      name: name,
      email: email,
      message: message,
    }

    client.create(contact).then(()=>{
      setLoading(false);
      setIsFormSubmitted(true);
    })
  }



  return (
    <>
    <h2 className='head-text'>Take a Coffee & Chat with Me</h2>
    <div className='app__footer-cards'>
      <div className='app__footer-card'>
        <img src={images.email} alt='email' />
        <a href='mailto:hello@micael.com' className='p-text'>hello@micael.com</a>
      </div>
      <div className='app__footer-card'>
        <img src={images.mobile} alt='mobile' />
        <a href='tel: +1 (123) 456-789' className='p-text'>hello@micael.com</a>
      </div>
    </div>

    {!isFormSubmitted ?
    <div className='app__footer-form app__flex'>
      <div className='app__flex'>
        <input className='p-text' type='text' name='name' placeholder='Your name' value={name} onChange={handleChangeInput}></input>
      </div>
      <div className='app__flex'>
        <input className='p-text' type='email' name='email' placeholder='Your email' value={email} onChange={handleChangeInput}></input>
      </div>
      <div>
        <textarea
        className='p-text'
        placeholder='Your message'
        value={message}
        name='message'
        onChange={handleChangeInput}/>
        <button type='button' className='p-text' onClick={handleSubmit}>{loading? 'Sending': 'Send Message'}</button>
      </div>
    </div> : 
    <div><h3 className='head-text'>Thank you for getting in touch!</h3></div>}
    </>
  )
}

export default AppWrap(MotionWrap(Footer, 'app__footer'), 'contact', 'app__whitebg')