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

if (nexacro.Component) {
	var _pComponent = nexacro.Component.prototype;
	_pComponent.on_create_popup_control_element = function (parent_elem) {
		var control_elem;
		var is_preview = this._is_window = this._isPreviewMode();
		if (is_preview) {
			control_elem = new nexacro.ControlElement(parent_elem);
		}
		else {
			this._is_popup_control = false;
			this._is_trackpopup = true;
			control_elem = new nexacro.ControlElement(this._p_parent._control_element);
		}
		control_elem.setLinkedControl(this);
		this._control_element = control_elem;
		return control_elem;
	};
	_pComponent.on_create_popupscrollable_control_element = function (parent_elem) {
		var control_elem;
		if (!this._isPreviewMode()) {
			this._is_popup = false;
			this._is_window = false;
			this._is_trackpopup = true;
			control_elem = new nexacro.PopupScrollableControlElement(this._p_parent._control_element);
		}
		else {
			control_elem = new nexacro.PopupScrollableControlElement(parent_elem);
		}
		control_elem.setLinkedControl(this);
		this._control_element = control_elem;
		return control_elem;
	};
	_pComponent._isPreviewMode = function () {
		var temp = this;
		while (temp) {
			if (temp instanceof nexacro.DesignForm) {
				return temp._is_preview_mode;
			}
			temp = temp._p_parent;
		}
		return false;
	};
	_pComponent._isSubEditorMode = function () {
		var temp = this;
		while (temp) {
			if (temp instanceof nexacro.DesignForm) {
				return temp._is_subeditor_mode;
			}
			temp = temp._p_parent;
		}
		return false;
	};
	_pComponent.set_initvalueid = function (initvalueid) {
		this._p_initvalueid = initvalueid;
	};
	_pComponent._getDesignForm = function () {
		var temp = this;
		while (temp != null) {
			if (temp instanceof nexacro.DesignForm) {
				return temp;
			}
			temp = temp._p_parent;
		}
		return null;
	};
	_pComponent._convToRate = function (val, parentsize) {
		return parentsize ? (val *  100 / parentsize) : 0;
	};
	_pComponent.set_fittocontents = function (v) {
		var fittocontents_enum = ["none", "width", "height", "both"];
		if (fittocontents_enum.indexOf(v) == -1) {
			return;
		}
		if (this._p_fittocontents != v) {
			this._p_fittocontents = v;
		}
	};
	_pComponent.on_apply_prop_rtl = function () {
	};
	_pComponent._setLeft = function (propVal) {
		if (propVal === "") {
			propVal = null;
		}
		if (this._p_left != propVal) {
			var step_logical_offset = nexacro.DesignForm.prototype._getCompStepLogicalOffset(this);
			if (propVal == null) {
				this._p_left = null;
				this._parseArrangeInfoProp("left", propVal);
				if (this._p_width == null) {
					this._setWidth(this._adjust_width);
				}
				else if (this._p_right == null) {
					var right = step_logical_offset + this._p_parent._adjust_width - (this._adjust_left + this._adjust_width);
					this._setRight(right);
				}
			}
			else {
				var parseInfo = this._parseArrangeVal(propVal);
				var oldInfo = this._arrange_info ? this._arrange_info['left'] : null;
				var distance;
				var calc_pos;
				var newCompid, oldCompid, newDistance, oldDistance;
				newCompid = parseInfo ? parseInfo.compid : null;
				oldCompid = oldInfo ? oldInfo.compid : null;
				newDistance = parseInfo ? parseInfo.distance : null;
				oldDistance = oldInfo ? oldInfo.distance : null;
				if (newCompid != oldCompid && newDistance == oldDistance) {
					var target = this._findComponentForArrange(newCompid);
					if (target) {
						calc_pos = target._adjust_left + target._adjust_width;
					}
					else {
						calc_pos = 0;
					}
					if (newCompid) {
						distance = this._left;
					}
					else {
						distance = this._adjust_left - calc_pos;
					}
					if (typeof propVal == "string" && propVal.indexOf("%") >= 0) {
						distance = this._convToRate(distance, target ? target._adjust_width : (this._p_parent ? this._p_parent._adjust_width : 0));
						distance = distance.toFixed(2) + "%";
					}
					if (newCompid) {
						propVal = newCompid;
						propVal += ":";
						propVal += distance;
					}
					else {
						propVal = distance;
					}
				}
				if (parseInfo == null) {
					if (this._isFluidContainer()) {
						propVal = parseFloat(propVal);
					}
					else {
						propVal = parseInt(propVal);
					}
					if (isNaN(propVal)) {
						propVal = 0;
					}
				}
				this._p_left = propVal;
				this._parseArrangeInfoProp("left", propVal);
				if (this._p_right != null && this._p_width != null) {
					this._setRight(null);
				}
			}
		}
	};
	_pComponent._setTop = function (propVal) {
		if (propVal === "") {
			propVal = null;
		}
		if (this._p_top != propVal) {
			if (propVal == null) {
				this._p_top = null;
				this._parseArrangeInfoProp("top", propVal);
				if (this._p_height == null) {
					this._setHeight(this._adjust_height);
				}
				else if (this._p_bottom == null) {
					var bottom = this._p_parent._adjust_height - (this._adjust_top + this._adjust_height);
					this._setBottom(bottom);
				}
			}
			else {
				var parseInfo = this._parseArrangeVal(propVal);
				var oldInfo = this._arrange_info ? this._arrange_info['top'] : null;
				var distance;
				var calc_pos;
				var newCompid, oldCompid, newDistance, oldDistance;
				newCompid = parseInfo ? parseInfo.compid : null;
				oldCompid = oldInfo ? oldInfo.compid : null;
				newDistance = parseInfo ? parseInfo.distance : null;
				oldDistance = oldInfo ? oldInfo.distance : null;
				if (newCompid != oldCompid && newDistance == oldDistance) {
					var target = this._findComponentForArrange(newCompid);
					if (target) {
						calc_pos = target._adjust_top + target._adjust_height;
					}
					else {
						calc_pos = 0;
					}
					if (newCompid) {
						distance = this._top;
					}
					else {
						distance = this._adjust_top - calc_pos;
					}
					if (typeof propVal == "string" && propVal.indexOf("%") >= 0) {
						distance = this._convToRate(distance, target ? target._adjust_height : (this._p_parent ? this._p_parent._adjust_height : 0));
						distance = distance.toFixed(2) + "%";
					}
					if (newCompid) {
						propVal = newCompid;
						propVal += ":";
						propVal += distance;
					}
					else {
						propVal = distance;
					}
				}
				if (parseInfo == null) {
					if (this._isFluidContainer()) {
						propVal = parseFloat(propVal);
					}
					else {
						propVal = parseInt(propVal);
					}
					if (isNaN(propVal)) {
						propVal = 0;
					}
				}
				this._p_top = propVal;
				this._parseArrangeInfoProp("top", propVal);
				if (this._p_bottom != null && this._p_height != null) {
					this._setBottom(null);
				}
			}
		}
	};
	_pComponent._setRight = function (propVal) {
		if (propVal === "") {
			propVal = null;
		}
		if (this._p_right != propVal) {
			var step_logical_offset = nexacro.DesignForm.prototype._getCompStepLogicalOffset(this);
			if (propVal == null) {
				this._p_right = null;
				this._parseArrangeInfoProp("right", propVal);
				if (this._p_width == null) {
					this._setWidth(this._adjust_width);
				}
				else if (this._p_left == null) {
					this._setLeft(this._adjust_left - step_logical_offset);
				}
			}
			else {
				var parseInfo = this._parseArrangeVal(propVal);
				var oldInfo = this._arrange_info ? this._arrange_info['right'] : null;
				var distance;
				var calc_pos;
				var newCompid, oldCompid, newDistance, oldDistance;
				newCompid = parseInfo ? parseInfo.compid : null;
				oldCompid = oldInfo ? oldInfo.compid : null;
				newDistance = parseInfo ? parseInfo.distance : null;
				oldDistance = oldInfo ? oldInfo.distance : null;
				if (newCompid != oldCompid && newDistance == oldDistance) {
					var target = this._findComponentForArrange(newCompid);
					if (target) {
						calc_pos = target._adjust_left;
					}
					else {
						calc_pos = (this._p_parent ? this._p_parent._adjust_width : 0);
					}
					if (newCompid) {
						distance = this._right;
					}
					else {
						distance = calc_pos - (this._adjust_left + this._adjust_width);
					}
					if (typeof propVal == "string" && propVal.indexOf("%") >= 0) {
						distance = this._convToRate(distance, target ? target._adjust_width : (this._p_parent ? this._p_parent._adjust_width : 0));
						distance = distance.toFixed(2) + "%";
					}
					if (newCompid) {
						propVal = newCompid;
						propVal += ":";
						propVal += distance;
					}
					else {
						propVal = distance;
					}
				}
				if (parseInfo == null) {
					if (this._isFluidContainer()) {
						propVal = parseFloat(propVal);
					}
					else {
						propVal = parseInt(propVal);
					}
					if (isNaN(propVal)) {
						propVal = 0;
					}
				}
				this._p_right = propVal;
				this._parseArrangeInfoProp("right", propVal);
				if (this._p_left != null && this._p_width != null) {
					this._setWidth(null);
				}
			}
		}
	};
	_pComponent._setBottom = function (propVal) {
		if (propVal === "") {
			propVal = null;
		}
		if (this._p_bottom != propVal) {
			if (propVal == null) {
				this._p_bottom = null;
				this._parseArrangeInfoProp("bottom", propVal);
				if (this._p_height == null) {
					this.set_height(this._adjust_height);
				}
				else if (this._p_top == null) {
					this._setTop(this._adjust_top);
				}
			}
			else {
				var parseInfo = this._parseArrangeVal(propVal);
				var oldInfo = this._arrange_info ? this._arrange_info['bottom'] : null;
				var distance;
				var calc_pos;
				var newCompid, oldCompid, newDistance, oldDistance;
				newCompid = parseInfo ? parseInfo.compid : null;
				oldCompid = oldInfo ? oldInfo.compid : null;
				newDistance = parseInfo ? parseInfo.distance : null;
				oldDistance = oldInfo ? oldInfo.distance : null;
				if (newCompid != oldCompid && newDistance == oldDistance) {
					var target = this._findComponentForArrange(newCompid);
					if (target) {
						calc_pos = target._adjust_top;
					}
					else {
						calc_pos = this._p_parent ? this._p_parent._adjust_height : 0;
					}
					if (newCompid) {
						distance = this._bottom;
					}
					else {
						distance = calc_pos - (this._adjust_top + this._adjust_height);
					}
					if (typeof propVal == "string" && propVal.indexOf("%") >= 0) {
						distance = this._convToRate(distance, target ? target._adjust_height : (this._p_parent ? this._p_parent._adjust_height : 0));
						distance = distance.toFixed(2) + "%";
					}
					if (newCompid) {
						propVal = newCompid;
						propVal += ":";
						propVal += distance;
					}
					else {
						propVal = distance;
					}
				}
				if (parseInfo == null) {
					if (this._isFluidContainer()) {
						propVal = parseFloat(propVal);
					}
					else {
						propVal = parseInt(propVal);
					}
					if (isNaN(propVal)) {
						propVal = 0;
					}
				}
				this._p_bottom = propVal;
				this._parseArrangeInfoProp("bottom", propVal);
				if (this._p_top != null && this._p_height != null) {
					this.set_height(null);
				}
			}
		}
	};
	_pComponent._setWidth = function (propVal) {
		if (propVal === "") {
			propVal = null;
		}
		if (this._p_width != propVal) {
			var step_logical_offset = nexacro.DesignForm.prototype._getCompStepLogicalOffset(this);
			if (propVal == null) {
				this._p_width = null;
				this._parseArrangeInfoProp("width", propVal);
				if (this._p_left == null) {
					var left = this.getOffsetRight() - this._adjust_width - step_logical_offset;
					this._setLeft(left);
				}
				else if (this._p_right == null) {
					var right = this._p_parent._adjust_width - (this._adjust_left + this._adjust_width - step_logical_offset);
					this._setRight(right);
				}
			}
			else {
				var parseInfo = this._parseArrangeVal(propVal);
				var oldInfo = this._arrange_info ? this._arrange_info['width'] : null;
				var distance;
				var newCompid, oldCompid;
				newCompid = parseInfo ? parseInfo.compid : null;
				oldCompid = oldInfo ? oldInfo.compid : null;
				if (newCompid != oldCompid) {
					var target = this._findComponentForArrange(newCompid);
					if (typeof propVal == "string" && propVal.indexOf("%") >= 0) {
						distance = this._convToRate(this._adjust_width, target ? target._adjust_width : (this._p_parent ? this._p_parent._adjust_width : 0));
						distance = distance.toFixed(2) + "%";
						if (newCompid) {
							propVal = newCompid;
							propVal += ":";
							propVal += distance;
						}
						else {
							propVal = distance;
						}
					}
				}
				if (parseInfo == null) {
					if (this._isFluidContainer()) {
						propVal = parseFloat(propVal);
					}
					else {
						propVal = parseInt(propVal);
					}
					if (isNaN(propVal)) {
						propVal = 0;
					}
				}
				this._p_width = propVal;
				this._parseArrangeInfoProp("width", propVal);
				if (this._p_left != null && this._p_right != null) {
					this._setRight(null);
				}
			}
		}
	};
	_pComponent._setHeight = function (propVal) {
		if (propVal === "") {
			propVal = null;
		}
		if (this._p_height != propVal) {
			if (propVal == null) {
				this._p_height = null;
				this._parseArrangeInfoProp("height", propVal);
				if (this._p_top == null) {
					var top = this.getOffsetBottom() - this._adjust_height;
					this._setTop(top);
				}
				else if (this._p_bottom == null) {
					var bottom = this._p_parent._adjust_height - (this._adjust_top + this._adjust_height);
					this._setBottom(bottom);
				}
			}
			else {
				var parseInfo = this._parseArrangeVal(propVal);
				var oldInfo = this._arrange_info ? this._arrange_info['height'] : null;
				var distance;
				var newCompid, oldCompid;
				newCompid = parseInfo ? parseInfo.compid : null;
				oldCompid = oldInfo ? oldInfo.compid : null;
				if (newCompid != oldCompid) {
					var target = this._findComponentForArrange(newCompid);
					if (typeof propVal == "string" && propVal.indexOf("%") >= 0) {
						distance = this._convToRate(this._adjust_height, target ? target._adjust_height : (this._p_parent ? this._p_parent._adjust_height : 0));
						distance = distance.toFixed(2) + "%";
						if (newCompid) {
							propVal = newCompid;
							propVal += ":";
							propVal += distance;
						}
						else {
							propVal = distance;
						}
					}
				}
				if (parseInfo == null) {
					if (this._isFluidContainer()) {
						propVal = parseFloat(propVal);
					}
					else {
						propVal = parseInt(propVal);
					}
					if (isNaN(propVal)) {
						propVal = 0;
					}
				}
				this._p_height = propVal;
				this._parseArrangeInfoProp("height", propVal);
				if (this._p_top != null && this._p_bottom != null) {
					this._setBottom(null);
				}
			}
		}
	};
	_pComponent._calcArrangePosition = function () {
		var info = this._arrange_info;
		var form = this._is_subcontrol ? this._p_parent : this._is_group ? this._group_panel : this._getForm();
		var comp, comp_width, comp_height, obj, parsePosition;
		var fittocontents = "none";
		var abs_font, distance;
		if (info && (obj = info.left)) {
			if (form && form._is_created_contents) {
				distance = obj.distance;
				comp = this._findComponentForArrange(obj.compid);
				if (!comp) {
					if (distance.indexOf("rem") > -1 || distance.indexOf("em") > -1) {
						comp = this;
						if (distance.indexOf("rem") > -1) {
							comp = this._getMainFrame();
						}
						abs_font = comp._getReferenceAbsoluteFont();
						comp_width = abs_font ? abs_font._size : 1;
					}
					else {
						comp = form;
						comp_width = comp._getClientWidth();
					}
				}
				else {
					comp_width = comp._adjust_width;
				}
				this._left = this._convToPixel(distance, comp_width);
			}
		}
		else {
			if (this._p_left != null) {
				this._left = isNaN(parsePosition = parseFloat(this._p_left)) ? this._left : parsePosition;
			}
			else {
				this._left = null;
			}
		}
		if (info && (obj = info.top)) {
			if (form && form._is_created_contents) {
				distance = obj.distance;
				comp = this._findComponentForArrange(obj.compid);
				if (!comp) {
					if (distance.indexOf("rem") > -1 || distance.indexOf("em") > -1) {
						comp = this;
						if (distance.indexOf("rem") > -1) {
							comp = this._getMainFrame();
						}
						abs_font = comp._getReferenceAbsoluteFont();
						comp_height = abs_font ? abs_font._size : 1;
					}
					else {
						comp = form;
						comp_height = comp._getClientHeight();
					}
				}
				else {
					comp_height = comp._adjust_height;
				}
				this._top = this._convToPixel(distance, comp_height);
			}
		}
		else {
			if (this._p_top != null) {
				this._top = isNaN(parsePosition = parseFloat(this._p_top)) ? this._top : parsePosition;
			}
			else {
				this._top = null;
			}
		}
		if (info && (obj = info.right)) {
			if (form && form._is_created_contents) {
				distance = obj.distance;
				comp = this._findComponentForArrange(obj.compid);
				if (!comp) {
					if (distance.indexOf("rem") > -1 || distance.indexOf("em") > -1) {
						comp = this;
						if (distance.indexOf("rem") > -1) {
							comp = this._getMainFrame();
						}
						abs_font = comp._getReferenceAbsoluteFont();
						comp_width = abs_font ? abs_font._size : 1;
					}
					else {
						comp = form;
						comp_width = comp._getClientWidth();
					}
				}
				else {
					comp_width = comp._adjust_width;
				}
				this._right = this._convToPixel(distance, comp_width);
			}
		}
		else {
			if (this._p_right != null) {
				this._right = isNaN(parsePosition = parseFloat(this._p_right)) ? this._right : parsePosition;
			}
			else {
				this._right = null;
			}
		}
		if (info && (obj = info.bottom)) {
			if (form && form._is_created_contents) {
				distance = obj.distance;
				comp = this._findComponentForArrange(obj.compid);
				if (!comp) {
					if (distance.indexOf("rem") > -1 || distance.indexOf("em") > -1) {
						comp = this;
						if (distance.indexOf("rem") > -1) {
							comp = this._getMainFrame();
						}
						abs_font = comp._getReferenceAbsoluteFont();
						comp_height = abs_font ? abs_font._size : 1;
					}
					else {
						comp = form;
						comp_height = comp._getClientHeight();
					}
				}
				else {
					comp_height = comp._adjust_height;
				}
				this._bottom = this._convToPixel(distance, comp_height);
			}
		}
		else {
			if (this._p_bottom != null) {
				this._bottom = isNaN(parsePosition = parseFloat(this._p_bottom)) ? this._bottom : parsePosition;
			}
			else {
				this._bottom = null;
			}
		}
		if (fittocontents == "width" || fittocontents == "both") {
		}
		else {
			if (info && (obj = info.width)) {
				if (form && form._is_created_contents) {
					distance = obj.distance;
					comp = this._findComponentForArrange(obj.compid);
					if (!comp) {
						if (distance.indexOf("rem") > -1 || distance.indexOf("em") > -1) {
							comp = this;
							if (distance.indexOf("rem") > -1) {
								comp = this._getMainFrame();
							}
							abs_font = comp._getReferenceAbsoluteFont();
							comp_width = abs_font ? abs_font._size : 1;
						}
						else {
							comp = form;
							comp_width = comp._getClientWidth();
						}
					}
					else {
						comp_width = comp._adjust_width;
					}
					this._width = this._convToPixel(distance, comp_width);
				}
			}
			else {
				if (this._p_width != null) {
					this._width = isNaN(parsePosition = parseFloat(this._p_width)) ? this._width : parsePosition;
				}
				else {
					this._width = null;
				}
			}
		}
		if (fittocontents == "height" || fittocontents == "both") {
		}
		else {
			if (info && (obj = info.height)) {
				if (form && form._is_created_contents) {
					distance = obj.distance;
					comp = this._findComponentForArrange(obj.compid);
					if (!comp) {
						if (distance.indexOf("rem") > -1 || distance.indexOf("em") > -1) {
							comp = this;
							if (distance.indexOf("rem") > -1) {
								comp = this._getMainFrame();
							}
							abs_font = comp._getReferenceAbsoluteFont();
							comp_height = abs_font ? abs_font._size : 1;
						}
						else {
							comp = form;
							comp_height = comp._getClientHeight();
						}
					}
					else {
						comp_height = comp._adjust_height;
					}
					this._height = this._convToPixel(distance, comp_height);
				}
			}
			else {
				if (this._p_height != null) {
					this._height = isNaN(parsePosition = parseFloat(this._p_height)) ? this._height : parsePosition;
				}
				else {
					this._height = null;
				}
			}
		}
	};
	_pComponent._rePositioning = function (left, top, width, height, right, bottom) {
		var parent = this._p_parent;
		if (this._is_group) {
			parent = this._group_panel;
		}
		var step_logical_offset = nexacro.DesignForm.prototype._getCompStepLogicalOffset(this);
		var leftVal, topVal, widthVal, heightVal, rightVal, bottomVal;
		var arrange_info = this._arrange_info;
		var target, distance, compid = null;
		var calc_pos, table_cell_rect;
		var unit, parent_size, refer_font;
		if (this._p_left != null || (this._p_left == null && this._p_right == null)) {
			compid = arrange_info ? (arrange_info["left"] ? arrange_info["left"].compid : null) : null;
			target = this._findComponentForArrange(compid);
			if (target) {
				calc_pos = target._adjust_left + target._adjust_width - step_logical_offset;
			}
			else {
				calc_pos = 0;
			}
			distance = left - calc_pos;
			if (typeof this._p_left == "string") {
				if (this._p_left.indexOf("%") >= 0) {
					parent_size = target ? target._adjust_width : (parent ? parent._adjust_width : 0);
					unit = "%";
				}
				else if (this._p_left.indexOf("em") >= 0) {
					if (this._p_left.indexOf("rem") >= 0) {
						refer_font = this._getMainFrame()._getReferenceAbsoluteFont();
						unit = "rem";
					}
					else {
						refer_font = this._getReferenceAbsoluteFont();
						unit = "em";
					}
					parent_size = refer_font ? refer_font._size : 1;
				}
				else {
					parent_size = 1;
					unit = "";
				}
				if (unit.length > 0) {
					distance = this._convToRelativeUnit(distance, parent_size, unit);
					distance = distance.toFixed(2) + unit;
				}
				else {
					distance = parseInt(distance);
				}
			}
			else {
				distance = parseInt(distance);
			}
			if (compid) {
				leftVal = compid;
				leftVal += ":";
				leftVal += distance;
			}
			else {
				leftVal = distance;
			}
		}
		else {
			leftVal = undefined;
		}
		if (this._p_top != null || (this._p_top == null && this._p_bottom == null)) {
			compid = arrange_info ? (arrange_info["top"] ? arrange_info["top"].compid : null) : null;
			target = this._findComponentForArrange(compid);
			if (target) {
				calc_pos = target._adjust_top + target._adjust_height;
			}
			else {
				calc_pos = 0;
			}
			distance = top - calc_pos;
			if (typeof this._p_top == "string") {
				if (this._p_top.indexOf("%") >= 0) {
					parent_size = target ? target._adjust_height : (parent ? parent._adjust_height : 0);
					unit = "%";
				}
				else if (this._p_top.indexOf("em") >= 0) {
					if (this._p_top.indexOf("rem") >= 0) {
						refer_font = this._getMainFrame()._getReferenceAbsoluteFont();
						unit = "rem";
					}
					else {
						refer_font = this._getReferenceAbsoluteFont();
						unit = "em";
					}
					parent_size = refer_font ? refer_font._size : 1;
				}
				else {
					parent_size = 1;
					unit = "";
				}
				if (unit.length > 0) {
					distance = this._convToRelativeUnit(distance, parent_size, unit);
					distance = distance.toFixed(2) + unit;
				}
				else {
					distance = parseInt(distance);
				}
			}
			else {
				distance = parseInt(distance);
			}
			if (compid) {
				topVal = compid;
				topVal += ":";
				topVal += distance;
			}
			else {
				topVal = distance;
			}
		}
		else {
			topVal = undefined;
		}
		if (this._p_width != null) {
			compid = arrange_info ? (arrange_info["width"] ? arrange_info["width"].compid : null) : null;
			target = this._findComponentForArrange(compid);
			if (typeof this._p_width == "string") {
				if (this._p_width.indexOf("%") >= 0) {
					table_cell_rect = nexacro.DesignForm.prototype._getTableCellRect(this, parent);
					var parent_width = (parent ? parent._adjust_width : 0);
					parent_width = (table_cell_rect ? table_cell_rect[2] - table_cell_rect[0] : parent_width);
					parent_size = target ? target._adjust_width : parent_width;
					unit = "%";
				}
				else if (this._p_width.indexOf("em") >= 0) {
					if (this._p_width.indexOf("rem") >= 0) {
						refer_font = this._getMainFrame()._getReferenceAbsoluteFont();
						unit = "rem";
					}
					else {
						refer_font = this._getReferenceAbsoluteFont();
						unit = "em";
					}
					parent_size = refer_font ? refer_font._size : 1;
				}
				else {
					parent_size = 1;
					unit = "";
				}
				if (unit.length > 0) {
					distance = this._convToRelativeUnit(width, parent_size, unit);
					distance = distance.toFixed(2) + unit;
				}
				else {
					distance = width;
				}
			}
			else {
				distance = width;
			}
			if (compid) {
				widthVal = compid;
				widthVal += ":";
				widthVal += distance;
			}
			else {
				widthVal = distance;
			}
		}
		else {
			widthVal = undefined;
		}
		if (this._p_height != null) {
			compid = arrange_info ? (arrange_info["height"] ? arrange_info["height"].compid : null) : null;
			target = this._findComponentForArrange(compid);
			if (typeof this._p_height == "string") {
				if (this._p_height.indexOf("%") >= 0) {
					table_cell_rect = nexacro.DesignForm.prototype._getTableCellRect(this, parent);
					var parent_height = (parent ? parent._adjust_height : 0);
					parent_height = (table_cell_rect ? table_cell_rect[3] - table_cell_rect[1] : parent_height);
					parent_size = target ? target._adjust_height : parent_height;
					unit = "%";
				}
				else if (this._p_height.indexOf("em") >= 0) {
					if (this._p_height.indexOf("rem") >= 0) {
						refer_font = this._getMainFrame()._getReferenceAbsoluteFont();
						unit = "rem";
					}
					else {
						refer_font = this._getReferenceAbsoluteFont();
						unit = "em";
					}
					parent_size = refer_font ? refer_font._size : 1;
				}
				else {
					parent_size = 1;
					unit = "";
				}
				if (unit.length > 0) {
					distance = this._convToRelativeUnit(height, parent_size, unit);
					distance = distance.toFixed(2) + unit;
				}
				else {
					distance = height;
				}
			}
			else {
				distance = height;
			}
			if (compid) {
				heightVal = compid;
				heightVal += ":";
				heightVal += distance;
			}
			else {
				heightVal = distance;
			}
		}
		else {
			heightVal = undefined;
		}
		if (this._p_right != null) {
			compid = arrange_info ? (arrange_info["right"] ? arrange_info["right"].compid : null) : null;
			target = this._findComponentForArrange(compid);
			if (target) {
				calc_pos = target._adjust_left - step_logical_offset;
			}
			else {
				calc_pos = parent ? parent._adjust_width : 0;
			}
			distance = calc_pos - (left + width);
			if (typeof this._p_right == "string") {
				if (this._p_right.indexOf("%") >= 0) {
					parent_size = target ? target._adjust_width : (parent ? parent._adjust_width : 0);
					unit = "%";
				}
				else if (this._p_right.indexOf("em") >= 0) {
					if (this._p_right.indexOf("rem") >= 0) {
						refer_font = this._getMainFrame()._getReferenceAbsoluteFont();
						unit = "rem";
					}
					else {
						refer_font = this._getReferenceAbsoluteFont();
						unit = "em";
					}
					parent_size = refer_font ? refer_font._size : 1;
				}
				else {
					parent_size = 1;
					unit = "";
				}
				if (unit.length > 0) {
					distance = this._convToRelativeUnit(distance, parent_size, unit);
					distance = distance.toFixed(2) + unit;
				}
				else {
					distance = parseInt(distance);
				}
			}
			else {
				distance = parseInt(distance);
			}
			if (compid) {
				rightVal = compid;
				rightVal += ":";
				rightVal += distance;
			}
			else {
				rightVal = distance;
			}
		}
		else {
			rightVal = undefined;
		}
		if (this._p_bottom != null) {
			compid = arrange_info ? (arrange_info["bottom"] ? arrange_info["bottom"].compid : null) : null;
			target = this._findComponentForArrange(compid);
			if (target) {
				calc_pos = target._adjust_top;
			}
			else {
				calc_pos = parent ? parent._adjust_height : 0;
			}
			distance = calc_pos - (top + height);
			if (typeof this._p_bottom == "string") {
				if (this._p_bottom.indexOf("%") >= 0) {
					parent_size = target ? target._adjust_height : (parent ? parent._adjust_height : 0);
					unit = "%";
				}
				else if (this._p_bottom.indexOf("em") >= 0) {
					if (this._p_bottom.indexOf("rem") >= 0) {
						refer_font = this._getMainFrame()._getReferenceAbsoluteFont();
						unit = "rem";
					}
					else {
						refer_font = this._getReferenceAbsoluteFont();
						unit = "em";
					}
					parent_size = refer_font ? refer_font._size : 1;
				}
				else {
					parent_size = 1;
					unit = "";
				}
				if (unit.length > 0) {
					distance = this._convToRelativeUnit(distance, parent_size, unit);
					distance = distance.toFixed(2) + unit;
				}
				else {
					distance = parseInt(distance);
				}
			}
			else {
				distance = parseInt(distance);
			}
			if (compid) {
				bottomVal = compid;
				bottomVal += ":";
				bottomVal += distance;
			}
			else {
				bottomVal = distance;
			}
		}
		else {
			bottomVal = undefined;
		}
		this.move(leftVal, topVal, widthVal, heightVal, rightVal, bottomVal);
	};
	_pComponent._adjustPosition = function () {
		var step_logical_offset = nexacro.DesignForm.prototype._getCompStepLogicalOffset(this);
		var parent = this._is_group ? this._group_panel : this._p_parent ? this._p_parent : this._getForm();
		var info = this._arrange_info;
		var target;
		var left = this._left;
		var top = this._top;
		var right = this._right;
		var bottom = this._bottom;
		var width = this._width;
		var height = this._height;
		var calc_pos;
		var calc_left = 0, calc_top = 0, calc_right = 0, calc_bottom = 0, calc_width = 0, calc_height = 0;
		var p_width = parent ? parent._adjust_width : 0;
		var p_height = parent ? parent._adjust_height : 0;
		if (left != null) {
			if (info && (target = this._getArrangeComp("left"))) {
				calc_pos = target._adjust_left + target._adjust_width;
			}
			else {
				calc_pos = step_logical_offset;
			}
			calc_left = calc_pos + left;
			if (right != null) {
				if (info && (target = this._getArrangeComp("right"))) {
					calc_pos = target._adjust_left;
				}
				else {
					calc_pos = p_width + step_logical_offset;
				}
				calc_right = calc_pos - right;
			}
			else {
				calc_right = calc_left + width;
			}
		}
		else {
			if (info && (target = this._getArrangeComp("right"))) {
				calc_pos = target._adjust_left;
			}
			else {
				calc_pos = p_width + step_logical_offset;
			}
			calc_right = calc_pos - right;
			calc_left = calc_right - width;
		}
		if (top != null) {
			if (info && (target = this._getArrangeComp("top"))) {
				calc_pos = target._adjust_top + target._adjust_height;
			}
			else {
				calc_pos = 0;
			}
			calc_top = calc_pos + top;
			if (bottom != null) {
				if (info && (target = this._getArrangeComp("bottom"))) {
					calc_pos = target._adjust_top;
				}
				else {
					calc_pos = p_height;
				}
				calc_bottom = calc_pos - bottom;
			}
			else {
				calc_bottom = calc_top + height;
			}
		}
		else {
			if (info && (target = this._getArrangeComp("bottom"))) {
				calc_pos = target._adjust_top;
			}
			else {
				calc_pos = p_height;
			}
			calc_bottom = calc_pos - bottom;
			calc_top = calc_bottom - height;
		}
		calc_width = calc_right - calc_left;
		if (calc_width < 0) {
			calc_width = 0;
		}
		calc_height = calc_bottom - calc_top;
		if (calc_height < 0) {
			calc_height = 0;
		}
		this._setAdjustProps(calc_left, calc_top, calc_width, calc_height);
	};
	_pComponent._recalcSubLayoutPosition = function () {
		var parent = this._is_group ? this._group_panel._p_parent : this._is_form ? this._p_parent : this._getForm();
		var design_form = this._design_form;
		var p_width = parent ? parent._adjust_width : 0;
		var scroll_l = design_form._scroll_left;
		var scroll_t = design_form._scroll_top;
		var sublayoutmode_info = this._sublayoutmode_info;
		var prev_stepcontainer_sum = sublayoutmode_info.positionstep *  p_width;
		var sublayout_l = sublayoutmode_info.offset_pos[0];
		var sublayout_t = sublayoutmode_info.offset_pos[1];
		var offset_left = this._adjust_left + sublayout_l - scroll_l + prev_stepcontainer_sum;
		var offset_top = this._adjust_top + sublayout_t - scroll_t;
		this._adjust_sublayout_left = this._adjust_left;
		this._adjust_sublayout_top = this._adjust_top;
		this._setAdjustPosition(offset_left, offset_top);
		this._adjust_left_ltr = this._adjust_left;
	};
	_pComponent.createCssDesignContents = nexacro._emptyFn;
	_pComponent.destroyCssDesignContents = nexacro._emptyFn;
	_pComponent.beginTransitionEffect = nexacro._emptyFn;
	_pComponent.applyTransitionEffect = nexacro._emptyFn;
	_pComponent.cancelTransitionEffect = nexacro._emptyFn;
	_pComponent.on_getChildObjectforCSSPreivew = function (idcssselector) {
		return null;
	};
	_pComponent.showCssDesignContents = function (objpath, status, statusvalue, userstatus, userstatusvalue) {
		var updateobj = null;
		if (!objpath || objpath == "") {
			updateobj = this;
		}
		else {
			var objpaths = objpath.split(".");
			var objcnt = objpaths.length;
			var parent = this;
			for (var i = 0; i < objcnt; i++) {
				var idcssslector = objpaths[i];
				updateobj = parent[idcssslector];
				if (!updateobj) {
					updateobj = parent.on_getChildObjectforCSSPreivew(idcssslector);
				}
				if (updateobj) {
					parent = updateobj;
					if (updateobj instanceof Object == false) {
						return;
					}
				}
			}
		}
		if (updateobj instanceof nexacro.GridBandInfo) {
			updateobj = updateobj._bandctrl;
		}
		if (updateobj) {
			if (status) {
				updateobj._changeStatus(status, statusvalue);
			}
			if (userstatus) {
				updateobj._changeUserStatus(userstatus, userstatusvalue);
			}
		}
	};
	_pComponent.updatePreviewPosition = function () {
		var form = this._p_parent;
		var offset_left = (form._adjust_width / 2) - (this._adjust_width / 2);
		var offset_top = (form._adjust_height / 2) - (this._adjust_height / 2);
		this.move(offset_left, offset_top);
	};
	_pComponent.updatePreviewStyle = function () {
		this._makeCSSMapInfo();
		this._apply_status_toelement("", this._status, "", this._userstatus);
	};
	_pComponent._initDesignDefaultProperty = function () {
		if (this["set_text"]) {
			this.set_text(this._p_name);
		}
	};
	_pComponent._refresh = function () {
		this._makeCSSMapInfo();
		var enabledselector = this._cssselector.enabled;
		var control_elem = this.getElement();
		if (enabledselector) {
			control_elem.setElementCSSMapInfo(enabledselector.border, enabledselector.padding, enabledselector.edge);
		}
		control_elem.setElementSize(this._adjust_width, this._adjust_height);
	};
	_pComponent._getBorderWidth = function () {
		var str;
		var control_elem = this.getElement();
		if (control_elem) {
			str = control_elem._getComputedStyleValue("border");
		}
		var objBorder = nexacro.BorderObject(str);
		if ((typeof objBorder) == "object") {
			if (objBorder.left && objBorder.top && objBorder.right && objBorder.bottom) {
				return [objBorder.left._width, objBorder.top._width, objBorder.right._width, objBorder.bottom._width];
			}
		}
		return [0, 0, 0, 0];
	};
	_pComponent._apply_status_toelement = function (oldstatus, status, olduserstatus, userstatus, apply, status_param, value_param) {
		var control_elem = this._control_element;
		if (control_elem) {
			var multistatus = "";
			if (status != "enabled" && status && userstatus) {
				multistatus = status + "_" + userstatus;
			}
			var settingstatus = false;
			var settinguserstatus = false;
			var border = null;
			var padding = null;
			var edge = null;
			var cssselector;
			if (multistatus) {
				cssselector = this._cssselector[multistatus];
				if (cssselector) {
					settingstatus = true;
					settinguserstatus = true;
					border = cssselector.border;
					padding = cssselector.padding;
					edge = cssselector.edge;
				}
			}
			var disabled_status = false;
			if (status === "disabled") {
				disabled_status = true;
				cssselector = this._cssselector[status];
				if (cssselector) {
					settingstatus = true;
					if (!border) {
						border = cssselector.border;
					}
					if (!padding) {
						padding = cssselector.padding;
					}
					if (!edge) {
						edge = cssselector.edge;
					}
				}
			}
			if (userstatus) {
				cssselector = this._cssselector[userstatus];
				if (cssselector) {
					settinguserstatus = true;
					if (!border) {
						border = cssselector.border;
					}
					if (!padding) {
						padding = cssselector.padding;
					}
					if (!edge) {
						edge = cssselector.edge;
					}
				}
			}
			if (!disabled_status && status != "enabled") {
				cssselector = this._cssselector[status];
				if (cssselector) {
					settingstatus = true;
					if (!border) {
						border = cssselector.border;
					}
					if (!padding) {
						padding = cssselector.padding;
					}
					if (!edge) {
						edge = cssselector.edge;
					}
				}
			}
			var enableselector = this._cssselector.enabled;
			if (!border) {
				border = enableselector.border;
			}
			if (!padding) {
				padding = enableselector.padding;
			}
			if (!edge) {
				edge = enableselector.edge;
			}
			if (edge && this._isRtl() && enableselector.rtlEdgeImage) {
				edge = enableselector.rtlEdgeImage;
			}
			control_elem.setElementCSSMapInfo(border, padding, edge);
			var applycssstatus = status;
			var applycssuserstatus = userstatus;
			if (nexacro._include_status_map) {
				applycssstatus = (settingstatus ? status : "");
				applycssuserstatus = (settinguserstatus ? userstatus : "");
			}
			this._on_apply_status(oldstatus, status, olduserstatus, userstatus, apply, status_param, value_param, applycssstatus, applycssuserstatus);
		}
	};
	_pComponent._isFluidContainer = function (binner) {
		if (this._is_subcontrol) {
			return false;
		}
		if (this._is_group) {
			if (this._group_panel.type == "default") {
				return false;
			}
			else {
				return true;
			}
		}
		var ret = false;
		var manager = nexacro._getLayoutManager();
		if (manager && manager.acceptFluidLayoutManager()) {
			var layout = null;
			if (binner) {
				layout = manager.getCurrentLayout(this._p_parent._getForm());
			}
			else {
				layout = manager.getCurrentLayout(this._getForm());
			}
			if (layout) {
				var container_type = manager._fluidlayoutmanager.getLayoutContainerType(layout);
				switch (container_type) {
					case 1:
					case 2:
					case 3:
						ret = true;
						break;
					case 0:
					default:
						break;
				}
			}
		}
		return ret;
	};
	_pComponent._isFluidContainerCalculation = function () {
		var ret = false;
		var manager = nexacro._getLayoutManager();
		if (manager && manager.acceptFluidLayoutManager()) {
			manager = manager._fluidlayoutmanager;
			if (manager.getLayoutArrangeType() == 1) {
				ret = true;
			}
		}
		return ret;
	};
	_pComponent._setTablecellareacoordinate = function (v) {
		if (this._tablecellareacoordinate !== v) {
			this._tablecellareacoordinate = v;
		}
	};
	_pComponent._restorePosition = function () {
		this._parseArrangeInfo(this._p_left, this._p_top, this._p_right, this._p_bottom, this._p_width, this._p_height);
		this._update_position(this._isRtl());
		if (this._isFluidContainer()) {
			var control_elem = this.getElement();
			if (control_elem) {
				var layoutbasis = this._getLayoutBasis();
				if (layoutbasis) {
					control_elem._setElementLayoutBasis(layoutbasis);
				}
			}
		}
	};
	_pComponent._setFluidcontents = function (arrContents) {
		var list = this._layoutchild_list = [];
		for (var i = 0, len = arrContents.length; i < len; i++) {
			var item = arrContents[i];
			if (item._target) {
				list.push(item._target);
			}
		}
	};
	_pComponent._getHeadingOrderNext = nexacro._emptyFn;
	_pComponent._getHeadingOrderFirst = nexacro._emptyFn;
	_pComponent._getHeadingOrderLast = nexacro._emptyFn;
	_pComponent._searchNextHeadingFocus = nexacro._emptyFn;
	_pComponent._searchPrevHeadingFocus = nexacro._emptyFn;
	_pComponent._setAccessibilityInfoByHover = nexacro._emptyFn;
	_pComponent._setAccessibilityNotifyEvent = nexacro._emptyFn;
	_pComponent._on_getAccessibilityAdditionalLabel = function () {
		return "";
	};
	_pComponent._on_getAccessibilityAdditionalRole = function () {
		return "";
	};
	_pComponent.on_get_accessibility_label = function () {
		return "";
	};
	_pComponent.on_get_accessibility_description = function () {
		return "";
	};
	_pComponent.on_get_accessibility_action = function () {
		return "";
	};
	_pComponent._getAccessibilityRole = nexacro._emptyFn;
	_pComponent._getAccessibilityLabel = nexacro._emptyFn;
	_pComponent._getAccessibilityDescLevel = nexacro._emptyFn;
	_pComponent._getAccessibilityDescription = nexacro._emptyFn;
	_pComponent._getAccessibilityAction = nexacro._emptyFn;
	_pComponent._getAccessibilityReadLabel = nexacro._emptyFn;
	_pComponent._getLinkedLabel = nexacro._emptyFn;
	_pComponent._getLinkedDescription = nexacro._emptyFn;
	_pComponent._getDescLevel = nexacro._emptyFn;
	_pComponent._getLinkedAction = nexacro._emptyFn;
	_pComponent._getAccessibilityParentValue = nexacro._emptyFn;
	_pComponent._getNextAccessibilityOrderIndex = nexacro._emptyFn;
	_pComponent._setAccessibilityRole = nexacro._emptyFn;
	_pComponent._setAccessibilityLabel = nexacro._emptyFn;
	_pComponent._setAccessibilityEnable = nexacro._emptyFn;
	_pComponent._setAccessibilityDescription = nexacro._emptyFn;
	_pComponent._setAccessibilityAction = nexacro._emptyFn;
	_pComponent._setAccessibilityDescLevel = nexacro._emptyFn;
	_pComponent._setAccessibilityStatDisabled = nexacro._emptyFn;
	_pComponent._setAccessibilityStatHidden = nexacro._emptyFn;
	_pComponent._setAccessibilityStatChecked = nexacro._emptyFn;
	_pComponent._setAccessibilityStatPressed = nexacro._emptyFn;
	_pComponent._setAccessibilityStatSelected = nexacro._emptyFn;
	_pComponent._setAccessibilityStatExpanded = nexacro._emptyFn;
	_pComponent._setAccessibilityStatAutoComplete = nexacro._emptyFn;
	_pComponent._setAccessibilityFlagHasPopup = nexacro._emptyFn;
	_pComponent._setAccessibilityFlagFocusable = nexacro._emptyFn;
	_pComponent._setAccessibilityFlagReadOnly = nexacro._emptyFn;
	_pComponent._setAccessibilityFlagPassword = nexacro._emptyFn;
	_pComponent._setAccessibilityFlagMultiSelectable = nexacro._emptyFn;
	_pComponent._setAccessibilityFlagSelectable = nexacro._emptyFn;
	_pComponent._setAccessibilityFlagDefaultButton = nexacro._emptyFn;
	_pComponent._setAccessibilityFlagMultiLine = nexacro._emptyFn;
	_pComponent._setAccessibilityInfoCount = nexacro._emptyFn;
	_pComponent._setAccessibilityInfoIndex = nexacro._emptyFn;
	_pComponent._setAccessibilityInfoValueMax = nexacro._emptyFn;
	_pComponent._setAccessibilityInfoValueMin = nexacro._emptyFn;
	_pComponent._setAccessibilityInfoValueCur = nexacro._emptyFn;
	_pComponent._setAccessibilityInfoLevel = nexacro._emptyFn;
	_pComponent._setAccessibilityHotKey = nexacro._emptyFn;
	_pComponent._setAccessibilityActiveDescendant = nexacro._emptyFn;
	_pComponent._setAccessibilityStatFlag = nexacro._emptyFn;
	_pComponent._setAccessibilityValue = nexacro._emptyFn;
	_pComponent._setAccessibilityStatFocus = nexacro._emptyFn;
	_pComponent._setAccessibilityStatKillFocus = nexacro._emptyFn;
	_pComponent._setAccessibilityStatLive = nexacro._emptyFn;
	_pComponent._updateAccessibilityLabel = nexacro._emptyFn;
	_pComponent._notifyAccessibility = nexacro._emptyFn;
	_pComponent._isAccessibilityEnable = function () {
		return false;
	};
	_pComponent._isItemAccessibilityEnable = function () {
		return false;
	};
	_pComponent._isAccessibilityRoleHeading = nexacro._emptyFn;
	_pComponent._isComponentKeydownAction = function () {
		return true;
	};
	_pComponent._isComponentBlockProcess = function () {
		return false;
	};
	_pComponent._isFireAccessibilityKeydown = function () {
		return false;
	};
	_pComponent._accessibility_focusin = nexacro._emptyFn;
	_pComponent._accessibility_focusout = nexacro._emptyFn;
	_pComponent._accessibility_keydown = nexacro._emptyFn;
	_pComponent._on_create_accessibility_contents = nexacro._emptyFn;
	_pComponent._on_created_accessibility_contents = nexacro._emptyFn;
	_pComponent._on_attach_accessibility_contents_handle = nexacro._emptyFn;
	delete _pComponent;
}
if (nexacro.PopupControl) {
	var _pPopupControl = nexacro.PopupControl.prototype;
	_pPopupControl._popupBy = function (from_comp, left, top, width, height) {
		if (!this._attached_comp || !from_comp) {
			return;
		}
		var p = {
		};
		if (from_comp._isPreviewMode()) {
			if (from_comp instanceof nexacro._MenuItemControl) {
				p = {
					x : from_comp._p_parent._adjust_left, 
					y : from_comp._p_parent._adjust_top
				};
			}
			else {
				p = {
					x : from_comp._adjust_left, 
					y : from_comp._adjust_top
				};
			}
		}
		else {
			p = nexacro._getElementPositionInFrame(from_comp.getElement());
		}
		var win_left = p.x + left;
		var win_top = p.y + top;
		var _window = this._getWindow();
		if (_window && this._track_capture) {
			_window._setCaptureLock(this._attached_comp, true, false);
		}
		var control_elem = this._control_element;
		if (control_elem) {
			control_elem.setElementPosition(win_left, win_top);
			control_elem.setElementSize(width, height);
		}
		this.set_visible(true);
	};
	delete _pPopupControl;
}
