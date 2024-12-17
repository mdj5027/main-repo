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

if (nexacro.Radio) {
	var _pRadio = nexacro.Radio.prototype;
	_pRadio.createCssDesignContents = function () {
		this.set_codecolumn("codecolumn");
		this.set_datacolumn("datacolumn");
		var Radio_innerdataset = new nexacro.NormalDataset("Radio_innerdataset", this._p_parent);
		Radio_innerdataset._setContents("<ColumnInfo><Column id=\"codecolumn\" size=\"256\"/><Column id=\"datacolumn\" size=\"256\"/></ColumnInfo><Rows><Row><Col id=\"codecolumn\"/><Col id=\"datacolumn\">Radio1</Col></Row><Row><Col id=\"codecolumn\"/><Col id=\"datacolumn\">Radio2</Col></Row></Rows>");
		this.set_innerdataset(Radio_innerdataset);
	};
	_pRadio.showCssDesignContents = function (objpath, status, statusvalue, userstatus, userstatusvalue) {
		nexacro.Component.prototype.showCssDesignContents.call(this, objpath, status, statusvalue, userstatus, userstatusvalue);
		this.set_index(1);
	};
	delete _pRadio;
}
