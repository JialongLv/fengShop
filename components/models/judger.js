import {SkuCode} from "./sku-code";
import {CellStatus} from "../../core/enum";
import {Cell} from "./cell";
import {SkuPending} from "./sku-pending";
import {Joiner} from "../../utils/joiner";

class Judger {

    fenceGroup
    pathDict = []
    skuPending

    constructor(fenceGroup) {
        this.fenceGroup = fenceGroup
        this._initPathDict()
        this._initSkuPending()
    }

    _initSkuPending() {
        this.skuPending = new SkuPending()
    }

    _initPathDict() {
        this.fenceGroup.spu.sku_list.forEach(s => {
                const skuCode = new SkuCode(s.code)
                this.pathDict = this.pathDict.concat(skuCode.totalSegments)
            },
        )
        console.log(this.pathDict)
    }

    judge(cell, x, y) {
        this._changeCurrentCellStatus(cell, x, y)

        this.fenceGroup.eachCell((cell, x, y) => {
            const path = this._findPotentialPath(cell, x, y)
            if (!path) {
                return
            }

            const isIn = this._isInDict(path)
            if (isIn) {
                this.fenceGroup.fences[x].cells[y].status =  CellStatus.WAITING
               // this.fenceGroup.setCellStatusByXY(x, y, CellStatus.WAITING)
            } else {
                this.fenceGroup.fences[x].cells[y].status =  CellStatus.FORBIDDEN
                //this.fenceGroup.setCellStatusByXY(x, y, CellStatus.FORBIDDEN)
            }
        })
    }

    _isInDict(path) {
        return this.pathDict.includes(path)
    }

    _findPotentialPath(cell, x, y) {
        const joiner = new Joiner('#')
        for (let i = 0; i < this.fenceGroup.fences.length; i++) {
            const selected = this.skuPending.findSelectedCellByX(i)
            if (x === i) {
                //当前行
                if (this.skuPending.isSelected(cell, x)) {
                    return
                }

                const cellCode = this._getCellCode(cell.spec)
                joiner.join(cellCode)
            } else {
                //其他行
                if (selected) {
                    const selectedCellCode = this._getCellCode(selected.spec)
                    joiner.join(selectedCellCode)
                }
            }
        }

        return joiner.getStr()
    }

    _getCellCode(spec) {
        return spec.key_id + '-' + spec.value_id
    }

    _changeCurrentCellStatus(cell, x, y) {
        if (cell.status === CellStatus.WAITING) {
            this.setCellStatusByXY(x, y, CellStatus.SELECTED)
            this.skuPending.insertCell(cell, x)
        }

        if (cell.status === CellStatus.SELECTED) {
            this.setCellStatusByXY(x, y, CellStatus.WAITING)
            this.skuPending.removeCell(x)
        }
    }

    setCellStatusByXY(x, y, status) {
        this.fenceGroup.fences[x].cells[y].status = status
    }
}

export {
    Judger
}