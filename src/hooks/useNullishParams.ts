import { useParams } from 'react-router-dom';

export const useNullishParams = (key: string) => {
  const params = useParams();

  if (Object.prototype.hasOwnProperty.call(params, key)) {
    return params[key] ?? null;
  }

  return null;
};
