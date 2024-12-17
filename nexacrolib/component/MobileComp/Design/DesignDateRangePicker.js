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

if (nexacro.DateRangePicker) {
	var _pDateRangePicker = nexacro.DateRangePicker.prototype;
	_pDateRangePicker.createCssDesignContents = function () {
	};
	_pDateRangePicker.updatePreviewPosition = function () {
		if (!this._is_design_timepicker) {
			this._useclosebutton = true;
			this._headlineheight = 70;
			this.set_displaytype("datetime");
			this.set_startdate("20231019000000000");
			this.set_enddate("20231119000000000");
		}
		var form = this._p_parent;
		var nWidth = 300;
		var nHeight = 320;
		if (this.displaytype == "time") {
			nWidth = 250;
			nHeight = 250;
		}
		var offset_left = (form._adjust_width / 2) - (nWidth / 2);
		var offset_top = (form._adjust_height / 2) - (nHeight / 2);
		this.move(offset_left, offset_top, nWidth, nHeight);
	};
	delete _pDateRangePicker;
}
