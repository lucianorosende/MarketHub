import { CartsService, ProductsService, TicketsService } from "../services";
import { customRequest } from "../utils";
import { httpStatus } from "../utils";
import { Request, Response } from "express";

class CartController {
    async getAll(req: Request, res: Response) {
        const getCarts = await CartsService.getAll();
        getCarts.length === 0
            ? customRequest(
                  res,
                  httpStatus.Error,
                  "error",
                  "No Carts available",
                  getCarts
              )
            : customRequest(
                  res,
                  httpStatus.Error,
                  "success",
                  "List of Carts",
                  getCarts
              );
    }
    async getById(req: Request, res: Response) {
        const { cid } = req.params;
        let getProductsID = await CartsService.getCartById(cid);
        getProductsID.length === 0
            ? customRequest(
                  res,
                  httpStatus.NotFound,
                  "error",
                  `We didn't find a Cart for your id`,
                  getProductsID
              )
            : customRequest(
                  res,
                  httpStatus.Ok,
                  "success",
                  `This is the Cart with id: ${getProductsID[0].cID}`,
                  getProductsID
              );
    }
    async getAndPopulate(req: Request, res: Response) {
        const { cid } = req.params;
        let getProductsID = await CartsService.getCartByIdAndPopulate(cid);
        getProductsID.length === 0
            ? customRequest(
                  res,
                  httpStatus.NotFound,
                  "error",
                  `We didn't find a Cart for your id`,
                  getProductsID
              )
            : customRequest(
                  res,
                  httpStatus.Ok,
                  "success",
                  `This is the Cart with id: ${getProductsID[0].cID}`,
                  getProductsID
              );
    }
    async create(req: Request, res: Response) {
        const addCart = await CartsService.addCart();
        customRequest(
            res,
            httpStatus.Ok,
            "success",
            "Cart added successfully",
            addCart
        );
    }

    async purchase(req: Request, res: Response) {
        const { cid, email } = req.params;
        let update = await CartsService.updateStockFromProducts(cid);
        let ticket = await TicketsService.generateTicket(req.params, update);
        let swapper = await CartsService.replaceCart(req.params);
        ticket
            ? customRequest(
                  res,
                  httpStatus.Ok,
                  "success",
                  "Ticket generated successfully",
                  ticket
              )
            : customRequest(
                  res,
                  httpStatus.Ok,
                  "error",
                  "No stock of products",
                  ticket
              );
    }
    async addProductIntoCart(req: Request, res: Response) {
        const { cid, pid } = req.params;
        const addProductInCart = await CartsService.addProductInCart(cid, pid);
        addProductInCart === "can't add more products"
            ? customRequest(
                  res,
                  httpStatus.Ok,
                  "success",
                  "You have exceeded the maximum number of products",
                  {}
              )
            : addProductInCart !== undefined
            ? customRequest(
                  res,
                  httpStatus.Ok,
                  "success",
                  "Product added successfully into cart",
                  addProductInCart
              )
            : customRequest(
                  res,
                  httpStatus.NotFound,
                  "error",
                  "Product was not added successfully",
                  {}
              );
    }
    async updateProductFromCart(req: Request, res: Response) {
        const { cid } = req.params;
        const updateCart = await CartsService.updateProductsFromCart(
            cid,
            req.body
        );
        customRequest(
            res,
            httpStatus.Ok,
            "success",
            "products updated successfully",
            {}
        );
    }
    async updateQuantity(req: Request, res: Response) {
        const { cid, pid } = req.params;
        const updateCart = await CartsService.UpdateQuantityProduct(
            cid,
            pid,
            req.body
        );
        customRequest(
            res,
            httpStatus.Ok,
            "success",
            "products updated successfully",
            updateCart
        );
    }
    async deleteProductFromCart(req: Request, res: Response) {
        const { cid, pid } = req.params;
        const deleteProducts = await CartsService.deleteProductFromCart(
            cid,
            pid
        );
        const cartPopulate = await CartsService.getCartByIdAndPopulate(cid);
        customRequest(
            res,
            httpStatus.Ok,
            "success",
            "product deleted successfully",
            cartPopulate
        );
    }
    async deleteAllProductsFromCart(req: Request, res: Response) {
        const { cid } = req.params;
        const deleteData = await CartsService.deleteAllProductsFromCart(cid);
        customRequest(
            res,
            httpStatus.Ok,
            "success",
            "Products deleted successfully",
            deleteData
        );
    }
    async deleteAll(req: Request, res: Response) {
        const deleteData = await CartsService.deleteAllCarts();
        customRequest(
            res,
            httpStatus.Ok,
            "success",
            "Carts deleted successfully",
            []
        );
    }
}

export const CartsController = new CartController();
