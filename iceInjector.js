/*
*
* - Dynamic content engine for time/page based injection
* - Nick Freese Copyright 2017
*
*   - Dependant on Jquery.  Best loaded with require.
*
*/
var iceInjector = {

    weekdayLib: ["Sunday", "Monday","Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],

    getHours: function(){
        var d = new Date();
        var h = d.getHours();
        var n = d.getMinutes();
        return [h,n];
    },
    
    getDay: function(){
        var _this = this;
        var d = new Date();
        var h = d.getDay();
        return _this.weekdayLib[h].toLowerCase();
    },
    
    getLocation: function(){
        var s = window.location.origin;
        var n = window.location.pathname;
        return s+n;
    },  
    
    compareTime: function(now, beg, end){
    
        if(beg[0] < now[0] && end[0] > now[0]){
        
            //do content
            return true;
        
        }
        else if (beg[0] == now[0] && end[0] > now[0]){
        if(beg[1] < now[1]){
        
            //do content
            return true;
        }
        }
        else if(beg[0] < now[0] && end[0] == now[0]){
        if(end[1] > now[1]){
        
            //do content
            return true;
        }
        }
        else if(beg[0] == now[0] && end[0] == now[0]){
        if(beg[1] < now[1] && end[1] > now[1]){
        
            //do content
            return true;
        }
        else if(beg[1] == now[1] && end[1] > now[1]){
        //do content
        return true;
        }
        else if(beg[1] < now[1] && end[1] == now[1]){
        //do content
        return true;
        }
        else if(beg[1] == now[1] && end[1] == now[1]){
        //do content
        return true;
        }
        }

    return false;
    },
    
    checkLocation: function(myLoc, locList){
        for(var i = 0;i<locList.length;i++){
            if(myLoc.indexOf(locList[i]) !== -1){
                return true;
            }
        }
        return false;
    },
    
    checkDay:function(myDay, contentDays){
    
        for(var i = 0;i<contentDays.length;i++){
            if(contentDays[i].toLowerCase() == myDay){
                return true;
            }
        }
        return false;
    
    },
    
    doInjection: function(content, target, method){
    
        if(method == 'append'){
            jQuery(target).append(content);
            return true;
        }
        else if(method == 'before'){
            jQuery(content).insertBefore(target);
            return true;
        }
        else if(method == 'inside'){
            var curCon = jQuery(target).html();
            jQuery(target).html(content+curCon);
            return true;
        }
        else if(method == 'after'){
            jQuery(content).insertAfter(target);
            return true;
        }
        return false;
    },
    
    init: function(conf){
        var _this = this;
        var time = _this.getHours();
        var loc = _this.getLocation();
        
        for(key in conf){
        
            /* Logic for each content block */
            
            var showContent = _this.compareTime(time, conf[key].time.begin, conf[key].time.end);
            
            var showLocation = _this.checkLocation(_this.getLocation(), conf[key].location);
            
            var showDay = _this.checkDay(_this.getDay(), conf[key].days);
            
            if(showContent === true && showLocation === true && showDay === true){
            
            _this.doInjection(conf[key].content, conf[key].target[1], conf[key].target[0]);
            
            conf[key].callback();
            
            }
        }
    }
};
