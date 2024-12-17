//==============================================================================
//
//  Copyright 2021 TOBESOFT Co., Ltd.
//  All Rights Reserved.
//
//  NOTICE: TOBESOFT permits you to use, modify, and distribute this file 
//          in accordance with the terms of the license agreement accompanying it.
//
//  Readme URL: http://www.nexacro.com/legal/license/tobesoft/ko/NexacroN-public-license-readme-1.1.html
//
//==============================================================================

if (nexacro.Dataset) {
	var _pDataset = nexacro.Dataset.prototype;
	_pDataset._p_updatecontrol = false;
	_pDataset._design_updatecontrol = true;
	_pDataset.design_set_updatecontrol = function (v) {
		this._design_updatecontrol = nexacro._toBoolean(v);
	};
	_pDataset.design_get_updatecontrol = function () {
		return this._design_updatecontrol;
	};
	_pDataset._setContents = function (contents) {
		if (contents.length) {
			this._loadFromXMLStr(contents, undefined, undefined, undefined, true);
			this._p_rowposition = -1;
		}
		var binddataobject = this._p_binddataobject;
		if (binddataobject) {
			if (!this._binddataobject) {
				this._binddataobject = this._findDataObject(binddataobject);
			}
			this._loadDataObject();
		}
		this.updateSortGroup();
		if (this._p_colcount > 0) {
			this._endLoad(0, "SUCCESS", 3);
		}
	};
	_pDataset._adjustRowinsertColumn = function (idx) {
		var viewRecords = this._viewRecords;
		var rawRecords = this._rawRecords;
		if (viewRecords != rawRecords) {
			viewRecords = this._viewRecords = rawRecords.slice(0, rawRecords.length);
		}
		var start = 0;
		var end = viewRecords.length;
		function __adjustRow_loopFn (i) {
			var rowData = this.__getParsedRow(viewRecords[i]);
			if (rowData) {
				rowData.splice(idx, 0, undefined);
			}
		}
		nexacro.__forLoop(this, 0, end, __adjustRow_loopFn);
		var bfilter = (this._p_filterstr == null || this._p_filterstr == "") ? false : true;
		var bsortgroup = (this._p_keystring == "" || this._p_keystring == "S:" || this._p_keystring == "G:") ? false : true;
		if (bfilter) {
			this._reFilter();
		}
		if (bsortgroup) {
			this._resetSortGroup();
		}
		if (this._eventstat) {
			this.on_fire_onrowsetchanged(-1, -1, 34);
			var evt = new nexacro.DSColChangeEventInfo(this, "onvaluechanged", this._p_rowposition, -1, -1, "", undefined, undefined);
			this.on_fire_onvaluechanged(evt);
		}
	};
	_pDataset._updateColType = function (idx, type) {
		var colList = this._p_colinfos;
		var constList = this._constVars;
		var updated;
		var evt;
		idx = this.getColIndex(idx);
		if (idx < 0) {
			return -1;
		}
		else if (idx < colList.length) {
			updated = colList._updateType(idx, type);
			if (updated) {
				this._clearAllExprs();
				if (this._eventstat) {
					this.on_fire_onrowsetchanged(-1, -1, 34);
					evt = new nexacro.DSColChangeEventInfo(this, "onvaluechanged", this._p_rowposition, -1, -1, "", undefined, undefined);
					this.on_fire_onvaluechanged(evt);
				}
				return idx;
			}
		}
		else {
			updated = constList._updateType(idx - colList.length, type);
			if (updated) {
				this._clearAllExprs();
				if (this._eventstat) {
					this.on_fire_onrowsetchanged(-1, -1, 34);
					evt = new nexacro.DSColChangeEventInfo(this, "onvaluechanged", this._p_rowposition, -1, -1, "", undefined, undefined);
					this.on_fire_onvaluechanged(evt);
				}
				return idx;
			}
		}
		return -1;
	};
	delete _pDataset;
	var _pDSColumnInfoList = nexacro.DSColumnInfoList.prototype;
	_pDSColumnInfoList._updateType = function (idx, type) {
		var colinfo = this[idx];
		var intype = nexacro._toString(type).toLowerCase();
		var ntype = nexacro.DataUtils._typeint[intype];
		if (colinfo && colinfo.ntype != ntype) {
			colinfo.set_type(type);
			return true;
		}
		return false;
	};
	delete _pDSColumnInfoList;
	var _pVariableList = nexacro.VariableList.prototype;
	_pVariableList._updateType = function (idx, type) {
		var varinfo = this[idx];
		var intype = nexacro._toString(type).toLowerCase();
		var ntype = nexacro.DataUtils._typeint[intype];
		if (varinfo && varinfo.ntype != ntype) {
			varinfo.type = type;
			varinfo.ntype = ntype;
			return true;
		}
		return false;
	};
	delete _pVariableList;
}
