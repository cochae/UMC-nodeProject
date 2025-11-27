import { prisma } from "../db.config.js";

export const addStore = async (data) => {

  try {
    const existingStore = await prisma.store.findUnique({
      where: {businessNumber: data.businessNumber}
    });

    if (existingStore) {
      return null;
    }

    const region = await prisma.region.findFirst({
      where: { name: data.regionName}
    })

    if (!region){
      throw new Error(`지역을 찾을 수 없습니다: ${data.regionName}`);
    }

    // store 생성
    const newStore = await prisma.store.create({
      data: {
        businessNumber: data.businessNumber,
        regionId: region.id,
        name: data.name,
        address: data.address,
      }
    });

    return newStore.id;

  } catch (err) {
    throw new Error(
      `오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`
    );
  }
};
export const getStore = async (storeId) => {

  try {
    const store = await prisma.store.findUnique({
      where: { id: storeId }
    })

    if (!store) {
      return null;
    }

    return store;

  } catch (err) {
    throw new Error(
      `오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`
    );
  } 
};