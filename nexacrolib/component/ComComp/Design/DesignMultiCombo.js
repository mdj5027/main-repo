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

if (nexacro.MultiCombo) {
	var _pMultiCombo = nexacro.MultiCombo.prototype;
	_pMultiCombo._on_dataset_onvaluechanged = function (obj, e) {
		if (this._p_type == "filter" || this._p_type == "filterlike") {
			this._createFilteredDataset();
		}
		this._recheckIndex();
		this.redraw();
		if (this._is_created) {
			this.on_fire_oninnerdatachanged(obj, e.oldvalue, e.newvalue, e.columnid, e.col, e.row);
		}
	};
	_pMultiCombo.createCssDesignContents = function () {
		this.set_codecolumn("codecolumn");
		this.set_datacolumn("datacolumn");
		var MultiCombo_innerdataset = new nexacro.NormalDataset("MultiCombo_innerdataset", this);
		MultiCombo_innerdataset._setContents("<ColumnInfo><Column id=\"codecolumn\" size=\"256\"/><Column id=\"datacolumn\" size=\"256\"/></ColumnInfo><Rows><Row><Col id=\"codecolumn\">1</Col><Col id=\"datacolumn\">MultiCombo Item 0</Col></Row><Row><Col id=\"codecolumn\">2</Col><Col id=\"datacolumn\">MultiCombo Item 1</Col></Row><Row><Col id=\"codecolumn\">3</Col><Col id=\"datacolumn\">MultiCombo Item 2</Col></Row></Rows>");
		this.set_innerdataset(MultiCombo_innerdataset);
		this.set_index(1);
	};
	_pMultiCombo.showCssDesignContents = function (objpath, status, statusvalue, userstatus, userstatusvalue) {
		nexacro.Component.prototype.showCssDesignContents.call(this, objpath, status, statusvalue, userstatus, userstatusvalue);
		this._showPopup(this.getInnerDataset(), this._p_index);
	};
	_pMultiCombo._getPopupListBoxSize = function () {
		var total_w = 0;
		var total_h = 0;
		var multicombolist = this._p_multicombolist;
		if (multicombolist) {
			var checkboxset = multicombolist.checkboxset;
			if (checkboxset) {
				var size = checkboxset._on_getFitSize();
				var itemheight = checkboxset._getItemHeight();
				var rowcount = (this._p_displayrowcount != null) ? this._p_displayrowcount : checkboxset._getInnerdatasetInfo("_rowcount");
				total_w = Math.max(this._adjust_width, size[0]);
				total_h = itemheight *  rowcount;
			}
		}
		return [total_w, total_h];
	};
	_pMultiCombo.updatePreviewPosition = function () {
		var form = this._p_parent;
		var size = this._getPopupListBoxSize();
		var offset_left = (form._adjust_width / 2) - (this._adjust_width / 2);
		var offset_top = (form._adjust_height / 2) - ((this._adjust_height + size[1]) / 2);
		this.move(offset_left, offset_top);
	};
	delete _pMultiCombo;
}
if (nexacro._MultiComboPopupControl) {
	var _pMultiComboPopupControl = nexacro._MultiComboPopupControl.prototype;
	_pMultiComboPopupControl._getElementPosition = function () {
		var multicombo = this._p_parent;
		if (multicombo) {
			if (this._isPreviewMode()) {
				return {
					x : multicombo._adjust_left, 
					y : multicombo._adjust_top
				};
			}
			else {
				return nexacro._getElementPositionInFrame(multicombo.getElement());
			}
		}
		return {
		};
	};
	delete _pMultiComboPopupControl;
}
