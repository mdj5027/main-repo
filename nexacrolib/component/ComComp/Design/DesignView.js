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

if (nexacro.View) {
	var _pView = nexacro.View.prototype;
	_pView.createCssDesignContents = function () {
		this.set_text("View");
	};
	_pView.resetScroll = function () {
		var form = this._p_form;
		if (form) {
			form.resetScroll();
		}
	};
	_pView.set_viewtype = function (v) {
		this._p_viewtype = v;
	};
	_pView.set_viewdataset = function (v) {
		this._p_viewdataset = v;
	};
	_pView.set_sourceview = function (v) {
		this._p_sourceview = v;
	};
	delete _pView;
}
if (nexacro._InnerForm) {
	var _pInnerForm = nexacro._InnerForm.prototype;
	_pInnerForm.loadForm = nexacro.FormBase.prototype.loadForm;
	delete _pInnerForm;
}
