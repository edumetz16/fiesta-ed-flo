import { EdgeConfigValue, get } from "@vercel/edge-config"
  


export const getItem = async (key: string) => {
  return get(key);
}

export const setItem = async (key: string, value: EdgeConfigValue, merge = true) => {
  const currentValue = await getItem(key);
  if (Array.isArray(value)) {
    console.log('value is an array, override')
  }
  else if(typeof currentValue === 'object' && typeof value === 'object' && merge) {
    value = {
      ...currentValue,
      ...value
    }
  }
  try {
    const updateEdgeConfig = await fetch(
      'https://api.vercel.com/v1/edge-config/ecfg_w3dhtnxl5vin0wuj7e1gaepre6v9/items',
      {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${process.env.VERCEL_ACCESS_TOKEN!}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items: [
            {
              operation: currentValue ? 'update' : 'create',
              key,
              value,
            },
          ],
        }),
      },
    );
    const result = await updateEdgeConfig.json();
    console.log(result);
  } catch (error) {
    console.log(error);
  }
}