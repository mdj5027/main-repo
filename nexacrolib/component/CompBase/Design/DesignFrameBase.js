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

if (nexacro.MainFrame) {
	var _pMainFrame = nexacro.MainFrame.prototype;
	_pMainFrame.createWindow = function () {
		if (!this._isPreviewMode()) {
			var _win = this._window;
			if (_win == null) {
				_win = this._window = new nexacro._Window(this._p_name, null, true);
			}
			_win.create(null, this._p_name, this._adjust_width, this._adjust_height, this._adjust_left, this._adjust_top, this._p_resizable);
			_win.attachFrame(this, false);
			_win._setSystemMenuResizable(this._p_resizable);
			var width = nexacro._getMainWindowWidth(_win);
			var height = nexacro._getMainWindowHeight(_win);
			this._setSize(width, height);
		}
		else {
			this._is_window = false;
		}
	};
	delete _pMainFrame;
}
if (nexacro.Frame) {
	var _pFrame = nexacro.Frame.prototype;
	_pFrame.createCssDesignContents = function () {
		this.set_showtitlebar(true);
		this.set_showstatusbar(true);
		if (this.set_resizable) {
			this.set_resizable(true);
		}
		this.set_titletext("titletext");
		this.set_statustext("statustext");
	};
	_pFrame.updatePreviewPosition = function () {
		var form = this._p_parent;
		var offset_left = (form._adjust_width / 2) - (this._adjust_width / 2);
		var offset_top = (form._adjust_height / 2) - (this._adjust_height / 2);
		this.move(offset_left, offset_top, this._adjust_width, this._adjust_height);
	};
	_pFrame._move = function (left, top, width, height, right, bottom) {
		var old_left = this._left;
		var old_top = this._top;
		var old_width = this._adjust_width;
		var old_height = this._adjust_height;
		var bsize = false;
		var bmove = false;
		if (this._is_window && this._window) {
			this._adjustPosition(left, top, right, bottom, width, height, null, null);
		}
		else {
			if (this._p_parent) {
				this._adjustPosition(left, top, right, bottom, width, height, this._p_parent._getClientWidth(), this._p_parent._getClientHeight());
			}
			else {
				this._adjustPosition(left, top, right, bottom, width, height, null, null);
			}
		}
		if (this._adjust_width != old_width || this._adjust_height != old_height) {
			bsize = true;
		}
		if (this._left != old_left || this._top != old_top) {
			bmove = true;
		}
		this.on_update_position(bsize, bmove, true);
	};
}
if (nexacro.ChildFrame) {
	var _pChildFrame = nexacro.ChildFrame.prototype;
	_pChildFrame.set_formurl = function (url) {
		var realurl = nexacro._getFDLLocation(url);
		if (this._formurl != realurl) {
			this._p_formurl = url;
			this._formurl = realurl;
			var form = this._p_form;
			if (form) {
				form.destroyComponent();
			}
			form = new nexacro.DesignForm("form", 0, 0, this.client_width, this.client_height, null, null, this._p_minwidth, this._p_maxwidth, this._p_minheight, this._p_maxheight, this);
			form._p_opener = this.opener;
			this._p_form = form;
			this._p_form._url = this._formurl;
			this._is_loading = false;
			this._p_form.on_notify_init();
			this._is_loaded = true;
			return form;
		}
	};
	_pChildFrame.showDesign = function (str_id, _parent_frame, arr_arg, opener, _parent_handle) {
		var ret, parent_frame, id, arg;
		if (!(str_id instanceof nexacro.Frame) && str_id != null) {
			parent_frame = _parent_frame;
			id = str_id;
			this.id = id;
			this._arg = arr_arg;
			if (opener) {
				this.opener = opener;
			}
		}
		else {
			parent_frame = str_id;
			id = this.id;
			this._arg = _parent_frame;
			if (arr_arg) {
				this.opener = arr_arg;
			}
		}
		var child_frame;
		if (parent_frame) {
			ret = parent_frame.addChild(id, this);
		}
		if (ret == -1) {
			child_frame = parent_frame[id];
			if (child_frame && child_frame._window && !child_frame._window._is_alive) {
				if (child_frame._window.setActive) {
					child_frame._window.setActive();
				}
				else {
					child_frame._window.focus();
				}
				return;
			}
		}
		else {
			child_frame = this;
		}
		nexacro._registerPopupFrame(id, this);
		child_frame._is_window = true;
		child_frame._window_type = 2;
		var left = child_frame._adjust_left;
		var top = child_frame._adjust_top;
		var width = child_frame._adjust_width;
		var height = child_frame._adjust_height;
		var option;
		if (this._p_form) {
			this.form._p_opener = this.opener;
		}
		var parent_window = new nexacro._Window(this._p_name, null, false);
		parent_window.handle = _parent_handle;
		if (!this._p_autosize) {
			this._window = new nexacro._Window(this._p_name, parent_window, false);
			this._window.attachFrame(this, false);
			this._window.create(parent_window, this.id, width, height, left, top, this._p_resizable, this._p_layered, this._p_showontaskbar);
			this.createComponent();
			this.on_created();
			if (this._is_created && this._control_element) {
				this._control_element._parent_elem = null;
				this._setInheritStyleValues(this);
			}
			var pThis = this;
			nexacro._observeSysEvent(this._window.handle, "resize", "onresize", function () {
				if (pThis._p_form) {
					pThis._p_form._on_designform_onsize();
				}
			});
		}
	};
	_pChildFrame.on_created = function (_window) {
		var ret = nexacro.Frame.prototype.on_created.call(this, _window);
		if (nexacro.isDesignMode) {
			var design_form = this._p_form;
			if (design_form && design_form instanceof nexacro.DesignForm) {
				design_form.set_background(design_form._outer_background_value);
			}
		}
		return ret;
	};
	_pChildFrame._getWaitComponentElement = function () {
		var waitComp = this._waitcomp;
		if (waitComp) {
			return waitComp.getElement();
		}
		return null;
	};
	delete _pChildFrame;
}
