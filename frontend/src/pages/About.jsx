import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsletterBox from '../components/NewsletterBox'

const About = () => {
  return (
    <div>

      <div className='text-2xl text-center pt-8 border-t'>
          <Title text1={'ABOUT'} text2={'US'} />
      </div>

      <div className='my-10 flex flex-col md:flex-row gap-16'>
          <img className='w-full md:max-w-[450px]' src={assets.about_img} alt="" />
          <div className='flex flex-col justify-center gap-3 md:w-2/4 text-gray-600'>
              <b className='text-gray-800'>ℍ𝕆𝕌𝕊𝔼 𝕆𝔽 𝔼ℝℝ𝕆ℝֆ </b>   
              <p>Fashion’s Beautiful Mistake - We’re the glorious accident of the fashion world. Born when a group of designers, thrift-store obsessives, and nightlife rebels decided the industry needed a controlled crash. Our platform isn’t just shopping—it’s a clothing revolution with a sense of humor.</p>
              <p>We specialize in imperfectly perfect pieces:</p>
              <p>• Deliberately distressed denim that looks like you’ve lived in it for years.</p>
              <p>• "Wrong button" shirts that became our bestsellers.</p>
              <p>• Dresses with "misprinted" patterns (our CEO spilled coffee on the prototype and we ran with it)</p>
              <b className='text-gray-800'>Our Mission</b>
              <p>House of Errors exists to weaponize fashion's imperfections, transforming wardrobe malfunctions into revolutionary style statements. We specialize in disrupting the ordinary through intentionally flawed designs that celebrate individuality over conformity. Our approach blends tech-inspired irreverence with avant-garde aesthetics, offering radical style resets and anarchic styling guidance from our team of fashion provocateurs. This is where clothing becomes rebellion, and every imperfection tells a story worth wearing.</p>
          </div>
      </div>

      <div className=' text-xl py-4'>
          <Title text1={'WHY'} text2={'CHOOSE US'} />
      </div>

      <div className='flex flex-col md:flex-row text-sm mb-20'>
          <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
            <b>Quality Assurance:</b>
            <p className=' text-gray-600'>We meticulously select and vet each product to ensure it meets our stringent quality standards.</p>
          </div>
          <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
            <b>Convenience:</b>
            <p className=' text-gray-600'>With our user-friendly interface and hassle-free ordering process, shopping has never been easier.</p>
          </div>
          <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
            <b>Exceptional Customer Service:</b>
            <p className=' text-gray-600'>Our team of dedicated professionals is here to assist you the way, ensuring your satisfaction is our top priority.</p>
          </div>
      </div>

      <NewsletterBox/>
      
    </div>
  )
}

export default About
