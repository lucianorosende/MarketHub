import { useState, useEffect } from "react";

export function useFetchCategoryProducts(category: string) {
    const [productList, setProductList] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            const data = await fetch(
                `${process.env.REACT_APP_FETCH_URL}/api/products${category}`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: "include",
                }
            );
            const responseData = await data.json();
            console.log(responseData);
            setProductList(responseData.data);
        };
        fetchData();
    }, [category]);
    return { productList };
}
