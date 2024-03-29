'use client'

import { ReactEventHandler } from "react"
import React, { useState } from 'react';

export function CategoriesList({ categories, selectedCategories, totalItems, itemsPerPage, onPageChange, curr }: {categories: {id: number, name: string}[], selectedCategories: number[], totalItems: number, itemsPerPage: number, onPageChange: (page: number) => void, curr: number}) {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const [currentPage, setCurrentPage] = useState(curr);
  
    const handlePageChange = (page: number) => {
      setCurrentPage(page);
      onPageChange(page);
    };

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>, categoryId: number) => {
        if(e.target.checked) {
            console.log('checked')
        }
    }
    return (
        <div>
            {categories.map(category => (
                <div key={category.id}>
                    <input
                        type="checkbox"
                        id={`${category.id}`}
                        value={category.name}
                        checked={selectedCategories.includes(category.id)}
                        onChange={(e) => handleCheckboxChange(e, category.id)}
                    />
                    <label htmlFor={`${category.id}`}>{category.name}</label>
                </div>
            ))}

            <div className='flex gap-2'>
                <button onClick={() => handlePageChange(1)} disabled={currentPage === 1} className={currentPage === 1? 'text-stone-400': ''}>
                    {`<<`}
                </button>
                <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} className={currentPage === 1? 'text-stone-400': ''}>
                    {`<`}
                </button>

                {Array.from({ length: totalPages }, (_, index) => (
                    <button className={currentPage === index + 1 ? 'font-bold': 'font-normal'} key={index + 1} onClick={() => handlePageChange(index + 1)} disabled={currentPage === index + 1}>
                    {index + 1}
                    </button>
                ))}

                <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} className={currentPage === totalPages? 'text-stone-400': ''}>
                    {`>`}
                </button>
                <button onClick={() => handlePageChange(totalPages)} disabled={currentPage === totalPages} className={currentPage === totalPages? 'text-stone-400': ''}>
                    {`>>`}
                </button>
            </div>
        </div>
    )
}