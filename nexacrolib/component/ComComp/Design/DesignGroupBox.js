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

if (nexacro.GroupBox) {
	var _pGroupBox = nexacro.GroupBox.prototype;
	_pGroupBox.createCssDesignContents = function () {
		this.set_text("GroupBox");
	};
	delete _pGroupBox;
}
