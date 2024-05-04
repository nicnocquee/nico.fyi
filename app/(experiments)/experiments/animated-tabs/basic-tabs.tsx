'use client'

import React, { useState, useRef, useEffect } from 'react'

export const Tab = ({ tabs }: { tabs: Array<{ label: string; content: string }> }) => {
  const [activeTab, setActiveTab] = useState(tabs[0].label)
  const tabIndicatorRef = useRef<HTMLDivElement | null>(null)
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([])

  useEffect(() => {
    const activeTabRef = tabRefs.current.find((ref) => ref?.dataset.label === activeTab)
    if (activeTabRef && tabIndicatorRef.current) {
      tabIndicatorRef.current.style.width = `${activeTabRef.offsetWidth}px`
      tabIndicatorRef.current.style.left = `${activeTabRef.offsetLeft}px`
    }
  }, [activeTab, tabs])

  return (
    <div className="w-full">
      <div className="relative">
        <div className="flex border-b-2 border-gray-200">
          {tabs.map((tab, idx) => (
            <button
              key={tab.label}
              ref={(ref) => {
                tabRefs.current[idx] = ref
                return undefined
              }}
              data-label={tab.label}
              onClick={() => setActiveTab(tab.label)}
              className={`cursor-pointer px-4 py-2 text-sm font-medium
                        ${activeTab === tab.label ? 'text-blue-600' : 'text-gray-500'}`}
            >
              {tab.label}
            </button>
          ))}
          <div
            ref={tabIndicatorRef}
            className="absolute bottom-0 h-1 bg-blue-600 transition-all duration-300"
          ></div>
        </div>
      </div>
      <div className="p-4">{tabs.find((tab) => tab.label === activeTab)?.content}</div>
    </div>
  )
}
