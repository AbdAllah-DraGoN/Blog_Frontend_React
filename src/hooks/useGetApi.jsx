import { useState, useEffect } from "react";
import axios from "axios";
import { MAIN_API_URL } from "../data";

const useGetApi = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async (path = url) => {
    try {
      const response = await axios.get(MAIN_API_URL + path);
      setData(response.data); // تخزين البيانات في state
      setError(null); // مسح الخطأ إذا كان الطلب ناجحًا
    } catch (err) {
      setError(err); // تخزين رسالة الخطأ في state
    } finally {
      setLoading(false); // تعيين التحميل إلى false بعد انتهاء الطلب
    }
  };
  useEffect(() => {
    fetchData(url);
  }, [url]);

  return [data, loading, error, fetchData];
};

export default useGetApi;
