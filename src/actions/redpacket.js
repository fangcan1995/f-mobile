import cFetch from './../libs/cFetch';



export const redpacket = (params) => {
  return {
    type: 'GET_REDPACKET',
    async payload () {
        const res = await cFetch(paramsUrl, {
            method: 'GET',
            body: params
        }, false);
        const {
            code,
            data
        } = res;
        if (code == 0) {
            const articalList = {
                data,
                status
            };
            return articalList || {};
        } else {
            throw res;
        }
    }
  };
};