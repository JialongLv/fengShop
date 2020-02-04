import {Http} from "../utils/http";

class Theme {
    static async getHomeLocationA() {
        const data = await Http.request({
            url: `theme/by/names`,
            data: {
                names: 't-1'
            }
        })

        return data;
    }
}


export {
    Theme
}