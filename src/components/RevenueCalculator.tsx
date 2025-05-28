'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

export default function RevenueCalculator() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })
  
  const [companyType, setCompanyType] = useState("HVAC Company")
  const [profitPerJob, setProfitPerJob] = useState(900)
  const [unansweredCalls, setUnansweredCalls] = useState(1350)
  const [conversionRate, setConversionRate] = useState(29)

  // Calculations
  const unansweredCallLeads = Math.round(unansweredCalls * 0.52) // 52% of unanswered calls become leads
  const phoneLeadConversions = Math.round(unansweredCallLeads * (conversionRate / 100))
  const unrealizedProfits = phoneLeadConversions * profitPerJob

  return (
    <section id="calculator" className="section relative z-10 py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-display font-bold mb-4">Calculate Your Lost Revenue</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Use our calculator to see how much revenue your business might be losing from unanswered calls.
          </p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col items-center justify-center"
        >
          <div className="bg-white rounded-lg shadow-lg p-8 max-w-2xl w-full">
            <h2 className="text-3xl font-bold text-center mb-2">
              The <span className="text-primary-600">Revenue Cost</span> of Unanswered Calls
            </h2>
            <div className="flex items-center justify-center mb-8">
              <span className="mr-2 text-gray-500">Example:</span>
              <input
                type="text"
                value={companyType}
                onChange={e => setCompanyType(e.target.value)}
                placeholder="Type of Company"
                className="border rounded px-3 py-1 text-gray-700 focus:outline-none focus:ring focus:border-primary-300 w-48"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              <div className="space-y-6">
                <div>
                  <label className="block font-semibold mb-1">Average profit per job</label>
                  <input
                    type="range"
                    min="100"
                    max="2000"
                    step="50"
                    value={profitPerJob}
                    onChange={e => setProfitPerJob(Number(e.target.value))}
                    className="w-full accent-primary-600"
                  />
                  <div className="text-primary-700 text-xl font-bold mt-1">${profitPerJob.toLocaleString()}</div>
                </div>
                <div>
                  <label className="block font-semibold mb-1">Unanswered calls</label>
                  <input
                    type="range"
                    min="0"
                    max="3000"
                    step="10"
                    value={unansweredCalls}
                    onChange={e => setUnansweredCalls(Number(e.target.value))}
                    className="w-full accent-primary-600"
                  />
                  <div className="text-primary-700 text-xl font-bold mt-1">{unansweredCalls.toLocaleString()}</div>
                </div>
                <div>
                  <label className="block font-semibold mb-1">Phone lead conversions (%)</label>
                  <input
                    type="range"
                    min="1"
                    max="100"
                    value={conversionRate}
                    onChange={e => setConversionRate(Number(e.target.value))}
                    className="w-full accent-primary-600"
                  />
                  <div className="text-primary-700 text-xl font-bold mt-1">{conversionRate}%</div>
                </div>
              </div>
              <div className="flex flex-col justify-center items-center h-full">
                <div className="mb-4 w-full">
                  <div className="bg-gray-100 rounded px-4 py-2 text-center mb-2">
                    <span className="text-gray-600">Unanswered call leads</span>
                    <div className="text-2xl font-bold text-primary-400">{unansweredCallLeads.toLocaleString()}</div>
                  </div>
                  <div className="bg-gray-100 rounded px-4 py-2 text-center">
                    <span className="text-gray-600">Phone lead conversions</span>
                    <div className="text-2xl font-bold text-primary-600">{phoneLeadConversions.toLocaleString()}</div>
                  </div>
                </div>
                <div className="bg-primary-600 text-white rounded-lg px-6 py-6 text-center shadow-lg w-full">
                  <div className="text-lg mb-1">{phoneLeadConversions.toLocaleString()} x ${profitPerJob.toLocaleString()} =</div>
                  <div className="text-3xl font-extrabold">${unrealizedProfits.toLocaleString()}</div>
                  <div className="text-lg mt-1">/ Month Unrealized Profits</div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-8 text-center">
            <a 
              href="#solutions" 
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              See How EcliptAI Can Help
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
