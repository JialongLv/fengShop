// components/realm/index.js
import {FenceGroup} from "../models/fence-group";
import {Judger} from "../models/judger";

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
    data: {
        judger: Object
    },

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
            const judger = new Judger(fenceGroup)
            this.data.judger = judger

            this.bindFenceGroupData(fenceGroup)
        },

        bindFenceGroupData(fenceGroup) {
            this.setData({
                fences: fenceGroup.fences,
            })
        },

        onCellTap(event) {
            const data = event.detail.cell
            const x = event.detail.x
            const y = event.detail.y

            const judger = this.data.judger
            judger.judge(data, x, y)
            this.setData({
                fences: judger.fenceGroup.fences
            })
        }

    }
})
