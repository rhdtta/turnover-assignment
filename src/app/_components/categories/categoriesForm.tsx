'use client'

import { Suspense, useEffect, useRef, useState } from "react"
import { Pagination } from "./pagination";
import { CategoriesList } from "./categoriesList";
import { UseTRPCMutationResult } from "@trpc/react-query/shared";
import { api } from "~/trpc/react";

const itemsPerPage = 6;

type CategoriesFormProps = {
    categoryData: {
        result: {
            checked: boolean;
            id: number;
            name: string;
        }[], 
        selected: number[],
        totalPages: number
    },
    currentPage: number,
    setCurrentPage: (page: number) => void,
    loading: boolean
}

export function CategoriesForm({categoryData, currentPage, setCurrentPage, loading}: CategoriesFormProps) {

    const updateCategories = api.post.saveSelectedCategories.useMutation();
    const [localSelected, setLocalSelected] = useState(categoryData.selected);
  
    const handlePageChange = (page: number) => {
      setCurrentPage(page);
    };

    const handleCheckboxChange = async (e: React.ChangeEvent<HTMLInputElement>, categoryId: number) => {
        const isChecked = e.target.checked;

        setLocalSelected(prevSelectedCategories => {
            let temp: number[] = [];

            if (isChecked) {
              if (!prevSelectedCategories.includes(categoryId)) {
                temp = [...prevSelectedCategories, categoryId];
              }
            } else {
                temp = prevSelectedCategories.filter(id => id !== categoryId);
            }

            updateCategories.mutate({
                selectedCategories: temp
            })

            return temp;
        });

        
    }

    return (
        <Suspense fallback={<p>Loading feed...</p>}>
            <div>
                <span>My saved interests!</span>
                {categoryData.result.map(category => (
                    <div key={category.id}>
                        <input
                            type="checkbox"
                            id={`${category.id}`}
                            value={category.name}
                            checked={localSelected.includes(category.id)}
                            onChange={(e) => handleCheckboxChange(e, category.id)}
                        />
                        <label htmlFor={`${category.id}`}>{category.name}</label>
                    </div>
                ))}


                {/* pagination  */}
                <div className='flex gap-2'>
                    <button onClick={() => handlePageChange(1)} disabled={currentPage === 1} className="text-stone-400">
                        {`<<`}
                    </button>
                    <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} className="text-stone-400">
                        {`<`}
                    </button>

                    {Array.from({ length: categoryData.totalPages }, (_, index) => (
                        <button className={currentPage === index + 1 ? 'font-bold': 'font-normal text-stone-400'} key={index + 1} onClick={() => handlePageChange(index + 1)} disabled={currentPage === index + 1}>
                        {index + 1}
                        </button>
                    ))}

                    <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === categoryData.totalPages-1} className="text-stone-400">
                        {`>`}
                    </button>
                    <button onClick={() => handlePageChange(categoryData.totalPages-1)} disabled={currentPage === categoryData.totalPages-1} className="text-stone-400">
                        {`>>`}
                    </button>
                </div>
            </div>
        </Suspense>
    )
}