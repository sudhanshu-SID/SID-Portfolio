import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

const services = [
  {
    number: '01',
    title: 'Web Development',
    body: 'End-to-end MERN Stack applications. React SPAs, RESTful APIs, PostgreSQL. SEO-first architecture built for performance and scale.',
    tags: ['MERN', 'React', 'Node.js', 'SEO'],
  },
  {
    number: '02',
    title: 'App Design',
    body: 'Mobile-first interface design. Component libraries, design systems, and pixel-perfect Figma-to-code handoffs.',
    tags: ['Figma', 'React Native', 'UI Systems'],
  },
  {
    number: '03',
    title: 'Content Strategy',
    body: 'Cinematic storytelling through video editing, brand narratives, and motion-driven content that converts.',
    tags: ['Premiere Pro', 'Motion', 'Copywriting'],
  },
  {
    number: '04',
    title: 'E-commerce',
    body: 'Premium digital storefronts with Shopify, custom checkout flows, and third-party payment/logistics integrations.',
    tags: ['Shopify', 'WooCommerce', 'Stripe'],
  },
];

export default function Services() {
  const reducedMotion = useReducedMotion();
  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  return (
    <motion.section
      id="services"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
      viewport={{ once: false, amount: 0.2 }}
      className="py-40 lg:py-56"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex items-end justify-between gap-8">
          <h2 className="font-syne font-bold text-[clamp(2.5rem,5vw,5rem)] tracking-tighter3 text-white">
            What I Do.
          </h2>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
          className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-6"
        >
          {services.map((s) => (
            <motion.div
              key={s.number}
              variants={cardVariants}
              style={{ borderColor: '#222222' }}
              whileHover={
                reducedMotion
                  ? undefined
                  : {
                      y: -4,
                      borderColor: '#444444',
                      boxShadow: '0 20px 60px rgba(0,0,0,0.45)',
                    }
              }
              className="bg-[#0F0F0F] border border-[#222222] rounded-2xl p-6 lg:p-7"
            >
              <div className="flex items-start justify-between gap-6">
                <div className="font-syne font-extrabold text-[5rem] leading-none text-[#222222] opacity-100">
                  {s.number}
                </div>
              </div>

              <div className="mt-2">
                <h3 className="font-syne font-bold text-[1.5rem] text-white tracking-tighter2">
                  {s.title}
                </h3>
                <p className="mt-4 font-dm font-[300] text-[1rem] leading-relaxed text-[#888888]">
                  {s.body}
                </p>

                <div className="mt-7 flex flex-wrap gap-2">
                  {s.tags.map((t) => (
                    <span
                      key={t}
                      className="text-xs uppercase tracking-widest text-[#555555] border border-[#333333] rounded-full px-3 py-1"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}

