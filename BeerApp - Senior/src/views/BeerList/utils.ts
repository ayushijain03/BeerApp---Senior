import { getBeerList, getBeerMetaData } from "../../api";
import { Beer, ApiParams } from "../../types";
import handle from "../../utils/error";

const fetchData = (
  setData: (data: Array<Beer>) => void,
  setTotalPages: (setTotalPages: number) => void,
  params?: ApiParams
) => {
  (async () => {
    try {
      const [response, metadata] = await Promise.all([
        getBeerList(params),
        getBeerMetaData(params),
      ]);

      setData(response.data);
      setTotalPages(Math.ceil(metadata.data.total / metadata.data.per_page));
    } catch (error) {
      handle(error);
    }
  })();
};

export { fetchData };
