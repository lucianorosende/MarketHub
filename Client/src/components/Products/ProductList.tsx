import { ProductCard } from ".";
import { useFetchProducts } from "../../hooks";
import { ProductPagination } from "./ProductPagination";

export function ProductList() {
    const { productList, pages, setRenderPage } = useFetchProducts("", 3);
    return (
        <>
            <ProductCard list={productList} />
            <ProductPagination pages={pages} setActualPage={setRenderPage} />
        </>
    );
}
