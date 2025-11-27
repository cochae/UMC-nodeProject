import { responseFromStore } from "../dtos/store.dto.js";
import {
  addStore,
  getStore,
} from "../repositories/store.repository.js";
import { DuplicateStoreIdError, UnauthorizedRoleError } from "../errors.js";


export const storeCreate = async (data, role) => {
  if (role != "ADMIN"){
    throw new UnauthorizedRoleError("가게 생성 권한이 없습니다", role);
  }
  const createdStoreId = await addStore(data);
  if (createdStoreId === null) {
    throw new DuplicateStoreIdError("이미 존재하는 가게입니다.", data);
  }

  const store = await getStore(createdStoreId);
  console.log("store from getStore:", store);

  return responseFromStore(store);
};