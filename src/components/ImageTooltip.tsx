"use client";

import { useState, cloneElement, isValidElement } from "react";
import Link from "next/link";

interface ImageTooltipProps {
  children: React.ReactNode;
  greeting: string;
  question: string;
  action: string;
  button: string;
  locale: string;
}

export default function ImageTooltip({
  children,
  greeting,
  question,
  action,
  button,
  locale,
}: ImageTooltipProps) {
  const [isVisible, setIsVisible] = useState(false);
  // Clone the image and change the src when hovering
  const renderImage = () => {
    if (isValidElement(children)) {
      const childProps = children.props as any;
      return cloneElement(children as React.ReactElement<any>, {
        ...childProps,
        src: isVisible ? "/mateowave.png" : childProps.src,
      });
    }
    return children;
  };
  return (
    <div className='relative inline-block'>
      <div
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
        className='transition-transform duration-300 hover:scale-105 cursor-pointer'
      >
        {renderImage()}
      </div>
      {/* Elegant Tooltip Card */}
      {isVisible && (
        <div className='absolute top-1/2 right-full transform -translate-y-1/2 mr-6 z-50 md:block hidden'>
          {/* Card Container */}
          <div className='relative bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 shadow-2xl w-80 animate-fade-in'>
            {/* Arrow pointing to the image */}
            <div className='absolute top-1/2 left-full transform -translate-y-1/2'>
              <div className='w-0 h-0 border-t-[8px] border-b-[8px] border-l-[12px] border-t-transparent border-b-transparent border-l-gray-200 dark:border-l-gray-700'></div>
              <div className='absolute top-1/2 left-full transform -translate-y-1/2 -translate-x-1'>
                <div className='w-0 h-0 border-t-[7px] border-b-[7px] border-l-[11px] border-t-transparent border-b-transparent border-l-white dark:border-l-gray-800'></div>
              </div>
            </div>

            {/* Content */}
            <div className='space-y-4'>
              <div className='space-y-2'>
                <h3 className='text-lg font-semibold text-gray-900 dark:text-white'>
                  {greeting}
                </h3>
                <p className='text-gray-600 dark:text-gray-300 leading-relaxed'>
                  {question}
                </p>
                <p className='text-sm text-gray-500 dark:text-gray-400'>
                  {action}
                </p>
              </div>

              <Link
                href={`/${locale}/about`}
                className='inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white text-sm font-medium rounded-md transition-colors duration-200 group'
              >
                {button}
                <svg
                  className='w-4 h-4 ml-2 transition-transform group-hover:translate-x-1'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M9 5l7 7-7 7'
                  />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Mobile/Tablet Tooltip - appears above the image */}
      {isVisible && (
        <div className='absolute bottom-full left-1/2 transform -translate-x-1/2 mb-4 z-50 md:hidden block'>
          {/* Card Container */}
          <div className='relative bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 shadow-2xl w-72 animate-fade-in'>
            {/* Arrow pointing down to the image */}
            <div className='absolute top-full left-1/2 transform -translate-x-1/2'>
              <div className='w-0 h-0 border-l-[8px] border-r-[8px] border-t-[12px] border-l-transparent border-r-transparent border-t-gray-200 dark:border-t-gray-700'></div>
              <div className='absolute top-full left-1/2 transform -translate-x-1/2 -translate-y-1'>
                <div className='w-0 h-0 border-l-[7px] border-r-[7px] border-t-[11px] border-l-transparent border-r-transparent border-t-white dark:border-t-gray-800'></div>
              </div>
            </div>

            {/* Content */}
            <div className='space-y-3'>
              <div className='space-y-2 text-center'>
                <h3 className='text-base font-semibold text-gray-900 dark:text-white'>
                  {greeting}
                </h3>
                <p className='text-sm text-gray-600 dark:text-gray-300 leading-relaxed'>
                  {question}
                </p>
                <p className='text-xs text-gray-500 dark:text-gray-400'>
                  {action}
                </p>
              </div>

              <Link
                href={`/${locale}/about`}
                className='w-full inline-flex items-center justify-center px-4 py-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white text-sm font-medium rounded-md transition-colors duration-200 group'
              >
                {button}
                <svg
                  className='w-4 h-4 ml-2 transition-transform group-hover:translate-x-1'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M9 5l7 7-7 7'
                  />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
