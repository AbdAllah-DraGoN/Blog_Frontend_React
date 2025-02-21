import { useState, useEffect } from "react";
import axios from "axios";
import { MAIN_API_URL } from "../data";

const useGetApi = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(MAIN_API_URL + url);
        setData(response.data); // تخزين البيانات في state
        setError(null); // مسح الخطأ إذا كان الطلب ناجحًا
      } catch (err) {
        setError(err); // تخزين رسالة الخطأ في state
      } finally {
        setLoading(false); // تعيين التحميل إلى false بعد انتهاء الطلب
      }
    };

    fetchData();
  }, [url]);

  return [data, loading, error];
};

export default useGetApi;
