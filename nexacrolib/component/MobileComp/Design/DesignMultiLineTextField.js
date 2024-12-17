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

if (nexacro.MultiLineTextField) {
	var _pMultiLineTextField = nexacro.MultiLineTextField.prototype;
	_pMultiLineTextField.createCssDesignContents = function () {
		this.set_value("MultiLineTextField is a\r\nComponent used\r\nto be input text\r\nstrings in many\r\nlines.");
	};
	_pMultiLineTextField.updatePreviewPosition = function () {
		var form = this._p_parent;
		var nWidth = 250;
		var nHeight = 120;
		var offset_left = (form._adjust_width / 2) - (nWidth / 2);
		var offset_top = (form._adjust_height / 2) - (nHeight / 2);
		this.move(offset_left, offset_top, nWidth, nHeight);
	};
	delete _pMultiLineTextField;
}
