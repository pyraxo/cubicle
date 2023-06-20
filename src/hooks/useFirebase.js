import { useState, useEffect } from "react";

import { fetchValue, saveValue } from "../services/Firebase";

const useFirebase = (key) => {
  const [value, setValue] = useState(null);

  useEffect(() => {
    fetchValue(key).then((val) => {
      setValue(val);
    });
  }, [key]);

  const setDataAtKey = (val) => saveValue(key, val);

  return [value, setDataAtKey];
};

export default useFirebase;
