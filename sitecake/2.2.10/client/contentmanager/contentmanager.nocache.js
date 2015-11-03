function contentmanager(){
  var $intern_0 = '', $intern_34 = '" for "gwt:onLoadErrorFn"', $intern_32 = '" for "gwt:onPropertyErrorFn"', $intern_15 = '"><\/script>', $intern_17 = '#', $intern_62 = '.cache.html', $intern_19 = '/', $intern_64 = '//platform.twitter.com/widgets.js', $intern_55 = '05E9B37ED204710E41551EC5ED01F0CE', $intern_57 = '19EB080DC87655CD9DEAF09246551664', $intern_59 = '67ED081499C74448DA10909BA41DA7C8', $intern_61 = ':', $intern_58 = ':1', $intern_26 = '::', $intern_66 = '<script defer="defer">contentmanager.onInjectionDone(\'contentmanager\')<\/script>', $intern_14 = '<script id="', $intern_65 = '<script language="javascript" src="//platform.twitter.com/widgets.js"><\/script>', $intern_29 = '=', $intern_18 = '?', $intern_31 = 'Bad handler "', $intern_60 = 'CFA4B446D9465EAEEE34DDCE999CF180', $intern_63 = 'DOMContentLoaded', $intern_16 = 'SCRIPT', $intern_13 = '__gwt_marker_contentmanager', $intern_20 = 'base', $intern_10 = 'baseUrl', $intern_4 = 'begin', $intern_3 = 'bootstrap', $intern_50 = 'chrome', $intern_22 = 'clear.cache.gif', $intern_28 = 'content', $intern_1 = 'contentmanager', $intern_12 = 'contentmanager.nocache.js', $intern_25 = 'contentmanager::', $intern_9 = 'end', $intern_56 = 'false', $intern_46 = 'gecko', $intern_47 = 'gecko1_8', $intern_5 = 'gwt.codesvr=', $intern_6 = 'gwt.hosted=', $intern_7 = 'gwt.hybrid', $intern_33 = 'gwt:onLoadErrorFn', $intern_30 = 'gwt:onPropertyErrorFn', $intern_27 = 'gwt:property', $intern_53 = 'hosted.html?contentmanager', $intern_45 = 'ie6', $intern_44 = 'ie8', $intern_35 = 'iframe', $intern_21 = 'img', $intern_36 = "javascript:''", $intern_52 = 'loadExternalRefs', $intern_23 = 'meta', $intern_38 = 'moduleRequested', $intern_8 = 'moduleStartup', $intern_43 = 'msie', $intern_24 = 'name', $intern_40 = 'opera', $intern_37 = 'position:absolute;width:0;height:0;border:none', $intern_42 = 'safari', $intern_11 = 'script', $intern_54 = 'selectingPermutation', $intern_2 = 'startup', $intern_51 = 'true', $intern_48 = 'unknown', $intern_39 = 'user.agent', $intern_49 = 'user.agent.chrome', $intern_41 = 'webkit';
  var $wnd = window, $doc = document, $stats = $wnd.__gwtStatsEvent?function(a){
    return $wnd.__gwtStatsEvent(a);
  }
  :null, $sessionId = $wnd.__gwtStatsSessionId?$wnd.__gwtStatsSessionId:null, scriptsDone, loadDone, bodyDone, base = $intern_0, metaProps = {}, values = [], providers = [], answers = [], softPermutationId = 0, onLoadErrorFunc, propertyErrorFunc;
  $stats && $stats({moduleName:$intern_1, sessionId:$sessionId, subSystem:$intern_2, evtGroup:$intern_3, millis:(new Date).getTime(), type:$intern_4});
  if (!$wnd.__gwt_stylesLoaded) {
    $wnd.__gwt_stylesLoaded = {};
  }
  if (!$wnd.__gwt_scriptsLoaded) {
    $wnd.__gwt_scriptsLoaded = {};
  }
  function isHostedMode(){
    var result = false;
    try {
      var query = $wnd.location.search;
      return (query.indexOf($intern_5) != -1 || (query.indexOf($intern_6) != -1 || $wnd.external && $wnd.external.gwtOnLoad)) && query.indexOf($intern_7) == -1;
    }
     catch (e) {
    }
    isHostedMode = function(){
      return result;
    }
    ;
    return result;
  }

  function maybeStartModule(){
    if (scriptsDone && loadDone) {
      var iframe = $doc.getElementById($intern_1);
      var frameWnd = iframe.contentWindow;
      if (isHostedMode()) {
        frameWnd.__gwt_getProperty = function(name){
          return computePropValue(name);
        }
        ;
      }
      contentmanager = null;
      frameWnd.gwtOnLoad(onLoadErrorFunc, $intern_1, base, softPermutationId);
      $stats && $stats({moduleName:$intern_1, sessionId:$sessionId, subSystem:$intern_2, evtGroup:$intern_8, millis:(new Date).getTime(), type:$intern_9});
    }
  }

  function computeScriptBase(){
    if (metaProps[$intern_10]) {
      base = metaProps[$intern_10];
      return base;
    }
    var thisScript;
    var scriptTags = $doc.getElementsByTagName($intern_11);
    for (var i = 0; i < scriptTags.length; ++i) {
      if (scriptTags[i].src.indexOf($intern_12) != -1) {
        thisScript = scriptTags[i];
      }
    }
    if (!thisScript) {
      var markerId = $intern_13;
      var markerScript;
      $doc.write($intern_14 + markerId + $intern_15);
      markerScript = $doc.getElementById(markerId);
      thisScript = markerScript && markerScript.previousSibling;
      while (thisScript && thisScript.tagName != $intern_16) {
        thisScript = thisScript.previousSibling;
      }
    }
    function getDirectoryOfFile(path){
      var hashIndex = path.lastIndexOf($intern_17);
      if (hashIndex == -1) {
        hashIndex = path.length;
      }
      var queryIndex = path.indexOf($intern_18);
      if (queryIndex == -1) {
        queryIndex = path.length;
      }
      var slashIndex = path.lastIndexOf($intern_19, Math.min(queryIndex, hashIndex));
      return slashIndex >= 0?path.substring(0, slashIndex + 1):$intern_0;
    }

    ;
    if (thisScript && thisScript.src) {
      base = getDirectoryOfFile(thisScript.src);
    }
    if (base == $intern_0) {
      var baseElements = $doc.getElementsByTagName($intern_20);
      if (baseElements.length > 0) {
        base = baseElements[baseElements.length - 1].href;
      }
       else {
        base = getDirectoryOfFile($doc.location.href);
      }
    }
     else if (base.match(/^\w+:\/\//)) {
    }
     else {
      var img = $doc.createElement($intern_21);
      img.src = base + $intern_22;
      base = getDirectoryOfFile(img.src);
    }
    if (markerScript) {
      markerScript.parentNode.removeChild(markerScript);
    }
    return base;
  }

  function processMetas(){
    var metas = document.getElementsByTagName($intern_23);
    for (var i = 0, n = metas.length; i < n; ++i) {
      var meta = metas[i], name = meta.getAttribute($intern_24), content;
      if (name) {
        name = name.replace($intern_25, $intern_0);
        if (name.indexOf($intern_26) >= 0) {
          continue;
        }
        if (name == $intern_27) {
          content = meta.getAttribute($intern_28);
          if (content) {
            var value, eq = content.indexOf($intern_29);
            if (eq >= 0) {
              name = content.substring(0, eq);
              value = content.substring(eq + 1);
            }
             else {
              name = content;
              value = $intern_0;
            }
            metaProps[name] = value;
          }
        }
         else if (name == $intern_30) {
          content = meta.getAttribute($intern_28);
          if (content) {
            try {
              propertyErrorFunc = eval(content);
            }
             catch (e) {
              alert($intern_31 + content + $intern_32);
            }
          }
        }
         else if (name == $intern_33) {
          content = meta.getAttribute($intern_28);
          if (content) {
            try {
              onLoadErrorFunc = eval(content);
            }
             catch (e) {
              alert($intern_31 + content + $intern_34);
            }
          }
        }
      }
    }
  }

  function unflattenKeylistIntoAnswers(propValArray, value){
    var answer = answers;
    for (var i = 0, n = propValArray.length - 1; i < n; ++i) {
      answer = answer[propValArray[i]] || (answer[propValArray[i]] = []);
    }
    answer[propValArray[n]] = value;
  }

  function computePropValue(propName){
    var value = providers[propName](), allowedValuesMap = values[propName];
    if (value in allowedValuesMap) {
      return value;
    }
    var allowedValuesList = [];
    for (var k in allowedValuesMap) {
      allowedValuesList[allowedValuesMap[k]] = k;
    }
    if (propertyErrorFunc) {
      propertyErrorFunc(propName, allowedValuesList, value);
    }
    throw null;
  }

  var frameInjected;
  function maybeInjectFrame(){
    if (!frameInjected) {
      frameInjected = true;
      var iframe = $doc.createElement($intern_35);
      iframe.src = $intern_36;
      iframe.id = $intern_1;
      iframe.style.cssText = $intern_37;
      iframe.tabIndex = -1;
      $doc.body.appendChild(iframe);
      $stats && $stats({moduleName:$intern_1, sessionId:$sessionId, subSystem:$intern_2, evtGroup:$intern_8, millis:(new Date).getTime(), type:$intern_38});
      iframe.contentWindow.location.replace(base + initialHtml);
    }
  }

  providers[$intern_39] = function(){
    var ua = navigator.userAgent.toLowerCase();
    var makeVersion = function(result){
      return parseInt(result[1]) * 1000 + parseInt(result[2]);
    }
    ;
    if (ua.indexOf($intern_40) != -1) {
      return $intern_40;
    }
     else if (ua.indexOf($intern_41) != -1) {
      return $intern_42;
    }
     else if (ua.indexOf($intern_43) != -1) {
      if (document.documentMode >= 8) {
        return $intern_44;
      }
       else {
        var result = /msie ([0-9]+)\.([0-9]+)/.exec(ua);
        if (result && result.length == 3) {
          var v = makeVersion(result);
          if (v >= 6000) {
            return $intern_45;
          }
        }
      }
    }
     else if (ua.indexOf($intern_46) != -1) {
      var result = /rv:([0-9]+)\.([0-9]+)/.exec(ua);
      if (result && result.length == 3) {
        if (makeVersion(result) >= 1008)
          return $intern_47;
      }
      return $intern_46;
    }
    return $intern_48;
  }
  ;
  values[$intern_39] = {gecko:0, gecko1_8:1, ie6:2, ie8:3, opera:4, safari:5};
  providers[$intern_49] = function(){
    var ua = navigator.userAgent.toLowerCase();
    if (ua.indexOf($intern_50) != -1) {
      return $intern_51;
    }
     else {
      return false;
    }
  }
  ;
  values[$intern_49] = {'false':0, 'true':1};
  contentmanager.onScriptLoad = function(){
    if (frameInjected) {
      loadDone = true;
      maybeStartModule();
    }
  }
  ;
  contentmanager.onInjectionDone = function(){
    scriptsDone = true;
    $stats && $stats({moduleName:$intern_1, sessionId:$sessionId, subSystem:$intern_2, evtGroup:$intern_52, millis:(new Date).getTime(), type:$intern_9});
    maybeStartModule();
  }
  ;
  processMetas();
  computeScriptBase();
  var strongName;
  var initialHtml;
  if (isHostedMode()) {
    if ($wnd.external && ($wnd.external.initModule && $wnd.external.initModule($intern_1))) {
      $wnd.location.reload();
      return;
    }
    initialHtml = $intern_53;
    strongName = $intern_0;
  }
  $stats && $stats({moduleName:$intern_1, sessionId:$sessionId, subSystem:$intern_2, evtGroup:$intern_3, millis:(new Date).getTime(), type:$intern_54});
  if (!isHostedMode()) {
    try {
      unflattenKeylistIntoAnswers([$intern_42, $intern_51], $intern_55);
      unflattenKeylistIntoAnswers([$intern_44, $intern_56], $intern_57);
      unflattenKeylistIntoAnswers([$intern_44, $intern_51], $intern_57);
      unflattenKeylistIntoAnswers([$intern_44, $intern_56], $intern_57 + $intern_58);
      unflattenKeylistIntoAnswers([$intern_44, $intern_51], $intern_57 + $intern_58);
      unflattenKeylistIntoAnswers([$intern_47, $intern_56], $intern_59);
      unflattenKeylistIntoAnswers([$intern_47, $intern_51], $intern_59);
      unflattenKeylistIntoAnswers([$intern_47, $intern_56], $intern_59 + $intern_58);
      unflattenKeylistIntoAnswers([$intern_47, $intern_51], $intern_59 + $intern_58);
      unflattenKeylistIntoAnswers([$intern_42, $intern_56], $intern_60);
      strongName = answers[computePropValue($intern_39)][computePropValue($intern_49)];
      var idx = strongName.indexOf($intern_61);
      if (idx != -1) {
        softPermutationId = Number(strongName.substring(idx + 1));
        strongName = strongName.substring(0, idx);
      }
      initialHtml = strongName + $intern_62;
    }
     catch (e) {
      return;
    }
  }
  var onBodyDoneTimerId;
  function onBodyDone(){
    if (!bodyDone) {
      bodyDone = true;
      maybeStartModule();
      if ($doc.removeEventListener) {
        $doc.removeEventListener($intern_63, onBodyDone, false);
      }
      if (onBodyDoneTimerId) {
        clearInterval(onBodyDoneTimerId);
      }
    }
  }

  if ($doc.addEventListener) {
    $doc.addEventListener($intern_63, function(){
      maybeInjectFrame();
      onBodyDone();
    }
    , false);
  }
  var onBodyDoneTimerId = setInterval(function(){
    if (/loaded|complete/.test($doc.readyState)) {
      maybeInjectFrame();
      onBodyDone();
    }
  }
  , 50);
  $stats && $stats({moduleName:$intern_1, sessionId:$sessionId, subSystem:$intern_2, evtGroup:$intern_3, millis:(new Date).getTime(), type:$intern_9});
  $stats && $stats({moduleName:$intern_1, sessionId:$sessionId, subSystem:$intern_2, evtGroup:$intern_52, millis:(new Date).getTime(), type:$intern_4});
  if (!__gwt_scriptsLoaded[$intern_64]) {
    __gwt_scriptsLoaded[$intern_64] = true;
    document.write($intern_65);
  }
  $doc.write($intern_66);
}

contentmanager();
