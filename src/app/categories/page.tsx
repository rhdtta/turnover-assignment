"use client"
// import { api } from "~/trpc/server";
import { api } from "~/trpc/react";
import { CategoriesForm } from "../_components/categories/categoriesForm";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

const perPage = 6;

export default function Categories() {
    
    const [currentPage, setCurrentPage] = useState(1);

    const categories = api.post.getCategories.useQuery({
        page: currentPage,
        perPage: perPage
    });

    

    return (
        <div className="py-10 px-10">
            <div className="flex flex-col items-center border rounded-[20px]">
                <span className="text-[32px] font-semibold">Please mark your interests!</span>
                <span className="text-base">We will keep you notified.</span>
                {
                    categories.data? <CategoriesForm categoryData={categories.data} loading={categories.isLoading} currentPage={currentPage} setCurrentPage={setCurrentPage}/>: ""
                }
                
            </div>
        </div>
    )
}