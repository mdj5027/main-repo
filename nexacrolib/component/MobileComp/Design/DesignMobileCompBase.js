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

if (nexacro.FieldBase) {
	var _pFieldBase = nexacro.FieldBase.prototype;
	_pFieldBase._p_labelfloatingfixed = true;
	_pFieldBase._design_labelfloatingfixed = false;
	_pFieldBase._initDesignDefaultProperty = function () {
		this.set_labeltext(this._p_name);
	};
	_pFieldBase.design_set_labelfloatingfixed = function (v) {
		this._design_labelfloatingfixed = v;
	};
	_pFieldBase.design_get_labelfloatingfixed = function () {
		return this._design_labelfloatingfixed;
	};
	delete _pFieldBase;
}
