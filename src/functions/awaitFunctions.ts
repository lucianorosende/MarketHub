import {
    productAddition,
    checkProduct,
    updateProduct,
    productDeletion,
} from "./index";

export const awaitFunctions = async (): Promise<void> => {
    await productAddition();
    await checkProduct();
    await updateProduct();
    await productDeletion();
};