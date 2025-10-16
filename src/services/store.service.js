import { responseFromStore } from "../dtos/store.dto.js";
import {
  addStore,
  getStore,
} from "../repositories/store.repository.js";

export const storeCreate = async (data) => {
  const createdStoreId = await addStore(data);

  if (createdStoreId === null) {
    throw new Error("이미 존재하는 가게입니다.");
  }

  const store = await getStore(createdStoreId);
  console.log("store from getStore:", store);

  return responseFromStore(store);
};