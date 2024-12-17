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

if (nexacro.Panel) {
	var _pPanel = nexacro.Panel.prototype;
	_pPanel.createCssDesignContents = function () {
		this.set_text("Panel");
	};
	_pPanel._getChilds = function () {
		var comps = [];
		var items = this._p_items;
		for (var i = 0, len = items.length; i < len; i++) {
			var item = items[i];
			var comp = item._getComponent();
			if (comp) {
				comps.push(comp);
			}
		}
		return comps;
	};
	_pPanel.design_set_fittocontents = function (v) {
		var fittocontents_enum = ["none", "width", "height", "both"];
		if (fittocontents_enum.indexOf(v) == -1) {
			return;
		}
		if (this._design_fittocontents != v) {
			this._design_fittocontents = v;
		}
	};
	_pPanel.design_get_fittocontents = function () {
		return this._design_fittocontents;
	};
	_pPanel._getLayoutChildlist = function () {
		return this._layoutchild_list ? this._layoutchild_list : this._getChilds();
	};
	delete _pPanel;
}
