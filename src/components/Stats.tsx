'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

export default function Stats() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })
  
  const stats = [
    { id: 1, value: '85%', label: 'of customers won\'t call back if their call goes unanswered' },
    { id: 2, value: '$1,200', label: 'average revenue lost per missed call for service businesses' },
    { id: 3, value: '67%', label: 'of email lists become cold after 3 months of inactivity' },
    { id: 4, value: '24/7', label: 'AI-powered automation to capture every opportunity' },
  ]
  
  return (
    <section className="py-16 bg-gray-50 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-display font-bold mb-4">The Cost of Missed Opportunities</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Businesses lose significant revenue every day through simple oversights. 
            Here's what the data tells us:
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="glass-card p-6 text-center"
            >
              <div className="text-4xl font-bold gradient-text mb-2">{stat.value}</div>
              <p className="text-gray-600">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
