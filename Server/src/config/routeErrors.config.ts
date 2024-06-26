import { app } from "../server";
import { Request, Response } from "express";
import { httpStatus } from "../utils";
import { logger } from "../utils";

export function routeErrors(): void {
    app.on("error", (err) => logger.error("server error: " + err));
    app.all("*", (req: Request, res: Response) => {
        res.status(httpStatus.NotFound).json({
            status: "error",
            msg: "route not found",
            data: {},
        });
    });
}
