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

if (nexacro.MaskEdit) {
	var _pMaskEdit = nexacro.MaskEdit.prototype;
	_pMaskEdit.createCssDesignContents = function () {
		this.set_type("string");
		this.set_format("@@@@@@@@");
		this.set_value("MaskEdit");
	};
	delete _pMaskEdit;
}
