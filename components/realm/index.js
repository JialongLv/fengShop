// components/realm/index.js
import {FenceGroup} from "../models/fence-group";

Component({
    /**
     * 组件的属性列表
     */
    properties: {
        spu: Object
    },

    /**
     * 组件的初始数据
     */
    data: {},

    observers: {
        'spu': function (spu) {
            if (!spu) {
                return
            } else {
                this.processHasSpec(spu)
            }
        }
    },
    /**
     * 组件的方法列表
     */
    methods: {
        processHasSpec(spu) {
            const fenceGroup = new FenceGroup(spu)
            fenceGroup.initFences()
            this.bindFenceGroupData(fenceGroup)
            console.log(fenceGroup.fences)
        },

        bindFenceGroupData(fenceGroup) {
            this.setData({
                fences: fenceGroup.fences,
            })
        },
    }
})
