'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

export default function Solutions() {
  const [activeTab, setActiveTab] = useState('missedCalls')
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })
  
  const solutions = {
    missedCalls: {
      title: 'Missed Call Recovery',
      description: 'Never lose another lead due to missed calls. Our AI system automatically follows up with callers who didn\'t get through, scheduling callbacks or providing immediate assistance via text.',
      features: [
        'Automatic SMS follow-up for missed calls',
        'AI-powered call qualification and routing',
        'Scheduled callbacks at optimal times',
        'Call analytics and conversion tracking',
        'Integration with your CRM system'
      ],
      image: 'https://images.pexels.com/photos/3755755/pexels-photo-3755755.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    },
    emailWarming: {
      title: 'Email List Warming',
      description: 'Keep your email list engaged and responsive with personalized, AI-generated content that maintains relationships and prevents list decay.',
      features: [
        'Personalized email sequences based on user behavior',
        'AI content generation for relevant topics',
        'Optimal send time prediction',
        'List segmentation and targeting',
        'Performance analytics and A/B testing'
      ],
      image: 'https://images.pexels.com/photos/7112/woman-typing-writing-windows.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    },
    revenueRecovery: {
      title: 'Revenue Leakage Prevention',
      description: 'Identify and fix the gaps in your business operations where revenue is being lost through missed opportunities, inefficient processes, or customer churn.',
      features: [
        'Comprehensive business process analysis',
        'AI-powered revenue leakage detection',
        'Automated workflow optimization',
        'Customer churn prediction and prevention',
        'ROI tracking and reporting'
      ],
      image: 'https://images.pexels.com/photos/7567434/pexels-photo-7567434.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    }
  }
  
  return (
    <section id="solutions" className="section relative z-10 py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-display font-bold mb-4">Our Solutions</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore how EcliptAI can help your business recover lost revenue and optimize operations.
          </p>
        </motion.div>
        
        <div className="flex flex-wrap justify-center mb-8">
          <div className="flex space-x-2 p-1 bg-gray-100 rounded-lg">
            {Object.keys(solutions).map((key) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`px-4 py-2 rounded-md transition-all ${
                  activeTab === key 
                    ? 'bg-white shadow-md text-primary-600' 
                    : 'text-gray-600 hover:text-primary-600'
                }`}
              >
                {solutions[key].title}
              </button>
            ))}
          </div>
        </div>
        
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
        >
          <div>
            <h3 className="text-2xl font-semibold mb-4">{solutions[activeTab].title}</h3>
            <p className="text-gray-600 mb-6">{solutions[activeTab].description}</p>
            
            <ul className="space-y-3">
              {solutions[activeTab].features.map((feature, index) => (
                <li key={index} className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary-600 mt-1 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            
            <div className="mt-8">
              <a 
                href="#contact" 
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                Get Started
              </a>
            </div>
          </div>
          
          <div className="relative">
            <div className="rounded-lg overflow-hidden shadow-lg">
              <img 
                src={solutions[activeTab].image} 
                alt={solutions[activeTab].title} 
                className="w-full h-[400px] object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-secondary-100 rounded-full flex items-center justify-center">
              <div className="text-secondary-600 font-bold text-xl">AI</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
