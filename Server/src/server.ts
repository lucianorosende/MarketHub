import Express from "express";
import { routeErrors } from "./functions/routeErrors";
import {
    routeInitializer,
    publicAndHbs,
    webSocketInitializer,
} from "./functions";
import cors from "cors";

// Initializing Express -------------------------------------------------------------------------------------------------------------
export const app = Express();
app.use(Express.urlencoded({ extended: true }));
app.use(Express.json());
app.use(cors());
const PORT: number = 8080;

// Initializing public and hbs Engine -----------------------------------------------------------------------------------------------
publicAndHbs();

// Initializing server -------------------------------------------------------------------------------------------------------------
export const httpServer = app.listen(PORT, () => {
    console.log(`Example app listening on http://localhost:${PORT}`);
});

// Initializing webSockets --------------------------------------------------------------------------------------------------------
webSocketInitializer();

// Initializing Routes --------------------------------------------------------------------------------------------------------------
routeInitializer();

// Handling Errors ------------------------------------------------------------------------------------------------------------------
routeErrors();