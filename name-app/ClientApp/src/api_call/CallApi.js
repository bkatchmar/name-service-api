import axios from "axios";

export default class CallApi {
  static GetAllNames = async () => {
    let rtnVal = await axios.get("/name/getall");
    return rtnVal.data;
  };

  static ReturnNameGuid = async (first, last) => {
    let rtnVal = await axios.post("/name/returnnameguid", {
      First: first,
      Last: last,
    });
    return rtnVal.data;
  };

  static AllGuidsMatchName = async (mode, name) => {
    let rtnVal = await axios.get("/name/allguidsthatmatchname", {
      params: {
        mode: mode,
        name: name,
      },
    });
    return rtnVal.data;
  };
}
