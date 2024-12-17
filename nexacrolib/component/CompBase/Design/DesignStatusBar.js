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

if (nexacro.StatusBarControl) {
	var _pStatusBar = nexacro.StatusBarControl.prototype;
	_pStatusBar.createCssDesignContents = function () {
		this.set_text("statustext");
		this.set_resizable(true);
	};
	_pStatusBar.updatePreviewPosition = function () {
		this.setOffsetHeight(nexacro.Frame.prototype._defaultstatusheight);
		var form = this._p_parent;
		var offset_left = (form._adjust_width / 2) - (this._adjust_width / 2);
		var offset_top = (form._adjust_height / 2) - (this._adjust_height / 2);
		this.move(offset_left, offset_top);
	};
	delete _pStatusBar;
}
