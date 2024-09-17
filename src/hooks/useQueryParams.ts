/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

type ValidStateValues = string | number | boolean | null;
type ToType = 'number' | 'string' | 'boolean' | 'null';
export type DeserializeOptions = {
  replaceNaN?: number | false;
};

function serializeParams(value: ValidStateValues) {
  return value === null ? '' : String(value);
}

function deserializeParams<
  To extends ToType,
  TReturn = To extends 'string'
    ? string
    : To extends 'number'
      ? number
      : To extends 'boolean'
        ? boolean
        : null,
>(value: string, to: To, options: DeserializeOptions = {}) {
  const { replaceNaN } = options;

  if (to === undefined || to === 'string') {
    return value as TReturn;
  }

  if (to === 'number') {
    const num = Number(value);

    return (
      replaceNaN === false ? num : isNaN(num) ? (replaceNaN === undefined ? 0 : replaceNaN) : num
    ) as TReturn;
  }

  if (to === 'boolean') {
    return (value === 'true') as TReturn;
  }

  return null as TReturn;
}

export const useQueryParams = <TValue extends ValidStateValues = string>(
  key: string,
  initialValue?: NoInfer<TValue>,
  options: { type?: ToType; serializer?: (value: ValidStateValues) => string } = {}
) => {
  const { type = 'string', serializer = serializeParams } = options;
  const [params, setParams] = useSearchParams();

  const setValue = (value: TValue) => {
    setParams(
      (p) => {
        p.set(key, serializer(value));

        return p;
      },
      { replace: true }
    );
  };

  useEffect(() => {
    if (initialValue !== undefined && params.get(key) === null) {
      setValue(initialValue);
    }
  }, []);

  const value = deserializeParams(params.get(key) ?? String(initialValue), type);
  return [value, setValue] as [TValue, (value: TValue) => void];
};
