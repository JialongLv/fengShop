import {Http} from "../utils/http";

class Theme {
    static LocationA = 't-1';
    static LocationE = 't-2';
    static LocationF = 't-3';
    static LocationH = 't-4'

    theme = []

    async getThemes() {
        const names =`${Theme.LocationA},${Theme.LocationE},${Theme.LocationF},${Theme.LocationH}`
        this.theme = await Http.request({
            url: `theme/by/names`,
            data: {
                names
            }
        })
    }

    getHomeLocationA() {
      return this.theme.find(t=> t.name === Theme.LocationA)
    }

    getHomeLocationE(){
        return this.theme.find(t=> t.name === Theme.LocationE)
    }

    getHomeLocationF(){
        return this.theme.find(t=> t.name === Theme.LocationF)
    }

    getHomeLocationH(){
        return this.theme.find(t=> t.name === Theme.LocationH)
    }

    static getHomeLocationESpu(){
        return Theme.getThemeSpuByName(Theme.LocationE)
    }

    static getThemeSpuByName(name){
        return Http.request({
            url:`theme/name/${name}/with_spu`
        })
    }
}


export {
    Theme
}