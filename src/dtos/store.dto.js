export const bodyToStore = (body) => {

  return {
    region_id: body.region_id, 
    region_name: body.region_name,
    name: body.name, 
    score: body.score, 
    address: body.address,
    business_number: body.business_number
  };
};

export function responseFromStore(store) {
  return {
    id: store.id,
    name: store.name,
  };
}