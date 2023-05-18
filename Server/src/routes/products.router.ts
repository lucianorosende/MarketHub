import Express, { Request, Response } from "express";
import { asyncHandler } from "../functions";
import { newProduct } from "../classes";
import { TProduct } from "../types";
import {
    validateCodeRepetition,
    validateProduct,
    validateProductID,
} from "../middleware";

export const productRouter = Express.Router();

productRouter.get(
    "/",
    asyncHandler(async (req: Request, res: Response) => {
        const { limit } = req.query;
        let readProducts: TProduct[] = await newProduct.getProducts();
        let numLimit: number = Number(limit);
        let newArr: TProduct[] = readProducts.slice(0, numLimit);
        if (numLimit <= readProducts.length) {
            res.status(200).json({
                status: "success",
                msg: `This is the list of products with the limit of ${numLimit}`,
                data: newArr,
            });
        } else if (numLimit > readProducts.length) {
            res.status(400).json({
                status: "error",
                msg: "limit exceeded",
                data: {},
            });
        } else {
            res.status(200).json({
                status: "success",
                msg: "List of products",
                data: readProducts,
            });
        }
    })
);

productRouter.get(
    "/:pid",
    validateProductID,
    asyncHandler(async (req: Request, res: Response) => {
        const { pid } = req.params;
        let getProductsID: TProduct = await newProduct.getProductById(
            Number(pid)
        );
        if (getProductsID) {
            res.status(200).json({
                status: "success",
                msg: `This is the product with id: ${pid}`,
                data: getProductsID,
            });
        } else {
            res.status(404).json({
                status: "error",
                msg: "404 product not found",
                data: {},
            });
        }
    })
);

productRouter.post(
    "/",
    validateProduct,
    validateCodeRepetition,
    asyncHandler(async (req: Request, res: Response) => {
        const addData: boolean = await newProduct.addProduct(req.body);
        if (addData) {
            res.status(200).json({
                status: "success",
                msg: `You added a new product!`,
                data: req.body,
            });
        } else {
            res.status(400).json({
                status: "error",
                msg: "Product is repeated!",
                data: {},
            });
        }
    })
);

productRouter.put(
    "/:pid",
    validateProduct,
    validateProductID,
    asyncHandler(async (req: Request, res: Response) => {
        const { pid } = req.params;
        const updateData = await newProduct.updateProduct(
            Number(pid),
            req.body
        );
        if (updateData) {
            res.status(200).json({
                status: "success",
                msg: "data updated successfully",
                data: updateData,
            });
        } else {
            res.status(400).json({
                status: "error",
                msg: "product not found",
                data: {},
            });
        }
    })
);

productRouter.delete(
    "/:pid",
    validateProductID,
    asyncHandler(async (req: Request, res: Response) => {
        const { pid } = req.params;
        const deleteData = await newProduct.deleteProduct(Number(pid));
        const getData = await newProduct.getProducts();
        if (deleteData) {
            res.status(200).json({
                status: "success",
                msg: "product deleted successfully",
                data: getData,
            });
        } else {
            res.status(400).json({
                status: "error",
                msg: "product not found",
                data: {},
            });
        }
    })
);