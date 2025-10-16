import { StatusCodes } from "http-status-codes";
import { bodyToStore } from "../dtos/store.dto.js";
import { storeCreate } from "../services/store.service.js";

export const handleStoreCreate = async (req, res, next) => {
    console.log("가게를 추가했습니다!");
    console.log("body:", req.body);

    const store = await storeCreate(bodyToStore(req.body));
    res.status(StatusCodes.OK).json({ result: store });
}