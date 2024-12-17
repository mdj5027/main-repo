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

if (nexacro.PopupDiv) {
	nexacro.PopupDiv = function (id, left, top, width, height, right, bottom, minwidth, maxwidth, minheight, maxheight, parent) {
		nexacro.Div.call(this, id, left, top, width, height, right, bottom, minwidth, maxwidth, minheight, maxheight, parent);
	};
	var _pPopupDiv = nexacro._createPrototype(nexacro.Div, nexacro.PopupDiv);
	nexacro.PopupDiv.prototype = _pPopupDiv;
	_pPopupDiv._type_name = "PopupDiv";
	_pPopupDiv.on_created_contents = function () {
		nexacro.Div.prototype.on_created_contents.call(this);
		this._p_visible = false;
	};
	_pPopupDiv.createCssDesignContents = function () {
		this.set_text("PopupDiv");
	};
	_pPopupDiv.on_update_position = function (resize_flag, move_flag, update) {
		nexacro.Div.prototype.on_update_position.call(this, resize_flag, move_flag, update);
	};
	delete _pPopupDiv;
}
