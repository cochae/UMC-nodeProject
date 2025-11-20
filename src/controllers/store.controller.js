import { StatusCodes } from "http-status-codes";
import { bodyToStore } from "../dtos/store.dto.js";
import { storeCreate } from "../services/store.service.js";

export const handleStoreCreate = async (req, res, next) => {
      /*
    #swagger.summary = '가게 추가 API';
    #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              business_number: { type: "string" },
              region_id: { type: "string" },
              name: { type: "string" },
              address: { type: "string" }
            }
          }
        }
      }
    };
    #swagger.responses[200] = {
      description: "가게 추가 성공 응답",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string", example: "SUCCESS" },
              error: { type: "object", nullable: true, example: null },
              success: {
                type: "object",
                properties: {
                  id: { type: "int" },
                  name: { type: "string" },
                }
              }
            }
          }
        }
      }
    };
    #swagger.responses[400] = {
      description: "가게 추가 실패 응답",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string", example: "FAIL" },
              error: {
                type: "object",
                properties: {
                  errorCode: { type: "string", example: "U002" },
                  reason: { type: "string" },
                  data: { type: "object" }
                }
              },
              success: { type: "object", nullable: true, example: null }
            }
          }
        }
      }
    };
  */
    console.log("가게를 추가했습니다!");
    console.log("body:", req.body);

    const store = await storeCreate(bodyToStore(req.body));
    res.status(StatusCodes.OK).success(store);
}