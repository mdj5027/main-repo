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

if (nexacro.CheckBoxSet) {
	var _pCheckBoxSet = nexacro.CheckBoxSet.prototype;
	_pCheckBoxSet.createCssDesignContents = function () {
		this.set_codecolumn("codecolumn");
		this.set_datacolumn("datacolumn");
		var CheckBoxSet_innerdataset = new nexacro.NormalDataset("CheckBoxSet_innerdataset", this._p_parent);
		CheckBoxSet_innerdataset._setContents("<ColumnInfo><Column id=\"codecolumn\" size=\"256\"/><Column id=\"datacolumn\" size=\"256\"/></ColumnInfo><Rows><Row><Col id=\"codecolumn\"/><Col id=\"datacolumn\">CheckBoxSet1</Col></Row><Row><Col id=\"codecolumn\"/><Col id=\"datacolumn\">CheckBoxSet2</Col></Row></Rows>");
		this.set_innerdataset(CheckBoxSet_innerdataset);
	};
	_pCheckBoxSet.showCssDesignContents = function (objpath, status, statusvalue, userstatus, userstatusvalue) {
		nexacro.Component.prototype.showCssDesignContents.call(this, objpath, status, statusvalue, userstatus, userstatusvalue);
		this.set_index(1);
	};
	delete _pCheckBoxSet;
}
