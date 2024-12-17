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

if (nexacro.XAgent) {
	var _pXAgent = nexacro.XAgent.prototype;
	_pXAgent = function (id, parent) {
		this.id = this._p_name = id;
		if (parent) {
			this._p_parent = parent;
		}
	};
}
;