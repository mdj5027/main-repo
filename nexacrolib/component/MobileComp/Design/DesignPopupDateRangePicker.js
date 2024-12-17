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

if (nexacro.PopupDateRangePicker) {
	nexacro.PopupDateRangePicker = function (id, left, top, width, height, right, bottom, minwidth, maxwidth, minheight, maxheight, parent) {
		nexacro.DateRangePicker.call(this, id, left, top, width, height, right, bottom, minwidth, maxwidth, minheight, maxheight, parent);
		this._attached_comp = this;
	};
	var _pPopupDateRangePicker = nexacro._createPrototype(nexacro.DateRangePicker, nexacro.PopupDateRangePicker);
	nexacro.PopupDateRangePicker.prototype = _pPopupDateRangePicker;
	_pPopupDateRangePicker._type_name = "PopupDateRangePicker";
	_pPopupDateRangePicker.on_created_contents = function () {
		nexacro.DateRangePicker.prototype.on_created_contents.call(this);
		this._p_visible = false;
	};
	_pPopupDateRangePicker.on_update_position = function (resize_flag, move_flag, update) {
		nexacro.DateRangePicker.prototype.on_update_position.call(this, resize_flag, move_flag, update);
	};
	_pPopupDateRangePicker.createCssDesignContents = function () {
	};
	delete _pPopupDateRangePicker;
}
