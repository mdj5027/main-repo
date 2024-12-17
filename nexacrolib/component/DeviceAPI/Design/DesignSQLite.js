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

if (nexacro.LiteDBConnection) {
	var _pLiteDBConnection = nexacro.LiteDBConnection.prototype;
	_pLiteDBConnection = function (id, parent) {
		this.id = this._p_name = id;
		if (parent) {
			this._p_parent = parent;
		}
		this._p_sqlstatement = "";
		this._p_busytimeout = 60000;
		this._p_openflag = 1;
		this._p_datasource = "";
		this._p_preconnect = "false";
		this._p_async = "true";
		this._event_list = {
			"onsuccess" : 1, 
			"onerror" : 1
		};
		this.onsuccess = null;
		this.onerror = null;
		this._openflag = 1;
	};
	delete _pLiteDBConnection;
}
;
if (nexacro.LiteDBStatement) {
	var _pLiteDBStatement = nexacro.LiteDBStatement.prototype;
	_pLiteDBStatement = function (id, parent) {
		this.id = this._p_name = id;
		if (parent) {
			this._p_parent = parent;
		}
		this._p_query = "";
		this._p_ldbconnection = "";
		this._p_parameters = {
		};
		this.applyrowpos = -1;
		this._p_async = "true";
		this._event_list = {
			"onsuccess" : 1, 
			"onerror" : 1
		};
		this.onsuccess = null;
		this.onerror = null;
	};
	_pLiteDBStatement.set_ldbconnection = function (v) {
		if (typeof (v) == "string") {
			var at = "@";
			if (v.indexOf(at) == 0) {
				v = v.substring(at.length);
			}
			this._p_ldbconnection = v;
		}
	};
	delete _pLiteDBStatement;
}
;